# La Juste Nuance Website

## API Keys

### Google Places API
To enable dynamic loading of the newest Google Reviews, this project requires a Google Places API key **and** the Place ID of the business. If either one is missing, the site falls back to static reviews.

When deploying the site, add the following environment variables to your deployment platform (Vercel, Netlify, Github Pages, etc.):

```
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACES_ID=your_place_id_here
```

On GitHub Pages, add both as repository secrets (Settings → Secrets and variables → Actions). `.github/workflows/deploy.yml` passes them to the build.

For local development, simply create a `.env` file at the root of the project with the same content.
