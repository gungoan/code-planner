# Final Audit Checklist

## 1. Purpose

Define the 10-phase final audit used by the `final-consistency-audit` skill before release synchronization and implementation. The audit is evidence-based and **MUST NOT** push or create tracker Issues. GitLab is the reference example; adapt to the host tracker.

This file is the detailed companion to the `final-consistency-audit` skill. The skill owns the workflow; this file owns the detailed checks and final-decision definitions.

## 2. Phase 1 — Document Inventory and Baseline Validation

- [ ] Inventory all relevant documents.
- [ ] Discover the actual repository structure; do not assume a document exists because of its expected name.
- [ ] Identify canonical, supporting, deprecated, duplicate, missing, and outdated documents.
- [ ] Check version and approval status.
- [ ] Check broken links and cross-references.
- [ ] Check file names, paths, and terminology.
- [ ] Identify conflicting documents.
- [ ] Do not delete a document merely because it is not referenced; first confirm replacement or no value.

### Source-of-Truth Rules

- Business Requirements define business scope.
- Functional Specification defines functional behavior.
- Approved Technical Design defines the technical solution.
- Approved API Contract defines communication between components.
- Development Standards define implementation standards.
- The backlog or Issue tracker is the task decomposition of approved content.

When sources conflict, apply the authority order defined by the host project. If no authority order is available, use the source-of-truth hierarchy above. If evidence cannot resolve the conflict, record a finding and ask the user; do not choose the option that makes the document appear more complete.

## 3. Phase 2 — Business and Functional Traceability

- [ ] Every business requirement is reflected in functional requirements.
- [ ] No requirement is missing.
- [ ] No function exists without a business basis.
- [ ] No business requirement is misinterpreted.
- [ ] Business rules are complete and consistent.
- [ ] Roles/permissions are consistent.
- [ ] Workflows have complete states and transitions.
- [ ] Preconditions/postconditions exist.
- [ ] Validation rules are clear.
- [ ] Exceptions/failure scenarios are defined.
- [ ] Important edge cases are handled.
- [ ] No conflict exists between related modules.

Traceability chain:

```text
Business Requirement → Functional Requirement → Functional Design → Implementation Task → Acceptance Criteria
```

## 4. Phase 3 — Technical Design and Architecture

- [ ] System architecture and module boundaries are clear.
- [ ] Component responsibilities and dependency direction are correct.
- [ ] Data ownership, database design, entity relationships, and data integrity are defined.
- [ ] Transaction boundaries are correct.
- [ ] API architecture and authentication/authorization are defined.
- [ ] Error handling, logging, and audit are defined.
- [ ] File storage, caching, background processing, and external integrations are covered.
- [ ] Scalability, performance, security, and failure recovery are addressed.
- [ ] No unnecessary design, missing component, circular dependency, unreasonable coupling, or dispersed responsibility exists.
- [ ] The design can be implemented with the current stack.
- [ ] The design matches the codebase where applicable.

Do not change approved architecture. Record any required architecture change as a finding.

## 5. Phase 4 — API Contract and Integration

- [ ] API coverage matches functional requirements.
- [ ] Endpoints, methods, request/response schemas, field naming, and types are consistent.
- [ ] Required/optional fields and validation rules are defined.
- [ ] Authentication, authorization, error codes, and pagination are defined.
- [ ] Filtering, sorting, idempotency, file upload/download, realtime events, and versioning are covered where applicable.
- [ ] Backend, Web, and Native Mobile responsibilities are aligned.
- [ ] Mobile has enough contract and linked business tasks, without the master repo controlling native internals.
- [ ] Contract is sufficient for independent development and integration.

## 6. Phase 5 — Development Standards and QA

- [ ] Coding standards, backend/web guidelines, and mobile integration guidelines exist.
- [ ] Git workflow, commit convention, MR standards, and code review checklist exist.
- [ ] Unit, integration, API contract, and security testing strategy exist.
- [ ] Static analysis, quality gates, DoR, and DoD exist.
- [ ] Technical debt management exists.
- [ ] Standards match the actual stack and tools.
- [ ] Standards are executable, non-duplicated, non-contradictory, and clear.
- [ ] No unrealistic requirement or unenforceable gate exists.

## 7. Phase 6 — Backlog and Issue Tracker Deep Audit

### 7.1. Scope completeness

- [ ] Every in-scope requirement has a task.
- [ ] No missing module, function, database, API, Web, mobile integration, security, testing, integration, or release task.
- [ ] No task exists for unapproved scope.

### 7.2. Task quality

- [ ] Title states the action and outcome.
- [ ] Description has enough context.
- [ ] Scope is specific.
- [ ] Responsibilities, preconditions, input/output are clear.
- [ ] Technical/API references are accurate.
- [ ] Acceptance criteria are verifiable.
- [ ] Dependencies are accurate.
- [ ] No duplicate task.
- [ ] No task bundles unrelated independent work.

Reject vague tasks such as "Implement module", "Complete API", or "Improve UI".

### 7.3. Dependency and parallel execution

- [ ] No unnecessary dependency.
- [ ] No overly long dependency chain.
- [ ] BE and Web can proceed in parallel when the contract is agreed.
- [ ] Independent modules can proceed in parallel.
- [ ] Mobile does not wait for Web internal implementation.
- [ ] Integration tasks do not depend on unrelated tasks.
- [ ] Hard and soft dependencies are distinguished.
- [ ] Real prerequisites are identified.
- [ ] No circular dependency exists.

Do not remove a real dependency merely to increase parallelism.

### 7.4. Phase and milestone

- [ ] Each phase has a clear objective and outcome.
- [ ] Tasks are in the correct phase.
- [ ] Phases with different dependencies are not mixed.
- [ ] Each phase can be accepted independently.
- [ ] Phases may overlap only when no real dependency exists.
- [ ] No ceremonial phase exists.

### 7.5. Acceptance criteria

- [ ] Specific, measurable, verifiable, unambiguous, non-duplicated, in scope, usable for review/test.
- [ ] Given/When/Then is used where appropriate.
- [ ] Functional, technical, and testing criteria are distinguished.

### 7.6. Tracker compatibility

- [ ] Title, description, type, labels, milestone, epic/parent/child relationship, dependencies, ACs, references, and effort are defined.
- [ ] Markdown syntax and internal links are valid.
- [ ] Only features supported by the current tracker version are used.
- [ ] No Issues are created or pushed during the audit.

## 8. Phase 7 — Cross-Document Consistency

Check at minimum:

1. Business Requirements ↔ Functional Specification.
2. Functional Specification ↔ Functional Design.
3. Functional Design ↔ Technical Design.
4. Functional Specification ↔ Database Design.
5. Functional Specification ↔ API Contract.
6. API Contract ↔ Integration Specification.
7. Technical Design ↔ Development Standards.
8. Development Standards ↔ QA Strategy.
9. QA Strategy ↔ Definition of Done.
10. Technical Design ↔ Backlog/Issue Tracker.
11. Functional Specification ↔ Backlog/Issue Tracker.
12. API Contract ↔ Backend/Web/Mobile Tasks.
13. Environment & DevOps ↔ Implementation Tasks.
14. All approved specifications ↔ Acceptance Criteria.

Look for:

- Conflicting definitions.
- Inconsistent naming.
- Different data types/status definitions/permission rules.
- Missing business rules.
- Incorrect references.
- Duplicate specifications.
- Outdated assumptions.
- Untraceable tasks.
- Requirements without implementation coverage.
- Tasks without specification references.

Every conflict **MUST** be identified by file, section, and content.

## 9. Phase 8 — Risk and Blocker Audit

Severity:

- **BLOCKER**: prevents starting or correctly implementing an important part of the system.
- **HIGH**: likely to cause architecture change, business error, or integration impact.
- **MEDIUM**: may affect schedule/quality but has a control.
- **LOW**: minor issue with no significant impact on starting implementation.

Each finding **MUST** include:

- ID.
- Category.
- Severity.
- Description.
- Affected documents/tasks.
- Evidence.
- Impact.
- Recommended resolution.
- Status.

Do not hide issues by lowering severity.

## 10. Phase 9 — Direct Document Correction

After the audit, correct issues that have sufficient evidence:

1. Fix inconsistencies and conflicts.
2. Add missing content only when grounded in a canonical source.
3. Standardize terminology and structure.
4. Fix cross-references.
5. Remove duplicates.
6. Improve clarity and executability of tasks.
7. Standardize Markdown for the host renderer (GitLab or equivalent).

Rules:

- Do not stop at a list of recommendations.
- Update what can be determined accurately.
- Do not create a new document when the canonical document can be updated.
- Do not change business scope.
- Do not decide issues that require approval.
- Do not delete important information.
- Do not create a CR or new backlog outside approved scope.

For unsupported or decision-required content: keep the current baseline, record a finding, propose options/impact, and do not infer.

## 11. Phase 10 — Final Validation and Baseline Freeze

- [ ] Markdown validity.
- [ ] Cross-reference validity.
- [ ] Internal links.
- [ ] Task references.
- [ ] Requirement traceability.
- [ ] API contract references.
- [ ] Dependency graph.
- [ ] Duplicate tasks.
- [ ] Missing tasks.
- [ ] Acceptance criteria completeness.
- [ ] Tracker Markdown compatibility.
- [ ] Cross-document consistency.
- [ ] All changes re-verified.

Do not mark PASS without evidence.

## 12. GO / NO-GO Definitions

- **GO — READY FOR RELEASE SYNCHRONIZATION**: all artifacts and backlog meet requirements.
- **CONDITIONAL GO — READY WITH EXPLICIT CONDITIONS**: synchronization may proceed only after listed conditions are resolved or formally accepted.
- **NO-GO — NOT READY**: a blocker or serious deviation remains; do not synchronize or start implementation.

## 13. Final Report Structure

### A. Executive Summary

Overall result, completeness level, most important issues.

### B. Audit Coverage

Documents checked, content that could not be checked, codebase scope verified.

### C. Findings and Corrections

Finding, severity, evidence, affected file/section, resolution, status.

### D. Backlog Quality Assessment

Requirement coverage, task completeness, dependency correctness, parallel execution readiness, acceptance criteria quality, tracker compatibility.

### E. Validation Results

Checks run, PASS/FAIL/NOT VERIFIED, remaining limitations.

### F. Remaining Risks

Unresolved issues, impact, conditions required.

### G. Final Decision

GO / CONDITIONAL GO / NO-GO with justification.
