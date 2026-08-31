import { useLayoutEffect, useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import { gsap } from "../lib/gsap";
import { useScroller } from "../lib/ScrollerContext";
import Reveal from "./Reveal";
import { projects } from "../data/content";

// Fully static class strings per accent — Tailwind's scanner only picks up
// literal class names it can see in source, so these can't be built with
// template-literal interpolation (e.g. `border-${accent}-500`) even though
// they're looked up dynamically below.
const ACCENT = {
  azure: {
    bar: "from-azure-500 via-azure-400 to-azure-500",
    text: "text-azure-400",
    border: "hover:border-azure-400/50",
    glow: "hover:shadow-[0_20px_50px_rgba(47,111,237,0.25)]",
    tag: "text-azure-400",
    badgeRing: "ring-azure-400/40",
    glare: "rgba(110,168,255,0.16)",
  },
  emerald: {
    bar: "from-emerald-500 via-emerald-400 to-emerald-500",
    text: "text-emerald-400",
    border: "hover:border-emerald-400/50",
    glow: "hover:shadow-[0_20px_50px_rgba(34,201,138,0.25)]",
    tag: "text-emerald-400",
    badgeRing: "ring-emerald-400/40",
    glare: "rgba(94,230,168,0.16)",
  },
  amber: {
    bar: "from-amber-500 via-amber-400 to-amber-500",
    text: "text-amber-400",
    border: "hover:border-amber-400/50",
    glow: "hover:shadow-[0_20px_50px_rgba(255,140,26,0.25)]",
    tag: "text-amber-400",
    badgeRing: "ring-amber-400/40",
    glare: "rgba(255,184,92,0.16)",
  },
};

const TILT_RANGE = 10; // degrees

function LogoBadge({ project }) {
  const { brand } = project;
  const badgeBase =
    "w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ring-2 overflow-hidden";
  const badgeTone =
    brand.badge === "light" ? "bg-white" : "bg-void-950/80 border border-white/10";

  return (
    <div className={`${badgeBase} ${badgeTone} ${ACCENT[brand.accent].badgeRing}`}>
      {brand.logo ? (
        <img src={brand.logo} alt="" aria-hidden="true" className="w-8 h-8 object-contain" />
      ) : (
        <span className={`font-display text-lg ${ACCENT[brand.accent].text}`}>
          {brand.monogram}
        </span>
      )}
    </div>
  );
}

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const badgeRef = useRef(null);
  const rotateX = useRef(null);
  const rotateY = useRef(null);
  const { scroller, horizontal } = useScroller();
  const accent = ACCENT[project.brand.accent];

  useLayoutEffect(() => {
    const el = cardRef.current;
    rotateX.current = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power3.out" });
    rotateY.current = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power3.out" });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, rotate: -30, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(2.2)",
          scrollTrigger: {
            trigger: el,
            scroller,
            horizontal,
            start: horizontal ? "left 85%" : "top 85%",
            once: true,
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroller, horizontal]);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.current((px - 0.5) * TILT_RANGE);
    rotateX.current((0.5 - py) * TILT_RANGE);
    el.style.setProperty("--glare-x", `${px * 100}%`);
    el.style.setProperty("--glare-y", `${py * 100}%`);
  };

  const onMouseLeave = () => {
    rotateX.current(0);
    rotateY.current(0);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: "preserve-3d", "--glare-x": "50%", "--glare-y": "50%" }}
      className={`group relative bg-void-800/70 text-white p-6 md:p-7 rounded-lg border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-[box-shadow,border-color] duration-300 ${accent.border} ${accent.glow}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 rounded-t-lg bg-gradient-to-r ${accent.bar}`} />
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at var(--glare-x) var(--glare-y), ${accent.glare}, transparent 55%)`,
        }}
      />

      <div className="relative flex items-center gap-4 mb-4">
        <div ref={badgeRef}>
          <LogoBadge project={project} />
        </div>
        <div>
          <h3 className={`text-2xl leading-tight ${project.brand.font} ${accent.text}`}>
            {project.title}
          </h3>
          <p className="text-xs text-stone-350 mt-0.5">{project.tagline}</p>
        </div>
      </div>

      <p className="relative text-sm leading-relaxed mb-4 text-stone-350">
        {project.description}
      </p>

      <div className="relative flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[10px] uppercase tracking-wide font-accent px-2 py-1 bg-void-900/90 rounded-sm ${accent.tag}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        className={`relative flex items-center gap-1 w-fit text-sm font-accent uppercase tracking-wide text-white/80 hover:text-white transition-colors`}
      >
        <FiExternalLink /> Live
      </a>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <Reveal className="text-center mb-14">
        <p className="font-accent text-xs uppercase tracking-widest text-crimson-400 mb-2">
          Portfolio
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-glow-crimson">
          Projects
        </h2>
      </Reveal>

      <div
        className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        style={{ perspective: "1200px" }}
      >
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.1}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
