import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Заставляет Vite всегда запускаться на этом IP
    port: 5173, // Можно зафиксировать и порт
  },
})
