# Contributing to Code Planner

Code Planner is an AI Engineering Skill Library. Contributions are expected to preserve the library's portability, clarity, and agent-agnostic behavior.

## 1. Repository Layout

```text
code-planner/
├── skills/
│   └── <skill-name>/
│       ├── SKILL.md
│       ├── shared/       # generated copy of canonical shared standards
│       └── references/   # generated copy of skill-specific references
├── shared/               # canonical cross-skill standards
├── references/           # canonical reference artifacts
├── scripts/              # maintainer synchronization and validation
├── README.md
├── AGENTS.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── package.json
```

The `shared/` and `references/` directories at the repository root are the **canonical sources**. The copies inside each `skills/<name>/` are generated so that every skill can be installed and used independently. Do not edit generated copies directly.

## 2. Skill Anatomy

Every skill **MUST** be a directory under `skills/` containing a `SKILL.md` file.

```markdown
---
name: skill-name
description: What the skill does and when an AI agent should activate it.
license: MIT
---

# Skill Name

## 1. Purpose
## 2. When to Use
## 3. When Not to Use
## 4. Inputs
## 5. Preconditions
## 6. Process
## 7. Rules
## 8. Outputs
## 9. Verification
## 10. References
## 11. Handoff
```

Not every skill needs identical sections. The required content is:

- Purpose and scope.
- Activation conditions.
- Required inputs.
- Executable process.
- Decision rules and constraints.
- Outputs.
- Quality gates and verification.
- Integration/handoff behavior.

## 3. Frontmatter Rules

Required fields:

- `name`: lowercase-kebab-case, 1-64 characters; **MUST** match the skill directory name.
- `description`: concise, specific, activation-oriented, 1-1024 characters.
- `license`: use `MIT` for this repository.

Optional fields only when needed:

- `compatibility`
- `metadata`

Do not add agent-specific or vendor-specific frontmatter unless the skill genuinely requires it. Keep the `SKILL.md` body under 500 lines using the official recommendation.

## 4. Adding a Skill

1. Create `skills/<skill-name>/SKILL.md`.
2. Use a unique, descriptive lowercase-kebab-case name.
3. Define clear activation conditions and boundaries.
4. Add any required reference files to the canonical `references/` directory.
5. Add the skill and its reference list to `referenceMap` in:
   - `scripts/sync-references.mjs`
   - `scripts/validate-skills.mjs`
6. Run:

```bash
npm run sync
npm run validate
```

7. Verify CLI discovery:

```bash
npx skills add . --list
```

8. Verify independent installation from a temporary project:

```bash
npx skills add <path-to-code-planner> --skill <skill-name> -a opencode --copy -y
```

9. Confirm the installed folder contains `SKILL.md`, `shared/`, and `references/`, and that all local references resolve.

## 5. Editing Shared Standards

1. Edit the canonical file in `shared/` or `references/`.
2. Run `npm run sync` to copy it into every skill package.
3. Run `npm run validate` to check for drift and broken references.
4. Review affected skills for conflicting guidance.

Do not edit `skills/<name>/shared/` or `skills/<name>/references/` directly; changes will be overwritten.

## 6. Naming and Description Guidelines

- Use lowercase-kebab-case: `technical-decomposition`, `final-consistency-audit`.
- Prefer a clear domain term over a generic name.
- Description **SHOULD** include:
  - What the skill does.
  - When it should be activated.
  - What it explicitly does not cover.
- Avoid marketing language, unverifiable claims, and vague phrases such as "best practices" without criteria.

## 7. Quality Checklist

Before opening a pull request:

- [ ] `name` matches the folder and is at most 64 characters.
- [ ] Frontmatter parses successfully.
- [ ] Description is specific, activation-oriented, and at most 1024 characters.
- [ ] `license: MIT` is present.
- [ ] `SKILL.md` stays under 500 lines.
- [ ] Purpose, inputs, process, rules, outputs, and verification are present.
- [ ] Stop conditions or escalation rules are present.
- [ ] Local references exist and are not stale.
- [ ] No absolute local paths, private URLs, or vendor-specific metadata.
- [ ] No duplicated responsibility with another skill.
- [ ] No circular dependency or required external skill.
- [ ] `npm run validate` passes.
- [ ] `skills-ref validate ./skills/<skill-name>` passes.
- [ ] `npx skills add . --list` discovers the skill.
- [ ] Independent install test passes.

## 8. Review and Merge

- Keep changes focused and atomic.
- Explain the reason for the change and the affected skills.
- Update `CHANGELOG.md` for user-visible changes.
- Update `README.md` if the skill catalog, installation, or usage changes.
- Do not publish, change repository access, or claim compatibility without verification.

## 9. Compatibility Policy

Code Planner targets the Agent Skills specification and the Vercel Skills CLI.

- The required interface is `skills/<name>/SKILL.md` with `name` and `description` frontmatter.
- Skills **MUST** remain usable without a specific model, LLM provider, coding agent, project-management system, or project repository structure.
- Optional integrations **MUST** be documented as optional.
- Compatibility claims **MUST** distinguish:
  - Conformance to the Agent Skills specification.
  - Discovery and installation verified with the Vercel Skills CLI.
  - Actual use verified on a specific agent.

## 10. Versioning

- Follow semantic versioning for the library.
- Add user-visible changes to `CHANGELOG.md`.
- Breaking changes include renamed skills, removed skills, or changes that break independent installation.
