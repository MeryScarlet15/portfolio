# Skill Best Practices Reference

Comprehensive reference for authoring Claude Code skills. Based on [Anthropic's official best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices).

## Contents

- Conciseness principles
- Progressive disclosure patterns
- Description writing guide
- Workflow and feedback loop patterns
- Common skill patterns
- Anti-patterns
- Quality checklist

---

## Conciseness Principles

The context window is shared across the system prompt, conversation history, all skills' metadata, and the user's request. Only add context Claude doesn't already have.

**Challenge each piece of content**:
- "Does Claude really need this explanation?"
- "Can I assume Claude knows this?"
- "Does this paragraph justify its token cost?"

### Good vs Bad Examples

```markdown
# Bad: ~150 tokens
PDF (Portable Document Format) files are a common file format that contains
text, images, and other content. To extract text from a PDF, you'll need to
use a library. There are many libraries available...

# Good: ~50 tokens
## Extract PDF text
Use pdfplumber: `pdfplumber.open("file.pdf").pages[0].extract_text()`
```

```markdown
# Bad: Explaining what Claude knows
React hooks are functions that let you use state and other React features.
The useEffect hook runs side effects in function components...

# Good: Straight to project-specific rules
## Hook rules
- Each mutation in its own hook file
- Always include `flow` from `useAppFlows()`
```

---

## Progressive Disclosure Patterns

SKILL.md is a table of contents. Claude loads it when triggered, then reads additional files only as needed.

### Pattern 1: High-level guide with references

```markdown
# SKILL.md (loaded when triggered)
## Quick start
[Essential instructions]

## Advanced features
**Form filling**: See [context/forms.md](context/forms.md)
**API reference**: See [context/reference.md](context/reference.md)
```

### Pattern 2: Domain-specific organization

```
skill-name/
├── SKILL.md (overview and navigation)
└── context/
    ├── finance.md (finance domain)
    ├── sales.md (sales domain)
    └── product.md (product domain)
```

### Pattern 3: Conditional details

```markdown
# SKILL.md
## Basic usage
[Default instructions]

**For complex cases**: See [context/advanced.md](context/advanced.md)
**For edge cases**: See [context/edge-cases.md](context/edge-cases.md)
```

### Key rules

- Keep SKILL.md under 500 lines
- References must be one level deep (SKILL.md -> context file, never context file -> another context file)
- Context files over 100 lines should have a table of contents
- Name files descriptively (`form-validation-rules.md`, not `doc2.md`)

---

## Description Writing Guide

The description is critical for skill discovery. Claude uses it to choose the right skill from all available skills.

### Formula

```
[What it does] + [specific technologies/terms] + Use when [trigger conditions].
```

### Examples

```yaml
# Specific with trigger terms
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.

# Action-oriented with context
description: Add PostHog tracking events (trackEvent, trackEventOnce, usePosthogEvent) to pages, mutations, and user actions. Use when creating new pages, adding mutations, implementing onClick/onSubmit handlers, or when analytics/tracking coverage is needed.

# Validation-focused
description: Validate files against component-patterns, styling-patterns, data-fetching-patterns, and other rules with detailed line-by-line analysis. Use after modifying components, hooks, or pages, or when checking code compliance before review.
```

### Rules

- Always third person ("Processes files", not "I process files")
- Include specific terms users would mention (library names, file types, concepts)
- Include both "what" and "when"
- Max 1024 characters

---

## Workflow and Feedback Loop Patterns

### Numbered steps

Break complex operations into clear, sequential steps:

```markdown
## Workflow
1. Analyze existing state
2. Identify changes needed
3. Implement changes
4. Verify results
5. Report summary
```

### Progress checklists

For multi-step skills, include a checklist Claude can track:

```markdown
## Workflow
Copy this checklist and track progress:
- [ ] Step 1: Analyze the codebase
- [ ] Step 2: Identify violations
- [ ] Step 3: Apply fixes
- [ ] Step 4: Verify with tsc/lint
- [ ] Step 5: Generate report
```

### Feedback loops

The pattern: produce output -> validate -> fix -> repeat.

```markdown
## Verification
After making changes:
1. Run `tsc --noEmit` — fix any type errors
2. Run `bun run lint` — fix any linting errors
3. If any check fails, fix and re-run
```

### Conditional workflows

Guide through decision points:

```markdown
## Determine approach
1. Check the file type:
   - **page.tsx?** -> Follow "Page tracking" below
   - **hook file?** -> Follow "Mutation tracking" below
   - **component?** -> Follow "Action tracking" below
```

---

## Common Skill Patterns

### Template pattern

Provide output format templates. Match strictness to requirements.

**Strict** (for reports, structured output):
```markdown
## Output format
ALWAYS use this structure:
# [Title]
## Summary
## Findings
## Recommendations
```

**Flexible** (when adaptation is useful):
```markdown
## Output format
Default structure (adapt as needed):
# [Title]
## [Sections based on findings]
```

### Examples pattern

Provide input/output pairs for skills where output quality depends on examples:

```markdown
## Examples

**Input**: User clicks "Save" button on profile page
**Output**: `trackEvent("profile_save_clicked", { userId, flow })`

**Input**: Page loads for the first time
**Output**: `trackEventOnce("profile_seen", { userId, workspaceSlug })`
```

### Degrees of freedom

Match specificity to task fragility:

| Freedom | When to use | Example |
|---------|-------------|---------|
| Low | Fragile operations, exact sequences | Database migrations, specific CLI commands |
| Medium | Preferred patterns with variation | Component templates, hook patterns |
| High | Context-dependent decisions | Code reviews, architectural analysis |

---

## Anti-Patterns

| Anti-pattern | Why it's bad | Fix |
|-------------|-------------|-----|
| Multiple approaches offered | Confuses Claude, wastes tokens | Provide one default + escape hatch |
| Content duplicated from rules | Diverges over time, wastes tokens | Reference the rule file |
| Deeply nested references | Claude may partially read files | Keep references one level deep |
| "Why This Matters" sections | Claude doesn't need motivation | Delete, just state the rule |
| Time-sensitive dates | Becomes wrong over time | Use "current" / "legacy" sections |
| Vague descriptions | Claude can't discover the skill | Add specific trigger terms |
| Over-explaining known concepts | Wastes tokens | Assume Claude's baseline knowledge |
| Inconsistent terminology | Confuses Claude | Pick one term per concept |
| Windows-style paths | Breaks on Unix systems | Always use forward slashes |

---

## Quality Checklist

Before finalizing a skill:

### Structure
- [ ] Name is gerund form, lowercase + hyphens only
- [ ] Description is third person with trigger terms
- [ ] Description includes both "what" and "when"
- [ ] SKILL.md body is under 500 lines
- [ ] Additional details in `context/` files (if needed)
- [ ] File references are one level deep
- [ ] Context files over 100 lines have a table of contents

### Content
- [ ] No explanations of things Claude already knows
- [ ] No content duplicated from existing rule files
- [ ] Consistent terminology throughout
- [ ] No time-sensitive information
- [ ] Examples are concrete, not abstract
- [ ] Progressive disclosure used appropriately

### Workflow
- [ ] Steps are numbered and sequential
- [ ] Verification/feedback loop exists
- [ ] Output format is specified
- [ ] Conditional paths are clear (if applicable)

### Project-specific
- [ ] References correct rule files from `.claude/rules/`
- [ ] Follows project naming conventions (kebab-case files, PascalCase components)
- [ ] Verification includes `bun run lint` where applicable
- [ ] Uses project tools (Prettier for formatting, Bun for runtime)
