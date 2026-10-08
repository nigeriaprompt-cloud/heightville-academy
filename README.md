# Heightville Academy website

Next.js 14 (App Router), JavaScript, plain CSS. No database, no TypeScript.

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm run start

## Deploy
Push to GitHub, import the repo in Vercel, and deploy the `main` branch. Optionally set
`NEXT_PUBLIC_SITE_URL` to the live domain (used for canonical URLs, sitemap and Open Graph).

## Edit content (all in `/data`)
- `site.js` – address, phone, WhatsApp, motto, school facts (from the school's brief history)
- `programs.js`, `news.js`, `subjects.js`, `questions.js` – lists
- `gallery.js` – photo list with width/height

## Photos
Photographs live in `public/images/photos` and are listed with their real pixel sizes in `data/photos.js`.
To add one: copy the file into that folder, add an entry to `data/photos.js` (src, width, height), then add a line
in `data/gallery.js` with its alt text and caption. The gallery keeps every photo's own proportions.
The logo is `public/images/logo.png` (transparent background); the favicon is `app/icon.png`.

## Content to supply
Creche and Nursery descriptions, admission requirements, subjects, names and roles for the portrait photos, and real quiz questions. `data/questions.js` currently holds SAMPLE questions only.
`data/questions.js` currently holds SAMPLE questions only.

## Learning Centre and Play & Learn (no database)
- `/learning` – exam practice by Department (Science, Arts, Commercial) and subject, with Practice or Timed exam mode.
  Edit `data/subjects.js` and `data/questions.js` (use the `q(...)` helper at the top of the file) to add subjects and questions.
- `/play` – alphabet flashcards, counting, memory match and a solar system explorer (`components/PlayLearn.js`).
- Founders are set in `data/founders.js`.
