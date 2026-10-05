# Gutenberg FSE & Nextora Design Tokens Contract

Authoritative specification for WordPress Gutenberg Full Site Editing (FSE) design tokens, fluid clamp calculations, and heading element inheritance rules.

---

## 1. Global Tokens Specification (`:root`)

Every production stylesheet (`main.css`) MUST declare the `:root` block with the complete set of tokens below. 
**PROHIBITION:** Inventing non-standard token names (such as `--hero`, `--display`, `--ink`, `--paper`, `--stone`, `--soft-gray`) is strictly forbidden.

```css
:root {
  /* ==========================================================================
     1. TYPOGRAPHY FONT FAMILIES (Extracted from target site A)
     ========================================================================== */
  --nextora-font-heading: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --nextora-font-body: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* ==========================================================================
     2. GUTENBERG FSE COLOR PALETTE (Strict 8-Variable Palette)
     ========================================================================== */
  --wp--preset--color--base: #f6f6f9;         /* Global canvas / page background */
  --wp--preset--color--contrast: #141414;     /* Dominant heading & high-contrast dark text */
  --wp--preset--color--paragraph: #494852;    /* Readable body copy & muted descriptions */
  --wp--preset--color--primary: #ff7a52;      /* Primary brand accent / CTA buttons */
  --wp--preset--color--secondary: #ff5622;    /* Secondary accent / hover states */
  --wp--preset--color--surface: #ffffff;      /* Card containers, modals, clean white surfaces */
  --wp--preset--color--border: #e6e6e6;       /* Subtle dividing lines & card borders */
  --wp--preset--color--accent: #F59E0B;       /* MANDATORY: Review star rating gold (#F59E0B) */

  /* ==========================================================================
     3. GUTENBERG FLUID TYPOGRAPHY CLAMPS (AlonePro FSE Standard)
     ========================================================================== */
  --wp--preset--font-size--small: clamp(0.88rem, 0.84rem + 0.35vw, 0.95rem);        /* ~14px: H6, badges, tags */
  --wp--preset--font-size--base: clamp(0.9375rem, 0.88rem + 0.45vw, 1.0625rem);      /* ~16px: H5, standard body copy */
  --wp--preset--font-size--medium: clamp(1.25rem, 0.94rem + 0.55vw, 1.5rem);          /* ~20-24px: H4, card titles */
  --wp--preset--font-size--medium-plus: clamp(1.375rem, 1.375rem + 0.85vw, 2rem);     /* ~24-32px: H3, service titles */
  --wp--preset--font-size--large: clamp(1.75rem, 1.75rem + 1.2vw, 2.8rem);           /* ~36-45px: H2, section titles */
  --wp--preset--font-size--x-large: clamp(2.1rem, 1.7rem + 2.2vw, 3.2rem);           /* ~48-52px: H1 page title */
  --wp--preset--font-size--xx-large: clamp(2.6rem, 2rem + 2.5vw, 4.5rem);            /* ~56-72px: Hero display title */

  /* ==========================================================================
     4. GUTENBERG FLUID SPACING CLAMPS (AlonePro FSE Standard)
     ========================================================================== */
  --wp--preset--spacing--10: clamp(0.75rem, 4vw, 1rem);                              /* ~12-16px: compact gaps, tag spacing */
  --wp--preset--spacing--20: clamp(1rem, 4vw, 1.5rem);                               /* ~16-24px: card interior padding */
  --wp--preset--spacing--30: clamp(1.5rem, 5vw, 2rem);                               /* ~24-32px: grid gutter gaps */
  --wp--preset--spacing--40: clamp(1.8rem, 1.8rem + ((1vw - 0.48rem) * 2.885), 3rem); /* ~28-48px: title-to-content gap */
  --wp--preset--spacing--50: clamp(2.5rem, 8vw, 4.5rem);                             /* ~40-72px: section top/bottom padding */
  --wp--preset--spacing--60: clamp(3.75rem, 10vw, 7rem);                             /* ~60-112px: hero padding & major section breaks */
}
```

---

## 2. Heading Elements Contract (theme.json / CSS Inheritance)

All HTML heading tags (`h1`-`h6`) and `.heading` utility classes must strictly inherit from this specification:

```css
/* ==========================================================================
   Heading Base Rules
   ========================================================================== */
h1, h2, h3, h4, h5, h6, .heading {
  color: var(--wp--preset--color--contrast);
  font-family: var(--nextora-font-heading);
  font-weight: 600;
  line-height: 1.25;
}

/* H1: Primary Page / Hero Headline */
h1 {
  font-size: var(--wp--preset--font-size--x-large);
  font-weight: 700;
  line-height: 1.15;
  margin-top: 0;
  margin-bottom: var(--wp--preset--spacing--40);
}

/* H2: Section Titles */
h2 {
  font-size: var(--wp--preset--font-size--large);
  font-weight: 600;
  line-height: 1.3;
  margin-top: var(--wp--preset--spacing--20);
  margin-bottom: var(--wp--preset--spacing--10);
}

/* H3: Service Block / Category Headings */
h3 {
  font-size: var(--wp--preset--font-size--medium-plus);
  line-height: 1.25;
  margin-top: var(--wp--preset--spacing--20);
  margin-bottom: var(--wp--preset--spacing--10);
}

/* H4: Card Titles / Showcase Items */
h4 {
  font-size: var(--wp--preset--font-size--medium);
  line-height: 1.25;
  margin-top: var(--wp--preset--spacing--10);
  margin-bottom: 0.75rem;
}

/* H5: Minor Headings / Meta Data */
h5 {
  font-size: var(--wp--preset--font-size--base);
  line-height: 1.35;
  margin-top: var(--wp--preset--spacing--10);
  margin-bottom: 0.5rem;
}

/* H6: Subtitle Badges / Eyebrow Text */
h6 {
  font-size: var(--wp--preset--font-size--small);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.4;
  margin-top: var(--wp--preset--spacing--10);
  margin-bottom: 0.5rem;
}
```

---

## 3. Global Section & Layout Standards

```css
/* All sections maintain consistent vertical rhythm */
section, .section {
  padding-top: var(--wp--preset--spacing--50);
  padding-bottom: var(--wp--preset--spacing--50);
}

/* Title wrappers maintain standard gap to body content */
.section-title-wrapper, .title-group, .heading-group {
  margin-bottom: var(--wp--preset--spacing--40);
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--10);
}

/* All Lucide SVG icons must inherit stroke-width: 1px */
svg.lucide, svg.lucide-icon, [data-lucide] {
  stroke-width: 1px;
}
```
