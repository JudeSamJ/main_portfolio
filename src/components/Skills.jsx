import { useRef } from "react";
import {
  SiPython,
  SiOpenjdk,
  SiJavascript,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiLangchain,
  SiMongodb,
  SiMysql,
  SiGit,
  SiJupyter,
  SiFirebase,
} from "react-icons/si";
import { FiCloud, FiCode, FiZap } from "react-icons/fi";
import { gsap } from "../lib/gsap";
import Reveal from "./Reveal";
import { skills } from "../data/content";

const iconMap = {
  Python: SiPython,
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  "C++": SiCplusplus,
  HTML: SiHtml5,
  CSS: SiCss,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  LangChain: SiLangchain,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  "Git / GitHub": SiGit,
  "Jupyter Notebook": SiJupyter,
  Firebase: SiFirebase,
  "Microsoft Azure": FiCloud,
  AWS: FiCloud,
  "Agentic AI": FiZap,
};

const levelColors = {
  Expert: "text-crimson-400 border-crimson-500/40",
  Advanced: "text-gold-400 border-gold-500/40",
  Intermediate: "text-azure-400 border-azure-500/40",
  Familiar: "text-stone-350 border-stone-500/40",
};

function SkillCard({ skill }) {
  const cardRef = useRef(null);
  const Icon = iconMap[skill.name] ?? FiCode;

  const onEnter = () => gsap.to(cardRef.current, { y: -6, duration: 0.3, ease: "power2.out" });
  const onLeave = () => gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: "power2.out" });

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative h-full flex flex-col items-center justify-center gap-3 rounded-lg border bg-void-800/60 px-4 py-6 text-center border-white/10 hover:border-azure-400/60 transition-colors overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(94,230,168,0.18),transparent_70%)]" />
      <Icon className="relative text-3xl text-white/80 group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_10px_rgba(94,230,168,0.8)] transition-all" />
      <p className="relative font-accent text-xs text-white/90 uppercase tracking-wide">
        {skill.name}
      </p>
      <span
        className={`relative text-[10px] uppercase px-2 py-0.5 rounded-full border ${levelColors[skill.level] ?? "text-stone-350 border-stone-500/40"}`}
      >
        {skill.level}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6">
      <Reveal className="text-center mb-14">
        <p className="font-accent text-xs uppercase tracking-widest text-amber-400 mb-2">
          Toolbox
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-glow-amber">
          Skills &amp; Tools
        </h2>
      </Reveal>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {skills.map((skill, i) => (
          <Reveal key={skill.name} delay={(i % 4) * 0.06}>
            <SkillCard skill={skill} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
