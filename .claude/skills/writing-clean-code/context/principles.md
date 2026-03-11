# Clean Code Principles — Detailed Reference

Loaded on demand from [SKILL.md](../SKILL.md). Contains detailed guidance and examples.

---

## SOLID Principles

### Single Responsibility Principle (SRP)

A module should have one, and only one, reason to change.

**How to apply:**

- Ask: "What does this module do?" If the answer contains "and", split it.
- Each file should represent one concept: one component, one hook, one utility, one service.
- Separate data fetching from data transformation from rendering.

**Violation signals:**
- File is over 300 lines
- Multiple unrelated imports at the top
- Changes to feature A require touching the same file as feature B

### Open/Closed Principle (OCP)

Modules should be open for extension, closed for modification.

**How to apply:**

- Use composition: wrap or combine existing behavior instead of modifying it
- Strategy pattern: pass behavior as a function parameter or prop
- React: use render props, children, or HOCs to extend components

**Violation signals:**
- Adding a new feature requires modifying a switch/if-else chain
- Existing tests break when adding unrelated functionality

### Liskov Substitution Principle (LSP)

Subtypes must be usable wherever their base type is expected.

**How to apply:**

- Component variants must accept the same base props as their parent
- Extended types must honor the contracts of their base types
- If a function accepts a base type, any subtype must work without surprises

**Violation signals:**
- Type assertions (`as`) to make a subtype fit
- Conditional logic based on the specific subtype inside generic code

### Interface Segregation Principle (ISP)

No client should depend on methods it does not use.

**How to apply:**

- Props interfaces: only include what the component actually uses
- Split large interfaces into smaller, composable ones
- Use `Pick<>` or `Omit<>` to narrow types at consumption points
- Prefer multiple small hooks over one monolithic hook

**Violation signals:**
- Components receiving props they pass through but never read
- Interfaces with optional fields that are only used by some consumers

### Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions.

**How to apply:**

- Accept dependencies via function parameters, props, or context — don't import them directly in business logic
- Use TypeScript interfaces to define contracts between modules
- React context for injecting services and configuration
- Test doubles become trivial when dependencies are injected

**Violation signals:**
- Direct `import` of concrete implementations inside business logic
- Hard-coded API URLs, storage keys, or service instances
- Difficult to test because dependencies can't be swapped

---

## Simplicity Over Cleverness

### The Rule of Three

Don't abstract until you have three concrete instances of the pattern. Two occurrences are a coincidence; three are a pattern.

1. **First time**: Just write the code inline
2. **Second time**: Note the duplication but keep it inline
3. **Third time**: Now extract a shared abstraction

### Flat Over Nested

Every level of nesting increases cognitive load. Reduce nesting with:

- **Guard clauses**: Return early for edge cases at the top of the function
- **Extract functions**: Move nested blocks into well-named functions
- **Pipeline style**: Chain transformations instead of nesting them
- **Early returns**: `if (!valid) return` instead of `if (valid) { ... deep code ... }`

### Composition Over Inheritance

In React and TypeScript, always prefer composition:

- **Components**: Compose via children, render props, and slots — not class inheritance
- **Logic**: Compose via custom hooks, utility functions, and higher-order functions
- **Types**: Compose via intersection types (`A & B`), not `extends` hierarchies

### Delete, Don't Comment

- Dead code has zero value and nonzero maintenance cost
- Git preserves history — you can always recover deleted code
- Commented-out code creates confusion about intent
- TODO comments are acceptable only with a linked issue or ticket

### Avoid Premature Optimization

- Write correct, readable code first
- Measure before optimizing — profile, don't guess
- `useMemo`/`useCallback` only when there's a measured performance issue or an explicit dependency requirement (e.g., stable references for effects)
- Premature optimization obscures intent and adds complexity

---

## Project Patterns

These patterns are specific to this portfolio project and are **mandatory** for all code changes.

### Colors — Use Project Tokens

All colors must come from the `@theme` block in `src/app/globals.css`:

- Backgrounds: `bg-black-100`, `bg-black-80`, `bg-black-60`
- Text: `text-white`, `text-black-30`, `text-black-10`
- Accent: `text-teal-500`, `bg-teal-500`, `border-teal-500`

### Spacing — Use `flex gap-*`, Never Margins Between Siblings

**NEVER use `mt-*`, `mb-*`, `mr-*`, `ml-*` for spacing between sibling components.** Use `flex` with `gap-*` on the parent instead.

```tsx
// ❌ WRONG: margin between siblings
<div>
  <Component1 className="mb-4" />
  <Component2 className="mb-4" />
  <Component3 />
</div>

// ✅ CORRECT: gap on parent
<div className="flex flex-col gap-4">
  <Component1 />
  <Component2 />
  <Component3 />
</div>
```

### One Component Per File — No Exceptions

Every `.tsx` file must export **exactly one** React component. Helper functions private to the component are fine, but no other component definitions.

### Visual Consistency During Refactoring

When refactoring, **never change the visual output**. Preserve all Tailwind classes exactly as they are. Refactoring = restructuring code. If the UI looks different after your change, you broke something.

### Animation Initial States

For initial animation states that use `transform`, use inline `style={{ transform: '...' }}` — NOT Tailwind `translate-*` utilities. Tailwind's `translate` property and keyframe `transform` property are independent CSS properties.
