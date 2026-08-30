import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "Profile" },
  { href: "#skills", label: "Jutsu" },
  { href: "#projects", label: "Missions" },
  { href: "#timeline", label: "Training Arc" },
  { href: "#contact", label: "Transponder" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-void-950/90 backdrop-blur border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <a
          href="#hero"
          className="font-display text-2xl tracking-wide text-strawhat-400 text-glow-strawhat"
        >
          CODE<span className="text-soul-400 text-glow-soul">NAKAMA</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-accent text-xs uppercase tracking-widest text-stone-350">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-leaf-400 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white text-2xl leading-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 font-accent text-sm uppercase tracking-widest text-stone-350 bg-void-950/95 backdrop-blur">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block hover:text-leaf-400 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.header>
  );
}
