import fs from 'node:fs';
import assert from 'node:assert/strict';

export function loadTopics(articles) {
  const topics=JSON.parse(fs.readFileSync('editorial/topics.json','utf8'));
  const wiki=articles.filter(a=>a.kind==='wiki');
  const seen=new Set(), ids=new Set();
  for(const topic of topics) {
    assert(/^[a-z0-9-]+$/.test(topic.id) && !ids.has(topic.id),'Invalid or duplicate topic ID');
    ids.add(topic.id);
    assert(topic.title && topic.question && topic.description && topic.articles.length,'Incomplete topic');
    topic.entries=topic.articles.map(slug=>{
      const entry=wiki.find(a=>a.path===`/wiki/${slug}/`);
      assert(entry && !seen.has(entry.path),`Missing or duplicate topic article: ${slug}`);
      seen.add(entry.path);
      return entry;
    });
  }
  assert.equal(seen.size,wiki.length,'Every published wiki article needs a primary topic');
  for(const item of articles.filter(a=>a.kind==='news')) {
    assert(Array.isArray(item.concepts) && item.concepts.length,'News needs related concepts');
    assert.equal(new Set(item.concepts).size,item.concepts.length,'Duplicate news concepts');
    for(const target of item.concepts) {
      assert(seen.has(target),`News concept must be a published wiki article: ${target}`);
      assert(item.body.includes(`](${target})`),`News concept needs an explanatory body link: ${target}`);
    }
  }
  return topics;
}
