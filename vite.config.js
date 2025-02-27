import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Powered by Shangrin
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
