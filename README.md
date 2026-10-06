# Beplus Spec Remake Engine (v2.0)

Autonomous 2-stage specification-driven clone & transformation engine for OpenDesign and AlonePro WordPress Gutenberg FSE themes.

## Architecture

- **Phase 1: Forensic Architectural Specification**: Deeply audits the target site using Chrome DevTools Protocol (CDP port 9222) or static AST forensics. Produces `CLONE-SPEC.md` covering all 12 sections with zero placeholders and zero guessing.
- **Phase 2: Spec-Driven Build & In-Place Refactoring**: Upon human approval, builds/refactors the production deliverables (`index.html`, `main.css`) using 100% Gutenberg FSE tokens.
- **Phase 3: Automated Quality Gate**: Validates zero `!important`, zero hardcoded hex outside `:root`, zero raw pixel font-sizes in CSS classes, section heading dominance (H2 section titles vs H4 card titles), equal height card geometries, slider autoplay & edge fades, and zero Latin placeholder text.

## Directory Structure

- `SKILL.md`: Master skill contract and quality gates.
- `scripts/inspect-site.mjs`: Universal forensic CDP/DOM inspector with icon disambiguation, typography detection, and asset extraction.
- `templates/clone-spec-template.md`: Template for the 12-section architectural specification.
- `references/forensic-inspection-patterns.md`: Tactical technical guide covering 26 specialized patterns.
- `references/gutenberg-token-contract.md`: Token specifications and mapping tables.

## Synchronization & Permissions

```bash
docker cp /root/.hermes/skills/web-design/beplus-spec-remake/. open-design:/app/skills/beplus-spec-remake/
docker exec -u 0 open-design chown -R open-design:open-design /app/skills/beplus-spec-remake
docker exec -u 0 open-design chmod -R a+rX /app/skills/beplus-spec-remake
```
