---
name: spec-driven-clone
en_name: Spec-Driven Clone & FSE Transform (Deep Analysis First)
description: |
  Autonomous 2-stage specification-driven clone & transformation engine for OpenDesign.
  Phase 1: Deep DOM & Computed Style Inspection of Web A, extracts real fonts, colors,
  sections, motion, and outputs a complete CLONE-SPEC.md (Gutenberg tokens, Heading rules,
  100% Unsplash image map, 100% Lucide stroke-width=1 icon map, content rewrite).
  Phase 2: Post-approval clone & in-place refactoring (0 !important, zero CSS overrides,
  flawless interactive preview). No guessing, strictly evidence-driven.
metadata:
  categories:
    - web-design
    - wordpress
    - hyperframes
  tags:
    - wordpress
    - fse
    - gutenberg
    - alonepro
    - spec-first
    - clone-to-theme
    - unsplash
    - lucide
---

# Spec-Driven Clone & FSE Transform Engine

Autonomous, evidence-driven engine for transforming ANY target website (Webflow, Framer, WordPress, Custom HTML) into a 100% production-ready **AlonePro WordPress Gutenberg FSE** theme.

> **SUPREME DIRECTIVE**: The AI operates on 100% REAL FORENSIC DATA measured from target site A. GUESSING, ESTIMATING, OR HALLUCINATING IS STRICTLY PROHIBITED. A comprehensive, forensic `CLONE-SPEC.md` must be authored and formally approved before a single line of production code is written or assets are cloned.

---

## INVOCATION CONTRACT: ONE-LINE TRIGGER

The user triggers this skill with a single clean line:
`@spec-driven-clone <TARGET_URL>`

**Zero extra prompting is required from the user.** All architectural standards, design token derivations, forensic section decomposition, asset mapping rules, and quality gates are completely embedded within this skill.

When invoked with `@spec-driven-clone <TARGET_URL>`:
1. Automatically parse `<TARGET_URL>` from the user message.
2. Execute **Phase 1 (Forensic Specification)**:
   - Run `node /app/skills/spec-driven-clone/scripts/inspect-site.mjs <TARGET_URL>` or inspect the DOM/CSS.
   - Extract real fonts into `--nextora-font-heading` and `--nextora-font-body`.
   - Build the strict 8-variable Gutenberg FSE palette from the color histogram.
   - Deconstruct every section (Block geometry, 1:1 content, exact motion parameters).
   - Generate the 3 mapping tables: 100% Unsplash real photos, 100% Lucide stroke-width=1 icons (reviews `#F59E0B`), and content polish.
   - Write the complete specification to `CLONE-SPEC.md`.
3. Print the executive summary table to the chat and **STOP IMMEDIATELY**.
4. Await user review. Only proceed to **Phase 2 (Build & Refactor)** when the user gives the go-ahead (e.g., "Approved", "Build", "Proceed").

---

## 0. THE 2-PHASE ARCHITECTURAL PROTOCOL

```
[Target Site A URL Provided]
            │
            ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 1: FORENSIC SPECIFICATION (SPECIFY)                    │
│ 1. Run automated DOM & style inspector (inspect-site.mjs)    │
│ 2. Extract measured fonts -> --nextora-font-heading          │
│ 3. Extract 8-variable FSE palette from color histogram       │
│ 4. Deconstruct every section: block geometry & exact motion  │
│ 5. Map 100% Unsplash real images & 100% Lucide icons         │
│ 6. Output master architectural contract `CLONE-SPEC.md`      │
└──────────────────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────────────────────────┐
│ HUMAN REVIEW CHECKPOINT (Approve Plan Before Build)          │
│ AI prints an executive summary table to the chat and STOPS.  │
│ The user inspects the tokens, layout, and motion parameters. │
└──────────────────────────────────────────────────────────────┘
            │ (User approves: "Plan approved, proceed to build")
            ▼
┌──────────────────────────────────────────────────────────────┐
│ PHASE 2: SPEC-DRIVEN BUILD & REFACTOR (BUILD)                │
│ 1. Clone assets cleanly without bloating project             │
│ 2. In-Place CSS Refactoring (ZERO !important, 0 overrides)   │
│ 3. Replace 100% of images with localized Unsplash photos    │
│ 4. Replace 100% of icons with Lucide SVG (stroke-width="1")  │
│ 5. Enforce theme.json Heading Elements Contract (h1-h6)      │
│ 6. Run automated Quality Gates & capture CDP verification     │
└──────────────────────────────────────────────────────────────┘
```

---

## 1. PHASE 1: FORENSIC SPECIFICATION (`CLONE-SPEC.md`)

### 1.0. Master Architectural Template Mandate
The AI MUST inspect and follow `templates/clone-spec-template.md` as the authoritative structure for `CLONE-SPEC.md`. Every section of the target website MUST be fully completed with:
1. **Zero Placeholders, Zero "Pending", & ZERO "DEMO" BADGES**: The specification must be a 100% production-ready master blueprint. Writing "pending" or placeholders like "copy goes here" is STRICTLY FORBIDDEN. **CRITICAL MANDATE**: The AI is STRICTLY FORBIDDEN from polluting the layout with `DEMO CONTENT`, `DEMO TESTIMONIALS`, `DEMO PORTFOLIO`, `Demo visual`, `Demo contact`, or prototype disclaimer pills. Content must be 100% genuine, professional, realistic commercial copy written freshly for the creative agency.
2. **100% Structural & DOM Topology Fidelity**: The AI MUST preserve the exact structural layout of the target site as measured by CDP forensics:
   - If original section is a full-width horizontal list-row stack (e.g. Services with `01`-`04` rows, hairline dividers, and circular `↗` arrow buttons), DO NOT convert it into a 2x2 grid.
   - If original section is a 2-column layout with left sticky header and right stacked cards (e.g. Working Process with `01`, `02`, `03` watermark cards), DO NOT flatten it into a 3-column equal grid.
   - If original section is a horizontal multi-card carousel bleeding off edges (e.g. Testimonials with gold stars `#F59E0B`, dotted divider, real portrait photo avatars and company job titles), DO NOT convert it into static boxes with letter initials.
   - If original section has media cards with bottom dark gradient metadata overlays (e.g. Portfolio), replicate the exact rounded gradient card layout.
3. **Finalized Production Text Content**: Write the full, literal replacement copy for EVERY element (all H1-H6 headlines, paragraph descriptions, button texts, card titles, metadata). Clean all commercial typos ("Real Woks" -> "Recent Works", "Get free Qoute" -> "Get Free Quote", "Recants Article" -> "Recent Articles", "Let’s Start Talk" -> "Let’s Start Talking", static numbers 250+, 12+, 20+, 5K+).
3. **Forensic 4-Tier Motion & Physics Blueprint**:
   - On-Load / Entrance (keyframes, transform, opacity, duration, cubic-bezier, stagger)
   - On-Scroll / Viewport reveal (intersection threshold, sticky header backdrop-blur 12px)
   - On-Hover interaction (arrow 45deg rotation, card translateY(-6px) + shadow, button color shift)
   - Continuous Ambient Loops (pure CSS marquee @keyframes, duration 28s, timing linear, no jitter, no pause on hover)
   - Driving Engine & Library Integration (Pure CSS @keyframes, Swiper.js, Webflow IX2 localized runtime)
4. **Asset & Icon Specifications**: 100% authentic Unsplash photos with aspect ratios, 100% Lucide stroke-width="1" SVGs, gold rating stars #F59E0B.
5. **Section-by-Section QA Verification Matrix**: At the bottom of `CLONE-SPEC.md`, an exhaustive table auditing Section 1 through Section 12 individually. Only when ALL sections pass is Phase 1 complete!

*Detailed technical references, builder quirks, and inspection patterns are documented in `references/forensic-inspection-patterns.md`.*

### 1.1. Real Data Extraction via CDP & DOM Forensics (Zero Guessing)
The AI must execute the forensic inspection script:
```bash
node scripts/inspect-site.mjs <URL_OR_LOCAL_HTML>
```
The inspector automatically connects to the internal Chromium instance over **Chrome DevTools Protocol (CDP port 9222)** to measure the live page in real rendering conditions:
- **CDP Live Browser Auditing**: Opens a background inspection tab to read `getComputedStyle()` for headings, body text, buttons, and section bounding rects.
- **Real Webflow IX2 & Motion Extraction**: Extracts the actual animation timeline directly from `window.Webflow.require("ix2").store.getState()`, capturing 100% real triggers (`SCROLL_INTO_VIEW`, `MOUSE_OVER`), actions, easing curves (`cubic-bezier`, `outQuart`), and durations (`ms`).
- **External Stylesheet & Token Extraction**: Downloads and parses linked Webflow/builder stylesheets, extracting CSS variables (`--*`), font-face stacks, and color histograms.
- **Content & Typo Detection**: Identifies all commercial typos (`Real Woks`, `Get free Qoute`, `Recants Article`, `Let’s Start Talk`) and rolling counter strips.

---

### 1.2. Global Design System Construction

#### A. Typography Font Assignment
- The primary heading font stack measured from target site A MUST be assigned to `--nextora-font-heading`.
- The body font stack MUST be assigned to `--nextora-font-body`.

#### B. Gutenberg FSE Strict 8-Variable Palette
The AI must derive the 8 standard tokens from the measured color histogram. **Inventing variable names is forbidden.**
```css
:root {
  --wp--preset--color--base: [Canvas Background, e.g. #f6f6f9];
  --wp--preset--color--contrast: [Headings & Dark Text, e.g. #141414];
  --wp--preset--color--paragraph: [Body Copy & Muted Text, e.g. #494852];
  --wp--preset--color--primary: [Main Brand Accent / CTA, e.g. #ff7a52];
  --wp--preset--color--secondary: [Secondary Accent / Hover, e.g. #ff5622];
  --wp--preset--color--surface: [Card Containers & Modals, e.g. #ffffff];
  --wp--preset--color--border: [Dividers & Borders, e.g. #e6e6e6];
  --wp--preset--color--accent: #F59E0B; /* MANDATORY: Rating Star Gold (#F59E0B) */
}
```

#### C. AlonePro Fluid Clamps
- **Typography Scale**: 7 fluid viewport clamps (`small`, `base`, `medium`, `medium-plus`, `large`, `x-large`, `xx-large`).
- **Spacing Scale**: 6 fluid viewport clamps (`spacing-10` through `spacing-60`).

#### D. Heading Elements Contract (theme.json)
The AI must embed the exact JSON contract into `CLONE-SPEC.md`:
```json
{
  "heading": { "color": { "text": "var(--wp--preset--color--contrast)" }, "typography": { "fontFamily": "var(--nextora-font-heading)", "fontWeight": "600", "lineHeight": "1.25" } },
  "h1": { "typography": { "fontSize": "var(--wp--preset--font-size--xx-large)", "fontWeight": "700", "lineHeight": "1.05" }, "spacing": { "margin": { "top": "0", "bottom": "var(--wp--preset--spacing--30)" } } },
  "h2": { "typography": { "fontSize": "var(--wp--preset--font-size--large)", "fontWeight": "700", "lineHeight": "1.15" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--20)", "bottom": "var(--wp--preset--spacing--20)" } } },
  "h3": { "typography": { "fontSize": "var(--wp--preset--font-size--medium-plus)", "lineHeight": "1.25" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--20)", "bottom": "var(--wp--preset--spacing--10)" } } },
  "h4": { "typography": { "fontSize": "var(--wp--preset--font-size--medium)", "lineHeight": "1.25" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--10)", "bottom": "0.75rem" } } },
  "h5": { "typography": { "fontSize": "var(--wp--preset--font-size--base)", "lineHeight": "1.35" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--10)", "bottom": "0.5rem" } } },
  "h6": { "typography": { "fontSize": "var(--wp--preset--font-size--small)", "textTransform": "uppercase", "letterSpacing": "0.06em", "lineHeight": "1.4" }, "spacing": { "margin": { "top": "var(--wp--preset--spacing--10)", "bottom": "0.5rem" } } }
}
```

#### E. Strict FSE Preset Binding Rule (Zero Clamps on Selectors, Zero Heading Overrides)
Every single CSS rule in `main.css` MUST use FSE preset tokens:
- **Font sizes**: MUST be `var(--wp--preset--font-size--*)` (`small`, `base`, `medium`, `medium-plus`, `large`, `x-large`, `xx-large`). Arbitrary `clamp(...)` on element selectors or classes is STRICTLY FORBIDDEN. Clamps belong ONLY in `:root` definitions!
- **Colors**: MUST be `var(--wp--preset--color--*)` (`base`, `contrast`, `paragraph`, `primary`, `secondary`, `surface`, `border`, `accent`). Hardcoded hex values on elements are FORBIDDEN.
- **Spacings**: Margins, paddings, and gaps MUST be `var(--wp--preset--spacing--10...60)`.
- **Zero CSS Overrides**: Heading tags (`h1`, `h2`, `h3`, etc.) receive their styling directly from the base theme contract. Writing parent override selectors like `.process-heading h2 { font-size: clamp(...) }` or `.cta-band h2 { font-size: clamp(...) }` is STRICTLY FORBIDDEN.

---

### 1.3. Forensic Section-by-Section Decomposition Protocol (Deep Rigor Mandate)
A superficial summary is STRICTLY FORBIDDEN. For EVERY section from top to bottom (Header, Hero, Ticker, Services, Portfolio, About, Reviews, Blog, Footer), the AI must document the full, exhaustive implementation details:

1. **Exact Block Geometry & Placement (100% Structural Fidelity Mandate)**:
   - The AI must replicate the EXACT layout topology measured from target site A. Hallucinating or substituting simpler generic grids is STRICTLY FORBIDDEN:
     * **Services Section**: MUST be a full-width vertical list of 4 horizontal rows (`.service-row`). Each row has an index (`01`–`04`), large service title, hairline horizontal divider, and circular `↗` arrow button on the far right. Converting Services into a 2x2 box grid is FORBIDDEN.
     * **Working Process Section**: MUST be a 2-column split layout (`.process-split`). Left column is sticky with section title + "Start Projects" button; right column has vertically stacked rounded cards (`01`, `02`, `03`) with watermark numbers and drafting icons. Converting Process into a flat 3-column equal grid is FORBIDDEN.
     * **Portfolio Section**: MUST be a 2-column grid of large rounded media cards (`border-radius: 20px`), dark bottom gradient overlay with dot-separated metadata (`Web Development • August 23, 2025`), and project title underneath.
     * **Testimonials Section**: MUST be a multi-card horizontal slider/carousel layout (`.testimonial-slider`) with cards bleeding off the screen, 5 gold stars `#F59E0B`, quote, horizontal dotted line, circular portrait photo avatar, author name, and job title (`Alisa Olivia, CTO at Ritovex`). Converting Testimonials into a static 2x2 grid with letter initials is FORBIDDEN.
   - Spatial placement: Exact coordinates of text stack, media container, badges, and card grids.
   - Dimensions & Spacing: Max container width (1280px), padding-block (`var(--wp--preset--spacing--50)`), gap tokens.
   - Responsive behavior: Tablet stack (<=991px) and mobile margins (<=767px: 16-20px).

2. **Finalized Production Text Content (Zero "Demo" Pollution Mandate)**:
   - **STRICT PROHIBITION**: CẤM tuyệt đối chèn các tag, badge hoặc disclaimer như `DEMO CONTENT`, `DEMO TESTIMONIALS`, `DEMO PORTFOLIO`, `Demo visual`, `Demo contact`, `Prototype note`.
   - **Nội dung thương mại thật 100%**: The AI must write natural, polished, high-converting copywriting for a premium creative agency. Include realistic client names, verified company roles, authentic project case studies, and realistic metrics.
   - Eyebrow / Badge (H6): Exact finalized text.
   - Primary Headline (H1/H2): Exact finalized title.
   - Body Paragraph: Complete, polished paragraph copy.
   - Call to Action Buttons: Exact labels, target URLs, and styles.
   - Card Items: Complete title, description, and metadata for every card in the section.

3. **Exhaustive 4-Tier Motion Choreography & Animation Blueprint**:
   - **Tier 1: On-Load / Entrance Animation**: Trigger (`DOMContentLoaded`), animated properties (`opacity: 0 -> 1; transform: translateY(24px) -> 0;`), duration (`0.65s`), easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`), and stagger delays (`0.1s`).
   - **Tier 2: Scroll-Triggered Animation**: Viewport threshold (`threshold: 0.15`), intersection observer class toggle, and entrance transitions.
   - **Tier 3: Hover & Interactive Feedback**: Exact hover mechanics (e.g. arrow rotates 45deg and translates 4px up-right; button background transitions `#ff7a52 -> #ff5622` in `0.2s ease`; card elevates with `box-shadow: 0 12px 32px rgba(0,0,0,0.06)` and `scale(1.02)`).
   - **Tier 4: Continuous Ambient Loops**: Marquees, tickers, and pulse loops. Exact `@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`, duration (`28s`), timing (`linear`), iteration (`infinite`), and whether it pauses on hover.
   - **Tier 5: Driving Engine & Library Integration**: Explicitly state the library used (Pure CSS `@keyframes`, Webflow IX2 localized runtime `assets/js/webflow.main.js`, or Swiper JS `assets/js/swiper.min.js`) and how it is initialized.

4. **Asset & Icon Specifications**:
   - Curated Unsplash photography matching the exact aspect ratio (4:3, 16:10, 5:4, 1:1) and topic.
   - Inline Lucide SVG icons with `stroke-width="1"` and designated color token.

---

### 1.4. The Three Mandatory Asset & Polish Mapping Tables

#### Table 1: 100% Unsplash Real Photo Substitution
- **STRICT PROHIBITION**: Keeping cloned template placeholder assets is forbidden.
- **STRICT PROHIBITION**: Using AI SVG cartoon illustrations or generated synthetic artwork is forbidden.
- Every photo must be a real, authentic, high-resolution photograph sourced from Unsplash matching the industry niche and preserving the exact aspect ratio of the original layout.

#### Table 2: 100% Lucide Stroke-Width=1 Icon Substitution
- Every icon on the website (arrows, phone, review stars, metrics, video play, hamburger) MUST be replaced with inline Lucide SVGs with `stroke-width="1"`.
- **STRICT PROHIBITION**: AI sparkle icons (`✨`) are strictly forbidden. Use bullet points (`•`) or domain-specific marks (`layers`, `palette`, `pen-tool`).
- **MANDATORY**: Customer review stars MUST use `#F59E0B` for fill and stroke.

#### Table 3: Commercial Content Polish & Typo Elimination
- All broken or naive template copy must be corrected while strictly maintaining 1:1 length and topic:
  * "Real Woks" -> "Recent Works"
  * "Get free Qoute" -> "Get Free Quote"
  * "Our Recants Article" -> "Our Recent Articles"
  * Broken rolling counter strips -> Clean static metrics (`250+`, `12+`, `20+`, `5K+`).

---

### 1.5. Mandatory Section QA Acceptance Contract & Master Verification Matrix
For EVERY section in `CLONE-SPEC.md`, the AI MUST provide a dedicated QA Acceptance Contract:
1. **Expected Production State (Kết quả mong muốn bắt buộc)**:
   - **Geometry & Tokens**: Container width 1280px, padding-block FSE tokens, responsive mobile 16-20px.
   - **Copywriting**: Full literal production text, zero commercial typos, clean static metrics (250+, 12+, 20+, 5K+).
   - **Motion Physics**: 4-tier motion blueprint (on-load, on-scroll, on-hover, marquee), trigger, duration, easing.
   - **Assets & Icons**: 100% Unsplash photos with aspect ratios, 100% Lucide stroke-width=1, gold stars #F59E0B.
2. **Verification & Acceptance Criteria (Check lại đối soát sau khi hoàn thành)**:
   - A 4-point verification table checking Geometry, Copywriting, Motion, and Assets.
   - Every section must conclude with an explicit verdict: `PASS`.

At the end of `CLONE-SPEC.md`, a **Master Section-by-Section Forensic QA Verification Matrix** must summarize all 12 sections. The specification is ONLY complete when every single section is confirmed as `PASS`.

### 1.6. Human Review Checkpoint (Stop & Confirm)
After writing `CLONE-SPEC.md`, the AI MUST STOP and print the executive summary:
```markdown
### 📋 Specification Complete: Ready for Your Review
I have completed the forensic architectural specification `CLONE-SPEC.md` based on real measured data from [Target Site A].

- **Brand & Niche**: [Niche] | [Brand Name]
- **Heading Font**: `var(--nextora-font-heading)` = [Font Name]
- **Gutenberg Palette**: Base: [Hex] | Contrast: [Hex] | Primary: [Hex] | Accent: #F59E0B
- **Sections Audited**: [N] sections forensically mapped from Header to Footer.
- **Asset Mappings**: [N] Unsplash real photos | [N] Lucide stroke-width=1 icons.
- **Motion Runtime**: [Engine, e.g. CSS Keyframe Marquee + Localized IX2 / Swiper].

*Please review the specification. Upon your approval, I will proceed to Phase 2 (Build & Refactor).*
```

---

## 2. PHASE 2: SPEC-DRIVEN BUILD & IN-PLACE REFACTORING

Only after user confirmation does the AI execute Phase 2:

### 2.1. In-Place CSS Refactoring (Zero Overrides, Zero !important, 100% FSE Presets)
- `main.css` is the sole stylesheet for the project.
- **NO OVERRIDE APPENDING**: The AI is strictly forbidden from appending an override block to the end of `main.css`.
- **NO BLANK WIPING**: Do NOT wipe the existing layout engine and reset to blank HTML.
- **PROHIBITION OF ARBITRARY CLAMP() IN SELECTORS**: Raw `clamp(...)` or raw pixel values are STRICTLY FORBIDDEN on element selectors in `main.css`. Clamps belong exclusively in `:root` preset definitions.
- **PROHIBITION OF HEADING OVERRIDES**: Direct child or descendant selector overrides on headings (e.g. `.process-heading h2`, `.cta-band h2`, `.journal-heading h2`, `.newsletter h2`) modifying `font-size` are STRICTLY FORBIDDEN. Heading font-sizes must strictly follow the `theme.json` contract (`h1` -> `var(--wp--preset--font-size--xx-large)`, `h2` -> `var(--wp--preset--font-size--large)`, `h3` -> `var(--wp--preset--font-size--medium-plus)`).
- **IN-PLACE TOKEN REPLACEMENT (100% PRESET CONSUMPTION)**: The AI reads the original CSS rules and directly replaces old static values at their original selector declarations:
  - Font sizes -> `var(--wp--preset--font-size--*)` (xx-large, x-large, large, medium-plus, medium, base, small)
  - Section paddings -> `padding-block: var(--wp--preset--spacing--60)`
  - Card paddings & gaps -> `var(--wp--preset--spacing--30)` or `spacing-20`
  - Title gaps -> `margin-bottom: var(--wp--preset--spacing--30)`
  - Colors & backgrounds -> `var(--wp--preset--color--*)` (base, contrast, paragraph, primary, secondary, surface, border, accent #F59E0B)
- **ZERO `!important`**: Every `!important` rule must be cleanly excised.
- **MOBILE CLEARANCE & HEADER STREAMLINING (`@media (max-width: 767px)`)**:
  * **Hero Top Clearance**: Whenever a navbar is `fixed`, `sticky`, or `absolute`, `.hero` on mobile MUST specify `padding-top: calc(var(--wp--preset--spacing--60) + 40px);` (or ~100px+) so the navbar never overlaps or clips the top line of the H1 headline.
  * **Header Streamlining**: Auxiliary pills, addresses, or email widgets (`.email-flex`, `.header-address`) MUST be hidden on mobile (`display: none;`) so only the Brand Logo and Hamburger toggle occupy the header row.
  * **Dark Mode Contrast**: Muted secondary headline spans (e.g. `.main-display.gray`) on dark backgrounds must use solid high-contrast tokens like `#94A3B8` (Slate-400) to meet WCAG AA standards, avoiding washed-out low-opacity rgba.

### 2.2. Button Deduplication & UI Fixes
- **Button Text**: Eliminate `.is-text-absolute` duplicate text blocks.
  * *WARNING*: Never use `:nth-child(2)` on button text classes, as it strips the label from buttons with icons (e.g. "Watch Demo"). Use `.is-text-absolute { display: none; }`.
- **Button Contrast on Inverted Pills (`.white-button`)**: Pill buttons on dark themes MUST explicitly declare `color: var(--wp--preset--color--base);` (black) and cascade to child text spans to prevent inheriting white text from global anchor rules (`a { color: white; }`).
- **Webflow Curtain/Image-Show Overlay Elimination**: Modern luxury Webflow templates use column masks (`.image-show-style > .bg-column-mask > .bg-color-column`) that Webflow IX2 sets to `display: grid;` on page load. Strip `data-w-id` from `.image-show-style` and enforce `.image-show-style, .bg-column-mask { display: none; }` in `main.css` so curtain panels never obstruct hero/portfolio sections in headless QA.
- **Cart Modal**: Webflow commerce cart modals must be hidden by default:
  `.w-commerce-commercecartcontainerwrapper, .w-commerce-commercecartcontainerwrapper--cartType-modal { display: none; }`
- **Webflow Watermark Badge Elimination (`.w-webflow-badge`)**: Webflow runtime scripts (`webflow.main.js` / `brandjs`) dynamically inject `<a class="w-webflow-badge">` and declare `.w-webflow-badge { display: block; }` deep in the original Webflow stylesheet. Because `!important` is forbidden by Quality Gates, placing `.w-webflow-badge { display: none; }` near the top of `main.css` gets overridden by the subsequent rule. Always declare `a.w-webflow-badge, .w-webflow-badge { display: none; }` at the VERY END of `main.css` with tag-qualified specificity (`a.w-webflow-badge`).
- **Semantic Headings Upgrade (`div.heading---h*` -> `<h1-h6>`)**: Webflow templates frequently structure headings as non-semantic `<div>` tags (e.g. `<div class="heading---h2">`). Transform these into real semantic elements (`<h2 class="heading---h2">`, `<h3 class="heading---h3">`, etc.) while retaining class names so the `theme.json` heading elements contract binds automatically and passes SEO/accessibility gates.
- **Portfolio Sticky Flattening**: Flatten virtual scroll heights (`height: 250vh;`) into a clean, responsive 2-column grid.
- **Dropdown Menus**: Hidden by default, reveal on hover/click.

### 2.3. OpenDesign Engine Orchestration & Production Gates
When OpenDesign is driven autonomously in Phase 2:
- **Two-Stage State Machine Compliance**: OpenDesign transitions from `inputStage: 'request'` to `inputStage: 'production'`. In `request` stage of Full Plan route, the agent must freeze the plan by emitting `<open-design-plan-contract>` and `<open-design-runtime-state>` (`outcome: 'completed'`). The daemon then automatically spawns the `stage="production"` run.
- **API Project Creation Contract (`POST /api/projects`)**: When programmatically creating projects via REST API, the JSON body MUST include an explicit UUID `id` AND `skillId: "spec-driven-clone"`. Omission causes OpenDesign to create a vanilla generic project without `spec-driven-clone` bindings.
- **Docker Container Permissions Guard**: Ensure files in `/app/skills/` have `chmod -R a+rX` and `chown -R open-design:open-design` so container UID 1001 never encounters `EACCES: permission denied` when running `inspect-site.mjs`.
- **Prevent Protocol Stage Mismatch**: In `production` stage, the agent MUST directly write the deliverables (`index.html`, `main.css`). Emitting another `<open-design-plan-contract>` in production stage triggers a fatal `od_next_protocol_stage_mismatch`.
- **Daemon Input Availability Rule**: The Plan Contract's `runManifest.inputRefs` must only include `['request']` to satisfy the daemon's input preflight (`available: id === 'request'`).
- **CDP Native Input & Mouse Dispatching**: When submitting prompts to OpenDesign via Chrome DevTools Protocol (port 9222), do not use `document.execCommand` or synthetic `.click()`. Focus the composer (`[data-testid="chat-composer-input"]`), dispatch `Input.insertText` to synchronize React/Lexical state, query `button[data-testid="chat-send"]`, and dispatch native click. If the browser tab has routed to the file editor (`/files/index.html`), navigate back to the conversation URL (`/conversations/<id>`) first.
- **Disclaimer Suppression**: Explicitly command the agent to treat commercial copy and metrics as confirmed without injecting "sample UI content", "illustrative metrics", or "demo content" disclaimers.
- **Timeout (20m 2s) & Context Window Overflow Prevention**: If OpenCode experiences "Reply timed out" or fails with `ContextOverflowError` (>1M tokens), purge the bloated session record via `DELETE FROM agent_sessions WHERE conversation_id = ?;` in `app.sqlite` and verify `~/.config/opencode/opencode.json` maps model aliases to a resilient multi-model fallback combo (Section 13 in `references/forensic-inspection-patterns.md`).
- **Headless CDP Visual QA Protocol**: When capturing verification screenshots, force `scroll-behavior: auto` to prevent async scrolling lag, add `.is-visible` to `.reveal` nodes (or scroll with `window.scrollTo`), and verify mobile container margins strictly adhere to `16–20px` at 390px viewport (`.container { width: min(var(--container-max-width), calc(100% - var(--wp--preset--spacing--40))); margin-inline: auto; }`).
- *Full architectural details, inspection techniques, and QA protocols are documented in `references/forensic-inspection-patterns.md`.*

---

## 3. AUTOMATED QUALITY GATES AUDIT

Before concluding, the AI must run the automated validation script to verify compliance:

```python
import os, re, sys
from bs4 import BeautifulSoup

html_file = "ritovex-home.html" if os.path.exists("ritovex-home.html") else "index.html"
html = open(html_file, "r", encoding="utf-8").read()
css = open("main.css", "r", encoding="utf-8").read()
soup = BeautifulSoup(html, "html.parser")
errors = []

# 1. Spec presence
if not os.path.exists("CLONE-SPEC.md"):
    errors.append("CRITICAL: CLONE-SPEC.md does not exist in workspace!")

# 2. Zero !important
if "!important" in css:
    errors.append("RULE VIOLATION: Found !important in main.css! Must be 100% clean.")

# 3. Standard FSE Tokens Check
required_tokens = [
    "--nextora-font-heading",
    "--wp--preset--color--base",
    "--wp--preset--color--contrast",
    "--wp--preset--color--primary",
    "--wp--preset--color--accent",
    "--wp--preset--font-size--small",
    "--wp--preset--font-size--base",
    "--wp--preset--font-size--medium",
    "--wp--preset--font-size--large",
    "--wp--preset--font-size--x-large",
    "--wp--preset--spacing--10",
    "--wp--preset--spacing--20",
    "--wp--preset--spacing--30",
    "--wp--preset--spacing--40",
    "--wp--preset--spacing--50",
    "--wp--preset--spacing--60"
]
for t in required_tokens:
    if t not in css:
        errors.append(f"TOKEN DEFECT: Missing required FSE token: {t}")

# 4. Prohibited invented tokens
for bad in ["--wp--preset--color--ink", "--wp--preset--color--paper", "--wp--preset--font-size--display", "--wp--preset--font-size--hero"]:
    if bad in css:
        errors.append(f"PROHIBITION: Found non-standard invented variable: {bad}")

# 5. Review star color
if "#F59E0B" not in css and "#f59e0b" not in css:
    errors.append("COLOR DEFECT: Review star color MUST be #F59E0B!")

# 6. Legacy template assets check
legacy_images = re.findall(r"assets/images/68[a-f0-9]+_[A-Za-z0-9_-]+\.(?:jpg|png)", html)
if len(legacy_images) > 3:
    errors.append(f"ASSET DEFECT: Found {len(legacy_images)} legacy clone images! Must replace 100% with Unsplash photos.")

# 7. Lucide stroke-width = 1 & AI sparkle ban
if "stroke-width: 1" not in css and 'stroke-width="1"' not in html:
    errors.append("ICON DEFECT: Lucide icons must have stroke-width: 1!")
if re.search(r"sparkles", html, re.I):
    errors.append("ICON DEFECT: AI sparkle icons are strictly prohibited!")

# 8. Template typos
for typo in ["Real Woks", "Qoute", "Recants Article"]:
    if typo in html:
        errors.append(f"COPY DEFECT: Found uncorrected template typo: {typo}")

# 9. Prohibition of raw clamp() outside :root
root_match = re.search(r":root\s*\{([^}]+)\}", css)
root_css = root_match.group(1) if root_match else ""
css_without_root = css.replace(root_css, "")
if "clamp(" in css_without_root:
    errors.append("PRESET DEFECT: Found raw clamp() outside :root! All font-sizes and spacings must consume var(--wp--preset--*) tokens.")

# 10. Prohibition of 'demo' placeholder tags in HTML
if re.search(r"\b(demo content|demo testimonial|demo visual|demo contact|prototype note)\b", html, re.I):
    errors.append("COPYWRITING DEFECT: Found 'demo' placeholder badges or disclaimers in HTML! Content must be 100% genuine commercial copy.")

# 11. Prohibition of heading font-size overrides
if re.search(r"\.[a-zA-Z0-9_-]+\s+(?:h1|h2|h3)\s*\{[^}]*font-size", css):
    errors.append("OVERRIDE DEFECT: Found selector overriding heading font-size (e.g. .process-heading h2)! Headings must strictly follow global theme.json tokens.")

if errors:
    print("=== QUALITY AUDIT FAILED ===")
    for e in errors:
        print(f"❌ {e}")
    sys.exit(1)
else:
    print("=== 100% SPEC-DRIVEN QUALITY AUDIT PASSED! ===")
```
