import importlib.util
import json
from pathlib import Path
import re
import shutil
import tempfile
import unittest

spec=importlib.util.spec_from_file_location('audit_search',Path('scripts/audit-search.py'))
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class SchemaAuditTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.root=Path(self.temp.name)
        for name in json.loads(Path('static-files.json').read_text()):
            target=self.root/name
            target.parent.mkdir(parents=True,exist_ok=True)
            shutil.copyfile(name,target)
    def tearDown(self): self.temp.cleanup()
    def change(self, transform, target='wiki/autoscaling/index.html'):
        file=self.root/target
        html=file.read_text()
        pattern=r'(<script type="application/ld\+json">)(.*?)(</script>)'
        def update(match):
            graph=json.loads(match[2]);transform(graph['@graph'])
            return match[1]+json.dumps(graph)+match[3]
        file.write_text(re.sub(pattern,update,html,flags=re.S))
    def test_committed_release_graph_matches_visible_content(self):
        self.assertEqual(module.audit(self.root)['errors'],[])
    def test_unresolved_author_is_rejected(self):
        def change(nodes):
            next(n for n in nodes if n.get('headline'))['author']={'@id':'https://example.com/invented'}
        self.change(change)
        self.assertTrue(any('unresolved graph reference' in e for e in module.audit(self.root)['errors']))
    def test_invisible_breadcrumb_is_rejected(self):
        def change(nodes):
            next(n for n in nodes if n['@type']=='BreadcrumbList')['itemListElement'][1]['name']='Invented topic'
        self.change(change)
        self.assertTrue(any('breadcrumb differs' in e for e in module.audit(self.root)['errors']))
    def test_freshness_not_in_visible_content_is_rejected(self):
        def change(nodes):
            next(n for n in nodes if n.get('headline'))['dateModified']='2030-01-01'
        self.change(change)
        self.assertTrue(any('modification date differs' in e for e in module.audit(self.root)['errors']))

    def test_existing_but_wrong_author_is_rejected(self):
        def change(nodes):
            author=next(n for n in nodes if n['@type']=='Person')
            next(n for n in nodes if n.get('headline'))['author']={'@id':author['@id']}
        self.change(change)
        self.assertTrue(any('author differs from visible byline' in e for e in module.audit(self.root)['errors']))
    def test_citation_must_remain_in_source_list(self):
        file=self.root/'wiki/autoscaling/index.html'
        raw=file.read_text()
        raw=re.sub(r'(<ol class="source-list">)(.*?)(</ol>)',lambda m:m[1]+m[2].replace('https://kubernetes.io/docs/concepts/workloads/autoscaling/','https://example.com/unrelated')+m[3],raw,flags=re.S)
        file.write_text(raw)
        self.assertTrue(any('citations differ from visible source links' in e for e in module.audit(self.root)['errors']))
    def test_collection_cannot_swap_names_between_urls(self):
        def change(nodes):
            items=next(n for n in nodes if n['@type']=='ItemList')['itemListElement']
            items[0]['name'],items[1]['name']=items[1]['name'],items[0]['name']
        self.change(change,'wiki/index.html')
        self.assertTrue(any('collection URL/name pairs' in e for e in module.audit(self.root)['errors']))
