import { motion } from "framer-motion";
import { profile } from "../data/content";

const letterVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.4 + i * 0.05, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Hero() {
  const words = profile.name.split(" ");
  let letterIndex = 0;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24"
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        animate={{ opacity: 1, letterSpacing: "0.5em" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="font-accent text-xs md:text-sm text-leaf-400 uppercase mb-6"
      >
        {profile.alias}
      </motion.p>

      <h1 className="font-display text-5xl sm:text-7xl md:text-8xl flex flex-wrap justify-center gap-x-4">
        {words.map((word, wi) => (
          <span key={wi} className="inline-flex whitespace-nowrap">
            {word.split("").map((char) => {
              const i = letterIndex++;
              return (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={letterVariants}
                  className="text-white text-glow-strawhat inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
        className="h-1 w-40 md:w-64 my-6 bg-gradient-to-r from-strawhat-500 via-leaf-500 to-soul-500 origin-left"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="max-w-xl text-stone-350 text-base md:text-lg"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <a
          href="#projects"
          className="px-6 py-3 font-accent text-xs uppercase tracking-widest bg-strawhat-500 hover:bg-strawhat-400 text-white rounded-sm shadow-[0_0_25px_rgba(239,35,60,0.5)] transition-all hover:shadow-[0_0_40px_rgba(239,35,60,0.8)] hover:scale-105"
        >
          View Missions
        </a>
        <a
          href="#contact"
          className="px-6 py-3 font-accent text-xs uppercase tracking-widest border border-soul-500 text-soul-400 hover:bg-soul-500/10 rounded-sm transition-all hover:scale-105"
        >
          Send Transponder Call
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 text-stone-500 text-xs uppercase tracking-widest"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}
