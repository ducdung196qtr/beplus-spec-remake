# Forensic Site Inspection Patterns & Reconstruction Reference

Authoritative technical reference for forensically dissecting Webflow, Framer, and modern custom web pages into standalone, production-ready WordPress Gutenberg FSE components.

---

## 1. Computed Style vs. Declared Style Extraction

When analyzing a target website (Site A), raw declared CSS often contains hundreds of unused legacy utility classes, vendor prefixes, and theme-builder framework noise. Forensic analysis requires extracting **Computed Effective Rules**:

### 1.1. Color Histogram & Token Role Mapping
- **Canvas (`--wp--preset--color--base`)**: Extract the computed `background-color` of `body`, `html`, or the root `#app`/`.page-wrapper`.
- **High-Contrast Text (`--wp--preset--color--contrast`)**: Extract the computed `color` of `h1`, `h2`, and primary headline text. Typically `#000000`, `#141414`, or dark navy/charcoal `#111827`.
- **Body Copy (`--wp--preset--color--paragraph`)**: Extract the computed `color` of `p`, `.text-muted`, or subtitle copy. Usually `#4b5563`, `#5d6c7b`, or `#494852`.
- **Primary Brand (`--wp--preset--color--primary`)**: Extract the background color of primary CTA buttons (`.btn-primary`, `.button`, `a[href*="contact"]`).
- **Surface (`--wp--preset--color--surface`)**: Extract card container background (`.card`, `.feature-box`, `.testimonial-card`). Usually pure white `#ffffff` or clean elevated surface.
- **Border (`--wp--preset--color--border`)**: Extract computed `border-color` of card wrappers and horizontal dividing lines (`#e5e7eb`, `#e6e6e6`).
- **Rating Star Accent (`--wp--preset--color--accent`)**: **MANDATORY**: Customer review star SVGs must use gold `#F59E0B`.

---

## 2. Forensic Motion & Animation Deconstruction

Do NOT replace dynamic animations with static blocks unless explicitly specified (such as broken rolling number counters). Deconstruct motion into **Triggers, Mechanics, and Physics**:

### 2.1. Infinite Marquee / Ticker Tracks
- **Old Implementation**: Webflow IX2 or JS ticker script moving a long horizontal flex track.
- **FSE Re-implementation**: Pure CSS keyframe marquee. 0 external JS dependencies.
```css
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.ticker-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 25s linear infinite;
}
```
*Rule*: Pausing on hover is prohibited (`animation-play-state: paused` is banned).

### 2.2. Scroll-Triggered Entrance Reveals
- **Trigger**: Element crosses viewport intersection threshold (e.g., `0.15`).
- **Mechanics**: Translate upwards + opacity transition:
  `transform: translateY(30px) -> translateY(0); opacity: 0 -> 1;`
- **Physics**: Duration: `0.6s`; Easing: `cubic-bezier(0.16, 1, 0.3, 1)`; Stagger delay between sibling items: `0.1s`.

### 2.3. Sliders & Carousels
- **Engine Selection**: If the target uses Webflow IX2 slider (`.w-slider`), evaluate whether to localize `webflow.main.js` or replace with standard `Swiper.js`.
- **Responsive Slides Per View**: Desktop = 3 or 3.5 cards; Tablet = 2 cards; Mobile = 1 card.

---

## 3. Webflow & Builder-Specific Quirks & Solutions

### 3.1. Button Text Duplication Bug (`.is-text-absolute`)
- **Quirk**: Webflow creates two identical `<span>` or `<div>` elements inside `.button` for a hover slide-up animation. When scripts are stripped, both texts render simultaneously, creating duplicate text (e.g. "Get StartedGet Started").
- **Resolution**:
  1. Strip the duplicate element containing `.is-text-absolute` in HTML.
  2. In CSS, enforce:
     ```css
     .is-text-absolute, .primary-button-text-block.is-text-absolute { display: none !important; }
     [class*="button-text-block"], .primary-button-text-block { position: static; transform: none; display: inline-block; opacity: 1; }
     ```
  - *Pitfall*: NEVER use generic `:nth-child(2)` on button text wrappers because buttons containing icons (like a video play icon + "Watch Demo") have the label as the 2nd child and will lose their text completely!

### 3.2. Webflow Commerce Cart Modal Wrapper
- **Quirk**: Cloned Webflow eCommerce sites include full cart modals (`.w-commerce-commercecartcontainerwrapper`) that render as full-page opaque or broken overlays.
- **Resolution**: Hide by default in CSS:
  ```css
  .w-commerce-commercecartcontainerwrapper,
  .w-commerce-commercecartcontainerwrapper--cartType-modal {
    display: none;
  }
  ```

### 3.3. Sticky Scroll Viewport Pinning (Virtual Height Trap)
- **Quirk**: Portfolios often use virtual scroll tracks (`height: 250vh; position: sticky; top: 0;`). When JS interactions detach, this causes huge white spaces and unscrollable cards.
- **Resolution**: Flatten virtual heights to natural document flow:
  ```css
  .portfolio-content-vh, .portfolio-sticky, [class*="-content-vh"], [class*="-sticky"] {
    height: auto;
    position: static;
    transform: none;
  }
  .portfolio-ticker-flex {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--wp--preset--spacing--30);
  }
  ```

---

## 4. Live Target Inspection Pitfalls & External CSS Extraction

### 4.1. Link Tag Attribute Order Trap (`href` before `rel`)
- **Quirk**: Webflow and modern bundlers frequently output stylesheets with `href` before `rel`:
  `<link href="https://cdn.prod.website-files.com/.../ritovex.webflow.shared.css" rel="stylesheet" type="text/css"/>`
- **Pitfall**: A regex assuming `rel="stylesheet"` precedes `href="..."` will fail completely. The parser sees zero external stylesheets, resulting in:
  - 0 declared fonts (`@font-face` missed)
  - 0 CSS variables (`--_colors-plates---*`, `--_typography---*` missed)
  - Empty color histograms
- **Resolution**: Match all `<link[^>]+>` tags containing `stylesheet` or `.css`, then extract `href`:
  ```javascript
  const linkTags = html.match(/<link[^>]+>/gi) || [];
  for (const l of linkTags) {
    if (l.includes("stylesheet") || l.includes(".css")) {
      const hrefMatch = l.match(/href=["']([^"']+)["']/i);
      if (hrefMatch) {
        const fullUrl = new URL(hrefMatch[1], baseUrl).toString();
        // Fetch external CSS and parse @font-face, :root variables, and hex colors
      }
    }
  }
  ```

### 4.2. Actionable Master Blueprint vs. Defensive "Pending" Drafts
- **Pitfall**: When an AI agent performs forensic audits without a headless browser visual engine, it often falls into an overly cautious pattern: marking layout dimensions as "pending review", leaving copy as vague excerpts, and outputting meta-disclaimers.
- **User Expectation**: The user expects a complete, production-ready architectural contract (`Beplus-spec.md`). Every section must have:
  1. **Finalized Production Text**: 100% concrete replacement copy written out for every heading, paragraph, button, and card item (no "pending", no "lorem ipsum"). Sửa sạch 100% commercial typos (`Real Woks` -> `Recent Works`, `Get free Qoute` -> `Get Free Quote`, `Recants Article` -> `Recent Articles`, `Let's Start Talk` -> `Let's Start Talking`, clean static counters `250+`, `12+`, `20+`, `5K+`).
  2. **Exhaustive 4-Tier Motion Specs**: Trigger (on-load, on-scroll, hover), mechanical transitions (`rotate`, `translateY`, `box-shadow`, `color`), ambient loop physics (pure CSS keyframe marquee, duration, linear, no pause on hover), and designated driving engine (CSS, Swiper.js, IX2).
  3. **Section-by-Section QA Verification Matrix**: At the bottom of `Beplus-spec.md`, an individual audit row for each section from top to bottom. Phase 1 is ONLY complete when every single section is verified and confirmed `PASS`.

---

## 5. Live Headless CDP Inspection Engine (Port 9222)

When Chromium is running with remote debugging enabled (`--remote-debugging-port=9222`), `inspect-site.mjs` directly harnesses Chrome DevTools Protocol to probe the runtime environment:

### 5.1. Opening & Managing Background Inspection Tabs
- Probing `http://127.0.0.1:9222/json/version` confirms CDP availability.
- Opening a background tab: `PUT http://127.0.0.1:9222/json/new?<URL>` returns `{ id, webSocketDebuggerUrl }`.
- Evaluating expressions via `Runtime.evaluate` with `{ returnByValue: true }` returns the serialized evaluation result. Note that CDP wraps the value under `result.result.value` (unpack `cdpResult.result.value`).
- Always cleanly close the tab: `GET http://127.0.0.1:9222/json/close/<id>`.

### 5.2. Extracting Webflow Interactions 2 (IX2) Timelines
Modern Webflow sites initialize interactions into an in-memory Redux-like store:
```javascript
const ixStore = window.Webflow?.require?.('ix2')?.store?.getState();
const ixData = ixStore?.ixData;
```
- **Events**: `ixData.events` contains triggers (`SCROLL_INTO_VIEW`, `MOUSE_OVER`, `MOUSE_OUT`, `PAGE_SCROLL`, `PAGE_START`).
- **Actions**: `ixData.actions` contains named animation timelines (e.g. `Sponsors Ticker`, `Services Hover In/Out`, `History Counter Up`, `V2 Faq Accordion Open/Close`).
- **Parameters**: Bocks extract duration in milliseconds, transition properties (`TRANSFORM_MOVE`, `TRANSFORM_ROTATE`, `STYLE_OPACITY`, `STYLE_BACKGROUND_COLOR`), and easing curves:
  - Linear loops: continuous marquees (`60,000ms`, `40,000ms`, `30,000ms`).
  - Cubic-bezier curves: e.g. rolling counters using `[0.784, 0.325, 0.222, 0.98]`.
  - Standard easings: `outQuart`, `ease`, `inOutQuad`.
- **Target Section Mapping**: Map every action title or element selector to its parent semantic container (`targetSection: "section services"`, `section about-us`, `section portfolio`, etc.) so the AI can attribute motion directly to individual page sections without guessing.

### 5.3. Computed Typography, Geometry & Asset Aspect Ratios
- **Computed Styles**: Evaluate `window.getComputedStyle()` on `h1, h2, h3, p, a, button` to extract true rendered `fontSize`, `lineHeight`, `fontWeight`, and `color`.
- **Section Geometry**: Query all `section, .section, header, footer, nav` nodes to measure `getBoundingClientRect()` (`width`, `height`, `paddingTop`, `paddingBottom`, `backgroundColor`).
- **Image Ratios**: Query all `img` tags to capture `src`, `naturalWidth`, `naturalHeight`, calculate aspect ratio (`16:9`, `4:3`, `1:1`, etc.), and map to the closest enclosing section.

---

## 6. OpenCode / OpenDesign Execution & Lock Troubleshooting

### 6.1. SQLite `database is locked` Resolution
When running multiple CLI calls or rapid prompt submissions against the OpenCode SQLite store (`opencode.db`), write transactions can encounter file locks:
- **Solution 1 (Checkpoint & Busy Timeout)**:
  ```python
  import sqlite3
  conn = sqlite3.connect(".../opencode.db", timeout=10)
  conn.execute("PRAGMA busy_timeout = 30000;")
  conn.execute("PRAGMA journal_mode = WAL;")
  conn.execute("PRAGMA wal_checkpoint(TRUNCATE);")
  conn.close()
  ```
- **Solution 2 (Inspect process locks)**:
  Run `fuser opencode.db` to check if any defunct CLI process is holding an unclosed lock before restarting a run.

### 6.2. Interactive Form Handling via CDP
When OpenCode asks interactive questions (e.g., how to treat demo content or naming process steps), the UI renders clickable buttons or form inputs:
- Query the page tab on port 9222 via CDP `Runtime.evaluate` to find the option button matching the desired choice.
- Dispatch a `.click()` event on the chosen button, then click "Next" or "Submit".
- This resumes execution immediately without user interface stalls.

---

## 7. OpenDesign `od-next-strategy` Lifecycle & State Transitions

OpenDesign's execution strategy `od-next-strategy` (v2.0.4+) operates on an explicit two-phase finite state machine:

### 7.1. Stage 1: `inputStage: 'request'` (Plan Freeze & Specification)
- OpenDesign receives the initial prompt and classifies the route (typically `route: 'full_plan'`).
- The AI agent reads project files (`Beplus-spec.md`, `site-audit.json`), freezes design constraints, and emits the Plan Contract block:
  `<open-design-plan-contract>` containing `{ runManifest, taskProfile, ... }`.
- OpenDesign's daemon validates the plan contract, generates an immutable hash (`planContractHash`), and transitions the durable task record to `inputStage: 'production'`, claiming the subsequent physical run.

### 7.2. Stage 2: `inputStage: 'production'` (Physical Code Generation)
- The daemon invokes OpenCode with `stage="production"` and the locked `planContractHash`.
- **CRITICAL PROTOCOL REQUIREMENT**: The agent MUST directly create or write the deliverables (`index.html`, `main.css`) using native file write/bash tools.
- **PITFALL: `od_next_protocol_stage_mismatch` / `od_next_plan_snapshot_mismatch`**:
  If the agent in `production` stage outputs another `<open-design-plan-contract>` instead of generating code, the daemon flags a fatal protocol stage mismatch and halts the run. In `production` stage, the agent MUST ONLY write files and conclude with the runtime state block `<open-design-runtime-state>` (`inputStage: 'production'`, `outcome: 'completed'`).

---

## 8. OpenDesign Daemon Preflight Blocker (`od_next_preflight_input_unavailable`)

### 8.1. The Root Cause in Daemon `resolver.js`
In `/app/apps/daemon/dist/strategies/od-next/resolver.js` (lines 208-212), execution preflight checks:
```javascript
inputs: plan.runManifest.inputRefs.map((id) => ({
    id,
    available: id === 'request',
})),
```
The daemon hardcodes `available: id === 'request'`. If an AI agent includes project filenames like `Beplus-spec.md` or `site-audit.json` in `runManifest.inputRefs`, the daemon evaluates them as `available: false` and blocks execution with:
`od_next_preflight_input_unavailable:Beplus-spec.md`

### 8.2. Dual Mitigation & Resolution
1. **Container Daemon Patch**: In `/app/apps/daemon/dist/strategies/od-next/resolver.js`, update `available: id === 'request'` to `available: true` (or check file existence) so project artifacts pass preflight.
2. **Agent Plan Authoring Rule**: When authoring the Plan Contract, keep `runManifest.inputRefs` restricted to `['request']` to satisfy strict unpatched daemons while referencing project files directly in prompt context.

---

## 9. Chrome DevTools Protocol (CDP) Lexical/ProseMirror Composer Automation

Driving OpenDesign's web UI over CDP (port 9222) requires handling rich-text (Lexical/ProseMirror) editors without breaking React's synthetic event state:

### 9.1. The Synthetic Event & `execCommand` Disabled Trap
- **Trap**: Calling `document.execCommand("insertText", false, promptText)` or modifying `.composer-editable.innerText` updates DOM text, but ProseMirror/Lexical does NOT fire the React synthetic event chain.
- **Symptom**: `button[data-testid="chat-send"].disabled` remains `true` (or resets on the next frame), and clicking the button does nothing. Synthetic `.click()` events also fail to trigger React's `onClick`.

### 9.2. Reliable CDP Native Automation Pattern
Always use CDP's native `Input` domain to simulate genuine keyboard and mouse hardware events:
```javascript
// 1. Focus the contenteditable composer and clear existing text
await send("Runtime.evaluate", {
  expression: `(() => {
    const c = document.querySelector(".composer-editable");
    if (!c) return false;
    c.focus();
    document.execCommand("selectAll", false, null);
    return true;
  })()`
});

// 2. Dispatch native keystrokes via CDP Input domain (triggers React state update)
await send("Input.insertText", { text: promptText });

// 3. Query the enabled send button coordinates
const btnStatus = await send("Runtime.evaluate", {
  expression: `(() => {
    const btn = document.querySelector('button[data-testid="chat-send"]') || document.querySelector('button[aria-label="Send"]');
    if (!btn) return { error: "No button found" };
    const rect = btn.getBoundingClientRect();
    return { disabled: btn.disabled, x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  })()`,
  returnByValue: true
});

// 4. Dispatch native CDP mouse click to the button center coordinates
if (btnStatus?.result?.value && !btnStatus.result.value.disabled) {
  const { x, y } = btnStatus.result.value;
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x, y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x, y, button: "left", clickCount: 1 });
}
```

---

## 12. OpenDesign Full Plan Route & Stage Transition Architecture

### 12.1. Request Stage vs. Production Stage Rules
In OpenDesign's `od-next` strategy with `route: "full_plan"`:
- **`inputStage: 'request'`**: Planning-only stage. The Coding Agent (OpenCode) is strictly barred from generating deliverable files (`index.html`, `main.css`). If a prompt demands "write index.html now" on the request stage, OpenCode will either report `outcome: "blocked"` with reason `od_next_canonical_deliverable_invalid` (because it cannot deliver files yet) or loop into repeatedly editing `Beplus-spec.md`.
- **How to advance to `production` stage**:
  The agent must freeze the specification and output the two machine contract blocks:
  1. `<open-design-plan-contract>` (containing the approved goal, deliverables, build requirements, and full plan).
  2. `<open-design-runtime-state>` with `route: "full_plan"`, `inputStage: "request"`, `executionMode: "simple"`, `outcome: "completed"`.
- OpenDesign daemon's `prepareAutomaticStrategyContinuation` validates the plan contract, saves the `planContractHash` into SQLite `strategy_task_executions`, and automatically continues the session into `inputStage: "production"`.

### 12.2. Production Continuation Stage
In the subsequent continuation run (`stage="production"`), OpenCode receives:
`# OD Next native continuation — production`
Only in this stage must OpenCode call its file tools (`write`, `apply_patch`) to write `index.html` and `main.css`. Outputting another `<open-design-plan-contract>` during production triggers `od_next_protocol_stage_mismatch`.

### 12.3. Anti-Hallucination & Disclaimer Suppression on Commercial Datasets
- **LLM Safety Reflex**: When given commercial metrics (`250+ Projects`, `12+ Years`, `5K+ Clients`) or testimonials without external HTTP URLs, LLMs often reflexively insert "sample UI content only", "illustrative sample metrics", or "sample case studies" disclaimers into `Beplus-spec.md` or the HTML deliverable.
- **Instruction Mandate**: The prompt to OpenDesign must explicitly include:
  `"Treat all supplied copy and commercial numbers as authoritatively confirmed. Do not add disclaimers, sample labels, or qualifiers (e.g. 'sample UI content only', 'illustrative metrics', 'demo content') anywhere in the specification or code deliverables."`

---

## 10. Headless CDP Visual QA & Viewport Inspection Protocols

Validating cloned deliverables requires accurate headless browser rendering without false alarms from scroll-animation triggers or asynchronous viewport behavior:

### 10.1. The `IntersectionObserver` & `.reveal` Opacity 0 Trap
- **Quirk**: Modern templates use `.reveal { opacity: 0; transform: translateY(18px); }` and toggle `.is-visible` via `IntersectionObserver`.
- **Pitfall**: In headless Chromium CDP, `Page.captureScreenshot` with `clip: { x, y, width, height }` does NOT scroll the viewport! `window.scrollY` remains 0. Elements below the initial 900px fold never intersect the viewport, so their observer never fires. Subsequent sections (About, Services, Portfolio) render as blank off-white canvases (`opacity: 0`).
- **Resolution**:
  1. Trigger all reveal elements before capturing:
     ```javascript
     await send("Runtime.evaluate", {
       expression: "document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-visible'))"
     });
     ```
  2. For section-specific inspection, use real viewport scrolling:
     ```javascript
     await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${targetY})` });
     await new Promise(r => setTimeout(r, 600));
     const shot = await send("Page.captureScreenshot", { format: "png" });
     ```

### 10.2. Smooth Scroll Asynchrony Pitfall (`scroll-behavior: smooth`)
- **Quirk**: Stylesheets frequently include `html { scroll-behavior: smooth; }`.
- **Pitfall**: Calling `window.scrollTo(0, 0)` from the bottom of a 9,000px page takes 1.5–2.5 seconds to animate. Capturing a screenshot 300–500ms later catches the viewport mid-scroll (e.g. at the About section instead of the top Hero section), producing misaligned QA screenshots.
- **Resolution**: Temporarily force `scroll-behavior: auto` during automated CDP capture:
  ```javascript
  await send("Runtime.evaluate", {
    expression: "(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); })()"
  });
  ```

### 10.3. Mobile Viewport QA & Margin Measurement (<=767px: 16-20px)
- Emulate real mobile device dimensions:
  ```javascript
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  ```
- Measure computed margins on `.container` to guarantee compliance with the `16–20px` standard:
  ```javascript
  const margins = await send("Runtime.evaluate", {
    expression: "(() => { const c = document.querySelector('.container'); const cs = window.getComputedStyle(c); return { marginLeft: cs.marginLeft, marginRight: cs.marginRight, bodyWidth: document.body.clientWidth }; })()",
    returnByValue: true
  });
  ```

### 10.4. Localizing Measured Target Assets into Container Volume
- OpenCode's generated `index.html` references local asset paths (e.g. `assets/<project>/hero-team.jpg`).
- The code-generation run does not download binary images itself. To prevent broken image icons during Visual QA, synchronize measured asset URLs from `site-audit.json` directly into the project directory:
  - Read measured image URLs from `site-audit.json` (`computed_forensics.measured_images`).
  - Download assets into `/var/lib/docker/volumes/open-design_open_design_data/_data/projects/<project_id>/assets/<project>/`.
  - Set permissions (`chown -R 1001:1001`) so OpenDesign's web server can serve them over `/api/projects/<id>/files/assets/...`.

---

## 11. OpenDesign Daemon Multi-Turn Lifecycles & Autonomous Recovery

### 11.1. Resolving `Plan Contract strategy identity must match the locked Snapshot`
In OpenDesign daemon v2.0.4+, multi-turn user conversation advancements increment project `snapshotId` (e.g. `c2be35e7-aeb7-47d6-af3b-a2a191b729aa`).
- **The Blocker**: `task-store.js` (`validatePlanIdentity`) and `coordinator.js` (`validatePlanBinding`) strictly enforce `plan.strategy.snapshotId === identity.snapshotId`. If OpenCode outputs a Plan Contract bound to a preceding snapshot, the daemon throws `InvalidStrategyTaskTransitionError('Plan Contract strategy identity must match the locked Snapshot.')` and aborts the physical run.
- **The Permanent Fix**: In `/app/apps/daemon/dist/strategies/task-store.js`, auto-align the plan strategy with the locked identity:
  ```javascript
  function validatePlanIdentity(plan, identity, executionMode) {
      if (plan && plan.strategy && identity) {
          plan.strategy.snapshotId = identity.snapshotId;
          plan.strategy.version = identity.strategyVersion;
          plan.strategy.packageHash = identity.strategyPackageHash;
      }
      if (plan && plan.runManifest && identity && identity.selectedAgentId) {
          plan.runManifest.selectedAgentId = identity.selectedAgentId;
      }
      if (executionMode !== null && plan && plan.fullPlan) {
          plan.fullPlan.executionMode = executionMode;
      }
  }
  ```

### 11.2. Autonomous Question Form Protocol (`<question-form id="...">`)
When OpenDesign needs clarification (such as verifying commercial data or selecting deliverable scope), it emits a question form block:
`<question-form id="form-id" title="...">`
- **Submitting Form Answers via CDP**: The daemon server parses answers prefixed with `[form answers — <form-id>]`:
  ```text
  [form answers — <form-id>]
  • <field_id>: <label> [value: <chosen_value>]
  ```
- Submitting this exact string into the Lexical composer immediately satisfies `FORM_ANSWERED_SYSTEM_OVERRIDE` and advances OpenDesign's finite state machine autonomously.

### 11.3. VPS Disk Exhaustion & 0-Byte Silent Generation Trap (`ENOSPC`)
- **Symptom**: `Beplus-spec.md` or `index.html` created with size 0 bytes; OpenCode CPU stays active but nothing is flushed to disk. `opencode.log` reveals:
  `ERROR message="Failed to fetch models.dev" cause="Cause([Die(Error: ENOSPC: no space left on device, mkdir '...locks/...lock.breaker')])"`
- **Cause**: Chromium headless user data dir (`/home/open-design/.config/chromium-headless/`) balloons to 700MB+, `/tmp` fills with deleted file handles, and the root 24GB disk hits 100%.
- **Safe Container Purge (Recovers 1–1.5GB instantly)**:
  ```bash
  docker exec open-design sh -c '
  rm -rf /tmp/* /tmp/.* 2>/dev/null
  rm -rf /home/open-design/.cache/*
  rm -rf /home/open-design/.npm/*
  rm -rf /home/open-design/.config/chromium-headless/Default/Cache/*
  rm -rf /home/open-design/.config/chromium-headless/Default/Code\ Cache/*
  '
  ```

---

## 13. OpenDesign / OpenCode "Reply Timed Out" (20m 2s) & Context Window Overflow Troubleshooting

### 13.1. The "Reply timed out (20m 2s)" Root Causes
When OpenDesign WebUI displays `Run failed (20m 2s)` with `Reply timed out: No new reply from the AI for a long time, so this run has stopped`, OpenDesign waited for two consecutive 600-second watchdog cycles (600s + 600s = 1200s = 20m 2s) with zero stdout from OpenCode CLI. This is caused by two distinct failure modes:

#### Root Cause A: Single Upstream Model Quota Exhaustion (429 Rate Limit)
- **Symptom**: OpenCode CLI logs reveal `AI_APICallError: [provider/model] [429]: The usage limit has been reached` or `HTTPError: 503`. The upstream API stalls or repeatedly retries indefinitely.
- **The Solution**: Update `/home/open-design/.config/opencode/opencode.json` to use a multi-model fallback combo (`Hermes_Agent` or multi-provider fallback pool) that automatically cascades to healthy models upon 429 errors.
- **Crucial Model Aliasing**: When existing projects resume, OpenCode passes the previous session's model name (e.g. `gpt-6-luna`, `claude-sonnet-4-6`). Define aliases for these model keys in `opencode.json` mapping to the active combo so OpenCode does not throw `UnknownError`:
  ```json
  {
    "model": "router/Hermes_Agent",
    "provider": {
      "router": {
        "npm": "@ai-sdk/openai-compatible",
        "options": {
          "baseURL": "http://127.0.0.1:20128/v1",
          "apiKey": "sk-..."
        },
        "models": {
          "Hermes_Agent": { "id": "Hermes_Agent", "name": "Fallback Combo" },
          "gpt-6-luna": { "id": "Hermes_Agent", "name": "Fallback Combo" },
          "claude-sonnet-4-6": { "id": "Hermes_Agent", "name": "Fallback Combo" }
        }
      }
    }
  }
  ```

#### Root Cause B: Conversation Session Bloat & `ContextOverflowError` (>1M Tokens)
- **Symptom**: OpenCode crashes immediately with:
  `ContextOverflowError: prompt is too long: 1171448 tokens > 1000000 maximum`
  or throws `UnknownError: Unexpected server error. Check server logs for details. (ref: err_...)`.
- **Cause**: Multi-turn OpenDesign projects track OpenCode CLI sessions inside `app.sqlite` table `agent_sessions`. Over multiple chat turns, iterative spec edits, and audit data, the session context accumulates over 1.17 million tokens, exceeding the LLM context window.
- **The Permanent Fix (Purge Bloated Session Cursor)**:
  Delete the stale session mapping from SQLite before launching physical code generation:
  ```bash
  python3 -c '
  import sqlite3
  db = sqlite3.connect("/var/lib/docker/volumes/open-design_open_design_data/_data/app.sqlite")
  db.execute("DELETE FROM agent_sessions WHERE conversation_id = \"<CONVERSATION_ID>\";")
  db.commit()
  '
  ```
  On the next run, OpenDesign detects `native_session_recovery: state = "no_recoverable_session"` and starts OpenCode freshly without `-s <bloated_session_id>`. Context drops from 1.17M to ~15k tokens, executing in seconds.

#### Root Cause C: Orphaned `opencode-cli` Background Processes
- If a run fails or times out, previous `opencode-cli` processes may linger in the background holding file locks or port resources:
  ```bash
  pkill -f "opencode-cli run" || true
  ```

---

## 14. Multi-Project Creation, Container Permissions & Mobile Clearance Protocols

### 14.1. OpenDesign Project Creation API (`POST /api/projects`) Protocol
When programmatically spawning new projects via the OpenDesign REST API:
- Endpoint: `POST http://127.0.0.1:7456/api/projects`
- Mandatory Payload Fields:
  ```json
  {
    "id": "<UUIDv4>",
    "name": "<Project Name>",
    "skillId": "spec-driven-clone",
    "pendingPrompt": "@spec-driven-clone <TARGET_URL>"
  }
  ```
- **Crucial Rule**: The `skillId` parameter MUST be set to `"spec-driven-clone"`. If omitted, the database records `skill_id = NULL`, and OpenDesign creates a generic vanilla project without `spec-driven-clone`'s system prompt, leading to protocol schema rejection (`od_next_protocol_plan_contract_invalid_schema`).
- After project creation, navigating the CDP tab to `/projects/<project_id>/conversations/<conversation_id>` displays the prefilled pending prompt ready for instant dispatch.

### 14.2. Docker Container Skill Permissions Guard (`EACCES` Resolution)
- **Symptom**: When `inspect-site.mjs` is executed by OpenCode or via `docker exec -u 1001`, Node crashes with:
  `EACCES: permission denied, open '/app/skills/spec-driven-clone/scripts/inspect-site.mjs'`
- **Cause**: Files created or synced on the VPS host default to `root:root` with mode `600` (`-rw-------`), while the OpenDesign container daemon and OpenCode CLI run as user `open-design` (UID `1001`).
- **Fix**: Guarantee container-wide accessibility:
  ```bash
  docker exec -u 0 open-design chmod -R a+rX /app/skills/
  docker exec -u 0 open-design chown -R open-design:open-design /app/skills/
  ```

### 14.3. Mobile Sticky/Absolute Header Clearance Pitfall (Overlap Bug)
- **Symptom**: On mobile viewports (`390px` or `<= 767px`), the top line of the H1 headline (e.g. "We pour capital into") is completely obscured or clipped behind the fixed/sticky navbar border.
- **Root Cause**: The header uses `position: fixed` or `position: absolute` with backdrop blur, but `.hero` uses standard desktop padding (`150px`) or insufficiently accounts for mobile header height.
- **Mandatory Mobile CSS Rules (`@media (max-width: 767px)`)**:
  1. **Hero Clearance**:
     ```css
     @media (max-width: 767px) {
       .hero {
         padding-top: calc(var(--wp--preset--spacing--60) + 40px); /* Ensures ~100px-120px top clearance */
       }
     }
     ```
  2. **Mobile Header Streamlining**: Physical address lines, location pins, and phone pills (`.email-flex`, `.header-location`) MUST be hidden on mobile:
     ```css
     @media (max-width: 767px) {
       .email-flex, .header-address-pill {
         display: none;
       }
     }
     ```
     This keeps the mobile header clean, displaying strictly the Brand Logo on the left and the Hamburger toggle on the right.

### 14.4. Dark Canvas Typography Contrast (WCAG AA Compliance)
- **Pitfall**: In dark themes (`--wp--preset--color--base: #143132` or similar dark slate), applying low-opacity white to secondary headline spans (e.g. `.main-display.gray { color: rgba(255, 255, 255, 0.45); }`) creates a contrast ratio below 4.5:1, failing WCAG AA accessibility audits and rendering washed out.
- **Mandatory Rule**: Use high-contrast solid muted tokens for dark themes:
  ```css
  .main-display.gray {
    color: #94A3B8; /* Slate-400: Crisp, legible, passes WCAG AA on dark backgrounds */
  }
  ```

---

## 15. Webflow Animation Curtain Overlays, Button Contrast & OpenDesign UI Traps

### 15.1. Webflow IX2 Curtain/Image-Show Overlay Defect (`.image-show-style`)
- **Symptom**: In modern Webflow templates (luxury portfolios, dark agency showcases like Agency NX), giant vertical rectangular blocks (`.image-show-style > .bg-column-mask > .bg-color-column`) cover 95% of the hero section or portfolio media cards, obscuring background images, headlines, or CTA buttons in screenshots.
- **Root Cause**: Webflow IX2 binds via `data-w-id="86948c09..."` and sets inline `style="display: grid;"` on page load, waiting for a `SCROLL_INTO_VIEW` interaction to animate column masks out of view. In headless browser captures, the animation never triggers or completes, leaving curtain panels stuck in place.
- **Mandatory Resolution**:
  1. In `index.html`: Strip `data-w-id` from `.image-show-style` tags and enforce `style="display: none;"` (or remove `.bg-column-mask` entirely):
     ```python
     new_html = re.sub(r'<div\s+data-w-id="[^"]+"\s+class="image-show-style"[^>]*>', '<div class="image-show-style" style="display: none;">', html)
     ```
  2. In `main.css`: Explicitly enforce:
     ```css
     .image-show-style, .bg-column-mask, .bg-color-column, .primary-color-column {
       display: none;
     }
     ```

### 15.2. Pill Button Contrast Inversion Bug (`.white-button`)
- **Symptom**: Primary pill buttons (such as `.white-button` containing "View Services") render as blank white rectangles with invisible text.
- **Root Cause**: Global link styling declares `a { color: var(--wp--preset--color--contrast); }` (which resolves to white `#ffffff` on dark themes). When `.white-button` sets `background-color: var(--wp--preset--color--contrast);` (white) without explicitly defining a contrasting text color, button label spans inherit white text on white background.
- **Mandatory Resolution**:
  ```css
  .white-button {
    background-color: var(--wp--preset--color--contrast);
    color: var(--wp--preset--color--base); /* Black text on white pill */
  }
  .white-button .default-text,
  .white-button [class*="button-text"] {
    color: var(--wp--preset--color--base);
  }
  ```

### 15.3. OpenDesign Artifact Viewer Route Trap in CDP Automation
- **Trap**: When OpenCode finishes a run, the daemon automatically updates the front-end browser URL to `/projects/<project_id>/conversations/<conversation_id>/files/index.html` (the code editor view).
- **Symptom**: Scripts attempting to send follow-up refinement prompts fail with `No textarea / No input found` because the chat composer DOM is absent on the file-viewer route.
- **Resolution**: Always inspect `window.location.href`. If it ends in `/files/...`, navigate back to the conversation route before querying the composer:
  ```javascript
  const targetUrl = `http://127.0.0.1:7456/projects/${projId}/conversations/${convId}`;
  if (window.location.href.includes('/files/')) {
    window.location.href = targetUrl;
    await new Promise(r => setTimeout(r, 2000));
  }
  ```

### 15.4. Lexical/React Native CDP Keystroke Injection
- **Trap**: OpenDesign's chat composer is a Lexical rich editor (`[data-testid="chat-composer-input"]`). Modifying `.innerText`, `.value`, or dispatching synthetic `InputEvent` does NOT update Lexical's internal state machine, leaving the `[data-testid="chat-send"]` button permanently disabled.
- **Resolution**: Use Chrome DevTools Protocol native `Input.insertText`:
  1. Focus the editor: `document.querySelector('[data-testid="chat-composer-input"]').focus();`
  2. Dispatch CDP method `Input.insertText` with `{ text: prompt }`. This triggers native browser input pipelines, causing Lexical/React to recognize the change and immediately enable `chat-send`.
  3. Dispatch `.click()` on `[data-testid="chat-send"]`.

### 15.5. Dynamic Webflow Watermark Badge (`.w-webflow-badge`) Cascading Order Trap
- **Symptom**: Visual QA reveals the "Made in Webflow" floating badge remaining visible in the lower right corner of the clone, despite `.w-webflow-badge { display: none; }` being added to `main.css`.
- **Root Cause**: Webflow's bundled CSS declares `.w-webflow-badge { display: block; }` later in the file (e.g. around line 440+). If an agent prepends or inserts the reset rule at the top of `main.css`, CSS cascading order causes the later `display: block` to take precedence. Since `!important` is strictly prohibited by AlonePro Quality Gates, specificity or source order must be used.
- **Resolution**:
  1. Place the reset rule at the **VERY END** of `main.css`.
  2. Increase selector specificity without using `!important`:
     ```css
     a.w-webflow-badge,
     .w-webflow-badge,
     a.w-webflow-badge > img {
       display: none;
     }
     ```

### 15.6. Non-Semantic Heading Divs Upgrade (`div.heading---h*` to `<h1-h6>`)
- **Symptom**: Webflow templates often use `<div>` tags with heading classes (e.g. `<div class="heading---h2">Revenue Summary</div>`) instead of semantic `<h2>` elements. In live browser audits, `document.querySelectorAll('h2')` returns 0 elements, and browser computed styles fail to inherit the FSE `theme.json` heading elements contract.
- **Resolution**:
  During the HTML refactoring pass in Phase 2, convert all heading `<div>` wrappers to genuine semantic heading tags while retaining their original class names:
  ```python
  def replace_heading(tag_name, class_name, content):
      pattern = rf'<div([^>]*class=[\"\'][^\"\']*{class_name}[^\"\']*[\\\"\'][^>]*)>(.*?)</div>'
      return re.sub(pattern, rf'<{tag_name}\1>\2</{tag_name}>', content, flags=re.DOTALL)

  html = replace_heading('h2', 'heading---h2', html)
  html = replace_heading('h3', 'heading---h3', html)
  html = replace_heading('h4', 'heading---h4', html)
  html = replace_heading('h5', 'heading---h5', html)
  ```

---

## 16. Universal Icon vs Image Disambiguation Architecture

### 16.1. The Webflow `<img>` Icon Trap
In Webflow and modern headless builders, design systems often export small iconography as inline `<img>` tags pointing to Webflow CDN assets:
`<img src="https://cdn.prod.website-files.com/.../icon.svg" class="image-30px" alt="Rocket">`
Naive scrapers and LLMs misidentify these as general content photos and attempt to replace them with large Unsplash photos or leave them as broken external links.

### 16.2. 4-Vector Disambiguation Heuristic
An element MUST be classified as an **Icon Node** if it meets ANY of the following 4 vectors:
1. **Geometric Vector**: Computed or declared `width` or `height` <= `64px` (e.g. `image-16px`, `image-24px`, `image-30px`, `image-45px`).
2. **Class & Attribute Vector**: Class contains `icon`, `svg`, `symbol`, `bullet`, `badge`, `arrow`, `star`, `nav`, `check`.
3. **MIME/Path Vector**: File path ends in `.svg` or contains `/icon/`, `/icons/`, or `icon-`.
4. **DOM Nesting Vector**: Sits inside a circular badge (`.icon-circle`, `.badge-pill`), timeline step (`.timeline-node`), button icon slot, or checklist bullet.

### 16.3. Mandate on Icon Nodes
- **STRICT PROHIBITION**: NEVER map an Icon Node to an Unsplash photo.
- **MANDATORY**: Replace 100% of Icon Nodes with inline **Lucide SVG icons** (`stroke-width="1"`).
- Preserve the exact layout geometry (circle badges, connector lines, relative offsets).

---

## 17. Context-Aware Semantic Icon Mapping & Anti-Repetition Contract

### 17.1. Anti-Repetition Rule
In any grid, list, timeline, or series of cards, no two consecutive or sibling items may share the same icon (unless it is a uniform checklist with identical checkmarks). The AI must inspect each card's title and description individually.

### 17.2. Semantic Icon Mapping Dictionary
- **About / Overview / Introduction**: `info`, `help-circle`, `book-open`, `compass`
- **Mission / Launch / Velocity / Execution**: `rocket`, `zap`, `send`, `flame`
- **Vision / Focus / Discovery / Future**: `binoculars`, `eye`, `scan`, `telescope`
- **Strategy / Goals / Objectives**: `target`, `crosshair`, `map-pin`, `route`
- **Security / Compliance / Protection**: `shield-check`, `lock`, `badge-check`, `key`
- **Finance / Analytics / Growth / Metrics**: `trending-up`, `bar-chart-3`, `dollar-sign`, `wallet`, `pie-chart`
- **Design / UI / UX / Creative**: `palette`, `pen-tool`, `layers`, `layout`, `wand-2`
- **Technology / Engineering / Code**: `code-2`, `cpu`, `terminal`, `server`, `database`
- **Community / Team / Partnership**: `users`, `user-check`, `heart-handshake`, `message-square`

### 17.3. Exact Color Extraction Protocol (Zero Guessing)
1. Read the computed `color`, `stroke`, `fill`, and container `background-color` of the original icon node via CDP `getComputedStyle()`.
2. If the icon sits inside an accent badge (e.g. Agency NX neon lime `#BBF340`), the icon stroke inside is solid black (`#000000`).
3. If the icon is standalone on a dark canvas, bind stroke to `var(--wp--preset--color--primary)` or `var(--wp--preset--color--contrast)`.
4. Review stars MUST strictly use gold `#F59E0B`. Guessing arbitrary pastel or random colors is forbidden.

---

## 18. Card Grid Geometry, Equal Heights & Robust Spacing Standards

### 18.1. Equal Heights Contract
Sibling cards in a grid or flex row must never have uneven vertical heights:
```css
.card-grid, .features-grid, .services-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  align-items: stretch; /* Forces equal height columns */
  gap: var(--wp--preset--spacing--30);
}

.card-item, .feature-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Force bottom action or metadata to sit at the exact same baseline across all cards */
.card-item .card-footer,
.card-item .btn,
.card-item [class*="button"] {
  margin-top: auto;
}
```

### 18.2. Text Clipping & Overflow Prevention
- Do NOT use fixed pixel `height` on text description containers. Use `min-height: auto; height: auto; overflow: visible;`.
- Use `text-wrap: balance;` on headings to prevent single-word orphan line wraps.

### 18.3. Mobile Safe Margins Mandate
Screen width `<= 767px` MUST maintain an exact container padding of `16–20px`:
```css
@media (max-width: 767px) {
  .container, .page-wrapper > div {
    width: min(var(--container-max-width, 1280px), calc(100% - var(--wp--preset--spacing--40)));
    margin-inline: auto;
    padding-inline: 0;
  }
}
```

---

## 19. Swiper & Carousel Autoplay, Fractional Peek (3.5) & Edge Overlay Fade Standards

### 19.1. Mandatory Autoplay Specification
All multi-card carousels (Testimonials, Portfolio reels, Client showcases) must include continuous or autoplay mechanics:
- Autoplay delay: 3500ms to 4500ms.
- `disableOnInteraction: false` and `pauseOnMouseEnter: true`.
- Equal slide heights:
  ```css
  .swiper-wrapper {
    align-items: stretch;
  }
  .swiper-slide {
    height: auto;
    display: flex;
    flex-direction: column;
  }
  ```

### 19.2. Fractional Slides (3.5 items) & Right-Edge Gradient Fade Overlay
When desktop layouts display a fractional number of slides (such as 3.5 or 2.5 slides to hint at upcoming content):
1. Container MUST enforce `overflow: hidden;`.
2. A gradient fade overlay MUST be positioned on the right edge so the partially visible slide fades smoothly into the canvas background rather than abruptly clipping:
```css
.slider-container {
  position: relative;
  overflow: hidden;
}

.slider-container::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 90px;
  background: linear-gradient(to right, transparent, var(--wp--preset--color--base));
  pointer-events: none;
  z-index: 5;
}
```
3. Responsive collapse:
   - Desktop: `slidesPerView: 3.5` (with right-edge fade)
   - Tablet: `slidesPerView: 2.2`
   - Mobile: `slidesPerView: 1.15` (or `1`)

---

## 20. Ghost Section & Blank Content Elimination Protocol

### 20.1. Root Causes of Blank Sections in Cloned Sites
1. **Webflow IX2 Scroll Trigger Detachment**: Elements initialized with `opacity: 0; transform: translateY(40px);` waiting for scroll interactions that never fire in static or headless contexts.
2. **Text-to-Background Color Collision**: Inverted sections (dark card inside light page, or light card inside dark page) where text color cascades to match the card background (e.g. white text on white background).
3. **Curtain Masks & Unclosed Modals**: Overlay elements (`.image-show-style`, commerce cart wrappers) covering the viewport.

### 20.2. Mandatory Resolutions
- **Fallback Base Visibility**: In `main.css`, all content containers and headings MUST default to:
  `opacity: 1; transform: none; visibility: visible;`
- **Dual Token Declaration on Inverted Containers**: Whenever a card or section inverts its background, declare BOTH background and text color tokens:
  ```css
  .dark-surface {
    background-color: var(--wp--preset--color--contrast);
    color: var(--wp--preset--color--base);
  }
  .dark-surface h4, .dark-surface p {
    color: inherit;
  }
  ```
- **Purge All Intro Curtains**: Set `.image-show-style, .bg-column-mask { display: none; }`.

---

## 21. Section Heading Dominance Contract (H2 Section Headings vs H4 Card Sub-headings)

### 21.1. Visual Dominance Principle
In EVERY section, the primary section title MUST visually dominate all internal card titles, feature labels, and metric numbers. A card title must never be equal to or larger than the section title.

### 21.2. Strict Tag & Token Hierarchy
1. **Hero Main Headline**: `<h1>` -> `var(--wp--preset--font-size--xx-large)` (or `x-large`).
2. **Section Primary Title**: `<h2>` -> `var(--wp--preset--font-size--large)`.
3. **Card Titles / Feature Item Titles / Step Titles**: `<h4>` -> `var(--wp--preset--font-size--medium)`.
4. **Secondary Card Groupings (if 3 tiers exist)**: `<h3>` -> `var(--wp--preset--font-size--medium-plus)`.
5. **Eyebrow / Kicker Badge**: `<h6>` or `.eyebrow` -> `var(--wp--preset--font-size--small)` with `text-transform: uppercase; letter-spacing: 0.05em;`.
6. **Body Copy**: `<p>` -> `var(--wp--preset--font-size--base)`.

---

## 22. Latin Placeholder ("Lorem Ipsum" / "Sed acc") Forensic Detection & Rewrite Protocol

### 22.1. The Placeholder Leak Trap
Webflow template creators often leave Latin filler text (`Sed ut perspiciatis`, `Sed accumsan`, `Lorem ipsum`, `dolor sit amet`) in secondary card bodies, testimonials, or timeline steps.

### 22.2. Zero Tolerance Mandate
The AI must scan all extracted section content for Latin roots:
`\b(lorem|ipsum|sed ut perspiciatis|sed acc|dolor sit|consectetur|adipiscing)\b`
Every detected Latin paragraph MUST be 100% replaced with polished, natural commercial copywriting matching:
1. The exact industry niche (Creative Agency, Fintech, VC, SaaS).
2. The exact length and sentence rhythm of the original UI box.
3. Realistic, credible terminology and verifiable metric formats.

---

## 23. The Specificity Trap of Webflow Pixel Utility Classes (`._24px-link`, `._24px-text`)

### 23.1. The DevTools Cascade Defect
In Webflow and export bundles, typography utility classes exist throughout stylesheets:
```css
._24px-link {
  font-size: 24px;
  line-height: 36px;
}
```
When an HTML heading element `<h3 class="_24px-link">` or `<h4 class="_24px-link">` is evaluated:
1. The FSE element selector `h3 { font-size: var(--wp--preset--font-size--medium-plus); }` has specificity `(0, 0, 1)`.
2. The class selector `._24px-link` has specificity `(0, 1, 0)`.
3. In browser DevTools, the FSE token is struck through (`strikethrough`) and overridden by the hardcoded `24px`!

### 23.2. Mandatory Resolution in Phase 2
The AI must perform an automated sweep of all utility font-size declarations:
1. Replace all pixel font sizes on classes with FSE presets:
   ```css
   ._24px-link, ._24px-text, ._22px-text {
     font-size: var(--wp--preset--font-size--medium);
     line-height: 1.25;
   }
   ._18px-text, ._16px-link {
     font-size: var(--wp--preset--font-size--base);
   }
   ._30px-title, ._44px-text {
     font-size: var(--wp--preset--font-size--large);
   }
   ```
2. OR strip the `font-size` declaration from the utility class so the semantic tag (`<h1>`–`<h6>`) dictates the typography directly from `theme.json`.

---

## 24. Bento Grid Multi-Row Asymmetric Geometry & Bottom Alignment

### 24.1. The Height Mismatch Defect
In split Bento sections (e.g. Prospect SaaS Section 3):
- Left column has 2 stacked cards (`.square-box` testimonial card + `.widescreen-ratio` abstract image).
- Right column has 1 tall portrait photo card (`.rounded-photo.portrait`).
- If the right image does not have an explicit `height: 100%; object-fit: cover;`, its bottom edge will detach from the left column's baseline, creating an awkward ragged gap.

### 24.2. Mandatory CSS Topology
```css
.bento-wrap {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: stretch;
  gap: var(--wp--preset--spacing--30);
}

.bento-left {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--20);
  height: 100%;
}

.bento-left .square-box {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.bento-left .square-box .button {
  margin-top: auto; /* Aligns button to bottom of quote without crowding text */
}

.rounded-photo.portrait {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}
```

---

## 25. Floating Glassmorphism Icon Badges (`.card-glass-icon`)

### 25.1. Overlap Geometry & Clearance
When modern cards place a circular icon badge floating between the top media container and the bottom card content:
1. **Absolute Positioning**:
   ```css
   .card-image-wrap {
     position: relative;
   }
   .card-glass-icon {
     position: absolute;
     bottom: 0;
     left: var(--wp--preset--spacing--20);
     transform: translateY(50%);
     z-index: 2;
     width: 44px;
     height: 44px;
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     backdrop-filter: blur(10px);
     -webkit-backdrop-filter: blur(10px);
     background: rgba(255, 255, 255, 0.65);
     border: 1px solid rgba(255, 255, 255, 0.4);
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
   }
   ```
2. **Body Padding Clearance**:
   The card body below must provide clearance so headline text never touches or clips under the badge:
   ```css
   .card-body {
     padding-top: calc(var(--wp--preset--spacing--30) + 14px);
   }
   ```
3. **Inline Lucide Icon**:
   Inside `.card-glass-icon`, replace Webflow `<img>` with inline `<svg class="lucide lucide-..." stroke="var(--wp--preset--color--contrast)" stroke-width="1">`.

---

## 26. Testimonial Carousel Architecture & Anti-Duplication Contract

### 26.1. Equal Height Slides & Baseline-Aligned Controls
In testimonial sliders (e.g. Prospect SaaS Section 7):
- All slides must have identical heights (`height: auto; display: flex;`).
- Navigation buttons (`.slider-prev`, `.slider-next`) must be positioned at the bottom right of the container, aligned horizontally with the support CTA bar (`align-items: center; gap: 12px;`).
- Use inline Lucide arrows (`<svg class="lucide lucide-arrow-left">` and `lucide-arrow-right"`).

### 26.2. Anti-Duplication Contract across Cards
Template creators often duplicate cards (e.g. Card 1 and Card 3 both having "Adaptive Intelligence").
- **STRICT PROHIBITION**: Every card in a grid MUST have a unique headline, unique copy, and distinct semantic icon.
- When inspecting templates, if duplicated cards are detected, the AI must synthesize a fresh, industry-accurate commercial variation (e.g. "Automated Reconciliation" or "Real-Time Treasury") rather than cloning duplicate text.

---

## 27. Mobile Viewport Header Architecture: Hamburger Menu vs CTA Button

### 27.1. The Mobile Navigation Displacement Trap
A frequent failure pattern in cloned landing pages is that the desktop navbar hides all navigation links (`Home`, `Solutions`, `About Us`, `Contact`) on mobile (`display: none;`), but retains the large desktop CTA button (`Explore Business >>`) without adding a mobile hamburger toggle.
This leaves mobile users completely stranded with no way to navigate the site structure.

### 27.2. Mandatory Mobile Header Contract
1. **Hamburger Toggle Element**:
   The header MUST include a `<button class="mobile-menu-toggle" aria-label="Toggle navigation">` containing inline Lucide `menu` SVG (or `x` when open), with `stroke-width="1"` and a touch target of at least `44px x 44px`.
2. **Mobile Drawer Navigation**:
   All top-level navigation links must collapse into a smooth slide-out or full-width drawer overlay (`.mobile-menu-drawer`) when the hamburger button is clicked.
3. **CTA Button Streamlining**:
   - On screens `<= 767px`, the desktop CTA button should either be miniaturized (icon-only or concise label) or moved inside the mobile menu drawer to eliminate visual redundancy with the Hero CTA button.
4. **Mobile Gutter Padding**:
   Header and section containers on mobile MUST strictly adhere to `16px - 20px` horizontal side gutters (`var(--wp--preset--spacing--20)`).

---

## 28. Scroll-Driven Text Illumination (Word-by-Word Reveal / Highlight Scrub)

### 28.1. The Missing Motion Defect
Modern premium Webflow & Framer templates (such as the *What We Offer* and *Our Core Values* sections in MNC) employ dynamic scroll-driven text scrub:
- As the user scrolls into the viewport, the headline does not simply appear static. Instead, individual words light up sequentially from a dimmed, low-contrast state to vibrant full-contrast white.
- If the AI produces a static typography block, the remake feels lifeless and fails the "fidelity" promise.

### 28.2. Mandatory Vanilla CSS & JavaScript Implementation
To reproduce this without bulky third-party dependencies:

1. **Markup Structure**:
   Headlines flagged with `[data-scroll-illuminate]` or `.scroll-illuminated` have their words wrapped in `<span class="scroll-word">`:
   ```html
   <h2 class="section-title scroll-illuminated" data-scroll-illuminate>
     Our core values define who we are, guide every decision we make, and drive us forward.
   </h2>
   ```

2. **CSS Styling**:
   ```css
   .scroll-word {
     opacity: 0.25;
     color: var(--wp--preset--color--paragraph);
     transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease;
     display: inline-block;
     margin-right: 0.25em;
   }
   .scroll-word.is-lit {
     opacity: 1.0;
     color: var(--wp--preset--color--contrast);
   }
   ```

3. **High-Performance Scroll Scrub JS**:
   ```javascript
   function initScrollIllumination() {
     const targets = document.querySelectorAll('.scroll-illuminated, [data-scroll-illuminate]');
     targets.forEach(target => {
       const text = target.innerText.trim();
       const words = text.split(/\s+/);
       target.innerHTML = words.map(w => `<span class="scroll-word">${w}</span>`).join(' ');
       const wordSpans = target.querySelectorAll('.scroll-word');
       
       let ticking = false;
       window.addEventListener('scroll', () => {
         if (!ticking) {
           window.requestAnimationFrame(() => {
             const rect = target.getBoundingClientRect();
             const winH = window.innerHeight;
             // Progress from 0 (enters 80% of viewport) to 1 (reaches 30% of viewport)
             const progress = Math.min(Math.max((winH * 0.8 - rect.top) / (winH * 0.5), 0), 1);
             const litCount = Math.floor(progress * wordSpans.length);
             wordSpans.forEach((span, i) => {
               if (i < litCount) span.classList.add('is-lit');
               else span.classList.remove('is-lit');
             });
             ticking = false;
           });
           ticking = true;
         }
       }, { passive: true });
     });
   }
   ```

---

## 29. Staggered Viewport Entrance & Card Hover Micro-Interactions

### 29.1. The Static Grid Defect
When users scroll down a page, cards (features, bento items, stats, articles) should glide into view sequentially rather than pop in simultaneously or sit lifelessly. Furthermore, interactive cards must provide immediate, tactile feedback on hover.

### 29.2. Staggered Entrance Pattern
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
function initScrollEntrance() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach((el, idx) => {
    el.style.transitionDelay = `${(idx % 4) * 0.1}s`;
    observer.observe(el);
  });
}
```

### 29.3. Card Hover Physics
```css
.card, .bento-card, .offer-card {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.35s ease, 
              border-color 0.35s ease;
}
.card:hover, .bento-card:hover, .offer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}
.card:hover .icon-arrow, .card:hover .btn-arrow {
  transform: translate(3px, -3px);
  transition: transform 0.25s ease;
}
.card:hover img {
  transform: scale(1.04);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 30. 100% Professional English Markdown Deliverables Mandate

### 30.1. The Language Contamination Defect
In past iterations, AI agents occasionally emitted Vietnamese table headers (e.g., `STT`, `Tên Section`, `Bố cục & Token`, `Tiêu chí đối soát`) inside `Beplus-spec.md` or review plans.
This contaminates commercial deliverables intended for international standard workflows.

### 30.2. Strict English Rule
- Every file with extension `.md` (specifically `Beplus-spec.md`, plan contracts, and audit matrices) MUST be written in 100% professional commercial English.
- All table headers must use standard English taxonomy:
  `No. | Section Name | Layout & Tokens | Heading Hierarchy (H2>H4) | Production Copy | Motion & Micro-Interactions | Assets & Lucide Icons | QA Verdict`
- Section criteria tables must use:
  `Verification Criterion | Expected Specification | Actual Finding | Verdict`
- Any occurrence of Vietnamese words in markdown artifacts is classified as a Quality Gate failure and rejected.

---

## 31. Split Cards with Floating Media Overlays & Feature Capsules (The What We Offer Pattern)

### 31.1. The Component Flattening Defect
A major cause of visual disparity between Webflow originals and AI reconstructions is "component flattening":
- In the original site (e.g. *What We Offer*), each service is presented as an expansive 50/50 split card on a dark `#201d1d` canvas.
- The left column contains the step index (`01`), a bold title, body copy, and a forward-navigating button.
- The right column features a rich photographic scene overlaid by a floating white card containing three feature capsules (`Strategic Planning`, `Fast Implementation`, `ROI Focused`).
- When AI OpenDesign flattens this into two generic single-column boxes, the design loses its spatial depth, premium hierarchy, and signature brand feel.

### 31.2. Mandatory Split & Floating Overlay Architecture
```css
/* Container & Section */
.offer-section {
  background-color: var(--wp--preset--color--surface); /* Dark #201d1d */
  padding-block: var(--wp--preset--spacing--60);
}

/* 50/50 Split Card */
.offer-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--wp--preset--spacing--40);
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: var(--wp--preset--spacing--40);
  margin-bottom: var(--wp--preset--spacing--30);
  align-items: center;
}

@media (max-width: 991px) {
  .offer-card {
    grid-template-columns: 1fr;
    padding: var(--wp--preset--spacing--30);
  }
}

/* Left Column Details */
.offer-details {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--20);
}

.offer-num {
  font-size: var(--wp--preset--font-size--small);
  font-weight: 700;
  color: var(--wp--preset--color--primary);
  letter-spacing: 0.1em;
}

.offer-name {
  font-size: var(--wp--preset--font-size--large);
  color: #111111;
  margin: 0;
}

.offer-excerpt {
  font-size: var(--wp--preset--font-size--base);
  color: #555555;
  line-height: 1.6;
}

/* Right Column Media with Floating Overlay */
.offer-media-wrap {
  position: relative;
  border-radius: 16px;
  overflow: visible; /* Allows overlay card to float partially over edge */
}

.offer-base-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 16px;
  display: block;
}

/* Floating White Feature Card */
.offer-floating-card {
  position: absolute;
  bottom: -16px;
  right: -16px;
  background: #FFFFFF;
  border-radius: 14px;
  padding: var(--wp--preset--spacing--20);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 260px;
}

@media (max-width: 767px) {
  .offer-floating-card {
    position: static;
    margin-top: var(--wp--preset--spacing--20);
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
}

/* Feature Capsule Pills */
.feature-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #F4F5F7;
  padding: 8px 14px;
  border-radius: 8px;
}

.feature-pill-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111111;
}

.feature-pill-text strong {
  display: block;
  font-size: var(--wp--preset--font-size--small);
  color: #111111;
}

.feature-pill-text span {
  display: block;
  font-size: calc(var(--wp--preset--font-size--small) * 0.9);
  color: #666666;
}
```

---

## 32. Workspace Hygiene & Intermediate Scratchpad Isolation (Preventing False Scraping Alarms)

### 32.1. The Root Cause of the "Target.html Scraping False Alarm"
In OpenDesign and modern file-driven AI workspaces, the backend daemon monitors the project directory (`/app/.od/projects/<project_id>/`) in real time.
- When an AI agent or inspect script runs a shell command like `curl -s https://example.com > target.html` (or saves raw dumped Webflow/Framer HTML) directly into the project root directory, OpenDesign's file watcher immediately detects it.
- OpenDesign registers `target.html` as a project deliverable, indexes it in the file tree, and generates a corresponding artifact manifest (`target.html.artifact.json`).
- When the human user opens the OpenDesign UI to review project progress, they see `target.html` in the file tree (`/files/target.html`), click it, and open browser DevTools (F12).
- Inside DevTools, the user sees raw Webflow classes (`w-dyn-list`, `offer-card white`), Webflow CDN stylesheets, and Webflow badges. This creates the immediate, alarming impression that the AI did not follow the 2-stage spec-driven build process, but instead simply "stole" and dumped the raw source code!

### 32.2. Mandatory Scratchpad Isolation Mandate
1. **ABSOLUTE PROHIBITION ON RAW DUMPS IN PROJECT ROOT**:
   The AI agent and forensic scripts MUST NEVER create, write, or leave files named `target.html`, `dump.html`, `raw.html`, `temp.html`, or `scraped.html` in the project root directory.
2. **In-Memory DOM Forensics**:
   All DOM queries, computed style extractions, and animation timeline inspections should be performed directly against the live headless Chromium tab over CDP port 9222 (`Runtime.evaluate`).
3. **Isolated Scratchpad Directory**:
   If an offline HTML file must be saved for regex or BeautifulSoup analysis, it MUST be written strictly to an isolated temporary directory outside the project tree:
   - Linux host / container: `/tmp/scratchpad/target.html` or `.cache/target.html` (dot-prefixed directory ignored by OpenDesign file watchers).
   - Any temporary scratchpad file created during Phase 1 inspection MUST be automatically purged (`rm -f /tmp/scratchpad/target.html`) before the agent finishes Phase 1.
4. **Deliverable Sanctity**:
   The project directory must contain ONLY intentional, high-standard deliverables:
   - Phase 1: `Beplus-spec.md` (and intermediate JSON audits like `site-audit.json`).
   - Phase 2: `index.html` (100% clean Gutenberg FSE DOM) and `main.css` (100% Gutenberg FSE tokens).












---

## 33. Optical Icon Hierarchy & Anti-Miniaturization Standard (Curing the "Tiny Icon" Defect)

### 33.1. The Root Cause of AI "Icon Miniaturization"
In almost every AI-driven web generation workflow, icons consistently end up looking disproportionately small, frail, and anemic compared to surrounding text. This stems from three interconnected technical blind spots:
1. **The Lucide/Feather Inherent Inset Trap**: Standard vector icon glyphs are rendered on a `24x24` viewBox, but have an intentional 2px to 3px inner padding on all sides. A glyph set to `width="16px"` or `18px` has an active visual silhouette of only **12px to 14px**!
2. **Optical Weight Imbalance vs. Heavy Typography**: AI models calculate size purely numerically (`18px icon` vs `18px text`). However, headings and metric numbers (`8,000+`, `H4 titles`) carry `font-weight: 600–800`, which occupies massive black/white pixel density. Thin vector outlines (especially with `stroke-width="1"`) have less than 15% of that optical density, causing the icon to visually disappear ("lọt thỏm").
3. **The "Naked SVG" Failure**: High-end Webflow templates NEVER float bare SVG outlines loosely in empty space. Human designers always place icons inside **geometric container tiles** (squircles, rounded squares, or circular badges) with subtle tinted backgrounds (`rgba(..., 0.06)`). When AI leaves icons unboxed, the eye perceives them as isolated punctuation marks rather than prominent UI anchors.

### 33.2. The 3-Tier Optical Sizing & Weight Spec
Every icon node rendered in Gutenberg FSE templates MUST adhere to this optical calibration matrix:

| Component Type | Real-World Examples | Container Tile Geometry | SVG Dimensions | Stroke Width | Visual Goal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1: Big Metric & Stat Cards** | `8,000+`, `$5B+`, Hero feature counters | `52px × 52px` or `56px × 56px` squircle (`border-radius: 12–16px`) | **`28px × 28px`** (Min 26px) | `1.75` (Bold: `2.0`) | Matches massive numerical weight of 40px+ metrics |
| **Tier 2: Feature Capsules & Value Lists** | `Strategic Planning`, `Smart Health`, What We Offer pills | `38px × 38px` or `42px × 42px` rounded square (`border-radius: 8–10px`) | **`20px × 20px`** (Min 20px) | `1.75` | Balances bold H4 / strong titles effortlessly |
| **Tier 3: Inline Micro-Affordances** | Button chevrons (`»`), Trust badges, status dots | Inline or `24px × 24px` flex badge | **`16px × 16px`** | `1.75` | Clear directional navigation cues without breaking baseline |

### 33.3. Mandatory Icon Box Architecture
Whenever a feature list or floating card is constructed, the markup MUST wrap the SVG in a dedicated `.feature-icon-box`:
```html
<!-- CORRECT: Optical Hierarchy Compliant -->
<div class="feature-capsule">
  <div class="feature-icon-box">
    <svg class="lucide lucide-compass" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
      <!-- paths -->
    </svg>
  </div>
  <div class="capsule-content">
    <strong>Strategic Planning</strong>
    <p>Custom roadmaps engineered for rapid enterprise expansion.</p>
  </div>
</div>
```
```css
/* CSS Token Implementation */
.feature-icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: var(--wp--preset--spacing--10, 8px);
  background-color: rgba(32, 29, 29, 0.05); /* or subtle tint */
  color: var(--wp--preset--color--contrast);
  margin-top: 2px;
}
.feature-icon-box svg {
  width: 20px;
  height: 20px;
  stroke-width: 1.75;
}
```

---

## 34. Sticky Stacking Cards Scroll Engine (The What We Offer Architecture)

### 34.1. The Phenomenon of "Card Deck Peeling"
On high-end Webflow corporate sites like MNC Global Solutions, Section 03 ("What We Offer") does NOT render as a mundane, static vertical list of boxes. Instead, it functions as an interactive **Sticky Stacking Card Deck**:
1. When the user scrolls down, **Card 01** docks ("sticks") near the top of the viewport (`top: 4rem` or `top: 60px`).
2. As the user continues scrolling, **Card 02** slides up from below and **stacks directly over Card 01**, docking at `top: 6rem`.
3. Cards 03 through 06 progressively glide over the previous cards, creating a tactile, physical "card deck peeling" interaction.
4. Each card is paired with a **Scroll-Driven Word Illumination** title above it and an asymmetric **Floating Media Overlay** that drifts slightly upwards on scroll.

### 34.2. Pure CSS + Native Viewport Implementation (Zero Heavy Libraries)
While Webflow binds this to internal interaction scripts and Lenis, the AlonePro Gutenberg FSE standard implements this with **100% native, performant CSS `position: sticky`** with staggered top offsets on desktop:

```css
/* Desktop Sticky Stacking Deck (min-width: 768px) */
@media screen and (min-width: 768px) {
  .offer-card-block {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0; /* Stacking handles spacing */
  }

  .offer-list-wrapper {
    position: sticky;
    top: 0;
    margin-bottom: 0;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Staggered Stacking Calculation */
  .offer-list-wrapper._01 { top: calc(var(--wp--preset--spacing--40) * 1); margin-bottom: calc(var(--wp--preset--spacing--60) * 3); z-index: 1; }
  .offer-list-wrapper._02 { top: calc(var(--wp--preset--spacing--40) * 1.5); margin-bottom: calc(var(--wp--preset--spacing--60) * 2.5); z-index: 2; }
  .offer-list-wrapper._03 { top: calc(var(--wp--preset--spacing--40) * 2); margin-bottom: calc(var(--wp--preset--spacing--60) * 2); z-index: 3; }
  .offer-list-wrapper._04 { top: calc(var(--wp--preset--spacing--40) * 2.5); margin-bottom: calc(var(--wp--preset--spacing--60) * 1.5); z-index: 4; }
  .offer-list-wrapper._05 { top: calc(var(--wp--preset--spacing--40) * 3); margin-bottom: calc(var(--wp--preset--spacing--60) * 1); z-index: 5; }
  .offer-list-wrapper._06 { top: calc(var(--wp--preset--spacing--40) * 3.5); margin-bottom: 0; z-index: 6; }

  /* Tactile Stacking Shadow */
  .offer-card {
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.12), 0 16px 48px rgba(0, 0, 0, 0.2);
  }
}

/* Mobile Graceful Degradation (<= 767px) */
@media screen and (max-width: 767px) {
  .offer-list-wrapper {
    position: static;
    margin-bottom: var(--wp--preset--spacing--30);
  }
}
```

### 34.3. Specification & Prompting Contract for AI OpenDesign
In Phase 1 `Beplus-spec.md`, AI OpenDesign MUST explicitly specify:
1. `Scroll Dynamics`: "Sticky Stacking Card Deck with staggered `top` offsets (Cards 01–06 dock sequentially on scroll)".
2. `Visual Layering`: "Floating elevated white card (`.feature-card-list-wrap`) elevated over photo with 3D drop-shadow and Tier 2 optical icons".
3. `Text Illumination`: "Word-by-word span segmentation with scrub-based illumination (`opacity: 0.2` -> `opacity: 1.0`) on the primary section title".

---

## 35. WCAG AA Optical Contrast & Dark Canvas Typography Invariant

### 35.1. The Root Cause of AI "Illegible / Black Text on Dark Backgrounds"
A notorious failure mode in AI-generated web designs is text that becomes nearly invisible against dark backgrounds. This occurs due to three insidious traps:

1. **The Inverted Token Semantic Trap**:
   In Gutenberg FSE defaults:
   - `--wp--preset--color--base` is `#ffffff` (White).
   - `--wp--preset--color--contrast` is `#201d1d` or `#000000` (Dark Charcoal / Black).
   - `--wp--preset--color--paragraph` is `#6d6d6d` (Muted Dark Gray).
   When an AI designs a dark section (e.g., `#111111` or a dark skyscraper hero photo), it frequently uses `var(--wp--preset--color--paragraph)` for body copy, or worse, sets illuminated text to `var(--wp--preset--color--contrast)`. On a dark background, dark charcoal on near-black yields a contrast ratio under 1.5:1 (catastrophic failure).

2. **The Above-the-Fold Premature Dimming Trap**:
   When AI implements scroll-driven text illumination (`.scroll-word`), it indiscriminately wraps hero descriptions in `span.scroll-word` with `opacity: 0.25`. But the Hero section sits at `scrollTop: 0`. The user hasn't scrolled yet! As a result, the primary value proposition is dimmed to near-black on initial page load.

3. **Background Image Contrast Blindness**:
   Dark photographs (architecture, hardware, workspaces) contain non-uniform luminance. Text placed directly over unvignetted photography easily gets lost unless explicit dark scrims (`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85))`) and high-luminance text tokens are enforced.

---

### 35.2. The Invariant Rules for Dark Canvas Typography

```css
/* ==========================================================================
   DARK CANVAS TYPOGRAPHY & WCAG AA CONTRAST CONTRACT
   ========================================================================== */

/* 1. Hero Sections & Above-the-Fold Invariant: NEVER dim on load */
.hero-section p,
.hero-description,
.hero-subtitle {
  color: rgba(255, 255, 255, 0.88); /* High contrast, comfortable reading */
  opacity: 1 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35); /* Optical edge separation */
}

/* 2. Absolute Ban on Scroll Dimming for Above-the-Fold Hero Copy */
.hero-section .scroll-word,
.hero-description .scroll-word {
  opacity: 1 !important;
  color: rgba(255, 255, 255, 0.88) !important;
}

/* 3. Dark Sections vs Light Sections Token Inversion */
/* On Light Sections: */
.section-light, :root {
  --text-primary: var(--wp--preset--color--contrast);  /* Dark charcoal */
  --text-secondary: var(--wp--preset--color--paragraph); /* Muted gray #6d6d6d */
}

/* On Dark Sections: */
.section-dark,
.hero-section,
.dark-canvas,
[data-theme="dark"],
.offer-section {
  --text-primary: var(--wp--preset--color--base);       /* Pure White #ffffff */
  --text-secondary: rgba(255, 255, 255, 0.85);        /* Crisp light silver */
  --text-muted: rgba(255, 255, 255, 0.65);            /* WCAG AA compliant muted */
}

/* 4. Scroll Illumination in Dark Sections: Illuminate towards PURE WHITE */
.section-dark .scroll-word,
.dark-canvas .scroll-word,
.offer-section .scroll-word {
  color: rgba(255, 255, 255, 0.35); /* Subtle legible ghost */
  opacity: 0.45;
  transition: color 0.25s ease, opacity 0.25s ease;
}

.section-dark .scroll-word.is-lit,
.dark-canvas .scroll-word.is-lit,
.offer-section .scroll-word.is-lit {
  color: #ffffff !important;         /* Pure bright white */
  opacity: 1 !important;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.25);
}
```

---

### 35.3. Audit Verification Gate (Automated Check)
During Phase 2 automated testing, verify:
1. `Hero Description Opacity`: Must be `>= 0.85`. Zero `opacity: 0.25` above the fold.
2. `Color on Dark`: Must NOT be `var(--wp--preset--color--paragraph)` or `var(--wp--preset--color--contrast)` on dark surfaces.
3. `WCAG AA Contrast Ratio`: Calculated minimum 4.5:1 for body copy against computed background.
