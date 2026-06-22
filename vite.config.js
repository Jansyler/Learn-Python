import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Pythopia is a mobile-first PWA. We keep the config tiny on purpose so it is
// easy to read while learning. `host: true` lets you open the dev server from
// your phone on the same Wi-Fi (e.g. http://<your-laptop-ip>:5173).
export default defineConfig({
  // Relative base so the built app works whether it's served from the domain
  // root or a subpath (e.g. GitHub Pages at /Learn-Python/).
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: false
  }
})
