import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('audit_links', Path('scripts/audit-links.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class LinkAuditTests(unittest.TestCase):
    def fixture(self, root, route, body, canonical=None):
        file = root / route.lstrip('/') / 'index.html'
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text(f'<link rel="canonical" href="{canonical or module.ORIGIN + route}"><main>{body}</main>')

    def test_absolute_internal_links_and_fragments_are_checked(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.fixture(root, '/', '<a href="https://autonomousresourcemanagement.com/topic/#missing">Topic</a>')
            self.fixture(root, '/topic/', '<a href="/">Home</a>')
            self.assertTrue(any('missing fragment' in e for e in module.audit(root)['errors']))

    def test_navigation_does_not_satisfy_contextual_link_requirement(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.fixture(root, '/', '<nav><a href="/wiki/example/">Example</a></nav><article class="card"><a href="/wiki/example/">Example card</a></article>')
            self.fixture(root, '/wiki/example/', '<a href="/">Home</a>')
            self.assertIn('/wiki/example/: no contextual article inlink', module.audit(root)['errors'])

    def test_orphan_and_wrong_canonical_fail(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.fixture(root, '/', '')
            self.fixture(root, '/lost/', '', 'https://other.example/lost/')
            errors = module.audit(root)['errors']
            self.assertTrue(any('orphaned' in e for e in errors))
            self.assertTrue(any('non-self canonical' in e for e in errors))

    def test_valid_contextual_route_passes(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.fixture(root, '/', '<article class="prose"><a href="/wiki/example/#definition">Example definition</a></article>')
            self.fixture(root, '/wiki/example/', '<h2 id="definition">Definition</h2><a href="/">Home</a>')
            self.assertEqual(module.audit(root)['errors'], [])
