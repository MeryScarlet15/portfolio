---
name: optimizing-performance
description: Audit and fix web performance, SEO, and Core Web Vitals issues in the Next.js portfolio. Use when optimizing performance, improving PageSpeed scores, fixing SEO issues, or reducing bundle size.
---

# Instructions

## Arguments

- `mode` (optional): `audit` (report only) or `fix` (report + apply fixes). Default: `fix`
- `focus` (optional): `images`, `bundle`, `meta`, `layout-shift`, `lcp`, `accessibility`, `all`. Default: `all`

If no arguments provided, run a full audit and fix all issues found.

## Workflow Overview

1. Run automated detection checks
2. Manual review of flagged files
3. Generate report with findings
4. Apply fixes (if `mode: fix`)
5. Verify build passes

## 1. Run Automated Detection

Read `context/detection-commands.md` and run every check. Record all findings with file paths and line numbers before proceeding.

Group findings by category:
- **Image optimization** — unoptimized images, missing dimensions, quality settings, placeholders
- **LCP** — LCP image discoverability, preload hints, fetchpriority, render-blocking resources
- **Bundle size** — heavy dependencies, missing code splitting, unnecessary client-side JS
- **Meta & SEO** — broken meta tags, missing viewport, missing OG tags, broken `next/head` usage
- **Layout shift (CLS)** — missing dimensions, opacity-0 animations, large min-heights on mobile
- **Accessibility** — contrast ratios, missing alt text, ARIA attributes
- **Render blocking** — inline data URIs, unextracted assets, blocking scripts

## 2. Manual Review

For each flagged file, read and verify:

### LCP (Largest Contentful Paint)
- The LCP image must be discoverable in the initial HTML — add `<link rel="preload">` in layout head
- LCP images inside client components need preload because they aren't in the server-rendered HTML until hydration
- Use string `src` paths (e.g., `src="/images/hero.webp"`) for LCP images so the URL is stable and matches the preload href
- Static imports (`import img from 'public/...'`) get hashed URLs that can't be preloaded reliably
- Verify `fetchPriority="high"` is on the preload link
- **Never use `decoding="async"` on LCP images** — async decoding tells the browser it can defer image decode, which delays LCP paint. Omit the attribute or use `decoding="sync"` for LCP images

### Images (`next/image` and native `<img>`)
- `quality` should be 75–85 (never 100)
- Static imports should use `placeholder="blur"`
- Lazy images must have `loading="lazy"` (non-priority only)
- `sizes` attribute should match actual rendered sizes per breakpoint
- `priority` only on above-the-fold hero/LCP images

#### Manual srcSet (required when `images.unoptimized: true`)
When Next.js image optimization is disabled, `next/image` cannot generate responsive srcSets. For the LCP image:
1. **Use native `<img>`** instead of `next/image` — avoids shipping the Image component JS for no benefit
2. **Generate responsive variants** using the seo-image-optimizer: `python optimize.py ./public/images --in-place --scan-code ./src`
3. **Wire srcSet manually** matching the `sizes` attribute breakpoints:
   ```tsx
   <img
     src="/images/hero.webp"
     srcSet="/images/hero-250w.webp 250w, /images/hero-300w.webp 300w, /images/hero-450w.webp 450w, /images/hero.webp 1080w"
     sizes="(max-width: 480px) 250px, (max-width: 768px) 300px, 450px"
     fetchPriority="high"
     width={1080}
     height={1186}
   />
   ```
4. **Update the preload** in layout.tsx to use `imageSrcSet` and `imageSizes` (not `href`):
   ```tsx
   <link
     rel="preload"
     as="image"
     type="image/webp"
     imageSrcSet="/images/hero-250w.webp 250w, ..."
     imageSizes="(max-width: 480px) 250px, ..."
     fetchPriority="high"
   />
   ```

### Next.js Config
- `images.unoptimized: true` is intentional (avoids hosting costs) — do NOT change it
- Since Next.js won't auto-optimize, all images must be manually converted to WebP (<150KB) using the seo-image-optimizer or `cwebp -q 80`
- Check for missing `experimental.optimizePackageImports` if large libs are used

### Layout & Metadata (App Router)
- `next/head` `<Head>` component must NOT be used — it silently fails in App Router
- Use `metadata` export for static meta, `generateMetadata()` for dynamic
- Use `viewport` export for viewport configuration
- Verify OG tags, description, title are present

### Bundle
- Flag dependencies used in <3 places that could be replaced with inline code
- Verify desktop-only components use `dynamic()` with `ssr: false` (via client wrapper)
- Check `'use client'` is only on components that need interactivity
- **Unused font imports**: Check all font imports in layout.tsx against actual usage. A font imported but never applied via a CSS class still triggers a full download. Remove unused fonts (e.g., GeistMono if no `font-mono` class exists in the codebase)

### Desktop-Only JS Running on Mobile (TBT)
- Components hidden via CSS (`hidden tablet:block`) still execute their JavaScript on all devices
- **Event listeners and RAF loops** in hidden components waste CPU and increase Total Blocking Time (TBT) on mobile
- Gate JS execution with `window.matchMedia()` to skip entirely on non-matching viewports:
  ```ts
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 923px)')
    if (!mq.matches) return
    // ... event listeners and RAF loop only run on tablet+
  }, [])
  ```
- This is especially critical for cursor animations, parallax effects, and other desktop-only interactions
- **Browserslist**: Add `.browserslistrc` targeting modern browsers (Chrome 92+, Firefox 90+, Safari 15.4+) to eliminate legacy polyfills (e.g., Array.prototype.at/flat/flatMap ~14KB)
- **Animation libraries**: If framer-motion or similar is used in <3 files, replace with CSS transitions + `requestAnimationFrame` (saves ~70KB). Use lerp for smooth cursor following:
  ```ts
  current.x += (target.x - current.x) * 0.15 // in rAF loop
  el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  ```

### Accessibility (Performance-Related)
- Check color contrast ratios — WCAG AA requires 4.5:1 for normal text, 3:1 for large text
- White text (#fff) on teal-500 (#14b8a6) = 2.48 ratio (FAIL). Use dark text on bright backgrounds
- Use python3 or a tool to calculate: `contrast = (L1 + 0.05) / (L2 + 0.05)` where L is relative luminance
- Verify all interactive elements have accessible names

### Layout Shift
- Images must have explicit `width`/`height` or container dimensions
- `opacity-0` animation elements must reserve space (use `transform` not layout props)
- Fixed `min-h-` values should be responsive (smaller on mobile)

## 3. Severity Levels

```
CRITICAL (major score impact — must fix):
- LCP image not discoverable in initial HTML (missing preload)
- Broken meta tags (next/head in App Router)
- Missing viewport configuration
- Images >200KB not in WebP format (since Next.js optimization is disabled)
- WCAG contrast ratio failures on interactive elements

HIGH (noticeable score impact — should fix):
- LCP image using static import (hashed URL can't be preloaded)
- LCP image with `decoding="async"` (delays paint of largest element)
- Heavy dependency for minimal usage (e.g., icon library for 3 icons, IntersectionObserver lib for simple useInView)
- Desktop-only JS running on mobile (RAF loops, event listeners in CSS-hidden components)
- Unused font imports (downloaded but never applied)
- Desktop-only component loaded on all devices
- Missing blur placeholder on lazy images
- Oversized images without responsive sizes

MEDIUM (minor score impact — nice to fix):
- Large inline data URIs (>500 chars)
- Fixed min-heights not responsive on mobile
- Missing optimizePackageImports

LOW (best practice):
- Suboptimal quality values (90 instead of 80)
- Missing preconnect/prefetch hints
```

## 4. Apply Fixes (mode: fix)

Apply fixes in this priority order:

1. **Meta fixes** — Move `next/head` to metadata exports, add missing meta/viewport
2. **Image fixes** — Convert to WebP via `cwebp -q 80`, add blur placeholders, fix quality/sizes
3. **Bundle fixes** — Replace heavy deps with inline code, add dynamic imports for desktop-only components
4. **Layout shift fixes** — Responsive min-heights, image dimensions
5. **Asset fixes** — Extract inline data URIs to static files in `public/`

After applying fixes, run:
```bash
bun run build:app
```
Build must pass before reporting completion.

## 5. Generate Report

Read `context/report-template.md` for the output format.

## Quick Mode

When called from the PR reviewer, use streamlined output:
- Only report CRITICAL and HIGH issues
- Skip passed checks
- Include verdict: `PASS` / `NEEDS_FIXES`

## Verification

- [ ] `bun run build:app` passes after all fixes
- [ ] `bun run prettier:check` passes
- [ ] Every CRITICAL issue has a specific file:line reference
- [ ] Every fix is explained with before/after
- [ ] No visual regressions introduced (quality reductions, removed assets)
