import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'D#': fileURLToPath(new URL('./src/components/desktop', import.meta.url)),
      'M#': fileURLToPath(new URL('./src/components/mobile', import.meta.url)),
      'U#': fileURLToPath(new URL('./src/components/ui', import.meta.url)),
      'S#': fileURLToPath(new URL('./src/stores', import.meta.url)),
    }
  },

  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
          @use "/src/assets/sass/variables" as *
        `
      }
    }
  },

  build: {
    target: "es2020"
  },

  optimizeDeps: {
    esbuildOptions: {
      target: "es2020"
    }
  }
})
