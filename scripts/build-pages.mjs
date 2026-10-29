import fs from 'node:fs';
for(const route of ['work/roomie','work/alloydb','work/robotic-knitting','work/human-ai','about','resume']){
 fs.mkdirSync('dist/'+route,{recursive:true});fs.copyFileSync('dist/index.html','dist/'+route+'/index.html');
}
console.log('Emitted seven directly navigable static routes.');

fs.writeFileSync('dist/.nojekyll','');
fs.copyFileSync('dist/index.html','dist/404.html');
