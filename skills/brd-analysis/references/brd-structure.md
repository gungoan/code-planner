# BRD Structure and Required Content

## 1. Purpose

Define the canonical BRD package produced by the `brd-analysis` skill. The structure is mandatory unless the user explicitly approves a deviation. Content **MUST** be sourced or classified as DERIVED/PROPOSED/TBD; it **MUST NOT** be invented.

This is the single BRD structure. The BRD workflow **MUST** reference it and **MUST NOT** maintain a parallel outline.

## 2. Output Directory

```text
docs/business-requirements/
├── README.md
├── 01-business-overview.md
├── 02-business-objectives-and-scope.md
├── 03-stakeholders-and-roles.md
├── 04-business-processes.md
├── 05-functional-requirements.md
├── 06-business-rules.md
├── 07-business-data-requirements.md
├── 08-screen-and-interaction-requirements.md
├── 09-reports-and-business-outputs.md
├── 10-business-integration-requirements.md
├── 11-non-functional-requirements.md
├── 12-acceptance-criteria.md
├── 13-requirement-traceability-matrix.md
├── 14-open-questions.md
├── 15-business-risks-and-dependencies.md
├── 16-business-status-lifecycle.md
├── 17-business-permission-matrix.md
├── 18-end-to-end-scenarios.md
├── 19-notifications-and-exceptions.md
├── 20-business-decision-log.md
├── 21-requirement-change-history.md
├── glossary.md
└── source-reference.md
```

## 3. ID Conventions

| Artifact | ID format | Example |
|---|---|---|
| Business objective | `BO-###` | BO-001 |
| Business role | `ROLE-###` | ROLE-001 |
| Business process | `BP-###` | BP-001 |
| Functional requirement | `FR-###` | FR-001 |
| Business rule | `BR-###` | BR-001 |
| Data requirement | `DATA-###` | DATA-001 |
| Screen/interaction | `SCR-###` | SCR-001 |
| Report | `RPT-###` | RPT-001 |
| Integration | `INT-###` | INT-001 |
| Non-functional requirement | `NFR-###` | NFR-001 |
| Acceptance criterion | `AC-###` | AC-001 |
| Open question | `OQ-###` | OQ-001 |
| Risk | `RISK-###` | RISK-001 |
| Dependency | `DEP-###` | DEP-001 |
| Decision | `DEC-###` | DEC-001 |
| Notification | `NOTI-###` | NOTI-001 |
| Exception | `EXC-###` | EXC-001 |
| End-to-end scenario | `E2E-###` | E2E-001 |
| Source | `SRC-###` | SRC-001 |

IDs **MUST** be stable. When a document is split/merged, preserve an old-to-new mapping.

## 4. Document-by-Document Content

### 4.1. README.md

- Project overview.
- BRD scope.
- Documentation index.
- ID conventions.
- Document relationships.
- Current status.
- Critical open business issues.
- Revision history.

### 4.2. 01-business-overview.md

- Document control: title, project, version, status, owner, author, created date, last updated, revision history.
- Purpose and intended audience.
- Business background and environment.
- Current operating model.
- Business challenges and limitations.
- Opportunities and expected improvements.
- Executive summary: problem, need, proposed capabilities, expected benefits, key considerations.
- Source references.

### 4.3. 02-business-objectives-and-scope.md

For each objective: ID, name, description, business justification, expected outcome, success metric/KPI, measurement method, priority, related processes, evidence.

Scope: in scope, out of scope, future scope, assumptions, constraints, dependencies, exclusions, business ownership. Distinguish mandatory from optional/future.

Do not invent numeric KPIs; use TBD when targets are not established.

### 4.4. 03-stakeholders-and-roles.md

For each role: ID, name, description, responsibilities, business objectives, business permissions, related workflows, approval responsibilities, interactions, ownership. Distinguish individual stakeholders from roles. Do not define technical authentication/authorization.

### 4.5. 04-business-processes.md

For each process: ID, name, domain, purpose, description, trigger, preconditions, actors/responsible roles, required inputs, main workflow, alternative workflows, exceptions, decision points, business rules, outputs, postconditions, related processes, related FRs, AS-IS, TO-BE, business impact, source references.

Create Mermaid flowcharts for complex processes with clear start/end and decision branches.

### 4.6. 05-functional-requirements.md

Each requirement **MUST** describe one atomic business capability.

Fields: ID, name, description, business objective, rationale, origin classification, evidence/source, primary actor, related stakeholders, preconditions, trigger, expected behavior, inputs, processing rules, outputs, alternative scenarios, exceptions, validation rules, related processes/rules, dependencies, priority (MoSCoW), acceptance criteria, status.

Avoid implementation-specific statements.

### 4.7. 06-business-rules.md

For each rule: ID, name, description, rationale, conditions, expected behavior, exceptions, applicable roles, related processes/FRs, origin, source references, confirmation status.

Rules **MUST** be explicit, independently understandable, and reusable.

### 4.8. 07-business-data-requirements.md

For each business entity: description, attributes, definitions, business meaning, mandatory/optional, validation, relationships, ownership, creation/modification conditions, lifecycle, retention, sensitivity/confidentiality. Include business-level relationships where useful.

Do not design tables, SQL columns, indexes, database constraints, physical schemas, migrations, or technical ERDs.

### 4.9. 08-screen-and-interaction-requirements.md

For each screen/interaction: ID, name, business purpose, target roles, entry conditions, main actions, required/displayed information, validation, expected outcomes, alternatives, errors/exceptions, navigation, related processes/FRs, wireframe/screenshot reference.

Document expected user behavior; do not prescribe frontend technology or component architecture.

### 4.10. 09-reports-and-business-outputs.md

For each report: ID, name, purpose, audience, required information, filters, calculations, grouping/aggregation, output, frequency, export requirements, access restrictions, source references.

### 4.11. 10-business-integration-requirements.md

For each integration: ID, external system, business purpose, triggering event, information exchanged, data ownership, expected outcome, dependencies, failure scenarios, recovery expectations, related processes, source references.

Do not define endpoints, HTTP methods, payload schemas, or protocols.

### 4.12. 11-non-functional-requirements.md

Business expectations for performance, availability, usability, accessibility, confidentiality, security, auditability, traceability, localization, language, retention, compliance, backup/recovery. Use measurable targets only with authoritative sources; otherwise TBD + open question.

### 4.13. 12-acceptance-criteria.md

For every relevant FR, create ACs using Given/When/Then. Include positive, negative, boundary, and exception scenarios where relevant. Criteria **MUST** be specific, measurable where applicable, testable, unambiguous, consistent with business rules, and traceable to FRs.

### 4.14. 13-requirement-traceability-matrix.md

Connect: Business Objectives → Business Processes → Functional Requirements → Business Rules → Business Data → Screens → Acceptance Criteria → Source Documents.

Identify: requirements without source, requirements without AC, rules without requirements, processes without coverage, ACs without supporting requirements, uncovered source requirements, unresolved dependencies. Maintain stable IDs.

### 4.15. 14-open-questions.md

For each question: ID, related requirement, domain, description, ambiguity/missing information, reason, potential impact, suggested clarification, responsible stakeholder, priority, status, resolution, evidence. Prioritize by business impact. Never silently resolve important ambiguity.

### 4.16. 15-business-risks-and-dependencies.md

Risks: ID, description, business impact, probability, severity, related requirements, business mitigation, responsible stakeholder, status.

Dependencies: ID, description, related processes, owner, expected availability, business impact, status.

### 4.17. 16-business-status-lifecycle.md

For each business object with status: object, status ID/name/definition, entry conditions, allowed next statuses, responsible role, allowed actions, blocking conditions, rejection/cancellation/reopening scenarios, expected outcomes. Create a transition matrix and Mermaid state diagram where useful. Do not invent transitions without evidence or stakeholder confirmation.

### 4.18. 17-business-permission-matrix.md

Map roles against objects, actions, operations, conditions, approval responsibilities, and restrictions. Consider view/create/edit/delete/submit/approve/reject/cancel/reopen/export. Document who can act, under which conditions, on which objects/statuses, and whether approval/separation of duties is required. Distinguish business permissions from technical authorization.

### 4.19. 18-end-to-end-scenarios.md

For each scenario: ID, name, business objective, actors, initial conditions, trigger, sequential activities, related processes/FRs/rules, required information, alternatives, failures, recovery, final outcome. Validate consistency across functions. Do not analyze screens independently of the overall process.

### 4.20. 19-notifications-and-exceptions.md

Notifications: ID, business event, trigger, recipients, purpose, content, timing, priority, expected action, related processes.

Exceptions: ID, description, trigger, business impact, expected user-facing behavior, responsible role, corrective action, recovery, final outcome, related requirements. Distinguish business exceptions from technical infrastructure errors.

### 4.21. 20-business-decision-log.md

For each decision: ID, context, description, alternatives, confirmed decision, owner, date, evidence, related requirements/processes, approval status. Do not treat a proposed decision as approved.

### 4.22. 21-requirement-change-history.md

Record requirement ID, previous description, updated description, reason, requester, date, business impact, related requirements, approval status, source references. Never silently overwrite confirmed requirements.

### 4.23. glossary.md

Business terminology, abbreviations, domain concepts, definitions, status definitions, synonyms, original-language terms. Maintain consistent terminology.

### 4.24. source-reference.md

Source inventory: Source ID, file name, document type, version, business domain, relevant sections, analysis status, extracted information, related requirements.

Analysis status **MUST** be one of: Pending / Analyzed / Partially Analyzed / Failed. Never claim full analysis of inaccessible content.

## 5. Documentation Rules

- Write deliverables in the language specified by the user/project; default to English.
- Keep important business terms consistent; include original terms when needed.
- Use Markdown tables for structured requirements.
- Use Mermaid for business processes/state diagrams.
- Use stable IDs and cross-references.
- Avoid unnecessary duplication.
- Include source references wherever possible.
- Prefer complete documentation over artificially shortened output.
- Split large documents logically without losing traceability.

## 6. Cross-Functional Consistency

Apply the consistency checklist in `references/brd-quality-gates.md` Section 7. That checklist is the single source of truth for consistency validation; do not maintain a second copy here.
