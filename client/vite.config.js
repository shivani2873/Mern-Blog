import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios'],
          quill: ['react-quill'],
          firebase: ['firebase/app', 'firebase/auth'],
        },
      },
    },
    chunkSizeWarningLimit: 1500, 
  },
  plugins: [react()],
});
