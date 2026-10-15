import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const check=process.argv.includes('--check');
const release=JSON.parse(fs.readFileSync('dist/release.json','utf8'));
// Keep a static snapshot compatible with the existing root-based integration.
const files=Object.keys(release.files).filter(f=>f!=='.htaccess'&&!f.startsWith('practice/')).sort();
const old=fs.existsSync('static-files.json')?JSON.parse(fs.readFileSync('static-files.json','utf8')):[];
for(const file of old){
  assert(!file.includes('..')&&!path.isAbsolute(file),'Invalid snapshot manifest');
  if(!files.includes(file)){
    if(check)throw Error(`Stale exported file: ${file}`);
    if(fs.existsSync(file))fs.unlinkSync(file);
  }
}
for(const file of files){
  const data=fs.readFileSync(path.join('dist',file));
  if(check)assert(fs.existsSync(file)&&fs.readFileSync(file).equals(data),`Stale static snapshot: ${file}. Run npm run export.`);
  else {fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,data);}
}
if(!check)fs.writeFileSync('static-files.json',JSON.stringify(files,null,2)+'\n');
console.log(`${check?'Verified':'Exported'} ${files.length} static files. Independent packages preserved.`);
