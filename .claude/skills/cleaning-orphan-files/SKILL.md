---
name: cleaning-orphan-files
description: Find and remove orphan files — unused components, hooks, utilities, types, and assets that are not imported or referenced anywhere in the codebase. Use when cleaning up dead code, after large refactors, auditing unused files, or reducing bundle size.
---

# Instructions

## Arguments

- `scope` (required): Path to scan — `src/components`, `src/modules`, or `.` for the entire project
- `dry-run` (optional): If `true`, report orphans without deleting (default: `false`)
- `include-types` (optional): Comma-separated file types to check (default: `ts,tsx,css`). Use `all` for everything.

## 1. Build the file inventory

Scan `scope` for all source files matching `include-types`. Exclude:

- `node_modules/`, `.next/`, `build/`, `.claude/`
- Config files at project root (`next.config.js`, `postcss.config.mjs`, `tsconfig.json`, `package.json`)
- Entry points: `layout.tsx`, `page.tsx`, `globals.css`
- Markdown files (`*.md`)
- Declaration files (`*.d.ts`)

## 2. Build the import graph

For each file in the inventory, extract all import/export references:

- `import ... from './path'`
- `export ... from './path'`
- Dynamic `import('./path')`
- CSS `@import` statements
- Re-exports in barrel files (`index.ts`)

## 3. Identify orphan files

A file is an **orphan** if:

1. It is NOT an entry point (see exclusions in Step 1)
2. It is NOT imported by any other file in the codebase
3. It is NOT re-exported from a barrel file (`index.ts`)

### Special cases

- **Barrel files** (`index.ts`): Orphan only if no file imports from the barrel's directory
- **CSS files**: Check for `@import` references
- **Assets** (images, SVGs, fonts): Check for references in TSX/HTML/CSS files

## 4. Report findings

Present results grouped by directory:

```
## Orphan Files Found: [count]

### src/components/
- `old-button.tsx` — 0 imports found

### src/modules/
- `deprecated-section.tsx` — 0 imports found

### Summary
- Total files scanned: [n]
- Orphan files found: [n]
- Estimated size savings: [size]
```

## 5. Clean up (if not dry-run)

For each orphan file, before deleting:

1. Double-check: search the entire repo for the filename (not just imports — it could be referenced in docs, comments, or configs)
2. If the file is the only file in its directory, flag the directory for removal too
3. Delete the file
4. If the parent directory is now empty, delete it

**Never delete without confirming** — present the full list and ask the user for approval before removing anything.

## 6. Post-cleanup verification

After deletion:

- [ ] `bun run prettier:check` passes — no broken imports
- [ ] No remaining `import` statements pointing to deleted files (grep for deleted filenames)
- [ ] If any errors found, restore the file and report it as a false positive
