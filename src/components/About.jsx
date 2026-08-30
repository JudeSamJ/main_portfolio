import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { profile, stats } from "../data/content";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <Reveal className="text-center mb-14">
        <p className="font-accent text-xs uppercase tracking-widest text-soul-400 mb-2">
          Character Sheet
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-glow-soul">
          About Me
        </h2>
      </Reveal>

      <Reveal
        delay={0.1}
        className="max-w-4xl mx-auto grid md:grid-cols-[220px_1fr] gap-8 bg-void-800/70 border border-white/10 rounded-lg p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.4)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 font-display text-6xl text-white/5 select-none pointer-events-none">
          ID
        </div>

        {/* Portrait / license photo placeholder */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 md:w-full md:h-40 rounded-md bg-gradient-to-br from-strawhat-600 via-void-700 to-soul-600 border-2 border-leaf-400/60 flex items-center justify-center font-display text-4xl text-white text-glow-leaf">
            {profile.avatarInitials}
          </div>
          <div className="text-center">
            <p className="font-accent text-sm text-white">{profile.name}</p>
            <p className="text-xs text-stone-350">{profile.alias}</p>
          </div>
        </div>

        <div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-6 text-stone-350">
            <div>
              <dt className="text-xs uppercase text-leaf-400">Origin</dt>
              <dd className="text-white/90">{profile.origin}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-leaf-400">Location</dt>
              <dd className="text-white/90">{profile.location}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs uppercase text-leaf-400">Affiliation</dt>
              <dd className="text-white/90">{profile.affiliation}</dd>
            </div>
          </dl>

          <p className="text-sm md:text-base text-stone-350 leading-relaxed mb-6">
            {profile.bio}
          </p>

          <div className="space-y-3">
            {stats.map((s, i) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs uppercase tracking-wide mb-1">
                  <span className="text-white/80">{s.label}</span>
                  <span className="text-leaf-400">{s.value}/100</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-void-700 overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full power-bar-fill bg-gradient-to-r from-strawhat-500 via-leaf-500 to-hero-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
