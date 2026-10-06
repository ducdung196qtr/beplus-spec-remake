# ARCHITECTURAL DESIGN SPECIFICATION: [TARGET_SITE_A_URL]

> **Master Forensic Architecture & Implementation Blueprint for WordPress Gutenberg FSE Reconstruction**  
> *MANDATE: Every parameter, coordinate, font clamp, hex token, text string, animation physics curve, and asset mapping in this document is derived from live Chrome DevTools Protocol (CDP port 9222) and computed CSS forensics. GUESSING, ESTIMATING, OR USING "PENDING" PLACEHOLDERS IS STRICTLY PROHIBITED. ALL SPECIFICATIONS AND TABLES MUST BE WRITTEN IN 100% PROFESSIONAL COMMERCIAL ENGLISH.*

---

## 1. Global Design System & Token Foundation

### 1.1. Core Palette Tokens (Gutenberg FSE Strict 8-Variable System)
Derived empirically from the computed CSS color histogram and theme variables:
```css
:root {
  --wp--preset--color--base: [CANVAS_BG_HEX];        /* Primary page background canvas */
  --wp--preset--color--contrast: [DARK_TEXT_HEX];    /* Primary headings, titles, dark containers */
  --wp--preset--color--paragraph: [BODY_TEXT_HEX];   /* Body copy, descriptions, subtle text */
  --wp--preset--color--primary: [BRAND_ACCENT_HEX];  /* Brand core CTA, buttons, highlights */
  --wp--preset--color--secondary: [HOVER_ACCENT_HEX];/* Hover states, secondary interactive cues */
  --wp--preset--color--surface: [SURFACE_BG_HEX];    /* Card surfaces, panels, elevated wrappers */
  --wp--preset--color--border: [BORDER_STROKE_HEX];  /* Dividers, card strokes, subtle outlines */
  --wp--preset--color--accent: #F59E0B;              /* MANDATORY: Rating Star Gold (#F59E0B) */
}
```

### 1.2. Typography Stacks & Fluid Clamp Scales
Measured from live browser DOM via CDP `getComputedStyle()`:
- **Heading Stack**: `--nextora-font-heading: [MEASURED_HEADING_FONT], sans-serif;`
- **Body Stack**: `--nextora-font-body: [MEASURED_BODY_FONT], sans-serif;`

#### AlonePro Fluid Viewport Clamps
```css
--wp--preset--font-size--small: clamp(0.875rem, 0.84rem + 0.2vw, 1rem);
--wp--preset--font-size--base: clamp(1rem, 0.94rem + 0.3vw, 1.125rem);
--wp--preset--font-size--medium: clamp(1.25rem, 1.12rem + 0.55vw, 1.5rem);
--wp--preset--font-size--medium-plus: clamp(1.5rem, 1.25rem + 0.9vw, 2rem);
--wp--preset--font-size--large: clamp(1.875rem, 1.55rem + 1.2vw, 2.5rem);
--wp--preset--font-size--x-large: clamp(2.375rem, 1.8rem + 2vw, 3.75rem);
--wp--preset--font-size--xx-large: clamp(3rem, 2rem + 3.5vw, 7.5rem);

--wp--preset--spacing--10: clamp(0.75rem, 0.65rem + 0.35vw, 1rem);
--wp--preset--spacing--20: clamp(1rem, 0.8rem + 0.7vw, 1.5rem);
--wp--preset--spacing--30: clamp(1.5rem, 1.2rem + 1vw, 2rem);
--wp--preset--spacing--40: clamp(1.75rem, 1.35rem + 1.5vw, 3rem);
--wp--preset--spacing--50: clamp(2.5rem, 1.8rem + 2.5vw, 4.5rem);
--wp--preset--spacing--60: clamp(3.75rem, 2.6rem + 4vw, 7rem);
```

### 1.3. Heading Contract (theme.json)
```json
{
  "heading": { "color": { "text": "var(--wp--preset--color--contrast)" }, "typography": { "fontFamily": "var(--nextora-font-heading)", "fontWeight": "600", "lineHeight": "1.25" } },
  "h1": { "typography": { "fontSize": "var(--wp--preset--font-size--x-large)", "fontWeight": "700", "lineHeight": "1.15" }, "spacing": { "margin": { "top": "0", "bottom": "var(--wp--preset--spacing--40)" } } },
  "h2": { "typography": { "fontSize": "var(--wp--preset--font-size--large)", "fontWeight": "600", "lineHeight": "1.3" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--20)", "bottom": "var(--wp--preset--spacing--10)" } } },
  "h3": { "typography": { "fontSize": "var(--wp--preset--font-size--medium-plus)", "lineHeight": "1.25" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--20)", "bottom": "var(--wp--preset--spacing--10)" } } },
  "h4": { "typography": { "fontSize": "var(--wp--preset--font-size--medium)", "lineHeight": "1.25" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--10)", "bottom": "0.75rem" } } },
  "h5": { "typography": { "fontSize": "var(--wp--preset--font-size--base)", "lineHeight": "1.35" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--10)", "bottom": "0.5rem" } } },
  "h6": { "typography": { "fontSize": "var(--wp--preset--font-size--small)", "textTransform": "uppercase", "letterSpacing": "0.06em", "lineHeight": "1.4" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--10)", "bottom": "0.5rem" } } }
}
```

---

## 2. Section-by-Section Forensic Engineering Specification

*(Repeat the specification block below for ALL 12 sections from Section 01 Header to Section 12 Footer)*

### Section [XX]: [SECTION_TITLE_FROM_DOM]

#### A. Block Geometry, Structural Topology & Equal Heights
- **Measured Dimensions**: `height: [MEASURED_PX_OR_AUTO]`, `padding-block: var(--wp--preset--spacing--50)`
- **Layout Architecture**: [Flexbox / CSS Grid / Asymmetrical Split / Bento Grid / Multi-card Carousel]
- **Grid Configuration**: `grid-template-columns: repeat([N], 1fr); gap: var(--wp--preset--spacing--30);`
- **Equal Heights Mandate**: All cards within this row MUST have `display: flex; flex-direction: column; height: 100%; align-items: stretch;`. Bottom action links or buttons MUST use `margin-top: auto;` to align baselines across the row.
- **Mobile Responsive Container**: Mobile viewports (`<= 767px`) MUST enforce strict horizontal side gutters between `16px` and `20px` (`padding-inline: var(--wp--preset--spacing--20)`).
- **Navigation Drawer (If Section is Header)**: Mobile header MUST include a functional hamburger button (`<button class="menu-toggle" aria-label="Toggle navigation">` with Lucide `menu`/`x` SVG) opening a dedicated navigation drawer.

#### B. Semantic Heading Hierarchy & Content Copywriting
- **Eyebrow / Kicker**: `<h6>` or `<span class="eyebrow">` -> `[MEASURED_OR_ENHANCED_EYEBROW_TEXT]` (`var(--wp--preset--font-size--small)`)
- **Primary Section Title**: `<h2>` -> `[MEASURED_OR_ENHANCED_SECTION_TITLE]` (`var(--wp--preset--font-size--large)`)
  * *Heading Dominance Rule*: The section title `<h2>` MUST have the largest font size in this section.
- **Card Sub-Headings**: `<h4>` -> `[CARD_1_TITLE]`, `[CARD_2_TITLE]`, ... (`var(--wp--preset--font-size--medium)`)
  * *Strict Prohibition*: Internal card headings must NEVER use `<h2>` or exceed the scale of the section title.
- **Card Body Text**: `<p>` -> `[CARD_1_BODY]`, `[CARD_2_BODY]`, ... (`var(--wp--preset--font-size--base)`)
- **Zero Latin Copywriting Mandate**: 100% genuine commercial English copy. Zero Latin dummy text (`Lorem ipsum`, `Sed ut perspiciatis`, `Sed acc` are strictly forbidden). Zero duplicate titles across sibling cards.

#### C. Forensic Motion Physics, Scroll Interactions & Micro-Interactions
- **Tier 1: On-Load / Viewport Entrance**:
  - Initial State: `opacity: 0; transform: translateY(32px);`
  - Active State (`.is-reveal`): `opacity: 1; transform: translateY(0);`
  - Transition Physics: `transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);`
  - Stagger Sequence: `transition-delay: calc(var(--item-index, 0) * 0.1s);`
  - Trigger: `IntersectionObserver` observing elements with `threshold: 0.15, rootMargin: "0px 0px -50px 0px"`.
- **Tier 2: Scroll-Driven Text Illumination (Word-by-Word Highlight Scrub)**:
  - *Applicability*: Essential for hero headlines, mission statements, and section intros (e.g. *What We Offer*).
  - Markup: Text wrapped into inline words `<span class="scroll-word">[WORD]</span>`.
  - Base State: `opacity: 0.25; color: var(--wp--preset--color--paragraph); transition: opacity 0.25s ease, color 0.25s ease;`
  - Illuminated State (`.is-lit`): `opacity: 1.0; color: var(--wp--preset--color--contrast);`
  - Script Driver: Viewport progress calculation illuminating words sequentially as the user scrolls through the section container.
- **Tier 3: Card & Interactive Hover Physics**:
  - Container Lift: `transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.12); border-color: rgba(255,255,255,0.2); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;`
  - Arrow Icon Glide: `.card:hover .card-arrow { transform: translate(3px, -3px); }`
  - Media Zoom: `.card:hover img { transform: scale(1.04); transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }`
- **Tier 4: Continuous Loops & Ambient Motion**:
  - Logo Tickers & Marquees: `@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`
  - Timing: `30s linear infinite`, seamless without stutter, no pause on hover.
- **Tier 5: Slider & Carousel Physics (If Applicable)**:
  - Autoplay: Enabled (`delay: 4000ms`, pause on pointer hover).
  - Navigation: Synchronized baseline navigation buttons with Lucide arrow icons (`arrow-left`, `arrow-right`).
  - Peeking Fractional Slides (e.g. 3.5 items): Masked right-edge fade overlay (`linear-gradient(to right, transparent, var(--wp--preset--color--base))`).
- **Tier 6: Sticky Stacking Card Deck Physics (e.g. What We Offer 50/50 Split Cards)**:
  - *Applicability*: Multi-card showcase sections where cards progressively slide up and stack over previous cards.
  - Desktop Implementation: `.offer-list-wrapper { position: sticky; top: calc(var(--wp--preset--spacing--40) * index); margin-bottom: calc(var(--wp--preset--spacing--60) * (total - index)); }`
  - Stacking Effect: Lower cards glide upwards and dock over preceding cards, forming a tactile "card-deck peeling" interaction with layered drop shadows.
  - Mobile Degradation (`<= 767px`): Strictly collapses to `position: static` with standard vertical rhythm.

#### D. Exact Component Anatomy & HTML Structural Blueprint (Zero-Hallucination Mandate)
*The AI OpenDesign engine MUST reconstruct this section following this EXACT component nesting and geometry. Flattening composite cards into generic boxes is strictly prohibited.*
```html
<!-- Exact Component Hierarchy Blueprint -->
<div class="section-wrapper [SECTION_THEME_CLASS]">
  <div class="container">
    <div class="section-header">
      <span class="eyebrow">[EYEBROW]</span>
      <h2 class="section-title scroll-illuminated">[MAIN_H2_WITH_WORD_SPANS]</h2>
    </div>
    <!-- Component Body: If Split Cards (e.g. 50/50 Services) -->
    <div class="card-collection">
      <div class="card-item split-layout" data-reveal>
        <div class="card-content-left">
          <span class="card-index">01</span>
          <h4 class="card-title">[TITLE]</h4>
          <p class="card-desc">[DESCRIPTION]</p>
          <a class="button ghost-or-solid">[ACTION_CTA] &raquo;</a>
        </div>
        <div class="card-media-right">
          <div class="media-frame"><img src="[UNSPLASH_IMAGE]" alt="[TITLE]"></div>
          <!-- Floating Feature Overlay Card (Tier 2 Optical Hierarchy with Container Tiles) -->
          <div class="floating-overlay-card">
            <div class="feature-capsule">
              <div class="feature-icon-box">
                <svg class="lucide lucide-[ICON_1]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><!-- path --></svg>
              </div>
              <div class="capsule-content">
                <strong>[FEAT_1]</strong>
                <p>[DESC_1]</p>
              </div>
            </div>
            <div class="feature-capsule">
              <div class="feature-icon-box">
                <svg class="lucide lucide-[ICON_2]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><!-- path --></svg>
              </div>
              <div class="capsule-content">
                <strong>[FEAT_2]</strong>
                <p>[DESC_2]</p>
              </div>
            </div>
            <div class="feature-capsule">
              <div class="feature-icon-box">
                <svg class="lucide lucide-[ICON_3]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><!-- path --></svg>
              </div>
              <div class="capsule-content">
                <strong>[FEAT_3]</strong>
                <p>[DESC_3]</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### E. Asset, Icon & Media Specifications
- **Photography (100% Real Unsplash Imagery)**:
  - Asset 1: URL `https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=1200&q=80`, Aspect Ratio `[16:10 / 4:3 / 1:1]`, Subject `[DESCRIPTION]`.
- **Universal Icon vs Image Disambiguation (100% Inline Lucide SVGs)**:
  - Heuristic: All original `<img>` tags with dimensions <= 64px, `.svg` files, or inside badge/button/timeline containers are classified as **Icon Nodes** (NEVER replaced with Unsplash photos).
  - Contextual Semantic Selection:
    * Card 1: `<svg class="lucide lucide-[ICON_1]" stroke="currentColor" stroke-width="1">...</svg>` (Mapped to [SEMANTIC_ROLE])
    * Card 2: `<svg class="lucide lucide-[ICON_2]" stroke="currentColor" stroke-width="1">...</svg>` (Mapped to [SEMANTIC_ROLE])
    * Card 3: `<svg class="lucide lucide-[ICON_3]" stroke="currentColor" stroke-width="1">...</svg>` (Mapped to [SEMANTIC_ROLE])
  - Anti-Repetition Rule: Zero duplicate icons across sibling cards in this section.
  - Color Tokens: Computed stroke/fill mapped to `var(--wp--preset--color--*)` (Rating Stars: `#F59E0B`).

#### 🎯 Section QA Acceptance Contract

##### A. Expected Production State
- **Geometry & Tokens**: Balanced flex/grid layout, FSE spacing tokens, mobile gutters 16-20px, strictly equal card heights.
- **Heading Hierarchy**: Section title is H2 (`var(--wp--preset--font-size--large)`), card sub-headings are H4 (`var(--wp--preset--font-size--medium)`).
- **Copywriting**: 100% commercial-grade English copywriting, zero typos, zero Latin dummy copy.
- **Motion & Interactions**: Active scroll text illumination, staggered card entrance, card hover physics, and autoplay sliders.
- **Asset Compliance**: High-resolution Unsplash photos and inline Lucide SVGs with `stroke-width="1"`.

##### B. Verification & Acceptance Table
| Verification Criterion | Expected Specification | Actual Finding | Verdict |
|---|---|---|:---:|
| **Layout & Token Compliance** | 100% FSE presets, equal height cards, 16-20px mobile gutters | Verified via theme.json tokens and flex stretch | **PASS** |
| **Heading Hierarchy Dominance** | Section H2 (large) > Card H4 (medium) > Eyebrow H6 (small) | Primary H2 is visually dominant, internal titles are H4 | **PASS** |
| **Commercial Copywriting** | Zero Latin dummy text, zero typos, 100% niche English copy | Rewritten with genuine commercial copy | **PASS** |
| **Motion Physics & Interactivity** | Scroll illumination, staggered entrance, hover physics | Native IntersectionObserver & CSS transition rules active | **PASS** |
| **Icon & Asset Compliance** | Inline Lucide SVGs (stroke=1), semantic matching, Unsplash photos | Contextual Lucide icons mapped, real photo ratios intact | **PASS** |

> **Section Outcome**: **PASS** *(Proceeds only when all 5 criteria achieve verified PASS)*

---

## 3. Master Section-by-Section Forensic QA Verification Matrix

*Comprehensive audit matrix verifying all sections from Header to Footer prior to human sign-off:*

| No. | Section Name | Layout & Tokens | Heading Hierarchy (H2>H4) | Production Copy | Motion & Micro-Interactions | Assets & Lucide Icons | QA Verdict |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| 01 | Header & Navigation | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 02 | Hero Banner | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 03 | Partner Logo Ticker | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 04 | About Us & Metrics | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 05 | Services Collection | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 06 | Portfolio Works | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 07 | 3-Step Process | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 08 | Specialty Ticker | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 09 | Testimonials & Reviews | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 10 | Call To Action (CTA) | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 11 | Recent Blog Articles | PASS | PASS | PASS | PASS | PASS | **PASS** |
| 12 | Footer & Newsletter | PASS | PASS | PASS | PASS | PASS | **PASS** |

> **Final Architectural Verdict**: **ALL SECTIONS PASS — SPECIFICATION FULLY APPROVED FOR HUMAN REVIEW**
