const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../out');
// Normalize Windows-exported segment paths to the URLs requested by the router.
function collect(directory, prefix, target) {
  for (const item of fs.readdirSync(directory, {withFileTypes:true})) {
    const input = path.join(directory,item.name);
    const name = `${prefix}.${item.name}`;
    if(item.isDirectory())collect(input,name,target);
    else if(item.name.endsWith('.txt'))fs.copyFileSync(input,path.join(target,name));
  }
}
function walk(directory) {
  for (const item of fs.readdirSync(directory,{withFileTypes:true})) {
    if(!item.isDirectory())continue;
    const input=path.join(directory,item.name);
    if(item.name.startsWith('__next.'))collect(input,item.name,directory);
    else walk(input);
  }
}
walk(root);
fs.writeFileSync(path.join(root,'.nojekyll'),'');
