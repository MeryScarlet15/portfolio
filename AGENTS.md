# Portfolio — María Amado

Personal portfolio website for María Amado, a Full Stack Developer.

## Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript, React 19 |
| **Styling** | Tailwind CSS v4 (CSS-first config) |
| **Animations** | Framer Motion (cursor), CSS keyframes (page transitions) |
| **Font** | Geist (Sans + Mono) |
| **Package Manager** | Bun |
| **Linting** | ESLint + Prettier (prettier-plugin-tailwindcss) |
| **Images** | next/image (unoptimized mode) |

## Project Structure

```
src/
├── app/          # Next.js App Router — layouts, pages, global styles
├── modules/      # Page sections — self-contained features (hero, about, skills, experience, layout)
└── components/   # Reusable UI pieces — shared across modules (button, cursor, progress-bar)
```

- **`app/`** — Entry points and global config. `globals.css` holds the Tailwind v4 theme, CSS reset, and reusable component classes.
- **`modules/`** — Each folder is a page section with its own logic. `layout/` contains header, footer, and main wrapper.
- **`components/`** — Small, generic components used by multiple modules.

## Commands

```bash
bun run dev           # Start dev server
bun run build:app     # Production build
bun run prettier      # Format code
bun run prettier:check
```

## Key Patterns

- **Mobile-first** with custom breakpoints (phone/tablet/big-tablet/laptop/desktop)
- **Intersection Observer** for lazy-loading sections (about, skills, experience)
- **CSS animations** with `animation-fill-mode: forwards` for scroll-triggered reveals
- **Tailwind v4** — `@import "tailwindcss"` + `@theme` block, no `tailwind.config.js`
- **CSS reset** in `@layer base` to avoid overriding Tailwind utilities
- **Tailwind translate vs transform** — keyframe animations use `transform`, so initial translate offsets must use inline `style={{ transform }}` instead of Tailwind's `translate-*` utilities (which use the separate CSS `translate` property)
