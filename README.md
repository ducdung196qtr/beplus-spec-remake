# Spec-Driven Clone & FSE Transform Engine

Autonomous 2-stage specification-driven clone & transformation engine for OpenDesign and AlonePro WordPress Gutenberg FSE themes.

## Architecture & Workflow

- **Phase 1: Forensic Specification (`CLONE-SPEC.md`)**
  - Deep DOM and computed style inspection via Chrome DevTools Protocol (CDP port 9222).
  - Derives strict 8-variable Gutenberg FSE palette from color histogram.
  - Deconstructs layout geometry, typography scales, 4-tier motion parameters, and section architecture.
  - Replaces all placeholder assets with 100% genuine Unsplash photography and Lucide stroke-width=1 SVGs (#F59E0B review stars).
  - Stops at human review checkpoint for plan approval.

- **Phase 2: Spec-Driven Build & In-Place Refactoring**
  - In-place CSS tokenization with zero `!important`, zero clamp outside `:root`, and zero descendant heading overrides.
  - Mobile header clearance and container margin preservation (16–20px on <=767px viewports).
  - Webflow IX2 curtain animation mask suppression (`.image-show-style`) and Webflow watermark elimination (`.w-webflow-badge`).
  - Upgrades non-semantic heading divs (`div.heading---h*`) to semantic `h1`–`h6` elements.

## Repository Contents

- `SKILL.md`: Master skill contract, quality gates, and runtime orchestration guidelines.
- `scripts/inspect-site.mjs`: Automated CDP live DOM & IX2 motion extraction tool.
- `templates/clone-spec-template.md`: 12-section master architectural specification template.
- `references/`:
  - `forensic-inspection-patterns.md`: Deep troubleshooting, CDP Lexical automation, and runtime recovery protocols.
  - `gutenberg-token-contract.md`: Standard FSE theme.json token specification.
  - `heading-elements-contract.json`: FSE typography elements contract.
