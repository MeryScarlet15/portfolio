# Automated Detection Commands

Run ALL of these checks. Record every match with file path and line number.

---

## Image Optimization

### Disabled image optimization in config
```bash
grep -rn "unoptimized.*true" next.config.js next.config.ts next.config.mjs 2>/dev/null
```
**If found**: CRITICAL — all Next.js image optimization is disabled.

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
