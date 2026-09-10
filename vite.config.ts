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
  base: '/static/', // This should match Django's settings.STATIC_URL
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './assets/ts'),
    },
  },
  build: {
    // Where Vite will save its output files.
    // This should be something in your settings.STATICFILES_DIRS
    outDir: path.resolve(import.meta.dirname, './static'),
    emptyOutDir: false, // Preserve the outDir to not clobber Django's other files.
    manifest: "manifest.json",
    rollupOptions: {
      // One entry per Django page (MPA), plus the shared global stylesheet.
      input: {
        'dashboard': path.resolve(import.meta.dirname, './assets/ts/entries/dashboard.tsx'),
        'home': path.resolve(import.meta.dirname, './assets/ts/entries/home.tsx'),
        'style': path.resolve(import.meta.dirname, './assets/styles/style.css'),
      },
      output: {
        // Output JS bundles to js/ directory with -bundle suffix
        entryFileNames: `js/[name]-bundle.js`,
        assetFileNames: `css/[name].css`
      },
    },
  },
});
