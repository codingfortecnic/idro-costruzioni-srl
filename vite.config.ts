import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react(),{
 name:'preview-static-pages',
 configurePreviewServer(server){server.middlewares.use((request,_response,next)=>{const url=new URL(request.url||'/','http://localhost');if(['/chi-siamo','/servizi','/realizzazioni','/contatti','/privacy','/note-editoriali'].includes(url.pathname))request.url=url.pathname+'/index.html'+url.search;next()})},
}],build:{chunkSizeWarningLimit:600}});
