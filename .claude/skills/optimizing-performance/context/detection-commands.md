# Automated Detection Commands

Run ALL of these checks. Record every match with file path and line number.

---

## Image Optimization

### Image optimization is intentionally disabled
`images.unoptimized: true` is set in next.config.js to avoid hosting costs. This means:
- Next.js will NOT auto-convert to WebP/AVIF or resize images
- **All images must be manually optimized** before adding to `public/images/`
- Use `cwebp -q 80 input.png -o output.webp` to convert images
- Target: <150KB per image, WebP format preferred

### Image quality set to 100
```bash
grep -rn "quality={100}" src/ --include="*.tsx"
```
**If found**: CRITICAL — quality=100 produces oversized images with no visual benefit over 80.

### Image quality above 85
```bash
grep -rn "quality={9[0-9]}" src/ --include="*.tsx"
```
**If found**: HIGH — quality above 85 has diminishing returns.

### Missing blur placeholder on static imports
```bash
grep -rn 'placeholder="empty"' src/ --include="*.tsx"
```
**If found**: HIGH — static imports should use `placeholder="blur"` for CLS prevention.

### Images without explicit dimensions
```bash
grep -B5 -A5 "<Image" src/ --include="*.tsx" -rn | grep -v "width\|height"
```
**Manual check**: Verify every `<Image>` has `width` and `height` props or a sized container.

### Large image files (>200KB)
```bash
find public/images -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) -size +200k -exec ls -lh {} \;
```
**If found**: HIGH — consider compressing or converting to WebP/AVIF.

---

## LCP (Largest Contentful Paint)

### LCP image missing preload
```bash
grep -rn "rel=\"preload\"" src/app/layout.tsx 2>/dev/null
```
**If NOT found**: CRITICAL — the LCP image (usually hero) must have a `<link rel="preload">` in layout head so the browser discovers it before JS hydration.

### LCP image using static import (hashed URL)
```bash
grep -rn "^import.*from.*public/images" src/ --include="*.tsx" | grep -i "hero\|banner\|main"
```
**If found**: HIGH — Static imports get hashed filenames (`/_next/static/media/hero.[hash].webp`) that can't match a preload href. Use string `src="/images/hero.webp"` instead for LCP images.

### Missing fetchpriority on preload
```bash
grep -n "rel=\"preload\"" src/app/layout.tsx 2>/dev/null | grep -v "fetchPriority"
```
**If found without fetchPriority**: HIGH — preloaded LCP images should have `fetchPriority="high"`.

---

## Accessibility (Performance Score Impact)

### Color contrast issues
```bash
grep -rn "text-white.*bg-teal\|bg-teal.*text-white" src/ --include="*.tsx"
```
**If found**: CRITICAL — white (#fff) on teal-500 (#14b8a6) has contrast ratio 2.48 (needs 4.5:1). Use `text-black-100` on teal backgrounds.

### Check all bg + text color combinations
Manual check: For each component with colored backgrounds, verify contrast ratio meets WCAG AA (4.5:1 normal text, 3:1 large text / bold text >=14pt).

Known safe combinations:
- `text-black-100` on `bg-teal-500` = 6.85 (PASS)
- `text-white` on `bg-black-100` = 14.35 (PASS)
- `text-white` on `bg-teal-500` = 2.49 (FAIL)

---

## Bundle Size

### Heavy icon libraries
```bash
grep -rn "react-icons\|@fortawesome\|@heroicons" src/ --include="*.tsx" --include="*.ts"
```
**If found**: Count unique icons used. If <10, replace with inline SVGs.

### Framer Motion usage count
```bash
grep -rn "from 'framer-motion'\|from \"framer-motion\"" src/ --include="*.tsx" --include="*.ts"
```
**If found in <3 files**: Consider if CSS animations could replace it.

### Client components check
```bash
grep -rn "'use client'" src/ --include="*.tsx" --include="*.ts" -l
```
**Review**: Each client component adds to the JS bundle. Verify each one needs client interactivity.

### Lightweight dependencies that could be native code
```bash
grep -rn "react-intersection-observer\|use-debounce\|classnames\|clsx" package.json 2>/dev/null
```
**If found**: Check usage count. Libraries with native API equivalents (IntersectionObserver, setTimeout, template literals) can be replaced with ~20 lines of inline code.

### Desktop-only components loaded everywhere
```bash
grep -rn "hidden.*tablet:block\|hidden.*md:block\|hidden.*lg:block" src/ --include="*.tsx"
```
**Cross-reference**: If the component uses heavy JS (framer-motion, event listeners), it should be dynamically imported.

---

## Meta & SEO

### Broken next/head usage in App Router
```bash
grep -rn "from 'next/head'\|from \"next/head\"" src/app/ --include="*.tsx" --include="*.ts"
```
**If found**: CRITICAL — `next/head` silently fails in App Router. Must use `metadata` export.

### Missing metadata export
```bash
grep -rn "export const metadata\|export.*generateMetadata" src/app/layout.tsx src/app/page.tsx 2>/dev/null
```
**If NOT found in layout.tsx**: CRITICAL — page has no SEO metadata.

### Missing viewport export
```bash
grep -rn "export const viewport" src/app/layout.tsx 2>/dev/null
```
**If NOT found**: HIGH — viewport configuration missing (defaults may not be optimal).

### Missing OpenGraph tags
```bash
grep -rn "openGraph" src/app/layout.tsx src/app/page.tsx 2>/dev/null
```
**If NOT found**: MEDIUM — social sharing will use defaults.

---

## Layout Shift (CLS)

### Large fixed min-heights
```bash
grep -rn "min-h-\[[4-9][0-9][0-9]px\]\|min-h-\[[0-9][0-9][0-9][0-9]px\]" src/ --include="*.tsx"
```
**If found without responsive variant**: MEDIUM — fixed large min-heights waste space on mobile.

### Opacity-0 animation elements
```bash
grep -rn "opacity-0" src/ --include="*.tsx"
```
**Review**: Elements starting at opacity-0 that animate in should use `transform` (not layout properties) to avoid CLS.

---

## Render Blocking

### Inline data URIs (>500 chars)
```bash
grep -rn "data:image" src/ --include="*.tsx" --include="*.ts" | awk '{ if (length > 600) print FILENAME":"NR": [LONG DATA URI]" }'
```
**If found**: MEDIUM — extract to static files in `public/` for caching.

### External blocking scripts
```bash
grep -rn "<script" src/app/layout.tsx src/app/page.tsx 2>/dev/null | grep -v "async\|defer\|next/script"
```
**If found**: HIGH — blocking scripts delay rendering.
