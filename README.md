# Snap Media — marketing site

Brand site for **Snap Media**, the companion for physical media collectors (DVD, VHS, Blu-ray, cassette, vinyl). iOS and Android are both in beta. This is not a web clone of the app. It is the public home: Snap, Collection, Trades, privacy, and a beta request form.

Layout and design system match **BassheadOS-Site** (dark bay, electric yellow, device frames, FormSubmit beta form).

## Run locally

Any static server from the repo root works.

```bash
# Python
python3 -m http.server 4173

# Node
npx --yes serve -l 4173
```

Open [http://localhost:4173](http://localhost:4173).

There is no build step. HTML, CSS, and JS are the source.

## What’s in the box

| Path | Role |
| --- | --- |
| `index.html` | Home: hero, pillars, Snap / Collection / Trades, privacy teaser, FAQ, beta request |
| `privacy.html` | Ownership, photos, estimates, site form |
| `assets/css/site.css` | Design system (BassheadOS tokens) |
| `assets/js/site.js` | Sticky header, mobile nav, beta form → `admin@snapcollectibles.com`, Android URL gate |
| `assets/screens/` | Optimized WebP frames from the Android app |
| `Screenshots/` | Original captures |
| `assets/img/` | Mark, favicon, apple-touch, OG, hero disc |

## Beta requests

The form posts App name (`Snap Media`), phone OS (`iOS` or `Android`), and email to [FormSubmit](https://formsubmit.co) → **admin@snapcollectibles.com**.

The first live submission sends a confirmation message to that inbox. Click it once so later requests land automatically. If the service is blocked, the page falls back to a `mailto:` draft with the same three fields.

### Android tester URL

After an **Android** submit, the page shows:

`https://play.google.com/apps/internaltest/4700993420542853350`

The tester must copy / save that URL and acknowledge they have kept it. The URL stays inactive until the email is added to the Play tester list. Allow up to a few hours. Google Play does not automatically email testers.

An unacknowledged Android URL is stored in `sessionStorage` so a refresh does not lose it.

Change the inbox in `assets/js/site.js` (`BETA_INBOX`) if needed.

## Stores

iOS and Android are labeled **In beta**. Swap the badges for store URLs when the public listings are live.

## Domain / SEO

Canonicals, sitemap, and robots assume `https://snapmedia.app/`. Change those strings if the public host is different. Open Graph image is `assets/img/og.png` (1200×630).

## Tone / honesty

Live features are labeled **Live**. Value ranges are estimates, never appraisals. Independent — not a studio, not a store, not authentication.

## License

© Snap Media. All rights reserved.
