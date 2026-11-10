# Coding Standards

## 1. Purpose

Define a shared baseline for BE, FE, and native mobile integration code. Repository-specific conventions **SHOULD** take precedence when they do not conflict with the MUST rules here.

## 2. General Standards

### 2.1. Naming

- Names **MUST** describe purpose, not implementation.
- **MUST NOT** use `data`, `temp`, `result`, `utils`, `helper`, or `manager` without context.
- Files/folders **MUST** follow the repository convention; if none exists, use consistent domain-based names.
- Booleans **SHOULD** start with `is/has/can/should`.
- Constants **MUST** have names instead of magic values.

### 2.2. Size and responsibility

- Functions/methods **SHOULD** do one thing and be readable in one pass.
- Classes/modules **MUST** have one primary responsibility; no god objects.
- **MUST NOT** duplicate logic; extract a shared helper only when it is genuinely shared.
- **MUST NOT** create abstractions before a real need exists.

### 2.3. Type safety

- **MUST** use explicit types; avoid casual `any`/`unknown`.
- **MUST** handle null/undefined explicitly.
- **MUST NOT** use casts to hide type errors.
- External data **MUST** be validated before use in logic.

### 2.4. Error handling

- **MUST** fail fast at boundaries when input is invalid.
- **MUST NOT** swallow exceptions or return fake success.
- Errors **MUST** contain enough context to investigate but no sensitive data.
- Business errors **SHOULD** be distinguishable from system errors.
- **MUST** define retry/timeout for external operations; do not retry validation failures.

### 2.5. Logging

- **MUST** use structured logging where available.
- **MUST** log enough context: actor, operation, object, correlation ID.
- **MUST NOT** log passwords, tokens, secrets, full sensitive payloads, or unnecessary PII.
- Log levels **MUST** reflect severity: error, warn, info, debug.

### 2.6. Comments and documentation

- Comments **MUST** explain why or non-obvious intent, not restate code.
- **MUST NOT** leave stale comments or commented-out code.
- Public APIs/modules **SHOULD** document their contract and usage.
- TODOs **MUST** have a reason and owner/issue; no indefinite TODOs.

### 2.7. Dependencies and configuration

- **MUST** prefer libraries/patterns already in the repository.
- A new dependency **MUST** have a justification, compatible license, and no duplicate function.
- **MUST** separate configuration from code; secrets **MUST NOT** be committed.
- Generated code **MUST** be marked and not hand-edited when it can be regenerated.

### 2.8. Testing

- Changed code **MUST** have tests appropriate to risk.
- Tests **MUST** verify behavior, not implementation details.
- **MUST** keep tests deterministic; no dependence on wall-clock time, network, or execution order.
- **MUST NOT** delete or skip tests to make the pipeline green without a documented reason and tracking issue.

## 3. Backend Standards

### 3.1. Layering

- **MUST** separate boundary/handler, use case/service, domain logic, and data access.
- **MUST NOT** put business logic in controllers/handlers.
- **MUST NOT** access the database outside the approved data-access layer.
- **MUST** keep domain logic independent of the framework where practical.

### 3.2. API implementation

- **MUST** follow the published API contract.
- **MUST** validate requests at the boundary.
- **MUST** return the standard error format.
- **MUST NOT** return internal entities/models when the contract requires a DTO.
- **MUST** apply pagination/filter/sort according to the contract.
- **MUST** enforce authentication/authorization on the server.

### 3.3. Database

- **MUST** use parameterized queries or a safe ORM; never concatenate SQL.
- **MUST** define transaction boundaries around business invariants.
- **MUST** avoid N+1 queries; check query plans for important queries.
- **MUST** handle concurrency and unique constraints correctly.
- **MUST NOT** allow uncontrolled schema drift or unmanaged migrations.

### 3.4. Background jobs and integration

- **MUST** make jobs idempotent when they can be retried.
- **MUST** define retry policy, timeout, and dead-letter/alerting when needed.
- **MUST** validate and map data from external services.
- **MUST NOT** keep long external calls inside transactions or request paths when avoidable.

### 3.5. Security

- **MUST** check authorization at object level, not only endpoint level.
- **MUST** prevent IDOR by checking ownership/tenant.
- **MUST** avoid leaking internal information in errors.
- **MUST** audit critical operations.
- See `shared/security-standards.md` for the full baseline.

## 4. Web Frontend Standards

### 4.1. Structure

- **MUST** organize by feature/module or the established convention; no orphan files without an owner.
- **MUST** separate page/layout/component/feature logic.
- **MUST** separate server state and client state.
- **MUST** have an API integration layer; do not call APIs ad hoc from components.

### 4.2. Components

- Components **MUST** have a clear responsibility and explicit props/types.
- **MUST NOT** create oversized components or components that know too much business logic.
- **MUST** handle loading, empty, error, and success states.
- **MUST** provide an error boundary or equivalent at the appropriate scope.
- **MUST** use semantic HTML and meet basic accessibility requirements.

### 4.3. State and data fetching

- **MUST** avoid overusing global state.
- **MUST** define cache/invalidation rules for server state.
- **MUST** handle race conditions, retries, and cancellation where relevant.
- **MUST NOT** implement authorization only on the frontend.

### 4.4. Security

- **MUST** treat all API/user data as untrusted.
- **MUST** encode output and prevent XSS.
- **MUST** avoid storing long-lived secrets/tokens in unsafe locations.
- **MUST NOT** put sensitive information in URLs or logs.

## 5. Native Mobile Integration Standards

This section covers contracts and integration; the Mobile team owns internal implementation and **MUST NOT** be forced to adopt this repository's project structure or coding conventions.

- **MUST** consume the published API contract.
- **MUST** define request/response mapping, error mapping, and retry policy.
- **MUST** define authentication/session/token refresh.
- **MUST** define upload/download contracts, limits, and permissions.
- **MUST** define offline behavior and data synchronization/conflict handling when required by the Functional Specification.
- **MUST** define permission handling and user-consent requirements for device capabilities.
- **MUST** define push notification and deep link contracts when applicable.
- **MUST** define version/backward compatibility.
- **MUST NOT** create a parallel specification in the mobile repository.

## 6. Verification Checklist

- [ ] Code follows repository conventions and shared standards.
- [ ] No magic values, dead code, or commented-out code.
- [ ] Error handling is complete; no swallowed errors.
- [ ] Logging contains no secrets or PII.
- [ ] Type safety and boundary validation are complete.
- [ ] No business logic is in the wrong layer.
- [ ] No N+1, unbounded query, or infinite retry.
- [ ] Corresponding tests exist and pass.
- [ ] No unauthorized dependency or secret.
- [ ] Contract and implementation match.
