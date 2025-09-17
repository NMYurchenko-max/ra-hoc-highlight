import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ra-hoc-highlight/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-player': ['react-player'],
          'dashjs': ['dashjs'],
          'media-chrome': ['media-chrome'],
          'hls.js': ['hls.js'],
        },
      },
    },
  },
})
