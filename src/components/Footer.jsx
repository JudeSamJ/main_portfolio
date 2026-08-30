import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="relative py-8 px-6 text-center border-t border-white/10">
      <p className="font-accent text-xs uppercase tracking-widest text-stone-500">
        © {new Date().getFullYear()} {profile.name} — Set Sail. Believe It. Plus Ultra.
      </p>
    </footer>
  );
}
