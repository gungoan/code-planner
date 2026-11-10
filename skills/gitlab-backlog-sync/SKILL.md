---
name: gitlab-backlog-sync
description: Synchronize an approved, audited backlog to GitLab Issues idempotently. Use only after a GO or resolved CONDITIONAL GO and explicit user approval. Do not use for backlog design, audit, scope changes, or unapproved writes.
license: MIT
---

# GitLab Backlog Synchronization

## 1. Purpose

Create or update GitLab Epics/Issues/Subtasks from the canonical task source, set relationships and metadata, verify the result, and preserve traceability. This is the **only** workflow allowed to write to GitLab.

## 2. When to Use

- `final-consistency-audit` returned GO, or CONDITIONAL GO with all conditions resolved/accepted.
- The user explicitly approves the GitLab write operation.
- GitLab access and the target project are verified.
- Stable Task IDs and a canonical mapping exist.

## 3. When Not to Use

- Do not use before the final audit.
- Do not use to redesign the backlog or add scope.
- Do not use without explicit approval.
- Do not use to create native mobile implementation tasks.
- Do not use to delete Issues without traceability preservation.

## 4. Inputs

- Approved task catalog / backlog source.
- `references/task-schema.md`.
- GitLab project target and existing Issue inventory.
- Mapping table: Task ID → existing IID/URL (if any).
- Label/milestone/parent mapping verified against GitLab.
- Final audit decision and approval record.

## 5. Preconditions

All of the following **MUST** be true:

1. Final audit decision is GO, or CONDITIONAL GO with documented resolution/acceptance.
2. Explicit user approval for this write operation.
3. GitLab access verified (project, permissions, API/token if used).
4. Canonical task source identified and stable.
5. Stable Task IDs and existing-Issue mapping verified.
6. Labels, milestones, and hierarchy names verified against the actual GitLab instance.
7. A rollback/disable plan exists for erroneous writes.

If any precondition is missing, **MUST** stop and report; do not attempt partial writes.

## 6. Process

### Phase 1 — Preflight

- Verify the GO/approval record.
- Verify GitLab access and target project.
- Read the current Issue inventory.
- Detect duplicates and existing mappings.
- Confirm stable Task IDs.
- Confirm label/milestone/parent names exist or will be created with approval.
- Confirm no unapproved scope or native implementation tasks are included.

### Phase 2 — Dry-run mapping

Build a mapping table:

| Task ID | Action | Target Issue | Parent/Epic | Milestone | Labels | Dependency Links |
|---|---|---|---|---|---|---|
| TASK-... | CREATE / UPDATE / SKIP | IID/URL or new | | | | |

Validate:

- Every task has a target action.
- No duplicate target.
- No orphan dependency.
- No unsupported GitLab feature.
- No write outside the approved scope.

Present the dry-run summary to the user if the operation is large or ambiguous.

### Phase 3 — Create or update

- Create missing Epics/Issues/Subtasks according to the approved hierarchy.
- Update existing Issues with the approved description and metadata.
- Preserve existing Issue IIDs/URLs.
- Do not overwrite human comments, labels, or relationships unless approved.
- Do not mark an Issue Done unless the task is actually complete and verified.
- Do not invent Issue IDs, URLs, usernames, milestone IDs, or label IDs.

### Phase 4 — Relationships

- Set parent/child relationships where supported.
- Set Blocks / Is Blocked By only for real execution dependencies.
- Set Related Issues for traceability.
- Set cross-project references for master/WEB ↔ MOBILE.
- Do not use relationships to represent business traceability when a reference is sufficient.

### Phase 5 — Verification

After writing:

- Re-read each created/updated Issue.
- Verify title, description, type, labels, milestone, parent, dependencies, and references.
- Verify no duplicate Issue was created.
- Verify cross-project links resolve.
- Verify the source-to-Issue mapping table is complete.
- Record any discrepancy and fix it before reporting success.

### Phase 6 — Report and rollback

- Produce a sync report: created, updated, skipped, failed, discrepancies.
- Record the final mapping table.
- Record any manual follow-up.
- If a write is wrong, correct it or document the rollback steps; do not leave silent corruption.

## 7. Rules

- **MUST** have GO + explicit approval + verified access before writing.
- **MUST** be idempotent: re-running must not create duplicates.
- **MUST** preserve existing Issue IDs, URLs, and history.
- **MUST** preserve traceability from Task ID to GitLab IID/URL.
- **MUST** verify every write.
- **MUST NOT** invent IDs, URLs, users, milestones, or labels.
- **MUST NOT** delete an Issue without preserving history and relationships.
- **MUST NOT** create native mobile implementation tasks.
- **MUST NOT** change business scope or task content beyond the approved source.
- **MUST NOT** mark Done without verification.
- **MUST NOT** report success for a failed or partial write.
- **SHOULD** dry-run and summarize before bulk creation.
- **SHOULD** use a machine-readable mapping for repeatability.
- **MAY** create missing labels/milestones only with approval.

### Stop Conditions

Stop and ask the user when:

- A GO, approval, access, or canonical mapping precondition is missing.
- The task mapping is ambiguous or duplicate.
- The target GitLab instance does not support a required feature and no approved alternative exists.
- A write would change business scope or create native implementation tasks.
- A deletion is requested without traceability preservation.
- A write fails or partially succeeds and cannot be verified.

## 8. Outputs

- GitLab Issues/Epics created or updated.
- Mapping table: Task ID → IID/URL.
- Relationship verification.
- Sync report: created/updated/skipped/failed.
- Discrepancies and follow-up actions.
- Rollback/correction notes.

## 9. Verification

- [ ] GO/approval record exists.
- [ ] GitLab access and target project verified.
- [ ] Dry-run mapping complete and unambiguous.
- [ ] No duplicate Issue created.
- [ ] Every task has a verified Issue mapping.
- [ ] Labels/milestones/parents/dependencies match the approved plan.
- [ ] Cross-project references resolve.
- [ ] Existing history preserved.
- [ ] No native implementation task created by the master repo.
- [ ] Sync report reflects actual results.
- [ ] Failures are reported, not hidden.

## 10. References

- `references/task-schema.md` — task fields, Issue template, stable IDs, quality gate.
- `references/workstream-model.md` — cross-project and ownership rules.
- `shared/git-delivery-standards.md` — traceability and delivery rules.
- `shared/documentation-standards.md` — stable IDs and link conventions.
- `shared/engineering-principles.md` — evidence and no-invention rules.
- The Preconditions and Rules in this skill define the write policy and approval gates.

## 11. Handoff

Hand off using: STATUS, ARTIFACTS, DECISIONS, OPEN QUESTIONS, RISKS, NEXT, EVIDENCE. The next phase is implementation, using the created GitLab Issues and approved contracts.
