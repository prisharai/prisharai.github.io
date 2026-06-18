# pr15ha — Frontend Design Specification

A hand-off doc describing every design decision in the current prototype, so it can be rebuilt as the real site. This describes the *what* and *why*; treat exact pixel values as a strong starting point, not gospel.

---

## 1. Project summary

- **Type:** personal portfolio, single owner ("pr15ha")
- **Goal:** get hired
- **Primary audience:** recruiters
- **Domain:** pr15ha (already chosen)
- **Hosting:** GitHub Pages
- **Build approach:** hand-coded HTML/CSS/JS, no framework, no build step
- **Pages:** Home, About, Experience, Projects, Contact, Misc (6 real, separate HTML pages — not a single scrolling page)

## 2. Design concept

The site's visual identity is a single recurring motif: an illustrated peony bloom, rendered as original SVG (not a traced or licensed photo — see §8 for why, and what to do if real photography/art gets added later). The bloom shows up twice:

1. **Full-size**, as the hero illustration on the home page.
2. **Miniaturized**, as the site's only navigation control — a small flower icon fixed in the bottom-right corner of every page. There is no top nav bar. Clicking the mini-flower makes five labelled links bloom outward around it in an arc, then fold back closed on the next click, an outside click, or Escape.

Two more signature behaviors run site-wide:

- A **custom cursor**: the real cursor is hidden (desktop/mouse only) and replaced with a soft ring that trails the real pointer with light easing, then grows when hovering anything clickable.
- On the home page only, the **headline drifts** a few pixels in response to cursor position, a very subtle parallax.

Everything else is intentionally quiet: flat color blocks for placeholder imagery, simple fade/slide entrances, no other decorative motion. The bloom and the cursor are the two "voices" of the design; nothing else should compete with them.

## 3. Color palette

Sourced from a watercolor/ink-wash peony reference (muted lavender-violet, cool grey-blue foliage, warm gold pollen accent). Use these as CSS custom properties on `:root`:

```css
:root {
  --bg: #ece9f3;          /* palest lavender wash, used in gradients */
  --paper: #f7f5fa;        /* near-white page background */
  --petal-light: #cdc2e0;  /* light petal tone */
  --petal-mid: #a392c9;    /* mid petal tone, primary accent */
  --petal-deep: #5c4d80;   /* deep petal tone, used for borders/strokes/cursor */
  --gold: #c79a4d;         /* stamen accent */
  --slate: #888da0;        /* leaf/stem tone */
  --slate-deep: #5b6072;   /* secondary text, labels */
  --ribbon: #b6bad0;       /* trailing ink-wash wisp */
  --ink: #3c3550;          /* primary text color */
}
```

Additional gradient-only colors (not full variables, used directly in gradient stops):
`#b09fd1`, `#ddd2ec` (a second, slightly rosier petal gradient for natural variation), `#4a3f6e`, `#8779ad` (a second, slightly bluer inner-petal gradient), `#e3c483`, `#b9863a` (gold gradient stops), `#979cae`, `#666c80` (leaf gradient), `#888da0`, `#5b6072` (stem gradient).

**The ombre background** (a deliberate callback to an earlier design pass) is a fixed 3-stop diagonal gradient, used as a background wherever a "banner" treatment is wanted (home hero, and a rounded panel behind content on every inner page):

```css
background: linear-gradient(165deg, #ece9f3 0%, #d6cce6 50%, #bfaed7 100%);
```

Keep the final stop no darker than this — body text sits directly on top of it, and going deeper risks contrast problems.

## 4. Typography

Two families, loaded from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,500;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
```

- **Fraunces** (serif, organic/soft curves) — all display use: the `pr15ha` headline, page `<h1>`s, work-card titles. Weight 300 for large headlines, 500 for smaller titled elements. Always lowercase (`text-transform: lowercase`) for the wordmark/headline specifically.
- **Jost** (geometric sans) — everything else: body copy, nav/eyebrow labels, buttons. Weights 300 (body), 400, 500 (wordmark).

Type scale, using `clamp()` throughout for fluid sizing:

| Role | Spec |
|---|---|
| Eyebrow / section label | `0.78rem`, `letter-spacing: 0.16–0.18em`, uppercase, `--slate-deep` |
| Home headline (`pr15ha`) | `clamp(2.4rem, 7vw, 3.8rem)`, Fraunces 300, lowercase |
| Page `<h1>` (inner pages) | `clamp(2rem, 5vw, 2.8rem)`, Fraunces 300 |
| Tagline / intro paragraph | `1.05rem`, Jost 300, max-width `32ch`, line-height 1.6 |
| Body paragraph | `1rem`, Jost 300, opacity .85, max-width `55ch`, line-height 1.75 |
| Nav / bud-link labels | `0.74–0.82rem`, letter-spacing `0.05–0.1em`, uppercase |
| Wordmark | `0.95rem`, Jost 500, letter-spacing `0.05em` |

## 5. Site architecture

Six static pages, all sharing the same header, cursor system, and bud-nav:

```
index.html        Home — flower hero, headline, tagline, 3-card work teaser
about.html         About
experience.html    Experience
projects.html      Projects (full work grid)
contact.html       Contact
misc.html          Misc / extras
```

Every page's `<body>` follows the same skeleton:

```html
<a class="sr-only" href="#main">Skip to content</a>
<header class="site-header">
  <a class="wordmark" href="index.html" data-cursor>pr15ha</a>
</header>
<main id="main"> ... page-specific content ... </main>
<footer class="foot"><p>let's talk — hello@pr15ha.com</p></footer>
<div class="bud-nav"> ... see §7 ... </div>
<script> ... see §6 and §7 ... </script>
```

Home (`index.html`) puts the flower + headline + tagline + CTA inside `<section class="hero">`, then a `<section class="work" id="work">` with the 3-card teaser linking to `projects.html`. Inner pages instead use a single `<section class="page-content">` containing an eyebrow, an `<h1>`, and one or two paragraphs (`projects.html` additionally repeats the work-grid, full version).

## 6. Global base styles

Apply to every page identically:

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
html { scroll-behavior: smooth; }
body { background: var(--paper); color: var(--ink); font-family: 'Jost', sans-serif; overflow-x: hidden; }
a { color: inherit; text-decoration: none; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
a:focus-visible, button:focus-visible { outline: 2px solid var(--petal-mid); outline-offset: 3px; }
```

The reduced-motion block is a blanket safety net; the cursor and bud-nav scripts additionally check `prefers-reduced-motion` directly in JS before starting any loop (see §7).

## 7. The cursor system

Runs on every page. Logic:

1. On load, check `matchMedia('(pointer: fine)')` and `matchMedia('(prefers-reduced-motion: reduce)')`. Only enable the custom cursor if pointer is fine **and** motion is not reduced. Touch devices and reduced-motion users keep their normal system cursor.
2. If enabled: set `document.body.style.cursor = 'none'`, create a fixed `<div class="cursor-dot">`, and run an easing loop in `requestAnimationFrame` that moves the dot toward the real mouse position at a rate of **0.34 per frame** (this was deliberately sped up from an earlier, slower 0.18 — keep it snappy, not laggy).
3. Any element with a `data-cursor` attribute triggers the dot's `.active` state (grows from 18px to 46px) on `mouseenter`/`mouseleave`. Tag every link, button, and clickable card with `data-cursor`.
4. On the home page only, an additional listener on `#headline` computes the cursor's offset from the headline's center and applies a small `translate()` (roughly ±10px horizontal, ±6px vertical) for a subtle parallax-follow effect.

```css
.cursor-dot {
  position: fixed; top: 0; left: 0; width: 18px; height: 18px;
  border: 1px solid var(--petal-deep); border-radius: 50%; pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width .25s ease, height .25s ease, background .25s ease;
  z-index: 999;
}
.cursor-dot.active { width: 46px; height: 46px; background: rgba(92,77,128,0.12); }
```

```js
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const enableCursor = finePointer && !reduceMotion;
const dot = document.createElement('div');
dot.className = 'cursor-dot';
document.body.appendChild(dot);
if (enableCursor) {
  document.body.style.cursor = 'none';
  let mouseX = innerWidth / 2, mouseY = innerHeight / 2, dotX = mouseX, dotY = mouseY;
  addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  (function loop() {
    dotX += (mouseX - dotX) * 0.34;
    dotY += (mouseY - dotY) * 0.34;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('active'));
    el.addEventListener('mouseleave', () => dot.classList.remove('active'));
  });
  const headline = document.getElementById('headline'); // only exists on index.html
  if (headline) {
    addEventListener('mousemove', e => {
      const r = headline.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      headline.style.transform = `translate(${dx * 10}px, ${dy * 6}px)`;
    });
  }
} else {
  dot.style.display = 'none';
}
```

## 8. The flower illustration (home hero)

**Important constraint:** this must be an original illustration, not a trace or reproduction of any specific reference image/artwork. Watercolor peony reference images were used for color and general mood only (palette in §3 is derived from one such reference). If real licensed photography or commissioned/AI-generated artwork becomes available later, swap it in as an `<img>` and retire the SVG, that would be a clear upgrade.

Built as inline SVG, `viewBox="0 0 440 520"`, flower center at `(220, 170)`. Layer order (back to front):

1. **Ambient glow + underpainting** — one large blurred radial-gradient circle (`r="150"`, `softBlur` filter, `feGaussianBlur stdDeviation="18"`) plus two blurred translucent ellipses in `--petal-light`/`--petal-mid` at low opacity, offset slightly from center, to fake a soft watercolor bleed behind the crisp shapes.
2. **Trailing ribbon** — two overlapping wavy strokes (`stroke-width` 18 and 9, opacity .2 and .3) in `--ribbon`, running from near the stem base off the bottom-right of the canvas. Purely decorative/atmospheric.
3. **Stem** — a single curved path, stroked (not filled) with the `stemGrad` linear gradient, `stroke-width: 6`.
4. **Leaves** — 3 instances of one leaf shape (`<path id="leafShape">`), placed and rotated individually for natural asymmetry (not evenly spaced), filled with `leafGrad`.
5. **Outer petals** — 7 instances of one petal shape (`<path id="petalOuterShape">`), each placed via `transform="translate(220,170) rotate(ANGLE) scale(SCALE)"`. Angles and scales are deliberately jittered off a perfect 7-point rotation (e.g. `-4°, 54°, 99°, 158°, 203°, 262°, 312°` rather than clean 51.4° steps; scales varying roughly `0.93–1.08`) so the bloom doesn't read as a mechanical "spirograph" shape. Fill alternates between two near-identical gradients (`petalOuterGrad` / `petalOuterGrad2`) for subtle petal-to-petal color variation, the way a real flower's petals are never perfectly uniform.
6. **Inner petals** — 6 smaller instances of a second petal shape (`petalInnerShape`), same jittering approach, alternating `petalInnerGrad` / `petalInnerGrad2` (deeper violet tones).
7. **Stamen cluster** — roughly 9 small gold circles (`goldGrad`) plus 2–3 smaller dark accent dots (`--petal-deep`) scattered within a tight radius at the very center, on top of everything.

**Organic texture filters** (this is what fixes the "geometric/AI-generated" look — apply these to the petal/leaf/stem/ribbon groups, never to crisp UI elements):

```html
<filter id="organic" x="-25%" y="-25%" width="150%" height="150%">
  <feTurbulence type="fractalNoise" baseFrequency="0.018 0.03" numOctaves="2" seed="7" result="noise"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<filter id="organicSoft" x="-25%" y="-25%" width="150%" height="150%">
  <feTurbulence type="fractalNoise" baseFrequency="0.02 0.04" numOctaves="2" seed="11" result="noise2"/>
  <feDisplacementMap in="SourceGraphic" in2="noise2" scale="4" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```

`organic` (stronger displacement, scale 9) goes on the petal groups; `organicSoft` (gentler, scale 4) goes on leaves, stem, and ribbon, since those are already thin/simple shapes that distort badly with too much noise.

The whole flower group fades and rises in once on load (`opacity 0→1`, `translateY(14px→0)`, ~1s, slight delay), and nothing else about it animates, no idle sway, no hover state. It's meant to be a calm focal point, not a second interactive system competing with the cursor or the bud-nav.

## 9. The bloom navigation ("bud-nav")

Replaces a conventional top nav bar entirely. Fixed bottom-right on every page, `64×64px`.

**Structure:**
```html
<div class="bud-nav">
  <button class="bud" aria-expanded="false" aria-label="Open navigation" data-cursor>
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <!-- a small 7-petal version of the same flower, ~58px backing
           circle in --paper for legibility, gold center dots —
           same construction logic as §8 but simplified: no leaves,
           no stem, no organic filter (too small to need it) -->
    </svg>
  </button>
  <a class="bud-link" href="about.html" data-cursor>about</a>
  <a class="bud-link" href="experience.html" data-cursor>experience</a>
  <a class="bud-link" href="projects.html" data-cursor>projects</a>
  <a class="bud-link" href="contact.html" data-cursor>contact</a>
  <a class="bud-link" href="misc.html" data-cursor>misc</a>
</div>
```

**Behavior:** clicking `.bud` toggles an `.open` class on `.bud-nav` and flips `aria-expanded`. When `.open`, the five `.bud-link` pills animate from `scale(0) opacity:0` at the bud's exact center out to fixed offsets forming a quarter-circle arc (radius ~100px, sweeping from straight up to straight left), each with a slightly longer `transition-delay` than the last (0.03s increments) so they cascade open rather than popping simultaneously. Use a bouncy easing (`cubic-bezier(.34,1.56,.64,1)`) for that "blooming" overshoot feel. Clicking outside the nav, pressing Escape, or clicking the bud again closes it.

```js
const budNav = document.querySelector('.bud-nav');
const budBtn = document.querySelector('.bud');
budBtn.addEventListener('click', () => {
  const isOpen = budNav.classList.toggle('open');
  budBtn.setAttribute('aria-expanded', String(isOpen));
});
document.addEventListener('click', e => {
  if (!budNav.contains(e.target)) budNav.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') budNav.classList.remove('open');
});
```

`.bud-link` elements are `pointer-events: none` until `.open` is present, so they can't be accidentally clicked while folded shut. Home (`index.html`) is reached via the wordmark, not a sixth bud-link.

## 10. Page-by-page content notes

All current copy is placeholder and needs to be swapped for the real thing. What's needed per page:

- **Home:** the tagline under the headline; the 3 work-teaser cards (currently flat color swatches standing in for real project thumbnails).
- **About:** a real bio, photo or portrait illustration if desired, focus areas, what kind of role/work is being sought.
- **Experience:** an actual timeline, roles, dates, employers.
- **Projects:** real case studies (the home teaser and this page currently share 3 identical placeholder cards) — ideally each links to a deeper write-up or external link.
- **Contact:** real email is already wired as a `mailto:` link; consider adding LinkedIn/GitHub/resume-download links here too.
- **Misc:** open-ended — extra images, side projects, anything that doesn't need a formal page.

## 11. Accessibility checklist

- Skip-to-content link as the first focusable element on every page.
- `prefers-reduced-motion` disables: the custom cursor loop, the headline parallax, and the bud-nav's bouncy transitions collapse to near-instant via the blanket CSS rule. Scroll-reveal cards (§12) appear immediately rather than animating in.
- Custom cursor never replaces the system cursor on touch/coarse-pointer devices.
- `.bud` is a real `<button>` with `aria-expanded` and `aria-label`; `.bud-link`s are real `<a>` elements, not divs with click handlers.
- All interactive elements get a visible `:focus-visible` outline (`2px solid var(--petal-mid)`).
- Decorative SVGs (the big flower, the mini flower icon) are marked `aria-hidden="true"`.

## 12. Scroll-reveal work cards

`.work-card` elements (home teaser + full projects grid) start `opacity: 0; transform: translateY(24px)`, observed via `IntersectionObserver` (`threshold: 0.2`), and gain a `.visible` class (`opacity: 1; transform: translateY(0)`, `0.7s ease`) the first time they scroll into view. If `prefers-reduced-motion` is set, skip the observer and add `.visible` to all cards immediately on load.

## 13. Responsive behavior

- Fluid type and spacing via `clamp()` everywhere rather than fixed breakpoints for font-size/padding.
- Grids (`work-grid`, any gallery grid) collapse from 3 columns to 1 under `860px`.
- The flower SVG scales naturally since it's `viewBox`-based with `width: 100%; height: auto` on its container (`max-width: 420px`, centered).
- `.page-content` panel is `max-width: 680px` (1080px on `projects.html` to fit the grid), centered, so it never gets uncomfortably wide on large screens.

## 14. Implementation notes for Claude Code

- The current prototype has every page fully self-contained (CSS and JS duplicated inline in each `.html` file) so each could be previewed standalone. **For the real build, extract the shared `<style>` and `<script>` blocks into `styles.css` and `script.js`**, referenced from all six pages, that's the only structural change needed going from prototype to production.
- Keep the Google Fonts `<link>` tags as-is; verify they still resolve once deployed.
- Domain is already decided (pr15ha) — once pointed at GitHub Pages, add a `CNAME` file at the repo root with the domain name, GitHub's standard custom-domain setup.
- Nothing here depends on a JS framework or build tooling; it's deliberately plain HTML/CSS/JS so it stays simple to maintain by hand.