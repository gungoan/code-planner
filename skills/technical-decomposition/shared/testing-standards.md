# Testing Standards

## 1. Purpose

Define a unified, risk-based testing strategy that can be executed in CI. This file covers test types, ownership, test design, coverage policy, and related quality gates.

## 2. Principles

- **Risk-based**: prioritize business logic, authorization, data integrity, calculations, state transitions, and financial/transactional behavior.
- **Test behavior, not implementation**: verify observable behavior, not internal details that change easily.
- **Deterministic**: no dependence on wall-clock time, network, execution order, or shared mutable data.
- **Fast feedback**: unit tests are fast; integration/contract tests have explicit scope; E2E only when approved.
- **No coverage theater**: coverage is a signal, not a substitute for meaningful tests.
- **No hidden failure**: do not skip, delete, or weaken tests to make the pipeline green without a documented reason and tracking issue.

## 3. Test Types

| Type | Purpose | Owner | Runs |
|---|---|---|---|
| Unit | Domain logic, validation, calculation, state transition | BE/FE/MOBILE | Local + CI |
| Integration | DB, API, auth, transactions, external adapters | BE | CI |
| Contract | Schema/response compatibility between provider and consumers | BE + FE/MOBILE | CI |
| Component | UI rendering, interaction, forms, states | FE | CI |
| UI/Integration (mobile) | Navigation, lifecycle, offline, permissions | MOBILE | CI/device |
| Regression | Prevent recurrence of known defects | All | CI |
| Performance | Throughput, latency, memory, load | Per project decision | CI/staging |
| Security | AuthN/AuthZ, input, dependencies | BE/DevOps | CI |
| Accessibility | WCAG, keyboard, screen reader | FE/MOBILE | CI/manual |
| E2E | End-to-end journeys | Only when approved | Staging |

Do not implement every test type by default if the architecture or scope does not require it. **MUST** document which types apply and why.

## 4. Test Design

- **MUST** use Arrange–Act–Assert or an equally clear structure.
- **MUST** include positive, negative, boundary, and exception cases for important logic.
- **MUST** isolate tests: no dependency on other tests or mutable global state.
- **MUST** use controlled factories/fixtures; do not hardcode sensitive data.
- **MUST** mock/stub at boundaries (HTTP, DB, external services), not internal methods of the unit under test.
- **MUST** clean up resources after tests.
- **MUST** name tests by behavior and condition.

## 5. Mocking and Contracts

- Unit tests **MAY** mock dependencies.
- Integration tests **SHOULD** use a real database/container or a realistic environment.
- Contract tests **MUST** be based on the published schema/contract, not consumer assumptions.
- **MUST NOT** let mocks hide contract drift; update mocks/fixtures when the contract changes.
- External services **MUST** have adapters and tests for mapping/error handling.

## 6. Coverage Policy

- **MUST** define the metric used: line/branch/function as appropriate for the language/tooling.
- **MUST** set minimum thresholds by module type and risk; do not apply one ratio to the entire system.
- Critical modules (auth, payment, data integrity, permissions) **SHOULD** have higher thresholds.
- **MUST NOT** reduce coverage of critical modules without approval and justification.
- Coverage **MUST NOT** replace test-case review.

## 7. Workstream Responsibilities

### 7.1. BE

- Unit tests for domain logic, validation, calculations, and state transitions.
- Integration tests for APIs, DB, transactions, auth, and external adapters.
- Contract tests for published APIs.
- Tests for error handling, idempotency, and concurrency where relevant.

### 7.2. FE

- Component tests for rendering, interaction, form validation, and loading/empty/error states.
- Tests for permission-based rendering.
- API integration tests with contract-derived mocks/fixtures.
- Basic accessibility checks.
- E2E only when approved.

### 7.3. MOBILE

The native Mobile team owns internal unit, UI, integration, device/OS matrix, and release testing. The master repo does not prescribe native test implementation.

### 7.4. MOBILE-INTEGRATION

- Define integration acceptance criteria.
- Verify API compatibility, authentication, request/response mapping, error handling, upload/download, notification contracts, and version compatibility.
- Verify contract compatibility and error mapping.
- Do not replace the Mobile team's internal tests.

## 8. Related Quality Gates

See `shared/quality-gates.md` for the full gate definitions and failure handling.

- Required tests **MUST** pass before merge.
- **MUST NOT** merge with failing or unjustifiably skipped tests.
- Flaky tests **MUST** be investigated for root cause; do not retry blindly.
- The test suite **MUST** run in CI with a reasonable timeout.
- Test results **MUST** be recorded in the MR or pipeline.

## 9. Verification Checklist

- [ ] Test scope matches the risk of the change.
- [ ] Positive/negative/boundary/exception cases exist for important logic.
- [ ] Tests are deterministic and isolated.
- [ ] Mocks are at boundaries and do not hide contract drift.
- [ ] Coverage meets policy; critical modules are not reduced.
- [ ] API contract has contract tests.
- [ ] Authorization and data integrity are tested.
- [ ] Tests run in CI.
- [ ] No tests are skipped or deleted without justification.
- [ ] Concrete test evidence exists.
