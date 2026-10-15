const input = document.querySelector('#search');
const results = document.querySelector('#results');
const status = document.querySelector('#search-status');
let entries=[];
function render(){
  const q=input.value.trim().toLowerCase();
  const words=q.split(/\s+/).filter(Boolean);
  const matches=entries.filter(e=>words.every(w=>(e.title+' '+e.description+' '+e.text).toLowerCase().includes(w)));
  results.replaceChildren();
  for(const entry of matches){
    const li=document.createElement('li'),h=document.createElement('h2'),a=document.createElement('a'),p=document.createElement('p');
    a.href=entry.path;a.textContent=entry.title;p.textContent=entry.description;h.append(a);li.append(h,p);results.append(li);
  }
  status.textContent=matches.length ? `${matches.length} ${matches.length===1?'result':'results'}${q ? ` for “${input.value.trim()}”` : ''}.` : 'No matches. Try a broader term such as scaling, cost, or oversight.';
  const url=new URL(location.href);q?url.searchParams.set('q',input.value.trim()):url.searchParams.delete('q');history.replaceState(null,'',url);
}
input.value=new URLSearchParams(location.search).get('q')||'';
fetch('/search-index.json').then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{entries=data;input.disabled=false;render();input.addEventListener('input',render);}).catch(()=>{status.textContent='Search is temporarily unavailable. Browse the wiki using the navigation above.';});
