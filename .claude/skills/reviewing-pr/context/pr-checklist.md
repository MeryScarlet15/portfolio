# PR Review Checklist

## Component Patterns

### Size & Structure
- [ ] Components under 300 lines
- [ ] Max 3-4 div nesting levels
- [ ] Max 3-4 props per component
- [ ] **EXACTLY ONE component per file** (CRITICAL - BLOCKING - NO EXCEPTIONS)
- [ ] Props defined as separate exported types (not inline)

### Naming Conventions
- [ ] Files: `kebab-case.tsx`
- [ ] Components: `PascalCase`
- [ ] Hooks/Utils: `camelCase`
- [ ] Types/Interfaces: `PascalCase`

### Styling
- [ ] Colors use project tokens from `globals.css` `@theme` block
- [ ] Font weights: only `font-normal`, `font-medium`, `font-bold` (never `font-semibold`)
- [ ] Spacing between siblings uses `flex gap-*`, not `mt-*` / `mb-*` / `mr-*`

### Mobile-First (CRITICAL - BLOCKING)
- [ ] **Responsive styles are mobile-first** — base styles for mobile, `phone:`/`tablet:`/etc. for larger screens
  - ❌ `flex-row tablet:flex-col`, `grid-cols-3 tablet:grid-cols-1`
  - ✅ `flex-col tablet:flex-row`, `grid-cols-1 phone:grid-cols-2 tablet:grid-cols-3`

### Animations
- [ ] Initial animation states use inline `style={{ transform }}`, not Tailwind `translate-*`
- [ ] Custom animation utilities from `@theme` are used

## Code Quality

### Architecture
- [ ] No unused imports or dead code
- [ ] Components in `src/components/` (reusable) or `src/modules/` (page sections)

## Copy Quality

### Typos & Spelling
- [ ] No typos in user-facing strings
- [ ] No double words ("the the", "is is")
- [ ] Correct apostrophe usage

### Placeholder Copy (CRITICAL - BLOCKING)
- [ ] **No placeholder text** (Lorem ipsum, TODO, FIXME, "Click here", "Some description")
- [ ] No generic/dummy copy ("test", "example", "foo", "bar")
- [ ] All descriptions and labels are meaningful

## Formatting

- [ ] `bun run prettier:check` passes with no errors

## Code Cleanup & Dead Code Removal

### Orphaned Files
- [ ] When removing an import/export, check if the referenced file becomes orphaned
- [ ] Delete files that are no longer referenced
- [ ] Verify prettier still passes after cleanup
