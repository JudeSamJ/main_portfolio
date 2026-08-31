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

// Compact chip instead of a big icon card — keeps 27 skills fitting on one
// screen (this site scrolls horizontally only, so nothing here can rely on
// its own vertical scroll to be reachable).
function SkillChip({ skill }) {
  const chipRef = useRef(null);
  const Icon = iconMap[skill.name] ?? FiCode;

  const onEnter = () => gsap.to(chipRef.current, { y: -3, duration: 0.25, ease: "power2.out" });
  const onLeave = () => gsap.to(chipRef.current, { y: 0, duration: 0.25, ease: "power2.out" });

  return (
    <div
      ref={chipRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group flex items-center gap-2 rounded-full border border-white/10 bg-void-800/60 pl-3 pr-2.5 py-2 hover:border-azure-400/60 transition-colors"
    >
      <Icon className="text-sm text-white/80 group-hover:text-emerald-400 transition-colors shrink-0" />
      <span className="font-accent text-xs text-white/90 uppercase tracking-wide whitespace-nowrap">
        {skill.name}
      </span>
      <span
        className={`text-[9px] uppercase px-1.5 py-0.5 rounded-full border shrink-0 ${levelColors[skill.level] ?? "text-stone-350 border-stone-500/40"}`}
      >
        {skill.level}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-16 px-6 flex items-center justify-center min-h-screen"
    >
      <div className="w-full max-w-4xl">
        <Reveal className="text-center mb-10">
          <p className="font-accent text-xs uppercase tracking-widest text-amber-400 mb-2">
            Toolbox
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white text-glow-amber">
            Skills &amp; Tools
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-2.5">
          {skills.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
