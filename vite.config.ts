import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: [
      'chunk-G2RY56RJ.js',
      'chunk-UGJ47M5D.js', 
      'chunk-WLHFFVMU.js',
      'chunk-FJV5X35V.js',
      'chunk-3MSUKK6E.js',
      'chunk-WNGUWE2R.js',
      'chunk-Z3MCJYUG.js',
      'chunk-IU72K2DC.js'
    ]
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suprimir advertencias específicas de chunks
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  }
});
