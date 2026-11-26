"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { profile } from "@/data/projects";
import { useKabulTime } from "@/lib/useKabulTime";
import { EASE } from "@/lib/motion";
import { RevealLines } from "./RevealText";
import Magnetic from "./Magnetic";

/** Elliptical path as keyframe arrays, so badges orbit the portrait. */
const orbit = (rx: number, ry: number, phase: number, steps = 24) => {
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const a = phase + (i / steps) * Math.PI * 2;
    return { x: Math.cos(a) * rx, y: Math.sin(a) * ry };
  });
  return { x: pts.map((p) => p.x), y: pts.map((p) => p.y) };
};

const BADGES = ["Python", "Django", "DRF", "Next.js", "TypeScript"].map((label, i) => ({
  label,
  path: orbit(235, 285, (i / 5) * Math.PI * 2),
}));

function Portrait() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 16 });
  const sy = useSpring(my, { stiffness: 140, damping: 16 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-15, 15]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, -12]);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-[3/4] w-[min(78vw,380px)]"
      style={{ perspective: 1100 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* layered depth borders */}
        <div
          className="absolute inset-0 rounded-[28px] border border-[#B8F53C]/40"
          style={{ transform: "translateZ(-70px) translate(20px, 20px)" }}
        />
        <div
          className="absolute inset-0 rounded-[28px] border border-white/10"
          style={{ transform: "translateZ(-30px) translate(-12px, -12px)" }}
        />

        {/* portrait frame, revealed with a mask on load */}
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
          className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-b from-[#1b1b20] to-[#0d0d10]"
        >
          <div className="grid-bg absolute inset-0 opacity-60" />
          <div className="absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#B8F53C]/20 blur-[70px]" />
          <Image
            src="/images/hadi.webp"
            alt="Portrait of Hadi Haidari"
            fill
            priority
            sizes="(min-width: 1024px) 380px, 80vw"
            className="object-contain object-bottom"
            style={{
              WebkitMaskImage: "linear-gradient(to top, transparent 0, #000 9%)",
              maskImage: "linear-gradient(to top, transparent 0, #000 9%)",
            }}
          />
        </motion.div>

        {/* corner metadata */}
        <span className="f-mono absolute -left-3 top-6 origin-top-left whitespace-nowrap text-[10px] text-[#8A8A93]" style={{ transform: "translateZ(40px) rotate(-90deg)" }}>
          FIG. 01 / {profile.city.toUpperCase()}
        </span>

        {/* orbiting stack badges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transform: "translateZ(90px)" }}
        >
         <div className="grid h-full w-full origin-center scale-[0.7] place-items-center sm:scale-100">
          {BADGES.map((b, i) => (
            <motion.span
              key={b.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: b.path.x, y: b.path.y }}
              transition={{
                opacity: { delay: 1.2 + i * 0.15, duration: 0.6 },
                x: { duration: 30, ease: "linear", repeat: Infinity },
                y: { duration: 30, ease: "linear", repeat: Infinity },
              }}
              className="f-mono col-start-1 row-start-1 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[11px] text-[#F4F2EC] backdrop-blur-md"
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#B8F53C]" />
              {b.label}
            </motion.span>
          ))}
         </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const time = useKabulTime(profile.timezone);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_65%_40%,#000,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[#B8F53C]/10 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="f-mono inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] text-[#8A8A93]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B8F53C] opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[#B8F53C]" />
            </span>
            <span className="text-[#F4F2EC]">~/{profile.city.toLowerCase()}</span>
            <span>$ status --available</span>
            <span className="text-[#B8F53C]">{time}</span>
            <span>{profile.timezone}</span>
          </motion.div>

          <h1 className="f-display mt-8 text-[clamp(3rem,8.4vw,7.6rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
            <RevealLines lines={["Fast, practical", "web apps built", "in Herat."]} delay={0.35} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-[#A6A6AE]"
          >
            I&apos;m {profile.name}, a {profile.age}-year-old {profile.role.toLowerCase()} working with Python, Django
            REST Framework and Next.js.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="group flex items-center gap-3 rounded-full bg-[#B8F53C] py-4 pl-7 pr-5 text-[15px] font-semibold text-[#09090B]"
              >
                View projects
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#09090B] text-[#B8F53C] transition-transform duration-500 group-hover:translate-y-0.5">
                  <ArrowDown size={15} />
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="block rounded-full border border-white/15 px-7 py-4 text-[15px] text-[#F4F2EC] transition-colors hover:border-[#B8F53C] hover:text-[#B8F53C]"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <Portrait />
        </div>
      </div>
    </section>
  );
}
