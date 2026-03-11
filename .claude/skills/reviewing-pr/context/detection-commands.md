# Pattern Violation Detection Commands

Use these commands to automatically detect critical violations before manual review.

**CRITICAL**: Run ALL these checks on EVERY changed file before proceeding with manual review.

---

## 1. Multiple Components Per File (CRITICAL)

### Detection Command
```bash
grep -cE "^export (function|const) [A-Z]|^(function|const) [A-Z].*=.*\(" filename.tsx

grep -nE "^export (function|const) [A-Z]|^(function|const) [A-Z].*=.*\(" filename.tsx
```

### Expected Result
- Count MUST be exactly **1**
- If count > 1 → **CRITICAL VIOLATION**

### Fix
Extract each component to its own file.

---

## 2. Desktop-First Responsive Patterns (CRITICAL)

### Detection Command
```bash
# Check for desktop-first patterns (base styles that should be mobile)
grep -nE "flex-row (phone|tablet|big-tablet|laptop|desktop):" filename.tsx
grep -nE "grid-cols-[2-9] (phone|tablet|big-tablet|laptop|desktop):" filename.tsx
```

### Expected Result
- Should return **no matches**
- If matches found → **CRITICAL VIOLATION** — styles should be mobile-first

### Fix
Base styles for mobile, then use `phone:`, `tablet:`, etc. for larger screens.

---

## 3. font-semibold Usage (WARNING)

### Detection Command
```bash
grep -nE "font-semibold" filename.tsx
```

### Expected Result
- Should return **no matches**
- If matches found → **WARNING** — use `font-medium` or `font-bold` instead

---

## Quick Reference Card

```bash
# Run these checks on every changed file:

# 1. Component count (must = 1)
grep -cE "^export (function|const) [A-Z]|^(function|const) [A-Z].*=.*\(" FILE.tsx

# 2. Desktop-first responsive
grep -nE "flex-row (phone|tablet|big-tablet|laptop|desktop):" FILE.tsx

# 3. font-semibold
grep -nE "font-semibold" FILE.tsx
```

**If ANY command (except #3) finds matches → CRITICAL VIOLATION → REQUEST CHANGES**
**#3 (font-semibold) → WARNING — use font-medium or font-bold instead**
