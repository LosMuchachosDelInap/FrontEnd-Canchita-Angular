import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: [
      // Chunks problemáticos reportados
      'chunk-XJJRXLYZ.js',
      'chunk-JNWUJMMI.js',
      'chunk-H3HP26OG.js',
      'chunk-HHICGOWP.js',
      'chunk-4J42VDG7.js',
      'chunk-2XL7UUHL.js',
      'chunk-FJV5X35V.js',
      'chunk-3MSUKK6E.js',
      'chunk-WNGUWE2R.js',
      'chunk-G2RY56RJ.js',
      'chunk-UGJ47M5D.js',
      'chunk-Z3MCJYUG.js',
      'chunk-WLHFFVMU.js',
      'chunk-IU72K2DC.js'
    ],
    // Forzar la re-optimización en cada inicio
    force: true
  },
  server: {
    fs: {
      allow: ['..', './']
    },
    // Configuración adicional para mejor estabilidad
    hmr: {
      port: 4201
    }
  },
  // Configuración de build más estable
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined
      },
      onwarn(warning, warn) {
        // Suprimir advertencias específicas de chunks
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  },
  // Limpieza de caché automática
  clearScreen: true
});
