import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import Reveal from "./Reveal";
import { socials } from "../data/content";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder submit handler — wire up to your form backend / email API.
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <Reveal className="text-center mb-14">
        <p className="font-accent text-xs uppercase tracking-widest text-soul-400 mb-2">
          Incoming Call
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white text-glow-soul">
          Transponder Snail Request
        </h2>
        <p className="mt-4 text-stone-350 max-w-lg mx-auto text-sm">
          Got a mission for me, a question, or just want to talk shop? Send a
          request through the transponder below.
        </p>
      </Reveal>

      <Reveal
        delay={0.1}
        className="max-w-xl mx-auto bg-void-800/70 border border-white/10 rounded-lg p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-soul-500/10 blur-3xl" />

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <p className="font-display text-3xl text-hero-400 text-glow-hero mb-2">
              Puru Puru Puru!
            </p>
            <p className="text-stone-350">
              Your call has been received. I&apos;ll get back to you soon.
            </p>
          </motion.div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs uppercase tracking-widest text-leaf-400 mb-2">
                Guild Name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full bg-void-900 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-soul-400 focus:ring-1 focus:ring-soul-400"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-leaf-400 mb-2">
                Den Den Mushi Frequency (Email)
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-void-900 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-soul-400 focus:ring-1 focus:ring-soul-400"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-leaf-400 mb-2">
                Mission Brief
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full bg-void-900 border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-soul-400 focus:ring-1 focus:ring-soul-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 font-accent text-xs uppercase tracking-widest bg-strawhat-500 hover:bg-strawhat-400 disabled:opacity-60 text-white rounded-md transition-all shadow-[0_0_25px_rgba(239,35,60,0.4)] hover:shadow-[0_0_35px_rgba(239,35,60,0.7)]"
            >
              {status === "sending" ? "Calling..." : "Send Transponder Call"}
            </button>
          </form>
        )}

        <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-white/10 text-xl text-stone-350">
          <a
            href={`mailto:${socials.email}`}
            className="hover:text-strawhat-400 transition-colors"
            aria-label="Email"
          >
            <FiMail />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-leaf-400 transition-colors"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-soul-400 transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href={socials.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-hero-400 transition-colors"
            aria-label="Twitter"
          >
            <FiTwitter />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
