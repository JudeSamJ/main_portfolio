import { useEffect, useState } from "react";
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
import VerticalDivider from "./components/VerticalDivider";
import { ScrollerContext } from "./lib/ScrollerContext";

// Below this width the horizontal layout gets cramped and touch-scroll
// gestures fight with it — fall back to the normal top-to-bottom stack.
const DESKTOP_QUERY = "(min-width: 768px)";

function App() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches
  );
  const [scrollerEl, setScrollerEl] = useState(null);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lock-scroll", isDesktop);
    return () => document.body.classList.remove("lock-scroll");
  }, [isDesktop]);

  // Redirect ordinary vertical mouse-wheel input into horizontal scroll —
  // most mice have no horizontal wheel, so without this the site would only
  // be scrollable via trackpad gestures or dragging the scrollbar. Skipped
  // while the current slide still has vertical room to move in the wheel's
  // direction (content taller than the viewport), so that content stays
  // reachable instead of being permanently stuck below the fold — once
  // that slide is scrolled to its top/bottom edge, wheel input falls
  // through to horizontal navigation again as normal.
  useEffect(() => {
    if (!isDesktop || !scrollerEl) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const slide = e.target.closest(".hslide");
      if (slide) {
        const canScrollDown = e.deltaY > 0 && slide.scrollTop + slide.clientHeight < slide.scrollHeight - 1;
        const canScrollUp = e.deltaY < 0 && slide.scrollTop > 0;
        if (canScrollDown || canScrollUp) return;
      }
      e.preventDefault();
      scrollerEl.scrollLeft += e.deltaY;
    };
    scrollerEl.addEventListener("wheel", onWheel, { passive: false });
    return () => scrollerEl.removeEventListener("wheel", onWheel);
  }, [isDesktop, scrollerEl]);

  const scrollerValue = {
    scroller: isDesktop ? scrollerEl : undefined,
    horizontal: isDesktop,
  };

  if (isDesktop) {
    return (
      <ScrollerContext.Provider value={scrollerValue}>
        <AuraBackground />
        <Navbar />
        <div
          ref={setScrollerEl}
          className="hscroll-container relative z-10 flex h-screen w-screen overflow-x-auto overflow-y-hidden"
        >
          <div className="hslide flex flex-col items-center justify-center">
            <Hero />
          </div>
          <VerticalDivider color="#ef233c" />
          <div className="hslide">
            <About />
          </div>
          <VerticalDivider flip color="#ff8c1a" />
          <div className="hslide">
            <Skills />
          </div>
          <VerticalDivider color="#2f6fed" />
          <div className="hslide">
            <Projects />
          </div>
          <VerticalDivider flip color="#22c98a" />
          <div className="hslide">
            <Timeline />
          </div>
          <VerticalDivider color="#ffc433" />
          <div className="hslide flex flex-col">
            <div className="flex-1">
              <Contact />
            </div>
            <Footer />
          </div>
        </div>
      </ScrollerContext.Provider>
    );
  }

  return (
    <ScrollerContext.Provider value={scrollerValue}>
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
    </ScrollerContext.Provider>
  );
}

export default App;
