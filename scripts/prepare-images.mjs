// Generate local, reproducible WebP sources. Originals remain available for future edits.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const layouts=JSON.parse(fs.readFileSync('src/layouts.json','utf8'));
const sources=new Map();
function collect(node,name=''){
 if(!node||typeof node!=='object')return;
 name=node.a?.['data-name']||name;
 if(node.a?.src&&/\.(png|jpe?g)$/.test(node.a.src))sources.set(node.a.src,/photo|print \/|IMG_/i.test(name)&&!/grain|paper|mask/i.test(name)?'photo':'graphic');
 for(const value of Object.values(node.a?.style||{}))if(typeof value==='string')for(const match of value.matchAll(/\/assets\/[\w./-]+\.(?:png|jpe?g)/g))if(!sources.has(match[0]))sources.set(match[0],'graphic');
 for(const child of node.c||[])collect(child,name);
}
for(const page of Object.values(layouts))for(const tree of Object.values(page))collect(tree);
sources.set('/assets/halftone-original.png','graphic');
const output='public/assets/optimized';fs.mkdirSync(output,{recursive:true});
sharp.cache(false);
const manifest={},completed=new Map();
let originalBytes=0,optimizedNativeBytes=0;
for(const [source,type]of sources){
 const file='public'+source;
 const hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0,16);
 const cacheKey=hash+':'+type;
 if(completed.has(cacheKey)){manifest[source]=completed.get(cacheKey);continue;}
 const metadata=await sharp(file).metadata();
 const maxWidth=Math.min(metadata.width,type==='photo'?1920:2560);
 const widths=[320,480,640,960,1280,1600,1920,2560].filter(w=>w<maxWidth);widths.push(maxWidth);
 const variants=[];
 for(const width of widths){
  const filename=`${hash}-${type}-${width}.webp`;const dest=path.join(output,filename);
  if(!fs.existsSync(dest))await sharp(file).rotate().resize({width,withoutEnlargement:true}).webp(type==='photo'?{quality:84,alphaQuality:100,effort:6}:{lossless:true,effort:6}).toFile(dest);
  variants.push({src:'/assets/optimized/'+filename,width,bytes:fs.statSync(dest).size});
 }
 const largest=variants.at(-1);
 const asset={src:largest.src,srcset:variants.map(v=>`${v.src} ${v.width}w`).join(', '),width:metadata.width,height:metadata.height,type,variants};
 manifest[source]=asset;completed.set(cacheKey,asset);
 originalBytes+=fs.statSync(file).size;optimizedNativeBytes+=largest.bytes;
}
fs.writeFileSync('scripts/image-assets.audit.json',JSON.stringify(manifest,null,2)+'\n');
const runtime=Object.fromEntries(Object.entries(manifest).map(([source,{variants,...image}])=>[source,image]));
fs.writeFileSync('src/image-assets.json',JSON.stringify(runtime,null,2)+'\n');
fs.writeFileSync('src/image-assets.css',`:root{--halftone-texture:url('${manifest['/assets/halftone-original.png'].src}');}\n`);
console.log(JSON.stringify({sources:sources.size,uniqueImages:completed.size,originalBytes,optimizedNativeBytes},null,2));
