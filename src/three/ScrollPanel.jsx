import { motion } from "framer-motion";

// Shared HTML overlay panel used by both 3D prototypes (portal + run-through)
// to lay section copy along the scroll track.
export default function ScrollPanel({ top, align = "center", children }) {
  return (
    <div
      className="absolute inset-x-0 flex px-6"
      style={{
        top: `${top}vh`,
        justifyContent:
          align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`max-w-md ${align === "center" ? "text-center" : "text-left"} ${
          align === "right" ? "md:mr-16" : align === "left" ? "md:ml-16" : ""
        }`}
      >
        {children}
      </motion.div>
    </div>
  );
}
