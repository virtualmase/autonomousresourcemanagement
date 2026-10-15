import fs from 'node:fs';
import path from 'node:path';
import { Marked } from 'marked';

export const origin = 'https://autonomousresourcemanagement.com';
export const repo = 'https://github.com/virtualmase/autonomousresourcemanagement';
export const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const safeURL = s => /^(https:\/\/|\/(?!\/)|#)/.test(s);
export function parseContent(raw, file = 'article') {
  const match = raw.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${file}: expected JSON front matter`);
  const meta = JSON.parse(match[1]);
  for (const key of ['title','description','path','kind','status','updated']) {
    if (!meta[key] || typeof meta[key] !== 'string') throw new Error(`${file}: missing ${key}`);
  }
  if (!/^\/(?:[a-z0-9-]+\/)*$/.test(meta.path)) throw new Error(`${file}: invalid route`);
  if (!['wiki','news','framework','page'].includes(meta.kind)) throw new Error(`${file}: invalid kind`);
  if (!['published','draft'].includes(meta.status)) throw new Error(`${file}: invalid status`);
  for (const key of ['updated','published','eventDate','checked']) {
    if (meta[key] && (!/^\d{4}-\d{2}-\d{2}$/.test(meta[key]) || Number.isNaN(Date.parse(meta[key])) || new Date(meta[key]).toISOString().slice(0,10) !== meta[key] || meta[key] > new Date().toISOString().slice(0,10))) throw new Error(`${file}: invalid/future ${key}`);
  }
  if (meta.published && meta.updated < meta.published) throw new Error(`${file}: update precedes publication`);
  if (meta.status === 'published' && ['wiki','news','framework'].includes(meta.kind)) {
    if (!meta.sources?.length || !meta.author || !meta.review) throw new Error(`${file}: published reference requires sources, author and review disclosure`);
    for (const source of meta.sources) {
      if (!source.title || !source.url?.startsWith('https://') || !source.scope) throw new Error(`${file}: incomplete source`);
      if (!match[2].includes(source.url)) throw new Error(`${file}: source must be cited inline: ${source.url}`);
    }
  }
  if (meta.kind === 'news' && meta.status === 'published') {
    if (!meta.published || !meta.eventDate || !meta.checked || !meta.reviewedBy || !meta.reviewRecord) throw new Error(`${file}: news requires dated source check and review record`);
    for (const heading of ['What changed','Why it matters','Limits of the evidence']) {
      if (!match[2].includes(`## ${heading}`)) throw new Error(`${file}: missing ${heading}`);
    }
  }
  return { ...meta, body: match[2], file };
}
export function readContent(dir = 'content') {
  const files = fs.readdirSync(dir, {recursive:true}).filter(f=>f.endsWith('.md')).sort();
  return files.map(f=>parseContent(fs.readFileSync(path.join(dir,f),'utf8'),path.join(dir,f)));
}
export function renderMarkdown(body) {
  const headings = [], seen = new Map();
  const renderer = {
    html({text}) { return escape(text); },
    link({href, tokens}) {
      if (!safeURL(href)) throw new Error(`Unsupported link: ${href}`);
      return `<a href="${escape(href)}">${this.parser.parseInline(tokens)}</a>`;
    },
    image() { throw new Error('Use reviewed static assets in templates, not remote Markdown images'); },
    heading({tokens,depth,text}) {
      if (depth === 1) throw new Error('Article title is generated; use level 2+ headings');
      const base=slug(text), n=seen.get(base)||0; seen.set(base,n+1);
      const id=n ? `${base}-${n+1}` : base;
      if(depth===2) headings.push({id,text});
      return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>`;
    }
  };
  return {html:new Marked({renderer}).parse(body),headings};
}
