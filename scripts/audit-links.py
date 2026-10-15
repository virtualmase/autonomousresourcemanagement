"""Audit the generated reference with Python's standard library; no external service."""
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import json

ORIGIN = 'https://autonomousresourcemanagement.com'

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.links, self.ids, self.canonical = [], set(), None
        self.indexable, self.in_main, self.in_article = True, False, False
        self.anchor = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.add(a['id'])
        if tag == 'main': self.in_main = True
        if tag == 'article': self.in_article = True
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'meta' and a.get('name') == 'robots':
            self.indexable = 'noindex' not in a.get('content', '')
        if tag == 'a' and 'href' in a:
            self.anchor = {'href': a['href'], 'text': '', 'main': self.in_main, 'article': self.in_article}
        if tag == 'img' and self.anchor:
            self.anchor['text'] += a.get('alt', '')

    def handle_data(self, data):
        if self.anchor is not None: self.anchor['text'] += data

    def handle_endtag(self, tag):
        if tag == 'a' and self.anchor is not None:
            self.links.append(self.anchor)
            self.anchor = None
        if tag == 'main': self.in_main = False
        if tag == 'article': self.in_article = False

def audit(root):
    pages = {}
    for file in sorted(root.rglob('index.html')):
        route = '/' + file.relative_to(root).as_posix().removesuffix('index.html')
        pages[route] = Page(file.read_text())
    errors, edges, contextual = [], {}, {}
    for route, page in pages.items():
        edges[route] = set()
        if page.canonical != ORIGIN + route:
            errors.append(f'{route}: non-self canonical {page.canonical}')
        for link in page.links:
            url = urlsplit(urljoin(ORIGIN + route, link['href']))
            if url.netloc != urlsplit(ORIGIN).netloc: continue
            target = unquote(url.path)
            file = root / target.lstrip('/')
            if target.endswith('/'): file /= 'index.html'
            if not file.is_file():
                errors.append(f'{route}: broken internal link {link["href"]}')
                continue
            if target.endswith('.html') and target != '/404.html' and not target.startswith('/google'):
                errors.append(f'{route}: link to HTML alias instead of canonical route: {target}')
            if url.fragment:
                ids = pages[target].ids if target in pages else Page(file.read_text()).ids
                if unquote(url.fragment) not in ids:
                    errors.append(f'{route}: missing fragment {link["href"]}')
            if target not in pages or target == route: continue
            if not link['text'].strip(): errors.append(f'{route}: empty anchor to {target}')
            if url.scheme != 'https' or url.query:
                errors.append(f'{route}: noncanonical internal URL {link["href"]}')
            edges[route].add(target)
            if link['article']:
                contextual.setdefault(target, set()).add(route)
    distance = {'/': 0}
    queue = deque(['/'])
    while queue:
        source = queue.popleft()
        for target in edges.get(source, set()):
            if target not in distance:
                distance[target] = distance[source] + 1
                queue.append(target)
    rows = []
    for route, page in pages.items():
        if not page.indexable: continue
        incoming = sorted(source for source, targets in edges.items() if route in targets and pages[source].indexable)
        depth = distance.get(route)
        if route != '/' and not incoming: errors.append(f'{route}: orphaned indexable page')
        if depth is None or depth > 3: errors.append(f'{route}: exceeds three-click navigation budget ({depth})')
        body_sources = sorted(contextual.get(route, set()))
        if route.startswith('/wiki/') and route != '/wiki/' and not body_sources:
            errors.append(f'{route}: no contextual article inlink')
        rows.append({'path': route, 'depth': depth, 'inlinks': incoming, 'contextualInlinks': body_sources})
    return {'pages': rows, 'errors': errors}

if __name__ == '__main__':
    report = audit(Path('dist'))
    Path('test-results').mkdir(exist_ok=True)
    Path('test-results/internal-links.json').write_text(json.dumps(report, indent=2) + '\n')
    if report['errors']:
        raise SystemExit('\n'.join(report['errors']))
    print(f"Internal-link audit: {len(report['pages'])} indexable pages; no orphans, canonical-link defects, or broken fragments; maximum depth {max(p['depth'] for p in report['pages'])}.")
