import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const script=path.resolve('scripts/export-static.mjs');
test('root snapshot exports its release manifest and detects stale published bytes',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'arm-export-'));
  try{
    fs.mkdirSync(path.join(dir,'dist'));
    const release={schemaVersion:1,contentDigest:'fixture',contentRevision:'2026-10-15',pages:1,files:{'index.html':'fixture','.htaccess':'fixture'}};
    fs.writeFileSync(path.join(dir,'dist/release.json'),JSON.stringify(release));
    fs.writeFileSync(path.join(dir,'dist/index.html'),'<h1>Reference</h1>');
    execFileSync(process.execPath,[script],{cwd:dir});
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir,'release.json'))),release);
    assert(JSON.parse(fs.readFileSync(path.join(dir,'static-files.json'))).includes('release.json'));
    assert(!fs.existsSync(path.join(dir,'.htaccess')),'Host configuration must not be overwritten by export');
    execFileSync(process.execPath,[script,'--check'],{cwd:dir});
    fs.writeFileSync(path.join(dir,'index.html'),'<h1>Unexpected edit</h1>');
    assert.throws(()=>execFileSync(process.execPath,[script,'--check'],{cwd:dir,stdio:'pipe'}));
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
});
