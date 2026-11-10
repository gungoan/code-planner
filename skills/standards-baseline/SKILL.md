---
name: standards-baseline
description: Establish and verify development standards, coding conventions, testing strategy, CI quality gates, security baseline, and Definition of Ready/Done for a project. Use when a project needs a standards baseline before implementation. Do not use for feature implementation, architecture redesign, or backlog creation.
license: MIT
---

# Development Standards and QA Baseline

## 1. Purpose

Assess the project's current standards and establish a practical, enforceable baseline for development and quality assurance. The standards themselves live in `shared/`; this workflow applies and verifies them against the actual codebase and CI.

## 2. When to Use

- The project has completed the technical-readiness review and is preparing to enter implementation.
- Coding, testing, review, Git, and quality-gate standards must be established or normalized.
- CI/CD quality gates and DoR/DoD must be verified.
- Existing standards are inconsistent, incomplete, or unsuitable for the actual stack.

## 3. When Not to Use

- Do not use to implement business features.
- Do not use to change approved architecture or contracts.
- Do not use to create a backlog or tracker Issues.
- Do not use to assign tasks or agents.

## 4. Inputs

- Approved BRD/FS and technical design.
- API contract, data model, and integration specification.
- Existing source code, configuration, CI/CD pipeline, and tooling.
- Existing development documentation and standards.
- Backlog and implementation plan for the host tracker.

## 5. Preconditions

- The codebase and CI configuration are accessible.
- The technology stack is known; do not assume a stack.
- Approved architecture and contracts are available for comparison.
- The user authorizes configuration changes needed to establish the baseline.

## 6. Process

### Phase 1 — Development baseline assessment

Review:

1. Project structure and module organization.
2. Coding and naming conventions.
3. Dependency/package management.
4. Import/export conventions.
5. Error/exception handling.
6. Logging conventions.
7. Configuration management.
8. Environment variables and secret handling.
9. Type safety and validation.
10. Reusable components/services/utilities.
11. Database access and transaction patterns.
12. API implementation patterns.
13. Authentication/authorization patterns.
14. Security development practices.
15. Documentation and code annotation.

Assess what exists, what is missing, what is inconsistent, what is unsuitable, and what codebase issues may affect implementation. Do not require a full refactor; fix only what is needed for the baseline or to remove real blockers.

### Phase 2 — Coding standards

Apply `shared/coding-standards.md`. Record only project-specific extensions or deviations, with justification and approval. Do not duplicate shared content in project docs.

### Phase 3 — Git workflow and code management

Apply `shared/git-delivery-standards.md` and `shared/code-review.md`. Verify the project's branching, commit, MR, review, approval, merge, protection, and traceability settings. Do not impose a model that conflicts with the documented project workflow.

### Phase 4 — Testing strategy

Apply `shared/testing-standards.md`. Define the project-specific test scope, coverage thresholds by risk, ownership, evidence requirements, and approval conditions for E2E.

### Phase 5 — Static analysis and automated gates

Apply the gates in `shared/quality-gates.md`. Review existing formatter, linter, type-check, static analysis, dependency/secret scanning, test execution, build, and artifact validation. Define pass/fail and failure handling. Do not add tools without a need.

### Phase 6 — Security baseline

Apply `shared/security-standards.md`. Verify the project's authentication, authorization, input/output, sensitive data, secrets, file handling, rate limiting, audit, dependency security, and workstream-specific controls. Do not change approved security architecture.

### Phase 7 — Definition of Ready and Done

Apply `shared/quality-gates.md` to define DoR, DoD, task-type-specific DoD, and required evidence. Verify that they can be applied directly to the backlog.

### Phase 8 — Documentation and knowledge management

Apply `shared/documentation-standards.md`. Verify required documentation, ADR references, release notes, technical debt, and traceability between code, docs, and Issues. Do not create formal documentation without value or duplicate canonical docs.

### Phase 9 — Technical debt and exceptions

Define:

- Mandatory vs recommended standards.
- Allowed exceptions and approval level.
- Technical debt recording, impact, owner, and remediation.
- Conditions and deadlines.
- How to avoid uncontrolled debt.

Do not hide debt by lowering quality gates.

### Phase 10 — Final standards validation

Check:

1. Standards fit the architecture.
2. Guidelines fit the codebase.
3. Backend and Web share integration principles.
4. Mobile can meet common contract standards.
5. Testing strategy is feasible with current tooling.
6. Quality gates are executable in CI/CD.
7. DoR/DoD align with the backlog.
8. Code review covers important risks.
9. Security standards cover sensitive areas.
10. Documentation is sufficient and non-duplicated.

Detect and resolve contradictions, duplication, missing standards, unrealistic requirements, unnecessary complexity, unclear responsibilities, unenforceable gates, and inconsistent terminology.

## 7. Rules

Allowed:

- Review technical documents, source code, and configuration.
- Update canonical standards documents.
- Adjust lint/formatter/typecheck/testing configuration when needed.
- Add CI quality gates when missing and appropriate.
- Add templates/checklists.
- Remove duplicated or outdated standards.
- Run validation commands to prove feasibility.

Prohibited:

- Change business requirements or functional scope.
- Change approved API contracts or architecture.
- Implement business features.
- Perform unnecessary broad refactoring.
- Create backlog or tracker Issues.
- Assign tasks or agents.
- Create duplicate documents.
- Define standards without technical basis.
- Report PASS without running the check.

### Change Management

When updating standards or configuration:

1. Inspect existing documents and configuration before editing.
2. Identify the authoritative source and the reason for the change.
3. Update the canonical document rather than creating a copy.
4. Do not delete a document until replacement or no-value is confirmed.
5. Preserve approved decisions and unrelated content.
6. Verify cross-references after the change.
7. Verify the actual configuration/tooling after the change.
8. Record the change, rationale, and unresolved issues.

### Stop Conditions

Stop and ask the user when:

- The codebase or CI configuration is inaccessible.
- A required standard conflicts with approved architecture, contract, or security policy.
- A quality-gate threshold or exception requires a decision not provided by the project.
- Required tooling is unavailable and cannot be validated.
- The user asks to implement features, change architecture, or create backlog.

## 8. Outputs

- Updated standards/guidelines (or references to shared standards).
- Backend, web, and mobile integration guidelines (via `shared/coding-standards.md`).
- Git workflow and MR templates/checklists.
- Test strategy and coverage policy.
- CI quality gates and configuration.
- Security baseline.
- DoR/DoD.
- Documentation and technical-debt policy.
- Assessment report and validation results.
- Final recommendation: READY / READY WITH CONDITIONS / NOT READY.

### Final Report Structure

- **Executive summary**: current state, important issues, completed work, readiness assessment.
- **Assessment results**: coding, backend, web, mobile integration, Git workflow, testing, quality gates, security, DoR/DoD, documentation — PASS / PARTIAL / FAIL / NOT APPLICABLE.
- **Changes applied**: files created/edited, configuration changed, new rules, rationale and impact.
- **Outstanding issues**: unresolved issue, reason, severity (BLOCKER/HIGH/MEDIUM/LOW), impact, proposed resolution.
- **Validation results**: lint, type-check, unit tests, build, static analysis, CI pipeline, configuration validation. Report NOT VERIFIED with the reason when a check could not run.
- **Final recommendation**: READY / READY WITH CONDITIONS / NOT READY with justification.

## 9. Verification

- [ ] Development standards are clear, practical, and consistent.
- [ ] BE, FE, and MOBILE responsibilities are clear.
- [ ] Coding conventions fit the actual stack.
- [ ] Testing strategy is executable.
- [ ] Quality gates are executable.
- [ ] Security baseline is defined.
- [ ] Git workflow and code review process are clear.
- [ ] DoR/DoD apply directly to the backlog.
- [ ] No conflict remains between standards and approved documents.
- [ ] Configuration changes are verified.
- [ ] Unresolved issues are reported transparently.
- [ ] PASS is reported only for checks actually run.

## 10. References

- `shared/engineering-principles.md`
- `shared/architecture-and-data-standards.md`
- `shared/api-contract-standards.md`
- `shared/coding-standards.md`
- `shared/security-standards.md`
- `shared/testing-standards.md`
- `shared/code-review.md`
- `shared/documentation-standards.md`
- `shared/git-delivery-standards.md`
- `shared/quality-gates.md`
- `references/workstream-model.md`

## 11. Handoff

Hand off using: STATUS, ARTIFACTS, DECISIONS, OPEN QUESTIONS, RISKS, NEXT, EVIDENCE. The next skill is normally `final-consistency-audit`.
