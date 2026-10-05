import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Vite plugin to rewrite .html requests to clean paths during local development
const devHtmlRewrite = () => ({
  name: 'dev-html-rewrite',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url) {
        const [path, query] = req.url.split('?');
        if (path.endsWith('.html')) {
          const cleanPath = path.slice(0, -5);
          req.url = cleanPath + (query ? '?' + query : '');
        }
      }
      next();
    });
  }
});

// https://astro.build/config
export default defineConfig({
  site: 'https://lajustenuance.fr',
  output: 'static',
  build: {
    format: 'directory', // Generates page/index.html so GitHub Pages cleanly serves /page without 404
  },
  base: '/', // Served at the root of the custom domain (see public/CNAME)
  integrations: [sitemap()],
  redirects: {
    '/palette': '/colorimetrie-conseil-en-image',
    '/allure': '/morphologie-conseil-en-image',
    '/essence': '/style-conseil-en-image',
    '/garde-robe': '/tri-de-dressing-conseil-en-image'
  },
  vite: {
    plugins: [devHtmlRewrite()],
  }
});
