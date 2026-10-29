// Imports inspected Figma layout metadata; content is canonicalized from desktop.
import {parse} from '@babel/parser';
import fs from 'node:fs';
const pairs=[['home','21-2','21-239'],['roomie','22-33','22-177'],['alloydb','22-320','22-426'],['robotic-knitting','22-531','22-662'],['human-ai','22-792','22-915'],['about','23-348','23-479'],['resume','23-609','23-682']];
function read(id){
 const source=fs.readFileSync(`reference/${id}.txt`,'utf8').split('SUPER CRITICAL:')[0];
 const ast=parse(source,{sourceType:'module',plugins:['jsx']}); const vars={};
 function val(n){if(!n)return true;if(n.type==='StringLiteral'||n.type==='NumericLiteral')return n.value;if(n.type==='Identifier')return vars[n.name];if(n.type==='TemplateLiteral')return n.quasis.map((q,i)=>q.value.cooked+(n.expressions[i]?val(n.expressions[i]):'')).join('');if(n.type==='ObjectExpression')return Object.fromEntries(n.properties.map(p=>[p.key.name,val(p.value)]));if(n.type==='JSXExpressionContainer')return val(n.expression);return '';}
 for(const d of ast.program.body)if(d.type==='VariableDeclaration')for(const v of d.declarations)vars[v.id.name]=val(v.init).replace('https://www.figma.com/api/mcp/asset/','/assets/');
 function node(n){if(n.type==='JSXText'){const s=n.value.replace(/\s+/g,' ').trim();return s||null;}if(n.type==='JSXExpressionContainer')return val(n);if(n.type!=='JSXElement')return null;const attrs=Object.fromEntries(n.openingElement.attributes.map(a=>[a.name.name,val(a.value)]));return {tag:n.openingElement.name.name,a:attrs,c:n.children.map(node).filter(x=>x!==null&&x!=='')};}
 return node(ast.program.body.find(d=>d.type==='ExportDefaultDeclaration').declaration.body.body.find(d=>d.type==='ReturnStatement').argument);
}
const content={},layouts={};
function canonical(tree,page,isMobile){
 const counts={};
 function visit(n,path){if(typeof n==='string')return n;const name=n.a['data-name'];if(name && !/Generated grain|Rectangle|Frame$|texture|mask|Photo \/|Print \/|Dynamic Island|Screen|Torn paper|Paper |Left fade/i.test(name))path=name.replace(/Desktop|Mobile/g,'').trim();
 if(n.c.every(c=>typeof c==='string')&&n.c.length){const text=n.c.join(' ');let key;
 if(!isMobile){key=page+':copy:'+Object.keys(content).filter(k=>k.startsWith(page+':')).length;content[key]=text;}
 else {key=Object.keys(content).find(k=>k.startsWith(page+':')&&content[k]===text);if(!key){key=page+':mobile:'+n.a['data-node-id'];content[key]=text;}}
 n.c=[{text:key}];}
 else n.c=n.c.map(c=>typeof c==='string'?c:visit(c,path));return n;}
 return visit(tree,'root');
}
for(const [page,d,m]of pairs){layouts[page]={desktop:canonical(read(d),page,false),mobile:canonical(read(m),page,true)};}
fs.writeFileSync('src/content.json',JSON.stringify(content,null,2));fs.writeFileSync('src/layouts.json',JSON.stringify(layouts));
