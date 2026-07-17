import { defineConfig } from 'astro/config';

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
  output: 'static',
  build: {
    format: 'file', // Generates page.html instead of page/index.html
  },
  base: '/la-juste-nuance-site', // GitHub Pages subfolder compatibility
  vite: {
    plugins: [devHtmlRewrite()],
  }
});
