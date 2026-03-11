---
paths:
  - "src/**/*.{tsx,ts}"
---

# Styling Patterns

## Mobile-First

Base styles target mobile, then enhance with custom breakpoints: `phone:`, `tablet:`, `big-tablet:`, `laptop:`, `desktop:`.

```tsx
// ✅ Mobile-first
className="flex-col tablet:flex-row"
className="grid-cols-1 phone:grid-cols-2 tablet:grid-cols-3"

// ❌ Desktop-first
className="flex-row tablet:flex-col"
```

## Colours

Use the custom palette from `globals.css` `@theme`:

- Backgrounds: `bg-black-100`, `bg-black-80`, `bg-black-60`
- Text: `text-white`, `text-black-30`, `text-black-10`
- Accent: `text-teal-500`, `bg-teal-500`, `border-teal-500`

## Spacing

Prefer `flex` with `gap-*` over margins for spacing between siblings.

## Animations

Use the custom animation utilities defined in `@theme`: `animate-fade-in`, `animate-slide-in`, `animate-fade-in-up`, etc.

For initial animation states that use `transform`, use inline `style={{ transform: '...' }}` — NOT Tailwind `translate-*` utilities (they use a different CSS property than keyframe animations).
