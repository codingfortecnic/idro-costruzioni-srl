import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile } from 'node:fs/promises';
export default defineConfig({plugins:[react(),{
 name:'preview-static-pages',
 configurePreviewServer(server){server.middlewares.use((request,response,next)=>{const url=new URL(request.url||'/','http://localhost');const routes=['/chi-siamo','/servizi','/realizzazioni','/contatti','/privacy','/note-editoriali'];if(routes.includes(url.pathname))request.url=url.pathname+'/index.html'+url.search;else if(url.pathname!=='/'&&!routes.some(route=>url.pathname===route+'/'||url.pathname===route+'/index.html')){readFile('dist'+url.pathname).then(()=>next()).catch(()=>{response.statusCode=404;response.setHeader('Content-Type','text/html; charset=utf-8');readFile('dist/404.html').then(html=>response.end(html)).catch(()=>response.end('Not found'))});return}next()})},
}],build:{chunkSizeWarningLimit:600}});
