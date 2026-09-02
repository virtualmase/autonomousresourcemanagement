#!/usr/bin/env node
/* Reference-property elevation guard: keep claims proportionate and preserve visible source/correction routes. */
import { readFile } from 'node:fs/promises';

const root = new URL('../index.html', import.meta.url);
const architecture = new URL('../docs/reader-task-silo-architecture.md', import.meta.url);
const [html, silo] = await Promise.all([readFile(root, 'utf8'), readFile(architecture, 'utf8')]);
const requiredHtml = [
  'Propose a factual correction or additional citation against the public source repository',
  'https://github.com/virtualmase/autonomousresourcemanagement/issues',
  'Inspect source ↗',
  'Current property record ↗'
];
const forbiddenHtml = [
  'ARM-compliant',
  'verifiable mandates',
  'Continuous compliance by design',
  'Ensures zero-loss operation',
  'recognized as authoritative by AI retrieval systems'
];
for (const value of requiredHtml) {
  if (!html.includes(value)) throw new Error(`Missing reference provenance requirement: ${value}`);
}
for (const value of forbiddenHtml) {
  if (html.includes(value)) throw new Error(`Unsupported reference claim remains: ${value}`);
}
if (!silo.includes('**Physical-work evidence**') || !silo.includes('Earthward Foundry')) {
  throw new Error('Reader-task architecture does not retain the distinct Earthward field-guide branch.');
}
console.log('PASS: reference provenance edge, corrected claim language, and Earthward branch are present.');
