import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useScroller } from "../lib/ScrollerContext";
import { profile, stats } from "../data/content";

// ---------------------------------------------------------------------------
// The About section is a scroll "journey": on desktop it gets 3x the normal
// horizontal scroll budget (.about-wide, 300vw) with its viewport pinned via
// CSS `position: sticky` (works natively along whichever axis the nearest
// scrolling ancestor scrolls — here the site's own horizontal container, no
// extra JS pinning needed). While that budget is consumed, the content block
// is dragged through a path with FOUR different apparent directions, driven
// by one scrubbed GSAP timeline tied to scroll progress:
//   right -> left (horizontal) -> down (vertical) -> diagonal -> up (vertical)
// This is an illusion, not real multi-axis browser scrolling (no such thing
// exists) — the trick is: pin the viewport, transform the content inside it.
// On mobile (vertical fallback layout) this collapses to a normal reveal —
// the effect doesn't translate well to a single-axis, short-viewport screen.
// ---------------------------------------------------------------------------

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
  const wideRef = useRef(null);
  const trackRef = useRef(null);
  const fillRefs = useRef([]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      if (horizontal && scroller && wideRef.current) {
        const vw = window.innerWidth / 100;
        const vh = window.innerHeight / 100;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wideRef.current,
            scroller,
            horizontal: true,
            start: "left left",
            end: "right right",
            scrub: 0.6,
          },
        });

        tl.fromTo(
          track,
          { x: 45 * vw, y: 0, opacity: 0 },
          { x: 0, y: 0, opacity: 1, ease: "none", duration: 1 }
        )
          .to(track, { y: 34 * vh, ease: "none", duration: 1 })
          .to(track, { x: -26 * vw, y: 62 * vh, ease: "none", duration: 1 })
          .to(track, { x: 0, y: 8 * vh, ease: "none", duration: 1 }, "+=0.1")
          .to(
            fillRefs.current,
            {
              width: (i) => `${stats[i].value}%`,
              duration: 1,
              stagger: 0.15,
              ease: "none",
            },
            "<"
          );
      } else {
        gsap.fromTo(
          track,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: track, start: "top 85%", once: true },
          }
        );
        fillRefs.current.forEach((el, i) => {
          gsap.fromTo(
            el,
            { width: "0%" },
            {
              width: `${stats[i].value}%`,
              duration: 1,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }
          );
        });
      }
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horizontal, scroller]);

  const content = (
    <div ref={trackRef} className="w-full max-w-4xl px-6">
      <div className="text-center mb-14">
        <p className="font-accent text-xs uppercase tracking-widest text-azure-400 mb-2">
          Profile
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-glow-azure">
          About Me
        </h2>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8 bg-void-800/70 border border-white/10 rounded-lg p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.4)] relative overflow-hidden">
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 md:w-full md:h-40 rounded-md bg-gradient-to-br from-crimson-600 via-void-700 to-azure-600 border-2 border-amber-400/60 flex items-center justify-center font-display text-4xl text-white text-glow-amber">
            {profile.avatarInitials}
          </div>
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
      </div>
    </div>
  );

  if (!horizontal) {
    return (
      <section id="about" className="relative py-24 px-6 flex justify-center">
        {content}
      </section>
    );
  }

  return (
    <div ref={wideRef} className="about-wide">
      <div className="about-sticky">
        <section
          id="about"
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
        >
          {content}
        </section>
      </div>
    </div>
  );
}
