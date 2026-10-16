import fs from 'node:fs';
import {origin} from './content.mjs';
const report={origin,checked:new Date().toISOString(),pages:[],errors:[]};
const sitemapResponse=await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(20000)});
if(!sitemapResponse.ok)throw Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap=await sitemapResponse.text();
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
if(!urls.length)throw Error('Empty sitemap');
for(let start=0;start<urls.length;start+=3){
  const batch=await Promise.all(urls.slice(start,start+3).map(async url=>{
    try{
      if(new URL(url).origin!==origin)throw Error('Unexpected sitemap origin');
      const response=await fetch(url,{signal:AbortSignal.timeout(20000),cache:'no-store'});
      const html=await response.text();
      const canonicalTag=[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]).find(tag=>/\brel=["']canonical["']/i.test(tag));
      const canonical=canonicalTag?.match(/\bhref=["']([^"']+)["']/i)?.[1];
      const contentType=response.headers.get('content-type')||'';
      const robots=response.headers.get('x-robots-tag')||'';
      const errors=[];
      if(response.status!==200)errors.push(`HTTP ${response.status}`);
      if(response.url!==url)errors.push('Sitemap URL redirects');
      if(!contentType.includes('text/html'))errors.push('Non-HTML content type');
      if(canonical!==url)errors.push('Missing/mismatched canonical');
      if(/noindex|none/i.test(robots)||/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html))errors.push('Indexing restricted');
      if(/Checking your browser before accessing/.test(html))errors.push('Browser challenge instead of article');
      if(!/<h1[ >]/.test(html))errors.push('Missing visible heading');
      return {url,status:response.status,canonical,errors};
    }catch(error){return {url,errors:[error.message]};}
  }));
  report.pages.push(...batch);
}
report.errors=report.pages.flatMap(p=>p.errors.map(e=>`${p.url}: ${e}`));
fs.mkdirSync('test-results',{recursive:true});
fs.writeFileSync('test-results/production-search-audit.json',JSON.stringify(report,null,2)+'\n');
if(report.errors.length){console.error(report.errors.join('\n'));process.exitCode=1;}
else console.log(`Public HTTP crawl: ${urls.length} sitemap pages return HTML 200 with matching canonicals and no observed index restrictions/challenges. This does not prove Google indexing.`);
