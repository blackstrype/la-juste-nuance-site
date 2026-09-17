# La Juste Nuance Website

## API Keys

### Google Places API
To enable dynamic loading of the newest Google Reviews, this project requires a Google Places API key.

When deploying the site, add the following environment variable to your deployment platform (Vercel, Netlify, Github Pages, etc.):

`GOOGLE_PLACES_API_KEY=your_api_key_here`

For local development, simply create a `.env` file at the root of the project with the same content.
