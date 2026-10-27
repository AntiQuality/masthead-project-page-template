# Masthead

An editorial project page template for research papers. Plain HTML, CSS and JS: no build step, works on GitHub Pages as is.

> Work in progress. Full docs, screenshots and the live demo are coming.

## Quick start

1. Click **Use this template** (or fork / download this repo).
2. Edit `index.html`: every block is marked with a `MODULE` comment, so delete what you don't need.
3. Change colors and fonts in `assets/css/tokens.css`. Light and dark mode are both defined there.
4. Replace the placeholder figures and video in `assets/media/`.
5. Turn on GitHub Pages for the repo (Settings → Pages → deploy from `main`).

Want to see a finished page first? [`examples/rulebook.html`](examples/rulebook.html) is the same template filled in for a fictional paper. Delete the `examples/` folder when you start your own.

## Theme presets

`tokens.css` is the default look. For a different one, add a preset after it in `<head>`:

```html
<link rel="stylesheet" href="assets/css/themes/gazette.css">
```

| Preset | Fonts | Accent |
|---|---|---|
| default | Space Grotesk, Hanken Grotesk | blue |
| `gazette` | Fraunces, Source Serif 4 | oxblood |
| `lab` | IBM Plex Sans, IBM Plex Mono | green |
| `mono` | Geist, Geist Mono | vermilion |

Each preset loads its own fonts and defines both light and dark mode. Preview any of them on the example page with `?theme=`, for example `examples/rulebook.html?theme=gazette`.

## Acknowledgments

Masthead grew out of the [AgentAbstain](https://agentabstain.github.io) project page. [Vira Kasprova](https://www.linkedin.com/in/vira-kasprova/) built the first version, and [Xun Liu](https://antiquality.github.io/) iterated on it into this template. Thanks to the whole AgentAbstain team for their feedback.

## License

[MIT](LICENSE).
