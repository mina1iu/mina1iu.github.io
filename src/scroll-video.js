/** Optional progressive enhancement, ready for the original About clips.
 * Call with a real local source and existing image poster; no autoplay or fabricated media.
 */
export function bindScrollVideo(video,section){
 const preference=matchMedia('(prefers-reduced-motion: reduce)');let queued=false;
 video.muted=true;video.playsInline=true;video.preload='metadata';
 const update=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;
  if(preference.matches||!Number.isFinite(video.duration)||video.readyState<2)return;
  const box=section.getBoundingClientRect();const range=Math.max(1,box.height-innerHeight);
  const progress=Math.max(0,Math.min(1,-box.top/range));
  try{video.pause();if(Math.abs(video.currentTime-progress*video.duration)>.04)video.currentTime=Math.min(video.duration-.01,progress*video.duration);}catch{video.style.visibility='hidden';}
 });};
 const mode=()=>{video.controls=preference.matches;if(preference.matches)video.pause();else update();};
 video.addEventListener('error',()=>{video.style.visibility='hidden';});
 video.addEventListener('loadeddata',update);preference.addEventListener('change',mode);addEventListener('scroll',update,{passive:true});mode();
 return ()=>{removeEventListener('scroll',update);preference.removeEventListener('change',mode);};
}
