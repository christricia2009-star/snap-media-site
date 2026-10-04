# Snap Media

Public site for **Snap Media**, an iPhone catalog for physical media you own. Published by True Family.

There is no build step. HTML and CSS are the source. The site has no account login.

## Run locally

`npx serve` matches the Vercel clean URLs (`/privacy`, `/terms`).

```bash
npx --yes serve -l 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/app` | `app.html` |
| `/plus` | `plus.html` |
| `/support` | `support.html` |
| `/privacy` | `privacy.html` |
| `/terms` | `terms.html` |

`vercel.json` sets `cleanUrls` and turns trailing slashes off, so App Store Connect can use `https://snapmedia.app/privacy` and `https://snapmedia.app/terms`.

## App Store button

Home links **Download on the App Store** to `https://apps.apple.com/` until the listing URL exists. Replace that `href` with the listing. Do not describe the link as upcoming on the page.

## Domain

Canonicals, the sitemap, and robots assume `https://snapmedia.app/`.
