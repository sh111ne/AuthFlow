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
    port: 5500, // Указываем нужный порт
    strictPort: true, // Запрещаем автоматический выбор другого порта, если 5500 занят
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://dev.epx.everypixel.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/api/v1/auth'),
  //       secure: false,
  //       cookieDomainRewrite: 'localhost',
  //     },
  //   },
  // },
});
