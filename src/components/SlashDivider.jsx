// Diagonal section divider.
// `flip` mirrors the direction, `color` sets the accent stroke.
export default function SlashDivider({ flip = false, color = "#ef233c" }) {
  return (
    <div className="slash-divider" aria-hidden="true">
      <svg
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
        className={flip ? "scale-x-[-1]" : ""}
      >
        <polygon points="0,90 1200,0 1200,20 0,90" fill={color} opacity="0.12" />
        <line
          x1="0"
          y1="88"
          x2="1200"
          y2="2"
          stroke={color}
          strokeWidth="3"
          opacity="0.9"
        />
        <line
          x1="0"
          y1="76"
          x2="1200"
          y2="-10"
          stroke={color}
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
