import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Reveal from "./Reveal";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <Reveal className="text-center mb-14">
        <p className="font-accent text-xs uppercase tracking-widest text-strawhat-400 mb-2">
          Bounty Board
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-glow-strawhat">
          Missions Completed
        </h2>
      </Reveal>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1}>
            <motion.article
              whileHover={{ y: -6 }}
              className="glow-card torn-edge relative bg-[#efe6d3] text-void-950 p-6 md:p-7 border-4 border-void-900/80 shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_15px_45px_rgba(239,35,60,0.35)]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 15%, rgba(0,0,0,0.05), transparent 40%), radial-gradient(circle at 85% 85%, rgba(0,0,0,0.06), transparent 40%)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-accent text-[10px] uppercase tracking-widest bg-void-900 text-leaf-400 px-2 py-1">
                  {p.codename}
                </span>
                <span className="font-display text-strawhat-600 text-sm">
                  ¤ {p.bounty}
                </span>
              </div>

              <h3 className="font-display text-2xl mb-2 tracking-wide">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4 text-void-800/90">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wide font-accent px-2 py-1 bg-void-900/90 text-soul-400 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-sm font-accent uppercase tracking-wide">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-void-900 hover:text-strawhat-600 transition-colors"
                >
                  <FiExternalLink /> Live
                </a>
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-void-900 hover:text-strawhat-600 transition-colors"
                >
                  <FiGithub /> Code
                </a>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
