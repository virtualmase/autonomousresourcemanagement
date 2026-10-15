import importlib.util
from pathlib import Path
from datetime import datetime,timezone
import unittest
spec=importlib.util.spec_from_file_location('collector',Path(__file__).resolve().parents[1]/'scripts/collect-news.py')
collector=importlib.util.module_from_spec(spec);spec.loader.exec_module(collector)
class NewsTests(unittest.TestCase):
    def setUp(self):
        self.feed={'hosts':['example.org'],'name':'Example','type':'Project announcement'}
        self.now=datetime(2026,10,15,tzinfo=timezone.utc)
    def test_tracking_and_fragments_deduplicate(self):
        self.assertEqual(collector.canonical('https://example.org/a?utm_source=x#part',['example.org']),'https://example.org/a')
    def test_external_and_unsafe_links_rejected(self):
        for url in ['http://example.org/a','https://evil.org/a','https://example.org@evil.org/a','https://example.org:8080/a']:
            with self.assertRaises(ValueError):collector.canonical(url,self.feed['hosts'])
    def test_rss_filters_future_stale_and_unrelated(self):
        items=''.join(f'<item><title>{title}</title><link>https://example.org/{i}</link><pubDate>{date}</pubDate></item>' for i,(title,date) in enumerate([('Resource allocation','2026-10-10'),('Autoscaling future','2026-10-20'),('Cost stale','2026-01-01'),('Birthday photos','2026-10-10')]))
        result=collector.parse_feed(('<rss><channel>'+items+'</channel></rss>').encode(),self.feed,self.now)
        self.assertEqual(len(result),1);self.assertEqual(result[0]['status'],'unreviewed')
    def test_atom_and_invalid_xml(self):
        xml=b'<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Telemetry change</title><link href="https://example.org/a"/><published>2026-10-12T12:00:00Z</published></entry></feed>'
        self.assertEqual(len(collector.parse_feed(xml,self.feed,self.now)),1)
        with self.assertRaises(ValueError):collector.parse_feed(b'<!DOCTYPE x><rss/>',self.feed,self.now)
if __name__=='__main__':unittest.main()
