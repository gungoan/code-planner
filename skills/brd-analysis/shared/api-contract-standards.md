# API Contract Standards

## 1. Purpose

Standardize how API and integration contracts are defined, published, consumed, and changed. The API contract is the single source of truth for communication between BE, FE, and MOBILE.

Data/schema structure is owned by `shared/architecture-and-data-standards.md`; this file owns the interface contract.

## 2. Ownership

- BE **MUST** own the definition and publication of the API contract.
- FE and MOBILE **MUST** consume the published contract; **MUST NOT** define a parallel contract.
- MOBILE-INTEGRATION **MUST** coordinate business mapping and integration acceptance; it **MUST NOT** change the contract unilaterally.
- The master/WEB repository **MUST** hold the authoritative contract unless the project states otherwise.

## 3. Contract-First

- The contract **MUST** be agreed before consumers start dependent implementation.
- The contract **MUST** be complete enough for provider and consumers to work independently.
- If the contract is not agreed, **MUST** mark it as a dependency/blocker; **MUST NOT** let consumers guess.
- The contract **SHOULD** be described using OpenAPI or another machine-readable format.

## 4. Minimum Contract Content

### 4.1. Operation

- Operation/endpoint name.
- Protocol and method.
- Path.
- Business purpose.
- Requirement reference.

### 4.2. Request

- Path/query/header parameters.
- Request body schema.
- Field name, type, required/optional, default.
- Validation rules and limits.
- Content type.
- File/upload constraints if applicable.

### 4.3. Response

- Success status code and schema.
- Error status code and schema.
- Field name, type, nullability.
- Pagination metadata if applicable.
- Request/response examples.

### 4.4. Error model

- **MUST** use one error format across the system.
- **MUST** include a machine-readable error code.
- **MUST** include a safe human-readable message.
- **MUST** include field-level validation details where appropriate.
- **MUST NOT** return stack traces, internal exceptions, or infrastructure details.
- **MUST NOT** reuse one error code for different causes.

### 4.5. Authentication and authorization

- **MUST** define the authentication mechanism.
- **MUST** define the required permission/role for each operation.
- **MUST** define the data scope (tenant/organization/owner) accessible.
- **MUST** enforce authorization on the server, never only on the client.

### 4.6. Pagination, filtering, sorting

- **MUST** define a consistent convention for collection endpoints.
- **MUST** enforce a maximum page size.
- **MUST** define the default order and a stable tie-breaker.
- **MUST** define supported filters and sort fields.
- **MUST NOT** return unbounded collections.

### 4.7. Idempotency and concurrency

- Retryable operations **MUST** support an idempotency key or equivalent when appropriate.
- Conflicting updates **SHOULD** use optimistic concurrency (version/ETag).
- **MUST** define behavior for duplicate requests or changed resources.

### 4.8. Files and async processing

- Upload/download **MUST** define size limits, content types, validation, and access control.
- Long-running work **SHOULD** use an async job with an explicit status contract.
- Webhooks/events **MUST** define payload, signature/authentication, retry, and ordering if applicable.

### 4.9. Versioning and compatibility

- **MUST** define a versioning or backward-compatibility rule.
- Breaking changes **MUST** have impact analysis, a migration plan, and consumer notification.
- **MUST** distinguish additive (safe) from breaking changes.
- Deprecated fields/operations **MUST** have a deadline and owner.

## 5. Naming and Data Conventions

- Resource names **MUST** be consistent; use plural nouns for collections unless the project defines otherwise.
- Field names **MUST** use one casing convention across the API.
- **MUST** use explicit data types; do not use `string` for every value.
- **MUST** use versioned enums or a safe extension rule.
- **MUST** distinguish `null`, absent, and empty according to business meaning.
- **MUST NOT** reuse one field for multiple purposes.

## 6. Contract Changes

When a contract changes, **MUST**:

1. Identify the reason and source requirement.
2. Analyze impact on BE, FE, MOBILE, and tests.
3. Update the contract/spec at the canonical source.
4. Notify consumers and update references.
5. Update contract tests.
6. Record the compatibility/versioning decision.

**MUST NOT** change a published contract without these steps.

## 7. Contract Testing

- **MUST** test schema/response compliance for critical operations.
- Contract tests **SHOULD** run in CI.
- Consumers **MUST** test against mocks/fixtures derived from the contract.
- When contract and implementation diverge, **MUST** treat it as a defect.

## 8. Contract Quality Checklist

- [ ] Every operation traces to a requirement/use case.
- [ ] Request/response schemas are complete and include examples.
- [ ] The error model is consistent and does not leak internals.
- [ ] Authentication/authorization is defined per operation.
- [ ] Pagination/filter/sort conventions and limits are defined.
- [ ] Idempotency/concurrency is handled where needed.
- [ ] Versioning/compatibility is defined.
- [ ] Contract tests exist or have a concrete plan.
- [ ] No unused fields or endpoints exist.
- [ ] FE/MOBILE have no parallel contract definitions.
