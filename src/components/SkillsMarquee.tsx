"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { skills } from "@/data/projects";
import { EASE } from "@/lib/motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** One marquee row. Scroll speed pushes it faster; scrolling up reverses it. */
function Row({ baseVelocity, outline = false }: { baseVelocity: number; outline?: boolean }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex w-max">
        {Array.from({ length: 4 }).map((_, copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {skills.map((s) => (
              <span key={s.name} className="flex items-center">
                <span
                  className={`f-display px-6 text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[1.1] tracking-tight transition-colors duration-300 ${
                    outline
                      ? "text-transparent [-webkit-text-stroke:1px_rgba(244,242,236,0.5)] hover:text-[#F4F2EC]"
                      : "text-[#F4F2EC] hover:text-[#B8F53C]"
                  }`}
                >
                  {s.name}
                </span>
                <span className="text-3xl text-[#B8F53C]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function SkillsMarquee() {
  const [hovered, setHovered] = useState(0);

  return (
    <section id="stack" className="relative border-y border-white/10 py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="f-mono text-xs text-[#B8F53C]">02 / stack</p>
      </div>

      <div className="mt-8 space-y-2">
        <Row baseVelocity={-3} />
        <Row baseVelocity={3} outline />
      </div>

      <div className="mx-auto mt-20 grid max-w-[1400px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
        <ul className="lg:col-span-7" onPointerLeave={() => undefined}>
          {skills.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                onPointerEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                className="group flex w-full items-center justify-between gap-6 border-b border-white/10 py-4 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="f-mono text-[11px] text-[#8A8A93]">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`f-display text-2xl font-bold transition-all duration-500 sm:text-3xl ${
                      hovered === i ? "translate-x-3 text-[#B8F53C]" : "text-[#F4F2EC]/80"
                    }`}
                  >
                    {s.name}
                  </span>
                </span>
                <span
                  className={`h-px bg-[#B8F53C] transition-all duration-500 ${hovered === i ? "w-16" : "w-0"}`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="f-mono rounded-xl border border-white/10 bg-black/40 p-6 text-sm leading-7">
              <p className="text-[#B8F53C]">$ about --skill</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="mt-3"
                >
                  <p className="text-[#F4F2EC]">{skills[hovered].name}</p>
                  <p className="mt-2 text-[#8A8A93]">{skills[hovered].note}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
