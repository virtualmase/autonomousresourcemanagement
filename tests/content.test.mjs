import test from 'node:test';
import assert from 'node:assert/strict';
import {parseContent,renderMarkdown} from '../scripts/content.mjs';
const meta={title:'Example',description:'Test',path:'/news/example/',kind:'news',status:'published',updated:'2026-10-15',published:'2026-10-15',eventDate:'2026-05-07',checked:'2026-10-15',author:'ARM Editorial',review:'AI source check',reviewedBy:'Codex',reviewRecord:'editorial/check.json',sources:[{title:'Source',url:'https://example.org/source',scope:'Announcement'}]};
const body='## What changed\n[Source](https://example.org/source)\n## Why it matters\nContext\n## Limits of the evidence\nNot independently tested.';
const raw=(m,b=body)=>`---\n${JSON.stringify(m)}\n---\n${b}`;
test('news cannot publish without source-check metadata',()=>{
  for(const key of ['sources','review','reviewedBy','reviewRecord','eventDate','checked']){const m={...meta};delete m[key];assert.throws(()=>parseContent(raw(m)));}
});
test('published sources must appear inline and required evidence sections must exist',()=>{
  assert.throws(()=>parseContent(raw(meta,'## What changed\nNo evidence')));
  assert.throws(()=>parseContent(raw(meta,body.replace('## Limits of the evidence','## Conclusions'))));
  assert.equal(parseContent(raw(meta)).title,'Example');
});
test('invalid routes and dates fail before writing output',()=>{
  for(const route of ['/../secret/','//evil.test/','/foo.html','/a?b/'])assert.throws(()=>parseContent(raw({...meta,path:route})));
  for(const updated of ['2099-01-01','2026-02-30','invalid'])assert.throws(()=>parseContent(raw({...meta,updated})));
});
test('Markdown escapes raw HTML and rejects executable links and remote images',()=>{
  assert(!renderMarkdown('<script>alert(1)</script>').html.includes('<script>'));
  assert.throws(()=>renderMarkdown('[bad](javascript:alert%281%29)'));
  assert.throws(()=>renderMarkdown('![tracking](https://example.org/pixel)'));
  assert.throws(()=>renderMarkdown('# Duplicate title'));
  const rendered=renderMarkdown('## Same\nOne\n## Same\nTwo');
  assert.deepEqual(rendered.headings.map(h=>h.id),['same','same-2']);
});
