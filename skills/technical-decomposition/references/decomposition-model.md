# Decomposition and Parallel Execution Model

## 1. Purpose

Define the 5-level decomposition model, dependency classification, task independence rules, and parallel execution planning used by the `technical-decomposition` skill and referenced by backlog audit and readiness workflows.

This is the canonical decomposition model. Referencing workflows **MUST NOT** redefine it with conflicting rules.

**Scope note:** "Mobile" in this model refers to mobile integration/coordination tasks owned by the master repo. Native mobile implementation is owned by the Mobile team and is out of scope for this decomposition model.

## 2. Five-Level Model

| Level | Name | Purpose |
|---|---|---|
| L1 | Functional Domain | Large business area |
| L2 | Functional Module | Group of functions within a domain |
| L3 | Functional Capability | Specific business capability |
| L4 | Technical Component | Software component implementing a capability |
| L5 | Implementation Task | Assignable and verifiable unit of work |

Every node **MUST** have a stable ID, name, description, parent reference, and source reference.

## 3. Decomposition Rules

- Start from business capability, not from screens or API endpoints.
- Do not equate functional modules with technical modules.
- One capability may require multiple technical components.
- One component may serve multiple capabilities; represent many-to-many relationships where applicable.
- Do not omit business logic just because it has no dedicated UI.
- Include backend, web, mobile integration/coordination, database, integration, security, and testing when relevant.
- Distinguish shared capabilities from domain-specific ones.
- Do not create capabilities/modules/components without evidence from the spec or an approved architecture decision.

## 4. Decomposition Deliverables

- Functional Domain Map.
- Functional Module Map.
- Functional Capability Catalog.
- Technical Component Catalog.
- Functional-to-Technical Mapping.
- Technical Component Ownership Map.
- Requirement-to-Task Traceability Mapping.

## 5. Dependency Classification

| Type | Meaning | Execution rule |
|---|---|---|
| **Hard** | Must complete first due to technical or correctness constraint | Sequential |
| **Contract** | Only the contract **MUST** be agreed/published | Can run in parallel |
| **Integration-only** | Dependency applies only at integration time | Implement independently |
| **Soft** | Can use mock/stub/fixture or alternative | Prefer parallel |
| **None** | No dependency | Fully parallel |

Only use Hard Dependency with a concrete justification.

## 6. Dependency Minimization Questions

For every dependency, answer:

1. Why does this task need the other task?
2. Is it a hard technical prerequisite?
3. Can it be replaced by a contract, interface, mock, stub, or fixture?
4. Can both tasks run concurrently and integrate later?
5. If the dependency slips, which tasks can still proceed?

Do not create a dependency merely because:

- Both tasks belong to the same module.
- One task calls an API implemented by another.
- One task uses a schema defined by another when the schema contract is stable.
- Backend is not finished, so Web/Mobile must wait.
- Another agent has not merged code, but the contract is agreed.

## 7. Shared Foundation Strategy

Identify shared foundations, for example:

- Authentication/authorization.
- User/organization/tenant context.
- Database foundation.
- API conventions.
- Shared types/contracts.
- Error handling.
- Logging/audit.
- Configuration.
- File storage.
- Notification.
- Common UI infrastructure.

For each foundation, determine:

- What must be completed first.
- What only needs a contract.
- What can be implemented in parallel.
- What can be mocked.
- Owner.
- Which tasks are truly blocked.

Do not force all functional modules to wait for all shared foundations.

## 8. Task Independence Requirements

Each task **MUST** have:

- One clear objective and deliverable.
- Specific scope and out-of-scope.
- A single owner.
- Input/output contracts.
- Classified dependencies.
- Independent testability.
- Verifiable acceptance criteria.
- Limited shared-file edits.
- No dependency on undecided decisions.
- A fallback when a dependency is not complete.

When multiple agents must edit a shared resource:

- Prefer a single owner for the shared resource.
- Or split ownership by file/module.
- Or agree the contract and let consumers implement independently.
- Or create a specific integration checkpoint.

## 9. Task Sizing

- **S**: small scope, one clear deliverable, low impact.
- **M**: one capability/component with multiple steps but one owner.
- **L**: multiple deliverables or high integration risk.

L tasks **MUST** be reviewed for further splitting if independent slices exist. Do not split if it destroys consistency or creates unnecessary overhead. Do not estimate time without a basis; use relative complexity/effort.

## 10. Execution Waves

Reference structure, not a mandatory template:

- **Wave 0**: Architecture decisions and shared contracts.
- **Wave 1**: Shared foundations and independent functional modules.
- **Wave 2**: Parallel backend/web/mobile-integration implementation.
- **Wave 3**: Cross-module integration.
- **Wave 4**: Functional validation, testing, and fixing.
- **Wave 5**: Release preparation.

Adapt to actual dependencies; do not apply mechanically.

## 11. Parallel Groups

Group tasks that can run concurrently. Each group **MUST** specify:

- Member tasks.
- Start condition.
- Tasks that can run in parallel.
- Remaining dependencies.
- Exit condition.
- Integration checkpoint.

Example:

| Group | Task examples | Condition |
|---|---|---|
| PG-01 | Shared contracts, independent domain analysis | No shared resource edits |
| PG-02 | Backend Module A, Backend Module B | Contract and ownership clear |
| PG-03 | Web Module A, Mobile Integration Module A | API/UI data contract agreed |
| PG-04 | Independent unit tests, fixtures, utilities | Test target defined |
| PG-05 | Cross-module integration | Provider/consumer ready |

## 12. Critical Path and Bottlenecks

Analyze:

- Critical path.
- Hard dependency chains.
- Shared foundation bottlenecks.
- Contract bottlenecks.
- Database/schema ownership conflicts.
- Shared-file conflicts.
- Agent capacity bottlenecks.
- Integration bottlenecks.

Mitigations:

- Agree contracts early.
- Split ownership.
- Use mocks/stubs.
- Split by bounded context.
- Separate schema ownership.
- Convert a dependency to integration-only when safe.
- Create small enabling tasks to unblock many tasks.

## 13. Parallelism Metrics

Report:

- Total tasks.
- Independent tasks.
- Parallelizable tasks.
- Hard/Contract/Integration-only dependency counts.
- Maximum parallelism.
- Critical path length.
- Number of execution waves.
- Blocking tasks.
- Shared resource conflicts.
- Tasks requiring mocks/stubs.
- Potential bottlenecks.

Explain assumptions and calculation. Do not fabricate precise numbers without a dependency graph.

## 14. Optimization Objective

Reduce total completion time and waiting time between agents, not maximize task count. Correctness, security, data integrity, and maintainability take precedence.
