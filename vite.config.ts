import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  base: '/ra-hoc-highlight/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500, 
    minify: true, // Минимизация вывода
    rollupOptions: {
      output: {
        manualChunks: {
          'react-player': ['react-player'],
          vendor: ['react', 'react-dom'],
        },
        compact: true, // Минимизация вывода
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Алиас для src
    },
  },
})
