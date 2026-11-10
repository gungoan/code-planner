# Changelog

All notable changes to Code Planner are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-10

### Added

- Initial Code Planner AI Engineering Skill Library.
- Seven workflow skills: `brd-analysis`, `technical-decomposition`, `backlog-audit`, `technical-readiness`, `standards-baseline`, `final-consistency-audit`, and `gitlab-backlog-sync`.
- Shared engineering standards for principles, architecture/data, API contracts, coding, security, testing, code review, documentation, Git delivery, and quality gates.
- Reference artifacts for BRD structure, BRD quality gates, decomposition, task schema, backlog audit, final audit, and workstream ownership.
- Self-contained skill packaging: every `skills/<name>/` includes its own `shared/` and `references/` copies.
- `scripts/sync-references.mjs` to synchronize canonical standards into skill packages.
- `scripts/validate-skills.mjs` to validate skill frontmatter, folder/name matching, local references, and package consistency.
- CLI-compatible `skills/<name>/SKILL.md` layout for Vercel Skills CLI.
- MIT license.

### Changed

- Standardized skill names to lowercase-kebab-case and matched them to folder names.
- Reworked skills to be installable independently without runtime dependencies on repository-level files.
- Replaced the legacy workflow-oriented directory layout with a distributable skill-library layout.

### Removed

- Legacy workflow-oriented directory hierarchy after migrating all skills to `skills/`.
- Local absolute-path references from project documentation.
