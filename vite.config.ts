import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

const src = (dir = '') => fileURLToPath(new URL(`./src/${dir}`, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': src(),
      '@answers': src('answers'),
      '@components': src('components'),
      '@pages': src('pages'),
      '@problems': src('problems'),
      '@routes': src('routes'),
    },
  },
})
