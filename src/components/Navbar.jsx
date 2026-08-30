import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useScroller } from "../lib/ScrollerContext";
import { profile } from "../data/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const { scroller, horizontal } = useScroller();

  useEffect(() => {
    const target = horizontal ? scroller : window;
    if (!target) return;
    const getPos = () => (horizontal ? scroller.scrollLeft : window.scrollY);
    const onScroll = () => setScrolled(getPos() > 24);
    onScroll();
    target.addEventListener("scroll", onScroll);
    return () => target.removeEventListener("scroll", onScroll);
  }, [scroller, horizontal]);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const goTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  };

  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-void-950/90 backdrop-blur border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <a
          href="#hero"
          onClick={(e) => goTo(e, "#hero")}
          className="font-display text-2xl tracking-wide text-crimson-400 text-glow-crimson"
        >
          {first}
          {last && <span className="text-azure-400 text-glow-azure"> {last}</span>}
        </a>

        <ul className="hidden md:flex items-center gap-8 font-accent text-xs uppercase tracking-widest text-stone-350">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => goTo(e, l.href)}
                className="hover:text-amber-400 transition-colors"
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
                onClick={(e) => goTo(e, l.href)}
                className="block hover:text-amber-400 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
