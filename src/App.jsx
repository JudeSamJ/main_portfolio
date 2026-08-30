import { useState, Suspense, lazy } from "react";
import AuraBackground from "./components/AuraBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SlashDivider from "./components/SlashDivider";

// Code-split: three.js + fiber only load once someone enters 3D mode.
const PortalExperience = lazy(() => import("./three/PortalExperience"));

function ModeToggle({ mode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-[60] px-4 py-2 font-accent text-[11px] uppercase tracking-widest rounded-full border border-white/15 bg-void-900/90 backdrop-blur text-white/90 hover:border-leaf-400/60 hover:text-leaf-400 transition-colors shadow-lg"
    >
      {mode === "classic" ? "Enter 3D Portal ⟶" : "⟵ Classic Mode"}
    </button>
  );
}

function App() {
  const [mode, setMode] = useState("classic");

  if (mode === "portal") {
    return (
      <>
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-void-950 flex items-center justify-center">
              <p className="font-accent text-xs uppercase tracking-widest text-leaf-400 animate-pulse">
                Opening Portal...
              </p>
            </div>
          }
        >
          <PortalExperience />
        </Suspense>
        <ModeToggle mode={mode} onToggle={() => setMode("classic")} />
      </>
    );
  }

  return (
    <>
      <AuraBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <SlashDivider color="#ef233c" />
        <About />
        <SlashDivider flip color="#ff8c1a" />
        <Skills />
        <SlashDivider color="#2f6fed" />
        <Projects />
        <SlashDivider flip color="#22c98a" />
        <Timeline />
        <SlashDivider color="#ffc433" />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <ModeToggle mode={mode} onToggle={() => setMode("portal")} />
    </>
  );
}

export default App;
