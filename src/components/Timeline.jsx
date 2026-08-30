import Reveal from "./Reveal";
import { timeline } from "../data/content";

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-24 px-6">
      <Reveal className="text-center mb-16">
        <p className="font-accent text-xs uppercase tracking-widest text-gold-400 mb-2">
          Career
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-glow-amber">
          Experience Timeline
        </h2>
      </Reveal>

      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-crimson-500 via-amber-500 to-azure-500 md:-translate-x-1/2" />

        <ul className="space-y-12">
          {timeline.map((item, i) => {
            const alignRight = i % 2 === 0;
            return (
              <li key={item.title} className="relative">
                <Reveal
                  y={20}
                  className={`md:grid md:grid-cols-2 md:gap-10 items-center`}
                >
                  <div
                    className={`pl-12 md:pl-0 ${
                      alignRight ? "md:order-1 md:text-right" : "md:order-2"
                    }`}
                  >
                    <div className="inline-block bg-void-800/80 border border-white/10 rounded-md p-5 text-left hover:border-amber-400/50 transition-colors">
                      <p className="font-accent text-[10px] uppercase tracking-widest text-crimson-400 mb-1">
                        {item.year}
                      </p>
                      <h3 className="font-display text-xl text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-stone-350">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={alignRight ? "md:order-2 hidden md:block" : "md:order-1 hidden md:block"}
                  />
                </Reveal>

                <span className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-void-950 border-2 border-gold-400 shadow-[0_0_12px_rgba(255,224,102,0.8)]" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
