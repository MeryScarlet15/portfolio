# UX Heuristics Reference

10 categories for auditing UX quality. Each category includes specific checks, good patterns from this codebase, and anti-patterns to flag.

---

## 1. User Feedback & States

Every component that fetches data or performs actions must communicate its state to the user.

### Checks

- **Loading state**: Components using `useQuery` must show a loading indicator (placeholder, `LoadingLine`, or `TbLoader2`) while data loads
- **Error state**: Components using `useQuery`/`useMutation` must handle error with a user-facing message
- **Empty state**: Lists/tables must show a meaningful message when no data exists, ideally with a CTA
- **Success feedback**: Mutations should confirm success via `toast.success()` or visual state change
- **Disabled state**: Buttons that can't be clicked must be visually disabled AND explain why (tooltip)

### Good Patterns

```tsx
// Loading → Error → Empty → Data pattern
// See: credit-assessment-view.tsx
if (loading && !data) return <Placeholder />;
if (error && !data) return <ErrorMessage />;
if (!data) return <EmptyState />;
return <DataView data={data} />;

// Loading placeholder matching layout
// See: workspace-credits-placeholder.tsx — mirrors the real component structure

// Loading.tsx for route segments
// See: app/(loggedIn)/loading.tsx — uses LoadingScreen
import { LoadingScreen } from "@/app/common/components/composed/page-loading/loading-screen";
export default LoadingScreen;
```

### Anti-Patterns

- `useQuery` with no loading check — user sees empty/broken UI
- Spinner-only loading (no skeleton) for content-heavy pages
- `if (error) return null` — silently hides errors
- Empty table with no message — user doesn't know if data is loading or missing
- Disabled button with no tooltip explaining why

---

## 2. Forms & Input UX

Forms must validate input, provide feedback, and prevent submission errors. Reduce cognitive load by minimizing fields — only ask for what's necessary.

### Checks

- **Labels**: Every `FormField` must have a `FormLabel` — inputs without labels fail accessibility
- **Validation**: `useForm` must use `zodResolver` for schema validation
- **Validation feedback**: Invalid fields must show `FormMessage` with the error
- **Submit loading**: Submit button must show loading state during mutation (`isSubmitting` or mutation loading)
- **Field grouping**: Related fields should be visually grouped
- **Default values**: Edit forms must populate with existing data
- **Form reset**: Forms in dialogs must reset when dialog closes
- **Microcopy**: CTAs and sensitive inputs should have supporting helper text for reassurance or guidance (e.g., "We never share your data", "Password must be 8+ characters")
- **Field count**: Minimize form fields to only what's required — fewer fields reduce friction

### Good Patterns

```tsx
// Form with zodResolver, labels, and validation feedback
// See: mock-taxprep-form.tsx, preparer-dialog.tsx
const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { ... },
});

<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Label</FormLabel>
      <FormControl><Input {...field} /></FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

// Submit with loading state
<Button disabled={form.formState.isSubmitting}>
  {form.formState.isSubmitting ? <TbLoader2 className="animate-spin" /> : "Save"}
</Button>
```

### Anti-Patterns

- `<Input>` without a `<FormLabel>` — unlabeled input
- `useForm` without `zodResolver` — no schema validation
- `FormField` without `FormMessage` — validation errors not shown
- Submit button without loading/disabled state during mutation
- Form in dialog that retains stale values on reopen

---

## 3. Information Architecture

Content must be organized in a logical hierarchy that helps users find what they need. Reduce cognitive load by showing only what's relevant at each step.

### Checks

- **Content grouping**: Related information is grouped together (articles, sections, fieldsets)
- **Progressive disclosure**: Complex content uses expandable sections, tabs, or stepped flows — don't show everything at once
- **Layout components**: Uses `WideLayout` v2 and subcomponents for page layouts
- **Section headings**: Groups of content have clear headings
- **Data density**: Pages don't overwhelm with too much data at once
- **Scanning patterns**: Primary content and CTAs are positioned along natural F-pattern or Z-pattern scan paths
- **3-second clarity**: Users should understand the page purpose and primary action within 3 seconds

### Good Patterns

```tsx
// WideLayout v2 for page structure
// See: Storybook — layout/wide-layout.stories.tsx
<WideLayout.Root>
  <WideLayout.Header>...</WideLayout.Header>
  <WideLayout.Content>...</WideLayout.Content>
</WideLayout.Root>

// Tabs for categorized content
// Resizable panels for master-detail views
```

### Anti-Patterns

- Flat list of 20+ items with no grouping or categorization
- All content visible at once with no progressive disclosure
- Missing section headings between different content types
- Custom layout instead of `WideLayout` v2

---

## 4. Visual Hierarchy

Visual cues must guide users to the most important elements first.

### Checks

- **Primary CTA**: Each view has at most ONE primary action button (`variant="default"`)
- **Button variants**: Destructive actions use `variant="destructive"`, secondary actions use `variant="outline"` or `variant="ghost"`
- **Typography scale**: Headings use the design system scale from `headings.css` — no arbitrary `text-[Xpx]`
- **Weight hierarchy**: `font-bold` for headings, `font-medium` for labels, `font-normal` for body
- **Spacing hierarchy**: More space between major sections, less between related items

### Good Patterns

```tsx
// Single primary CTA with supporting secondary actions
<div className="flex gap-2">
  <Button variant="outline" onClick={onCancel}>Cancel</Button>
  <Button onClick={onSave}>Save changes</Button> {/* Primary */}
</div>

// Destructive action with proper variant
<Button variant="destructive" onClick={onDelete}>Delete</Button>
```

### Anti-Patterns

- Multiple `variant="default"` buttons competing for attention
- Destructive action using default (blue) button variant
- Cancel button using `variant="default"` instead of `variant="outline"`
- Arbitrary font sizes (`text-[14px]`) instead of design system scale
- `font-semibold` usage (only `font-normal`, `font-medium`, `font-bold` allowed)

---

## 5. Navigation & Wayfinding

Users must always know where they are and how to get back.

### Checks

- **Breadcrumbs**: Deep pages (3+ levels) should show breadcrumbs or back navigation
- **Back navigation**: Detail pages should have a clear way to return to the list
- **URL reflects state**: Active tab, filters, and pagination should be in URL params
- **Active states**: Current navigation item is visually highlighted
- **Deep linking**: Key states are linkable via URL

### Good Patterns

```tsx
// URL params for state (via next-patterns.md)
// useSearchParams for filters, tabs, pagination
const searchParams = useSearchParams();
const tab = searchParams.get("tab") ?? "overview";
```

### Anti-Patterns

- Detail page with no way to go back to the list
- Tabs that use `useState` instead of URL params (state lost on refresh)
- Filters that reset on navigation
- No breadcrumbs on a page 4 levels deep in the route hierarchy

---

## 6. Interaction Design

Interactive elements must be accessible and predictable. Interactions should respond within 100ms for optimal perceived performance.

### Checks

- **Click targets**: Interactive elements are at least 44x44px on touch and 32x32px on desktop
- **Semantic elements**: Use `<button>` for actions, `<a>` for navigation — never `onClick` on `<div>` or `<span>`
- **Focus states**: Interactive elements have visible focus indicators (critical for keyboard users)
- **Destructive confirmations**: Delete/remove actions require confirmation via `Dialog`
- **Hover states**: Interactive elements provide hover feedback
- **Keyboard navigation**: Key flows are accessible via keyboard (Tab, Enter, Escape)
- **Alt text**: Images must have meaningful `alt` text (not empty or generic)
- **Heading hierarchy**: Pages use proper heading levels (`h1` > `h2` > `h3`) without skipping levels
- **Color contrast**: Interactive elements and text must not rely solely on color to convey meaning

### Good Patterns

```tsx
// Semantic button elements
// See: preparer-tax-preps-filters.tsx — uses <button type="button">
<button type="button" className={cn(...)} onClick={handleClick}>
  {label}
</button>

// Destructive action with Dialog confirmation
// See: delete-category-dialog.tsx
<Dialog>
  <DialogTrigger asChild><Button variant="destructive">Delete</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete category</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
      <Button variant="destructive" onClick={onConfirm} disabled={loading}>
        {loading ? <TbLoader2 className="animate-spin" /> : "Delete"}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Anti-Patterns

- `<div onClick={...}>` — not keyboard accessible, no semantic role
- `<span onClick={...}>` — same issue
- Delete button with no confirmation dialog
- Interactive element with no hover/focus visual feedback
- Tiny click targets (icons without padding)
- `<img>` without `alt` attribute or with `alt="image"`
- Skipped heading levels (e.g., `h1` followed by `h3`)
- Status indicated only by color (red/green) without icon or text

---

## 7. Consistency

Same patterns should look and behave the same throughout the app.

### Checks

- **Button variants**: Same action type uses the same variant everywhere (Cancel = `outline`, Delete = `destructive`)
- **Dialog structure**: All dialogs follow `DialogContent > DialogHeader > DialogTitle + DialogDescription > DialogFooter` structure
- **Empty states**: All empty states follow the same visual pattern
- **Loading patterns**: Same type of content uses the same loading pattern (placeholder vs spinner)
- **Toast patterns**: Success/error toasts follow the same structure
- **Action labels**: Same actions use the same verbs ("Delete" vs "Remove" — pick one)

### Good Patterns

```tsx
// Consistent dialog structure
<DialogContent>
  <DialogHeader>
    <DialogTitle>Title</DialogTitle>
    <DialogDescription>Description</DialogDescription>
  </DialogHeader>
  {/* Content */}
  <DialogFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </DialogFooter>
</DialogContent>

// Consistent toast usage
toast.success("Item created successfully");
toast.error("Failed to create item");
```

### Anti-Patterns

- Cancel button using `variant="ghost"` in one dialog and `variant="outline"` in another
- `DialogContent` without `DialogTitle` (accessibility violation)
- Some empty states with icons, others without
- Some lists using `LoadingLine` placeholders, others using `TbLoader2` spinner
- Inconsistent action verbs: "Delete" in one place, "Remove" in another for the same action

---

## 8. Responsive Design

UI must work across viewport sizes used by the product's audience.

### Checks

- **No fixed widths**: Avoid `w-[Xpx]` without responsive alternatives (`sm:`, `md:`, `lg:` breakpoints)
- **Responsive grids**: Grid layouts adapt to screen size
- **Text overflow**: Long text is handled with truncation (`truncate`, `line-clamp-*`)
- **Mobile-friendly inputs**: Touch-friendly sizing for form elements on small screens
- **Responsive tables**: Tables have horizontal scroll or card layout on small screens

### Good Patterns

```tsx
// Responsive with Tailwind breakpoints
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// Text truncation
className="truncate max-w-[200px]"

// Responsive table with overflow
<div className="overflow-x-auto">
  <Table>...</Table>
</div>
```

### Anti-Patterns

- `w-[600px]` with no responsive alternative
- Grid that doesn't collapse on mobile (`grid-cols-4` without breakpoint variants)
- Long text that breaks layout (no `truncate` or `line-clamp-*`)
- Fixed pixel heights that don't adapt

---

## 9. Error Prevention

Design should prevent errors before they happen, not just handle them after.

### Checks

- **Destructive confirmation**: All irreversible actions (delete, remove, archive) require confirmation dialog
- **Dirty form guards**: Unsaved changes warn before navigation (especially in complex forms)
- **Input constraints**: Numeric inputs use `type="number"`, email inputs use `type="email"`
- **Character limits**: Text inputs with limits show remaining count
- **Autosave indicators**: If autosave is used, show save status to user

### Good Patterns

```tsx
// Confirmation dialog before delete
// See: delete-category-dialog.tsx

// Input type constraints
<Input type="email" placeholder="user@example.com" />
<Input type="number" min={0} />
```

### Anti-Patterns

- Delete button that immediately deletes without confirmation
- Form with unsaved changes that navigates away without warning
- Free-text input where a select/dropdown would be more appropriate
- No character limit indicator on textarea with a backend limit

---

## 10. Performance UX

Perceived performance matters as much as actual performance.

### Checks

- **Skeleton screens**: Content-heavy pages use `LoadingLine` placeholders instead of generic spinners
- **Route loading**: Route segments have `loading.tsx` files exporting `LoadingScreen`
- **Optimistic updates**: Simple mutations (toggle, reorder) update UI immediately
- **Pagination/virtualization**: Long lists use infinite scroll or pagination, not render-all
- **Lazy loading**: Heavy components/modals load on demand

### Good Patterns

```tsx
// Skeleton placeholder matching component structure
// See: workspace-credits-placeholder.tsx
// Named: [component-name]-placeholder.tsx

// Route loading.tsx
// See: app/(loggedIn)/loading.tsx
import { LoadingScreen } from "@/app/common/components/composed/page-loading/loading-screen";
export default LoadingScreen;

// Infinite scroll pattern
// See: use-tax-preps.tsx — loadMore/hasMore pattern
```

### Anti-Patterns

- Full-page spinner for a page that has known content structure (should use skeleton)
- Route segment without `loading.tsx` — shows nothing during load
- List that renders 1000+ items without pagination or virtualization
- Modal with heavy content that loads synchronously
- No loading feedback during mutations (button doesn't show spinner)
