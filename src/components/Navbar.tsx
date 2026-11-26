"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "@/data/projects";
import Magnetic from "./Magnetic";

const LINKS = [
  { id: "projects", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("top");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const els = ["top", ...LINKS.map((l) => l.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[#B8F53C]"
      />
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-[60] flex justify-center px-3 sm:px-6"
      >
        <nav
          aria-label="Primary"
          className="flex w-full max-w-3xl items-center justify-between rounded-full border border-white/10 bg-[#09090B]/60 py-1.5 pl-5 pr-1.5 backdrop-blur-xl"
        >
          <a href="#top" className="f-mono flex items-center gap-2 text-xs text-[#F4F2EC]">
            <span className="h-2 w-2 rounded-full bg-[#B8F53C]" />
            {profile.handle}
          </a>
          <ul className="flex items-center">
            {LINKS.map((l) => (
              <li key={l.id}>
                <Magnetic strength={0.25}>
                  <a
                    href={`#${l.id}`}
                    className={`relative block px-3 py-2 text-[13px] transition-colors sm:px-4 ${
                      active === l.id ? "text-[#F4F2EC]" : "text-[#8A8A93] hover:text-[#F4F2EC]"
                    }`}
                  >
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
          <Magnetic strength={0.3} className="hidden sm:inline-block">
            <a
              href="#contact"
              className="block rounded-full bg-[#B8F53C] px-4 py-2 text-[13px] font-semibold text-[#09090B]"
            >
              Hire me
            </a>
          </Magnetic>
        </nav>
      </motion.header>
    </>
  );
}
