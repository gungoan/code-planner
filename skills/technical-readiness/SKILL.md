---
name: technical-readiness
description: Assess technical readiness across API/data contracts, architecture, implementation feasibility, Web/Mobile integration, backlog quality, standards/CI, and performance/security/scalability. Use before the final audit. Do not use to create tasks, assign work, or make the final GO/NO-GO decision.
license: MIT
---

# Technical Readiness Review

## 1. Purpose

Determine whether the technical foundation is ready for implementation. This is an earlier, broader readiness assessment; it precedes the standards baseline and the final GO/NO-GO owned by `final-consistency-audit`.

## 2. When to Use

- The project has a BRD, technical design, and backlog and is preparing for implementation.
- API/data contracts, architecture, standards, CI, and integration readiness must be assessed.
- The team needs a READY / NEEDS IMPROVEMENT / BLOCKED status before the final gate.

## 3. When Not to Use

- Do not use to create or edit tracker Issues.
- Do not use to assign people or agents.
- Do not use to implement features.
- Do not use as the final GO/NO-GO audit; use `final-consistency-audit`.

## 4. Inputs

- Approved BRD/FS and technical design.
- API contract, data model, integration specification.
- Backlog and implementation plan for the host tracker.
- Existing standards, test strategy, and CI/CD configuration, or their absence as an explicit assessment item.
- Existing codebase and environment configuration.

## 5. Preconditions

- The approved requirements, technical design, contracts, and backlog are available.
- Access to the codebase and CI configuration is verified.
- The standards baseline has been established or its absence is an explicit assessment item.
- The user has not requested task creation, assignment, or a final GO/NO-GO decision.

## 6. Process

### Phase 1 — Evidence collection

Inventory the documents, contracts, backlog, codebase, and CI configuration to be assessed. Identify what is accessible and what is not.

### Phase 2 — API contract and data model readiness

Check:

- Endpoints, methods, request/response DTOs.
- Data types, enums, validation rules.
- Error codes and responses.
- Authentication/authorization.
- Pagination, filtering, sorting.
- File upload/download, data synchronization.
- Database schema, relationships, constraints, indexes.
- Migration strategy.

Verify consistency across BE, FE, and Mobile integration. Prefer OpenAPI and contract validation where appropriate.

### Phase 3 — Architecture and module design

Check:

- System/application architecture.
- Module and service boundaries.
- Database/API ownership.
- Shared components/utilities.
- Configuration, error handling, logging.
- Security architecture.
- Caching/performance.
- Integration architecture.

Verify clarity, consistency, low coupling, no circular dependency, and no over-engineering.

### Phase 4 — Implementation readiness per function

For each functional area, check:

- Technical design completeness.
- Database design clarity.
- API contract completeness.
- Business rules implementability.
- Validation rules.
- State transitions.
- Permission matrix.
- Integration points.
- Error scenarios.
- Important edge cases.

Record missing, ambiguous, or contradictory content.

### Phase 5 — Web/Mobile integration governance

The WEB/master repository owns business requirements, functional specification, technical design, and API contract. The MOBILE repository is independently managed by the native team.

Review only coordination content:

- Business mapping.
- API contract alignment.
- Request/response mapping.
- Authentication/authorization.
- Business rules.
- Error handling.
- Data synchronization.
- Upload/download contract.
- Integration acceptance criteria.
- API impact assessment.

Do not decompose, design, or manage native implementation tasks.

### Phase 6 — Backlog readiness

Review functional coverage, task scope, acceptance criteria, technical references, API/DB references, dependencies, priority/phase, parent/child, related Issues, and block relationships. Ensure tasks are clear enough to test and implement independently when no real dependency exists.

### Phase 7 — Development standards and CI/CD

Review:

- Coding conventions, project structure, naming.
- Error handling, logging, validation.
- Security practices, database migration, API versioning.
- Documentation standards.
- Unit/component/API/integration/regression testing.
- Lint, type-check, tests, migration validation, build, security scan, static analysis, contract validation.
- Pipeline performance, caching, parallel execution, merge conditions.

Do not add E2E testing unless approved. Do not add tools merely for popularity.

### Phase 8 — Performance, security, and scalability

Review:

- Response time, throughput, concurrent users.
- Database performance, caching, resource utilization.
- Authentication/authorization, data protection, input validation.
- File security, audit logging, error monitoring.
- Backup/recovery, scalability.

Compare against actual project scope and goals. Do not invent KPIs.

### Phase 9 — Classification and report

Classify each area:

- **READY**: complete and verified.
- **NEEDS IMPROVEMENT**: requires completion but not fully blocked.
- **BLOCKED**: cannot proceed until resolved.

Each issue must include cause, impact, proposed resolution, and actual status.

## 7. Rules

- **MUST** base conclusions on evidence from documents/code/CI.
- **MUST NOT** create tasks, Issues, or backlog items.
- **MUST NOT** recreate existing documents or create duplicate documents; update the canonical source.
- **MUST NOT** assign tasks or agents.
- **MUST NOT** plan execution per agent.
- **MUST NOT** change business scope or add functions.
- **MUST NOT** implement business logic.
- **MUST NOT** use workarounds to hide readiness gaps.
- **MUST NOT** change technology without a clear technical reason.
- **MUST NOT** invent KPIs or readiness percentages.
- **SHOULD** fix canonical documents directly when the correction is grounded.
- **SHOULD** preserve traceability for every change.
- **MAY** propose follow-up actions without executing them.

### Stop Conditions

Stop and ask the user when:

- Required evidence (document, contract, code, CI, or test result) is unavailable.
- A readiness gap requires a scope, architecture, or contract change.
- A KPI or performance target is missing and would require invention.
- The user asks to assign tasks, create Issues, or declare the final GO/NO-GO.
- A blocker cannot be classified without a business/technical decision.

## 8. Outputs

1. API contract and data model readiness.
2. Architecture and module design assessment.
3. Technical implementation readiness.
4. WEB/MOBILE integration readiness.
5. Backlog and Issue-tracker readiness.
6. Development and quality standards assessment.
7. CI/CD readiness.
8. Performance, security, and scalability assessment.
9. Outstanding issues and technical risks.
10. Overall readiness status.

## 9. Verification

- [ ] Technical documents are coherent and non-contradictory.
- [ ] API contract and data model are consistent.
- [ ] Architecture/module design is clear.
- [ ] Functional areas are technically implementable.
- [ ] WEB/MOBILE integration contract is clear.
- [ ] Backlog has traceability and correct dependencies.
- [ ] Quality standards are defined.
- [ ] CI/CD has necessary gates.
- [ ] Security and performance are assessed.
- [ ] No unidentified serious blocker remains.
- [ ] Every PASS is backed by evidence.

## 10. References

- `references/workstream-model.md` — ownership boundaries.
- `shared/api-contract-standards.md` — contract consistency.
- `shared/architecture-and-data-standards.md` — architecture/data checks.
- `shared/coding-standards.md` — code and structure readiness.
- `shared/code-review.md` — review readiness.
- `shared/documentation-standards.md` — documentation readiness.
- `shared/git-delivery-standards.md` — delivery and traceability readiness.
- `shared/testing-standards.md` — test readiness.
- `shared/security-standards.md` — security checks.
- `shared/quality-gates.md` — DoR/DoD and gates.
- `shared/engineering-principles.md` — evidence and decision rules.

## 11. Handoff

Hand off using: STATUS, ARTIFACTS, DECISIONS, OPEN QUESTIONS, RISKS, NEXT, EVIDENCE. The next skill is normally `standards-baseline`, then `final-consistency-audit`.
