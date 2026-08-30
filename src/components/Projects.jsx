import { useRef } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { gsap } from "../lib/gsap";
import Reveal from "./Reveal";
import { projects } from "../data/content";

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const onEnter = () => gsap.to(cardRef.current, { y: -8, duration: 0.35, ease: "power2.out" });
  const onLeave = () => gsap.to(cardRef.current, { y: 0, duration: 0.35, ease: "power2.out" });

  return (
    <article
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="glow-card relative bg-void-800/70 text-white p-6 md:p-7 rounded-lg border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-crimson-500/40 hover:shadow-[0_15px_45px_rgba(239,35,60,0.25)] transition-colors"
    >
      <h3 className="font-display text-2xl mb-2 tracking-wide text-white">
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed mb-4 text-stone-350">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wide font-accent px-2 py-1 bg-void-900/90 text-azure-400 rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm font-accent uppercase tracking-wide">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-white/80 hover:text-crimson-400 transition-colors"
        >
          <FiExternalLink /> Live
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-white/80 hover:text-crimson-400 transition-colors"
        >
          <FiGithub /> Code
        </a>
      </div>
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

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
