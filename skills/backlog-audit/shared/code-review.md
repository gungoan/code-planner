# Code Review Standards

## 1. Purpose

Standardize code and MR review so that important defects, architecture violations, and contract drift are caught without turning review into manual formatting inspection.

## 2. Scope

Applies to every code, configuration, migration, and technical documentation change that requires review before merge. Review is mandatory unless the project defines an explicit exception.

## 3. Review Axes

### 3.1. Correctness

- Does the change match the requirement/acceptance criteria?
- Are edge cases (null, empty, boundary) handled?
- Are error paths handled, not only the happy path?
- Are there race conditions, off-by-one errors, or state inconsistencies?
- Do tests actually verify behavior?

### 3.2. Architecture and maintainability

- Does it follow the existing architecture, module boundaries, and conventions?
- Does it introduce circular dependencies or unreasonable coupling?
- Is there duplicated logic, unnecessary abstraction, or over-engineering?
- Is the code readable, changeable, and testable?

### 3.3. Security

- Is input validated and output encoded?
- Is authorization enforced on the server and at object level?
- Are secrets exposed in code or logs?
- Are SQL injection, XSS, CSRF, SSRF, or IDOR possible?
- Is sensitive data over-logged or over-returned?

### 3.4. Data integrity

- Is the transaction boundary correct?
- Are constraints, uniqueness, and foreign keys enforced?
- Is the migration safe and recoverable?
- Is concurrency handled?

### 3.5. Performance

- Are there N+1 queries, unbounded lists, or large payloads?
- Is caching/invalidation appropriate?
- Is long-running work kept out of the request path?
- Are retry and timeout policies reasonable?

### 3.6. Testability and operability

- Are appropriate tests included?
- Are logs, audit trails, and errors sufficient for operations?
- Are configuration and secrets handled correctly?
- Does the change affect deployment or rollback?

### 3.7. Documentation

- Are API contracts/specs updated?
- Do README/runbook/changelog need updates?
- Do comments explain non-obvious intent?

## 4. Severity

| Level | Meaning | Action |
|---|---|---|
| **Blocking** | Correctness, security, data-integrity defect, or serious contract violation | **MUST** fix before merge |
| **Major** | High risk to architecture, performance, maintainability, or test coverage | **SHOULD** fix before merge or have an approved plan |
| **Minor** | Small readability, naming, or structure issue | **MAY** fix in the MR or a follow-up |
| **Suggestion** | Optional improvement | Author/reviewer decides |

Do not use a low severity to hide a real problem. If unsure, ask instead of downgrading.

## 5. Review Process

1. Read the MR objective, linked Issue, and acceptance criteria.
2. Review the diff in order: contract/schema → core logic → error paths → tests.
3. Verify tests run and evidence exists.
4. Check security, data integrity, and performance according to risk.
5. Record comments with severity, rationale, and a fix direction.
6. Request changes if Blocking/Major issues remain.
7. Approve when the change improves overall quality and no Blocking issue remains.

## 6. MR Requirements

- **MUST** have a clear title and description of the change and scope.
- **MUST** link the Issue/Task.
- **MUST** describe verification (tests, manual checks, screenshots for UI).
- **MUST** state risks, impact, and rollback for significant changes.
- **MUST** have the required reviewers.
- **MUST** pass the pipeline/quality gates before merge.
- **MUST NOT** contain secrets, unnecessary generated files, or out-of-scope changes.

## 7. Approval Standard

See `shared/quality-gates.md` for the merge gates that must pass before approval.

Approve when:

- The change meets the requirement and has no Blocking issue.
- It does not degrade architecture, security, or data integrity.
- Appropriate tests/evidence exist.
- No important question remains unresolved.
- Remaining Major issues have a clear remediation plan.

Do not approve merely because "it runs" or because of time pressure.

## 8. Anti-Patterns

- Flagging formatting when a formatter/linter already exists.
- Rubber-stamping without reading the logic.
- Requesting out-of-scope changes.
- Using personal preference instead of the project convention/standard.
- Skipping tests or security because the task is "small".
- Leaving vague comments without a fix direction.

## 9. Checklist

- [ ] MR links an Issue/Task and has a clear description.
- [ ] Acceptance criteria are met.
- [ ] No Blocking issue remains.
- [ ] Security and data integrity were reviewed.
- [ ] Appropriate tests exist and pass.
- [ ] Contract/spec/docs are updated when needed.
- [ ] No secrets or sensitive data are present.
- [ ] Pipeline/quality gates pass.
- [ ] Appropriate reviewers approved.
- [ ] A rollback plan exists for high-risk changes.
