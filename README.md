# Snap Media — Marketing Site

Landing page for **Snap Media**, the physical media collector iOS app (DVDs, VHS, Blu-ray, cassettes, vinyl).

Layout and structure mirror [pins.snapcollectibles.com](https://pins.snapcollectibles.com).

## Preview locally

```bash
# From this directory
python3 -m http.server 8080
# open http://localhost:8080
```

Or open `index.html` directly in a browser.

## Deploy

Static site — upload `index.html`, `icon.png`, and `app-icon.jpg` to your host (e.g. Vercel / Cloudflare / Netlify) for a subdomain such as `media.snapcollectibles.com`.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Full marketing page (Tailwind CDN + custom CSS) |
| `icon.png` | App icon / favicon |
| `app-icon.jpg` | Apple touch / OG image |

## Contact

Beta & support: [admin@snapcollectibles.com](mailto:admin@snapcollectibles.com?subject=Snap%20Media%20iOS%20Beta)
