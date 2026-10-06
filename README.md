# Spec-Driven Clone & FSE Transform Engine (v1.1.0)

Autonomous 2-stage specification-driven clone & transformation engine for OpenDesign and AlonePro WordPress Gutenberg FSE themes.

## Architecture & Workflow

- **Phase 1: Forensic Specification (`CLONE-SPEC.md`)**
  - Deep DOM and computed style inspection via Chrome DevTools Protocol (CDP port 9222) with graceful static fallback.
  - Derives strict 8-variable Gutenberg FSE palette (`base`, `contrast`, `paragraph`, `primary`, `secondary`, `surface`, `border`, `accent #F59E0B`).
  - **Universal Icon vs Image Disambiguation Engine**: Isolates icons (<=64px, `.svg`, icon classes, badge/timeline nodes) from content photos. Icons are NEVER mapped to Unsplash — mapped exclusively to inline Lucide SVGs (`stroke-width="1"`).
  - **Context-Aware Semantic Icon Selection & Anti-Repetition**: Analyzes card titles and descriptions to select unique context-aware icons (About -> `info`, Mission -> `rocket`, Vision -> `binoculars`, etc.) with zero adjacent repetition and exact computed color extraction.
  - **Section Heading Dominance Contract**: Section main headlines are `<h2>` with largest size (`var(--wp--preset--font-size--large)`), internal cards are `<h4>` (`var(--wp--preset--font-size--medium)`), and eyebrows are `<h6>` (`small`).
  - **Slider / Carousel Standards**: Enforces autoplay (3.5s - 4.5s, pause on hover), equal-height slides, and a right-edge gradient fade overlay for fractional slide views (3.5 items on desktop).
  - **Total Elimination of Latin Placeholder Copy**: 100% detects and rewrites "Lorem ipsum", "Sed ut perspiciatis", "Sed acc..." into authentic commercial agency copy.
  - Deconstructs layout geometry, typography scales, 4-tier motion parameters, and section architecture.
  - Stops at human review checkpoint for plan approval.

- **Phase 2: Spec-Driven Build & In-Place Refactoring**
  - In-place CSS tokenization with zero `!important`, zero clamp outside `:root`, and zero descendant heading overrides.
  - **Equal Height Cards & Robust Spacing**: `align-items: stretch; display: flex; flex-direction: column; height: 100%;` with `margin-top: auto;` on card actions for aligned button baselines.
  - **Ghost Section & Blank Content Elimination**: Fallback visibility `opacity: 1; transform: none;` in base CSS, explicit dual color/background tokens on inverted sections, and purge of all curtain masks and modals.
  - Mobile header clearance and container margin preservation (16–20px on <=767px viewports).
  - Webflow IX2 curtain animation mask suppression (`.image-show-style`) and Webflow watermark elimination (`.w-webflow-badge`).
  - Upgrades non-semantic heading divs (`div.heading---h*`) to semantic `h1`–`h6` elements.

## Repository Contents

- `SKILL.md`: Master skill contract, quality gates, and runtime orchestration guidelines.
- `scripts/inspect-site.mjs`: Automated CDP live DOM & IX2 motion extraction tool with Icon vs Image classifier and Latin detector.
- `templates/clone-spec-template.md`: 12-section master architectural specification template with Section QA Contracts.
- `references/`:
  - `forensic-inspection-patterns.md`: Deep troubleshooting, CDP Lexical automation, icon extraction, slider geometry, and runtime recovery protocols (Chapters 1–22).
  - `gutenberg-token-contract.md`: Standard FSE theme.json token specification.
  - `heading-elements-contract.json`: FSE typography elements contract.
