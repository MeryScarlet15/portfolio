---
name: generating-skill
description: Scaffold new Claude Code skills with proper SKILL.md structure, context files, naming conventions, and progressive disclosure. Use when creating a new skill, scaffolding skill structure, or building automation workflows from scratch.
---

# Instructions

## Arguments

- `name` (required): Skill name in gerund-form kebab-case (e.g., `analyzing-reports`)
- `description` (required): What the skill does and when to use it
- `location` (optional): Where to create the skill (default: `.claude/skills/`)
- `has-context` (optional): Whether to create context subfolder (default: false)

## 1. Validate arguments

- Name must be gerund form: `verb+ing-noun` (e.g., `generating-component`, `checking-patterns`)
- Name must be lowercase with hyphens only, max 64 chars
- Description must be third person, include trigger terms, max 1024 chars

## 2. Determine location

Default: `.claude/skills/[name]/`

## 3. Generate skill files

### Directory structure

```
[name]/
├── SKILL.md              # Main instructions (< 500 lines)
├── context/              # Only if has-context=true
│   └── [references].md   # Detail files loaded on demand
└── (no other files unless scripts are needed)
```

### SKILL.md template

```markdown
---
name: [name]
description: [description with trigger terms]. Use when [specific triggers].
---

# Instructions

## Arguments

- `arg1` (required): Description
- `arg2` (optional): Description (default: value)

## 1. [First step title]

[Concise instructions — no explanations Claude doesn't need]

## 2. [Second step title]

[Reference rule files instead of duplicating content]
See `[relevant-rule].md` for [what rules cover].

## 3. [Continue numbered steps]

[Each step should be actionable, not explanatory]

## Verification

- [ ] [Relevant check command]
- [ ] [Another verification step]
```

### Content rules when generating

- **Don't explain what Claude knows**: Skip "React is a library for..."
- **Reference, don't duplicate**: Instead of copying rules, write `See [rule].md for rules`
- **One level deep**: Context files link from SKILL.md only, never from other context files
- **Consistent terminology**: Pick one term per concept and use it throughout
- **Progressive disclosure**: SKILL.md is the overview; details go in `context/` files
- **Include verification**: Every skill needs a feedback loop (lint, type check, tests, etc.)

### Context files (if has-context=true)

Create context files for content that would push SKILL.md over 500 lines:

| File type | When to create |
|-----------|---------------|
| `context/examples.md` | Input/output examples for complex output formats |
| `context/report-template.md` | Structured output templates |
| `context/analysis-algorithm.md` | Detailed multi-step algorithms |
| `context/[domain]-reference.md` | Domain-specific lookup tables or schemas |

Each context file should have a table of contents if over 100 lines.

## 4. Verify generated skill

- [ ] Name is gerund form, lowercase + hyphens only
- [ ] Description is third person with trigger terms
- [ ] SKILL.md body is under 500 lines
- [ ] No content duplicated from existing rule files
- [ ] No explanations of things Claude already knows
- [ ] References are one level deep from SKILL.md
- [ ] Verification/feedback loop section exists
- [ ] Workflows use numbered steps
- [ ] File paths use forward slashes

## 5. Register in orchestrator

Add the new skill to the `## Available Skills` table in `.claude/orchestrator.md`:

```markdown
| [skill-name](./skills/[name]/SKILL.md) | [Short description of when to use] |
```

Every skill **must** be listed in the orchestrator so Claude can discover and route to it.

## 6. Output

- List created files with paths
- Show the skill name for invocation
- Note if any existing rule files should be referenced by the new skill
- Confirm skill was added to `.claude/orchestrator.md`
