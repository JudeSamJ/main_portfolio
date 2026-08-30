import { createContext, useContext } from "react";

// Lets any component (Reveal, stat bars, etc.) find the actual scrolling
// element and axis without prop-drilling — needed because on desktop the
// site scrolls horizontally inside a custom container (not the window), so
// every GSAP ScrollTrigger needs to know which element + axis to watch.
export const ScrollerContext = createContext({ scroller: undefined, horizontal: false });

export function useScroller() {
  return useContext(ScrollerContext);
}
