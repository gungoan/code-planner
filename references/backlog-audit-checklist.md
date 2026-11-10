# Backlog Audit Checklist

## 1. Purpose

Define the read-only audit checklist for an existing backlog or Issue tracker. The audit produces a coverage matrix, issue classification, and change plan. It **MUST NOT** create, edit, or delete tracker Issues; synchronization is handled by an authorized synchronization skill. GitLab is the reference example.

This file is the detailed companion to the `backlog-audit` skill. The skill owns process order and execution; this file owns checklist detail.

## 2. Inputs

- Approved business requirements and functional specification.
- Technical design, database design, API contract, and integration design.
- Existing tracker Issues and relationships (GitLab example).
- Approved architecture decisions and constraints.
- Current backlog source-of-truth documents.

## 3. Functional Coverage Audit

Build a coverage matrix:

| Functional ID | Functional | BE | FE | Mobile Integration | Coverage |
|---|---|---|---|---|---|

Assess:

- Which functions have tasks?
- Which functions have no tasks?
- Which functions have BE but no FE?
- Which require mobile integration coordination?
- Which are decomposed incorrectly?
- Which are duplicated?
- Which lack sufficient technical specification?

Do not infer business scope outside the source documents. If the specification is unclear, record it as an open issue; do not invent an assumption.

## 4. Issue Review

Review 100% of Issues in scope.

### 4.1. Business accuracy

- Does it match the business requirement?
- Does it match the functional specification?
- Are business rules correct?
- Are validation and exception scenarios complete?
- Does it introduce scope beyond the approved requirement?

### 4.2. Technical accuracy

- Is the technical approach appropriate?
- Does it match the current architecture?
- Does it match the database design?
- Is the API contract accurate, including authentication, errors, pagination/filter/sort, file handling, data synchronization, and business state transitions where applicable?
- Does it affect other modules?
- Does it create technical debt or implementation conflict?

### 4.3. Task quality

- Is the objective clear?
- Is the scope specific?
- Are deliverables identifiable?
- Are acceptance criteria verifiable?
- Are testing requirements complete?
- Are dependencies real and necessary?
- Can it be assigned independently to one AI agent?

### 4.4. Classification

Assign exactly one:

- KEEP
- UPDATE
- SPLIT
- MERGE
- CREATE
- BLOCKED
- OBSOLETE

## 5. Decomposition Review

Check:

- Is the task too large or does it contain independent deliverables?
- Does it have a single owner?
- Does it mix backend, web, and mobile responsibilities?
- Does it mix implementation and integration without a checkpoint?
- Does it have a clear input/output contract?
- Does it have a fallback/mock strategy for incomplete dependencies?

A good task is small enough for one agent to implement, test, and hand off clearly. Do not split into trivial fragments that create overhead.

## 6. Dependency Validation

For each dependency:

1. Why must this task wait?
2. Can the dependency be removed by an API contract?
3. Can a mock or fixture be used?
4. Can tasks be re-split to run concurrently?
5. Is blocking start truly necessary?

Distinguish:

- **Traceability**: reference relationship between Issues.
- **Execution dependency**: a real prerequisite.

Do not use Blocks/Is Blocked By merely to represent a business relationship.

Check for:

- Circular dependency.
- Overly long dependency chains.
- Single point of failure.
- Bottleneck tasks.
- Cross-team blocking.
- Unnecessary dependencies.

## 7. Conflict and Ownership Analysis

For each task, identify:

- Code module ownership.
- Planned file/folder scope.
- Database table/schema ownership.
- API endpoint ownership.
- Shared components/types/configuration.
- Resources likely to be edited by multiple tasks.

Rules:

- Limit multiple tasks editing the same file.
- Do not let multiple agents define the same interface.
- Shared contracts **MUST** have one definition source.
- Migrations **MUST** have clear ownership.
- Shared-resource tasks need a coordination plan.
- Avoid depending on another task's merge when the contract is sufficient.

## 8. Phase and Priority

- Does the task belong to the correct phase?
- Is priority reasonable?
- Is a foundation task unnecessarily made a blocker?
- Can phases overlap where no real dependency exists?
- Is any task creating an avoidable bottleneck?

Execution classification:

- **FOUNDATION**: contracts, shared interfaces, schema, real shared foundations.
- **INDEPENDENT**: can start immediately.
- **CONTRACT-READY**: contract is sufficient; implementation dependency is not needed.
- **INTEGRATION**: integrates modules/systems.
- **VERIFICATION**: testing and acceptance.

## 9. Issue Tracker Standardization

GitLab is the reference example below; adapt title syntax, labels, milestones, and relationship types to the host tracker.

Check title format:

```text
[PHASE][WORKSTREAM] Task Name
```

Workstreams: BE, FE, MOBILE-INTEGRATION.

Each Issue **SHOULD** contain:

1. Objective.
2. Business Context.
3. Scope.
4. Out of Scope.
5. Functional Reference.
6. Technical Reference.
7. API Contract Reference.
8. Implementation Details.
9. Input/Output.
10. Dependencies.
11. Ownership.
12. Acceptance Criteria.
13. Testing Requirements.
14. Deliverables.

Relationships:

- Parent/Child for decomposition.
- Blocks/Is Blocked By for real execution dependencies.
- Related Issues for traceability.
- Cross-project references for WEB/MOBILE.
- No fake dependencies.

Cross-project rules:

- WEB repository manages master functional Issues, BE/FE implementation Issues, mobile integration coordination Issues, and the API contract.
- MOBILE repository only holds coordination/integration Issues; no native coding tasks created by the master repo.
- Every mobile Issue references the WEB functional Issue and contract.

## 10. Final Validation

### Functional coverage

- 100% of in-scope functional requirements are accounted for.
- No functional requirement is missing.
- No unapproved scope exists.

### Task quality

- No oversized task.
- No vague scope.
- No duplicate task.
- Acceptance criteria are verifiable.
- Test requirements are complete.

### Parallel execution

- No fake dependency.
- No circular dependency.
- No unnecessary bottleneck.
- FE does not wait for BE implementation when the contract is agreed.
- Mobile does not wait for WEB UI completion.
- Teams can work independently.

### Integration correctness

- API contract is consistent.
- Data mapping is accurate.
- Business rules are consistent.
- Error handling is consistent.
- Cross-project references are complete.

### Ownership

- Every task has an owner.
- No multiple agents own one deliverable.
- No unmanaged resource conflict.

## 11. Final Report

### A. Backlog Summary

Initial Issues, Issues after review, kept, updated, split, merged, new, new subtasks.

### B. Workstream Distribution

| Workstream | Existing | New | Updated | Total |
|---|---:|---:|---:|---:|
| BE | | | | |
| FE | | | | |
| MOBILE-INTEGRATION | | | | |

### C. Functional Coverage

Total functions, with tasks, missing tasks, insufficient specification, requiring mobile integration.

### D. Parallel Execution Analysis

Independent tasks, contract-ready tasks, real dependencies, removed dependencies, critical path, parallel groups, remaining bottlenecks.

### E. Cross-project Integration

Related WEB Issues, MOBILE coordination Issues, cross-project references, contracts to synchronize, issues requiring two-team confirmation.

### F. Outstanding Issues

Unresolved issues, cause, impact, and the person/team who must confirm.
