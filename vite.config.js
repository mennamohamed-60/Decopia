import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      
      '/api': {
        target: 'http://decopia-management-system.runasp.net',
        changeOrigin: true,
        secure: false,
      },

     
     '/rules-api': {
       target: 'http://pen-testing-rules-engine.runasp.net',
       changeOrigin: true,
       secure: false,
       rewrite: (path) => path.replace(/^\/rules-api/, '/api'),
},
    },
  },
})