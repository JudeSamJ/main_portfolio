# Code Nakama — Anime-Themed Portfolio

A personal portfolio site with a shonen-anime inspired aesthetic — bold
diagonal "slash" section dividers, glowing power-up text, stat-card bios,
ability grids, wanted-poster project cards, and a training-arc timeline.
Built with React, Vite, Tailwind CSS v4, and Framer Motion. No copyrighted
logos, character art, or trademarked names are used — only palette,
typography, and UI-motif inspiration.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Framer Motion (scroll reveals, hover effects)
- react-icons (skill/tech icons, social icons)
- A small canvas-based particle "energy aura" background (no extra deps)

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Editing your content

All placeholder copy lives in one file — edit it and every section
updates automatically:

```
src/data/content.js
```

This includes your name, tagline, bio, "power level" stats, skills,
projects, timeline entries, and social links.

## Project structure

```
src/
  components/
    AuraBackground.jsx  particle background effect
    SlashDivider.jsx    diagonal slash section divider
    Reveal.jsx           scroll-triggered reveal wrapper
    Navbar.jsx
    Hero.jsx             power-up name reveal
    About.jsx            character stat / profile card
    Skills.jsx            ability / jutsu grid
    Projects.jsx          wanted-poster mission cards
    Timeline.jsx           training-arc vertical timeline
    Contact.jsx            transponder snail call form
    Footer.jsx
  data/
    content.js            all editable placeholder content
  index.css               theme tokens, fonts, effect utilities
  App.jsx
```

## Theming

Color tokens (straw-hat red, leaf-village orange, soul-reaper blue,
hero-academia green/gold, titan-wall stone) and fonts are defined in
`src/index.css` under `@theme`. Adjust the palette or fonts there to
retheme the whole site.

## Deploying

This is a static Vite build — `npm run build` outputs a `dist/` folder
you can deploy to Vercel, Netlify, GitHub Pages, or any static host.
