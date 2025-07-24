import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['tailwindcss/lib/index.js'], // 🔥 вимикаємо обробку JS як CSS
  },
  resolve: {
    alias: {
      tailwindcss: path.resolve('./node_modules/tailwindcss'), // ✅ правильна привʼязка
    },
  },
});

