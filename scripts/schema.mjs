import {origin} from './content.mjs';

export const maintainerProfile='https://www.linkedin.com/in/mason-nguyen';
export const maintainerId=origin+'/about/#maintainer-and-authorship';
export const schemaBase=[
  {'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'Autonomous Resource Management',inLanguage:'en',description:'A source-backed reference on automated resource allocation, orchestration, infrastructure, and human oversight.',publisher:{'@id':origin+'/#publisher'}},
  {'@type':'Organization','@id':origin+'/#publisher',name:'Autonomous Resource Management Editorial',alternateName:'ARM Editorial',url:origin+'/about/',description:'Editorial identity of this reference, maintained by Mason Nguyen.'},
  {'@type':'Person','@id':maintainerId,name:'Mason Nguyen',url:origin+'/about/#maintainer-and-authorship',sameAs:[maintainerProfile]}
];
export function articleSchema(a) {
  if(a.kind==='page') return [];
  return [{
    '@type':a.kind==='news'?'NewsArticle':['Article','TechArticle'],
    '@id':origin+a.path+'#article',url:origin+a.path,
    headline:a.title,description:a.description,inLanguage:'en',
    dateModified:a.updated,...(a.published?{datePublished:a.published}:{}),
    author:{'@id':a.author.startsWith('Mason Nguyen')?maintainerId:origin+'/#publisher'},
    publisher:{'@id':origin+'/#publisher'},
    mainEntityOfPage:{'@id':origin+a.path+'#webpage'},
    isPartOf:{'@id':origin+'/#website'},
    citation:a.sources.map(s=>({'@type':'CreativeWork',name:s.title,url:s.url}))
  }];
}
export function breadcrumbSchema(route,crumbs) {
  return {'@type':'BreadcrumbList','@id':origin+route+'#breadcrumbs',itemListElement:crumbs.map(([url,name],i)=>({'@type':'ListItem',position:i+1,name,item:origin+url}))};
}
export function collectionSchema(route,entries) {
  return {'@type':'ItemList','@id':origin+route+'#items',numberOfItems:entries.length,itemListElement:entries.map((entry,i)=>({'@type':'ListItem',position:i+1,name:entry.title,url:entry.url||origin+entry.path}))};
}
export function pageGraph({title,description,route,schema=[],updated}) {
  const article=schema.find(n=>[].concat(n['@type']).some(t=>['Article','TechArticle','NewsArticle'].includes(t)));
  const breadcrumb=schema.find(n=>n['@type']==='BreadcrumbList');
  const collection=schema.find(n=>n['@type']==='ItemList');
  const type=route==='/about/'?'AboutPage':collection?'CollectionPage':route==='/search/'?'SearchResultsPage':'WebPage';
  const page={'@type':type,'@id':origin+route+'#webpage',url:origin+route,name:title,description,inLanguage:'en',isPartOf:{'@id':origin+'/#website'},...(updated?{dateModified:updated}:{}),...(article||collection?{mainEntity:{'@id':(article||collection)['@id']}}:{}),...(breadcrumb?{breadcrumb:{'@id':breadcrumb['@id']}}:{})};
  return {'@context':'https://schema.org','@graph':[...schemaBase,page,...schema]};
}
