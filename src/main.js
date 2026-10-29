import layouts from './layouts.json';
import content from './content.json';
import responsiveImages from './image-assets.json';
import './image-assets.css';
import {styles} from './styles.js';
import {setupScrollMotion} from './scroll-motion.js';
import './style.css';
const RESUME_URL='/Mina-Liu-Resume.pdf';
const routes={home:'/',roomie:'/work/roomie',alloydb:'/work/alloydb','robotic-knitting':'/work/robotic-knitting','human-ai':'/work/human-ai',about:'/about'};
const page=Object.keys(routes).find(k=>routes[k]===location.pathname.replace(/\/$/,'')||k==='home'&&location.pathname==='/')||'404';
document.body.dataset.page=page;
const media=matchMedia('(max-width: 800px)');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const app=document.querySelector('#app');let observer;
const num=v=>v?.endsWith?.('px')?parseFloat(v):null;
const textOf=n=>typeof n==='string'?n:n.text?(content[n.text]??n.fallback):n.c.map(textOf).join(' ');
function assign(el,style){for(const [key,value]of Object.entries(style))el.style.setProperty(key,value);}
function href(text,name){if(/Explore my work|All work|Back to work/.test(text))return '/#work';if(/résumé|resume|CV/i.test(text))return RESUME_URL;if(/LinkedIn/i.test(text))return 'https://www.linkedin.com/in/minatliu/';if(/@cornell/.test(text))return 'mailto:mtl79@cornell.edu';if(/prior|paper|published/i.test(text))return 'https://doi.org/10.1145/3746059.3747759';if(/Next|Roomie/.test(text))return '/work/roomie';return '/#work';}
function navigation(mobile){const nav=document.createElement('header');nav.className='navigation';nav.innerHTML=`<a class="wordmark" href="/" aria-label="Mina Liu home">MINA</a><nav aria-label="Main navigation">${[['Work','/#work',page!=='about'],['About','/about',page==='about'],['Resume',RESUME_URL,false]].map(([label,url,active])=>`<a href="${url}" ${active?'aria-current="page"':''} ${label==='Resume'?'target="_blank" rel="noopener" aria-label="Resume (PDF, opens in a new tab)"':''}>${label}</a>`).join('')}</nav>`;return nav;}
const decorative=/texture|grain|mask|paper|Rectangle|Dynamic Island|photographic registration/i;
function render(n,parentW,context={}){
 if(typeof n==='string')return document.createTextNode(n);
 if(n.text)return document.createTextNode(content[n.text]??n.fallback);
 const a=n.a,name=a['data-name']||'',text=textOf(n),s=styles(a.className),w=num(s.width),h=num(s.height),pad=num(s.padding)||0;
 if(name.startsWith('Selected navigation'))return document.createDocumentFragment();
 if(name.startsWith('Shared / Navigation'))return navigation(media.matches);
 let tag=n.tag;
 if(name.startsWith('Shared / Footer'))tag='footer';
 else if(name==='MY WORK'||name==='Personal photo journal'||parentW===1440&&/introduction|ownership|implementation|foundations|status|BACKGROUND|Robotics \/|AlloyDB \/|About Mina|Résumé \/ embedded/.test(name))tag='section';
 const card={'Project / Roomie':'roomie','Project / AlloyDB':'alloydb','Project / Robotics':'robotic-knitting','Project / Human-AI':'human-ai'}[name];
 if(card)tag='a';
 if(tag==='button')tag='a';
 const font=num(s['font-size']);
 if(tag==='p'&&s['font-family']?.startsWith('Inter')&&font>=28&&s.position!=='absolute')tag=context.hasHeading?'h2':'h1';
 const el=document.createElement(tag);el.dataset.design=name||a['data-node-id']||'';
 if(a['data-node-id'])el.dataset.node=a['data-node-id'];
 if(tag==='p'&&font>=14&&!s['font-family']?.startsWith('Inter'))el.classList.add('body-copy');
 if(tag==='h1'||tag==='h2'){el.classList.add('heading');context.hasHeading=true;}
 if(name==='MY WORK'){el.id='work';el.setAttribute('aria-label','My work');}
 if(card){el.href=routes[card];el.classList.add('project-card');}
 else if(tag==='a'){
  el.href=href(text,name);
  if(/LinkedIn/.test(text)){el.rel='me';el.classList.add('linkedin-link');el.setAttribute('aria-label','Mina Liu on LinkedIn');el.title='LinkedIn';}
  if(el.getAttribute('href')===RESUME_URL){el.target='_blank';el.rel='noopener';el.setAttribute('aria-label','Resume (PDF, opens in a new tab)');}
 }
 if(tag==='img'){
  const image=responsiveImages[a.src];
  if(image){el.dataset.responsiveImage=a.src;el.width=image.width;el.height=image.height;}else el.src=a.src;
  if(context.hero&&image?.type==='photo')el.fetchPriority='high';
  el.alt='';el.decoding='async';el.loading=context.hero?'eager':'lazy';
  if(!decorative.test(context.name||'')){el.alt=altText(context.name||'',page);}
 }
 if(a.style)for(const [key,value]of Object.entries(a.style))s[key.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())]=typeof value==='string'?value.replace(/\/assets\/[\w./-]+\.(?:png|jpe?g)/g,source=>responsiveImages[source]?.src||source):value;
 if(a['aria-hidden'])el.setAttribute('aria-hidden','true');
 if(!context.fixed){
  if(w!==null){if(s.position==='absolute')s.width=`${w/parentW*100}%`;else{s.width=w>=parentW-.5?'100%':`${w/parentW*100}%`;s['flex-shrink']='1';}}
  // Layout remains fluid; only image compositions retain their Figma coordinates.
  if(s.position==='absolute'&&num(s.left)!==null)s.left=`${num(s.left)/parentW*100}%`;
 }
 const actualW=w||parentW;
 const isArt=!context.fixed&&h&&w&&name&&!/Hero \/ name|Who I am|Shared \/ Footer|About hero/.test(name)&&n.c.some(c=>c.a&&styles(c.a.className).position==='absolute')&&/photo|visual|screen|architecture|collage|documentation|print|figure|mockup|mechanical|Roomie \/|Graph|graph/i.test(name);
 if(isArt){
  s.height='auto';s['aspect-ratio']=`${w}/${h}`;s.position=s.position||'relative';el.classList.add('artwork');
  const stage=document.createElement('div');stage.className='artwork-stage';stage.style.width=w+'px';stage.style.height=h+'px';stage.dataset.width=w;
  for(const child of n.c)stage.append(render(child,actualW,{...context,fixed:true,name,hero:context.hero||/Hero photo/.test(name)}));el.append(stage);
 }else{
  for(const child of n.c)el.append(render(child,actualW-pad*2,{...context,name:name||context.name,hero:context.hero||/Hero/.test(name)}));
 }
 if(name.startsWith('Shared / Footer')){
  s.width='100%';el.classList.add('contact-footer');
  for(const link of el.querySelectorAll('a')){
   link.target='_blank';
   link.rel=[...new Set([...link.rel.split(/\s+/).filter(Boolean),'noopener','noreferrer'])].join(' ');
   if(!link.href.startsWith('mailto:'))link.setAttribute('aria-label',`${link.getAttribute('aria-label')||link.textContent.trim()} (opens in a new tab)`);
  }
 }
 if(name==='Hero / name overlapping photograph')el.classList.add('hero-composition');
 if(name.startsWith('Left edge /'))el.classList.add('paper-edge');
 if(name==='Introduction / clear name')el.classList.add('home-intro');
 if(name.startsWith('Textured type /'))el.classList.add('textured-heading');
 if(name==='Textured title / Resume')el.dataset.texturedTitle='';
 if(el.classList.contains('linkedin-link')){const icon=document.createElement('span');icon.className='linkedin-icon';icon.setAttribute('aria-hidden','true');el.replaceChildren(icon);}
 assign(el,s);return el;
}
function altText(name,page){
 if(/Hero photo/.test(name))return 'Mina in Central Park, with the lake and city skyline behind her.';
 if(/Roomie|display|screen/i.test(name))return 'Roomie household app interface showing shared notes, chores, or the home dashboard.';
 if(/graph|figure/i.test(name))return 'P5 user and AI linguistic signal trajectories, October 2023 to July 2025; 6,286 messages.';
 if(/gripper|hardware|prototype|arm/i.test(name))return 'Cornell robotics lab: FAIRINO arms, needle bed, and yarn-handling tooling.';
 if(/Photo|Print|photobooth/i.test(name))return page==='about'?'Personal photo from Mina’s journal: friends, food, and everyday moments.':'Original project photograph.';
 return '';
}
function normalizeHeadings(){
 const headings=[...document.querySelectorAll('main h1')];
 for(const old of headings){const h=document.createElement('h2');for(const a of old.attributes)h.setAttribute(a.name,a.value);h.append(...old.childNodes);old.replaceWith(h);}
 const title=document.querySelector('.textured-heading > h2, .textured-heading > p, .textured-heading > div:not([data-design^="Generated grain"])');
 if(title){const h=document.createElement('h1');for(const a of title.attributes)h.setAttribute(a.name,a.value);h.append(...title.childNodes);for(const p of h.querySelectorAll(':scope > p')){const span=document.createElement('span');for(const a of p.attributes)span.setAttribute(a.name,a.value);span.style.display='block';span.append(...p.childNodes);p.replaceWith(span);}title.replaceWith(h);}
 else {const first=document.querySelector('main h2');if(first){const h=document.createElement('h1');for(const a of first.attributes)h.setAttribute(a.name,a.value);h.append(...first.childNodes);first.replaceWith(h);}}
}
function setup(){
 observer?.disconnect();
 if(page==='404'){app.innerHTML='<main id="main" class="not-found"><h1>Page not found</h1><a href="/">Return home</a></main>';return;}
 const tree=layouts[page][media.matches?'mobile':'desktop'];
 const root=render(tree,media.matches?390:1440,{});root.removeAttribute('style');root.className='page';
 const main=document.createElement('main');main.id='main';
 // Put page sections in one main landmark and keep shared header/footer outside it.
 const nodes=[...root.childNodes];app.replaceChildren();
 for(const node of nodes){if(node.nodeName==='HEADER')app.append(node);else if(node.nodeName==='FOOTER'){if(main.childNodes.length&&!main.isConnected)app.append(main);app.append(node);}else main.append(node);}
 if(!main.isConnected)app.append(main);
 for(const band of [...main.children,...app.querySelectorAll(':scope > header, :scope > footer')])band.classList.add('page-band');
 observer=new ResizeObserver(entries=>{for(const {target,contentRect}of entries){const stage=target.querySelector(':scope > .artwork-stage');if(stage)stage.style.transform=`scale(${contentRect.width/Number(stage.dataset.width)})`;}scheduleImageSizes();});
 document.querySelectorAll('.artwork').forEach(el=>{
  const stage=el.querySelector(':scope > .artwork-stage');
  if(stage)stage.style.transform=`scale(${el.clientWidth/Number(stage.dataset.width)})`;
  observer.observe(el);
 });
 document.title=page==='home'?'Mina Liu — Software + Product':`${{roomie:'Roomie',alloydb:'Google / AlloyDB','robotic-knitting':'Robotic 3D Knitting','human-ai':'Human–AI Research',about:'About'}[page]} — Mina Liu`;
 // One canonical desktop copy source also supplies mobile layouts.
 if(location.hash)requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView());
 normalizeHeadings();
 for(const title of document.querySelectorAll('.textured-heading h1, [data-textured-title]')){
  const letters=title.querySelectorAll('span');
  for(const el of letters.length?letters:[title]){
   el.style.setProperty('--letter-ink',getComputedStyle(el).color);el.classList.add('print-type');el.style.backgroundPosition=`${-el.offsetLeft}px ${-el.offsetTop}px`;
  }
 }
 motion();
 syncImageSizes();
}
// Sizes reflect the final crop and the 1200px frame, not an estimate of viewport width.
let imageFrame=0;
function syncImageSizes(){
 for(const image of document.querySelectorAll('img[data-responsive-image]')){
  const asset=responsiveImages[image.dataset.responsiveImage];
  const width=Math.ceil(image.getBoundingClientRect().width);
  if(!width)continue;
  const sizes=`${width}px`;
  if(image.sizes!==sizes)image.sizes=sizes;
  if(!image.srcset){image.srcset=asset.srcset;image.src=asset.src;}
 }
}
function scheduleImageSizes(){
 cancelAnimationFrame(imageFrame);imageFrame=requestAnimationFrame(syncImageSizes);
}
let scrollHandler, stopScrollEffects;
function motion(){
 stopScrollEffects?.();
 stopScrollEffects=setupScrollMotion({reduced:reduced.matches,mobile:media.matches});
 if(scrollHandler)removeEventListener('scroll',scrollHandler);
 const hero=document.querySelector('.hero-composition');
 const edge=document.querySelector('.paper-edge');
 const photo=edge?.closest('.artwork');
 const stage=edge?.parentElement;
 let cover=stage?.querySelector(':scope > .paper-cover');
 if(edge&&!cover){cover=document.createElement('div');cover.className='paper-cover';cover.setAttribute('aria-hidden','true');edge.before(cover);}
 let pending=false;
 scrollHandler=()=>{
  if(pending)return;pending=true;
  requestAnimationFrame(()=>{
   pending=false;if(!hero||!edge||!photo)return;
   const progress=Math.max(0,Math.min(1,(80-hero.getBoundingClientRect().top)/(photo.getBoundingClientRect().height*.85)));
   const distance=reduced.matches?0:progress*Number(stage.dataset.width)*.65;
   edge.style.translate=`${distance}px 0`;
   cover.style.width=`${distance}px`;
  });
 };
 addEventListener('scroll',scrollHandler,{passive:true});scrollHandler();
}
media.addEventListener('change',setup);reduced.addEventListener('change',motion);setup();
