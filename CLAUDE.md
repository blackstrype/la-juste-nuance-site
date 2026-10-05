# La Juste Nuance — website

Marketing site for **La Juste Nuance**, Florence's image-consulting business (conseil en image) in Les Clayes-sous-Bois, France. Built with **Astro** (static output) and deployed to **GitHub Pages** at `https://blackstrype.github.io/la-juste-nuance-site/`.

## Commands

- `npm ci`: install dependencies (Node >= 22.12)
- `npm run dev`: local dev server at `http://localhost:4321/la-juste-nuance-site/`
- `npm run build`: production build to `dist/`
- `npm test`: Vitest unit tests (jsdom environment)
- `node scripts/benchmark.cjs`: Puppeteer image-load benchmark (needs the dev or preview server running)

Before opening a PR, always run `npm test` and `npm run build`, and make sure both pass.

## Language and content

- **All visitor-facing text is in French**, including page copy, button labels, alt text, meta descriptions and form messages. Write new content in natural, warm French that matches the existing tone (personal, encouraging, addressed to women). Don't translate existing copy into English.
- Use correct French typography: « guillemets » with spaces, and match the accent and punctuation conventions of the surrounding copy.
- Code, comments, commit messages and PR descriptions are in English.
- Don't invent business facts: prices, certifications, testimonials, opening hours, addresses or phone numbers. If a task needs one, leave a clear `TODO` and mention it in the PR.
- The legal pages (`mentions-legales`, `politique-confidentialite`) deliberately hide the exact street address. Keep it that way.

## Project layout

- `src/layouts/Layout.astro`: the single page shell (`<html lang="fr">`, meta tags, Calendly assets, `main.js`). Every page takes `title` and `description` props, and both matter for SEO.
- `src/pages/*.astro`: one file per page. File names are French SEO slugs (e.g. `colorimetrie-conseil-en-image.astro`). Old short URLs are redirected in `astro.config.mjs` (`redirects`). If you rename a page, add a redirect.
- `src/components/`: `Header`, `Footer`, `GoogleReviews`.
- `src/scripts/main.js`: all client-side behaviour (mobile nav, FAQ accordion, scroll spy, booking buttons, service cards, contact modal). Each feature is an exported `init*` function so it can be unit-tested.
- `src/styles/style.css`: one global stylesheet. Use the design tokens in `:root` (`--color-sage`, `--color-peach`, `--font-serif`, `--border-radius-md`, etc.) instead of hard-coded values.
- `public/images/`: photos and logo, served as-is. Keep the `Conseil_en_image_les_Clayes_sous_Bois_*` naming (it's for SEO) and compress images before adding them.

## Gotchas

- **Base path:** the site is served from `/la-juste-nuance-site/`. `Layout.astro` sets `<base href={BASE_URL}>`, so internal links and image paths are written **relative without a leading slash** (`href="about"`, `src="images/foo.jpg"`, `href="./#faq"`). A leading `/` breaks on GitHub Pages.
- `build.format: 'directory'` produces `page/index.html` so clean URLs work on Pages. Don't change it.
- **Contact form** posts to formsubmit.co. The destination address is base64-encoded on purpose (light obfuscation against scrapers), so don't decode it into plain text.
- **Calendly** booking link: `https://calendly.com/florence-corolleur/30min` (in `main.js`). `openCalendly` uses the popup widget when `window.Calendly` exists, and otherwise opens a new tab.
- **Google Reviews** are fetched at **build time** in `GoogleReviews.astro` and need both `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACES_ID`. Without them, the component falls back to static reviews. That's expected locally and in cloud sessions, so don't treat it as a bug. Never commit keys or `.env`.
- Prefer existing CSS classes over inline `style="..."` for new markup. Some older markup has inline styles, and it's fine to move them into `style.css` when touching that code.

## Tests

- Tests live next to the code (`src/scripts/*.test.js` and `src/scripts/__tests__/`). Vitest runs with `globals: true` and `jsdom`.
- Test by importing the exported functions from `main.js` and building the minimal DOM in `document.body.innerHTML`. Don't use `eval` or read source files as strings; that pattern was deliberately removed.
- When you add behaviour to `main.js`, export it as an `init*` function and add a test.

## Workflow

- `main` deploys automatically to GitHub Pages (`.github/workflows/deploy.yml`). Never push directly to `main`; work on a branch and open a PR.
- Keep PRs small and focused, one change per PR. In the description, say which pages changed and, for visual changes, what to check on mobile and desktop.
- Check layouts at mobile width: the header has a separate burger menu and mobile-only links (`.mobile-only`, `.mobile-only-socials`).
