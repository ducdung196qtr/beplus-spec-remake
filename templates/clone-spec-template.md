# ARCHITECTURAL DESIGN SPECIFICATION: [TARGET_SITE_A_URL]

> **Master Forensic Architecture & Implementation Blueprint for WordPress Gutenberg FSE Reconstruction**  
> *MANDATE: Every parameter, coordinate, font clamp, hex token, text string, animation physics curve, and asset mapping in this document is derived from live Chrome DevTools Protocol (CDP port 9222) and computed CSS forensics. GUESSING, ESTIMATING, OR USING "PENDING" PLACEHOLDERS IS STRICTLY PROHIBITED.*

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

### 1.4. Mandatory FSE Preset Binding Rule (Zero Clamps Outside :root, Zero Heading Overrides)
Mọi selector trong CSS sản xuất BẮT BUỘC phải sử dụng các biến preset FSE:
- `font-size`: `var(--wp--preset--font-size--*)` (`small`, `base`, `medium`, `medium-plus`, `large`, `x-large`, `xx-large`). Tuyệt đối CẤM viết `clamp(...)` hoặc `px`/`rem` trực tiếp trên các selector thành phần.
- `margin` / `padding` / `gap`: `var(--wp--preset--spacing--10...60)`.
- `color` / `background`: `var(--wp--preset--color--*)`.
- **CẤM CSS đè (Heading Overrides)**: Tiêu đề `h1`–`h6` phải tuân theo theme contract toàn cục, cấm dùng selector cha (như `.process-heading h2`, `.cta-band h2`, v.v.) để ghi đè `font-size`.

### 1.5. 100% Structural Topology Fidelity Contract (Anti-Hallucination)
Tuyệt đối CẤM AI tự ý đơn giản hóa cấu trúc hoặc chuyển đổi section sang dạng grid chung chung. Bắt buộc tuân thủ đúng 100% topology của Webflow gốc:
- **Services**: BẮT BUỘC là **danh sách 4 hàng ngang full-width (`.service-row`)** với số thứ tự `01`–`04`, tiêu đề lớn, đường kẻ hairline ngang và nút mũi tên tròn `↗` bên phải. *CẤM chuyển thành lưới hộp 2x2 gắn ảnh.*
- **Working Process**: BẮT BUỘC là **layout 2 cột (`.process-split`)**: cột trái cố định (sticky) gồm tiêu đề + nút "Start Projects"; cột phải gồm các thẻ card bo góc tròn lớn (`01`, `02`, `03`) có số thứ tự chìm và icon drafting. *CẤM chuyển thành lưới 3 cột bằng phẳng.*
- **Portfolio**: BẮT BUỘC là **lưới 2 cột các thẻ card bo góc tròn lớn (`border-radius: 20px`)**, có dải gradient tối ở đáy ảnh hiển thị metadata dạng chấm `Web Development • August 23, 2025` và tiêu đề đặt ngay dưới ảnh.
- **Testimonials**: BẮT BUỘC là **slider multi-card tràn viền**, mỗi card có 5 sao vàng `#F59E0B`, trích dẫn chi tiết, đường kẻ dotted ngang và avatar chân dung tròn cùng tên + chức danh (`Alisa Olivia, CTO at Ritovex`). *CẤM chuyển thành lưới tĩnh 4 hộp với chữ cái viết tắt.*

---

## 2. Forensic Section-by-Section Architectural Specifications

*(Repeat this comprehensive structure for EVERY section: Header, Hero, Partner Ticker, About Us & Metrics, Services, Portfolio, Working Process, Specialty Ticker, Testimonials, CTA, Blog, Footer)*

### Section [N]: [SECTION_NAME]

#### A. Layout Topology & Spatial Geometry
- **Container Architecture**: Max-width `1280px`, centered, padding-inline `var(--wp--preset--spacing--20)` (mobile <=767px: `16-20px`).
- **Padding Block**: `var(--wp--preset--spacing--50)` top, `var(--wp--preset--spacing--50)` bottom.
- **Grid / Flex Topology**: [e.g. 2-column asymmetric grid: 52% left content / 48% right media, column-gap: `var(--wp--preset--spacing--30)`].
- **Responsive Stacking**: Stacks vertically on mobile/tablet (<=991px), 100% full width, gap `var(--wp--preset--spacing--20)`.

#### B. Finalized Production Copywriting (Zero Placeholders, 100% Genuine Commercial Copy)
- **STRICT PROHIBITION**: CẤM tuyệt đối chèn các tag, badge hoặc disclaimer như `DEMO CONTENT`, `DEMO TESTIMONIALS`, `DEMO PORTFOLIO`, `Demo visual`, `Demo contact`, `Prototype note`.
- **Nội dung thương mại thật**: Viết copy tự nhiên, đầy đủ, sắc sảo cho agency sáng tạo cao cấp. Số liệu thống kê thật, case study thật, testimonial thật có tên và chức danh cụ thể.
- **Eyebrow / Badge (H6)**: `[EXACT_POLISHED_EYEBROW_TEXT]`
- **Primary Title (H1/H2)**: `[EXACT_POLISHED_HEADLINE_TEXT]` *(Commercial typos like "Real Woks", "Recants Article", "Let’s Start Talk" cleaned)*
- **Paragraph Description**: `[EXACT_POLISHED_BODY_COPY]`
- **Primary CTA Button**: Label: `[EXACT_BUTTON_TEXT]`, Target: `[TARGET_URL]`, Style: Solid primary background.
- **Secondary CTA Button**: Label: `[EXACT_SECONDARY_BUTTON_TEXT]`, Target: `[TARGET_URL]`.
- **Card Items & Static Metrics**:
  1. Card 1: Title `[TITLE]`, Description `[DESC]`, Metric `[STATIC_CLEAN_METRIC, e.g. 250+]`
  2. Card 2: Title `[TITLE]`, Description `[DESC]`, Metric `[STATIC_CLEAN_METRIC, e.g. 12+]`
  3. Card 3: Title `[TITLE]`, Description `[DESC]`, Metric `[STATIC_CLEAN_METRIC, e.g. 20+]`
  4. Card 4: Title `[TITLE]`, Description `[DESC]`, Metric `[STATIC_CLEAN_METRIC, e.g. 5K+]`

#### C. Forensic 4-Tier Motion & Animation Blueprint (CDP & IX2 Measured)
- **Tier 1: On-Load / Entrance Animation**:
  - Trigger: `DOMContentLoaded`
  - Target: Eyebrow badge, Title, Subtitle, CTA buttons (staggered entrance)
  - Animated Properties: `opacity: 0 -> 1; transform: translateY(24px) -> translateY(0);`
  - Duration & Easing: `0.65s`, `cubic-bezier(0.16, 1, 0.3, 1)`, stagger delay `0.1s` per item.
- **Tier 2: Scroll-Triggered Animation**:
  - Trigger: Viewport Intersection (`threshold: 0.15`)
  - Target: Section containers and cards
  - Transition: Class `.in-view` reveals content smoothly with `opacity: 1; transform: none;`.
  - Sticky / Scroll: Header transitions to `backdrop-filter: blur(12px); background: rgba(255,255,255,0.85);` when scrolled > 50px.
- **Tier 3: Hover & Interactive Feedback**:
  - Target: Cards, Action Buttons, Arrow Glyphs
  - Card Hover: `transform: translateY(-6px); box-shadow: 0 12px 30px rgba(0,0,0,0.08); transition: all 0.3s ease;`
  - Button Hover: Background transitions `--wp--preset--color--primary -> --wp--preset--color--secondary` in `0.2s ease`.
  - Icon Hover: Lucide arrow rotates 45° and shifts 4px up-right (`transform: translate(4px, -4px) rotate(45deg);`).
- **Tier 4: Continuous Ambient Loops**:
  - Target: Marquees, tickers, and looping rails
  - Keyframes: `@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`
  - Duration & Timing: `28s linear infinite`, seamless without jitter, continuous rotation (no pause on hover).
- **Tier 5: Driving Engine & Library Integration**:
  - Engine: [Pure CSS @keyframes / Webflow IX2 localized runtime `assets/js/webflow.main.js` / Swiper.js `assets/js/swiper.min.js`].
  - Initialization: Explicit DOM selector initialization.

#### D. Asset & Icon Specifications
- **Photography (100% Unsplash Real Photos)**:
  - Asset 1: URL `https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=1200&q=80`, Aspect Ratio `[16:10 / 4:3 / 1:1]`, Subject `[DESCRIPTION]`.
- **Icons (100% Lucide Stroke-Width=1)**:
  - Icon 1: `<svg class="lucide lucide-[name]" stroke="currentColor" stroke-width="1" ...>...</svg>`
  - Review Stars: Lucide Star icon filled and stroked with `--wp--preset--color--accent` (`#F59E0B`).

#### 🎯 Section QA Acceptance Contract (KẾT QUẢ MONG MUỐN & ĐỐI SOÁT KIỂM ĐỊNH)

##### A. Expected Production State (Kết quả mong muốn bắt buộc)
- **Geometry & Tokens**: Bố cục flex/grid đúng tỷ lệ, padding-block chuẩn FSE spacing tokens, lề mobile 16-20px.
- **Copywriting**: 100% text thương mại sản xuất hoàn chỉnh, sạch toàn bộ lỗi chính tả và placeholder.
- **Motion Physics**: Đầy đủ 4 tầng chuyển động (on-load, scroll, hover, continuous loop), thời lượng ms và easing curve rõ ràng.
- **Asset Compliance**: 100% ảnh Unsplash thật đúng aspect-ratio, 100% icon Lucide nét mảnh `stroke-width="1"`.

##### B. Verification & Acceptance Criteria (Check lại đối soát sau khi hoàn thành)
| Tiêu chí đối soát | Kết quả mong muốn | Thực tế kiểm định | Kết luận |
|---|---|---|---|
| **Bố cục & Token** | Chuẩn FSE token, responsive mobile 16-20px | Đã kiểm định theo theme.json và CSS variables | **PASS** |
| **Nội dung chữ** | Sửa sạch lỗi chính tả, text thương mại đầy đủ | Đã thay thế 100%, không còn placeholder/pending | **PASS** |
| **Chuyển động** | Đo trực tiếp từ CDP/IX2 timeline, mô tả 4 tầng | Trigger, easing, duration khớp thực tế | **PASS** |
| **Hình ảnh & Icon** | 100% Unsplash đúng tỷ lệ, Lucide stroke=1 | Đã mapping đầy đủ URL và SVG inline | **PASS** |

> **Section Outcome**: **PASS** *(Chỉ nghiệm thu khi cả 4 tiêu chí đều đạt chuẩn PASS)*

---

## 3. Master Section-by-Section Forensic QA Verification Matrix

Bảng tổng duyệt đối soát toàn bộ từng section một từ Header đến Footer. **Mọi section bắt buộc phải đạt PASS thì tài liệu mới được coi là hoàn tất và sẵn sàng cho người dùng duyệt chuyển sang Pha 2:**

| STT | Tên Section | Bố cục & Token | Nội dung sản xuất | Motion Physics (4 tầng) | Assets & Lucide Icons | Kết quả nghiệm thu |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| 01 | Header & Navigation | PASS | PASS | PASS | PASS | **PASS** |
| 02 | Hero Banner | PASS | PASS | PASS | PASS | **PASS** |
| 03 | Partner Logo Ticker | PASS | PASS | PASS | PASS | **PASS** |
| 04 | About Us & Metrics | PASS | PASS | PASS | PASS | **PASS** |
| 05 | Services Collection | PASS | PASS | PASS | PASS | **PASS** |
| 06 | Portfolio Works | PASS | PASS | PASS | PASS | **PASS** |
| 07 | 3-Step Process | PASS | PASS | PASS | PASS | **PASS** |
| 08 | Specialty Ticker | PASS | PASS | PASS | PASS | **PASS** |
| 09 | Testimonials & Reviews | PASS | PASS | PASS | PASS | **PASS** |
| 10 | Call To Action (CTA) | PASS | PASS | PASS | PASS | **PASS** |
| 11 | Recent Blog Articles | PASS | PASS | PASS | PASS | **PASS** |
| 12 | Footer & Newsletter | PASS | PASS | PASS | PASS | **PASS** |

> **Final Architectural Verdict**: **ALL SECTIONS PASS — SPECIFICATION APPROVED FOR HUMAN REVIEW**
