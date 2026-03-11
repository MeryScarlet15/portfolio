---
name: analyzing-ux
description: Audit components and pages for UX design quality including missing states, interaction issues, visual hierarchy problems, and consistency violations. Use when reviewing UX, auditing usability, or before creating PRs with UI changes.
---

# Instructions

## Arguments

- `target` (optional): File path, folder path, or `pr` to analyze PR changes
- `scope` (optional): `file`, `folder`, `page`, `pr` (default: inferred from target)
- `focus` (optional): Specific category to focus on — `states`, `hierarchy`, `interactions`, `consistency`, `responsive` (default: all)

If no arguments provided, ask the user what file, folder, or page they want to audit.

## Workflow Overview

**CRITICAL**: Follow this workflow in order:

1. Identify target files
2. Build component tree (recursive, all depths)
3. Run automated detection (grep/glob patterns)
4. Manual UX review against heuristics
5. Generate report

## 1. Identify Target Files

### When given a file:
- Read the file and identify all local imports
- Build recursive component tree

### When given a folder or page:
- Find all `.tsx` files in the folder recursively
- Identify the `page.tsx` entry point and build full component tree
- Include `layout.tsx` if present

### When reviewing a PR (`scope: pr`):
- Get changed files via `git diff origin/main...HEAD --name-only`
- Filter to frontend `.tsx`/`.ts` files
- Build component trees for each changed page/component

## 2. Build Component Tree

Recursively traverse all local imports to understand the full component structure. Track:
- Which components render user interactions (`onClick`, `onSubmit`)
- Which components show states (loading/empty/error patterns)

## 3. Run Automated Detection

Read `context/detection-patterns.md` for all grep/glob commands. Run every applicable check on every target file.

Record all findings with file paths and line numbers before proceeding to manual review.

## 4. Manual UX Review

Read `context/ux-heuristics.md` for the full heuristic reference. Review each file against all categories (or focused category if `focus` argument provided).

For each category:
1. Check specific items from the heuristics
2. Compare against good patterns documented in the reference
3. Flag anti-patterns with severity level

### Severity Levels

```
CRITICAL (blocks good UX — must fix):
- Destructive actions without confirmation
- onClick on non-interactive elements (div, span)

WARNING (degrades UX — should fix):
- Poor content hierarchy
- Inconsistent button variants for same action types

SUGGESTION (improves UX — nice to have):
- Could add keyboard shortcuts
- Could improve animation timing
```

## 5. Generate Report

See `context/report-template.md` for output formats.

Use **full report** for file/folder/page analysis.
Use **quick mode** when called from PR reviewer or when `scope: pr`.

## Quick Mode

When `scope: pr` or called from the PR reviewer, use streamlined output:
- Only report CRITICAL and WARNING issues
- Skip passed checks
- Include verdict: `PASS` / `NEEDS_FIXES` / `SUGGESTIONS_ONLY`

## Verification

After generating the report:
- [ ] Every CRITICAL issue has a specific file:line reference
- [ ] Every issue has a concrete fix recommendation
- [ ] Report covers all heuristic categories (or focused category)
- [ ] Good patterns are acknowledged, not just violations
