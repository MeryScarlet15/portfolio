---
name: optimizing-performance
description: Audit and fix web performance, SEO, and Core Web Vitals issues in the Next.js portfolio. Use when optimizing performance, improving PageSpeed scores, fixing SEO issues, or reducing bundle size.
---

# Instructions

## Arguments

- `mode` (optional): `audit` (report only) or `fix` (report + apply fixes). Default: `fix`
- `focus` (optional): `images`, `bundle`, `meta`, `layout-shift`, `all`. Default: `all`

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
- **Bundle size** — heavy dependencies, missing code splitting, unnecessary client-side JS
- **Meta & SEO** — broken meta tags, missing viewport, missing OG tags, broken `next/head` usage
- **Layout shift (CLS)** — missing dimensions, opacity-0 animations, large min-heights on mobile
- **Render blocking** — inline data URIs, unextracted assets, blocking scripts

## 2. Manual Review

For each flagged file, read and verify:

### Images (`next/image`)
- `quality` should be 75–85 (never 100)
- Static imports should use `placeholder="blur"`
- Lazy images must have `loading="lazy"` (non-priority only)
- `sizes` attribute should match actual rendered sizes per breakpoint
- `priority` only on above-the-fold hero/LCP images

### Next.js Config
- `images.unoptimized` must NOT be `true`
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

### Layout Shift
- Images must have explicit `width`/`height` or container dimensions
- `opacity-0` animation elements must reserve space (use `transform` not layout props)
- Fixed `min-h-` values should be responsive (smaller on mobile)

## 3. Severity Levels

```
CRITICAL (major score impact — must fix):
- Image optimization disabled
- Broken meta tags (next/head in App Router)
- Missing viewport configuration
- Unoptimized LCP image (quality=100, no format conversion)

HIGH (noticeable score impact — should fix):
- Heavy dependency for minimal usage (e.g., icon library for 3 icons)
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

1. **Config fixes** — next.config.js image optimization, package imports
2. **Meta fixes** — Move `next/head` to metadata exports, add missing meta
3. **Image fixes** — Quality, placeholders, sizes, priority
4. **Bundle fixes** — Replace heavy deps with inline code, add dynamic imports
5. **Layout shift fixes** — Responsive min-heights, image dimensions
6. **Asset fixes** — Extract inline data URIs to static files

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
