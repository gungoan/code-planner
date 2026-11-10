#!/usr/bin/env node
// Maintainer utility: copies canonical shared/ and references/ files into each
// self-contained skill package. It removes and recreates only the generated
// skills/<name>/shared and skills/<name>/references directories.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sharedDir = path.join(root, "shared");
const referencesDir = path.join(root, "references");
const skillsDir = path.join(root, "skills");

const referenceMap = {
  "brd-analysis": ["brd-structure.md", "brd-quality-gates.md"],
  "technical-decomposition": ["workstream-model.md", "decomposition-model.md", "task-schema.md"],
  "backlog-audit": ["backlog-audit-checklist.md", "task-schema.md", "workstream-model.md"],
  "technical-readiness": ["workstream-model.md"],
  "standards-baseline": ["workstream-model.md"],
  "final-consistency-audit": ["final-audit-checklist.md", "workstream-model.md", "task-schema.md"],
  "gitlab-backlog-sync": ["task-schema.md", "workstream-model.md"],
};

if (!fs.existsSync(sharedDir) || !fs.existsSync(referencesDir) || !fs.existsSync(skillsDir)) {
  throw new Error("Expected shared/, references/, and skills/ directories at the repository root.");
}

const sharedFiles = fs.readdirSync(sharedDir).filter((file) => file.endsWith(".md")).sort();
if (sharedFiles.length === 0) {
  throw new Error("No shared standards found in shared/.");
}

function assertInside(parent, child) {
  const relative = path.relative(path.resolve(parent), path.resolve(child));
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to modify path outside the skill directory: ${child}`);
  }
}

for (const [skill, references] of Object.entries(referenceMap)) {
  const skillDir = path.join(skillsDir, skill);
  const skillFile = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    throw new Error(`Missing skills/${skill}/SKILL.md.`);
  }

  const targetShared = path.join(skillDir, "shared");
  assertInside(skillDir, targetShared);
  fs.rmSync(targetShared, { recursive: true, force: true });
  fs.mkdirSync(targetShared, { recursive: true });
  for (const file of sharedFiles) {
    fs.copyFileSync(path.join(sharedDir, file), path.join(targetShared, file));
  }

  const targetReferences = path.join(skillDir, "references");
  assertInside(skillDir, targetReferences);
  fs.rmSync(targetReferences, { recursive: true, force: true });
  fs.mkdirSync(targetReferences, { recursive: true });
  for (const file of references) {
    const source = path.join(referencesDir, file);
    if (!fs.existsSync(source)) {
      throw new Error(`Missing references/${file} required by skills/${skill}.`);
    }
    fs.copyFileSync(source, path.join(targetReferences, file));
  }

  console.log(`Synced ${skill}: ${sharedFiles.length} shared, ${references.length} references`);
}

console.log(`Done. Synced ${Object.keys(referenceMap).length} skills.`);
