import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/static/', // This should match Django's settings.STATIC_URL
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './assets/js'),
    },
  },
  build: {
    // Where Vite will save its output files.
    // This should be something in your settings.STATICFILES_DIRS
    outDir: path.resolve(__dirname, './static'),
    emptyOutDir: false, // Preserve the outDir to not clobber Django's other files.
    manifest: "manifest.json",
    rollupOptions: {
      // One entry per Django page (MPA), plus the shared global stylesheet.
      input: {
        'dashboard': path.resolve(__dirname, './assets/js/entries/dashboard.jsx'),
        'style': path.resolve(__dirname, './assets/styles/style.css'),
      },
      output: {
        // Output JS bundles to js/ directory with -bundle suffix
        entryFileNames: `js/[name]-bundle.js`,
        assetFileNames: `css/[name].css`
      },
    },
  },
});
