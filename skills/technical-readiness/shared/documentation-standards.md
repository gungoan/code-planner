# Documentation Standards

## 1. Purpose

Standardize how technical and business documentation is created, updated, linked, and maintained so it reflects reality and never becomes a competing source of truth.

## 2. Principles

- **Single source of truth**: each piece of information has one canonical document.
- **Docs as code**: documents are reviewed, versioned, and updated with the change.
- **Traceability**: important documents have IDs, sources, and links to requirements/tasks/tests.
- **No duplication**: reference instead of copying.
- **No orphan docs**: documents no longer referenced **MUST** be marked as replaced or deprecated.
- **Accuracy over volume**: do not create documents just to fill a structure.

## 3. Document Types

| Type | Purpose | Owner |
|---|---|---|
| README | Overview, setup, usage | Repo owner |
| BRD | Business requirements | BA |
| Functional Spec | Functional behavior | BA/TL |
| Technical Design / ADR | Architecture and technical decisions | TL/Architect |
| API Contract | Communication between components | BE |
| Data Model | Schema, relationships, migrations | BE |
| Development Standards | Coding/testing/review/git | TL/QA |
| Runbook | Operations and troubleshooting | DevOps/TL |
| Test Plan/Report | Test strategy and evidence | QA |
| Changelog/Release Notes | Changes by version | Release owner |
| Migration Report | Restructuring/document history | Maintainer |

## 4. Minimum Metadata

Important documents **SHOULD** include:

- Title.
- Status (draft/review/approved/deprecated).
- Owner.
- Version or last-updated date.
- Source references.
- Related IDs.
- Applicable scope.

## 5. Stable IDs

- **MUST** use stable IDs for requirements, business rules, tasks, contracts, and decisions.
- IDs **MUST NOT** depend on display order or page number.
- When documents are split or merged, **MUST** keep an old-to-new ID mapping.
- **MUST NOT** reuse a deleted ID for a different purpose.

## 6. Markdown Conventions

- **MUST** use consistent heading levels; do not skip levels.
- **MUST** use tables for structured data.
- **MUST** use language-tagged code fences where possible.
- **MUST** use Mermaid for diagrams when the target tool supports it.
- **MUST** use consistent relative or root-relative links.
- **MUST** validate internal links and cross-references after edits.
- **MUST** ensure Markdown renders correctly on the host renderer (for example, GitLab or GitHub).

## 7. Language and Terminology

- Use one consistent language per document; keep technical terms in English where appropriate.
- **MUST** use one term per concept.
- **MUST** define business terms in a glossary when ambiguity exists.
- **MUST NOT** use vague words such as "user-friendly", "fast", or "flexible" without measurable criteria.

## 8. Document Lifecycle

1. **Draft**: under construction; may change.
2. **Review**: ready for stakeholder review.
3. **Approved**: canonical for subsequent work.
4. **Deprecated**: no longer used; **MUST** point to the replacement.
5. **Archived**: retained for history; not used as a source.

When a document is replaced, **MUST** update cross-references and status; **MUST NOT** leave two documents both considered canonical.

## 9. Updating Documentation

- Requirement changes **MUST** update the related BRD/FS.
- Contract changes **MUST** update the API spec and consumer references.
- Schema changes **MUST** update the data model/migration docs.
- Behavior changes **MUST** update tests/acceptance criteria.
- **MUST NOT** silently overwrite approved content; record change history.

## 10. Prompt/Skill Documentation

- Every `SKILL.md` **MUST** have `name` and `description` frontmatter.
- `description` **MUST** state when to use the skill and its primary scope.
- Every skill **MUST** define purpose, scope, inputs, process, rules, outputs, and verification.
- Do not create a skill that duplicates another skill's responsibility.
- When adding or changing a skill in a skill library, **MUST** update the library README and operating contract (if present) when routing changes.

## 11. Checklist

- [ ] The document has a clear purpose and scope.
- [ ] Metadata/owner/status exists when needed.
- [ ] No duplicated canonical content.
- [ ] Stable IDs and cross-references are correct.
- [ ] Markdown renders correctly; links are valid.
- [ ] Terminology is consistent.
- [ ] The document reflects the current implementation/contract.
- [ ] Old documents are marked deprecated/replaced.
