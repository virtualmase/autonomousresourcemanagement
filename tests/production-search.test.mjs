import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';

test('production audit retains good pages and records an off-origin sitemap entry',()=>{
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'arm-crawl-'));
  try {
    const script=pathToFileURL(path.resolve('scripts/audit-production-search.mjs')).href;
    const source=`
      const origin='https://autonomousresourcemanagement.com';
      globalThis.fetch=async url=>{
        if(!url.startsWith(origin))throw Error('Must not fetch external sitemap entry');
        const sitemap=url.endsWith('sitemap.xml');
        const body=sitemap?'<urlset><url><loc>'+origin+'/</loc></url><url><loc>https://other.example/</loc></url></urlset>':'<h1>Example</h1><link href="'+origin+'/" rel="canonical">';
        const response=new Response(body,{headers:{'content-type':sitemap?'application/xml':'text/html'}});
        Object.defineProperty(response,'url',{value:url});
        return response;
      };
      await import(${JSON.stringify(script)});
    `;
    const result=spawnSync(process.execPath,['--input-type=module','-e',source],{cwd:root,encoding:'utf8'});
    assert.equal(result.status,1);
    const report=JSON.parse(fs.readFileSync(path.join(root,'test-results/production-search-audit.json'),'utf8'));
    assert.equal(report.pages.length,2);
    assert.deepEqual(report.pages[0].errors,[],'Canonical attribute order should not matter');
    assert.deepEqual(report.pages[1].errors,['Unexpected sitemap origin']);
  } finally {fs.rmSync(root,{recursive:true,force:true});}
});
