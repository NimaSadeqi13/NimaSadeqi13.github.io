// Operates only on website copies. Archive originals are never opened for writing.
const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const sources=process.env.PORTFOLIO_SOURCE_MAP?JSON.parse(fs.readFileSync(process.env.PORTFOLIO_SOURCE_MAP,'utf8')):{};
(async()=>{const root=path.resolve(__dirname,'../public/media'),out=path.join(root,'responsive');fs.mkdirSync(out,{recursive:true});const manifest={};
for(const name of fs.readdirSync(root).filter(x=>/\.(webp|jpe?g|png)$/i.test(x))){const file=path.join(root,name),meta=await sharp(file).metadata();if(!meta.width||!meta.height)continue;const widths=[480,960,1600].filter(w=>w<meta.width);widths.push(Math.min(meta.width,1920));const variants=[];const candidate=sources[`/media/${name}`];const source=candidate&&/\.(png|jpe?g|webp|tiff?|bmp)$/i.test(candidate)?candidate:file;
for(const width of [...new Set(widths)]){const dest=`${path.parse(name).name}-${width}.webp`;await sharp(source).rotate().resize({width,withoutEnlargement:true}).webp({quality:80,effort:5}).toFile(path.join(out,dest));variants.push({src:`/media/responsive/${dest}`,width});}
manifest[`/media/${name}`]={variants,width:meta.width,height:meta.height};}
fs.writeFileSync(path.resolve(__dirname,'../lib/responsive-assets.json'),JSON.stringify(manifest));console.log(`Generated responsive copies for ${Object.keys(manifest).length} images`);
})().catch(e=>{console.error(e);process.exit(1)});
