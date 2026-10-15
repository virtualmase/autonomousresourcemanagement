"""Collect untrusted feed metadata for review. Never writes publishable content."""
import argparse
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from html import unescape
import json
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode
from urllib.request import Request, build_opener, HTTPRedirectHandler
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
KEYWORDS = ('resource', 'scal', 'schedul', 'allocat', 'finops', 'cost', 'budget', 'agent', 'orchestrat', 'observab', 'telemetry', 'governance', 'inference', 'gpu', 'quota', 'capacity')

def canonical(url, hosts):
    p = urlsplit(url.strip())
    if p.scheme != 'https' or p.hostname not in hosts or p.username or p.password or p.port not in (None, 443):
        raise ValueError('URL is outside the approved HTTPS source hosts')
    query = urlencode(sorted((k,v) for k,v in parse_qsl(p.query) if not k.lower().startswith('utm_') and k not in ('fbclid','gclid')))
    return urlunsplit(('https',p.hostname,p.path or '/',query,''))

def parse_date(value):
    try:
        d = datetime.fromisoformat(value.replace('Z','+00:00'))
    except ValueError:
        d = parsedate_to_datetime(value)
    if d.tzinfo is None:
        d=d.replace(tzinfo=timezone.utc)
    return d.astimezone(timezone.utc)

def clean(text):
    return re.sub(r'\s+', ' ', unescape(re.sub('<[^>]+>', '', text))).strip()

def parse_feed(data, feed, now, days=30):
    # Feed bodies are bounded before parsing. DTDs/entities are never needed here.
    if re.search(br'<!\s*(DOCTYPE|ENTITY)', data, re.I):
        raise ValueError('DTD/entity declarations are not accepted')
    root=ET.fromstring(data)
    candidates=[]
    for item in root.iter():
        if item.tag.split('}')[-1] not in ('item','entry'):
            continue
        fields={}
        for child in item:
            name=child.tag.split('}')[-1]
            if name=='link' and child.get('rel','alternate')=='alternate':
                fields['url']=child.get('href') or child.text or ''
            elif name in ('title','pubDate','published','updated','description','summary'):
                fields[name]=''.join(child.itertext())
        try:
            title=clean(fields.get('title',''))[:300]
            url=canonical(fields.get('url',''), feed['hosts'])
            published=parse_date(fields.get('published') or fields.get('pubDate') or fields.get('updated') or '')
        except (ValueError, TypeError, OverflowError):
            continue
        text=(title+' '+clean(fields.get('summary','')+' '+fields.get('description',''))).lower()
        terms=[k for k in KEYWORDS if k in text]
        if title and terms and now-timedelta(days=days)<=published<=now:
            candidates.append(dict(title=title,url=url,source=feed['name'],sourceType=feed['type'],published=published.isoformat(),matchedTerms=terms,status='unreviewed',evidence='Publisher feed metadata only; original source must be read before publication.'))
    return candidates

class ApprovedRedirect(HTTPRedirectHandler):
    def __init__(self, hosts):
        self.hosts=hosts
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        canonical(newurl,self.hosts)
        return super().redirect_request(req,fp,code,msg,headers,newurl)

def collect(feed):
    url=canonical(feed['url'],feed['hosts'])
    opener=build_opener(ApprovedRedirect(feed['hosts']))
    with opener.open(Request(url,headers={'User-Agent':'ARMReferenceSourceDiscovery/1.0 (+https://autonomousresourcemanagement.com/editorial-policy/)'}),timeout=25) as response:
        canonical(response.url,feed['hosts'])
        data=response.read(3_000_001)
        if len(data)>3_000_000:
            raise ValueError('Feed exceeded 3 MB size limit')
        return data

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--days',type=int,default=30)
    args=parser.parse_args()
    if not 1<=args.days<=90:
        parser.error('--days must be between 1 and 90')
    now=datetime.now(timezone.utc)
    feeds=json.loads((ROOT/'editorial/feeds.json').read_text())
    decisions=json.loads((ROOT/'editorial/decisions.json').read_text())
    candidates={}; errors=[]; states=[]
    for feed in feeds:
        try:
            items=parse_feed(collect(feed),feed,now,args.days)
            states.append({'source':feed['name'],'state':'ok','matches':len(items)})
            for item in items:
                if item['url'] not in decisions:
                    candidates.setdefault(item['url'],item)
        except Exception as exc:
            errors.append({'source':feed['name'],'error':str(exc)[:300]})
            states.append({'source':feed['name'],'state':'failed'})
    queue=sorted(candidates.values(),key=lambda i:i['published'],reverse=True)[:40]
    report=dict(collectedAt=now.isoformat(),lookbackDays=args.days,feedStatus=states,errors=errors,candidates=queue)
    (ROOT/'editorial/queue.json').write_text(json.dumps(report,indent=2)+'\n')
    lines=['# Source discovery queue','','Unreviewed feed metadata. Read the original source; do not treat titles as verified claims.','']
    for item in queue:
        # Escape markup and @ mentions in source-supplied titles.
        title=re.sub(r'([\\`*_{}\[\]<>#@!|])',r'\\\1',item['title'])
        lines += [f"## {title}",f"Source: {item['source']} | Date: {item['published']}",f"Original: <{item['url']}>",'Status: unreviewed. Confirm relevance, evidence, event date, limitations, and related wiki entry.','']
    if errors:
        lines += ['## Feed failures','',*[(e['source']+': collection failed; see queue.json.') for e in errors]]
    (ROOT/'editorial/queue.md').write_text('\n'.join(lines)+'\n')
    print(f'Collected {len(queue)} candidates; {len(errors)} feed errors. No articles published.')
    return 1 if errors else 0

if __name__=='__main__':
    sys.exit(main())
