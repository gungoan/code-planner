# Task Schema and Issue Template

## 1. Purpose

Define the canonical task structure used by technical decomposition, backlog audit, and an authorized tracker synchronization skill. A task that does not meet this schema **MUST NOT** be marked `Ready for Issue Tracker`. GitLab is the reference template; adapt fields to the host tracker.

This is the single task schema. The decomposition, audit, and sync workflows **MUST** reference it and **MUST NOT** maintain a parallel task schema.

## 2. Required Task Fields

| Field | Required content |
|---|---|
| Task ID | Stable, unique ID |
| Title | Short, action-and-outcome title |
| Issue Type | Epic / Task / Bug / Documentation / Test, as supported by the host tracker |
| Parent | Epic or parent task |
| Functional Domain | Related domain |
| Functional Module | Related module |
| Functional Capability | Capability implemented |
| Technical Component | Affected component |
| Requirement References | BR / FR / Function IDs |
| Source References | Wiki page / document / heading |
| Objective | Goal of the task |
| Scope | What must be done |
| Out of Scope | What must not be done |
| Implementation Details | Technical guidance sufficient to execute |
| Input Contracts | Input contracts |
| Output Contracts | Deliverables/interfaces produced |
| Dependencies | Dependent task IDs |
| Dependency Type | Hard / Contract / Integration-only / Soft / None |
| Dependency Justification | Why the dependency exists |
| Parallel Group | Group that can run concurrently |
| Execution Wave | Delivery wave |
| Blocking Status | Blocking / Non-blocking |
| Critical Path | Yes / No |
| Agent Profile | Backend / Web / Mobile (native owner or integration) / Database / QA / DevOps / Full-stack |
| Ownership | One accountable owner |
| Shared Resource Ownership | Files/schema/components allowed to edit |
| Mock / Stub Strategy | How to proceed if a dependency is incomplete |
| Acceptance Criteria | Measurable completion conditions |
| Test Requirements | Unit / Integration / Contract tests |
| Integration Checkpoint | When and how integration is verified |
| Estimated Complexity | S / M / L or a consistent scale |
| Labels | Proposed tracker labels |
| Milestone | Milestone/phase |
| Definition of Done | Completion conditions |

A task with only a title and a few description lines is **not** acceptable.

## 3. Issue-Ready Markdown (GitLab Reference Template)

Adapt headings and fields to the host tracker; the structure below is a GitLab example.

```markdown
## Objective
...

## Context
...

## Requirement Traceability
- BR:
- FR / Function:
- Spec:
- Functional Domain:
- Functional Module:
- Capability:

## Scope
### In Scope
- ...

### Out of Scope
- ...

## Technical Design
- ...

## Contracts
### Inputs
- ...

### Outputs
- ...

## Dependencies
| Issue / Task ID | Type | Reason | Blocking |
|---|---|---|---|

## Parallel Execution
- Parallel Group:
- Execution Wave:
- Can start when:
- Can run concurrently with:

## Implementation Guidance
- ...

## Acceptance Criteria
- [ ] ...

## Test Requirements
- [ ] Unit tests:
- [ ] Integration tests:
- [ ] Contract tests:

## Integration & Compatibility
- ...

## Definition of Done
- [ ] Implementation completed.
- [ ] Acceptance criteria satisfied.
- [ ] Required tests pass.
- [ ] No unauthorized contract changes.
- [ ] Documentation updated where required.
- [ ] Ready for review and integration.
```

Additional sections may be added by task type, but the structure **MUST** remain consistent.

## 4. Tracker Metadata

For each Issue, propose:

- Title.
- Description.
- Issue type.
- Parent Epic/Parent Issue.
- Milestone.
- Labels.
- Assignee profile/role.
- Weight if the tracker supports it and there is a basis.
- Due date only with a real delivery plan.
- Related / blocked-by / blocks relationships.

**MUST NOT** assign usernames, user IDs, milestone IDs, or label IDs without verifying the tracker. Label/milestone names may be proposed as text.

## 5. Stable IDs and Traceability

Task IDs **MUST** be stable and independent of display order.

Recommended conventions:

- `TASK-FOUNDATION-001`
- `TASK-AUTH-001`
- `TASK-INSPECTION-001`
- `TASK-WEB-001`
- `TASK-MOBILE-001`

Each task **MUST** have:

- Stable Task ID in the source document.
- Tracker Issue ID/URL after creation.
- Parent/related issue reference.
- Requirement traceability.

**MUST NOT** create fake tracker Issue IDs or URLs. When an Issue does not exist, use `Not Created` or leave the mapping field blank.

## 6. Issue Quality Gate

A task **MAY** be marked `Ready for Issue Tracker` only when:

- It has a stable Task ID.
- The title is clear.
- The description is complete.
- Scope and out-of-scope are clear.
- Requirement references exist.
- Technical implementation guidance exists.
- Contracts are defined or the contract dependency is explicit.
- Dependencies are classified and justified.
- Acceptance criteria exist.
- Test requirements exist.
- An owner profile exists.
- Labels are proposed.
- Parent/milestone is proposed when applicable.
- It does not duplicate another task.
- It does not depend on an unresolved decision that the agent would have to invent.

## 7. Import and Synchronization

The output **SHOULD** support:

- Markdown Issue descriptions that can be pasted directly.
- Conversion to a tracker API payload.
- Bulk creation/import via script or tracker API.
- Metadata synchronization from the canonical source.
- Idempotent updates that preserve traceability.

Maintain one canonical task source; do not maintain multiple independent descriptions. If YAML/JSON/CSV is used for automation, define the schema, field mapping, validation, and sync rules.

Do not create scripts or call the tracker API unless explicitly requested and authorized. Only an explicitly authorized tracker synchronization workflow may write to the tracker.

## 8. Task Classification

Use these labels when auditing an existing backlog:

- **KEEP**: correct and complete.
- **UPDATE**: needs correction.
- **SPLIT**: too large or contains independent deliverables.
- **MERGE**: duplicate or overlapping.
- **CREATE**: missing task.
- **BLOCKED**: insufficient information or a real dependency.
- **OBSOLETE**: no longer matches the current specification.

Do not keep a task merely because it exists. Do not delete an Issue before traceability and relationships are preserved.
