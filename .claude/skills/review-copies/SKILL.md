---
name: review-copies
description: Review UI copy/text in files or folders for typos, placeholder text, and consistency with the rest of the product. Use when adding new UI text, reviewing PR copies, or auditing existing copy quality.
---

# Instructions

## Arguments

- `file` (optional): Path to a specific file or folder to review
- `scope` (optional): Scope of review - `file`, `folder`, `pr` (default: inferred from input)

If no arguments provided, ask the user what file or folder they want to review.

## Workflow Overview

**CRITICAL**: Always follow this workflow in order:

1. Identify target files containing UI copy
2. Extract all user-facing strings from each file
3. Check for typos and spelling errors
4. Check for placeholder/dummy copy
5. Check for consistency with existing product copy
6. Generate a comprehensive report with findings and suggestions

## 1. Identify Target Files

### When given a file:
- Read the file and extract all user-facing strings

### When given a folder:
- Find all `.tsx` and `.ts` files in the folder (recursively)
- Filter to files that contain user-facing strings

### When reviewing a PR (`scope: pr`):
- Get all changed files from the PR diff
- Filter to frontend files (`.tsx`, `.ts`)
- Focus only on added/modified lines containing strings

### What counts as user-facing copy:

Look for strings in these patterns:
- JSX text content: `<p>This is copy</p>`, `<span>Label</span>`
- JSX attribute strings: `title="..."`, `alt="..."`
- Template literals in JSX: `` {`Hello ${name}`} ``

### What to SKIP (not user-facing):
- Import statements
- Variable names, function names, type definitions
- Console.log messages
- CSS class names
- File paths and URLs
- Comments in code

## 2. Extract User-Facing Strings

For each target file:

1. Read the file content
2. Identify all user-facing strings (see patterns above)
3. Record each string with its line number and context (what component/element it's in)

## 3. Check for Typos and Spelling Errors

Review each extracted string for:

### Common typo patterns:
- Misspelled words
- Double words ("the the", "is is")
- Missing spaces ("ofthe" instead of "of the")
- Extra spaces ("of  the")
- Wrong capitalization in sentences (random capitals mid-sentence)
- Missing or extra punctuation
- Wrong apostrophe usage ("it's" vs "its", "you're" vs "your")
- Common confusions: "then/than", "affect/effect", "there/their/they're"

## 4. Check for Placeholder and Dummy Copy

**CRITICAL**: Flag ANY of these patterns as placeholder copy:

### Obvious placeholders:
- "Lorem ipsum" or any lorem ipsum text
- "TODO", "FIXME", "HACK", "XXX" in strings
- "placeholder", "temp", "temporary" in user-facing strings
- "test", "testing", "example" as actual UI copy
- "foo", "bar", "baz", "qux" as displayed text
- "TBD", "TBC", "N/A" used as copy (unless intentional)
- "Title here", "Description here", "Text goes here" patterns
- "Some text", "Some description", "Some label" patterns
- "Click here" (vague CTA)

## 5. Check for Consistency

### Consistency with the product:
To assess consistency, examine existing copy patterns in the codebase:

#### Capitalization patterns:
- Check if the product uses Title Case or Sentence case for headings
- Find 3-5 similar existing components and compare capitalization style

#### Tone and voice:
- Should match existing messaging patterns across the site

#### Terminology:
- Use the same terms as the rest of the product for the same concepts

## 6. Generate Report

```markdown
# Copy Review: [file/folder path]

## Summary
- **Files reviewed**: X
- **Total strings analyzed**: X
- **Issues found**: X (Y critical, Z warnings)

## Typos Found

### File: [path]
| Line | Current Copy | Issue | Suggested Fix |
|------|-------------|-------|---------------|
| 45 | "Clinet profile" | Misspelling | "Client profile" |

## Placeholder Copy Found

### File: [path]
| Line | Copy | Issue |
|------|------|-------|
| 23 | "Lorem ipsum dolor sit" | Placeholder text |

## Consistency Issues

### File: [path]
| Line | Current Copy | Issue | Suggested Fix |
|------|-------------|-------|---------------|
| 34 | "no items found" | Lowercase | "No items found" |

## Recommendations

### Critical (Must Fix)
- [ ] Fix typo: "Clinet" -> "Client" (file.tsx:45)

### Suggestions
- [ ] Consider more descriptive text (file.tsx:67)
```

## Quick Mode

When called from the PR reviewer, use a streamlined output:

```markdown
## Copy Review

### Issues Found
- **Typos**: X found
  - file.tsx:45 - "Clinet" -> "Client"
- **Placeholders**: X found
  - file.tsx:23 - "Lorem ipsum..." (placeholder text)

### Verdict: PASS / NEEDS_FIXES
```
