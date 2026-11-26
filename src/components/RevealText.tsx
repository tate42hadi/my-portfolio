"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const char: Variants = {
  hidden: { y: "118%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

/**
 * Masked, staggered character reveal. Each string in `lines` becomes one line.
 * Set `inView` to play when scrolled into view instead of on load.
 */
export function RevealLines({
  lines,
  className = "",
  delay = 0,
  stagger = 0.03,
  inView = false,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
}) {
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { animate: "show" };

  return (
    <span className={className} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <motion.span
          key={li}
          aria-hidden
          className="block overflow-hidden pb-[0.12em]"
          variants={container(stagger, delay + li * 0.12)}
          initial="hidden"
          {...trigger}
        >
          {line.split(" ").map((word, wi, arr) => (
            <Fragment key={wi}>
              <span className="inline-block whitespace-nowrap">
                {[...word].map((c, ci) => (
                  <motion.span key={ci} variants={char} className="inline-block will-change-transform">
                    {c}
                  </motion.span>
                ))}
              </span>
              {wi < arr.length - 1 ? " " : null}
            </Fragment>
          ))}
        </motion.span>
      ))}
    </span>
  );
}
