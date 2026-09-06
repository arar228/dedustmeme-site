# 中国meme币 · $DMEME

Chinese-language static landing-page source with a responsive typographic layout,
project reference sections, a contract copy control, and browser animation.

**Status:** static frontend source with a Railway configuration. Existing product language
about DeDust or endorsement is part of the supplied page content; this documentation
pass does not establish an official affiliation, token guarantees, or live deployment availability.

## Implementation highlights

- HTML / CSS / vanilla JavaScript with Chinese display typography and responsive sections.
- Clipboard copy with a browser fallback and localized feedback.
- Sticky-navigation scroll offsets and reveal effects through `IntersectionObserver`.
- Hover-capable pointer tilt and a keyboard-triggered red-envelope animation.
- Inline favicon artwork and font loading through Google Fonts.
- An optional Node.js static server configuration using `serve` and a provider-supplied `PORT`.

## Source map

| File | Responsibility |
| --- | --- |
| [index.html](index.html) | Content, external references, navigation, and display contract |
| [styles.css](styles.css) | Responsive visual system and animation |
| [script.js](script.js) | Copy, scroll, tilt, reveal, and keyboard effects |
| [package.json](package.json) | Optional `serve` dependency and start command |
| [railway.json](railway.json) | Existing Nixpacks / Railway launch configuration |

## Local preview

The simplest cross-platform preview uses Python 3 from the repository root:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000`. The site has no frontend build stage.

For the existing Node server path, use Node.js 18+ with a POSIX-compatible npm script shell:

```sh
npm install
npm start
```

The package script defaults to port 3000 through POSIX parameter expansion.
Windows' default npm command shell does not interpret that expansion; use the Python
preview above or a suitable shell. The repository has no committed npm lockfile, so this
installation path does not provide a frozen dependency resolution.

## Hosting and content maintenance

The Railway configuration uses Nixpacks and a `serve` command with `PORT` supplied by the host.
It is retained as an existing deployment reference, not a verified deployment result.
Static hosting can also serve `index.html`, `styles.css`, and `script.js` directly.

Keep the copy-button element IDs aligned with `script.js`, preserve the Chinese product
content during layout changes, and review project / contract links before publishing.
The static server serves its configured directory; publish only the intended site files.

## Verification and rights

Documentation checks cover local references, the static entrypoint, and JavaScript syntax.
The repository contains no automated browser tests or GitHub deployment workflow.
Payment processing, smart-contract behavior, and external endorsement claims are outside this source.
Brand names, artwork references, and font families retain their owners' rights;
no repository license file is present.
