import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { FEATURES } from './src/lib/features.js'
import { SITE_URL } from './src/lib/head.js'

// sitemap.xml from the real routes + every feature page (robots.txt points here).
function sitemap() {
  return {
    name: 'koach-sitemap',
    generateBundle() {
      const paths = ['/', '/about', '/privacy', '/terms', ...Object.keys(FEATURES).map((s) => `/features/${s}`)]
      const today = new Date().toISOString().slice(0, 10)
      const urls = paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
