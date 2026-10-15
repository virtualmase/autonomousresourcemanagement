import fs from 'node:fs';
import crypto from 'node:crypto';
const base='https://autonomousresourcemanagement.com';
const manifest=JSON.parse(fs.readFileSync('dist/release.json','utf8'));
const failures=[];
for(const [file,hash] of Object.entries(manifest.files)){
  if(file==='.htaccess')continue;
  const route=file.endsWith('index.html')?file.slice(0,-10):file;
  try{
    const response=await fetch(`${base}/${route}`,{signal:AbortSignal.timeout(20000),cache:'no-store'});
    const data=Buffer.from(await response.arrayBuffer());
    if(!response.ok || crypto.createHash('sha256').update(data).digest('hex')!==hash)failures.push(`${route}: HTTP ${response.status} or content mismatch`);
  }catch(error){failures.push(`${route}: ${error.message}`);}
}
try{
  const remote=await fetch(base+'/release.json',{signal:AbortSignal.timeout(20000),cache:'no-store'});
  if(!remote.ok || JSON.stringify(await remote.json())!==JSON.stringify(manifest))failures.push('release.json mismatch');
  const missing=await fetch(base+'/__arm_missing_page_check__/',{signal:AbortSignal.timeout(20000)});
  if(missing.status!==404)failures.push(`Missing route returned ${missing.status}, expected 404`);
  const practice=await fetch(base+'/practice/',{redirect:'manual',signal:AbortSignal.timeout(20000)});
  if(practice.status!==301 || new URL(practice.headers.get('location')||'/',base).pathname!=='/wiki/')failures.push('Legacy /practice/ redirect mismatch');
}catch(error){failures.push(error.message);}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`Production matches ${manifest.sourceCommit}: all public release files verified.`);
