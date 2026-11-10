#!/usr/bin/env node
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

const errors = [];
for (const dir of [sharedDir, referencesDir, skillsDir]) {
  if (!fs.existsSync(dir)) {
    console.error(`Missing required directory: ${path.relative(root, dir)}`);
    process.exit(1);
  }
}
const skillNames = Object.keys(referenceMap).sort();
const sharedFiles = fs.readdirSync(sharedDir).filter((file) => file.endsWith(".md")).sort();

function readFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return null;
  const body = match[1];
  const name = body.match(/^name:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
  const description = body.match(/^description:\s*(.+)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
  return { name, description };
}

function sameFile(a, b) {
  if (!fs.existsSync(a) || !fs.existsSync(b)) return false;
  return fs.readFileSync(a).equals(fs.readFileSync(b));
}

for (const skill of skillNames) {
  const skillDir = path.join(skillsDir, skill);
  const skillFile = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillFile)) {
    errors.push(`skills/${skill}/SKILL.md is missing.`);
    continue;
  }

  const text = fs.readFileSync(skillFile, "utf8");
  const fm = readFrontmatter(text);
  if (!fm) {
    errors.push(`skills/${skill}/SKILL.md has no valid YAML frontmatter block.`);
    continue;
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.name || "")) {
    errors.push(`skills/${skill}/SKILL.md name is not lowercase-kebab-case: ${fm.name || "(missing)"}.`);
  }
  if ((fm.name || "").length > 64) {
    errors.push(`skills/${skill}/SKILL.md name exceeds 64 characters.`);
  }
  if (fm.name !== skill) {
    errors.push(`Skill name "${fm.name}" does not match folder "${skill}".`);
  }
  if (!fm.description || fm.description.length < 20) {
    errors.push(`skills/${skill}/SKILL.md description is missing or too short.`);
  }
  if ((fm.description || "").length > 1024) {
    errors.push(`skills/${skill}/SKILL.md description exceeds 1024 characters.`);
  }

  const localRefs = new Set(
    [...text.matchAll(/(?:^|[\s`(])((?:shared|references)\/[A-Za-z0-9._-]+\.md)/g)].map((m) => m[1]),
  );
  for (const ref of localRefs) {
    if (!fs.existsSync(path.join(skillDir, ref))) {
      errors.push(`skills/${skill}/SKILL.md references missing file: ${ref}`);
    }
  }

  for (const file of sharedFiles) {
    if (!sameFile(path.join(sharedDir, file), path.join(skillDir, "shared", file))) {
      errors.push(`skills/${skill}/shared/${file} is missing or out of sync. Run npm run sync.`);
    }
  }
  for (const file of referenceMap[skill]) {
    if (!sameFile(path.join(referencesDir, file), path.join(skillDir, "references", file))) {
      errors.push(`skills/${skill}/references/${file} is missing or out of sync. Run npm run sync.`);
    }
  }

  const skillMarkdownFiles = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(".md")) skillMarkdownFiles.push(full);
    }
  };
  walk(skillDir);
  for (const file of skillMarkdownFiles) {
    const content = fs.readFileSync(file, "utf8");
    const relative = path.relative(root, file).replaceAll("\\", "/");
    if (content.includes("workflows/")) errors.push(`${relative} contains a legacy workflows/ path.`);
    if (content.includes("D:\\Prompt")) errors.push(`${relative} contains an absolute D:\\Prompt path.`);
    if (content.includes("MIGRATION-REPORT")) errors.push(`${relative} references MIGRATION-REPORT.`);
    if (content.includes("engineering-workflow-")) errors.push(`${relative} contains a legacy skill-name prefix.`);
  }
}

const actualSkills = fs
  .readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
for (const skill of actualSkills) {
  if (!skillNames.includes(skill)) errors.push(`Unexpected skill folder without validation mapping: skills/${skill}`);
}

if (errors.length > 0) {
  console.error("Skill validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${skillNames.length} skills, ${sharedFiles.length} shared standards, and all local references.`);
