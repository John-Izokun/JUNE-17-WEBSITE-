import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// One HTML file per page. Adding a market page: add its .html file here too.
const PAGES = ['index', 'manufacturing', 'nurse-staffing', 'recruiting', 'connectivity', 'construction']

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: Object.fromEntries(PAGES.map(p => [p, `${p}.html`])),
    },
  },
  server: {
    port: 3000,
  },
})
