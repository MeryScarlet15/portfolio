---
name: reviewing-pr
description: Comprehensive code review of staged/committed changes validating component patterns, styling, naming conventions, and code quality. Use before creating a pull request, before pushing commits, or when reviewing code for pattern compliance.
---

# Instructions

**CRITICAL REQUIREMENT**: Before ANY manual review, you MUST run automated violation checks on ALL changed files. Do NOT skip this step.

---

## 0. Run Automated Violation Detection (MANDATORY FIRST STEP)

Read `context/detection-commands.md` for all grep commands and expected output. Run every check on every changed `.tsx`/`.ts` file before proceeding.

**If ANY check finds violations:**
1. Record the violation with file path and line numbers
2. Mark as CRITICAL in your review
3. Add to "Critical Issues" section of final report
4. Continue checking remaining files

---

## 1. Identify changes to review

**CRITICAL**: Always review ALL changes in the PR, not just the last commit.

### Step 1: Check git status
```bash
git status
git diff --staged --name-only
git diff --name-only
```

### Step 2: If no staged/unstaged changes, review all commits on branch
```bash
git log origin/main..HEAD --oneline
git diff origin/main...HEAD --name-only
git diff origin/main...HEAD --stat
git diff origin/main...HEAD
```

### Step 3: Use the appropriate diff based on context

- **If staged changes exist**: Review `git diff --staged`
- **If unstaged changes exist**: Review `git diff`
- **If working tree is clean**: Review `git diff origin/main...HEAD` (ALL PR changes)

## 2. Get detailed diff and read files

### For small PRs (<5 files):
```bash
git diff origin/main...HEAD 'path/to/file.tsx'
```

### For large PRs (5+ files):
- Use `git diff origin/main...HEAD --stat` to see overview
- Use `Read` tool to read each changed file individually
- Compare with git diff to understand what changed

## 3. Load PR checklist and detection commands

Read `context/pr-checklist.md` for the full checklist of what to verify.

## 3.5. Run Copy Review on Changed Files (MANDATORY)

**For ALL changed frontend files** (`.tsx`, `.ts`), run the **review-copies** skill in **Quick Mode**:

1. Identify all added/modified lines containing user-facing strings
2. Follow `.claude/skills/review-copies/SKILL.md` workflow
3. Check for typos, placeholder copy, and consistency
4. Record any copy issues alongside the automated violation results from Step 0

## 3.7. Run UX Review on Changed UI Files (OPTIONAL)

**For PRs that add or modify UI components** (new pages, forms, dialogs, or significant layout changes), run the **analyzing-ux** skill in **Quick Mode**:

1. Identify changed files that render UI (skip hooks-only or utility files)
2. Follow `.claude/skills/analyzing-ux/SKILL.md` workflow with `scope: pr`
3. Record UX issues alongside copy and pattern violation results

**Skip this step** if the PR only modifies hooks, utilities, types, or non-UI code.

## 4. Review each file systematically

By this point, you should have already run automated checks (Step 0), copy review (Step 3.5), and optionally UX review (Step 3.7).

Now proceed with manual checklist review:
- Follow checklist items from `context/pr-checklist.md`
- Mark each item as pass/fail
- Note line numbers for violations
- **ALL checklist violations are CRITICAL** — treat every failed check as blocking

## 5. Reference detailed rules when needed

- `.claude/rules/styling-patterns.md` — Styling rules (breakpoints, colors, spacing, animations)
- `AGENTS.md` — Architecture overview

## 6. Output format

```markdown
# PR Review Summary

## Overview
- Files changed: X

## Issues Found

### Critical Issues
- [File:Line] Description of critical issue
  - Rule violated: [rule reference]
  - Suggestion: How to fix

### Warnings
- [File:Line] Description of warning
  - Suggestion: How to improve

### Suggestions
- [File:Line] Optional improvement

## Passed Checks
- [x] Component patterns compliance
- [x] Naming conventions compliance
- [x] Colors use project tokens
- [x] Mobile-first responsive styles
- [ ] etc.

## Recommendation
- APPROVE / REQUEST_CHANGES / NEEDS_DISCUSSION
```

## Issue Priority Levels

- **Critical (BLOCKING)**:
  - Multiple components in same file
  - Desktop-first responsive patterns (base styles should be mobile)
  - Security issues, broken patterns, potential bugs
  - ANY checklist item that fails

- **Warning**:
  - Code style preferences not covered by prettier
  - Minor consistency issues

- **Suggestion**:
  - Optional optimizations
  - Nice-to-have improvements
