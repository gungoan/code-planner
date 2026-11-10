---
name: backlog-audit
description: Audit an existing backlog or Issue tracker for functional coverage, duplicate or oversized tasks, scope drift, dependency quality, ownership conflicts, and Issue readiness. GitLab is the reference example. Read-only. Use before synchronization. Do not use to create, edit, or delete Issues, or to implement code.
license: MIT
---

# Backlog Audit

## 1. Purpose

Review the existing backlog against approved specifications and produce a coverage matrix, issue classification, update plan, and audit report. This workflow is **read-only**: it does not write to the tracker. GitLab is the reference example; adapt Issue fields and relationships to the host tracker.

## 2. When to Use

- An existing backlog or Issue tracker must be reviewed before implementation or synchronization.
- Functional coverage, task quality, dependencies, and ownership must be verified.
- The backlog may contain duplicates, oversized tasks, scope drift, or contract inconsistencies.
- A change plan is needed before the release sync workflow.

## 3. When Not to Use

- Do not use to create, edit, delete, or push tracker Issues.
- Do not use to write code or change application behavior.
- Do not use to design the initial architecture or task catalog; use `technical-decomposition`.
- Do not use to make final GO/NO-GO decisions; use `final-consistency-audit`.

## 4. Inputs

- Approved BRD/FS and technical design.
- Database design, API contract, and integration specification.
- Existing tracker Issues and relationships (GitLab example).
- Approved architecture decisions and constraints.
- Existing backlog source-of-truth mapping.

## 5. Preconditions

- The specification sources are accessible.
- The tracker project scope is known.
- Read access to the backlog is verified.
- The user understands that this workflow produces a plan, not tracker changes.

## 6. Process

### Phase 1 — Document and functional coverage

1. Read the specification documents in the master/WEB repository.
2. Build a functional coverage matrix.
3. Identify functions with no task, BE-only tasks missing FE, functions needing mobile integration, incorrectly decomposed functions, duplicates, and functions lacking technical specification.
4. Record unclear specification as an issue; do not invent scope.

Use `references/backlog-audit-checklist.md` for the coverage matrix and review dimensions.

### Phase 2 — Issue review

Review 100% of in-scope Issues for:

- Business accuracy.
- Technical accuracy.
- Task quality.
- Acceptance criteria and testing.
- Dependency necessity.
- Independent assignability.

Classify each Issue as KEEP / UPDATE / SPLIT / MERGE / CREATE / BLOCKED / OBSOLETE.

### Phase 3 — Decomposition review

Check task size, ownership, scope boundaries, input/output contracts, and mock/stub strategy. Identify tasks that mix BE/FE/MOBILE responsibilities or implementation/integration work without a checkpoint.

### Phase 4 — Dependency minimization

For each dependency, verify:

1. Why is it required?
2. Can an API contract remove it?
3. Can a mock/fixture remove it?
4. Can tasks be re-split to run concurrently?
5. Is blocking start truly necessary?

Build a dependency graph and detect circular dependencies, long chains, single points of failure, bottlenecks, cross-team blocking, and unnecessary dependencies. For each issue, propose a concrete optimization (contract, mock, ownership split, task re-split, or integration checkpoint).

### Phase 5 — Conflict and ownership analysis

Identify code module, file/folder, database schema, API endpoint, shared component/type/configuration ownership. Flag resources likely to be edited by multiple tasks and propose a coordination or ownership split.

### Phase 6 — Phase, priority, and execution classification

Preserve approved phases; do not redefine them without approval. Verify each task belongs to the correct phase, priority is reasonable, foundation tasks are not unnecessary blockers, and phases can overlap when no real dependency exists.

Classify execution as FOUNDATION / INDEPENDENT / CONTRACT-READY / INTEGRATION / VERIFICATION.

### Phase 7 — Issue tracker standardization

Check titles, descriptions, references, contracts, dependencies, ownership, acceptance criteria, test requirements, labels, milestones, and parent/child links. Apply `references/task-schema.md` and the `references/backlog-audit-checklist.md` standardization rules.

### Phase 8 — Final validation

Validate functional coverage, task quality, parallel execution, integration correctness, and ownership. Produce the final report using the structure in `references/backlog-audit-checklist.md` Section 11.

## 7. Rules

- **MUST** remain read-only. **MUST NOT** create, edit, delete, or push tracker Issues.
- **MUST** review 100% of in-scope Issues.
- **MUST** preserve traceability; do not propose deletion before replacement and relationships are clear.
- **MUST** classify every Issue.
- **MUST** distinguish traceability links from real execution dependencies.
- **MUST NOT** create fake dependencies.
- **MUST NOT** create native mobile implementation tasks for the Mobile team.
- **MUST NOT** change business scope or approved architecture.
- **MUST NOT** mark a task Done without verification.
- **MUST NOT** keep a task merely because it exists.
- **SHOULD** prefer KEEP/UPDATE/SPLIT/MERGE over delete/recreate.
- **SHOULD** propose the smallest change that restores correctness.
- **MAY** propose new tasks when a real gap exists.

### Stop Conditions

Stop and ask the user when:

- Read access to the backlog or specifications is unavailable.
- The source specification is missing or conflicting.
- A proposed task change would alter approved scope, architecture, or contract.
- Task ownership or execution dependencies are ambiguous and cannot be resolved from evidence.
- The user asks to create, edit, or delete Issues in this read-only workflow.

## 8. Outputs

- Functional coverage matrix.
- Issue classification table.
- Change plan: keep/update/split/merge/create/block/obsolete.
- Dependency and conflict findings.
- Phase/priority/execution recommendations.
- Issue tracker standardization checklist.
- Final audit report.

## 9. Verification

- [ ] All in-scope Issues reviewed.
- [ ] Functional coverage is complete.
- [ ] Every Issue is classified.
- [ ] No duplicate or oversized task remains unflagged.
- [ ] Dependencies are real, classified, and documented.
- [ ] No circular dependency remains.
- [ ] Ownership conflicts are identified.
- [ ] Acceptance criteria and test requirements are assessed.
- [ ] Tracker structure is compatible.
- [ ] No tracker write occurred.
- [ ] The report includes evidence and unresolved issues.

## 10. References

- `references/backlog-audit-checklist.md` — detailed audit checklist and report structure.
- `references/task-schema.md` — task fields, Issue template (GitLab reference), quality gate.
- `references/workstream-model.md` — ownership and cross-team rules.
- `shared/api-contract-standards.md` — contract consistency rules.
- `shared/security-standards.md` — security task review criteria.
- `shared/quality-gates.md` — DoR/DoD and quality gates.
- `shared/engineering-principles.md` — evidence and no-invention rules.

## 11. Handoff

Hand off using: STATUS, ARTIFACTS, DECISIONS, OPEN QUESTIONS, RISKS, NEXT, EVIDENCE. The next skill is normally `technical-readiness`. Tracker writes require an authorized synchronization skill; for GitLab, use `gitlab-backlog-sync`.
