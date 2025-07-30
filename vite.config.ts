import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.epx.everypixel.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1/auth'),
        secure: false,
        cookieDomainRewrite: 'localhost',
      },
    },
  },
});
