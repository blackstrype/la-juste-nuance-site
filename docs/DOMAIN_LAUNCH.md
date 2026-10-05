# Launch checklist: moving to `lajustenuance.fr`

Everything that has to happen **outside the code** when `lajustenuance.fr` goes live. The code-side switch (`site`, `base`, `CNAME`, `robots.txt`) is tracked in the companion issue "Switch site config to the lajustenuance.fr custom domain" and is merged in step 4.

Official reference (checked against the GitHub docs source, October 2026; re-check before launch because values can change):
<https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>

**Decision already made:** the apex `lajustenuance.fr` is the canonical address. `www.lajustenuance.fr` redirects to it (GitHub Pages does this automatically when the apex is the custom domain and a `www` DNS record exists).

## 1. Before buying the domain

- [ ] **TODO (Scott): choose the registrar.** Pick one with easy DNS editing (A, AAAA, CNAME, TXT records) and free WHOIS privacy. Not decided yet.
- [ ] Buy `lajustenuance.fr` and enable WHOIS privacy / data redaction.
- [ ] Turn on auto-renewal and put the renewal date in a calendar. An expired domain takes the whole site down.
- [ ] **TODO (Scott and Florence): decide whether a professional mailbox on the domain is wanted** (e.g. `contact@lajustenuance.fr`). If yes, the DNS step needs extra MX, SPF, DKIM and DMARC records from the mail provider. Skip otherwise.
- [ ] Do not add GitHub Pages DNS records at the registrar's "parking page" defaults. Remove any default A/AAAA/CNAME records first.

## 2. DNS records

Set these at the registrar (`TODO`: exact screen depends on the registrar).

- [ ] Apex `lajustenuance.fr`, four `A` records:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- [ ] Apex `lajustenuance.fr`, four `AAAA` records:
  - `2606:50c0:8000::153`
  - `2606:50c0:8001::153`
  - `2606:50c0:8002::153`
  - `2606:50c0:8003::153`
- [ ] `www`, one `CNAME` record pointing to `blackstrype.github.io` (the account's default Pages domain, not the apex and not the full `/la-juste-nuance-site` path).
- [ ] Optional but recommended: verify the domain in GitHub (Account settings → Pages → Add a domain) with the TXT record GitHub gives you, so nobody else can claim it.
- [ ] Wait for propagation (up to 24 hours). Check with `dig lajustenuance.fr +short` and `dig www.lajustenuance.fr +short`.

## 3. GitHub Pages settings

Repository → Settings → Pages.

- [ ] Source is **GitHub Actions** (already the case, via `.github/workflows/deploy.yml`).
- [ ] Custom domain: enter `lajustenuance.fr` and save. GitHub runs a DNS check.
- [ ] Wait for the certificate to be issued (can take up to about an hour after the DNS check passes).
- [ ] Tick **Enforce HTTPS** once it becomes available. If the box stays greyed out, see "Rollback / troubleshooting" below.

## 4. Merge the code PR

- [ ] Merge the PR from the companion issue ("Switch site config to the lajustenuance.fr custom domain"). `main` deploys automatically.
- [ ] Confirm the deploy workflow is green in the Actions tab.
- [ ] Confirm Settings → Pages still shows `lajustenuance.fr` (a deploy without a `CNAME` file can clear it).

## 5. Third-party services that depend on the site URL

- [ ] **Contact form (formsubmit.co).** The form posts to `https://formsubmit.co/ajax/<address>` (`src/scripts/main.js`). formsubmit.co ties a form to the origin it was first used from, so it may ask for a new **activation email** from the new domain.
  1. Submit a test message from `https://lajustenuance.fr/`.
  2. Open the activation email in the destination inbox and confirm it.
  3. Submit again and check the message arrives.
  - No address change is planned: the destination stays as it is today. Only revisit this if a domain mailbox is adopted later. Never decode or paste the address into code, issues or docs.
- [ ] **Google Places API key** (`GOOGLE_PLACES_API_KEY`, used at **build time** in `GoogleReviews.astro`). In Google Cloud Console → APIs & Services → Credentials, open the key and check its restriction type:
  - *HTTP referrers (websites)* would **break the build**, because the call comes from a GitHub Actions server, not a browser. Don't use it for this key.
  - *None* or *IP addresses* + API restriction to the Places API is what works. Don't change a working setup just for the domain; only check it.
  - After launch, re-run the deploy workflow and confirm real reviews still load (not the static fallback).
- [ ] **Google Business Profile.** Update the Website field to `https://lajustenuance.fr/` (business.google.com → Edit profile → Contact → Website).
- [ ] **Calendly.** On the live domain, click every "Réserver" button: the popup should open (booking link `https://calendly.com/florence-corolleur/30min`). If Calendly shows an embed-domain restriction, allow the new domain in the Calendly account settings.
- [ ] **Google Search Console.**
  1. Add a **Domain property** for `lajustenuance.fr` and verify with the DNS TXT record.
  2. Submit `https://lajustenuance.fr/sitemap-index.xml`.
  3. If the old `blackstrype.github.io/la-juste-nuance-site/` property exists, use its **Change of address** tool if it is available for that property type. GitHub Pages already redirects the old URL to the custom domain.
- [ ] **Social profiles.** Update the website link and bio on Instagram and Facebook (the same profiles linked from `Header.astro` and `Footer.astro`).
- [ ] **Legal page.** Update `mentions-legales` with the hosting provider and the registrar details once the registrar is chosen. Keep the street address hidden, as everywhere on the site. This is a code change, so do it in its own PR.

## 6. Post-launch verification

- [ ] `https://lajustenuance.fr/` loads with the HTTPS padlock and no mixed-content warnings.
- [ ] `http://lajustenuance.fr/` redirects to HTTPS.
- [ ] `https://www.lajustenuance.fr/` redirects to the apex `https://lajustenuance.fr/`.
- [ ] The old URL `https://blackstrype.github.io/la-juste-nuance-site/` redirects to the new domain.
- [ ] Old short URLs still redirect (`/palette`, `/allure`, `/essence`, `/garde-robe`).
- [ ] Images, CSS and internal links work on several pages (no 404s).
- [ ] `https://lajustenuance.fr/sitemap-index.xml` loads and lists `lajustenuance.fr` URLs, not github.io ones.
- [ ] `https://lajustenuance.fr/robots.txt` points to the new sitemap.
- [ ] Contact form test submission arrives (see step 5).
- [ ] Calendly popup opens.
- [ ] Rich Results Test (<https://search.google.com/test/rich-results>) on the home page, and an Open Graph preview check (e.g. paste the URL into a Facebook or LinkedIn post composer) show the right title, description and image.
- [ ] Mobile pass: burger menu, booking buttons, FAQ, contact modal.
- [ ] Search Console shows the sitemap as "Success" after a day or two.

## Rollback / troubleshooting

- [ ] Revert the code PR from step 4 on a branch and open a PR (never push to `main` directly). The site returns to the `blackstrype.github.io` setup.
- [ ] Settings → Pages → remove the custom domain.
- [ ] DNS can stay in place while debugging; it does no harm without the custom domain set.
- If **Enforce HTTPS** is greyed out: confirm the DNS records are exactly as above, remove and re-add the custom domain in Settings → Pages to restart certificate issuance, and wait. Pointing `www` at the apex instead of `blackstrype.github.io` is a known cause of HTTPS problems.
