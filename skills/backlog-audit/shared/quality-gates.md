# Quality Gates, DoR and DoD

## 1. Purpose

Define the Definition of Ready, Definition of Done, mandatory quality gates, and the exception/technical-debt process.

## 2. Definition of Ready (DoR)

A task is Ready only when:

- The objective is clear.
- Scope and out-of-scope are defined.
- Acceptance criteria are verifiable.
- Requirement/document references are accurate.
- Input/output contracts exist when the task communicates with another component.
- Dependencies are classified (if any).
- Error/exception conditions are defined.
- The task can be tested independently.
- No unresolved BLOCKER remains.
- A single owner is assigned.

Not every task needs every field if irrelevant, but missing fields that affect executability **MUST** be recorded.

## 3. Definition of Done (DoD)

A task is Done only when:

- All acceptance criteria are met.
- Implementation matches the approved specification/contract.
- Architecture and coding standards are respected.
- Relevant unit/integration/contract tests are added and passing.
- Lint, type-check, and build pass.
- Security requirements are met.
- Documentation/contract/spec is updated when needed.
- Code review is complete and approved.
- The MR is merged according to process.
- No BLOCKER or unrecorded follow-up remains.
- Verification evidence exists (pipeline, test report, screenshots/manual evidence for UI).

## 4. DoD by Task Type

| Task type | Additional requirements |
|---|---|
| Backend API | Contract test, error cases, auth/authz, migration if applicable, API docs |
| Database/Migration | Migration test, rollback/forward-fix, data validation, index/query check |
| Web UI/Feature | Component test, loading/empty/error states, accessibility, responsive check |
| Shared component/library | API docs, backward compatibility, tests, versioning if public |
| Integration | Contract compatibility, retry/timeout, error mapping, integration test |
| Bugfix | Regression test, root cause, impact check |
| Config/DevOps | Config validation, secret check, rollback, environment verification |
| Mobile integration | Contract mapping, error handling, sync/offline, version compatibility |

Do not apply one DoD mechanically to every task type.

## 5. Quality Gates

### Gate 1 — Code Quality

- Formatting is valid.
- Lint has no blocking errors.
- Type-check succeeds.
- Static analysis has no serious errors.

### Gate 2 — Testing

- Required tests pass.
- No failing test is ignored.
- No critical regression exists.
- Coverage meets policy.

### Gate 3 — Security

- No secret is committed.
- No serious vulnerability is unresolved or unapproved.
- No mandatory security standard is violated.

### Gate 4 — Build

- Build succeeds.
- Dependencies are valid.
- No blocking configuration error exists.

### Gate 5 — Review & Merge

- MR meets the checklist.
- Required approvals exist.
- The Issue/Task is linked.
- No Blocking comment remains.

Do not add tools merely because they are popular; prefer the existing system.

## 6. Handling Gate Failure

- **MUST** identify the root cause.
- **MUST NOT** lower thresholds, skip tests, or disable rules to make the pipeline green without approval.
- If an exception is needed, **MUST** record a finding with reason, risk, mitigation, owner, and deadline.
- Repeated gate failures **MUST** be treated as a systemic issue, not patched case by case.

## 7. Exceptions and Technical Debt

Every significant exception **MUST** include:

- Description.
- Reason.
- Affected scope.
- Risk.
- Mitigation.
- Approver/authority.
- Removal condition or deadline.

Technical debt **MUST** be recorded, never hidden by lowering quality. If the debt affects security or data integrity, **MUST** prioritize it before expanding scope.

## 8. Assessment States

Use one consistent set:

- **READY**: complete and verified.
- **NEEDS IMPROVEMENT**: incomplete but not fully blocked.
- **BLOCKED**: cannot proceed until resolved.
- **PASS / PARTIAL / FAIL / NOT APPLICABLE / NOT VERIFIED**: for individual checks.

Do not use PASS when a check was not run. If it could not run, use **NOT VERIFIED** with the reason.

## 9. Checklist

- [ ] The task meets DoR before starting.
- [ ] Acceptance criteria are clear and verifiable.
- [ ] The correct DoD is applied for the task type.
- [ ] Quality gates pass or have approved exceptions.
- [ ] No secret or serious vulnerability exists.
- [ ] Tests/coverage meet policy.
- [ ] Review/approval is complete.
- [ ] Technical debt/exceptions are recorded.
- [ ] The final state reflects the evidence.
