---
name: beplus-spec-remake
description: Autonomous 2-stage specification-driven remake & transformation engine for OpenDesign and AlonePro WordPress Gutenberg FSE themes. Strictly enforces spec approval before build, 100% Gutenberg FSE tokens var(--wp--preset--*), zero manual coding, zero CSS overrides, zero !important, zero clamp outside :root.
category: web-design
triggers:
  - "beplus-spec-remake"
  - "beplus spec remake"
  - "spec remake"
  - "@beplus-spec-remake"
---

# Beplus Spec Remake Engine (v2.0)

Autonomous 2-stage specification-driven remake & transformation engine for OpenDesign and AlonePro WordPress Gutenberg FSE themes.

## Linked References & Tools
- `references/gutenberg-token-contract.md`: Authoritative FSE design tokens, fluid clamps, and theme.json contracts.
- `references/forensic-inspection-patterns.md`: Comprehensive 36-chapter forensic manual covering specificity traps, bento alignment, frosted glass badges, slider carousels, mobile navigation drawers, scroll text illumination, split cards with floating overlays, workspace scratchpad isolation, optical icon hierarchy (curing tiny icons), sticky stacking cards scroll engine, WCAG AA dark canvas typography invariant (curing invisible dimmed text), and disarming default template Base64 data URI bloat (curing 600s watchdog timeouts).
- `references/opendesign-api-orchestration.md`: Headless REST API automation pipeline for OpenDesign daemon (port 7456), SQLite message seeding constraints, and SSE streaming.
- `templates/beplus-spec-template.md`: 100% English master architectural specification template for Phase 1 `Beplus-spec.md`.
- `scripts/inspect-site.mjs`: Automated CDP forensic inspection script extracting computed CSS, deep component anatomy, and motion triggers.

## Absolute Core Mandates

1. **2-Stage Workflow (Spec First, Build After)**:
   - **Phase 1: Forensic Architectural Specification**: Deeply audits the target site using Chrome DevTools Protocol (CDP port 9222) and computed CSS forensics. Produces `Beplus-spec.md` covering all 12 sections with zero placeholders and zero guessing. **STOPS and requests human approval.**
   - **Phase 2: Spec-Driven Build & In-Place Refactoring**: Upon human approval, builds and refactors the production deliverables (`index.html`, `main.css`).
2. **Zero Manual Coding**: All operations—inspection, specification generation, source code building, QA auditing, and iterative refinement—must be 100% autonomously orchestrated by the agent loop. Zero manual source code editing.
3. **100% Gutenberg FSE Token Compliance**: 100% of colors, typography scales, and spacing units in `main.css` must strictly call WordPress Gutenberg FSE preset variables (`var(--wp--preset--*)`). Hardcoded hex colors, raw pixel font-sizes on CSS selectors, and `clamp()` definitions outside `:root` are STRICTLY PROHIBITED.
4. **Zero CSS Overrides & Zero `!important`**: Never write child-override CSS selectors (such as `.process-heading h2`, `.cta-band h2` overriding `font-size`). `!important` is STRICTLY PROHIBITED.
5. **Universal Icon vs Image Disambiguation Engine**: Thoroughly inspect `<img>` and `<svg>` nodes: any element with dimensions <= 64px, class names matching `icon` or `image-20px..image-45px`, `.svg` extensions, or positioned inside badges, bullets, or timelines MUST be classified as an **Icon Node** and mapped to inline **Lucide SVG** (`stroke-width="1.75"`). Never substitute icons with Unsplash photographs.
6. **Semantic Icon Selection & Anti-Repetition Contract**: Analyze the semantic keywords of each card's title and description to select matching Lucide icons (About -> `info`, Mission -> `rocket`, Vision -> `binoculars`, Security -> `shield-check`, Analytics -> `trending-up`). Adjacent cards in the same grid or list MUST NOT repeat the same icon. Icon colors must be empirically extracted from original computed styles, never estimated.
7. **Section Heading Dominance & Semantic Hierarchy Rule**: The primary title of every section MUST be an `<h2>` and must hold the largest font-size in that section (`var(--wp--preset--font-size--large)` or `x-large`). Sub-item card titles inside the section MUST be `<h4>` with `var(--wp--preset--font-size--medium)`. Eyebrows must be `<h6>` or `.eyebrow` with `var(--wp--preset--font-size--small)`. Card headings are strictly prohibited from matching or exceeding section heading font-sizes.
8. **Equal Height Cards & Spacing Architecture**: All cards in the same flex/grid row MUST have `align-items: stretch; display: flex; flex-direction: column; height: 100%;` and pin CTA button baselines using `margin-top: auto;`. Mobile gutters (`<= 767px`) MUST be strictly maintained between `16px–20px`.
9. **Slider & Carousel Engineering Standards**: All sliders (Swiper or custom carousels) MUST feature autoplay (`delay: 3500ms - 4500ms`, pause on pointer hover), and slides must maintain equal heights (`height: 100%`). When displaying fractional slide counts (e.g. 3.5 items on desktop), the parent container must enforce `overflow: hidden` with a right-edge gradient fade overlay (`mask-image` or fade gradient) so the 0.5 slide peeks smoothly and intentionally.
10. **Ghost Section & Blank Content Elimination**: Never leave blank or invisible sections due to Webflow IX2 animation traps. The base CSS must declare fallback visibility (`opacity: 1; transform: none;`). Alternating sections (dark cards on light surfaces, light cards on dark canvases) must declare both background and text color tokens simultaneously. Strip all curtain masks (`.image-show-style`) and unclickable overlays.
11. **Total Elimination of Latin Placeholder Text**: Completely eliminate 100% of Latin dummy text ("Lorem ipsum", "Sed ut perspiciatis", "Sed acc...") from reference templates and author original, brand-authentic commercial English copywriting matching the exact structural length.
12. **100% Professional English for All Markdown & Spec Artifacts**: All markdown specification files (`Beplus-spec.md`), plan contracts, QA verification matrices (`No.`, `Section Name`, `Layout & Tokens`, `Heading Hierarchy (H2>H4)`, `Production Copy`, `Motion & Micro-Interactions`, `Assets & Lucide Icons`, `QA Verdict`), and conversational messages MUST be composed in 100% professional technical English. Never insert Vietnamese terms or translation artifacts into generated markdown deliverables.
13. **Scroll-Driven Text Illumination & Staggered Viewport Reveal**: 
    - **Word-by-Word Scroll Text Illumination (Scrub)**: When the reference section features scrub-based scroll illumination (e.g. *What We Offer*), the text must be tokenized into `<span class="scroll-word">` elements, initially muted (`opacity: 0.25; color: var(--wp--preset--color--paragraph)`), and illuminated sequentially via scroll tracking to `opacity: 1; color: var(--wp--preset--color--contrast)` (or `#ffffff` on dark canvases).
    - **Staggered Viewport Entrance**: Cards, bento modules, and feature blocks entering the viewport MUST execute sequential fade-up motion (`opacity: 0; transform: translateY(32px)`) triggered via `IntersectionObserver` with staggered transition delays `calc(var(--index, 0) * 0.1s)`.
    - **Card & Arrow Micro-Interactions**: Hovering over cards MUST trigger tactile elevation (`transform: translateY(-4px)`), smooth drop-shadow deepening, diagonal arrow translation (`translate(3px, -3px)`), and subtle image scaling (`scale(1.04)`). Never leave interactive cards inert.
14. **Responsive Mobile Navigation Drawer & Hamburger Toggle**: On mobile viewports (`<= 767px`), the navigation must never collapse into an inaccessible state. Synthesize a functional hamburger toggle button (`<button class="menu-toggle" aria-label="Toggle navigation">` with Lucide `menu` / `x` icons) and a slide-down or off-canvas drawer containing all primary navigation links and CTA buttons.
15. **Zero-Deviation Topology Replication & Thematic Harmony Contract**:
    - The AI must never hallucinate or invent generic box layouts differing from the reference site. The exact geometric topology and visual layering of every component MUST be preserved 1:1:
      * **Hero Architecture**: If the reference site uses a floating island navbar (detached rounded pill navigation) + dark corporate background imagery with tonal overlay + ghost CTA button (`border: 1px solid white; background: transparent;`), strictly reproduce the floating island navbar and ghost button. Never flatten into a generic full-width sticky bar.
      * **Split Cards with Floating Overlays (e.g. What We Offer)**: If the reference card is a 50/50 split (left column: step index `01` + title + description + CTA; right column: photo frame + **floating elevated white card overlapping the image** containing 3 feature capsules with icons), faithfully reproduce the exact 50/50 split and elevated floating card. Never flatten into an unstyled grid.
      * **Bento Grid Contrasting Cards**: If the reference bento grid pairs photographic cards (`bg`), white cards (`white`), and dark cards (`black`), maintain the surface color contrasts of each individual module.
      * **Photographic Thematic Harmony**: High-resolution Unsplash photos must strictly align with the thematic context of the reference imagery (e.g., corporate boardrooms and technology hardware must be mapped to corporate strategy and hardware photos, never irrelevant cityscapes).
16. **Workspace Hygiene & Scratchpad Isolation Mandate**:
    - Never write or leave raw scraped HTML dumps (`target.html`, `dump.html`, `raw.html`, `temp.html`) in the project root directory. OpenDesign automatically indexes root directory files and exposes them in the web file tree (`/files/target.html`), causing user confusion that the AI copied raw code rather than building from spec.
    - All DOM inspections must be processed in-memory via CDP port 9222 (`Runtime.evaluate`) or isolated in temporary external directories (such as `/tmp/scratchpad/`) and purged (`rm -rf`) before completing Phase 1. The project root must exclusively contain official deliverables (`Beplus-spec.md`, `index.html`, `main.css`).
17. **Context-Proportional Optical Icon Hierarchy (Anti-Miniaturization Standard)**:
    - **Respect Reference Box Topology (Icon-box is NOT universally mandatory)**: An outer container box (`.feature-icon-box` or `.bento-badge`) is NOT required everywhere. Faithfully respect the original reference design:
      * If the reference design has an icon box (squircle badge, circular wrapper, container tile), reproduce the container box with subtle background tinting and appropriate border-radius.
      * If the reference design uses **unboxed / standalone icons** (floating directly next to titles, headers, or inside cards without a box), KEEP THEM UNBOXED! Do NOT force an artificial `.feature-icon-box` container onto designs that do not have one.
    - **Proportional Optical Sizing (Never Too Small)**: Regardless of whether an icon is boxed or unboxed, its dimensions and stroke weight MUST scale proportionally to its adjacent content so it never looks dwarfed or miniaturized:
      * **Metric / Stat Cards (`8,000+`, large numbers)**: If boxed, use ~52px container tile with 28px icon. If unboxed, scale the icon to a prominent `32px – 40px` with `stroke-width="1.75"` to balance the heavy numerical typography.
      * **Feature Cards / Service Headlines (H3/H4 titles)**: If boxed, use ~38px tile with 20px icon. If unboxed, scale the icon to `24px – 28px` with `stroke-width="1.5 – 1.75"` so it sits in visual equilibrium with the title.
      * **List Items / Micro-Affordances / Buttons**: `16px – 20px` with `stroke-width="1.75"`.
    - **Anti-Miniaturization Invariant**: Icons must NEVER be rendered too small (e.g. 12px–14px hairlines) next to bold headlines.
    - **Zero AI Sparkle Ban**: Generic sparkle icons (`✨`), magic wands, or AI stars are strictly prohibited.
18. **Sticky Stacking Cards Scroll Engine**:
    - For multi-card feature or service sections (such as *What We Offer*), desktop viewports (`min-width: 768px`) MUST implement native CSS `position: sticky; top: calc(...); margin-bottom: calc(...);` with staggered increasing top offsets (`top: 80px, 110px, 140px...`).
    - As the user scrolls, cards glide up and stack sequentially like a physical 3D card deck with layered elevation shadows. On mobile viewports (`<= 767px`), gracefully degrade to `position: static` with clean gutters.
19. **WCAG AA Optical Contrast & Dark Canvas Typography Invariant**:
    - **Above-the-Fold Premature Dimming Ban**: Hero subtext and above-the-fold introductory copy MUST maintain 100% opacity (`opacity: 1`) and high contrast (`color: rgba(255, 255, 255, 0.88)` on dark canvases) upon initial page load. Strictly forbidden from wrapping hero copy in `scroll-word` spans or assigning opacity < 0.85 on entry.
    - **Dark Canvas Invariant**: All typography on dark surfaces (`.hero-section`, `.section-dark`, dark cards, background photos) must maintain a minimum 4.5:1 contrast ratio (WCAG AA). Dark text tokens (`var(--wp--preset--color--paragraph)` #6d6d6d or `--wp--preset--color--contrast` #201d1d) on dark backgrounds are strictly forbidden. Primary text uses `var(--wp--preset--color--base)` (#ffffff), and secondary body uses `rgba(255, 255, 255, 0.85)`.
    - **Dark Scroll Illumination**: Scroll-illuminated words (`scroll-word.is-lit`) on dark backgrounds MUST illuminate to pure bright white (`#ffffff`), never dark charcoal (`--contrast`).
20. **Ban on Base64 Data URI Image Ingestion & Plugin Disarmament**:
    - Never scrape and convert remote imagery into embedded Base64 data URIs (`data:image/webp;base64,...`). Embedding hundreds of kilobytes of base64 strings into HTML deliverables exhausts context tokens, degrades model generation speed, and triggers the 600-second daemon watchdog timeout ("Reply timed out"). All images must be mapped to semantic Unsplash URLs preserving aspect ratios or clean external URLs.
    - If OpenDesign auto-attaches `.od-skills/web-prototype-*`, purge it immediately and clear `applied_plugin_snapshot_id` so only `beplus-spec-remake` governs the project.

---

## 1. PHASE 1: FORENSIC ARCHITECTURAL SPECIFICATION

The AI must create `Beplus-spec.md` in the project root directory.

### Mandatory Content of `Beplus-spec.md`:
1. **Measured Global Design System Tokens**:
   - Primary Heading Font & Body Font stacks measured via CDP.
   - Strict 8-variable Gutenberg palette (`base`, `contrast`, `paragraph`, `primary`, `secondary`, `surface`, `border`, `accent #F59E0B`).
   - AlonePro fluid clamp scales for font sizes (`small` to `xx-large`) and spacings (`spacing-10` to `spacing-60`).
   - `theme.json` heading elements contract (h1 through h6).
2. **100% Structural Topology Fidelity**:
   - Replicate the EXACT measured block geometry for all sections (Header, Hero, Ticker, Services, Portfolio, About, Reviews, Blog, Footer).
   - If Services is a 4-row horizontal list with circular `↗` arrow buttons, DO NOT convert it into a generic 2x2 box grid.
   - If Working Process is a 2-column sticky split layout, DO NOT convert it into a flat 3-column equal grid.
   - If Testimonials is a multi-card horizontal slider bleeding off edges, DO NOT convert it into static boxes with letter initials.
3. **Universal Icon vs Image Disambiguation & Semantic Mapping Table**:
   - Audit all visual nodes: differentiate Content Photos (aspect-ratios, Unsplash) vs Icon Nodes (Lucide SVG `stroke-width="1.75"`).
   - Card-by-card semantic icon selection based on content keywords.
   - Exact extracted computed colors and parent badge background colors.
4. **Finalized Production Text Content (Zero "Demo" & Zero Latin Text)**:
   - 100% real commercial copywriting. Zero disclaimers (`DEMO CONTENT`, `DEMO TESTIMONIALS`, `Prototype note`).
   - Zero Latin dummy text (`Sed ut perspiciatis`, `Sed acc`, `Lorem ipsum` 100% rewritten).
   - Correct all reference typographical errors (`Real Woks` -> `Recent Works`, `Get free Qoute` -> `Get Free Quote`, `Recants Article` -> `Recent Articles`, `Let's Start Talk` -> `Let's Start Talking`).
5. **Exact Motion Engine & Interaction Contracts**:
   - Exact slider configurations (autoplay, speed, easing, loop, breakpoints).
   - Staggered entrances, scroll text illumination, sticky stacking card physics, and hover state curves.

---

### 1.1. Step-by-Step CDP Forensic Extraction Pipeline

Execute via headless Chromium on CDP port `9222`:

```javascript
// Step 1: Extract typography, colors, and layout metrics
node /app/skills/beplus-spec-remake/scripts/inspect-site.mjs [TARGET_URL]
```

Inspect the resulting JSON output for:
- Font families, sizes, line heights, and weights for all headings (`h1` - `h6`) and body copy.
- Background colors, text colors, and border colors mapped to Gutenberg tokens.
- Padding, margins, and gaps mapped to AlonePro spacing scale.
- Exact dimensions and aspect ratios for all images and icon containers.

---

### 1.2. Strict Gutenberg FSE Token Schema

All CSS variables in `main.css` and `Beplus-spec.md` MUST follow this exact schema:

#### A. Color Palette (8 Variables)
```css
:root {
  --wp--preset--color--base: #ffffff;        /* Canvas Background */
  --wp--preset--color--contrast: #111111;    /* Primary Text / Dark Canvas */
  --wp--preset--color--paragraph: #666666;   /* Body Copy / Muted Text */
  --wp--preset--color--primary: #0066cc;     /* Brand Core Accent / CTA */
  --wp--preset--color--secondary: #004499;   /* Hover State / Deep Accent */
  --wp--preset--color--surface: #f8f9fa;     /* Card / Module Background */
  --wp--preset--color--border: #e5e7eb;      /* Dividers / Card Strokes */
  --wp--preset--color--accent: #f59e0b;      /* Highlights / 5-Star Reviews */
}
```

#### B. Spacing Scale (6 Variables - Fluid Clamp)
```css
:root {
  --wp--preset--spacing--10: clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem);   /* 8px -> 12px */
  --wp--preset--spacing--20: clamp(1rem, 0.9rem + 0.5vw, 1.5rem);        /* 16px -> 24px */
  --wp--preset--spacing--30: clamp(1.5rem, 1.35rem + 0.75vw, 2.25rem);   /* 24px -> 36px */
  --wp--preset--spacing--40: clamp(2rem, 1.8rem + 1vw, 3rem);            /* 32px -> 48px */
  --wp--preset--spacing--50: clamp(3rem, 2.7rem + 1.5vw, 4.5rem);        /* 48px -> 72px */
  --wp--preset--spacing--60: clamp(4.5rem, 4.05rem + 2.25vw, 6.75rem);   /* 72px -> 108px */
}
```

#### C. Typography Scale (7 Variables - Fluid Clamp)
```css
:root {
  --wp--preset--font-size--small: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);   /* 12px -> 14px */
  --wp--preset--font-size--base: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);      /* 14px -> 16px */
  --wp--preset--font-size--medium: clamp(1.125rem, 1.05rem + 0.375vw, 1.35rem); /* 18px -> 21.6px */
  --wp--preset--font-size--medium-plus: clamp(1.35rem, 1.2rem + 0.75vw, 1.75rem); /* 21.6px -> 28px */
  --wp--preset--font-size--large: clamp(1.75rem, 1.5rem + 1.25vw, 2.5rem);      /* 28px -> 40px */
  --wp--preset--font-size--x-large: clamp(2.25rem, 1.85rem + 2vw, 3.5rem);      /* 36px -> 56px */
  --wp--preset--font-size--xx-large: clamp(3rem, 2.4rem + 3vw, 5rem);           /* 48px -> 80px */
}
```

#### D. Heading Elements Contract (theme.json elements)
```json
{
  "h1": { "typography": { "fontSize": "var(--wp--preset--font-size--xx-large)", "fontWeight": "700", "lineHeight": "1.05" }, "spacing": { "margin": { "top": "0", "bottom": "var(--wp--preset--spacing--30)" } } },
  "h2": { "typography": { "fontSize": "var(--wp--preset--font-size--large)", "fontWeight": "700", "lineHeight": "1.15" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--20)", "bottom": "var(--wp--preset--spacing--20)" } } },
  "h3": { "typography": { "fontSize": "var(--wp--preset--font-size--medium-plus)", "lineHeight": "1.25" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--20)", "bottom": "var(--wp--preset--spacing--10)" } } },
  "h4": { "typography": { "fontSize": "var(--wp--preset--font-size--medium)", "lineHeight": "1.25" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--10)", "bottom": "0.75rem" } } },
  "h5": { "typography": { "fontSize": "var(--wp--preset--font-size--base)", "lineHeight": "1.35" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--10)", "bottom": "0.5rem" } } },
  "h6": { "typography": { "fontSize": "var(--wp--preset--font-size--small)", "textTransform": "uppercase", "letterSpacing": "0.06em", "lineHeight": "1.4" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--10)", "bottom": "0.5rem" } } }
}
```

#### E. Strict Heading Dominance Rule
- **Section Heading**: MUST be `<h2>` with font size `var(--wp--preset--font-size--large)`. This is the most prominent headline in the section.
- **Card / Sub-Item Heading**: MUST be `<h4>` with font size `var(--wp--preset--font-size--medium)`.
- **Eyebrow / Kicker**: MUST be `<h6>` or `.eyebrow` with font size `var(--wp--preset--font-size--small)` and uppercase styling.
- **Invariant Rule**: Card titles MUST NEVER use `<h2>` and MUST NEVER equal or exceed the font size of the primary section headline.

---

### 1.3. Section-by-Section Decomposition Protocol

For EVERY section from Header to Footer, document:
1. **Exact Block Geometry & Placement**: Max-width (1280px), padding-block (`var(--wp--preset--spacing--50)`), gap tokens. Card grids MUST have `align-items: stretch;` and cards MUST have `display: flex; flex-direction: column; height: 100%;`. Mobile safe margins (`<= 767px`) MUST be strictly maintained between `16px–20px`.
2. **Finalized Production Text Content**: Clean all commercial typos and eliminate all Latin dummy copy ("Sed acc...", "Lorem ipsum").
3. **Universal Icon vs Image Mapping**:
   - Differentiate Content Photos vs Icon Nodes.
   - Map Content Photos to Unsplash preserving aspect ratios.
   - Map Icon Nodes to inline Lucide SVGs (`stroke-width="1.75"`) with context-aware semantic matching and exact computed color tokens.
4. **Slider / Carousel Standards**:
   - Autoplay: delay 4000ms, pause on hover.
   - Equal height slides.
   - Fractional slides (e.g. 3.5 items on desktop): container `overflow: hidden;` with right-edge gradient overlay fade.
5. **4-Tier Motion Choreography Blueprint**: On-load, scroll-triggered, hover, and ambient continuous loop.
6. **QA Acceptance Contract**: Explicit verification table with `PASS` verdict.

---

### 1.4. Human Review Checkpoint (Stop & Confirm)

After writing `Beplus-spec.md`, the AI MUST STOP and print the executive summary:

```text
I have completed the forensic architectural specification Beplus-spec.md based on real measured data from [Target Site A].

Summary of Findings:
- Total Sections Identified: [N]
- Primary Typography: Heading: [Font A], Body: [Font B]
- Key Palette Tokens: Base: [Hex], Contrast: [Hex], Primary: [Hex]
- Total Icons Disambiguated: [N] Lucide SVGs (stroke-width: 1.75) mapped semantically
- Content Quality: 100% of Latin dummy text and template typos replaced with production-ready commercial copy.

Please review Beplus-spec.md. Once approved, I will proceed to Phase 2: Spec-Driven Build & In-Place Refactoring.
```

---

## 2. PHASE 2: SPEC-DRIVEN BUILD & IN-PLACE REFACTORING

Upon human approval, the AI reads `Beplus-spec.md` and generates or refactors `index.html` and `main.css`.

### Mandatory Rules for Phase 2:
1. **100% Gutenberg Token Usage**:
   - Every font-size must be `var(--wp--preset--font-size--*)`.
   - Every padding/margin/gap must be `var(--wp--preset--spacing--*)`.
   - Every color must be `var(--wp--preset--color--*)`.
   - Zero hardcoded pixel sizes or hex colors on component classes.
2. **Context-Proportional Optical Icon Hierarchy & Anti-Miniaturization**:
   - Any `<img>` <= 64px or SVG icon MUST be replaced with inline Lucide SVG.
   - **TOPOLOGY-AWARE OPTICAL SIZING & SCALE BALANCE**:
     * **Respect Reference Box Topology**: Outer container boxes are NOT mandatory everywhere. If the reference site has boxed icons, reproduce the container box (`.bento-badge` ~52px, `.feature-icon-box` ~38px). If the reference site uses standalone unboxed icons, keep them unboxed! Never artificially box icons that were standalone in the reference.
     * **Proportional Scaling with Adjacent Content**: Ensure icon dimensions scale proportionally to adjacent typography:
       - Large Metric / Stat cards: `28px` (in ~52px box) or `32px–40px` (unboxed) with `stroke-width="1.75"`.
       - Feature / Service headlines: `20px` (in ~38px box) or `24px–28px` (unboxed) with `stroke-width="1.5 – 1.75"`.
       - Buttons / List chevrons: `16px–20px`.
     * **Anti-Miniaturization Rule**: Icons must NEVER be rendered too small (e.g. 12px–14px hairline) next to prominent bold headlines.
   - AI sparkle icons (`✨`), magic wands, and generic placeholder graphics are STRICTLY FORBIDDEN.
3. **Native CSS Sticky Stacking Cards Engine**:
   - Multi-card feature or service decks (*What We Offer*) MUST implement native CSS `position: sticky; top: calc(...); margin-bottom: calc(...);` with staggered increasing top offsets (`top: 80px, 110px, 140px...`).
   - Cards stack sequentially on desktop with multi-layer elevation drop-shadows, and gracefully degrade to `position: static` on mobile (`<= 767px`).
4. **WCAG AA Optical Contrast & Dark Canvas Typography Invariant**:
   - Hero introductory copy above-the-fold MUST maintain 100% opacity (`opacity: 1`) and high contrast (`color: rgba(255, 255, 255, 0.88)` on dark canvases) upon initial load. Never wrap hero copy in `scroll-word` spans.
   - All text on dark surfaces must maintain a minimum 4.5:1 contrast ratio. Dark text tokens on dark surfaces are strictly forbidden.
   - Scroll-illuminated words on dark backgrounds MUST illuminate to pure bright white (`#ffffff`).
5. **Section Heading Dominance Enforcement**:
   - Every section must have an `<h2>` styled with `var(--wp--preset--font-size--large)` (28px - 40px fluid).
   - Every card within a section must have an `<h4>` styled with `var(--wp--preset--font-size--medium)` (18px - 21.6px fluid).
   - Section headings MUST visually dominate card headings.
6. **Card Geometry & Layout**:
   - All cards in flex/grid rows must have `height: 100%; display: flex; flex-direction: column;`.
   - Card CTA buttons must have `margin-top: auto;` to align baselines.
   - Card rows must have `align-items: stretch;`.
7. **Slider / Carousel Implementation**:
   - If a carousel exists, include native Swiper or lightweight vanilla JS carousel with `autoplay: { delay: 4000, pauseOnMouseEnter: true }`.
   - Slide items must be equal height.
   - Fractional slide views must have container `overflow: hidden;` with right-edge fade mask.
8. **Motion Engine (Native Vanilla JavaScript)**:
   - Include vanilla JavaScript for:
     1. **`initScrollIllumination()`**: Calculates scroll progress through sections with text highlights (e.g. *What We Offer*), sequentially illuminating `<span class="scroll-word">` from `opacity: 0.25` to `opacity: 1.0; color: #ffffff;`.
     2. **`initScrollEntrance()`**: `IntersectionObserver` observing all `[data-reveal]` elements with staggered entrance classes.
     3. **`initMobileMenu()`**: Interactive drawer toggle toggling `.is-open` and updating ARIA attributes.
     4. **`initCounters()`**: Animated number counters for metric statistics.

---

## 3. PHASE 3: AUTOMATED QUALITY GATE

Run the automated verification script to validate compliance before presenting deliverables:

```python
import re, sys, os
from bs4 import BeautifulSoup

html = open("index.html").read()
css = open("main.css").read()
soup = BeautifulSoup(html, "html.parser")

errors = []

# 1. Spec presence
spec_file = "Beplus-spec.md" if os.path.exists("Beplus-spec.md") else ("beplus-spec.md" if os.path.exists("beplus-spec.md") else ("CLONE-SPEC.md" if os.path.exists("CLONE-SPEC.md") else None))
if not spec_file:
    errors.append("CRITICAL: Beplus-spec.md does not exist in workspace!")

# 2. Zero !important
if "!important" in css:
    errors.append("RULE VIOLATION: Found !important in main.css! Must be 100% clean.")

# 3. Standard FSE Tokens Check
required_tokens = [
    "--wp--preset--color--base",
    "--wp--preset--color--contrast",
    "--wp--preset--color--paragraph",
    "--wp--preset--color--primary",
    "--wp--preset--spacing--10",
    "--wp--preset--spacing--20",
    "--wp--preset--spacing--30",
    "--wp--preset--spacing--40",
    "--wp--preset--spacing--50",
    "--wp--preset--spacing--60",
    "--wp--preset--font-size--small",
    "--wp--preset--font-size--base",
    "--wp--preset--font-size--medium",
    "--wp--preset--font-size--large",
    "--wp--preset--font-size--xx-large"
]
for t in required_tokens:
    if t not in css:
        errors.append(f"MISSING TOKEN: Required FSE token '{t}' not defined in :root!")

# 4. Zero hardcoded px font-sizes outside :root
css_body = css[css.find("}"):] if "}" in css else css
px_font_sizes = re.findall(r"font-size:\s*\d+px", css_body)
if px_font_sizes:
    errors.append(f"TOKEN DEFECT: Found {len(px_font_sizes)} hardcoded pixel font-sizes outside :root! Must use var(--wp--preset--font-size--*).")

# 5. Section Heading Dominance Check (H2 must be larger than H4)
h2_tags = soup.find_all("h2")
h4_tags = soup.find_all("h4")
if len(h2_tags) < 2:
    errors.append("HEADING DEFECT: Insufficient <h2> section headings! Every major section must have an <h2>.")

# 6. Equal Height Cards Check
card_rows = soup.find_all(class_=re.compile(r"grid|cards|flex|row", re.I))
# Verify stretch alignment exists in css
if "align-items: stretch" not in css and "align-items:stretch" not in css:
    errors.append("LAYOUT DEFECT: Missing 'align-items: stretch' on card containers!")

# 7. Optical Icon Hierarchy & AI sparkle ban
if re.search(r"sparkles", html, re.I):
    errors.append("ICON DEFECT: AI sparkle icons are strictly prohibited!")

# Check for miniaturized hairline icons (< 16px outside buttons/interactive links)
tiny_svgs = soup.find_all(lambda tag: tag.name == 'svg' and tag.get('width') in ['10', '12', '14'] and not tag.find_parent(['button', 'a', '.btn']))
if tiny_svgs:
    errors.append(f"ICON DEFECT: Found {len(tiny_svgs)} miniaturized (< 16px) SVGs outside buttons! Scale icons proportionally (24px-28px unboxed, 38px-52px boxed) to match content.")

# 8. Zero Latin dummy text
latin_matches = re.findall(r"\b(lorem|ipsum|sed\s+ut|sed\s+acc|dolor\s+sit|consectetur)\b", html, re.I)
if latin_matches:
    errors.append(f"CONTENT DEFECT: Found {len(latin_matches)} Latin placeholder words in HTML! Must replace with 100% production copy.")

# 9. Zero legacy scraped images
legacy_images = soup.find_all("img", src=re.compile(r"webflow|cdn\.prod\.website-files|uploads-ssl", re.I))
if legacy_images:
    errors.append(f"ASSET DEFECT: Found {len(legacy_images)} legacy Webflow/scraped images! Must replace 100% with Unsplash photos.")

# 10. Swiper / Slider Autoplay check (if slider exists)
if "swiper" in html.lower():
    if "autoplay" not in html and "autoplay" not in css:
        errors.append("SLIDER DEFECT: Swiper slider detected but autoplay configuration is missing!")

# 11. Zero Specificity Traps (.link-block, ._24px-link overriding h3/h4)
if re.search(r"\._\d+px-link|\.heading-link\s+h[1-6]", css):
    errors.append("SPECIFICITY TRAP: Found utility class overriding semantic heading font-sizes! Use semantic classes instead.")

# 12. Bento Portrait Aspect Ratio Check
if re.search(r"bento", html, re.I):
    if "aspect-ratio" not in css:
        errors.append("BENTO DEFECT: Bento grid detected but missing explicit aspect-ratio definitions for visual cards!")

# 13. Frosted Glass Badge Clearance
if re.search(r"backdrop-filter", css):
    if "margin-bottom" not in css and "padding-bottom" not in css:
        errors.append("BADGE CLEARANCE DEFECT: Frosted glass badges must have explicit clearance margins above headings!")

# 14. Anti-Duplicate Card Title Check
seen_titles = {}
for h in soup.find_all(["h3", "h4", "h5"]):
    text = h.get_text().strip()
    if len(text) > 4 and text not in ["Learn More", "Read More", "Get Started", "View Details"]:
        seen_titles[text] = seen_titles.get(text, 0) + 1
duplicates = [t for t, count in seen_titles.items() if count > 1]
if duplicates:
    errors.append(f"DUPLICATE CONTENT DEFECT: Found duplicated card titles: {duplicates}! Every card must have a unique commercial headline.")

# 15. 100% English Markdown Artifacts Audit
if spec_file and os.path.exists(spec_file):
    spec_content = open(spec_file).read()
    vn_terms = re.findall(r"\b(STT|Tên Section|Bố cục|Nội dung|Chuyển động|Hình ảnh|Tiêu chí đối soát|Thực tế kiểm định|Kết luận|Bảng tổng duyệt)\b", spec_content, re.I)
    if vn_terms:
        errors.append(f"LANGUAGE DEFECT: Found Vietnamese terms ({set(vn_terms)}) in {spec_file}! All markdown deliverables MUST be 100% English.")

# 16. Mobile Hamburger Navigation Audit
has_mobile_toggle = soup.find(class_=re.compile(r"menu-toggle|mobile-menu|hamburger|nav-toggle", re.I)) or soup.find("button", attrs={"aria-label": re.compile(r"menu|navigation", re.I)})
if not has_mobile_toggle:
    errors.append("MOBILE UX DEFECT: Missing mobile hamburger toggle button! Must include <button class=\"menu-toggle\" aria-label=\"Toggle navigation\"> with Lucide menu icon.")

# 17. Native Motion & Interaction Script Audit
if not re.search(r"IntersectionObserver|initScroll|initMobile|initSlider|scroll-word", html):
    errors.append("MOTION DEFECT: Missing interactive script engine! index.html must include native vanilla JS for scroll reveal, word illumination, and mobile menu.")

# 18. Component Topology & Anti-Flattening Audit (What We Offer 50/50 Split & Floating Overlays)
offer_cards = soup.find_all(class_=re.compile(r"offer-card|split-card", re.I))
if offer_cards:
    for oc in offer_cards:
        has_media = oc.find(class_=re.compile(r"offer-images|card-media|media-frame", re.I))
        has_details = oc.find(class_=re.compile(r"offer-details|card-details|content-col", re.I))
        if not (has_media and has_details):
            errors.append("TOPOLOGY DEFECT: Split card has been flattened! Must preserve 2-column split (content column + media frame with floating overlay card).")
            break

# 19. Workspace Hygiene & Raw Dump Detection
for bad_file in ["target.html", "dump.html", "raw.html", "scraped.html", "temp.html"]:
    if os.path.exists(bad_file):
        errors.append(f"WORKSPACE HYGIENE DEFECT: Found raw scraped dump file '{bad_file}' in project root! Intermediate dumps must be isolated in /tmp/ or deleted.")

# 20. Sticky Stacking Cards Scroll Engine Audit
if re.search(r"offer-card|offer-list", html):
    if "position: sticky" not in css and "position:sticky" not in css:
        errors.append("SCROLL DEFECT: Multi-card offer section missing Sticky Stacking Cards interaction! Must use desktop 'position: sticky' with staggered top offsets.")

# 21. WCAG AA Contrast & Dark Canvas Typography Invariant Audit
if re.search(r"hero[^\"]*scroll-illuminated|hero-desc[^\"]*scroll-word", html, re.I):
    errors.append("CONTRAST DEFECT: Hero subtext must NEVER have scroll-word illumination or opacity < 0.85 on initial load! Hero copy is above-the-fold and must be 100% visible, fully opaque, and high-contrast (color: rgba(255, 255, 255, 0.88) on dark canvas).")

# 22. Base64 Data URI Ingestion Ban Audit
base64_images = soup.find_all("img", src=re.compile(r"data:image/[^;]+;base64,", re.I))
if len(base64_images) > 0:
    errors.append(f"PERFORMANCE DEFECT: Found {len(base64_images)} embedded base64 data URI images! Never embed base64 images; map 100% to Unsplash or external CDN.")

if errors:
    print("=== QUALITY AUDIT FAILED ===")
    for e in errors:
        print(f"❌ {e}")
        sys.exit(1)
else:
    print("=== 100% SPEC-DRIVEN QUALITY AUDIT PASSED! ===")
```

---

## 4. SKILL SOURCE & VERSION CONTROL (GIT)

The master source code, inspection scripts, templates, and reference manuals for `beplus-spec-remake` are version-controlled in a public GitHub repository:
- **Repository**: `https://github.com/ducdung196qtr/beplus-spec-remake.git` (Public)
- **Local Directory**: `/root/.hermes/skills/web-design/beplus-spec-remake`
- **Docker Mount/Sync**: `/app/skills/beplus-spec-remake` inside container `open-design`
- **Sync Command**:
  ```bash
  docker cp /root/.hermes/skills/web-design/beplus-spec-remake/. open-design:/app/skills/beplus-spec-remake/
  docker exec -u 0 open-design chown -R 1001:1001 /app/skills/beplus-spec-remake
  docker exec -u 0 open-design chmod -R a+rX /app/skills/beplus-spec-remake
  ```
- **Git Push/Rollback Protocol**: After major updates or before experimental modifications, commit and push to `origin main` (`git push origin main`) to ensure clean rollback capability.
