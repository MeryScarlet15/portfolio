# Claude Code Context

Read [AGENTS.md](./AGENTS.md) for project architecture and stack.

## Claude Architecture

- **`.claude/orchestrator.md`** — Injected on every prompt via `UserPromptSubmit` hook. Quick reference for styling, breakpoints, colors, components, and available skills.
- **`.claude/rules/`** — Auto-loaded rules scoped by file path (e.g., `styling-patterns.md` loads for `src/**/*.{tsx,ts}`)
- **`.claude/skills/`** — Detailed workflows loaded on demand: writing-clean-code, analyzing-ux, review-copies, reviewing-pr, cleaning-orphan-files, generating-skill
- **`.claude/commands/lint.md`** — Runs `bun run prettier:check` after every response via `Stop` hook
