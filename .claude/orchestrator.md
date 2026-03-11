# Portfolio — Context Guide

Single Next.js 16 portfolio site. Read [AGENTS.md](../AGENTS.md) for full architecture.

## Quick Reference

- **Styling**: Tailwind v4 — tokens in `src/app/globals.css` `@theme` block
- **Breakpoints**: phone (577px), tablet (923px), big-tablet (1080px), laptop (1200px), desktop (1330px)
- **Colors**: black-100 to black-5, teal-500
- **Components**: `src/components/` (reusable), `src/modules/` (page sections)
- **Package manager**: Bun
- **Lint/format**: `bun run prettier:check`

## Rules

- [styling-patterns.md](./rules/styling-patterns.md) — Tailwind patterns for this project

## Available Skills

| Skill | When to Use |
|-------|-------------|
| [writing-clean-code](./skills/writing-clean-code/SKILL.md) | Writing or reviewing code |
| [analyzing-ux](./skills/analyzing-ux/SKILL.md) | Auditing UX quality |
| [review-copies](./skills/review-copies/SKILL.md) | Reviewing UI copy/text |
| [reviewing-pr](./skills/reviewing-pr/SKILL.md) | Before creating a PR |
| [cleaning-orphan-files](./skills/cleaning-orphan-files/SKILL.md) | Finding unused files |
