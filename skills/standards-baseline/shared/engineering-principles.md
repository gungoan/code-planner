# Engineering Principles

## 1. Purpose

Define the priority order and decision rules that apply to every workflow. When a skill or domain standard conflicts with this file, apply the host project's authority order, or the repository-level operating contract if present.

## 2. Priority Order

When trade-offs are required, prioritize:

1. **Correctness** — behavior matches approved requirements.
2. **Security** — no vulnerabilities, data exposure, or weakened controls.
3. **Data integrity** — no loss, corruption, duplication, or inconsistency.
4. **Traceability** — every decision and artifact can be traced to a source.
5. **Maintainability** — readable, changeable, low coupling, no over-engineering.
6. **Testability** — verifiable through tests or concrete evidence.
7. **Performance** — meets real thresholds; no speculative optimization.
8. **Delivery speed** — only after the above.

Items 1–4 **MUST NOT** be sacrificed to increase speed or reduce task count.

## 3. Core Principles

### 3.1. Evidence-first

- **MUST** distinguish sourced facts, reasoned conclusions, assumptions, and TBD items.
- **MUST** cite the source for material conclusions.
- **MUST NOT** turn assumptions into confirmed requirements.

### 3.2. Root cause

- **MUST** address the root cause; do not accept workarounds that hide symptoms.
- If a workaround is unavoidable, **MUST** record the reason, risk, removal condition, and approver.

### 3.3. Single source of truth

- Each type of information has one canonical source.
- Do not create parallel copies of requirements, contracts, schemas, or task catalogs.
- When the source changes, **MUST** update consumers and check impact.

### 3.4. Contract-first

- Interfaces, APIs, events, schemas, and shared types **MUST** be agreed before dependent implementation.
- Consumers **MUST NOT** define a parallel contract.
- Contract changes require impact analysis, versioning, and compatibility rules.

### 3.5. Separation of concerns

- Every module, layer, component, and workstream has one primary responsibility.
- Do not place business logic in UI, routing, or persistence layers.
- Do not leak domain-specific logic into shared modules.

### 3.6. Simplicity and right-sizing

- **MUST** prefer the simplest solution that satisfies current requirements.
- **MUST NOT** create abstractions, layers, services, or infrastructure for hypothetical future needs.
- Abstract only when at least two real use cases exist or an architecture decision is approved.

### 3.7. Explicit over implicit

- Use meaningful names; avoid `data`, `temp`, `result`, `utils` without context.
- Do not use magic numbers, magic strings, or silent fallbacks.
- Define error conditions, states, and transitions explicitly.

### 3.8. Traceability

- Requirements, tasks, tests, commits, MRs, and Issues **MUST** be linkable.
- Stable IDs **MUST** exist before dependent artifacts are created.
- Do not create IDs just to make a report look complete.

### 3.9. Reversibility

- High-risk changes **SHOULD** have a rollback or migration path.
- Database migrations, contract changes, and releases **MUST** have a recovery plan.
- Do not delete data or historical artifacts before traceability is preserved.

### 3.10. Security by default

- Deny by default; least privilege; fail closed.
- The frontend is not a security boundary.
- The backend **MUST** enforce authorization even when the UI hides functionality.
- Do not log secrets, tokens, passwords, or sensitive data.

### 3.11. Observable by design

- The system **MUST** have logging, error reporting, and audit trails appropriate to its risk.
- Logs **MUST** contain enough context to investigate but no sensitive data.
- System errors **MUST** be distinguishable from business errors.

### 3.12. Incremental delivery

- Split work into verifiable slices; do not postpone integration to the end.
- Every task **MUST** have a clear deliverable and corresponding tests.
- Do not mark work complete without evidence.

## 4. Decision Rules

- **MUST** prefer existing codebase patterns and conventions unless they conflict with requirements.
- **MUST** record an ADR for significant architecture decisions: context, decision, alternatives, rationale, trade-offs, impact, risks.
- **MUST NOT** change the approved technology stack without a clear technical reason and approval.
- **MUST NOT** add a new dependency when an existing library is sufficient, unless there is a security, performance, or maintenance justification.
- **MUST** stop and ask when a missing business decision could change scope, contracts, or architecture.

## 5. Anti-Patterns

| Anti-pattern | Signal | Action |
|---|---|---|
| Copy-paste requirement | Same content in multiple files with different wording | Choose a canonical source and reference it |
| Hidden coupling | A module reaches into another module's internals | Replace with an explicit contract/interface |
| God object | One class/module knows too many responsibilities | Split by bounded responsibility |
| Premature abstraction | Generic layer built for a single use case | Remove it; implement directly |
| Silent failure | Exception swallowed or fake success returned | Log, return the correct error, handle explicitly |
| Unbounded retry | Infinite retry or no backoff | Add limits, backoff, timeout, dead-letter |
| Magic value | Unnamed number/string with no source | Use a named constant, enum, or config |
| Test theater | Tests exist only to raise coverage | Test behavior and risk |
| Fake independence | Tasks are split but still wait for each other's code | Use a contract/mock or merge the tasks |
| Documentation drift | Docs do not reflect implementation/contract | Update with the change and validate cross-references |

## 6. Verification Checklist

- [ ] Material conclusions are sourced or marked as assumption/TBD.
- [ ] No requirement, task, or contract was invented without evidence.
- [ ] Architecture/contract changes have impact analysis and approval.
- [ ] No circular dependency or illegal coupling exists.
- [ ] Security and data integrity were not weakened.
- [ ] Tests or concrete verification evidence exist.
- [ ] No duplicate content or broken references remain.
- [ ] The final status reflects reality, not expectation.
