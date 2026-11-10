# Git and Delivery Standards

## 1. Purpose

Standardize branching, commits, merge requests, merges, and releases so changes are traceable, reviewable, and recoverable. Applies together with `shared/code-review.md` and `shared/quality-gates.md`.

## 2. Branching

- **MUST** have a stable, protected main branch.
- **MUST** use feature branches for non-trivial changes; do not commit directly to main when policy prohibits it.
- Branches **SHOULD** follow a consistent naming format, e.g. `feature/<issue-id>-<slug>`, `fix/<issue-id>-<slug>`, `hotfix/<issue-id>-<slug>`.
- **MUST** delete branches after merge unless retention is required.
- **MUST NOT** force-push protected branches.

If the project uses Git Flow, trunk-based development, or another model, **MUST** document and apply it consistently; do not impose an unsuitable model.

## 3. Commits

- **MUST** keep commits atomic and logically scoped.
- **MUST** write a message that explains the change and why; follow the repository convention if one exists.
- **MUST** reference the Issue/Task when available.
- **MUST NOT** commit secrets, secret-bearing `.env` files, credentials, or sensitive data.
- **MUST NOT** commit unnecessary generated artifacts, large binaries, or local files.
- **MUST NOT** commit commented-out code, temporary debug logs, or TODOs without an owner/issue.

## 4. Merge Requests

- **MUST** have a clear title and description using the repository template.
- **MUST** link the Issue/Task.
- **MUST** describe scope, verification, risks, and rollback when needed.
- **MUST** have appropriate reviewers.
- **MUST** pass the pipeline/quality gates before merge.
- **MUST** resolve conflicts and review comments before merge.
- **MUST NOT** merge with Blocking comments or a failing pipeline.

## 5. Merge

- **MUST** use the project-approved merge strategy (merge commit, squash, or rebase).
- **MUST** keep the history understandable; no noisy merge commits.
- **MUST** re-check the diff after resolving conflicts.
- **SHOULD** squash noisy commits when the repository uses squash merge.
- **MUST** verify the source and target branches.

## 6. Release

- **MUST** use the project version/tag convention.
- **MUST** provide a changelog/release note for significant changes.
- **MUST** have a rollback or forward-fix plan.
- **MUST** verify migrations, configuration, and secrets before release.
- **MUST** confirm quality gates and smoke tests in the target environment.
- Hotfixes **MUST** be merged back to the appropriate branch when needed.

## 7. Traceability

Minimum traceability chain:

```text
Requirement/Issue → Branch → Commit → Merge Request → Pipeline/Test → Release
```

- **MUST** be able to answer: which requirement/task does this change serve?
- **MUST** be able to answer: has this change been tested, reviewed, and released?
- **MUST** update the Issue/backlog when merge/release changes its status.

## 8. Branch Protection and Access

- **SHOULD** enable branch protection for main/release branches.
- **SHOULD** require minimum approvals based on risk.
- **MUST** limit push/merge rights to responsible roles.
- **MUST** not disable protection temporarily without approval and a deadline.

## 9. Checklist

- [ ] Branch type and Issue reference are correct.
- [ ] Commits are atomic, clear, and secret-free.
- [ ] MR has description, test evidence, and risk notes.
- [ ] Pipeline/quality gates pass.
- [ ] Review approvals are complete.
- [ ] No Blocking comment remains.
- [ ] Migration/config/release steps are verified.
- [ ] Requirement → release traceability is complete.
- [ ] A rollback/forward-fix plan exists.
