# Architecture and Data Standards

## 1. Purpose

Standardize how architecture, module boundaries, data ownership, schemas, and migrations are designed and reviewed. Applies to technical decomposition, readiness review, final audit, and any architecture change.

API interface rules are owned by `shared/api-contract-standards.md`; this file owns structural and data design.

## 2. Architecture Principles

### 2.1. Clear boundaries

- **MUST** define system context, external systems, and actors before splitting modules.
- **MUST** distinguish functional domain, technical module, and deployment unit.
- Each module **MUST** have one primary responsibility and one owner.
- A module **MUST NOT** access another module's internals without a contract.

### 2.2. Dependency direction

- Dependencies **MUST** flow from high-level policy/use cases toward low-level details, not the reverse.
- **MUST NOT** create circular dependencies between modules, packages, or services.
- Shared code **MUST** be more stable than its consumers; do not push domain-specific logic into shared code.
- Prefer contracts/events over direct database access when sharing data.

### 2.3. Data ownership

- Each entity/table **MUST** have one write owner.
- Consumers **MUST NOT** write directly to another owner's data.
- If multiple modules need the same data, define a read model, cache, or contract.
- **MUST NOT** assign multiple tasks to own the same schema without a coordination rule.

### 2.4. Coupling and cohesion

- Prefer high cohesion and low coupling.
- Do not build a distributed monolith: services/modules remain tightly coupled in deployment, schema, or timing.
- Do not use a shared database as an integration mechanism without an explicit architecture decision.
- Use synchronous communication only when an immediate result is required; consider async for long-running or non-blocking work.

### 2.5. Failure handling

- **MUST** define timeout, retry policy, backoff, and retry limits for external calls.
- **MUST** distinguish transient (retryable) from permanent (non-retryable) failures.
- **MUST** provide idempotency for operations that can be retried.
- **SHOULD** use circuit breakers or bulkheads when external dependencies carry high risk.
- **MUST NOT** retry indefinitely or retry validation failures.

### 2.6. Observability

- **MUST** provide logging, error reporting, and audit trails appropriate to risk.
- Logs **MUST** include correlation/request IDs where available.
- **MUST NOT** log secrets, tokens, passwords, or sensitive data.
- Audit trails **MUST** capture actor, action, object, timestamp, and result for critical operations.

### 2.7. Configuration and secrets

- **MUST** separate configuration from code.
- **MUST** manage secrets through an approved mechanism (secret manager/protected environment variables), never commit them.
- **MUST** provide safe defaults; do not enable debug or verbose mode in production by default.

### 2.8. Scalability and performance

- **MUST** identify hot paths, expected load, and performance thresholds from real requirements.
- **MUST NOT** invent KPIs or performance numbers without a source.
- Design **SHOULD** allow scaling where needed (stateless services, caching, async) without over-engineering.
- **MUST** consider N+1 queries, unbounded lists, large payloads, and long synchronous work.

### 2.9. Compatibility and versioning

- Public contract changes **MUST** have a versioning or backward-compatibility strategy.
- **MUST NOT** break active consumers without impact analysis and a migration plan.
- Deprecated components **MUST** have an owner, deadline, and removal condition.

### 2.10. ADRs

Significant architecture decisions **MUST** be recorded as ADRs with:

- Context/problem.
- Decision.
- Alternatives considered.
- Rationale and trade-offs.
- Impacted components.
- Risks.
- Related requirements.
- Status (proposed/accepted/superseded).

## 3. Data Standards

### 3.1. Data model

- **MUST** identify entities, relationships, cardinality, and business meaning before designing tables.
- **MUST** distinguish business entities from implementation tables.
- Normalization **SHOULD** be preferred; denormalize only for a documented performance or read-model reason.
- **MUST** define nullability, defaults, uniqueness, and referential integrity.

### 3.2. Keys and constraints

- **MUST** have a stable primary key for each table.
- **MUST** enforce referential integrity through foreign keys or an equivalent mechanism at the appropriate level.
- **MUST** enforce unique constraints for business-unique data.
- **MUST NOT** rely solely on application validation for critical data constraints.

### 3.3. Indexes

- Indexes **MUST** be driven by actual query patterns, not speculation.
- **MUST** consider the read-performance versus write/storage trade-off.
- **MUST** check query plans for important queries when possible.
- **MUST NOT** add duplicate or unused indexes.

### 3.4. Transactions

- **MUST** define transaction boundaries around business invariants.
- Transactions **SHOULD** be short; do not include long external calls or unnecessary work.
- **MUST** handle concurrency with optimistic locking, unique constraints, or appropriate serialization.
- **MUST NOT** create uncontrolled nested transactions or hold locks too long.

### 3.5. Migrations

- **MUST** provide migration scripts that can run in CI and real environments.
- **SHOULD** use expand/contract for large changes: add → backfill → switch reads/writes → remove old.
- **MUST** have a rollback or forward-fix plan; do not assume rollback is always safe.
- **MUST** test migrations against representative data, not only an empty database.
- **MUST NOT** run destructive migrations without backup and approval.

### 3.6. Seed and reference data

- **MUST** distinguish seed data (dev/test) from reference data (business).
- Reference data **MUST** have a source, owner, and update rule.
- **MUST NOT** hardcode reference data in code when it needs operational changes.

### 3.7. Retention, privacy, and audit

- **MUST** define retention, archive, and deletion requirements from business/legal needs.
- **MUST** classify sensitive data and apply appropriate protection.
- **MUST** keep an audit trail for critical operations.
- **MUST NOT** delete historical data before traceability and retention obligations are resolved.

## 4. Architecture by Workstream

| Workstream | Owns | Does not own |
|---|---|---|
| BE | Backend architecture, domain model, database, API contract, integration | Web UI, native mobile UI |
| FE | Web application architecture, routing, state, component system, API consumption | Backend business logic, database schema, native mobile |
| MOBILE (native) | Native app architecture, navigation, lifecycle, local storage, platform UI | Web repo architecture, backend contract definition |
| MOBILE-INTEGRATION | Business mapping, contract alignment, integration acceptance | Native implementation, FE implementation |

## 5. Verification Checklist

- [ ] Module boundaries and owners are clear.
- [ ] No circular dependencies exist.
- [ ] Data ownership and single-writer rules are defined.
- [ ] Contracts between modules/services are defined.
- [ ] Failure handling includes timeout, retry, and idempotency.
- [ ] Logging/audit is appropriate and does not expose sensitive data.
- [ ] Schema has keys, constraints, indexes, and a migration plan.
- [ ] Contract/schema changes have impact analysis.
- [ ] Significant decisions have ADRs.
- [ ] No over-engineering or unsupported components exist.
