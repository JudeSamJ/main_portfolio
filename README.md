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

## Deploying

This is a static Vite build — `npm run build` outputs a `dist/` folder
you can deploy to Vercel, Netlify, GitHub Pages, or any static host.
