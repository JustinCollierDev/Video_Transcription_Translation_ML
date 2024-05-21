import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Your frontend server port
    proxy: {
      '/convert': {
        target: 'http://localhost:3001', // Your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/convert/, ''),
      },
    },
  },
});
