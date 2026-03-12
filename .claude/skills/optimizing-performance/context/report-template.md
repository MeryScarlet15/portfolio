# Report Templates

## Full Report (mode: audit or fix)

```markdown
# Performance & SEO Audit

## Score Estimation
- Images: PASS / NEEDS_FIXES
- Bundle: PASS / NEEDS_FIXES
- Meta & SEO: PASS / NEEDS_FIXES
- Layout Shift: PASS / NEEDS_FIXES
- Render Blocking: PASS / NEEDS_FIXES

## Issues Found

### Critical
| # | Category | File:Line | Issue | Fix |
|---|----------|-----------|-------|-----|
| 1 | Images | next.config.js:5 | Image optimization disabled | Remove `unoptimized: true` |

### High
| # | Category | File:Line | Issue | Fix |
|---|----------|-----------|-------|-----|
| 1 | Bundle | hero.tsx:6 | react-icons for 2 icons | Replace with inline SVGs |

### Medium
| # | Category | File:Line | Issue | Fix |
|---|----------|-----------|-------|-----|
| 1 | CLS | homepage.tsx:38 | Fixed min-h-[600px] on mobile | Add responsive `tablet:min-h-[600px]` |

### Low
| # | Category | File:Line | Issue | Fix |
|---|----------|-----------|-------|-----|

## Fixes Applied (mode: fix only)

| # | File | Before | After |
|---|------|--------|-------|
| 1 | next.config.js | `unoptimized: true` | removed |
| 2 | hero.tsx:65 | `quality={100}` | `quality={80}` |

## Passed Checks
- [x] Image optimization enabled
- [x] All images have width/height
- [x] Metadata exports present
- [x] No blocking scripts
- [x] Build passes

## Verdict
PASS / NEEDS_FIXES
```

## Quick Mode (from PR reviewer)

```markdown
### Performance Check: PASS / NEEDS_FIXES

**Critical:**
- [file:line] issue description

**High:**
- [file:line] issue description
```

Omit sections with no findings. If everything passes, output:

```markdown
### Performance Check: PASS
No performance issues found.
```
