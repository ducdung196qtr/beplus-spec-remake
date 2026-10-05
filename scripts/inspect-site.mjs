#!/usr/bin/env node

/**
 * inspect-site.mjs - Universal Forensic DOM, CSS & CDP Inspector for Spec-Driven Clone
 * 
 * Deeply audits live or local target sites:
 * 1. CDP LIVE BROWSER AUDIT (Port 9222 Headless Chromium):
 *    - Real computed styles (computed font sizes, line heights, colors, layout dimensions)
 *    - Real Webflow IX2 animation timeline (actions, triggers, easing curves & durations)
 *    - Animation-to-Section mapping (each motion action mapped to its target section)
 *    - Image dimensions & computed aspect-ratios (16:9, 16:10, 4:3, 1:1, etc.)
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
          p: p ? {
            fontSize: window.getComputedStyle(p).fontSize,
            lineHeight: window.getComputedStyle(p).lineHeight,
            color: window.getComputedStyle(p).color
          } : null,
          button: primaryBtn ? {
            fontSize: window.getComputedStyle(primaryBtn).fontSize,
            backgroundColor: window.getComputedStyle(primaryBtn).backgroundColor,
            borderRadius: window.getComputedStyle(primaryBtn).borderRadius,
            padding: window.getComputedStyle(primaryBtn).padding
          } : null
        };

        // 3. Computed Images with Aspect Ratios
        const images = Array.from(document.querySelectorAll("img")).map((img, i) => {
          const rect = img.getBoundingClientRect();
          const nw = img.naturalWidth || Math.round(rect.width) || 0;
          const nh = img.naturalHeight || Math.round(rect.height) || 0;
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
          const closestSec = img.closest("section, .section, header, footer, nav");
          return {
            index: i + 1,
            src: img.src,
            alt: img.alt || "Production visual",
            naturalWidth: nw,
            naturalHeight: nh,
            aspectRatio: ratioStr,
            section: closestSec ? (closestSec.className || closestSec.tagName.toLowerCase()) : "global"
          };
        });

        // 4. Computed Sections & Full Text Content
        const sectionEls = Array.from(document.querySelectorAll("section, .section, header, footer, nav, [class*='section']"));
        const measuredSections = sectionEls.map((el, i) => {
          const rect = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          const headings = Array.from(el.querySelectorAll("h1, h2, h3, h4, h5, h6")).map(h => ({
            tag: h.tagName.toLowerCase(),
            text: h.innerText.trim()
          })).filter(h => h.text.length > 0);
          
          const paragraphs = Array.from(el.querySelectorAll("p")).map(p => p.innerText.trim()).filter(t => t.length > 0);
          const buttons = Array.from(el.querySelectorAll("a.w-button, a[class*='btn'], a[class*='button'], button")).map(b => b.innerText.trim()).filter(t => t.length > 0);

          return {
            index: i + 1,
            tag: el.tagName.toLowerCase(),
            className: el.className,
            id: el.id,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            backgroundColor: cs.backgroundColor,
            paddingTop: cs.paddingTop,
            paddingBottom: cs.paddingBottom,
            headings,
            paragraphs,
            buttons
          };
        });

        return {
          ix2Data,
          computed,
          images,
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

  // Motion Detection
  const motionEngines = [];
  if (html.includes("data-w-id") || html.includes("Webflow.require('ix2')") || combinedCss.includes("ix-")) {
    motionEngines.push("Webflow IX2 Runtime");
  }
  if (html.includes("lottie") || combinedCss.includes("lottie")) {
    motionEngines.push("Lottie Animation");
  }
  if (combinedCss.includes("@keyframes")) {
    motionEngines.push("Native CSS Keyframes");
  }

  // Parse Images
  const imgTags = html.match(/<img[^>]+>/gi) || [];
  const imageUrls = [];
  for (const img of imgTags) {
    const srcMatch = img.match(/src=["']([^"']+)["']/i);
    if (srcMatch && !imageUrls.includes(srcMatch[1])) {
      imageUrls.push(srcMatch[1]);
    }
  }

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
      motion_engines: motionEngines
    },
    computed_forensics: cdpData ? {
      typography: cdpData.computed,
      measured_sections: cdpData.measuredSections,
      measured_images: cdpData.images
    } : null,
    motion_timeline: cdpData && cdpData.ix2Data ? {
      total_actions: cdpData.ix2Data.totalActions,
      total_events: cdpData.ix2Data.totalEvents,
      actions: cdpData.ix2Data.actions,
      events: cdpData.ix2Data.events
    } : null,
    assets: {
      total_images: imageUrls.length,
      sample_images: imageUrls.slice(0, 15),
      image_aspect_ratios: cdpData && cdpData.images ? cdpData.images : []
    },
    commercial_polish: {
      detected_typos: detectedTypos,
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
  if (cdpData && cdpData.ix2Data) {
    console.log(`- CDP Live IX2 Events: ${cdpData.ix2Data.totalEvents}, Actions: ${cdpData.ix2Data.totalActions}`);
    console.log(`- CDP Measured Images: ${cdpData.images.length} with Aspect Ratios`);
    console.log(`- CDP Measured Sections: ${cdpData.measuredSections.length}`);
  }
  console.log(`- Total Unique Images: ${imageUrls.length}`);
  console.log(`- Typos to Correct: ${detectedTypos.map(t => t.original).join(", ")}`);
}

const targetUrl = process.argv[2] || "https://ritovex.webflow.io/";
auditSite(targetUrl).catch(err => {
  console.error(`[Inspector] Fatal error: ${err.message}`);
  process.exit(1);
});
