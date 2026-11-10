---
name: final-consistency-audit
description: Run the final cross-document and backlog audit, correct issues with sufficient evidence, freeze the baseline, and issue GO/CONDITIONAL GO/NO-GO before release synchronization. GitLab is the reference adapter. Use as the last gate before release sync. Do not use to create requirements, change architecture, or push tracker Issues.
license: MIT
---

# Final Consistency Audit and Pre-Implementation Gate

## 1. Purpose

Perform a full, evidence-based audit of all project artifacts before release synchronization and implementation. Correct issues that can be resolved from authoritative sources, freeze the baseline, and issue a GO/NO-GO decision. GitLab is the reference synchronization adapter; adapt the release step to the host tracker.

## 2. When to Use

- All major documents, contracts, standards, and backlog are believed to be complete.
- The project is preparing to push the backlog to its tracker and start implementation.
- A final independent quality gate is required.

## 3. When Not to Use

- Do not use to create new requirements or change approved scope.
- Do not use to redesign architecture.
- Do not use to push or create tracker Issues.
- Do not use to assign tasks or agents.

## 4. Inputs

- Business Requirements, Functional Specification, Functional Design.
- Technical Design/Architecture, Database Design/Data Model.
- API Specification/Contract, Integration Specification.
- Environment/DevOps Specification.
- Development Standards, QA/Testing Strategy, Security Standards.
- Backlog/Implementation Plan for the host tracker.
- Existing source code, project structure, configuration, migrations, API definitions, CI/CD, Issue templates.

## 5. Preconditions

- The canonical document and backlog sources are identified.
- Access to the repository, documents, and backlog is verified.
- The readiness review has produced a status and no unidentified BLOCKER is known.
- The standards baseline has been established and validated.
- The user has not requested a tracker write during this audit.

## 6. Process

Apply the detailed checklist in `references/final-audit-checklist.md`.

### Phase 1 — Document inventory and baseline validation

Inventory all documents, identify canonical/supporting/deprecated/duplicate/missing/outdated documents, verify versions/approval status, broken links, file names, paths, terminology, and conflicts.

### Phase 2 — Business and functional traceability

Verify that all business requirements are reflected in functional requirements, no requirement is missing, no function lacks a business basis, business rules, roles, permissions, workflows, validation, exceptions, and edge cases are complete, and no cross-module conflict exists.

Traceability chain:

```text
Business Requirement → Functional Requirement → Functional Design → Implementation Task → Acceptance Criteria
```

### Phase 3 — Technical design and architecture

Audit system architecture, module boundaries, responsibilities, dependency direction, data ownership, database design, entity relationships, data integrity, transactions, API architecture, auth, error handling, logging/audit, storage, caching, background processing, integrations, scalability, performance, security, and failure recovery.

Check for unnecessary complexity, missing components, circular dependencies, unreasonable coupling, dispersed responsibility, unimplementable design, and gaps between docs and codebase.

Do not change approved architecture; record required changes as findings.

### Phase 4 — API contract and integration

Audit API coverage, endpoints/methods, schemas, field naming/types, required/optional fields, validation, auth, error codes, pagination/filter/sort, idempotency, file upload/download, realtime events, version/backward compatibility.

Verify alignment across backend, web, and native mobile. Ensure Mobile has enough contract and linked business tasks without the master repo controlling native internals.

### Phase 5 — Development standards and QA

Audit coding standards, backend/web/mobile integration guidelines, Git workflow, commit convention, MR standards, code review, unit/integration/API contract testing, security standards, static analysis, quality gates, DoR/DoD, and technical debt management.

Verify standards fit the stack, are executable, non-duplicated, non-contradictory, and clear.

### Phase 6 — Backlog deep audit

Audit scope completeness, task quality, dependency/parallel execution, phase/milestone, acceptance criteria, and tracker compatibility. Reject vague tasks. Do not create or push Issues.

### Phase 7 — Cross-document consistency

Check the relationships listed in `references/final-audit-checklist.md` (BR↔FS, FS↔design, design↔API, API↔integration, design↔standards, standards↔QA, QA↔DoD, design↔backlog, FS↔backlog, API↔tasks, DevOps↔tasks, specs↔AC).

Look for conflicting definitions, inconsistent naming/types/status/permissions, missing rules, incorrect references, duplicate specifications, outdated assumptions, untraceable tasks, uncovered requirements, and taskless specifications.

Every conflict **MUST** be identified by file, section, and content.

### Phase 8 — Risk and blocker audit

Classify findings as BLOCKER / HIGH / MEDIUM / LOW. Each finding **MUST** include ID, category, severity, description, affected documents/tasks, evidence, impact, recommended resolution, and status. Do not hide issues by lowering severity.

### Phase 9 — Direct document correction

Correct issues with sufficient evidence:

1. Fix inconsistencies/conflicts.
2. Add missing content only when grounded in a canonical source.
3. Normalize terminology/structure.
4. Fix cross-references.
5. Remove duplicates.
6. Improve task clarity/executability.
7. Normalize Markdown for the host renderer (GitLab or equivalent).

Do not stop at recommendations. Do not create a new document when the canonical document can be updated. Do not change business scope. Do not decide issues requiring approval. Do not delete important information. Do not create a CR or new backlog outside approved scope.

For unsupported or decision-required content: keep the current baseline, record a finding, propose options/impact, and do not infer.

### Phase 10 — Final validation and baseline freeze

Validate Markdown, cross-references, links, task references, traceability, API references, dependency graph, duplicate/missing tasks, acceptance criteria, tracker compatibility, and document consistency. Re-verify all changes.

Do not mark PASS without evidence.

## 7. Rules

- **MUST** audit independently; do not assume previous work is correct.
- **MUST** cite evidence for every material finding.
- **MUST** distinguish facts, derived conclusions, assumptions, and TBD.
- **MUST** correct only what is supported by an authoritative source.
- **MUST** preserve traceability and history.
- **MUST NOT** create business requirements or change approved functional scope.
- **MUST NOT** change architecture without approval.
- **MUST NOT** create a CR or new backlog outside baseline scope.
- **MUST NOT** assign tasks or agents.
- **MUST NOT** push or create tracker Issues during this audit.
- **MUST NOT** implement business features or broadly refactor code.
- **MUST NOT** create duplicate documents.
- **MUST NOT** delete documents before replacement is confirmed.
- **MUST NOT** hide errors or conflicts because a document is marked complete.
- **SHOULD** prefer updating the canonical document over creating a new one.
- **SHOULD** report NOT VERIFIED when a check cannot be run.

### Stop Conditions

Stop and ask the user when:

- A conflict requires a business or technical decision that evidence cannot resolve.
- A canonical source is missing or inaccessible.
- The user asks to push or create tracker Issues during the audit.
- A required check cannot be run and the limitation affects the GO/NO-GO decision.
- A finding would require changing approved scope, architecture, or contract.
- A finding's severity cannot be justified with evidence.

## 8. Outputs

- Final document baseline (checked, corrected, cross-verified).
- Requirement traceability: BR → FR → Design → Task → AC.
- Final backlog assessment.
- Findings and corrections report.
- Change log: files created/edited/removed/deprecated and reasons.
- Release synchronization readiness (GitLab adapter optional).
- Validation results.
- Final decision: GO / CONDITIONAL GO / NO-GO.

## 9. Verification

- [ ] No unresolved BLOCKER remains.
- [ ] No serious cross-document conflict remains.
- [ ] No requirement in approved scope is missing.
- [ ] Every task is traceable to a source requirement or approved decision.
- [ ] No duplicate task or vague scope remains.
- [ ] Dependency graph is valid.
- [ ] Acceptance criteria are verifiable.
- [ ] Backend/Web/Mobile contracts are consistent.
- [ ] Development standards and QA strategy are applicable.
- [ ] Backlog structure is compatible with the host tracker.
- [ ] All changes were re-validated.
- [ ] PASS is reported only when the check was actually run.

## 10. Final Decision Definitions

Use the GO / CONDITIONAL GO / NO-GO definitions and evidence requirements in `references/final-audit-checklist.md` Section 12. Do not issue a decision without the required evidence.

## 11. References

- `references/final-audit-checklist.md` — 10-phase checklist, severity, report structure.
- `references/workstream-model.md` — ownership boundaries.
- `references/task-schema.md` — task/Issue quality gate.
- `shared/engineering-principles.md` — evidence, traceability, no invention.
- `shared/architecture-and-data-standards.md` — architecture/data audit criteria.
- `shared/api-contract-standards.md` — API audit criteria.
- `shared/code-review.md` — review/approval audit criteria.
- `shared/git-delivery-standards.md` — Git/delivery audit criteria.
- `shared/testing-standards.md` — test/QA audit criteria.
- `shared/security-standards.md` — security audit criteria.
- `shared/quality-gates.md` — DoR/DoD and gates.
- `shared/documentation-standards.md` — document/ID/link rules.

## 12. Handoff

Hand off using: STATUS, ARTIFACTS, DECISIONS, OPEN QUESTIONS, RISKS, NEXT, EVIDENCE. If the decision is GO or resolved CONDITIONAL GO, the next skill is the authorized tracker synchronization skill (for GitLab, `gitlab-backlog-sync`), and only with explicit user approval.
