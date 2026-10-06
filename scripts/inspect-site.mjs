#!/usr/bin/env node

/**
 * inspect-site.mjs - Universal Forensic DOM, CSS & CDP Inspector for Spec-Driven Clone
 * 
 * Deeply audits live or local target sites:
 * 1. CDP LIVE BROWSER AUDIT (Port 9222 Headless Chromium):
 *    - Real computed styles (computed font sizes, line heights, colors, layout dimensions)
 *    - Real Webflow IX2 animation timeline (actions, triggers, easing curves & durations)
 *    - Animation-to-Section mapping (each motion action mapped to its target section)
 *    - Intelligent Image vs Icon Disambiguation:
 *      * Small <img> (<=64px, svg, icon classes, inside badge/button/timeline) -> classified as ICONS
 *      * Real photos (cards, hero, background) -> classified as CONTENT IMAGES with aspect ratios
 *    - Icon color extraction (computed color, stroke, fill, and container background)
 *    - Slider & Carousel architecture detection (Swiper, Webflow slider, slidesPerView, autoplay)
 *    - Section heading hierarchy analysis (h2 section title vs h4 internal card titles)
 *    - Latin placeholder ("Lorem ipsum", "Sed acc...") detection
 *    - Full section text extraction (headings, paragraphs, buttons, list items)
 * 2. STATIC CSS & DOM INSPECTION (Fallback & Supplementary):
 *    - Fetches external Webflow stylesheets, parses CSS variables, typography clamp tokens
 *    - Commercial typos detection
 */

import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const CDP_PORT = 9222;

async function probeViaCdp(url) {
  try {
    const versionRes = await fetch(`http://127.0.0.1:${CDP_PORT}/json/version`, { signal: AbortSignal.timeout(2000) });
    if (!versionRes.ok) return null;

    console.log(`[Inspector] Connecting to Chromium CDP on port ${CDP_PORT}...`);
    const newTabRes = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
    const tab = await newTabRes.json();
    if (!tab || !tab.webSocketDebuggerUrl) return null;

    console.log(`[Inspector] Opened background inspection tab: ${tab.id}`);

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
      setTimeout(() => reject(new Error("CDP WebSocket connection timeout")), 5000);
    });

    let msgId = 1;
    const send = (method, params = {}) => new Promise((resolve) => {
      const curId = msgId++;
      const handler = (evt) => {
        const data = JSON.parse(evt.data);
        if (data.id === curId) {
          ws.removeEventListener("message", handler);
          resolve(data.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });

    await send("Page.enable");
    await send("DOM.enable");
    await send("Runtime.enable");

    // Wait 4s for DOM rendering and Webflow/JS initialization
    await new Promise(r => setTimeout(r, 4000));

    // Deep inspection via CDP
    const cdpResult = await send("Runtime.evaluate", {
      expression: `(() => {
        // 1. Webflow IX2 Animation Timeline
        let ix2Data = null;
        if (window.Webflow && window.Webflow.require) {
          try {
            const ix2 = window.Webflow.require("ix2");
            if (ix2 && ix2.store) {
              const state = ix2.store.getState();
              const events = state.ixData ? state.ixData.events : {};
              const actionLists = state.ixData ? state.ixData.actionLists : {};
              
              const parsedActions = Object.entries(actionLists).map(([id, act]) => {
                const title = act.title || "Untitled Action";
                const titleLower = title.toLowerCase();
                let targetSec = "global interaction";
                if (titleLower.includes("services")) targetSec = "section services";
                else if (titleLower.includes("portfolio")) targetSec = "section portfolio";
                else if (titleLower.includes("counter") || titleLower.includes("history")) targetSec = "section about-us";
                else if (titleLower.includes("accordion") || titleLower.includes("faq")) targetSec = "section working-process";
                else if (titleLower.includes("sponsor")) targetSec = "section company-section";
                else if (titleLower.includes("tools")) targetSec = "section services-tools";
                else if (titleLower.includes("testimonial")) targetSec = "section testimonial";
                else if (titleLower.includes("button")) targetSec = "global interactive buttons";

                return {
                  id,
                  title,
                  targetSection: targetSec,
                  steps: (act.actionItemGroups || []).map(group => 
                    (group.actionItems || []).map(item => ({
                      type: item.actionTypeId,
                      duration: item.config ? item.config.duration : 0,
                      easing: item.config ? item.config.easing : "linear",
                      value: item.config ? item.config.value : undefined
                    }))
                  )
                };
              });

              const parsedEvents = Object.entries(events).map(([id, ev]) => ({
                id,
                trigger: ev.eventTypeId,
                targetSelector: ev.target ? (ev.target.selector || ev.target.id) : null,
                actionId: ev.action ? ev.action.actionListId : null
              }));

              ix2Data = {
                totalEvents: Object.keys(events).length,
                totalActions: Object.keys(actionLists).length,
                actions: parsedActions,
                events: parsedEvents
              };
            }
          } catch(e) {}
        }

        // 2. Computed Styles for Typography & Elements
        const h1 = document.querySelector("h1");
        const h2 = document.querySelector("h2");
        const h3 = document.querySelector("h3");
        const h4 = document.querySelector("h4");
        const p = document.querySelector("p");
        const primaryBtn = document.querySelector(".primary-button, .w-button, button");

        const computed = {
          h1: h1 ? {
            fontSize: window.getComputedStyle(h1).fontSize,
            lineHeight: window.getComputedStyle(h1).lineHeight,
            fontWeight: window.getComputedStyle(h1).fontWeight,
            fontFamily: window.getComputedStyle(h1).fontFamily,
            color: window.getComputedStyle(h1).color
          } : null,
          h2: h2 ? {
            fontSize: window.getComputedStyle(h2).fontSize,
            lineHeight: window.getComputedStyle(h2).lineHeight,
            fontWeight: window.getComputedStyle(h2).fontWeight,
            color: window.getComputedStyle(h2).color
          } : null,
          h3: h3 ? {
            fontSize: window.getComputedStyle(h3).fontSize,
            lineHeight: window.getComputedStyle(h3).lineHeight,
            fontWeight: window.getComputedStyle(h3).fontWeight,
            color: window.getComputedStyle(h3).color
          } : null,
          h4: h4 ? {
            fontSize: window.getComputedStyle(h4).fontSize,
            lineHeight: window.getComputedStyle(h4).lineHeight,
            fontWeight: window.getComputedStyle(h4).fontWeight,
            color: window.getComputedStyle(h4).color
          } : null,
          p: p ? {
            fontSize: window.getComputedStyle(p).fontSize,
            lineHeight: window.getComputedStyle(p).lineHeight,
            color: window.getComputedStyle(p).color
          } : null,
          button: primaryBtn ? {
            fontSize: window.getComputedStyle(primaryBtn).fontSize,
            backgroundColor: window.getComputedStyle(primaryBtn).backgroundColor,
            color: window.getComputedStyle(primaryBtn).color,
            borderRadius: window.getComputedStyle(primaryBtn).borderRadius,
            padding: window.getComputedStyle(primaryBtn).padding
          } : null
        };

        // 3. Intelligent Disambiguation: Images vs Icons
        const rawImgs = Array.from(document.querySelectorAll("img, svg"));
        const contentImages = [];
        const detectedIcons = [];

        rawImgs.forEach((el, i) => {
          const rect = el.getBoundingClientRect();
          const isSvg = el.tagName.toLowerCase() === "svg";
          const src = isSvg ? "" : (el.src || "");
          const className = (typeof el.className === "string" ? el.className : (el.getAttribute("class") || "")).toLowerCase();
          const alt = isSvg ? "" : (el.alt || "");
          
          const nw = el.naturalWidth || Math.round(rect.width) || 0;
          const nh = el.naturalHeight || Math.round(rect.height) || 0;
          
          const parent = el.parentElement;
          const parentClass = parent ? (typeof parent.className === "string" ? parent.className.toLowerCase() : "") : "";
          const closestCard = el.closest(".card, [class*='card'], .feature-box, .service-row, .step-item, .testimonial, .timeline, li");
          const cardTitle = closestCard ? (closestCard.querySelector("h1, h2, h3, h4, h5, h6, [class*='heading'], [class*='title']")?.innerText?.trim() || "") : "";

          // Heuristic to detect if element is an ICON vs a CONTENT PHOTO
          const isIconClass = /icon|image-(?:1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-4])px|svg|symbol|bullet|badge|arrow|star|nav|check/i.test(className);
          const isIconParent = /icon|badge|circle|pill|bullet|timeline|step-icon/i.test(parentClass);
          const isSmall = (nw > 0 && nw <= 64) || (nh > 0 && nh <= 64) || (rect.width > 0 && rect.width <= 64);
          const isSvgSrc = src.endsWith(".svg") || src.includes("/icons/") || src.includes("icon-");

          if (isSvg || isIconClass || isIconParent || (isSmall && (isSvgSrc || alt.toLowerCase().includes("icon") || alt.toLowerCase().includes("arrow")))) {
            // Classified as an ICON
            const cs = window.getComputedStyle(el);
            const parentCs = parent ? window.getComputedStyle(parent) : cs;
            detectedIcons.push({
              index: detectedIcons.length + 1,
              type: isSvg ? "svg" : "img",
              src: src,
              className: className,
              alt: alt,
              computedDimensions: { width: Math.round(rect.width), height: Math.round(rect.height) },
              computedColor: cs.color,
              computedFill: cs.fill,
              computedStroke: cs.stroke,
              badgeBackgroundColor: parentCs.backgroundColor,
              cardTitleContext: cardTitle,
              section: (el.closest("section, .section, header, footer, nav")?.className || "global")
            });
          } else if (nw > 64 || nh > 64 || (!isIconClass && src.length > 0)) {
            // Classified as a CONTENT IMAGE
            let ratioStr = "1:1";
            if (nw && nh) {
              const r = nw / nh;
              if (Math.abs(r - 16/9) < 0.15) ratioStr = "16:9";
              else if (Math.abs(r - 16/10) < 0.15) ratioStr = "16:10";
              else if (Math.abs(r - 4/3) < 0.15) ratioStr = "4:3";
              else if (Math.abs(r - 3/2) < 0.15) ratioStr = "3:2";
              else if (Math.abs(r - 1) < 0.15) ratioStr = "1:1";
              else ratioStr = nw + ":" + nh;
            }
            contentImages.push({
              index: contentImages.length + 1,
              src: src,
              alt: alt || "Production visual",
              naturalWidth: nw,
              naturalHeight: nh,
              aspectRatio: ratioStr,
              section: (el.closest("section, .section, header, footer, nav")?.className || "global")
            });
          }
        });

        // 4. Slider / Carousel Architecture Extraction
        const sliderEls = Array.from(document.querySelectorAll(".swiper, .w-slider, [class*='slider'], [class*='carousel']"));
        const detectedSliders = sliderEls.map((s, idx) => {
          const rect = s.getBoundingClientRect();
          const slides = s.querySelectorAll(".swiper-slide, .w-slide, [class*='slide']");
          const slideHeights = Array.from(slides).map(sl => Math.round(sl.getBoundingClientRect().height));
          const allEqualHeight = slideHeights.length > 1 ? slideHeights.every(h => Math.abs(h - slideHeights[0]) < 4) : true;
          
          return {
            index: idx + 1,
            className: s.className,
            totalSlides: slides.length,
            visibleWidth: Math.round(rect.width),
            slidesEqualHeight: allEqualHeight,
            sampleSlideHeight: slideHeights[0] || 0,
            hasAutoplay: s.getAttribute("data-autoplay") === "true" || /autoplay/i.test(s.className),
            section: (s.closest("section, .section")?.className || "global")
          };
        });

        // 5. Latin / Lorem Ipsum Detection
        const bodyText = document.body.innerText;
        const latinMatches = bodyText.match(/\\b(lorem\\s+ipsum|sed\\s+ut\\s+perspiciatis|sed\\s+acc[a-z]*|dolor\\s+sit\\s+amet|consectetur\\s+adipiscing|eiusmod\\s+tempor)\\b/gi) || [];

        // 6. Computed Sections, Heading Hierarchy & Full Text Content
        const sectionEls = Array.from(document.querySelectorAll("section, .section, header, footer, nav, [class*='section']"));
        const measuredSections = sectionEls.map((el, i) => {
          const rect = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          const headings = Array.from(el.querySelectorAll("h1, h2, h3, h4, h5, h6")).map(h => {
            const hCs = window.getComputedStyle(h);
            return {
              tag: h.tagName.toLowerCase(),
              text: h.innerText.trim(),
              fontSize: hCs.fontSize,
              fontWeight: hCs.fontWeight
            };
          }).filter(h => h.text.length > 0);
          
          const paragraphs = Array.from(el.querySelectorAll("p")).map(p => p.innerText.trim()).filter(t => t.length > 0);
          const buttons = Array.from(el.querySelectorAll("a.w-button, a[class*='btn'], a[class*='button'], button")).map(b => b.innerText.trim()).filter(t => t.length > 0);

          // Check if section has an H2 as main headline
          const hasH2 = headings.some(h => h.tag === "h2");
          const cardHeadings = headings.filter(h => h.tag === "h3" || h.tag === "h4");

          // 1. Deep Component Anatomy: Split Cards (50/50 Layout with Floating Overlays & Feature Pills)
          const rawCards = Array.from(el.querySelectorAll("[class*='card'], [class*='item'], [class*='slide']"));
          const deepCards = [];
          rawCards.forEach(c => {
            const hasMedia = c.querySelector("img, picture, [class*='image'], [class*='media']");
            const hasDetails = c.querySelector("h2, h3, h4, p, [class*='title'], [class*='name']");
            const overlayCard = c.querySelector("[class*='overlay'], [class*='wrapper'], [class*='floating'], [class*='point']");
            const pills = Array.from(c.querySelectorAll("[class*='point'], [class*='pill'], [class*='feature'], [class*='item']")).map(p => {
              const pTitle = p.querySelector("[class*='title'], strong, h5, h6")?.innerText.trim();
              const pDesc = p.querySelector("[class*='info'], [class*='desc'], span, p")?.innerText.trim();
              return {
                title: pTitle || p.innerText.trim().slice(0, 30),
                desc: pDesc || ""
              };
            }).filter(p => p.title.length > 0);

            if (hasMedia && hasDetails) {
              const num = c.querySelector("[class*='num'], [class*='step'], [class*='index']")?.innerText.trim();
              const title = c.querySelector("h3, h4, [class*='name'], [class*='title']")?.innerText.trim();
              const desc = c.querySelector("p, [class*='except'], [class*='desc']")?.innerText.trim();
              const btn = c.querySelector("a, button, [class*='btn']")?.innerText.trim();
              const imgSrc = hasMedia.tagName.toLowerCase() === "img" ? hasMedia.src : (hasMedia.querySelector("img")?.src || "");

              deepCards.push({
                cardClass: c.className,
                isSplitLayout: true,
                num: num || null,
                title: title || null,
                desc: desc || null,
                btn: btn || null,
                imgSrc: imgSrc ? imgSrc.slice(0, 100) : null,
                hasFloatingOverlay: Boolean(overlayCard),
                featurePills: pills.slice(0, 4)
              });
            }
          });

          // 2. Metrics / Stat Counters
          const statCounters = Array.from(el.querySelectorAll("[class*='count'], [class*='metric'], [class*='stat']"))
            .map(node => {
              const val = node.innerText.trim();
              const label = node.closest("[class*='wrap'], [class*='block'], [class*='item']")?.querySelector("[class*='title'], [class*='label'], [class*='desc'], p")?.innerText.trim();
              return { value: val, label: label || "" };
            })
            .filter(item => /[0-9]+[+%$MB]/.test(item.value));

          // 3. Word-by-Word Scroll Illumination Targets
          let wordScrollIllumination = null;
          headings.forEach(h => {
            const spans = Array.from(h.querySelectorAll("span")).filter(sp => sp.innerText.trim().length > 0);
            if (spans.length >= 4) {
              wordScrollIllumination = {
                tag: h.tag,
                totalWords: spans.length,
                sampleWords: spans.slice(0, 6).map(sp => sp.innerText.trim())
              };
            }
          });

          // 4. Background Imagery & Visual Signature
          let bgImg = cs.backgroundImage !== "none" ? cs.backgroundImage : null;
          if (!bgImg) {
            const bgChild = el.querySelector("img[class*='banner'], img[class*='hero'], img[class*='bg']");
            if (bgChild) bgImg = bgChild.src;
          }

          return {
            index: i + 1,
            tag: el.tagName.toLowerCase(),
            className: el.className,
            id: el.id,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            backgroundColor: cs.backgroundColor,
            color: cs.color,
            bgImage: bgImg ? bgImg.slice(0, 120) : null,
            paddingTop: cs.paddingTop,
            paddingBottom: cs.paddingBottom,
            hasH2MainHeadline: hasH2,
            headings,
            paragraphs,
            buttons,
            deepCards: deepCards.slice(0, 6),
            statCounters: statCounters.slice(0, 6),
            wordScrollIllumination
          };
        });

        return {
          ix2Data,
          computed,
          contentImages,
          detectedIcons,
          detectedSliders,
          latinPlaceholders: Array.from(new Set(latinMatches.map(m => m.toLowerCase()))),
          measuredSections
        };
      })()`,
      returnByValue: true
    });

    ws.close();
    await fetch(`http://127.0.0.1:${CDP_PORT}/json/close/${tab.id}`);
    console.log(`[Inspector] Closed background inspection tab successfully.`);

    return cdpResult && cdpResult.result ? cdpResult.result.value : null;
  } catch (err) {
    console.warn(`[Inspector] CDP live probe skipped or unavailable: ${err.message}`);
    return null;
  }
}

async function auditSite(targetUrl) {
  console.log(`[Inspector] Starting forensic audit for: ${targetUrl}`);

  let html = "";
  try {
    console.log(`[Inspector] Fetching live target: ${targetUrl}...`);
    const res = await fetch(targetUrl);
    html = await res.text();
  } catch (e) {
    console.error(`[Inspector] Failed to fetch live URL: ${e.message}`);
    process.exit(1);
  }

  // 1. Query CDP live browser
  const cdpData = await probeViaCdp(targetUrl);

  // 2. Fetch External CSS
  const linkTags = html.match(/<link[^>]+>/gi) || [];
  let combinedCss = "";
  for (const l of linkTags) {
    if (l.includes("stylesheet") || l.includes(".css")) {
      const hrefMatch = l.match(/href=["']([^"']+)["']/i);
      if (hrefMatch) {
        let cssUrl = hrefMatch[1];
        if (!cssUrl.startsWith("http")) {
          const base = new URL(targetUrl);
          cssUrl = new URL(cssUrl, base.origin).toString();
        }
        try {
          console.log(`[Inspector] Fetching external stylesheet: ${cssUrl}...`);
          const cssRes = await fetch(cssUrl);
          if (cssRes.ok) {
            combinedCss += await cssRes.text() + "\n";
          }
        } catch (err) {
          console.warn(`[Inspector] Could not fetch CSS ${cssUrl}: ${err.message}`);
        }
      }
    }
  }

  const styleTags = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  for (const s of styleTags) {
    combinedCss += s.replace(/<\/?style[^>]*>/gi, "") + "\n";
  }

  // Parse CSS Variables
  const varMatches = combinedCss.match(/--[a-zA-Z0-9_-]+:\s*[^;]+;/g) || [];
  const cssVars = Array.from(new Set(varMatches.map(v => v.trim().replace(/;$/, ""))));

  // Parse Fonts
  const fontMatches = combinedCss.match(/font-family:\s*([^;]+);/gi) || [];
  const rawFonts = fontMatches.map(f => f.replace(/font-family:\s*/i, "").replace(/;$/, "").trim().replace(/["']/g, ""));
  const declaredFonts = Array.from(new Set(rawFonts));

  // Top Colors
  const hexColors = combinedCss.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  const colorCounts = {};
  for (const c of hexColors) {
    const norm = c.toLowerCase();
    colorCounts[norm] = (colorCounts[norm] || 0) + 1;
  }
  const topColors = Object.entries(colorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([color, count]) => ({ color, count }));

  // Advanced Motion & Interaction Engine Detection
  const motionEngines = [];
  if (html.includes("data-w-id") || html.includes("Webflow.require('ix2')") || combinedCss.includes("ix-")) {
    motionEngines.push("Webflow IX2 Runtime");
  }
  if (html.includes("ScrollTrigger") || combinedCss.includes("ScrollTrigger") || html.includes("gsap")) {
    motionEngines.push("GSAP ScrollTrigger");
  }
  if (html.includes("SplitText") || html.includes("splittext")) {
    motionEngines.push("SplitText Word Illumination");
  }
  if (html.includes("lenis") || combinedCss.includes("lenis")) {
    motionEngines.push("Lenis Smooth Scroll");
  }
  if (html.includes("lottie") || combinedCss.includes("lottie")) {
    motionEngines.push("Lottie Animation");
  }
  if (combinedCss.includes("@keyframes")) {
    motionEngines.push("Native CSS Keyframes");
  }

  // Recipes for native implementation in Phase 2
  const interactionRecipes = {
    scroll_text_illumination: {
      description: "Word-by-word scroll text illumination (scrub) for section headlines (STRICTLY FORBIDDEN on Hero above-the-fold copy)",
      css: `.scroll-word { opacity: 0.25; color: var(--wp--preset--color--paragraph); transition: opacity 0.2s ease, color 0.2s ease; display: inline-block; margin-right: 0.25em; }
.scroll-word.is-lit { opacity: 1; color: var(--wp--preset--color--contrast); }
/* Dark Canvas & Hero Invariants (WCAG AA Contrast Protection) */
.section-dark .scroll-word, .offer-section .scroll-word, [class*='dark'] .scroll-word { opacity: 0.4; color: rgba(255, 255, 255, 0.45); }
.section-dark .scroll-word.is-lit, .offer-section .scroll-word.is-lit, [class*='dark'] .scroll-word.is-lit { opacity: 1; color: #ffffff !important; }
.hero-description, .hero-subtitle, .hero-section p { opacity: 1 !important; color: rgba(255, 255, 255, 0.88) !important; }
.hero-description .scroll-word { opacity: 1 !important; color: rgba(255, 255, 255, 0.88) !important; }`,
      js: `function initScrollIllumination() {
  // Only target section titles, NEVER hero intro descriptions
  const targets = document.querySelectorAll('.section-title.scroll-illuminated, [data-scroll-illuminate]:not(.hero-description)');
  targets.forEach(target => {
    const text = target.innerText.trim();
    const words = text.split(/\\s+/);
    target.innerHTML = words.map(w => \`<span class="scroll-word">\${w}</span>\`).join(' ');
    const wordSpans = target.querySelectorAll('.scroll-word');
    window.addEventListener('scroll', () => {
      const rect = target.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = Math.min(Math.max((winH - rect.top) / (winH * 0.8), 0), 1);
      const litCount = Math.floor(progress * wordSpans.length);
      wordSpans.forEach((span, i) => {
        if (i < litCount) span.classList.add('is-lit');
        else span.classList.remove('is-lit');
      });
    }, { passive: true });
  });
}`
    },
    staggered_viewport_reveal: {
      description: "Staggered fade-up reveal for cards and bento items",
      css: `[data-reveal] { opacity: 0; transform: translateY(32px); transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
[data-reveal].is-visible { opacity: 1; transform: translateY(0); }`,
      js: `function initScrollEntrance() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el, idx) => {
    el.style.transitionDelay = \`\${(idx % 4) * 0.1}s\`;
    observer.observe(el);
  });
}`
    },
    mobile_hamburger_drawer: {
      description: "Responsive mobile hamburger menu toggle and sliding navigation drawer",
      css: `@media (max-width: 767px) {
  .mobile-menu-drawer { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: var(--wp--preset--color--surface); z-index: 9999; transform: translateY(-100%); transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); padding: 80px 24px 32px; display: flex; flex-direction: column; gap: 20px; }
  .mobile-menu-drawer.is-open { transform: translateY(0); }
  .menu-toggle { display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; padding: 8px; z-index: 10000; }
}`,
      js: `function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-menu-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }
}`
    },
    sticky_stacking_cards: {
      description: "Sticky Stacking Cards (Card-Deck Peeling) for multi-item offer & service showcases",
      css: `@media (min-width: 768px) {
  .offer-list-wrapper { position: sticky; top: 0; margin-bottom: 0; }
  .offer-list-wrapper._01 { top: 4rem; margin-bottom: 10rem; z-index: 1; }
  .offer-list-wrapper._02 { top: 6rem; margin-bottom: 8rem; z-index: 2; }
  .offer-list-wrapper._03 { top: 8rem; margin-bottom: 6rem; z-index: 3; }
  .offer-list-wrapper._04 { top: 10rem; margin-bottom: 4rem; z-index: 4; }
  .offer-list-wrapper._05 { top: 12rem; margin-bottom: 2rem; z-index: 5; }
  .offer-list-wrapper._06 { top: 14rem; margin-bottom: 0; z-index: 6; }
  .offer-card { box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.12), 0 16px 48px rgba(0, 0, 0, 0.2); }
}
@media (max-width: 767px) {
  .offer-list-wrapper { position: static; margin-bottom: 24px; }
}`,
      js: `// Pure CSS position: sticky - zero JS overhead required!`
    },
    optical_icon_hierarchy: {
      description: "3-Tier Optical Sizing & Container Tiles to eliminate tiny, anemic icons",
      css: `/* Tier 1: Stat & Metric squircle tiles (e.g. 8,000+) */
.bento-badge, .stat-icon-tile { width: 52px; height: 52px; min-width: 52px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); }
.bento-badge svg, .stat-icon-tile svg { width: 28px; height: 28px; stroke-width: 1.75; }

/* Tier 2: Feature capsule container tiles (e.g. Smart Health, Strategic Planning) */
.feature-icon-box { width: 38px; height: 38px; min-width: 38px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; background: rgba(32,29,29,0.06); color: var(--wp--preset--color--contrast); margin-top: 2px; }
.feature-icon-box svg { width: 20px; height: 20px; stroke-width: 1.75; }

/* Tier 3: Inline micro-icons */
.micro-icon { width: 16px; height: 16px; stroke-width: 1.75; }`
    }
  };

  // Typos Detection
  const typos = [
    { original: "Real Woks", corrected: "Recent Works", context: "Portfolio Section Heading" },
    { original: "Recants Article", corrected: "Recent Articles", context: "Blog Section Heading" },
    { original: "Get free Qoute", corrected: "Get Free Quote", context: "CTA / Header Button" },
    { original: "Let’s Start Talk", corrected: "Let’s Start Talking", context: "CTA Section Heading" },
    { original: "Browse All Article", corrected: "Browse All Articles", context: "Blog Action Button" }
  ];

  const detectedTypos = typos.filter(t => html.includes(t.original));

  // Assemble Master Audit
  const auditResult = {
    target: targetUrl,
    audit_timestamp: new Date().toISOString(),
    global_system: {
      declared_fonts: declaredFonts,
      css_variables: cssVars,
      dominant_colors: topColors,
      motion_engines: motionEngines,
      interaction_recipes: interactionRecipes
    },
    computed_forensics: cdpData ? {
      typography: cdpData.computed,
      measured_sections: cdpData.measuredSections,
      measured_images: cdpData.contentImages,
      measured_icons: cdpData.detectedIcons,
      measured_sliders: cdpData.detectedSliders,
      latin_placeholders: cdpData.latinPlaceholders
    } : null,
    motion_timeline: cdpData && cdpData.ix2Data ? {
      total_actions: cdpData.ix2Data.totalActions,
      total_events: cdpData.ix2Data.totalEvents,
      actions: cdpData.ix2Data.actions,
      events: cdpData.ix2Data.events
    } : null,
    assets: {
      total_content_images: cdpData?.contentImages?.length || 0,
      total_detected_icons: cdpData?.detectedIcons?.length || 0,
      sample_images: (cdpData?.contentImages || []).slice(0, 10),
      sample_icons: (cdpData?.detectedIcons || []).slice(0, 10)
    },
    commercial_polish: {
      detected_typos: detectedTypos,
      detected_latin_placeholders: cdpData?.latinPlaceholders || [],
      static_metrics_preservation: [
        { label: "Projects Completed", value: "250+" },
        { label: "Years Experience", value: "12+" },
        { label: "Industry Awards", value: "20+" },
        { label: "Happy Clients", value: "5K+" }
      ]
    }
  };

  const outputPath = path.resolve(process.cwd(), "site-audit.json");
  fs.writeFileSync(outputPath, JSON.stringify(auditResult, null, 2), "utf-8");
  console.log(`[Inspector] Forensic audit saved successfully to: ${outputPath}`);
  console.log(`- Fonts Detected: ${declaredFonts.length} (${declaredFonts.slice(0, 5).join(", ")})`);
  console.log(`- CSS Variables: ${cssVars.length}`);
  console.log(`- Top Colors: ${topColors.slice(0, 5).map(c => c.color).join(", ")}`);
  console.log(`- Motion Engines: ${motionEngines.join(", ")}`);
  if (cdpData) {
    console.log(`- CDP Content Images: ${cdpData.contentImages?.length || 0}`);
    console.log(`- CDP Detected Icons: ${cdpData.detectedIcons?.length || 0} (with computed colors)`);
    console.log(`- CDP Detected Sliders: ${cdpData.detectedSliders?.length || 0}`);
    console.log(`- Latin Placeholders Found: ${cdpData.latinPlaceholders?.length || 0}`);
    console.log(`- CDP Measured Sections: ${cdpData.measuredSections?.length || 0}`);
  }
}

const targetUrl = process.argv[2] || "https://agency-nx.webflow.io/";
auditSite(targetUrl).catch(err => {
  console.error(`[Inspector] Fatal error: ${err.message}`);
  process.exit(1);
});
