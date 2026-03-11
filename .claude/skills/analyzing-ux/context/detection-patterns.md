# UX Detection Patterns

Automated grep/glob commands for detecting UX issues. Run all applicable checks on every target file before manual review.

---

## 1. State Coverage

### Missing loading state (useQuery without loading check)

```bash
# Find files with useQuery
grep -l "useQuery\|useLazyQuery" FILE.tsx

# Check if the file handles loading
grep -c "loading\|isLoading\|Placeholder\|LoadingLine\|TbLoader2" FILE.tsx
# If useQuery exists but loading check count = 0 → CRITICAL
```

### Missing error state

```bash
# Files with useQuery but no error handling
grep -l "useQuery" FILE.tsx
grep -c "error\|Error\|toast\.error" FILE.tsx
# If useQuery exists but error count = 0 → CRITICAL
```

### Missing empty state for lists/tables

```bash
# Files rendering lists/tables
grep -nE "\.map\(|<Table|<DataTable" FILE.tsx

# Check for empty state handling
grep -c "length === 0\|\.length < 1\|!data\|no .* found\|empty" FILE.tsx
# If map/Table exists but no empty check → WARNING
```

### Missing loading.tsx for route segments

```bash
# Find page.tsx files without sibling loading.tsx
# For each directory containing page.tsx, check for loading.tsx
ls DIRECTORY/loading.tsx 2>/dev/null
# If page.tsx exists but loading.tsx doesn't → WARNING
```

---

## 2. Forms & Input UX

### FormField without FormLabel

```bash
# Find FormField without adjacent FormLabel
grep -c "FormField" FILE.tsx
grep -c "FormLabel" FILE.tsx
# If FormField count > FormLabel count → CRITICAL
```

### useForm without zodResolver

```bash
# Find forms without schema validation
grep -n "useForm" FILE.tsx | grep -v "zodResolver"
# If useForm exists without zodResolver → CRITICAL
```

### FormField without FormMessage

```bash
grep -c "FormField" FILE.tsx
grep -c "FormMessage" FILE.tsx
# If FormField count > FormMessage count → WARNING (validation errors won't display)
```

### Submit button without loading state

```bash
# Find submit handlers
grep -nE "onSubmit|handleSubmit|type=\"submit\"" FILE.tsx

# Check for loading state on submit
grep -c "isSubmitting\|submitting\|isPending\|mutation.*loading" FILE.tsx
# If submit exists but no loading indicator → CRITICAL
```

---

## 3. Interaction Design

### onClick on non-interactive elements

```bash
# Find onClick on div or span
grep -nE "<div[^>]*onClick|<span[^>]*onClick" FILE.tsx
# Each match → CRITICAL
```

### Destructive actions without Dialog confirmation

```bash
# Find delete/remove mutations
grep -nE "delete|remove|archive|destroy" FILE.tsx | grep -iE "useMutation|onClick|handle"

# Check for Dialog/confirmation
grep -c "Dialog\|confirm\|Confirm" FILE.tsx
# If destructive action exists but no Dialog → CRITICAL
```

### Missing disabled tooltip

```bash
# Find disabled buttons without title/tooltip
grep -nE "disabled[^}]*>" FILE.tsx | grep -v "title=\|Tooltip\|tooltip"
# Each match → WARNING
```

---

## 4. Visual Hierarchy

### Multiple primary CTAs

```bash
# Count default (primary) buttons in a single view
grep -c 'variant="default"\|<Button[^>]*>[^<]*</Button>' FILE.tsx
# If count > 1 and they're at the same level → WARNING
# (Manual verification needed — some may be in different sections)
```

### Cancel button not using outline variant

```bash
grep -nE "Cancel|Dismiss|Close" FILE.tsx | grep "Button" | grep -v 'variant="outline"\|variant="ghost"'
# Each match → WARNING
```

### Destructive button without destructive variant

```bash
grep -nE "Delete|Remove|Destroy|Archive" FILE.tsx | grep "Button" | grep -v 'variant="destructive"'
# Each match → WARNING (manual verification — may be non-button elements)
```

---

## 5. Consistency

### DialogContent without DialogTitle

```bash
grep -c "DialogContent" FILE.tsx
grep -c "DialogTitle" FILE.tsx
# If DialogContent > DialogTitle → CRITICAL (accessibility violation)
```

### DialogContent without DialogDescription

```bash
grep -c "DialogContent" FILE.tsx
grep -c "DialogDescription" FILE.tsx
# If DialogContent > DialogDescription → WARNING
```

### Inconsistent dialog footer structure

```bash
# Check dialog has a footer with Cancel + Action buttons
grep -c "DialogFooter" FILE.tsx
# If DialogContent exists but no DialogFooter → WARNING
```

---

## 6. Responsive Design

### Fixed widths without breakpoints

```bash
# Find fixed pixel widths
grep -nE "w-\[[0-9]+px\]|h-\[[0-9]+px\]|min-w-\[[0-9]+px\]|max-w-\[[0-9]+px\]" FILE.tsx

# Check if responsive variants exist nearby
grep -c "sm:|md:|lg:|xl:" FILE.tsx
# If fixed widths exist with no responsive variants in the file → WARNING
```

### Non-responsive grids

```bash
# Find grid without responsive columns
grep -nE "grid-cols-[2-9]" FILE.tsx | grep -v "sm:\|md:\|lg:"
# Each match → WARNING
```

---

## 7. Performance UX

### Data components without skeleton placeholders

```bash
# Find components with useQuery
grep -l "useQuery" FILE.tsx

# Check for skeleton/placeholder usage
grep -c "LoadingLine\|Placeholder\|placeholder\|Skeleton" FILE.tsx
# If useQuery but no skeleton reference → WARNING (consider using LoadingLine)
```

### Missing placeholder file for complex components

```bash
# For a component file, check if a placeholder file exists
ls "$(dirname FILE.tsx)/$(basename FILE.tsx .tsx)-placeholder.tsx" 2>/dev/null
# If component has useQuery but no placeholder file → SUGGESTION
```

---

## Quick Reference: Run All Checks

```bash
# For each target file, run these critical checks:

# 1. State: useQuery without loading
grep -l "useQuery" FILE && grep -cE "loading|Placeholder|LoadingLine" FILE

# 2. Forms: FormField without FormLabel
grep -c "FormField" FILE && grep -c "FormLabel" FILE

# 3. Forms: useForm without zodResolver
grep -n "useForm" FILE | grep -v "zodResolver"

# 4. Interaction: onClick on div/span
grep -nE "<div[^>]*onClick|<span[^>]*onClick" FILE

# 5. Interaction: Destructive without Dialog
grep -nE "delete|remove" FILE | grep -i "mutation\|onClick"

# 6. Consistency: Dialog without DialogTitle
grep -c "DialogContent" FILE && grep -c "DialogTitle" FILE

# 7. Submit without loading
grep -nE "onSubmit|handleSubmit" FILE && grep -c "isSubmitting\|isPending" FILE
```

Record all findings with `File:Line` references before proceeding to manual UX review.
