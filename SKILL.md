---
name: beplus-spec-remake
description: Autonomous 2-stage specification-driven clone & transformation engine for OpenDesign and AlonePro WordPress Gutenberg FSE themes. Bắt buộc duyệt spec trước khi build, cam kết 100% Gutenberg FSE tokens var(--wp--preset--*), 0 manual coding, 0 CSS đè, 0 !important, 0 clamp ngoài :root.
category: web-design
triggers:
  - "beplus-spec-remake"
  - "beplus spec remake"
  - "spec remake"
  - "@beplus-spec-remake"
---

# Beplus Spec Remake Engine (v2.0)

Autonomous 2-stage specification-driven clone & transformation engine for OpenDesign and AlonePro WordPress Gutenberg FSE themes.

## Linked References & Tools
- `references/gutenberg-token-contract.md`: Authoritative FSE design tokens, fluid clamps, and theme.json contracts.
- `references/forensic-inspection-patterns.md`: Comprehensive 35-chapter forensic manual covering specificity traps, bento alignment, frosted glass badges, slider carousels, mobile navigation drawers, scroll text illumination, split cards with floating overlays, workspace scratchpad isolation, optical icon hierarchy (curing tiny icons), sticky stacking cards scroll engine, and WCAG AA dark canvas typography invariant (curing invisible dimmed text).
- `references/opendesign-api-orchestration.md`: Headless REST API automation pipeline for OpenDesign daemon (port 7456), SQLite message seeding constraints, and SSE streaming.
- `templates/clone-spec-template.md`: 100% English master architectural specification template for Phase 1 `CLONE-SPEC.md`.
- `scripts/inspect-site.mjs`: Automated CDP forensic inspection script extracting computed CSS, deep component anatomy, and motion triggers.

## Absolute Core Mandates (Cốt Lõi Bắt Buộc)

1. **2-Stage Workflow (Spec Trước, Build Sau)**:
   - **Phase 1: Forensic Architectural Specification**: Deeply audits the target site using Chrome DevTools Protocol (CDP port 9222) and computed CSS forensics. Produces `CLONE-SPEC.md` covering all 12 sections with zero placeholders and zero guessing. **STOPS and requests human approval.**
   - **Phase 2: Spec-Driven Build & In-Place Refactoring**: Upon human approval, builds/refactors the production deliverables (`index.html`, `main.css`).
2. **Zero Manual Coding**: Mọi thao tác từ bóc tách, sinh đặc tả, build mã nguồn, chạy QA và tinh chỉnh (refine) đều phải được tự động hóa hoàn toàn qua agent loop. Không chỉnh sửa code trực tiếp bằng tay.
3. **100% Gutenberg FSE Token Compliance**: 100% màu sắc, typography và spacing trong `main.css` phải sử dụng biến preset FSE (`var(--wp--preset--*)`). Tuyệt đối CẤM hardcoded hex colors, CẤM pixel font-sizes trên selector, CẤM `clamp()` ngoài `:root`.
4. **Zero CSS Overrides & Zero `!important`**: CẤM viết CSS đè dạng selector con (như `.process-heading h2`, `.cta-band h2` ghi đè `font-size`). CẤM hoàn toàn `!important`.
5. **Universal Icon vs Image Disambiguation Engine**: Phân tích triệt để `<img>` và `<svg>`: bất kỳ thẻ nào có kích thước <= 64px, chứa class `icon`, `image-20px..image-45px`, đuôi `.svg`, hoặc nằm trong badge/bullet/timeline BẮT BUỘC coi là **Icon Node** và ánh xạ sang inline **Lucide SVG** (`stroke-width="1"`). Tuyệt đối CẤM thay icon bằng ảnh Unsplash!
6. **Semantic Icon Selection & Anti-Repetition Contract**: Phân tích ngữ nghĩa tiêu đề và nội dung của từng card để chọn icon Lucide tương ứng (About -> `info`, Mission -> `rocket`, Vision -> `binoculars`, Security -> `shield-check`, Analytics -> `trending-up`). Trong một grid hoặc danh sách, các card cạnh nhau CẤM dùng lặp lại cùng một icon. Màu sắc icon phải đo từ computed style gốc, CẤM đoán mò.
7. **Section Heading Dominance & Semantic Hierarchy Rule**: Tiêu đề chính của section BẮT BUỘC là `<h2>` và có font-size lớn nhất trong section (`var(--wp--preset--font-size--large)` hoặc `x-large`). Các tiêu đề card con bên trong BẮT BUỘC là `<h4>` với `var(--wp--preset--font-size--medium)`. Eyebrow là `<h6>` hoặc `.eyebrow` với `small`. Tiêu đề card CẤM bằng hoặc to hơn tiêu đề section!
8. **Equal Height Cards & Spacing Architecture**: Tất cả các card trong cùng một hàng flex/grid BẮT BUỘC có `align-items: stretch; display: flex; flex-direction: column; height: 100%;` và căn baseline nút bấm bằng `margin-top: auto;`. Lề mobile `<= 767px` bắt buộc là `16–20px`.
9. **Slider & Carousel Engineering Standards**: Mọi slider (Swiper/carousel) BẮT BUỘC có chế độ `autoplay` (delay 3.5s - 4.5s, pause on hover), các slide bắt buộc bằng chiều cao nhau (`height: 100%`). Khi hiển thị số slide thập phân (ví dụ 3.5 items trên desktop), vùng chứa phải `overflow: hidden` và có lớp phủ gradient mờ cạnh phải (`mask-image` hoặc fade overlay) để item 0.5 trông mượt mà, chủ đích.
10. **Ghost Section & Blank Content Elimination**: CẤM để section bị trắng nội dung do lỗi interaction Webflow IX2. CSS gốc bắt buộc có trạng thái hiển thị fallback (`opacity: 1; transform: none;`). Các section đảo màu (dark card trên nền sáng, light card trên nền tối) bắt buộc khai báo đồng thời cả token background và token text color. Triệt tiêu toàn bộ curtain mask (`.image-show-style`) và modal che màn hình.
11. **Total Elimination of Latin Placeholder Text**: Quét sạch 100% các đoạn text Latin giả lập ("Lorem ipsum", "Sed ut perspiciatis", "Sed acc...") từ template Webflow và viết lại thành nội dung thương mại thật sự sắc bén, đúng độ dài 1:1.
12. **100% Professional English for All Markdown & Spec Artifacts (CẤM Tiếng Việt trong MD)**: Toàn bộ các file tài liệu đặc tả markdown (`CLONE-SPEC.md`), plan contracts, bảng QA matrix (`No.`, `Section Name`, `Layout & Tokens`, `Heading Hierarchy (H2>H4)`, `Production Copy`, `Motion & Micro-Interactions`, `Assets & Lucide Icons`, `QA Verdict`), và phản hồi text của AI BẮT BUỘC 100% bằng tiếng Anh chuyên nghiệp. Tuyệt đối CẤM chèn tiếng Việt vào trong file markdown sinh ra!
13. **Scroll-Driven Text Illumination & Staggered Viewport Reveal**: 
    - **Word-by-Word Scroll Text Illumination (Scrub)**: Khi section gốc có hiệu ứng cuộn làm chữ sáng dần theo thanh cuộn (như ở *What We Offer*), BẮT BUỘC bóc tách dòng text thành các thẻ `<span class="scroll-word">`, ban đầu để mờ (`opacity: 0.25; color: var(--wp--preset--color--paragraph)`), và dùng script tính toán vị trí cuộn để bật sáng dần từng từ sang `opacity: 1; color: var(--wp--preset--color--contrast)`.
    - **Staggered Viewport Entrance**: Các card, bento item, feature boxes khi bước vào viewport BẮT BUỘC có hiệu ứng fade-up tuần tự (`opacity: 0; transform: translateY(32px)`) kích hoạt qua `IntersectionObserver` với stagger delay `calc(var(--index, 0) * 0.1s)`.
    - **Card & Arrow Micro-Interactions**: Hover vào card BẮT BUỘC có hiệu ứng nâng card (`transform: translateY(-4px)`), đổ bóng mềm, mũi tên trượt chéo `translate(3px, -3px)`, và ảnh zoom nhẹ `scale(1.04)`. CẤM để card trơ tĩnh không phản hồi!
14. **Responsive Mobile Navigation Drawer & Hamburger Toggle**: Trên màn hình mobile (`<= 767px`), CẤM làm mất thanh điều hướng. BẮT BUỘC sinh nút toggle hamburger (`<button class="menu-toggle" aria-label="Toggle navigation">` với icon Lucide `menu` / `x`) và menu drawer trượt xuống/trượt ngang chứa toàn bộ link menu chính + nút CTA!
15. **Zero-Deviation Topology Replication & Thematic Harmony Contract (CẤM biến đổi bố cục & giải thể component gốc)**:
    - AI OpenDesign tuyệt đối CẤM suy đoán hoặc tự ý vẽ lại một thiết kế generic khác xa trang gốc. BẮT BUỘC tái hiện 1:1 cấu trúc hình học và lớp phủ (layering) của từng component:
      * **Hero Architecture**: Nếu web gốc dùng floating island navbar (header nổi bo góc tách rời mép) + ảnh nền doanh nghiệp có lớp phủ tối + nút ghost viền mỏng (`border: 1px solid white; background: transparent;`), BẮT BUỘC tái hiện chính xác floating island navbar và nút ghost. CẤM đổi thành header dính phẳng thông thường!
      * **Split Cards with Floating Overlays (vd: What We Offer)**: Nếu card gốc là dạng chia đôi 50/50 (cột trái: số thứ tự `01` + tiêu đề + đoạn văn + nút; cột phải: khung ảnh + **thẻ card trắng nổi đè lên trên** chứa 3 viên thuốc tính năng có icon checkmark), BẮT BUỘC tái hiện chính xác bố cục 50/50 và thẻ nổi đè lên ảnh. CẤM giải thể thành box phẳng đơn giản!
      * **Bento Grid Contrasting Cards**: Nếu bento gốc phối hợp giữa card ảnh (`bg`), card trắng (`white`) và card tối (`black`), BẮT BUỘC giữ nguyên sự tương phản màu sắc bề mặt của từng card.
      * **Photographic Thematic Harmony**: Ảnh Unsplash được chọn BẮT BUỘC phải ăn khớp 100% với chủ đề của ảnh gốc (ví dụ: ảnh gốc là đội ngũ họp bàn quanh phòng hội thảo có bảng biểu số liệu thì ảnh Unsplash phải là doanh nghiệp họp bàn, CẤM đưa ảnh tòa nhà chọc trời hoặc ảnh không đúng ngữ cảnh).
16. **Workspace Hygiene & Scratchpad Isolation Mandate (CẤM lưu file dump thô trong project root)**:
    - Tuyệt đối CẤM tạo hoặc lưu các file HTML thô tải về (như `target.html`, `dump.html`, `raw.html`, `temp.html`) ngay trong thư mục gốc của project! OpenDesign tự động index mọi file trong project root thành deliverable hiển thị trên cây thư mục web (`/files/target.html`), gây hiểu lầm nghiêm trọng cho người dùng rằng AI chỉ copy-paste mã nguồn gốc thay vì tự thiết kế theo spec.
    - Mọi thao tác trích xuất DOM bắt buộc phải xử lý trực tiếp in-memory qua CDP port 9222 (`Runtime.evaluate`) hoặc lưu tạm ra ngoài thư mục project (như `/tmp/scratchpad/` hoặc thư mục ẩn `.cache/`) và BẮT BUỘC tự động dọn dẹp sạch sẽ (`rm -f`) trước khi kết thúc Phase 1. Thư mục project chỉ được phép chứa duy nhất các file sản phẩm chính thức (`CLONE-SPEC.md`, `index.html`, `main.css`).
17. **Optical Icon Hierarchy & Anti-Miniaturization Standard (Triệt tiêu bệnh icon nhỏ)**:
    - Bắt buộc tuân thủ 3-Tier Optical Sizing:
      * **Tier 1 (Stats/Metrics số lớn như `8,000+`)**: Squircle tile `52px × 52px`, SVG icon bên trong `28px × 28px`, `stroke-width="1.75"`.
      * **Tier 2 (Feature Capsules / Value Lists như `Strategic Planning`, `Smart Health`)**: Bắt buộc bọc trong container tile `.feature-icon-box` `38px × 38px` nền tinted nhẹ bo góc 8px, SVG icon bên trong `20px × 20px`, `stroke-width="1.75"`. Tuyệt đối CẤM thả icon trần trụi (naked unboxed SVG) trôi nổi trong khoảng trắng bên cạnh chữ bold!
      * **Tier 3 (Inline micro-affordances, button chevrons)**: SVG icon `16px × 16px`, `stroke-width="1.75"`.
    - Bỏ ép cứng `stroke-width: 1` cho các icon nhỏ dưới 24px để tránh biến icon thành sợi chỉ hairline mờ nhạt trên màn hình Retina.
18. **Sticky Stacking Cards Scroll Engine (Cơ chế cuộn xếp chồng thẻ dạng bộ bài)**:
    - Ở các section danh mục dịch vụ/tính năng nhiều card 50/50 (như *What We Offer*), trên desktop (`min-width: 768px`) BẮT BUỘC sử dụng CSS native `position: sticky; top: calc(...); margin-bottom: calc(...);` với các offset so le tăng dần (`top: 80px, 110px, 140px...`).
    - Khi người dùng cuộn trang, các card lướt lên và xếp chồng đè lên nhau như một bộ bài vật lý 3D kèm bóng đổ đa tầng. Xuống mobile (`<= 767px`) tự động duỗi thẳng `position: static` tối ưu trải nghiệm vuốt chạm.
19. **WCAG AA Optical Contrast & Dark Canvas Typography Invariant (Tuyệt đối cấm chữ đen/mờ trên nền tối)**:
    - **Above-the-Fold Premature Dimming Ban**: Hero subtext và các đoạn giới thiệu trên màn hình đầu tiên (above-the-fold) BẮT BUỘC hiển thị 100% opacity (`opacity: 1`) và độ tương phản cao (`color: rgba(255, 255, 255, 0.88)` trên nền tối). CẤM TUYỆT ĐỐI bọc thẻ `scroll-word` hoặc đặt opacity < 0.85 cho text Hero khi mới load trang!
    - **Dark Canvas Invariant**: Mọi văn bản trên nền tối (`.hero-section`, `.section-dark`, dark cards, ảnh tối) phải đạt độ tương phản tối thiểu 4.5:1 (WCAG AA). CẤM sử dụng token chữ tối (`var(--wp--preset--color--paragraph)` #6d6d6d hoặc `--wp--preset--color--contrast` #201d1d) trên nền tối. Text chính dùng `var(--wp--preset--color--base)` (#ffffff), text phụ dùng `rgba(255, 255, 255, 0.85)`.
    - **Dark Scroll Illumination**: Hiệu ứng cuộn sáng chữ (`scroll-word.is-lit`) trên nền tối BẮT BUỘC sáng lên thành màu trắng tinh (`#ffffff`), tuyệt đối CẤM chuyển thành `--contrast` (than đen).

---

## 1. PHASE 1: FORENSIC ARCHITECTURAL SPECIFICATION

The AI must create `CLONE-SPEC.md` in the project root directory.

### Mandatory Content of `CLONE-SPEC.md`:
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
   - Audit all visual nodes: differentiate Content Photos (aspect-ratios, Unsplash) vs Icon Nodes (Lucide SVG `stroke-width="1"`).
   - Card-by-card semantic icon selection based on content keywords.
   - Exact extracted computed colors and parent badge background colors.
4. **Finalized Production Text Content (Zero "Demo" & Zero Latin Text)**:
   - 100% real commercial copywriting. Zero disclaimers (`DEMO CONTENT`, `DEMO TESTIMONIALS`, `Prototype note`).
   - Zero Latin dummy text (`Sed ut perspiciatis`, `Sed acc`, `Lorem ipsum` 100% rewritten).
   - Commercial typo correction (`Real Woks` -> `Recent Works`, `Let’s Start Talk` -> `Let’s Start Talking`).
5. **Section Heading Dominance & Font Scale Matrix**:
   - Audit each section to ensure `<h2>` is the main title with largest size (`var(--wp--preset--font-size--large)`), and internal card headings are `<h4>` with `var(--wp--preset--font-size--medium)`.
6. **Slider & Carousel Specification**:
   - Autoplay configuration, equal height slide rules, fractional 3.5 peek overlay gradient fade specification.
7. **Forensic 4-Tier Motion & Physics Blueprint**:
   - On-Load / Entrance (keyframes, transform, opacity, duration, cubic-bezier, stagger).
   - On-Scroll / Viewport reveal (intersection threshold, sticky header backdrop-blur 12px).
   - On-Hover interaction (arrow 45deg rotation, card translateY(-6px) + shadow, button color shift).
   - Continuous Ambient Loops (pure CSS marquee @keyframes, duration 28s, timing linear, no jitter, no pause on hover).
   - Driving Engine & Library Integration (Pure CSS @keyframes, Swiper.js, Webflow IX2 localized runtime).
8. **Section-by-Section QA Verification Matrix**:
   - Auditing Section 1 through Section 12 individually. Only when ALL sections pass is Phase 1 complete!

---

### 1.1. Forensic Data Extraction via CDP & DOM Inspector
The AI must execute the forensic inspection script:
```bash
node scripts/inspect-site.mjs <URL_OR_LOCAL_HTML>
```
The inspector automatically connects to Chromium over **CDP port 9222** (with graceful static fallback) to measure:
- `getComputedStyle()` for headings, body text, buttons, and section bounding rects.
- Real Webflow IX2 animation timeline (`getState()`), capturing 100% real triggers and curves.
- Icon vs Image disambiguation: isolates icons (<= 64px, `.svg`, icon classes) and measures computed color, stroke, fill, and container background.
- Heading hierarchy inspection: detects if sections have `<h2>` and flags misplaced `<h2>`/`<h3>` inside cards.
- Slider/carousel detection: slide count, equal height analysis, autoplay attributes.
- Latin placeholder detection: flags `lorem`, `sed acc`, `sed ut perspiciatis` for mandatory rewriting.

---

### 1.2. Global Design System Construction

#### A. Typography Font Assignment
- Measured heading font stack -> `--nextora-font-heading`.
- Measured body font stack -> `--nextora-font-body`.

#### B. Gutenberg FSE Strict 8-Variable Palette
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
- Typography: 7 fluid viewport clamps (`small`, `base`, `medium`, `medium-plus`, `large`, `x-large`, `xx-large`).
- Spacing: 6 fluid viewport clamps (`spacing-10` through `spacing-60`).

#### D. Heading Elements Contract (theme.json)
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

#### E. Strict Heading Dominance Rule
- **Section Heading**: BẮT BUỘC là `<h2>` với font size `var(--wp--preset--font-size--large)`. Đây là tiêu đề to nhất trong section.
- **Card / Sub-Item Heading**: BẮT BUỘC là `<h4>` với font size `var(--wp--preset--font-size--medium)`.
- **Eyebrow / Kicker**: BẮT BUỘC là `<h6>` hoặc `.eyebrow` với font size `var(--wp--preset--font-size--small)` và uppercase.
- **Quy tắc bất biến**: Tiêu đề card CẤM sử dụng `<h2>` và CẤM có cỡ chữ lớn hơn hoặc bằng tiêu đề chính của section.

---

### 1.3. Section-by-Section Decomposition Protocol

For EVERY section from Header to Footer, document:
1. **Exact Block Geometry & Placement**: Max-width (1280px), padding-block (`var(--wp--preset--spacing--50)`), gap tokens. Card grids MUST have `align-items: stretch;` and cards MUST have `display: flex; flex-direction: column; height: 100%;`. Mobile safe margins: `<=767px` là `16-20px`.
2. **Finalized Production Text Content**: Clean all commercial typos and eliminate all Latin dummy copy ("Sed acc...", "Lorem ipsum").
3. **Universal Icon vs Image Mapping**:
   - Differentiate Content Photos vs Icon Nodes.
   - Map Content Photos to Unsplash preserving aspect ratios.
   - Map Icon Nodes to inline Lucide SVGs (`stroke-width="1"`) with context-aware semantic matching and exact computed color tokens.
4. **Slider / Carousel Standards**:
   - Autoplay: delay 4000ms, pause on hover.
   - Equal height slides.
   - Fractional slides (e.g. 3.5 items on desktop): container `overflow: hidden;` with right-edge gradient overlay fade.
5. **4-Tier Motion Choreography Blueprint**: On-load, scroll-triggered, hover, and ambient continuous loop.
6. **QA Acceptance Contract**: Explicit verification table with `PASS` verdict.

---

### 1.4. Human Review Checkpoint (Stop & Confirm)
After writing `CLONE-SPEC.md`, the AI MUST STOP and print the executive summary:
```markdown
### 📋 Specification Complete: Ready for Your Review
I have completed the forensic architectural specification `CLONE-SPEC.md` based on real measured data from [Target Site A].

- **Brand & Niche**: [Niche] | [Brand Name]
- **Heading Font**: `var(--nextora-font-heading)` = [Font Name]
- **Gutenberg Palette**: Base: [Hex] | Contrast: [Hex] | Primary: [Hex] | Accent: #F59E0B
- **Heading Hierarchy**: Section Titles = H2 (large) | Card Sub-headings = H4 (medium)
- **Sections Audited**: [N] sections forensically mapped from Header to Footer.
- **Asset & Icon Mappings**: [N] Unsplash real photos | [N] Lucide stroke-width=1 semantic icons.
- **Slider Configuration**: Autoplay 4s | Equal Heights | 3.5 slides with Right-Edge Gradient Fade.
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
- **PROHIBITION OF HEADING OVERRIDES**: Direct child or descendant selector overrides on headings (e.g. `.process-heading h2`, `.cta-band h2`) modifying `font-size` are STRICTLY FORBIDDEN. Heading font-sizes must strictly follow the `theme.json` contract (`h1` -> `var(--wp--preset--font-size--xx-large)`, `h2` -> `var(--wp--preset--font-size--large)`, `h3` -> `var(--wp--preset--font-size--medium-plus)`, `h4` -> `var(--wp--preset--font-size--medium)`).
- **100% FSE PRESET CONSUMPTION**:
  - Font sizes -> `var(--wp--preset--font-size--*)`
  - Section paddings -> `padding-block: var(--wp--preset--spacing--50)` or `spacing-60`
  - Card paddings & gaps -> `var(--wp--preset--spacing--30)` or `spacing-20`
  - Title gaps -> `margin-bottom: var(--wp--preset--spacing--30)`
  - Colors & backgrounds -> `var(--wp--preset--color--*)`
- **ABSOLUTE BAN ON RAW PIXEL FONT SIZES ON UTILITY CLASSES (SPECIFICITY TRAP)**:
  * In Webflow, classes like `._24px-link`, `._24px-text`, `._18px-text`, `._30px-title`, `._44px-text` contain raw `font-size: 24px; line-height: 36px;` that override semantic `h1`–`h6` tags due to class specificity (`0-1-0` vs `0-0-1`).
  * In Phase 2: All such utility classes MUST either have their hardcoded pixel values replaced with `var(--wp--preset--font-size--*)` (e.g. `._24px-link { font-size: var(--wp--preset--font-size--medium); }`) OR have `font-size` stripped entirely so the semantic heading tag (`h1`–`h6`) controls the typography from `theme.json`!
- **ZERO `!important`**: Every `!important` rule must be cleanly excised.
- **EQUAL HEIGHT CARDS & BENTO GRID GEOMETRY**:
  ```css
  .grid-container, .features-grid, .services-list {
    display: grid;
    align-items: stretch;
  }
  .card, .feature-card, .service-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .card .card-footer, .card .btn, .card .button {
    margin-top: auto; /* Aligns all buttons at the exact same vertical baseline */
  }
  ```
- **BENTO ASYMMETRIC GRID ALIGNMENT**:
  * When a stacked 2-card column (`.bento-left`) sits beside a tall media card (`.rounded-photo.portrait`), the tall media card MUST declare `height: 100%; object-fit: cover;` so its bottom edge lines up exactly 1:1 with the stacked column.
  * The vertical gap between stacked bento items must strictly use `var(--wp--preset--spacing--20)` or `spacing-30`.
- **FLOATING FROSTED-GLASS ICON BADGES (`.card-glass-icon`)**:
  * Badges overlapping the boundary between card image and body:
    ```css
    .card-glass-icon {
      position: absolute;
      bottom: 0;
      left: var(--wp--preset--spacing--20);
      transform: translateY(50%);
      z-index: 2;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      backdrop-filter: blur(8px);
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-body {
      padding-top: calc(var(--wp--preset--spacing--30) + 16px);
    }
    ```
- **SLIDER / CAROUSEL ENGINEERING (Autoplay & 3.5 Slides Fade)**:
  ```css
  .swiper-wrapper {
    align-items: stretch;
  }
  .swiper-slide {
    height: auto;
    display: flex;
    flex-direction: column;
  }
  .slider-wrapper {
    position: relative;
    overflow: hidden;
  }
  .slider-wrapper::after {
    content: "";
    position: absolute;
    top: 0; right: 0; bottom: 0;
    width: 80px;
    background: linear-gradient(to right, transparent, var(--wp--preset--color--base));
    pointer-events: none;
    z-index: 5;
  }
  ```
- **MOBILE CLEARANCE & CONTAINER MARGINS (`@media (max-width: 767px)`)**:
  * **Hero Top Clearance**: Whenever a navbar is `fixed`, `sticky`, or `absolute`, `.hero` on mobile MUST specify `padding-top: calc(var(--wp--preset--spacing--60) + 40px);` (or ~100px+) so the navbar never overlaps the top line of the H1 headline.
  * **Safe Margin Mandate**: Mobile container margins MUST strictly be `16–20px` (`.container { width: min(var(--container-max-width), calc(100% - var(--wp--preset--spacing--40))); margin-inline: auto; }`).
  * **Mobile Header Navigation & Hamburger Menu Contract**: On mobile viewports (`<= 767px`), global site navigation MUST NOT be omitted or displaced by an oversized desktop CTA button. The header MUST always render an accessible hamburger menu toggle (`button.mobile-menu-toggle` with inline Lucide `menu` / `x` SVG, `stroke-width="1"`, touch target `>= 44x44px`) connected to an interactive slide-out drawer or overlay. Desktop navigation links collapse into the drawer, and redundant header CTA buttons are either simplified or housed inside the menu drawer.
  * **Header Streamlining**: Auxiliary pills and secondary text MUST be hidden on mobile (`display: none;`).
- **NATIVE PRODUCTION JAVASCRIPT & MOTION ENGINE (`index.html`)**:
  Phase 2 deliverables MUST include a self-contained, high-performance vanilla JavaScript module in `index.html` executing:
  1. **`initScrollIllumination()`**: Calculates scroll progress through sections with text highlights (e.g. *What We Offer*), sequentially illuminating `<span class="scroll-word">` from `opacity: 0.25` to `opacity: 1.0; color: var(--wp--preset--color--contrast);`.
  2. **`initScrollEntrance()`**: Attaches a single shared `IntersectionObserver` to all `[data-reveal]` elements (cards, bento blocks, statistics, timeline nodes) to trigger smooth staggered fade-up (`opacity: 1; transform: translateY(0);`).
  3. **`initMobileMenu()`**: Implements clean toggle state between `.menu-toggle` and `.mobile-menu-drawer.is-open` with `aria-expanded` synchronization and body scroll lock.
  4. **`initTestimonialSlider()`**: Powers smooth auto-cycling for testimonials (4-second interval, pausing gracefully on pointer hover, with manual arrow controls).
  5. **`initBackToTop()`**: Provides smooth window scrolling to top when clicking the footer chevron icon.

---

### 2.2. Critical UI Traps & Runtime Fixes
1. **Ghost Section & Blank Content Elimination**:
   - All animated elements MUST have default visible state in CSS: `opacity: 1; transform: none;`. Never leave elements at `opacity: 0` waiting for JS triggers.
   - Inverted sections (dark cards or light cards) MUST explicitly declare both `background-color` AND `color` tokens (`--wp--preset--color--surface` + `--wp--preset--color--contrast`) to prevent white-on-white or black-on-black text collision.
2. **Universal Optical Icon Hierarchy & Anti-Miniaturization**:
   - Any `<img>` <= 64px or SVG icon MUST be replaced with inline Lucide SVG.
   - **MANDATORY 3-TIER OPTICAL SIZING & CONTAINER BOX ARCHITECTURE**:
     * **Tier 1 (Stat & Metric Big Numbers - e.g. `8,000+`, `$5B+`)**: Squircle tile container `52px × 52px` (or `56px`), SVG icon `28px × 28px` (min 26px), `stroke-width="1.75"` (or `2.0`). Must optically balance the heavy weight of bold numbers.
     * **Tier 2 (Feature Capsules & Value Lists - e.g. `Strategic Planning`, `Smart Health`)**: Rounded square/circle tile container `.feature-icon-box` `38px × 38px` (or `42px`), SVG icon `20px × 20px` (min 20px), `stroke-width="1.75"`. NEVER leave naked, unboxed SVG icons floating loosely in empty whitespace next to bold typography!
     * **Tier 3 (Inline Micro-Affordances - Button chevrons, badges)**: SVG icon `16px × 16px`, `stroke-width="1.75"`.
   - Anti-repetition rule: no consecutive identical icons in the same section.
   - Icon colors must match extracted computed color tokens. Review stars MUST be `#F59E0B`.
3. **Total Elimination of Latin Placeholder Text**:
   - 100% replace all Latin dummy copy (`Sed acc...`, `Sed ut perspiciatis`, `Lorem ipsum`) with natural commercial copy.
4. **Button Deduplication & Contrast**:
   - Strip `.is-text-absolute` duplicate text blocks.
   - Pill buttons on dark themes (`.white-button`) MUST explicitly declare `color: var(--wp--preset--color--base);` (black) to prevent inheriting white text from global anchor rules.
5. **Webflow Curtain/Overlay Elimination**:
   - Strip `data-w-id` from `.image-show-style` and enforce `.image-show-style, .bg-column-mask, .bg-color-column { display: none; }` in `main.css`.
6. **Webflow Watermark Badge Elimination (`.w-webflow-badge`)**:
   - Declare `a.w-webflow-badge, .w-webflow-badge { display: none; }` at the **VERY END** of `main.css` with tag-qualified specificity.
7. **Semantic Headings Upgrade (`div.heading---h*` -> `<h1-h6>`)**:
   - Transform heading `<div>` wrappers into real semantic elements (`<h2 class="heading---h2">`, `<h4 class="heading---h4">`). Ensure section headings are `<h2>` and internal card headings are `<h4>`.

---

### 2.3. OpenDesign Engine Orchestration & Production Gates
- **Two-Stage State Machine Compliance**: In `request` stage, emit `<open-design-plan-contract>` and `<open-design-runtime-state>` (`outcome: 'completed'`). In `production` stage, directly write deliverables (`index.html`, `main.css`). Emitting another plan contract in production stage triggers `od_next_protocol_stage_mismatch`.
- **Headless API Automation Pipeline (Preferred over Flaky Browser Clicks)**:
  Instead of fragile CDP UI clicks that can get blocked by onboarding dialogs or feedback modals, automate OpenDesign directly via its daemon API (`http://127.0.0.1:7456`):
  1. `POST /api/projects`: `{ id: UUID, name: "...", skillId: "beplus-spec-remake" }`.
  2. `PUT /api/projects/:id/conversations/:cid/messages/:userMsgId`: `{ id: userMsgId, role: "user", content: prompt, position: 0 }`.
  3. `PUT /api/projects/:id/conversations/:cid/messages/:asstMsgId`: `{ id: asstMsgId, role: "assistant", content: "", position: 1, runStatus: "queued" }`. **CRITICAL SQLITE CONSTRAINT**: `content` and `position` are strictly `NOT NULL` in SQLite. Omitting `content: ""` causes an HTTP 500 error (`NOT NULL constraint failed: messages.content`).
  4. `POST /api/chat`: `{ projectId, conversationId, assistantMessageId, message: prompt, userPrompt: prompt, skillId: "beplus-spec-remake", agentId: "opencode", clientType: "web" }`. **CRITICAL PITFALL**: The daemon validates `message !== 'string' || !message.trim()`. Passing `userPrompt` without `message: prompt` fails immediately with `BAD_REQUEST: message required`.
  5. The response is an SSE event stream (`text/event-stream`). Monitor events or inspect `/var/lib/docker/volumes/open-design_open_design_data/_data/runs/<run_id>/state.json`.
- **API Project Creation Contract (`POST /api/projects`)**: Include explicit UUID `id` AND `skillId: "beplus-spec-remake"`.
- **Docker Container Permissions Guard**: Ensure `/app/skills/` has `chmod -R a+rX` and `chown -R open-design:open-design` so container UID 1001 never encounters `EACCES`.
- **CDP Native Input Dispatching (Fallback UI Path)**: When submitting prompts to OpenDesign via CDP port 9222, focus `[data-testid="chat-composer-input"]`, dispatch `Input.insertText` to synchronize React/Lexical state, and dispatch native click on `[data-testid="chat-send"]`. If routed to `/files/index.html`, navigate back to `/conversations/<id>` first. If an in-app feedback modal appears (`We'd love your feedback — help improve OpenDesign`), dismiss it immediately by clicking the close button (`×` / `button[aria-label="Close"]`) so it does not block CDP interactions or screenshot captures.
- **Timeout & Context Window Guard**: If OpenCode experiences `ContextOverflowError` (>1M tokens), purge the bloated session record in `agent_sessions` (`DELETE FROM agent_sessions WHERE conversation_id = ?;` in `app.sqlite`).

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

# 7. Optical Icon Hierarchy & AI sparkle ban
if re.search(r"sparkles", html, re.I):
    errors.append("ICON DEFECT: AI sparkle icons are strictly prohibited!")

# Check for miniaturized naked icons (icons <= 16px next to headings without container box)
if re.search(r'<div class=[\"\']capsule-content[\"\']>[\s\S]*?<strong>[\s\S]*?</div>', html):
    if '.feature-icon-box' not in css and 'class="feature-icon-box"' not in html:
        errors.append("ICON DEFECT: Feature capsules MUST use .feature-icon-box container tiles to prevent miniaturized icons!")

# 8. Template typos & Latin placeholder detection
for typo in ["Real Woks", "Qoute", "Recants Article"]:
    if typo in html:
        errors.append(f"COPY DEFECT: Found uncorrected template typo: {typo}")

if re.search(r"\b(lorem\s+ipsum|sed\s+ut\s+perspiciatis|sed\s+acc|dolor\s+sit\s+amet|consectetur\s+adipiscing)\b", html, re.I):
    errors.append("COPY DEFECT: Found Latin placeholder text ('Lorem ipsum' / 'Sed acc...') in HTML! Must replace with 100% real commercial copy.")

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
if re.search(r"\.[a-zA-Z0-9_-]+\s+(?:h1|h2|h3|h4)\s*\{[^}]*font-size", css):
    errors.append("OVERRIDE DEFECT: Found selector overriding heading font-size! Headings must strictly follow global theme.json tokens.")

# 12. Section Heading Dominance Check (h2 section title vs h4 card titles)
sections = soup.find_all(["section", "div"], class_=re.compile(r"section|wrapper|container", re.I))
for sec in sections:
    h2_tags = sec.find_all("h2")
    # If a section contains multiple cards, ensure card titles are not h2
    cards = sec.find_all(["div", "article"], class_=re.compile(r"card|item|step|feature", re.I))
    if len(cards) >= 2:
        for card in cards:
            if card.find("h2"):
                errors.append(f"HEADING HIERARCHY DEFECT: Card in section contains <h2>! Card titles MUST be <h4> with medium font-size.")
                break

# 13. Absolute Prohibition of Raw Pixel Font Sizes in CSS Classes (Specificity Trap)
raw_pixel_font_sizes = re.findall(r"\bfont-size:\s*\d+px", css_without_root)
if raw_pixel_font_sizes:
    errors.append(f"PIXEL DEFECT: Found {len(raw_pixel_font_sizes)} hardcoded pixel font-size declarations (e.g. '{raw_pixel_font_sizes[0]}') in CSS outside :root! All font-sizes must consume var(--wp--preset--font-size--*).")

# 14. Prohibition of Duplicate Card Titles (Anti-Duplication Contract)
card_titles = [c.get_text(strip=True) for c in soup.find_all(["h3", "h4", "h5", "div"], class_=re.compile(r"card.*title|card.*heading|text---bold", re.I)) if len(c.get_text(strip=True)) > 5]
seen_titles = {}
for t in card_titles:
    seen_titles[t] = seen_titles.get(t, 0) + 1
duplicates = [t for t, count in seen_titles.items() if count > 1]
if duplicates:
    errors.append(f"DUPLICATE CONTENT DEFECT: Found duplicated card titles: {duplicates}! Every card must have a unique commercial headline.")

# 15. 100% English Markdown Artifacts Audit
if os.path.exists("CLONE-SPEC.md"):
    spec_content = open("CLONE-SPEC.md").read()
    vn_terms = re.findall(r"\b(STT|Tên Section|Bố cục|Nội dung|Chuyển động|Hình ảnh|Tiêu chí đối soát|Thực tế kiểm định|Kết luận|Bảng tổng duyệt)\b", spec_content, re.I)
    if vn_terms:
        errors.append(f"LANGUAGE DEFECT: Found Vietnamese terms ({set(vn_terms)}) in CLONE-SPEC.md! All markdown deliverables MUST be 100% English.")

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

The master source code, inspection scripts, templates, and reference manuals for `beplus-spec-remake` are version-controlled in a private GitHub repository:
- **Repository**: `https://github.com/ducdung196qtr/beplus-spec-remake.git` (Public)
- **Local Directory**: `/root/.hermes/skills/web-design/beplus-spec-remake`
- **Docker Mount/Sync**: `/app/skills/beplus-spec-remake` inside container `open-design`
- **Sync Command**:
  ```bash
  docker cp /root/.hermes/skills/web-design/beplus-spec-remake/. open-design:/app/skills/beplus-spec-remake/
  docker exec -u 0 open-design chown -R open-design:open-design /app/skills/beplus-spec-remake
  docker exec -u 0 open-design chmod -R a+rX /app/skills/beplus-spec-remake
  ```
- **Git Push/Rollback Protocol**: After major updates or before experimental modifications, commit and push to `origin main` (`git push origin main`) to ensure clean rollback capability.
