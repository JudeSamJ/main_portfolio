import { useLayoutEffect, useRef, useState } from "react";
import { FiMail, FiGithub, FiLinkedin, FiPhone } from "react-icons/fi";
import { gsap } from "../lib/gsap";
import Reveal from "./Reveal";
import { socials } from "../data/content";

// Formspree endpoint — set VITE_FORMSPREE_ENDPOINT in .env.local (dev) and
// in your host's environment variables (production). See README for setup.
const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const successRef = useRef(null);

  useLayoutEffect(() => {
    if (status === "sent" && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!FORM_ENDPOINT) {
      setStatus("error");
      setErrorMessage(
        `Contact form isn't set up yet — email me directly at ${socials.email}.`
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        const data = await res.json().catch(() => null);
        setErrorMessage(
          data?.errors?.map((err) => err.message).join(", ") ||
            "Something went wrong sending your message. Please try again."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "Network error — please try again, or email me directly."
      );
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <Reveal className="text-center mb-14">
        <p className="font-accent text-xs uppercase tracking-widest text-azure-400 mb-2">
          Get In Touch
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-glow-azure">
          Contact Me
        </h2>
        <p className="mt-4 text-stone-350 max-w-lg mx-auto text-sm">
          Have a project in mind, a question, or just want to say hi? Send a
          message below.
        </p>
      </Reveal>

      <Reveal
        delay={0.1}
        className="max-w-xl mx-auto bg-void-800/70 border border-white/10 rounded-lg p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-azure-500/10 blur-3xl" />

        {status === "sent" ? (
          <div ref={successRef} className="text-center py-10">
            <p className="font-display text-3xl text-emerald-400 text-glow-emerald mb-2">
              Message Sent!
            </p>
            <p className="text-stone-350">
              Thanks for reaching out. I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs uppercase tracking-widest text-amber-400 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full bg-void-900 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-azure-400 focus:ring-1 focus:ring-azure-400"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-amber-400 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full bg-void-900 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-azure-400 focus:ring-1 focus:ring-azure-400"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-amber-400 mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full bg-void-900 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-azure-400 focus:ring-1 focus:ring-azure-400 resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-crimson-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 font-accent text-xs uppercase tracking-widest bg-crimson-500 hover:bg-crimson-400 disabled:opacity-60 text-white rounded-md transition-all shadow-[0_0_25px_rgba(239,35,60,0.4)] hover:shadow-[0_0_35px_rgba(239,35,60,0.7)]"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

        <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-white/10 text-xl text-stone-350">
          <a
            href={`mailto:${socials.email}`}
            className="hover:text-crimson-400 transition-colors"
            aria-label="Email"
          >
            <FiMail />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-azure-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href={`tel:${socials.phone.replace(/\s+/g, "")}`}
            className="hover:text-emerald-400 transition-colors"
            aria-label="Phone"
          >
            <FiPhone />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
