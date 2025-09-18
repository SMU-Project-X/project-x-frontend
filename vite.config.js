// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Spring Boot 서버 주소
        changeOrigin: true,
      },
      '/files':{ target: 'http://localhost:8080', changeOrigin: true, secure: false },

    },
  },
})
