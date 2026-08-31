# Portfolio

A personal portfolio site — bold diagonal section dividers, glowing text
reveals, stat-card bio, skills grid, project cards, and an experience
timeline. Built with React, Vite, Tailwind CSS v4, and GSAP.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- GSAP + ScrollTrigger (scroll reveals, hover effects, timelines)
- react-icons (skill/tech icons, social icons)
- A small canvas-based particle background (no extra deps)

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

This includes your name, tagline, bio, skill-proficiency stats, skills,
projects, timeline entries, and social links.

## Project structure

```
src/
  components/
    AuraBackground.jsx  particle background effect
    SlashDivider.jsx    diagonal section divider
    Reveal.jsx          GSAP scroll-triggered reveal wrapper
    Navbar.jsx
    Hero.jsx            GSAP letter-by-letter name reveal
    About.jsx           profile card with animated stat bars
    Skills.jsx          skills grid
    Projects.jsx        project cards
    Timeline.jsx        experience vertical timeline
    Contact.jsx         contact form
    Footer.jsx
  data/
    content.js          all editable placeholder content
  lib/
    gsap.js             shared GSAP instance with ScrollTrigger registered
  index.css             theme tokens, fonts, effect utilities
  App.jsx
```

## Theming

Color tokens (crimson, amber, azure, emerald/gold, stone) and fonts are
defined in `src/index.css` under `@theme`. Adjust the palette or fonts
there to retheme the whole site.

## Animations

All animations run through GSAP, registered once in `src/lib/gsap.js`
(`gsap.registerPlugin(ScrollTrigger)`). The shared `Reveal` component
wraps scroll-triggered fade/slide-ins; hover effects (skill cards, project
cards) use `gsap.to()` on mouse enter/leave; `Hero.jsx` builds a full
entrance timeline (`gsap.timeline()`) for the letter-by-letter name
reveal, underline, tagline, and buttons.

## Contact form

The contact form (`src/components/Contact.jsx`) submits via
[Formspree](https://formspree.io) — no backend of your own needed. Without
it configured, the form shows an error telling visitors to email you
directly instead of silently pretending to send.

To wire it up:

1. Sign up at [formspree.io](https://formspree.io) (free tier is fine) and
   create a new form pointed at your email.
2. Copy its endpoint URL (`https://formspree.io/f/xxxxxxxx`).
3. Locally: copy `.env.example` to `.env.local` and paste the URL in as
   `VITE_FORMSPREE_ENDPOINT`.
4. In production (Vercel/Netlify/etc.): add `VITE_FORMSPREE_ENDPOINT` as an
   environment variable in your host's project settings, then redeploy.

Formspree's free tier also emails you a confirmation link the first time
someone submits — click it once to start receiving messages.

## Deploying

This is a static Vite build — `npm run build` outputs a `dist/` folder
you can deploy to Vercel, Netlify, GitHub Pages, or any static host. Set
`VITE_FORMSPREE_ENDPOINT` in your host's environment variables for the
contact form to work in production (see above).
