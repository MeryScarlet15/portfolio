# UX Analysis Report Templates

## Full Report

```markdown
# UX Analysis: [target path]

## Overview
- **Files analyzed**: X
- **Component tree depth**: Y levels
- **Issues found**: X critical, Y warnings, Z suggestions

## Component Tree
```
page.tsx
├── ComponentA — has useQuery, has loading state ✅
│   ├── FormComponent — has useForm + zodResolver ✅
│   └── ListComponent — has .map(), missing empty state ❌
└── ComponentB — has useMutation, no success feedback ⚠️
```

## Category Results

### 1. User Feedback & States — X/10

| Severity | File:Line | Issue | Fix |
|----------|-----------|-------|-----|
| CRITICAL | component.tsx:45 | useQuery without loading state | Add loading check before render |
| WARNING | list.tsx:78 | List has no empty state | Add empty state with CTA |
| ✅ PASS | page.tsx | Has loading.tsx for route | — |

### 2. Forms & Input UX — X/10

| Severity | File:Line | Issue | Fix |
|----------|-----------|-------|-----|
| CRITICAL | form.tsx:23 | FormField without FormLabel | Add FormLabel inside FormItem |
| ✅ PASS | form.tsx | Uses zodResolver | — |

### 3. Information Architecture — X/10
[Same table format]

### 4. Visual Hierarchy — X/10
[Same table format]

### 5. Navigation & Wayfinding — X/10
[Same table format]

### 6. Interaction Design — X/10
[Same table format]

### 7. Consistency — X/10
[Same table format]

### 8. Responsive Design — X/10
[Same table format]

### 9. Error Prevention — X/10
[Same table format]

### 10. Performance UX — X/10
[Same table format]

## Summary

| Category | Score | Critical | Warnings | Suggestions |
|----------|-------|----------|----------|-------------|
| User Feedback & States | X/10 | 1 | 0 | 1 |
| Forms & Input UX | X/10 | 0 | 1 | 0 |
| ... | ... | ... | ... | ... |
| **Overall** | **X/10** | **N** | **N** | **N** |

## Recommendations (Priority Order)

### Critical (Must Fix)
1. [ ] Add loading state to ComponentA (component.tsx:45)
2. [ ] Add FormLabel to email field (form.tsx:23)

### Warnings (Should Fix)
3. [ ] Add empty state to list view (list.tsx:78)
4. [ ] Add success toast after save mutation (form.tsx:90)

### Suggestions (Nice to Have)
5. [ ] Consider skeleton placeholder instead of spinner
6. [ ] Add keyboard shortcut for common action
```

## When All Checks Pass

```markdown
# UX Analysis: [target path]

✅ **ALL UX CHECKS PASSED** — No issues found!

## Summary
- Files analyzed: X
- Categories checked: 10
- Overall Score: 10/10
```

## Quick Mode (for PR review)

```markdown
## UX Review

### Critical Issues: X found
- component.tsx:45 — Missing loading state for useQuery
- form.tsx:23 — FormField without FormLabel
- dialog.tsx:12 — DialogContent without DialogTitle

### Warnings: X found
- list.tsx:78 — No empty state for filtered results
- button.tsx:34 — Cancel button uses variant="default"

### Passed
- Form validation (zodResolver) ✅
- Destructive confirmations ✅
- Route loading.tsx ✅

### Verdict: PASS / NEEDS_FIXES / SUGGESTIONS_ONLY
```
