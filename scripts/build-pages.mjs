import fs from 'node:fs';
for(const route of ['work/roomie','work/alloydb','work/robotic-knitting','work/human-ai','about']){
 fs.mkdirSync('dist/'+route,{recursive:true});fs.copyFileSync('dist/index.html','dist/'+route+'/index.html');
}
// Keep previously shared /resume links working without rendering a resume page.
fs.mkdirSync('dist/resume',{recursive:true});
fs.writeFileSync('dist/resume/index.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/Mina-Liu-Resume.pdf"><title>Resume</title></head><body><a href="/Mina-Liu-Resume.pdf">Open resume PDF</a></body></html>');
console.log('Emitted six portfolio pages and a legacy resume PDF redirect.');

fs.writeFileSync('dist/.nojekyll','');
fs.copyFileSync('dist/index.html','dist/404.html');

// Only optimized raster sources are served; retain originals in the repository for editing.
for(const file of fs.readdirSync('dist/assets')){
 if(/\.(png|jpe?g)$/i.test(file))fs.rmSync('dist/assets/'+file);
}
