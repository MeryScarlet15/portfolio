---
name: writing-clean-code
description: Enforce clean code practices and modern development patterns when writing or reviewing code. Use when implementing features, refactoring, reviewing code quality, or making architectural decisions.
---

# Instructions

This skill applies to **all code changes** — features, refactors, bug fixes, and reviews. It is not invoked explicitly; it runs as a background constraint on every code task.

## 0. Write Prettier-Compliant Code From the Start

All code you write must pass `bun run prettier:check` without needing fixes. Internalize these rules so you never produce code that fails the formatter:

- **Single quotes** — `'hello'`, as configured in `.prettierrc`
- **Semicolons** — always terminate statements
- **Trailing commas** — always include on multi-line constructs
- **2-space indentation** — never tabs
- **Tailwind class sorting** — handled by `prettier-plugin-tailwindcss`

This is not optional. Write formatted code on the first pass.

## 1. Apply SOLID Principles

Every class, module, or component must follow SOLID. See [context/principles.md](context/principles.md#solid-principles) for detailed guidance.

**Quick reference:**

- **S — Single Responsibility**: One reason to change per module. Split when a module handles multiple concerns.
- **O — Open/Closed**: Extend behavior without modifying existing code. Use composition, strategies, or hooks.
- **L — Liskov Substitution**: Subtypes must be substitutable for their base types without breaking behavior.
- **I — Interface Segregation**: Small, focused interfaces. No client should depend on methods it doesn't use.
- **D — Dependency Inversion**: Depend on abstractions, not concretions. Inject dependencies, don't hard-code them.

## 2. Write Clean Code

Apply these rules to every function, component, and module:

### Naming
- Names must reveal intent — no abbreviations, no generic names (`data`, `info`, `temp`, `handler`)
- Functions: verb + noun (`calculateTotal`, `fetchUserProfile`, `validateEmail`)
- Booleans: `is`, `has`, `should`, `can` prefix (`isActive`, `hasPermission`)
- Components: noun describing what it renders (`UserProfile`, `NavigationMenu`)
- Files: `kebab-case.tsx` — Components: `PascalCase` exports — Hooks/Utils: `camelCase`

### Functions
- Do one thing. If you can describe it with "and", split it.
- Max 20 lines as a guideline — extract when logic becomes hard to follow
- Max 3 parameters. Use an options object for more.
- No side effects in pure functions. Separate pure logic from side effects.
- Early returns over nested conditionals.

### Components (React)
- **One component per file — no exceptions.** Co-locate helpers only if they're private to that component.
- Max 300 lines per component. Split by responsibility when larger.
- Max 3-4 props per component. Reduce props via composition, URL params, or custom hooks.
- Max 3-4 div nesting levels. Extract sub-components when deeper.
- Props defined as separate exported types (not inline).
- Extract custom hooks when logic is reusable or when the component gets complex.
- Props interfaces: explicit, no `any`. Use discriminated unions for variant props.
- Prefer composition over prop drilling. Use children, render props, or context.

### Error Handling
- Handle errors at the appropriate boundary, not everywhere.
- Never swallow errors silently. Log or propagate.
- Use typed errors or error codes, not magic strings.

## 3. Prefer Simple Solutions That Scale

See [context/principles.md](context/principles.md#simplicity-over-cleverness) for detailed patterns.

**Key rules:**

- Choose the simplest approach that handles the current requirements correctly
- Avoid premature abstraction — wait for the third occurrence before extracting
- Flat is better than nested. Reduce indentation levels.
- Composition over inheritance. Always.
- Small, focused modules over large, do-everything files
- Delete dead code. Don't comment it out.

## 4. Modern Development Patterns

### State Management
- Colocate state as close as possible to where it's used
- Lift state only when needed by siblings
- Prefer derived state over synchronized state

### Type Safety
- No `any`. Use `unknown` if the type is truly unknown, then narrow.
- Prefer `as const` and literal types over broad types
- Use discriminated unions for state machines and variants
- Export types alongside their implementations

## 5. Project-Specific Patterns

These are **mandatory** patterns for this portfolio project.

### Styling

See `.claude/rules/styling-patterns.md` for full rules.

- Use custom color tokens from `globals.css` `@theme` block: `text-teal-500`, `bg-black-100`, `text-white`, etc.
- Custom breakpoints: `phone:`, `tablet:`, `big-tablet:`, `laptop:`, `desktop:`
- Font weights: only `font-normal`, `font-medium`, `font-bold`
- **Spacing between components**: use `flex gap-*`, never `mt-*` / `mb-*` / `mr-*` between siblings

### Mobile-First
- **All UI is mobile-first** — base styles for mobile, responsive modifiers (`phone:`, `tablet:`, etc.) for larger screens
- Never write desktop-first (`flex-row tablet:flex-col`) — always mobile-first (`flex-col tablet:flex-row`)

### Animations
- Use custom animation utilities from `@theme`: `animate-fade-in`, `animate-slide-in`, `animate-fade-in-up`, etc.
- For initial animation states using `transform`, use inline `style={{ transform: '...' }}` — NOT Tailwind `translate-*` utilities (they use a different CSS property than keyframe animations)

### Visual Consistency
- **Never change visual design when refactoring** — preserve all Tailwind classes exactly as they are
- Refactoring means restructuring code, not redesigning UI

## 6. Code Smells to Fix Immediately

When you spot these, fix them — don't leave them for later:

| Smell | Fix |
|-------|-----|
| God class/component (>300 lines) | Split by responsibility |
| Feature envy (accessing other module's data extensively) | Move logic to where the data lives |
| Primitive obsession (passing raw strings/numbers everywhere) | Create domain types |
| Boolean parameters | Use options object or split into separate functions |
| Deep nesting (>3 levels) | Early returns, extract functions, use guard clauses |
| Copy-paste code (3+ occurrences) | Extract shared function or component |
| Long parameter lists (>3 params) | Use options object |
| Magic numbers/strings | Extract to named constants |
| Multiple components in one file | Extract each to its own file |
| Desktop-first responsive | Use mobile-first |
| Visual changes during refactor | Revert — preserve all existing classes |

## 7. Review Checklist

Before considering any code change complete:

- [ ] Each module has a single, clear responsibility
- [ ] One component per file — no exceptions
- [ ] No `any` types — all types are explicit
- [ ] Functions do one thing, named with intent
- [ ] No dead code, commented-out code, or unused imports
- [ ] Error states are handled, not swallowed
- [ ] No premature abstractions — code is as simple as it can be
- [ ] State is colocated near its usage
- [ ] Colors use project tokens from `@theme`
- [ ] Spacing uses `flex gap-*`, not margins between siblings
- [ ] Mobile-first responsive styles
- [ ] Refactoring preserves all existing visual styles
- [ ] `bun run prettier:check` passes
