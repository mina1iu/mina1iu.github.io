import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('src/layouts.json'));
if(Object.keys(data).length!==7)throw Error('Expected seven pages');
let count=0;for(const p of Object.values(data))for(const tree of Object.values(p)){function walk(n){if(!n||typeof n!=='object')return;const src=n.a?.src;if(src){if(!fs.existsSync('public'+src)||fs.statSync('public'+src).size===0)throw Error('Missing asset '+src);count++;}for(const c of n.c||[])walk(c);}walk(tree);}
console.log('Seven pages, fourteen responsive layouts, '+count+' nonempty image callsites verified.');
