import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './frontend/'),
    },
  },
  build: {
    // Where Vite will save its output files.
    // This should be something in your settings.STATICFILES_DIRS
    outDir: path.resolve(import.meta.dirname, './static'),
    emptyOutDir: true
  },
  server: {
    port: 5173,

  }
});
