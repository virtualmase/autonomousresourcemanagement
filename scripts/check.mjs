import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { readContent, origin } from './content.mjs';
const root=path.resolve('dist');
const files=fs.readdirSync(root,{recursive:true}).filter(f=>fs.statSync(path.join(root,f)).isFile());
const htmlFiles=files.filter(f=>f.endsWith('.html')&&!f.startsWith('google'));
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"');
const read=f=>fs.readFileSync(f,'utf8');
let links=0;
for(const file of htmlFiles){
  const html=read(path.join(root,file));
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: one h1 required`);
  assert.match(html,/<meta name="description" content="[^"]+">/);
  assert.match(html,/<link rel="canonical" href="https:\/\/autonomousresourcemanagement.com\//);
  assert.doesNotMatch(html,/swellmarketing|arm-agency|arisereputation|200\+.*deployments/i,`${file}: commercial/archival leakage`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: duplicate IDs`);
  for(const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(block[1]);
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const value=decode(match[1]);
    if(/^(https?:|data:)/.test(value))continue;
    const base=origin+'/'+file.replace(/index\.html$/,'');
    const url=new URL(value,base);
    const local=path.resolve(root,'.'+decodeURIComponent(url.pathname)+(url.pathname.endsWith('/')?'index.html':''));
    assert(local.startsWith(root+path.sep),`${file}: path outside build`);
    assert(fs.existsSync(local),`${file}: broken link ${value}`);
    if(url.hash){const id=decodeURIComponent(url.hash.slice(1));assert(read(local).includes(`id="${id}"`),`${file}: missing anchor ${value}`);}
    links++;
  }
}
for(const a of readContent().filter(a=>a.status==='published'&&a.kind==='news')){
  const reviewPath=path.resolve(a.reviewRecord);
  assert(reviewPath.startsWith(path.resolve('editorial')+path.sep),'Review record must live in editorial/');
  const record=JSON.parse(read(reviewPath));
  assert.equal(record.reviewer,a.reviewedBy,'Review attribution mismatch');
  assert.equal(record.checked,a.checked,'Review date mismatch');
  const item=record.articles.find(i=>i.path===a.path);
  assert(item && a.sources.some(s=>s.url===item.source),'Article missing from source-check record');
  assert.equal(item.sourceDate,a.eventDate,'Event date mismatch');
  assert(a.eventDate<=a.published && a.checked<=a.updated,'News date order invalid');
}
for(const forbidden of ['aure/','coreweaver-labs/','content/','editorial/','scripts/','node_modules/','.git/']) assert(!files.some(f=>f.startsWith(forbidden)),`Unexpected deployment path: ${forbidden}`);
const sitemap=read(path.join(root,'sitemap.xml'));
for(const a of readContent()){
  if(a.status==='draft') assert(!sitemap.includes(origin+a.path),'Draft in sitemap');
  else assert(sitemap.includes(origin+a.path),`Missing from sitemap: ${a.path}`);
}
assert(!sitemap.includes(origin+'/search/'));
const ld=JSON.parse(read(path.join(root,'schema.json')));
const home=read(path.join(root,'index.html'));
const inline=JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
for(const entity of ld['@graph']) assert.deepEqual(inline['@graph'].find(i=>i['@id']===entity['@id']),entity);
console.log(`Checked ${htmlFiles.length} HTML files, ${links} internal links/anchors, structured data, source reviews, and deployment exclusions.`);
