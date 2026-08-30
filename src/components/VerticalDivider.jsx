// Diagonal section divider for the horizontal-scroll layout — a thin
// full-height band between slides. `flip` mirrors the direction, `color`
// sets the accent stroke.
export default function VerticalDivider({ flip = false, color = "#ef233c" }) {
  return (
    <div className="v-slash-divider shrink-0" aria-hidden="true">
      <svg
        viewBox="0 0 90 1200"
        preserveAspectRatio="none"
        className={flip ? "scale-y-[-1]" : ""}
      >
        <polygon points="90,0 0,1200 20,1200 90,0" fill={color} opacity="0.12" />
        <line
          x1="88"
          y1="0"
          x2="2"
          y2="1200"
          stroke={color}
          strokeWidth="3"
          opacity="0.9"
        />
        <line
          x1="76"
          y1="0"
          x2="-10"
          y2="1200"
          stroke={color}
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
