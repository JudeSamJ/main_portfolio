import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useScroller } from "../lib/ScrollerContext";
import Reveal from "./Reveal";
import { profile, stats } from "../data/content";

function StatBar({ label, value, fillRef }) {
  return (
    <div>
      <div className="flex justify-between text-xs uppercase tracking-wide mb-1">
        <span className="text-white/80">{label}</span>
        <span className="text-amber-400">{value}/100</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-void-700 overflow-hidden border border-white/10">
        <div
          ref={fillRef}
          className="h-full rounded-full progress-bar-fill bg-gradient-to-r from-crimson-500 via-amber-500 to-emerald-500"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { scroller, horizontal } = useScroller();
  const fillRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      fillRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { width: "0%" },
          {
            width: `${stats[i].value}%`,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              scroller,
              horizontal,
              start: horizontal ? "left 90%" : "top 90%",
              once: true,
            },
          }
        );
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroller, horizontal]);

  return (
    <section
      id="about"
      className="relative py-24 px-6 flex justify-center items-center min-h-screen"
    >
      <div className="w-full max-w-4xl">
        <Reveal className="text-center mb-14">
          <p className="font-accent text-xs uppercase tracking-widest text-azure-400 mb-2">
            Profile
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white text-glow-azure">
            About Me
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid md:grid-cols-[220px_1fr] gap-8 bg-void-800/70 border border-white/10 rounded-lg p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.4)] relative overflow-hidden"
        >
          <div className="flex flex-col items-center gap-4">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-32 h-32 md:w-full md:h-40 rounded-md object-cover border-2 border-amber-400/60"
              />
            ) : (
              <div className="w-32 h-32 md:w-full md:h-40 rounded-md bg-gradient-to-br from-crimson-600 via-void-700 to-azure-600 border-2 border-amber-400/60 flex items-center justify-center font-display text-4xl text-white text-glow-amber">
                {profile.avatarInitials}
              </div>
            )}
            <div className="text-center">
              <p className="font-accent text-sm text-white">{profile.name}</p>
              <p className="text-xs text-stone-350">{profile.title}</p>
            </div>
          </div>

          <div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-6 text-stone-350">
              <div>
                <dt className="text-xs uppercase text-amber-400">Origin</dt>
                <dd className="text-white/90">{profile.origin}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-amber-400">Location</dt>
                <dd className="text-white/90">{profile.location}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase text-amber-400">Affiliation</dt>
                <dd className="text-white/90">{profile.affiliation}</dd>
              </div>
            </dl>

            <p className="text-sm md:text-base text-stone-350 leading-relaxed mb-6">
              {profile.bio}
            </p>

            <div className="space-y-3">
              {stats.map((s, i) => (
                <StatBar
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  fillRef={(el) => (fillRefs.current[i] = el)}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
