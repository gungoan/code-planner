---
name: brd-analysis
description: Analyze business source documents and produce a structured, traceable Business Requirements Document. Use for BRD creation, business requirement extraction, business process/rule analysis, or a clean-slate BRD rebuild. Do not use for technical architecture, API/database design, or implementation task breakdown.
license: MIT
---

# BRD Analysis

## 1. Purpose

Transform fragmented or unstructured business material into a complete, consistent, traceable BRD package. The output is the authoritative business input for planning.

## 2. When to Use

- Business documents must be analyzed and turned into a BRD.
- An existing BRD must be rebuilt from a clean slate.
- Business rules, processes, roles, data requirements, or acceptance criteria must be extracted and documented.
- Business traceability and open questions must be established before technical planning.

## 3. When Not to Use

- Do not use for system architecture, API design, database schema, or technology selection.
- Do not use for implementation task breakdown or tracker backlog creation.
- Do not use when the user only wants a technical design review.

## 4. Responsibility Boundary

BA owns business analysis only. The agent **MUST NOT**:

- Design APIs, databases, schemas, or architecture.
- Define frontend/backend implementation.
- Select a technology stack.
- Create developer tasks or estimates.
- Claim stakeholder approval without evidence.

If technical information is required, record it as an open question for the TL instead of designing it.

## 5. Inputs

- Source directory or document list provided by the user.
- Optional existing BRD/functional documents.
- Optional stakeholder decisions and prior approvals.
- Output language and scope constraints from the user or project.

## 6. Preconditions

- The source location is known and accessible.
- The output directory is known; default is `docs/business-requirements/`.
- The user understands that unresolved business questions will be recorded, not invented.

## 7. Process

### Step 1 — Discover sources

Inspect the designated input location and identify all relevant materials:

- PDF, DOCX/DOC, XLSX/XLS, PPTX/PPT, CSV, TXT, Markdown.
- Process diagrams, UI mockups, screenshots, and other business documents.
- Relevant subdirectories and supplementary documents.

Do not assume the first few files represent the full scope.

### Step 2 — Build a source inventory

Create a source inventory with:

- Source ID.
- File name.
- Document type.
- Version (if available).
- Business domain.
- Relevant sections/pages/sheets.
- Analysis status: Pending / Analyzed / Partially Analyzed / Failed.
- Extracted information.
- Related requirements.

Never claim a document was fully analyzed if part of it was inaccessible or uninterpretable.

### Step 3 — Analyze source content

- Excel: inspect all relevant worksheets, tables, columns, rows, formulas, notes, merged cells, hidden sheets where accessible, and cross-sheet relationships.
- PowerPoint: inspect all relevant slides, text, tables, diagrams, flows, annotations, and embedded images.
- Word/PDF: inspect all pages and sections, tables, headings, notes, references, and diagrams.
- Images/diagrams: interpret workflows, layouts, relationships, decision points, and annotations; record uncertain interpretations as open questions.
- Preserve original meaning and context.

### Step 4 — Cross-document analysis

Identify:

- Duplicate requirements.
- Conflicting business definitions.
- Different workflow descriptions.
- Inconsistent terminology.
- Missing business steps.
- Unclear ownership.
- Incomplete validation rules.
- Contradictory conditions.
- Missing exception scenarios.
- Outdated or superseded information.

Do not arbitrarily choose one conflicting source as correct. Record the conflict and create a clarification question.

### Step 5 — Classify evidence

Every significant requirement **MUST** have a traceable origin:

- CONFIRMED: explicit or formally confirmed.
- DERIVED: logically derived from documented processes/rules.
- PROPOSED: suggested for stakeholder consideration.
- TBD: insufficient information.

Never present DERIVED/PROPOSED as CONFIRMED. Explain the reasoning for DERIVED. Record unresolved issues.

### Step 6 — Analyze the business domain

Establish:

- Business context, environment, current operating model.
- Challenges, limitations, opportunities, expected improvements.
- Objectives, business value, outcomes, success metrics/KPIs.
- In scope, out of scope, future scope, assumptions, constraints, dependencies.
- Business capabilities grouped into domains/functional areas.
- AS-IS and TO-BE processes, clearly distinguished.
- Do not invent an AS-IS process without evidence.

### Step 7 — Build the BRD package

Produce the documents defined in `references/brd-structure.md`, including:

- Overview, objectives, scope, stakeholders, roles.
- Business processes, functional requirements, business rules.
- Data, screens, reports, integrations, NFRs.
- Acceptance criteria, traceability, open questions.
- Risks, dependencies, lifecycle, permissions.
- End-to-end scenarios, notifications, exceptions.
- Decision log, change history, glossary, source reference.

Use stable IDs and cross-references. Use Mermaid for complex processes and state diagrams.

### Step 8 — Cross-functional consistency review

Validate that objectives, processes, requirements, rules, data, screens, reports, integrations, notifications, exceptions, roles, permissions, statuses, and acceptance criteria are mutually consistent. Produce an inconsistency report.

### Step 9 — Quality audit

Apply `references/brd-quality-gates.md`:

- Source coverage.
- Business coverage.
- Requirement quality.
- Consistency.
- Documentation quality.
- Completeness assessment.

### Step 10 — Final report

Report source analysis, business analysis, requirement statistics, quality assessment, deliverables, business risks, and the final BA status. Use the report structure in `references/brd-quality-gates.md` Section 12.

## 8. Clean-Slate Rebuild Mode

Use this mode only when the user explicitly asks to rebuild the BRD from scratch or remove legacy content.

Mandatory rules:

1. **Zero legacy**: remove business content, functions, terminology, processes, and structures that are no longer in current scope.
2. **Single source of truth**: one official definition per business concept.
3. **Zero conflict**: remove contradictory, duplicated, or unapproved alternatives.
4. **Confirmed requirements only**: keep confirmed business content; do not decide on the user's behalf.
5. **Scope purification**: remove out-of-scope/legacy functions.
6. **Full consistency**: align actors, workflows, rules, entities, use cases, FRs, and NFRs.
7. **Clean documentation**: normalize structure, terminology, IDs, links, and index; do not retain historical content in the official BRD.

Handling rules:

- Confirmed content: keep and normalize.
- Outdated/out-of-scope content: remove.
- Conflicting content: identify and ask the user if no confirmed conclusion exists.
- Unclear content: convert to Open Questions; do not put it into official requirements.
- Do not retain contradictory alternatives just to preserve old documents.
- Do not delete data needed for traceability; store history outside the current BRD only when necessary.

Acceptance: no legacy requirement, contradictory business content, unresolved conflict, or duplicate remains in the official BRD.

## 9. Rules

- **MUST** analyze first, document second, validate third.
- **MUST** cite sources for material conclusions.
- **MUST** keep stable IDs and cross-references.
- **MUST** record unresolved questions and conflicts.
- **MUST NOT** invent requirements, KPIs, stakeholder approval, or business rules.
- **MUST NOT** cross into technical design.
- **MUST NOT** silently discard information.
- **MUST NOT** mark an unresolved critical issue as complete.
- **SHOULD** prefer complete documentation over artificially shortened output.
- **SHOULD** split large documents logically without losing traceability.
- **MAY** add business-level diagrams where they improve understanding.

### Stop Conditions

Stop and ask the user when:

- Source documents are missing, inaccessible, or too incomplete to establish scope.
- Authoritative sources conflict and no evidence resolves the conflict.
- A business decision is required to define scope, KPI, rule, or approval.
- The request crosses into technical design or implementation tasks.
- Stakeholder approval cannot be verified but is required for the requested status.
- A critical requirement has no source and would require invention.

## 10. Outputs

- BRD package under `docs/business-requirements/` (or the user-specified path).
- Source inventory.
- Traceability matrix.
- Open questions, risks, dependencies, decision log.
- Completeness assessment.
- Final BA report and status.

## 11. Verification

- [ ] All accessible sources are inventoried and analyzed; inaccessible parts are reported.
- [ ] Every material requirement has an origin classification and source.
- [ ] Business scope, objectives, processes, rules, data, roles, screens, reports, integrations, and NFRs are covered.
- [ ] Acceptance criteria are testable and traceable.
- [ ] No contradictory definitions remain.
- [ ] IDs and cross-references are valid.
- [ ] Open questions are classified by impact.
- [ ] No technical design content is present.
- [ ] Final status matches actual completeness.
- [ ] All deliverables and verification evidence are listed.

## 12. References

- `references/brd-structure.md` — canonical BRD package and required fields.
- `references/brd-quality-gates.md` — evidence, quality, consistency, completeness, final status.
- `shared/documentation-standards.md` — IDs, Markdown, cross-references, document lifecycle.
- `shared/engineering-principles.md` — evidence, traceability, no invention.

## 13. Handoff

Hand off using: STATUS, ARTIFACTS, DECISIONS, OPEN QUESTIONS, RISKS, NEXT, EVIDENCE. The next skill is normally `technical-decomposition`.
