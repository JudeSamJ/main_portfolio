import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useScroller } from "../lib/ScrollerContext";
import { profile } from "../data/content";

export default function Hero() {
  const words = profile.name.split(" ");
  const rootRef = useRef(null);
  const lettersRef = useRef(null);
  const { horizontal } = useScroller();

  const goTo = (e, href) => {
    e.preventDefault();
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = lettersRef.current.querySelectorAll(".hero-letter");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, letterSpacing: "0.1em" },
        { opacity: 1, letterSpacing: "0.5em", duration: 1 }
      )
        .fromTo(
          letters,
          { opacity: 0, y: 30, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.05,
          },
          "-=0.6"
        )
        .fromTo(
          ".hero-underline",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6 },
          "-=0.1"
        )
        .fromTo(
          ".hero-tagline",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".hero-actions",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );

      gsap.to(".hero-scroll-hint", {
        [horizontal ? "x" : "y"]: 10,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horizontal]);

  let letterIndex = 0;

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24"
    >
      <p className="hero-eyebrow font-accent text-xs md:text-sm text-amber-400 uppercase mb-6 opacity-0">
        {profile.title}
      </p>

      <h1
        ref={lettersRef}
        className="font-display text-5xl sm:text-7xl md:text-8xl flex flex-wrap justify-center gap-x-4"
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-flex whitespace-nowrap">
            {word.split("").map((char) => {
              const i = letterIndex++;
              return (
                <span
                  key={i}
                  className="hero-letter text-white text-glow-crimson inline-block opacity-0"
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </h1>

      <div className="hero-underline h-1 w-40 md:w-64 my-6 bg-gradient-to-r from-crimson-500 via-amber-500 to-azure-500 origin-left scale-x-0" />

      <p className="hero-tagline max-w-xl text-stone-350 text-base md:text-lg opacity-0">
        {profile.tagline}
      </p>

      <div className="hero-actions mt-10 flex flex-wrap justify-center gap-4 opacity-0">
        <a
          href="#projects"
          onClick={(e) => goTo(e, "#projects")}
          className="px-6 py-3 font-accent text-xs uppercase tracking-widest bg-crimson-500 hover:bg-crimson-400 text-white rounded-sm shadow-[0_0_25px_rgba(239,35,60,0.5)] transition-all hover:shadow-[0_0_40px_rgba(239,35,60,0.8)] hover:scale-105"
        >
          View Projects
        </a>
        <a
          href="#contact"
          onClick={(e) => goTo(e, "#contact")}
          className="px-6 py-3 font-accent text-xs uppercase tracking-widest border border-azure-500 text-azure-400 hover:bg-azure-500/10 rounded-sm transition-all hover:scale-105"
        >
          Get In Touch
        </a>
      </div>

      <div className="hero-scroll-hint absolute bottom-8 text-stone-500 text-xs uppercase tracking-widest">
        Scroll {horizontal ? "→" : "↓"}
      </div>
    </section>
  );
}
