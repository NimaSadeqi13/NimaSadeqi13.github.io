const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../out');
const types = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.txt':'text/plain','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.mp4':'video/mp4','.ttf':'font/ttf','.woff2':'font/woff2' };
http.createServer((req,res)=>{
  let file;
  try { file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname)); }
  catch { res.writeHead(400);res.end();return; }
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403);res.end();return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404,{'Content-Type':'text/html'});res.end(fs.readFileSync(path.join(root,'404.html')));return; }
  const size = fs.statSync(file).size;
  const headers = {'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};
  const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if (range) {
    const start = Number(range[1]), end = range[2] ? Math.min(Number(range[2]),size-1) : size-1;
    if(start>=size||end<start){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return;}
    res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});
    if(req.method==='HEAD')res.end();else fs.createReadStream(file,{start,end}).pipe(res);
  } else {
    res.writeHead(200,{...headers,'Content-Length':size});
    if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
  }
}).listen(3101,'127.0.0.1',()=>console.log('Static production preview: http://127.0.0.1:3101'));
