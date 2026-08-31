import Reveal from "./Reveal";
import { timeline } from "../data/content";

// A horizontal row of cards on desktop (md+, same breakpoint the site
// switches to horizontal-only scrolling) so the whole timeline reads left
// to right in one screen — no vertical stack to run out of room. Collapses
// to a simple vertical list below md, where the page scrolls normally.
export default function Timeline() {
  return (
    <section
      id="timeline"
      className="relative py-16 px-6 flex items-center justify-center min-h-screen"
    >
      <div className="w-full max-w-6xl">
        <Reveal className="text-center mb-10">
          <p className="font-accent text-xs uppercase tracking-widest text-gold-400 mb-2">
            Career
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white text-glow-amber">
            Experience Timeline
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 md:left-0 md:right-0 md:top-4 md:bottom-auto md:w-auto md:h-0.5 bg-gradient-to-r from-crimson-500 via-amber-500 to-azure-500" />

          <ul className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
            {timeline.map((item, i) => (
              <li key={item.title} className="relative pl-12 md:pl-0">
                <span className="absolute left-4 top-1 -translate-x-1/2 md:left-0 md:top-4 w-4 h-4 rounded-full bg-void-950 border-2 border-gold-400 shadow-[0_0_12px_rgba(255,224,102,0.8)]" />

                <Reveal delay={i * 0.1} className="md:pt-10">
                  <div className="bg-void-800/80 border border-white/10 rounded-md p-5 text-left hover:border-amber-400/50 transition-colors h-full">
                    <p className="font-accent text-[10px] uppercase tracking-widest text-crimson-400 mb-1">
                      {item.year}
                    </p>
                    <h3 className="font-display text-lg text-white mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-350 md:line-clamp-5">{item.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
