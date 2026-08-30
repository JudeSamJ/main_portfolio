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

// Code-split: three.js + fiber only load once someone enters a 3D mode.
const PortalExperience = lazy(() => import("./three/PortalExperience"));
const RunExperience = lazy(() => import("./three/RunExperience"));

const MODES = [
  { id: "classic", label: "Classic" },
  { id: "portal", label: "3D Portal" },
  { id: "run", label: "Forest Run" },
];

function ModeSwitcher({ mode, onChange }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex gap-1 p-1 rounded-full border border-white/15 bg-void-900/90 backdrop-blur shadow-lg">
      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`px-3 py-2 font-accent text-[10px] uppercase tracking-widest rounded-full transition-colors ${
            mode === m.id
              ? "bg-strawhat-500 text-white"
              : "text-white/70 hover:text-leaf-400"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

function LoadingFallback({ label }) {
  return (
    <div className="fixed inset-0 bg-void-950 flex items-center justify-center">
      <p className="font-accent text-xs uppercase tracking-widest text-leaf-400 animate-pulse">
        {label}
      </p>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState("classic");

  if (mode === "portal") {
    return (
      <>
        <Suspense fallback={<LoadingFallback label="Opening Portal..." />}>
          <PortalExperience />
        </Suspense>
        <ModeSwitcher mode={mode} onChange={setMode} />
      </>
    );
  }

  if (mode === "run") {
    return (
      <>
        <Suspense fallback={<LoadingFallback label="Entering the Forest..." />}>
          <RunExperience />
        </Suspense>
        <ModeSwitcher mode={mode} onChange={setMode} />
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
      <ModeSwitcher mode={mode} onChange={setMode} />
    </>
  );
}

export default App;
