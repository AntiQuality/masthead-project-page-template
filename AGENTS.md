# AGENTS.md

Instructions for AI coding agents working on a Masthead project page. Read this before editing.

## What this repo is

A static project page for one research paper. Plain HTML, CSS and JavaScript with no build step and no dependencies. GitHub Pages serves `index.html` from the repo root.

## Files

| File | Edit it to |
|---|---|
| `index.html` | Write the page. Every block is marked with a `MODULE` comment. |
| `assets/css/tokens.css` | Change colors, fonts and page width, for light and dark mode. |
| `assets/css/themes/*.css` | Optional presets. Link one after `tokens.css` to use it. |
| `assets/css/masthead.css` | Component styles. Leave it alone unless a layout truly needs a change. |
| `assets/js/masthead.js` | Behavior (theme toggle, sorting, reveals). Rarely needs edits. |
| `assets/media/` | Figures, video, poster frame and `social-preview.png`. |
| `assets/logo.svg` | Logo in the top bar, hero and favicon. |

## Filling the page from a paper

Ask the user for the PDF or LaTeX source, the BibTeX, the final author list with links, the venue and the figures. Then work top to bottom through `index.html`:

1. **Meta block.** Replace every placeholder in `<head>`: title, description, canonical URL, Open Graph and Twitter tags, `citation_*` tags and the JSON-LD block. One `citation_author` per author, written "Last, First". `og:image` and `twitter:image` must be absolute URLs to a 1200 by 630 PNG or JPG.
2. **Top bar.** Project name, plus one nav link per section that stays on the page. Each link `href` must match a section `id`.
3. **Hero.** Venue in the eyebrow, with the badge for Oral, Spotlight or similar (delete the badge otherwise). Title, with at most one word wrapped in `<span class="hl">`. A two or three sentence pitch. Resource buttons for Paper, Code, Data, Video and so on. Use `<span class="btn soon">` for anything not released yet. Authors, affiliations and the equal contribution note.
4. **Abstract.** A one-line hook in `.lede`, then the abstract in two or three short paragraphs.
5. **Stats strip.** Three to six numbers from the paper. Keep each short (12K, not 12000). `data-n` is the final value and `data-dec` its decimal places. Mark the most important one with class `key`.
6. **Sections.** Keep the modules the paper has material for and delete the rest. Renumber the `.sn` spans so they run 01, 02, 03 in order.
7. **Cite.** Paste the BibTeX inside `<pre>` as is.
8. **Footer.** Project name, institution, venue and links. Keep the Masthead credit line unless the user asks to remove it.
9. **Social preview.** Make `assets/media/social-preview.png` (1200 by 630) show the paper title, or ask the user for one.

Never invent results, numbers, authors, venues or links. If the paper does not provide something a module needs, delete the module or ask the user.

## Module notes

- **Figures.** `<figure class="fig">` with an `<img class="frame">`, real `width` and `height` attributes, `loading="lazy"` and descriptive `alt` text. Captions start with `<b>Figure N.</b>`.
- **Video.** Self-hosted clips use `<video ... data-autoplay loop muted playsinline>`, which plays only while on screen. YouTube goes in the commented `.embed` block. The Video button in the hero links to `#video`, so keep that `id` on the video subheading.
- **Results table.** Put `data-sort="num"` or `data-sort="text"` on each sortable `<th>`. Bold the best value per column with `<b>`. Use `n/a` for missing values and give that cell `data-v=""`. A formatted cell like `5.2 h` needs a raw `data-v` value so it sorts correctly.
- **Bar chart.** Set `--ymax` on `.plot`, `--v` on each `.bar` and `--i` as a running index for the stagger. Series colors are classes `s1` to `s4`. Keep the legend chips in the same order as the bars, and label each group in `.xl`.
- **Comparison cards.** Two `.card` elements around a `.delta`. Add class `hi` to the card that should stand out. The delta text names the single change between the two.
- **Case study.** One `.lane` per method with class `good`, `warn` or `bad`. Mark the step where a method went wrong with `.ts.crit`. In the outcome bar, the flex values are counts.

## Text style

Follow these rules in everything you write: visible copy, alt text, captions, HTML, CSS and JS comments, the README and text inside images.

- **No em dashes or en dashes.** Rewrite with a period, comma, colon or parentheses.
- **No middle dots (·).** Use a comma or a colon, or rephrase.
- **No semicolons.** Split into two sentences or join with "and", "but" or "while".
- **Ranges in words.** Write "1 to 4", not "1–4".
- **Missing values** are `n/a`.
- **Plain, specific sentences.** Prefer the paper's own numbers and terms over adjectives.

Code syntax is exempt. Semicolons in JavaScript and CSS and en dashes inside URLs are fine.

Check before you finish:

```bash
grep -nE '—|–|·|&mdash;|&ndash;|&middot;' index.html README.md assets/css/*.css assets/js/*.js
```

Any hit in prose or comments needs a rewrite. Also read your new sentences for semicolons.

## Constraints

- No frameworks, build tools, package managers or CDN scripts. Google Fonts is the only external request.
- Every color comes from a variable in `tokens.css`, so dark mode keeps working. Do not hardcode colors in `index.html`.
- Keep the page readable without JavaScript and keep the reduced motion handling.
- Keep images reasonably small. Compress PNG and JPG, and prefer SVG for diagrams.

## Before you finish

1. Serve the folder (`python3 -m http.server`) and open the page in light mode, dark mode and at phone width (about 375 px). Nothing should scroll sideways except tables and charts.
2. Click every nav link, resource button and the BibTeX copy button.
3. Make sure no placeholder text is left: search for `Project Name`, `Paper Title`, `your-username`, `First Author`, `example.com` and `0000.00000`.
4. Run the text style check above.
5. If this repo has `skills/masthead/scripts/check_page.py`, run `python3 skills/masthead/scripts/check_page.py index.html` and fix what it reports.
