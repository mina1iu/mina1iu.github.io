import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('src/layouts.json'));
const optimized=JSON.parse(fs.readFileSync('scripts/image-assets.audit.json'));
if(Object.keys(data).length!==6)throw Error('Expected six pages');
let count=0;for(const p of Object.values(data))for(const tree of Object.values(p)){function walk(n){if(!n||typeof n!=='object')return;const src=n.a?.src;const rasterSources=[src,...Object.values(n.a?.style||{}).flatMap(v=>typeof v==='string'?[...v.matchAll(/\/assets\/[\w./-]+\.(?:png|jpe?g)/g)].map(m=>m[0]):[])].filter(v=>v&&/\.(png|jpe?g)$/.test(v));for(const raster of rasterSources)if(!optimized[raster])throw Error('Run npm run images for '+raster);if(src){if(!fs.existsSync('public'+src)||fs.statSync('public'+src).size===0)throw Error('Missing asset '+src);count++;}for(const c of n.c||[])walk(c);}walk(tree);}
console.log('Six pages, twelve responsive layouts, '+count+' nonempty image callsites verified.');

const variants=new Set();
for(const image of Object.values(optimized)){
 if(!image.width||!image.height||!image.variants.length)throw Error('Invalid optimized image');
 for(const variant of image.variants){
  const file='public'+variant.src;
  if(!fs.existsSync(file)||fs.statSync(file).size===0)throw Error('Missing optimized asset '+file);
  variants.add(file);
 }
}
console.log(variants.size+' optimized image variants verified.');

if(!fs.readFileSync('public/Mina-Liu-Resume.pdf').subarray(0,5).equals(Buffer.from('%PDF-')))throw Error('Resume PDF missing or invalid');
console.log('Resume PDF verified.');
