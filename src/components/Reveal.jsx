import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useScroller } from "../lib/ScrollerContext";

const TAGS = { div: "div", section: "section", article: "article", h1: "h1", h2: "h2", h3: "h3", p: "p", ul: "ul" };

// Generic scroll-triggered reveal wrapper — fades/slides an element in once
// it scrolls into view, once, via GSAP + ScrollTrigger. Slides up (y) in the
// normal vertical layout, or in from the side (x) when the site is scrolling
// horizontally — matching whichever axis content is actually travelling on.
export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
  as = "div",
}) {
  const ref = useRef(null);
  const Tag = TAGS[as] ?? "div";
  const { scroller, horizontal } = useScroller();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        horizontal ? { opacity: 0, x: y } : { opacity: 0, y },
        {
          opacity: 1,
          x: horizontal ? 0 : undefined,
          y: horizontal ? undefined : 0,
          duration: 0.6,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller,
            horizontal,
            start: horizontal ? "left 85%" : "top 85%",
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroller, horizontal]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
