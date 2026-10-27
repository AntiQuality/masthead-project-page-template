---
name: masthead
description: Build an academic project page for a research paper with the Masthead template (static HTML, dark mode, GitHub Pages ready). Use when the user wants a project page, paper website, or GitHub Pages site for a paper, or mentions Masthead. The skill reads the paper first, asks a few design questions, then builds and checks the page.
---

# Masthead: a project page for a paper

You turn a research paper into a finished project page built on the Masthead template (https://github.com/AntiQuality/masthead-project-page-template). Work in five phases and do not skip the questions in phase 3.

## Phase 1: get the paper

Ask the user, in one message, for anything not already given:

- The paper: arXiv link, PDF or LaTeX source. LaTeX is best because figures and BibTeX come with it.
- The BibTeX entry, if it is not in the source.
- Links to show as buttons: code, data, video, slides, poster. Say which ones are not released yet.
- Where the page should live: a new GitHub repo (and its name), an existing repo, or a local folder.

If the user only gives an arXiv ID, fetch the abstract page and the source or PDF yourself.

## Phase 2: read and analyze

Read the whole paper before writing anything. Collect:

- Title, authors in order, affiliations, equal contribution and corresponding author marks, venue and award (Oral, Spotlight, Best Paper).
- The one-sentence contribution and a one-line hook that contrasts the usual view with the paper's view.
- Three to six headline numbers for the stats strip, each with a short label. Only numbers stated in the paper.
- Three key findings, each a number plus one claim.
- The main results table, if there is one, and which columns are higher or lower is better.
- Data that would make a good bar chart (a few groups, two to four series).
- A natural before and after pair (comparison cards) and a qualitative example that compares methods (case study), if the paper has them.
- Figures: the teaser, the method overview and any result figures, with their captions.

Then show the user a short outline: the sections you plan, which Masthead module each one uses, and the numbers you picked. Mark anything you are unsure about.

## Phase 3: ask the design questions

Ask these in one round, each with your recommendation first. Use your agent's question tool if it has one, otherwise a short numbered list.

1. **Title highlight.** Which single word in the title gets the accent underline? Recommend the word that carries the idea.
2. **Modules.** Which optional modules to keep: results table, bar chart, comparison cards, case study, video. Recommend only the ones the paper has real material for.
3. **Theme.** default (Space Grotesk, blue), `gazette` (serif, oxblood), `lab` (IBM Plex, green) or `mono` (Geist, vermilion). Recommend one that fits the field and the figures.
4. **Logo and preview image.** Does the project have a logo? Should you generate the 1200 by 630 social preview from the finished hero?

Wait for the answers before building.

## Phase 4: build

1. **Get the template.** With the GitHub CLI and a new repo:

   ```bash
   gh repo create <name> --template AntiQuality/masthead-project-page-template --public --clone
   rm -rf <name>/.github <name>/skills
   ```

   Otherwise copy it into the target folder:

   ```bash
   git clone --depth 1 https://github.com/AntiQuality/masthead-project-page-template <folder>
   rm -rf <folder>/.git <folder>/.github <folder>/skills
   ```

   Keep `AGENTS.md` in the new page. It is the rulebook for every module.

2. **Read `AGENTS.md`** in the new folder and follow it for every edit. It covers the meta block, each module's markup, the text style and the constraints.

3. **Fill `index.html` top to bottom** with what you collected in phase 2 and the answers from phase 3. Delete every module the user did not keep, renumber the section numbers and make the top bar links match the remaining section ids.

4. **Figures.** Copy them into `assets/media/`. Convert PDF figures to PNG or SVG. Keep each image under about 500 KB, and set real `width` and `height` attributes and descriptive alt text. Delete the placeholder files you replaced.

5. **Theme.** Link the chosen preset after `tokens.css`, or leave the default.

6. **Social preview.** If the user agreed, serve the page, screenshot the hero at 1200 by 630 (headless Chrome works: `--window-size=1200,630 --screenshot`) and save it as `assets/media/social-preview.png`. Point `og:image` and `twitter:image` at its absolute URL.

Never invent numbers, results, authors, venues or links. If something is missing, leave the module out or ask.

## Phase 5: check and publish

1. Run the checker that ships with this skill on the new page:

   ```bash
   python3 <this skill folder>/scripts/check_page.py <folder>/index.html
   ```

   Fix everything it reports. It looks for leftover placeholders, forbidden punctuation, broken section links, missing alt text and social image problems.

2. Serve the folder (`python3 -m http.server`) and look at the page in light mode, dark mode and at phone width (about 375 px). Click the nav links, the resource buttons and the BibTeX copy button.

3. Show the user the result and list anything you left out and why.

4. Publishing changes things outside the user's machine, so ask before you push. With their go-ahead, commit, push and turn on GitHub Pages:

   ```bash
   gh api -X POST repos/<owner>/<repo>/pages -f "source[branch]=main" -f "source[path]=/"
   ```

   The page goes live at `https://<owner>.github.io/<repo>/` within a minute or two.

## Text style

Masthead pages follow a strict style. In visible text, alt text, captions and comments: no em dashes, no en dashes, no middle dots and no semicolons. Rewrite with periods, commas, colons or "and". Write ranges as "1 to 4" and missing table values as `n/a`. The checker enforces this.
