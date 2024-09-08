// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://plannerapp-backend.onrender.com',
        changeOrigin: true,
      },
    },
    host: true, // Ensures access externally, not just on localhost
  },
});
