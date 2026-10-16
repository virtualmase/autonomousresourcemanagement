"""Rendered metadata/schema consistency checks, not a Google rich-result certification."""
from pathlib import Path
from html import unescape
import json
import re
import xml.etree.ElementTree as ET

ORIGIN='https://autonomousresourcemanagement.com'

def text(value):
    return ' '.join(unescape(re.sub(r'<[^>]+>', '', value)).split())

def links(html):
    return [(unescape(url),text(label)) for url,label in re.findall(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>',html,re.S)]

def audit(root):
    errors=[]
    def require(condition,message):
        if not condition: errors.append(message)
    sitemap=ET.parse(root/'sitemap.xml')
    locs=[n.text for n in sitemap.findall('.//{*}loc')]
    require(len(locs)==len(set(locs)), 'Duplicate sitemap URLs')
    titles,descriptions=set(),set()
    count=0
    for file in sorted(root.rglob('index.html')):
        if file.relative_to(root).parts[0]=='practice': continue # separately maintained historical record
        count+=1
        route='/'+file.relative_to(root).as_posix().removesuffix('index.html')
        html=file.read_text()
        title=text(re.search(r'<title>(.*?)</title>',html,re.S)[1])
        description=unescape(re.search(r'<meta name="description" content="([^"]*)"',html)[1])
        require(title not in titles,f'{route}: duplicate title');titles.add(title)
        require(description not in descriptions,f'{route}: duplicate description');descriptions.add(description)
        canonical=unescape(re.search(r'<link rel="canonical" href="([^"]+)"',html)[1])
        require(canonical==ORIGIN+route,f'{route}: canonical mismatch')
        require('name="viewport"' in html and '<html lang="en">' in html,f'{route}: missing language/viewport')
        indexable='noindex,follow' not in html
        require((canonical in locs)==indexable,f'{route}: sitemap/indexability mismatch')
        require('nosnippet' not in html and 'data-nosnippet' not in html,f'{route}: unexpected snippet restriction')
        graph=json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',html,re.S)[1])
        require(graph.get('@context')=='https://schema.org',f'{route}: context')
        nodes=graph['@graph']; ids=[n.get('@id') for n in nodes]
        require(len(ids)==len(set(ids)),f'{route}: duplicate graph identity')
        indexed={n['@id']:n for n in nodes}
        page=indexed.get(canonical+'#webpage',{})
        require(page.get('url')==canonical and page.get('name')==title.removesuffix(' | Autonomous Resource Management'),f'{route}: WebPage identity/title mismatch')
        require(page.get('description')==description,f'{route}: WebPage description mismatch')
        def visit(value):
            if isinstance(value,list):
                for item in value: visit(item)
            elif isinstance(value,dict):
                if set(value)=={'@id'}:
                    require(value['@id'] in indexed,f'{route}: unresolved graph reference {value["@id"]}')
                for item in value.values(): visit(item)
        visit(nodes)
        for node in nodes:
            types=node['@type'] if isinstance(node['@type'],list) else [node['@type']]
            require(not set(types)&{'Review','AggregateRating','Product','FAQPage','HowTo'},f'{route}: unsupported rich-result claim')
            if set(types)&{'Article','TechArticle','NewsArticle'}:
                heading=text(re.search(r'<h1[^>]*>(.*?)</h1>',html,re.S)[1])
                require(node.get('headline')==heading,f'{route}: headline differs from visible heading')
                require(node.get('mainEntityOfPage',{}).get('@id')==page.get('@id'),f'{route}: article/page mismatch')
                require(page.get('mainEntity',{}).get('@id')==node['@id'],f'{route}: missing reverse article relationship')
                require(f'datetime="{node.get("dateModified")}"' in html,f'{route}: modification date differs from visible date')
                if 'datePublished' in node:
                    require('Brief published: '+node['datePublished'] in html,f'{route}: publication date differs from visible date')
                    require(node['datePublished']<=node['dateModified'],f'{route}: publication after modification')
                source_block=re.search(r'<ol class="source-list">(.*?)</ol>',html,re.S)
                visible_sources=links(source_block[1]) if source_block else []
                require([(s['url'],s['name']) for s in node.get('citation',[])]==visible_sources,f'{route}: citations differ from visible source links')
                author=indexed.get(node.get('author',{}).get('@id'),{})
                require(author.get('@type') in ['Person','Organization'],f'{route}: invalid author')
                byline=re.search(r'<p class="meta">By <a[^>]*>(.*?)</a>',html,re.S)
                require(byline is not None and text(byline[1])==author.get('alternateName',author.get('name')),f'{route}: author differs from visible byline')
            if 'BreadcrumbList' in types:
                block=re.search(r'<nav class="breadcrumb" aria-label="Breadcrumb">(.*?)</nav>',html,re.S)
                require(block is not None,f'{route}: breadcrumb absent from page')
                if block:
                    visible=[(unescape(m[0]),text(m[1])) if m[0] else (route,text(m[2])) for m in re.findall(r'<a href="([^"]+)">(.*?)</a>|<span aria-current="page">(.*?)</span>',block[1])]
                    actual=[(n['item'].removeprefix(ORIGIN),n['name']) for n in node['itemListElement']]
                    require(actual==visible,f'{route}: breadcrumb differs from visible trail')
                    require([n['position'] for n in node['itemListElement']]==list(range(1,len(visible)+1)),f'{route}: breadcrumb positions')
            if 'ItemList' in types:
                items=node['itemListElement']
                require(node.get('numberOfItems')==len(items),f'{route}: collection count')
                require(len({n['url'] for n in items})==len(items),f'{route}: duplicate collection item')
                body=html.split('<main',1)[1].split('</main>',1)[0]
                expected=[(item['url'].removeprefix(ORIGIN),item['name']) for item in items]
                visible=list(dict.fromkeys(pair for pair in links(body) if pair in expected))
                require(visible==expected,f'{route}: collection URL/name pairs or order differ from visible links')
    historical=root/'practice/index.html'
    if historical.exists():
        raw=historical.read_text()
        record=json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',raw,re.S)[1])
        require(record.get('@type')=='CollectionPage' and record.get('url')==ORIGIN+'/practice/','Historical practice: page identity mismatch')
        require(record.get('about',{}).get('url')==ORIGIN+'/wiki/autonomous-resource-management/','Historical practice: stale term relationship')
        require(record.get('isPartOf',{}).get('url')==ORIGIN+'/','Historical practice: website relationship')
    require('Sitemap: '+ORIGIN+'/sitemap.xml' in (root/'robots.txt').read_text(),'robots sitemap missing')
    return {'generatedPages':count,'errors':errors}

if __name__=='__main__':
    result=audit(Path('dist'))
    Path('test-results').mkdir(exist_ok=True)
    Path('test-results/search-audit.json').write_text(json.dumps(result,indent=2)+'\n')
    if result['errors']: raise SystemExit('\n'.join(result['errors']))
    print(f"Search/schema audit: {result['generatedPages']} generated pages; unique metadata, sitemap parity, connected identities, visible article dates/citations, breadcrumbs and collections verified.")
