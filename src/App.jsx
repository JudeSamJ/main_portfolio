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

function App() {
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
    </>
  );
}

export default App;
