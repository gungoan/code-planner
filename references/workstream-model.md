# Workstream Model

## 1. Purpose

Define ownership boundaries and collaboration rules between BA, Tech Lead/Architecture, BE, FE, native MOBILE, MOBILE-INTEGRATION, QA, and DevOps. Use this model in planning, backlog audit, readiness, and final audit.

This is the canonical ownership model. A repository-level operating contract may summarize it for routing, but **MUST NOT** replace it with a conflicting rule.

## 2. Workstreams

| Workstream | Owns | Must not own |
|---|---|---|
| **BA** | Business analysis, requirement elicitation, business processes, business rules, business data requirements, business roles/permissions, business scenarios, BRD documentation, business traceability | Architecture, database, API, infrastructure, technical task breakdown, technology selection |
| **TL / Architecture** | Technical architecture, contracts, decomposition model, dependency graph, task catalog, implementation planning, technical quality gates | Business scope decisions, native mobile internal implementation |
| **BE** | Backend architecture, domain model, database schema, API contract, business logic, integrations, backend tests | Web UI, native mobile UI, FE state |
| **FE** | Web frontend architecture, UI implementation, component system, state management, API consumption, web tests | Backend business logic, database schema, native mobile implementation |
| **MOBILE (native)** | Native app architecture, navigation, lifecycle, native UI, device capabilities, offline storage, push notifications, native tests | Web repo architecture, backend contract definition, FE implementation |
| **MOBILE-INTEGRATION** | Business mapping, business-rule alignment, contract alignment, request/response mapping, error-code alignment, integration acceptance criteria, API change impact assessment | Native architecture, native coding, native UI, native internal tests, native release management |
| **QA** | Test strategy, test design, quality gates, verification evidence, defect analysis | Product scope decisions, architecture decisions |
| **DevOps** | CI/CD, environments, deployment, observability, secrets infrastructure, rollback | Business logic, feature design |

Mobile web/PWA belongs to **FE**. Native iOS/Android belongs to **MOBILE**.

## 3. Repository Topology

The default project topology has two repositories:

### 3.1. Master/WEB repository

- Source of truth for business requirements, functional specification, technical design, API contract, and the master functional backlog.
- Holds BE/FE implementation tasks and mobile integration coordination tasks.
- Owns the published API contract.

### 3.2. Mobile repository

- Owned by the native Mobile team.
- The Mobile team manages its own architecture, technical design, decomposition, implementation, and internal testing.
- The master repo may create only Mobile business/integration coordination Issues, linked to the WEB functional Issue and API contract.
- The master repo **MUST NOT** decompose native implementation tasks or manage duplicate Mobile internal work.

If the project uses a different topology, document it explicitly; do not assume the default.

## 4. Contract Ownership

- BE owns the API contract definition.
- FE and MOBILE consume the published contract.
- MOBILE-INTEGRATION coordinates alignment and acceptance; it does not redefine the contract.
- A contract change **MUST** include impact analysis, spec update, consumer notification, and contract-test update.

## 5. Collaboration Rules

### 5.1. BA → TL

- BA delivers business requirements, rules, data requirements, roles, scenarios, and open questions.
- TL **MUST NOT** ask BA to design technical solutions.
- TL **MUST** trace technical decisions back to BA requirement IDs.

### 5.2. TL → BE/FE/MOBILE

- TL delivers architecture, contracts, boundaries, task catalog, and acceptance criteria.
- BE/FE/MOBILE **MUST** implement within their ownership.
- No workstream may change a shared contract unilaterally.

### 5.3. BE ↔ FE

- Contract-first: FE can implement against the agreed contract/mock before BE completes.
- FE **MUST NOT** define a parallel API shape.
- BE **MUST** publish contract changes before or with implementation changes.

### 5.4. BE ↔ MOBILE

- The API contract is the integration boundary.
- Mobile can implement against the contract/mock.
- Mobile **MUST NOT** wait for WEB UI completion.

### 5.5. FE ↔ MOBILE

- FE and MOBILE are independent consumers of the same contract.
- No shared UI implementation or code structure is required.
- Do not merge native mobile tasks into FE.

### 5.6. QA ↔ delivery teams

- QA defines verification expectations and evidence.
- QA **MUST NOT** silently change acceptance criteria; changes go through the requirement owner.

## 6. Handoff Requirements

Every cross-workstream handoff **MUST** include:

- Artifact path/ID.
- Scope and out-of-scope.
- Contract/version.
- Open questions.
- Assumptions.
- Verification status.
- Owner for the next step.

## 7. Prohibited Cross-Boundary Actions

- BA designing API/database/architecture.
- TL changing approved business scope without approval.
- BE changing FE/MOBILE UI decisions.
- FE changing backend business rules or database schema.
- Native MOBILE being forced into FE conventions.
- MOBILE-INTEGRATION creating native implementation tasks.
- Any workstream writing to a tracker outside the approved synchronization workflow.
- Any workstream creating a parallel contract or specification.

## 8. Decision Ownership

| Decision | Owner | Approver |
|---|---|---|
| Business scope/rule/KPI | BA/Product Owner | Business stakeholder |
| Architecture/contract/decomposition | TL/Architect | Technical authority |
| Backend implementation | BE | TL |
| Web implementation | FE | TL |
| Native mobile implementation | Mobile team | Mobile tech lead |
| Mobile integration acceptance | MOBILE-INTEGRATION + Mobile team | TL |
| Quality gate/exception | QA/TL | Technical authority |
| Release/sync | Release owner | User/authorized approver |
