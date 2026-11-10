---
name: technical-decomposition
description: Convert approved business requirements and functional specifications into technical architecture, data/API/integration contracts, a 5-level decomposition, and an Issue-ready parallel task catalog. Use for architecture design, contract design, task decomposition, and implementation planning. Do not use for auditing an existing backlog, writing code, or creating tracker Issues.
license: MIT
---

# Technical Decomposition and Parallel Implementation Planning

## 1. Purpose

Turn approved business requirements into a technical specification and implementation task catalog that multiple AI agents can execute in parallel with minimal blocking and clear integration points.

## 2. When to Use

- An approved BRD/FS must become architecture and technical contracts.
- A task catalog and parallel execution plan are required.
- The project needs a 5-level decomposition from domain to implementation task.
- Issue-ready task descriptions for the host tracker must be prepared. GitLab is the reference template.

## 3. When Not to Use

- Do not use to audit an existing backlog; use `backlog-audit`.
- Do not use to create, edit, or push tracker Issues; use an authorized synchronization skill after GO (for GitLab, `gitlab-backlog-sync`).
- Do not use to implement code or change application behavior.
- Do not use to invent business requirements or change approved scope.

## 4. Inputs

- Approved BRD/FS and related business rules, roles, data, screens, reports, integrations, and NFRs.
- Source-of-truth location (repository, wiki, or document path) supplied at runtime.
- Existing codebase, technology stack, conventions, and constraints.
- Approved architecture decisions and contracts.
- Workstream model and ownership rules.

## 5. Preconditions

- The specification source is accessible.
- The current codebase has been inspected before architecture decisions.
- No critical business question is silently assumed away.
- The user has not asked for code implementation.

## 6. Process

### Phase 1 — Specification discovery and review

1. List every relevant document/page.
2. Read the full content of each in-scope source.
3. Record version, path, or stable source identifier.
4. Cross-check for conflicts, duplication, missing specification, inconsistent terminology, unclear rules, unallocated Web/Mobile functions, incomplete flows, undefined permissions, and insufficient data requirements.
5. Determine the authoritative source for each type of information.
6. Do not modify business requirements, functional design, or Web/Mobile allocation.
7. Do not infer business gaps.

If a source is inaccessible, report the exact path, do not claim it was read, do not assume its content, continue with grounded work, and mark blocked parts.

### Phase 2 — Codebase and technology assessment

- Identify repository structure, applications, packages, runtimes.
- Identify frameworks, languages, libraries, and tooling.
- Identify conventions, coding standards, and source organization.
- Identify existing foundations, build/test/lint/typecheck/deployment workflows, and technical constraints.
- Do not assume a stack from another project.
- Do not change the technology stack without a clear technical reason.
- Do not propose a rewrite without evidence.
- Distinguish current state from target architecture.
- If the repository is clean/blank, confirm it and do not create unnecessary legacy migration tasks.

### Phase 3 — Architecture and contracts

Design architecture appropriate to the requirements, specification, and actual codebase. Cover the areas in `shared/architecture-and-data-standards.md`: system context, deployment, backend/web/mobile/PWA boundaries, data ownership, API/integration, auth/authz, observability, configuration, failure handling, security, performance/scalability, and delivery.

PWA belongs to FE; native mobile architecture is owned by the Mobile team and is out of scope here.

For each significant decision, record an ADR: decision, context, alternatives, rationale, trade-offs, impacted components, risks, and related requirements. Do not over-engineer or create abstractions for hypothetical scale.

### Phase 4 — Contract-first specification

Define data, API, frontend, and integration contracts using `shared/architecture-and-data-standards.md` and `shared/api-contract-standards.md`. For each contract, record ID, version/revision, owner, provider, consumers, source reference, compatibility rules, and approval status.

Agents **MUST** implement against agreed contracts. **MUST NOT** change a shared contract without impact analysis and consumer updates.

### Phase 5 — Functional-to-technical decomposition

Apply the 5-level model in `references/decomposition-model.md` (L1 Domain → L2 Module → L3 Capability → L4 Component → L5 Task). Produce domain/module/capability/component catalogs, functional-to-technical mapping, ownership map, and requirement-to-task traceability. Every node **MUST** have a stable ID, name, description, parent, and source reference.

### Phase 6 — Dependency and parallelism optimization

Apply the dependency classification and parallelization rules in `references/decomposition-model.md`. Build the dependency graph, execution waves, parallel groups, critical path, and bottleneck analysis. Ensure shared resources have clear ownership. **MUST NOT** create fake independence or unnecessary serialization.

### Phase 7 — Implementation task breakdown

Each task **MUST** satisfy `references/task-schema.md`: one objective/deliverable, scope/out-of-scope, single ownership, input/output contracts, classified dependencies, independent testability, verifiable acceptance criteria, test requirements, mock/stub strategy, integration checkpoint, Definition of Done, stable Task ID, and requirement traceability. Do not create title-only tasks.

### Phase 8 — Issue tracker preparation

- Standardize titles and descriptions.
- Assign stable Task IDs.
- Propose hierarchy, labels, milestones, owner profiles.
- Keep the tracker hierarchy shallow and non-duplicative; use only features supported by the actual instance.
- Do not assume a tracker feature is enabled; if unsupported, propose Issue links, labels, or conventions.
- Check the Issue Quality Gate in `references/task-schema.md`. The template is GitLab-first; adapt fields to the host tracker.
- Prepare Markdown or machine-readable data if needed.
- **MUST NOT** create, edit, push, or delete tracker Issues in this workflow.

### Phase 9 — Testing and quality strategy

Define the test strategy for each component/task:

- Unit, integration, contract, database, permission/authorization, validation, error handling, cross-module compatibility tests.
- Test scope and acceptance criteria per task.
- Quality gates: build, typecheck, lint, unit tests, integration tests, contract validation, security checks where appropriate.
- Do not add E2E testing if the specification/project does not require it.
- Do not defer all testing to the end.

### Phase 10 — Documentation and final validation

Before creating a document, inspect the existing `docs/` structure; update the canonical document instead of creating a duplicate. Organize deliverables under the existing structure. Validate:

- Specification coverage.
- Dependency correctness.
- Parallel execution viability.
- Duplicate tasks.
- Issue-tracker readiness.
- Traceability.
- Open questions, risks, assumptions.
- AI coding readiness.

## 7. Rules

- **MUST** start from business capability, not screens or endpoints.
- **MUST** keep every task traceable to a requirement or approved decision.
- **MUST** classify and justify every dependency.
- **MUST** provide contracts sufficient for independent implementation.
- **MUST** define ownership for shared resources.
- **MUST NOT** write code or change source code.
- **MUST NOT** change business requirements, functional design, or Web/Mobile allocation.
- **MUST NOT** perform UI/UX design in this phase. Missing UI/UX design **MUST NOT** block technical decomposition when functional behavior and contracts are sufficient.
- **MUST NOT** add scope, create a CR, or invent business logic.
- **MUST NOT** create fake tracker Issue IDs/URLs.
- **MUST NOT** assign people or agents without data.
- **MUST NOT** hide assumptions, risks, or open questions.
- **MUST NOT** mark unverified work complete.
- **SHOULD** minimize dependencies without weakening correctness.
- **SHOULD** integrate incrementally, not only at the end.
- **MAY** use mocks/stubs/fixtures to decouple provider and consumer progress.

### Stop Conditions

Stop and ask the user when:

- The approved BRD/FS or the source-of-truth location is unavailable.
- Business requirements or functional design conflict and no authoritative decision exists.
- A contract, data ownership, or architecture decision is required but not approved.
- The request would change approved scope, architecture, or Web/Mobile allocation.
- The codebase is inaccessible and the current state cannot be determined.
- The user asks to create/push tracker Issues or implement code in this workflow.

## 8. Outputs

- Technical architecture and ADRs.
- Functional domain/module/capability maps.
- Technical component catalog.
- Functional-to-technical mapping.
- Data model and database design.
- API/integration contracts.
- Security/permission design.
- Dependency matrix/graph.
- Parallel execution plan, critical path, and bottleneck analysis.
- Implementation task catalog.
- Tracker-ready Issue descriptions (GitLab template by default).
- Task-to-requirement traceability matrix.
- Testing/quality strategy.
- Open questions, risks, assumptions.
- AI coding readiness report.

### Final Report Structure

- **Specification review**: sources read, inaccessible sources, conflicts/gaps, cross-check result.
- **Technical architecture**: overview, boundaries, components, decisions, constraints.
- **Technical contracts**: data, API, frontend, integration, ownership.
- **Decomposition**: domain → module → capability → component → task; functional-to-technical mapping; traceability.
- **Parallel implementation plan**: dependency graph, classification, groups, waves, critical path, bottlenecks, metrics, checkpoints.
- **Issue tracker package**: task catalog, titles, Markdown descriptions, parent/related mapping, labels, milestones, agent profiles, stable IDs, sync mapping, ineligible Issues and reasons.
- **Quality and readiness**: test strategy, quality gates, risks, assumptions, open questions, AI coding readiness.

## 9. Verification

- [ ] All accessible specification sources were read; inaccessible sources are reported.
- [ ] BR, functional design, and Web/Mobile allocation were cross-checked.
- [ ] Architecture and contracts are clear enough for independent work.
- [ ] Decomposition covers all 5 levels.
- [ ] Every task is traceable to a requirement.
- [ ] Every dependency is classified and justified.
- [ ] No fake dependency or unnecessary serialization exists.
- [ ] Independent tasks are grouped for parallel execution.
- [ ] Mock/stub strategy exists for incomplete dependencies.
- [ ] Shared resources have clear ownership.
- [ ] Critical path and bottlenecks are analyzed.
- [ ] Integration checkpoints exist.
- [ ] Every task has scope, guidance, acceptance criteria, and test requirements.
- [ ] Task structure is compatible with the host tracker (GitLab template by default).
- [ ] Stable IDs and mapping exist.
- [ ] No duplicate or oversized task remains unexamined.
- [ ] No important technical decision is left for an agent to invent.
- [ ] Risks, assumptions, and open questions are reported.

## 10. References

- `references/workstream-model.md` — ownership boundaries and cross-team rules.
- `references/decomposition-model.md` — 5-level model, dependency types, waves, parallel groups.
- `references/task-schema.md` — required fields, Issue template (GitLab reference), quality gate.
- `shared/architecture-and-data-standards.md` — architecture and data rules.
- `shared/api-contract-standards.md` — API contract rules.
- `shared/security-standards.md` — security and data-protection requirements.
- `shared/testing-standards.md` — test strategy.
- `shared/documentation-standards.md` — deliverable organization and cross-references.
- `shared/quality-gates.md` — DoR/DoD and gates.
- `shared/engineering-principles.md` — decision rules.

## 11. Final Principle

Design work so agents wait for contracts, not for each other's code. Optimize for independent execution, minimal dependencies, continuous integration, and tracker-ready tasks. Correctness, security, data integrity, and maintainability take precedence over parallelism.

## 12. Handoff

Hand off using: STATUS, ARTIFACTS, DECISIONS, OPEN QUESTIONS, RISKS, NEXT, EVIDENCE. The next skill is normally `backlog-audit` if a backlog exists, then `technical-readiness`.
