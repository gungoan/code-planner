# AGENTS.md — Operating Contract for Code Planner

## 1. Scope

This file defines how AI agents select, load, and combine skills in the Code Planner repository. Every skill **MUST** comply with this contract. When a skill conflicts with this file, this file takes precedence unless the user explicitly grants an exception.

`README.md` is the public introduction, skill catalog, installation, and usage guide. This file is the repository-level operating contract; if the two differ, this file wins.

Code Planner is a distributable skill library. Each `skills/<name>/` package is self-contained after `npm run sync`: it contains its own `shared/` and `references/` copies. The repository-level `shared/` and `references/` directories are the canonical sources for maintainers.

## 2. Authority Order

When sources conflict, apply the following order (highest → lowest):

1. Direct user instruction in the current session.
2. Approved project decisions (BRD, Functional Spec, Architecture Decision, API Contract).
3. `shared/engineering-principles.md` and related shared standards.
4. `references/workstream-model.md` and skill reference artifacts.
5. The active skill `SKILL.md`.

Rules:

- **MUST** stop and report when two sources at the same level conflict and no evidence-based resolution exists.
- **MUST NOT** lower security, data integrity, or acceptance criteria to finish faster.
- **MUST NOT** change business scope, approved architecture, or a published contract on its own.
- When the user asks to skip a phase gate, **MUST** record the risk and the limits of the result.

## 3. Instruction Levels

- **MUST**: mandatory. If a MUST cannot be met, stop, report, and propose a resolution.
- **SHOULD**: expected. If skipped, state the reason and impact.
- **MAY**: optional. Apply only when appropriate and low-risk.

Do not use vague wording such as "should probably" or "if possible" in new rules. Normalize to MUST/SHOULD/MAY.

## 4. Skill Routing

| Request type | Primary skill | Supporting references |
|---|---|---|
| Analyze business documents, create a BRD, clean-slate rebuild | `skills/brd-analysis/SKILL.md` | `references/brd-structure.md`, `references/brd-quality-gates.md` |
| Design architecture, contracts, decomposition, task catalog | `skills/technical-decomposition/SKILL.md` | `references/decomposition-model.md`, `references/task-schema.md` |
| Audit an existing backlog or Issue set | `skills/backlog-audit/SKILL.md` | `references/backlog-audit-checklist.md`, `references/task-schema.md` |
| Establish standards, testing, CI gates, DoR/DoD | `skills/standards-baseline/SKILL.md` | `shared/*` |
| Assess technical readiness | `skills/technical-readiness/SKILL.md` | `shared/*`, workstream model |
| Final audit and GO/NO-GO | `skills/final-consistency-audit/SKILL.md` | `references/final-audit-checklist.md` |
| Synchronize an Issue tracker after GO (GitLab adapter) | `skills/gitlab-backlog-sync/SKILL.md` | `references/task-schema.md` |

If a request does not match the table:

1. Identify the nearest lifecycle phase.
2. Load that phase's skill to check applicability.
3. If it still does not fit, report the gap and propose a new skill; do not create one on the spot.

## 5. Loading Protocol

1. Read `AGENTS.md` when operating inside the repository.
2. Read `shared/engineering-principles.md`.
3. Select exactly one primary skill.
4. Load only the `shared/` and `references/` files referenced by that skill.
5. Do not load all of `shared/` if the skill does not require it.
6. When using an installed skill, read its local `shared/` and `references/` copies; do not depend on repository-level paths.
7. Do not use backup files outside this repository as authoritative sources.
8. Record the list of files read in the final report.

## 6. Execution Contract

For every skill execution, the agent **MUST** state:

- **Objective**: the concrete goal of the session.
- **Inputs**: documents, codebase, contracts, backlog, or approved decisions.
- **Constraints**: scope, prohibitions, phase gates.
- **Process**: the steps defined by the skill.
- **Outputs**: concrete artifacts, paths, and status.
- **Verification**: checks that were actually performed and their results.
- **Open issues**: unresolved questions, risks, assumptions.

Do not declare completion without Verification.

## 7. Workstream Boundaries

Detailed rules are in `references/workstream-model.md`. Mandatory rules:

- **BA** owns business analysis only; **MUST NOT** design APIs, databases, architecture, or technical tasks.
- **BE** owns backend, database, API contract, business logic, and integration.
- **FE** owns web frontend, UI, state, and API consumption.
- **MOBILE** (native) owns native implementation in its own repository; it **MUST NOT** be forced into FE structure or conventions.
- **MOBILE-INTEGRATION** coordinates business mapping, contract alignment, and integration acceptance; it **MUST NOT** create native implementation tasks for the Mobile team.
- Mobile web/PWA belongs to **FE**, not native MOBILE.
- A workstream **MUST NOT** change another workstream's contract without impact analysis and approval.

## 8. Contract and Data Ownership

- There is exactly **one** authoritative API contract source. In this prompt system, the master/WEB repository is the source unless the project states otherwise.
- FE and MOBILE **MUST** consume the published contract; **MUST NOT** define a parallel contract.
- Every database schema has one clear owner. **MUST NOT** assign multiple tasks to own the same table/schema without a coordination rule.
- When a contract changes, **MUST** analyze impact, update the spec, notify consumers, and update contract tests.

## 9. Phase Gates

| Gate | Entry condition | Exit condition |
|---|---|---|
| Requirements → Planning | BRD has traceability and open questions are classified | BRD is accepted as input; no business BLOCKER remains |
| Planning → Readiness | Task catalog, contracts, and dependency graph are clear | Backlog is work-ready |
| Readiness → Standards Baseline | Readiness report is READY or NEEDS IMPROVEMENT, with no unresolved BLOCKER | Standards baseline is established; remaining readiness gaps are documented |
| Standards Baseline → Final Audit | Standards baseline is established and readiness gaps are addressed or accepted | No unresolved BLOCKER; configuration/validation evidence exists |
| Final Audit → Release Sync | GO or resolved CONDITIONAL GO | Explicit approval to write the tracker exists |
| Release Sync → Implementation | Issues are created/updated and verified | Mapping, traceability, and status are correct |

Gates **MUST NOT** advance automatically. If the user requests a skip, **MUST** record it.

## 10. Tracker Write Policy

- **MUST NOT** create, edit, or delete Issues or push a backlog during BRD, planning, standards-baseline, readiness, or final-audit phases.
- Only an authorized synchronization skill **MAY** write to a tracker. For GitLab, this is `skills/gitlab-backlog-sync/SKILL.md`; other trackers require an equivalent authorized skill.
- Before writing, **MUST** have:
  1. A `GO` result from the final audit, or a `CONDITIONAL GO` whose conditions are resolved or formally accepted.
  2. Explicit user approval for the write operation.
  3. Verified tracker access.
  4. Stable Task IDs and a source-of-truth mapping.
- **MUST NOT** invent Issue IDs, URLs, usernames, milestone IDs, or label IDs.
- **MUST** use an idempotent mechanism so re-runs do not create duplicates.
- **MUST NOT** delete an Issue without preserving traceability and history.

## 11. Evidence and Verification

- **MUST** distinguish sourced facts, reasoned conclusions, assumptions, and TBD items.
- **MUST NOT** present assumptions as confirmed requirements.
- **MUST** cite the source (file/section/ID) for every material conclusion.
- **MUST** report `PASS` only when the check was actually run and produced a result. If it could not run, report `NOT VERIFIED` with the reason.
- **MUST** distinguish "completed" from "planned to be completed."

## 12. Conflict Resolution

When a conflict is found:

1. Identify the exact file, section, ID, and conflicting content.
2. Determine the authoritative source using Section 2.
3. If evidence resolves it, fix it and record the change.
4. If it requires a business or technical decision, create a finding and ask the user.
5. **MUST NOT** choose the option that makes the document appear more complete.

## 13. Handoff Format

At the end of every skill execution, **MUST** hand off using:

```text
STATUS: DONE | DONE_WITH_CONDITIONS | BLOCKED
SKILL: <skill name>
ARTIFACTS:
- <path> — <description>
DECISIONS:
- <decision + rationale + source>
OPEN QUESTIONS:
- <question + impact + decision owner>
RISKS:
- <risk + severity + mitigation>
NEXT:
- <next skill or action>
EVIDENCE:
- <checks run + results>
```

Do not hand off with a one-line summary when artifacts and evidence are required.

## 14. Prohibited Actions

- Creating requirements, business rules, or KPIs without a source.
- Creating fake tasks, Issues, IDs, or URLs.
- Marking PASS/DONE without verification.
- Changing approved architecture, contracts, scope, or technology stack without approval.
- Creating fake dependencies or unnecessary serialization.
- Deleting documents or Issues before replacement and traceability are established.
- Writing to a tracker outside its authorized synchronization skill (GitLab: `gitlab-backlog-sync`).
- Mixing native mobile implementation with FE/web implementation.
- Creating duplicate documents or skills merely to fill a directory structure.
- Loading unrelated skills or references and polluting the context.

## 15. Maintaining This Contract

When adding a skill or changing the structure:

- Update the routing table, phase gates, and dependencies in this file.
- Update `README.md` and `CONTRIBUTING.md` when the catalog or contribution process changes.
- Add the skill and its references to `scripts/sync-references.mjs` and `scripts/validate-skills.mjs`.
- Run `npm run sync` to refresh skill-local `shared/` and `references/` copies.
- Run `npm run validate` and verify `npx skills add . --list`.
- Do not edit generated `skills/<name>/shared/` or `skills/<name>/references/` copies directly.
- Validate every referenced path.