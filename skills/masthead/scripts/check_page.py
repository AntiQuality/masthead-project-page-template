#!/usr/bin/env python3
"""Check a Masthead project page for common problems before publishing.

Usage: python3 check_page.py path/to/index.html

Reports leftover template placeholders, forbidden punctuation in text and
comments, nav links without a matching section, images without alt text or
size, and social preview tags that platforms will not show. Exits 1 if it
finds anything, 0 if the page is clean. Standard library only.
"""
import html
import re
import sys
from html.parser import HTMLParser

PLACEHOLDERS = [
    'Project Name', 'Paper Title', 'Your paper title', 'your-username', 'your-project',
    'First Author', 'Second Author', 'Third Author', 'Last Author', 'First Institution',
    'Second Institution', 'Conference Name', 'you@example.com', 'example.com',
    '0000.00000', 'author2026paper', 'Metric A', 'Benchmark A', 'A title for this example',
    'figure-wide.svg', 'figure-a.svg', 'figure-b.svg', 'placeholder.mp4',
]
# em dash, en dash, middle dot, and semicolons used as prose punctuation
PUNCT = re.compile('[—–·]|;(?=\\s|$)')


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.text = []        # (line, text) of visible text
        self.comments = []    # (line, text)
        self.attrs_text = []  # (line, attr, value) for alt, title, aria-label, meta content
        self.ids = set()
        self.nav_links = []   # (line, href)
        self.imgs = []        # (line, attrs)
        self.meta = {}
        self.skip = 0
        self.in_nav = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        line = self.getpos()[0]
        if tag in ('script', 'style'):
            self.skip += 1
        if 'id' in a:
            self.ids.add(a['id'])
        if tag == 'nav':
            self.in_nav += 1
        if tag == 'a' and self.in_nav and (a.get('href') or '').startswith('#'):
            self.nav_links.append((line, a['href'][1:]))
        if tag == 'img':
            self.imgs.append((line, a))
        if tag == 'meta':
            key = a.get('property') or a.get('name')
            if key:
                self.meta.setdefault(key, []).append(a.get('content') or '')
                if key in ('description', 'og:title', 'og:description', 'og:image:alt',
                           'twitter:title', 'twitter:description'):
                    self.attrs_text.append((line, key, a.get('content') or ''))
        for k in ('alt', 'title', 'aria-label'):
            if a.get(k):
                self.attrs_text.append((line, k, a[k]))

    def handle_endtag(self, tag):
        if tag in ('script', 'style') and self.skip:
            self.skip -= 1
        if tag == 'nav' and self.in_nav:
            self.in_nav -= 1

    def handle_data(self, data):
        if not self.skip and data.strip():
            self.text.append((self.getpos()[0], data))

    def handle_comment(self, data):
        self.comments.append((self.getpos()[0], data))


def main(path):
    src = open(path, encoding='utf-8').read()
    page = Page()
    page.feed(src)
    problems = []

    def add(line, msg):
        problems.append((line, msg))

    # leftover placeholders anywhere in the file (comments excluded)
    no_comments = re.sub(r'<!--.*?-->', lambda m: '\n' * m.group(0).count('\n'), src, flags=re.S)
    for i, line in enumerate(no_comments.split('\n'), 1):
        for p in PLACEHOLDERS:
            if p in line:
                add(i, f'placeholder left: "{p}"')

    # punctuation in visible text, attribute text and comments
    for line, t in page.text:
        if PUNCT.search(t):
            add(line, f'punctuation in text: "{t.strip()[:70]}"')
    for line, k, t in page.attrs_text:
        if PUNCT.search(html.unescape(t)):
            add(line, f'punctuation in {k}: "{t.strip()[:70]}"')
    for line, t in page.comments:
        if PUNCT.search(t):
            add(line, f'punctuation in comment: "{t.strip()[:70]}"')

    # nav links must point at an existing id
    for line, target in page.nav_links:
        if target not in page.ids:
            add(line, f'nav link #{target} has no matching id')

    # images need alt text and a size, so the page does not jump while loading
    for line, a in page.imgs:
        if 'alt' not in a:
            add(line, f'image without alt: {a.get("src")}')
        if not (a.get('width') and a.get('height')):
            add(line, f'image without width and height: {a.get("src")}')

    # social preview: absolute URL to a raster image
    for key in ('og:image', 'twitter:image'):
        for v in page.meta.get(key, []):
            if not v.startswith('http'):
                add(0, f'{key} must be an absolute URL, got "{v}"')
            if v.lower().endswith('.svg'):
                add(0, f'{key} is an SVG, which most platforms do not show. Use a 1200 by 630 PNG or JPG')
    if not page.meta.get('og:image'):
        add(0, 'no og:image tag')

    # Scholar wants "Last, First"
    for v in page.meta.get('citation_author', []):
        if ',' not in v:
            add(0, f'citation_author should be "Last, First", got "{v}"')

    if not problems:
        print(f'{path}: clean')
        return 0
    for line, msg in sorted(problems):
        print(f'{path}:{line}: {msg}' if line else f'{path}: {msg}')
    print(f'{len(problems)} problem(s)')
    return 1


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(__doc__.strip().split('\n\n')[1])
        sys.exit(2)
    sys.exit(main(sys.argv[1]))
