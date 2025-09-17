// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // 배열 대신 객체 형태도 OK
    alias: { '@': '/src' },
  },
  server: {
    proxy: {
      '/api':  { target: 'http://localhost:8080', changeOrigin: true, secure: false },
      '/files':{ target: 'http://localhost:8080', changeOrigin: true, secure: false },
    },
  },
})
