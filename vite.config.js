import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase-vendor';
            if (id.includes('@stripe')) return 'stripe-vendor';
            if (id.includes('react-dom') || id.includes('react/')) return 'react-vendor';
            if (id.includes('sweetalert2')) return 'sweetalert-vendor';
            return 'vendor'; // Default chunk for other dependencies
          }
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
  }
})
