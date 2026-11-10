# BRD Quality Gates

## 1. Purpose

Define the evidence, quality, consistency, and completeness checks that a BRD package must pass before it can be used for technical planning.

## 2. Evidence Classification

Every significant requirement **MUST** have a traceable origin.

| Classification | Meaning |
|---|---|
| **CONFIRMED** | Explicitly documented or formally confirmed by stakeholders |
| **DERIVED** | Logically derived from documented business processes/rules |
| **PROPOSED** | Suggested by BA for stakeholder consideration |
| **TBD** | Insufficient information to establish the requirement |

Rules:

1. Never present derived requirements as confirmed.
2. Never convert assumptions into confirmed business rules.
3. Every derived requirement must explain its reasoning.
4. Every proposed requirement must be labeled.
5. Every unresolved business issue must be recorded.
6. Reference the original source whenever available.
7. Distinguish document evidence from stakeholder approval.

Confidence level (optional): High = explicit/unambiguous; Medium = multiple related sources but interpretation required; Low = incomplete/ambiguous. Confidence is not approval.

## 3. Requirement Quality Standards

Every requirement **MUST** be:

- **Atomic**: one primary business capability.
- **Clear**: no ambiguous or subjective wording.
- **Complete**: conditions, actors, expected behavior, outcomes.
- **Consistent**: no contradiction with other requirements.
- **Testable**: verifiable acceptance criteria.
- **Traceable**: unique ID and identifiable origin.
- **Feasible**: no contradictory/impossible business expectation.
- **Necessary**: no redundant requirement without justification.

Avoid vague expressions such as: user-friendly, fast, flexible, appropriate, easily configurable, as needed. Replace with explicit expectations or mark TBD.

Maintain stable requirement IDs when updating documents.

## 4. Source Coverage

- [ ] All relevant source documents are inventoried.
- [ ] All accessible content is analyzed.
- [ ] Inaccessible content is reported.
- [ ] Conflicting documents are identified.
- [ ] Source references are preserved.
- [ ] Analysis status is accurate (Analyzed / Partially Analyzed / Failed).

## 5. Business Coverage

- [ ] Business objectives are documented.
- [ ] Scope boundaries are explicit.
- [ ] Stakeholders are identified.
- [ ] Business processes are documented.
- [ ] AS-IS / TO-BE distinctions are clear.
- [ ] Functional requirements are comprehensive.
- [ ] Business rules are explicit.
- [ ] Business data requirements are covered.
- [ ] Screen requirements are documented.
- [ ] Reports and integrations are covered.
- [ ] Business exceptions are identified.
- [ ] Lifecycle/status, permissions, and E2E scenarios are covered.
- [ ] Notifications are covered.

## 6. Requirement Quality

- [ ] Requirements are atomic.
- [ ] IDs are unique and stable.
- [ ] Priorities are assigned.
- [ ] Source traceability is maintained.
- [ ] Acceptance criteria are testable.
- [ ] Dependencies are identified.
- [ ] Ambiguities are documented.
- [ ] No unsupported assumption is presented as confirmed.

## 7. Consistency

- [ ] Every business objective is supported by relevant business capabilities.
- [ ] Every business process is covered by functional requirements.
- [ ] Every important requirement has relevant business rules.
- [ ] Every business rule is reflected in relevant workflows.
- [ ] Roles and permissions are consistent across screens and processes.
- [ ] Statuses and transitions are consistent across functions.
- [ ] Data requirements cover all necessary business information.
- [ ] Screen requirements align with business workflows.
- [ ] Reports reflect documented business data and calculations.
- [ ] Integration requirements align with business processes.
- [ ] Notifications correspond to documented business events.
- [ ] Critical exceptions have defined business handling.
- [ ] End-to-end scenarios have complete business outcomes.
- [ ] No contradictory business behavior exists across functional areas.
- [ ] No important business process ends without a defined outcome.
- [ ] Acceptance criteria correctly reflect business requirements.

## 8. Documentation Quality

- [ ] Markdown structure is consistent.
- [ ] Tables are readable.
- [ ] Diagrams render correctly.
- [ ] Cross-references are valid.
- [ ] No duplicated or contradictory definitions exist.
- [ ] Every document has an appropriate scope and purpose.
- [ ] README index is current.

## 9. Completeness Assessment

Evaluate each dimension as Complete / Partial / Missing:

| Dimension | Assessment |
|---|---|
| Source document coverage | |
| Business objectives | |
| Business scope | |
| Stakeholders and roles | |
| Business processes | |
| Functional requirements | |
| Business rules | |
| Business data requirements | |
| Screen requirements | |
| Reports and outputs | |
| Business integrations | |
| Non-functional requirements | |
| Acceptance criteria | |
| Requirement traceability | |
| Business lifecycle | |
| Business permissions | |
| End-to-end scenarios | |
| Notifications and exceptions | |
| Risks and dependencies | |
| Open questions | |

Where measurable, report: total identified items, documented items, missing items, unresolved items, coverage percentage. Do not confuse documentation completeness with business approval.

## 10. Execution Rules

- Analyze first, document second, validate third.
- Do not modify application source code.
- Do not modify existing business logic.
- Do not implement features.
- Do not create technical design documents.
- Do not invent missing requirements.
- Do not silently discard information.
- Do not claim stakeholder approval without evidence.
- Do not mark unresolved critical issues as completed.
- Preserve existing documentation unless a justified update is necessary.
- Keep all BA deliverables within the designated documentation directory.
- If sources are extensive, process systematically and maintain an inventory to prevent omissions.
- Do not stop after an initial summary; complete the actual deliverables.

## 11. Final BA Status

Choose exactly one:

- **READY FOR BUSINESS REVIEW**: sufficiently structured for stakeholder review; business validation may still be required.
- **READY FOR STAKEHOLDER VALIDATION**: requirements documented and ready for formal confirmation.
- **READY FOR TECHNICAL HANDOVER**: sufficiently clear, complete, consistent, and traceable for independent TL analysis.
- **NOT READY — BUSINESS CLARIFICATION REQUIRED**: critical information is missing, conflicting, or unresolved.

Explain the reason for the selected status.

## 12. Final Report Structure

### A. Source Analysis Summary

- Total files discovered/analyzed/partially analyzed/inaccessible.
- Important source conflicts.

### B. Business Analysis Summary

- Domain overview, objectives, capabilities, processes, roles, major rules, critical workflows.

### C. Requirement Statistics

- Total FRs, business rules, data requirements, screens, ACs, E2E scenarios, exceptions, open questions.

### D. Quality Assessment

- Requirement coverage, source traceability, cross-functional consistency, documentation completeness, critical gaps, unresolved decisions.

### E. Documentation Deliverables

- Every created/updated file, its contents, and any missing/incomplete deliverable.

### F. Business Risks

- Critical business risks, conflicting requirements, missing information, stakeholder decisions required, dependencies affecting readiness.

### G. Final BA Status

- The selected status and its justification.
