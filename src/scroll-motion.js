/** Small scroll enhancements. Content stays visible when observers or animation are unavailable. */
export function setupScrollMotion({reduced, mobile}) {
 if(reduced || !('IntersectionObserver' in window))return ()=>{};
 const animations=new Map();
 const entrances=[...document.querySelectorAll('.project-card, [data-design^="Personal /"], main > section > h2, main > div > h2, [data-design="MY WORK heading"] > *, #work > h2')];
 const reveal=new IntersectionObserver(entries=>{
  entries.filter(entry=>entry.isIntersecting).forEach(({target},index)=>{
   reveal.unobserve(target);
   // Native anchors and keyboard focus must never wait for an entrance.
   if(target.matches(':focus-within')||target.getBoundingClientRect().bottom<0)return;
   const pop=target.matches('.project-card, #work h2, [data-design="MY WORK heading"] > *');
   const animation=target.animate([
    {opacity:pop?0:.15,transform:`translateY(${pop?(mobile?36:58):(mobile?20:34)}px) scale(${pop ? 0.975 : 1})`},
    {opacity:1,transform:'translateY(0) scale(1)'}
   ],{duration:pop?900:(mobile?560:760),delay:Math.min(index*65,130),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
   animations.set(target,animation);
   animation.finished.then(()=>animations.delete(target)).catch(()=>{});
  });
 },{threshold:0,rootMargin:'0px 0px -24px 0px'});
 entrances.forEach(el=>reveal.observe(el));
 const photos=[...document.querySelectorAll('[data-design="Hero photo / boat view"] img, [data-design^="Photo /"] img')]
  .filter(el=>!el.closest('[data-design*="grain"]'));
 for(const photo of photos)photo.classList.add('scroll-photo');
 const footer=document.querySelector('.contact-footer');
 const letters=footer?[...footer.querySelectorAll('p')].filter(el=>/^[A-Z]$/.test(el.textContent.trim())).map((letter,index)=>{
  const texture=letter.nextElementSibling;
  const elements=[letter,...(texture?.dataset.design?.startsWith('Generated grain /')?[texture]:[])];
  elements.forEach(el=>el.classList.add('scroll-letter'));
  return {elements,index};
 }):[];
 // Reveal live textured headings and pair each footer glyph with its texture layer.
 const typeGroups=new Map([...document.querySelectorAll('.textured-heading h1, [data-textured-title]')].map(el=>[el,{elements:[el],index:0}]));
 for(const group of letters)typeGroups.set(group.elements[0],group);
 const typeReveal=new IntersectionObserver(entries=>{
  for(const {target,isIntersecting}of entries){
   if(!isIntersecting)continue;
   typeReveal.unobserve(target);
   const {elements,index}=typeGroups.get(target);
   const start=document.timeline.currentTime;
   for(const el of elements){
    const animation=el.animate([
     {opacity:0,transform:`translateY(${mobile?28:48}px)`},
     {opacity:1,transform:'translateY(0)'}
    ],{duration:1100,delay:Math.min(index*85,340),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
    animation.startTime=start;
    animations.set(el,animation);
    animation.finished.then(()=>animations.delete(el)).catch(()=>{});
   }
  }
 },{threshold:0,rootMargin:'0px 0px -18px 0px'});
 typeGroups.forEach((_,el)=>typeReveal.observe(el));
 let frame=0;
 const clamp=value=>Math.max(-1,Math.min(1,value));
 function update(){
  frame=0;
  for(const photo of photos){
   const slot=photo.closest('.artwork')||photo.parentElement;
   const rect=slot.getBoundingClientRect();
   if(rect.bottom<0||rect.top>innerHeight)continue;
   const progress=clamp((innerHeight/2-(rect.top+rect.height/2))/(innerHeight/2+rect.height/2));
   photo.style.setProperty('--photo-drift',`${progress*(mobile?5:10)}px`);
  }
  if(footer){
   const rect=footer.getBoundingClientRect();
   const progress=clamp((innerHeight-rect.top)/(innerHeight+rect.height));
   for(const {elements,index}of letters){
    const offset=progress*(index%2===0?-1:1)*(mobile?8:16);
    for(const el of elements)el.style.setProperty('--letter-drift',`${offset}px`);
   }
  }
 }
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
 const focus=event=>{for(const [el,animation]of animations)if(el.contains(event.target))animation.finish();};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
 document.addEventListener('focusin',focus);schedule();
 return ()=>{
  reveal.disconnect();typeReveal.disconnect();cancelAnimationFrame(frame);
  removeEventListener('scroll',schedule);removeEventListener('resize',schedule);document.removeEventListener('focusin',focus);
  for(const animation of animations.values())animation.cancel();
  photos.forEach(el=>{el.classList.remove('scroll-photo');el.style.removeProperty('--photo-drift');});
  letters.forEach(({elements})=>elements.forEach(el=>{el.classList.remove('scroll-letter');el.style.removeProperty('--letter-drift');}));
 };
}
