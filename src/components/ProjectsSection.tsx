"use client";

import { useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { EASE } from "@/lib/motion";
import { RevealLines } from "./RevealText";
import ProjectDrawer from "./ProjectDrawer";

/** Asymmetric bento rhythm; it repeats automatically as you add projects. */
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-6", "md:col-span-6"];

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${px}px ${py}px, rgba(184,245,60,0.14), transparent 70%)`;

  const onMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.button
      ref={ref}
      layout
      type="button"
      onClick={() => onOpen(project)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.8, ease: EASE, layout: { duration: 0.6, ease: EASE } }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#101013] p-7 text-left transition-colors duration-500 hover:border-[#B8F53C]/50 focus-visible:outline-2 focus-visible:outline-[#B8F53C] ${SPANS[index % SPANS.length]}`}
    >
      <motion.span
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="f-display pointer-events-none absolute -bottom-10 -right-2 text-[11rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.10)] transition-transform duration-700 group-hover:-translate-y-3"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-start justify-between gap-4">
        <div className="f-mono flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full border border-white/15 px-3 py-1">{project.category}</span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-[#8A8A93]">{project.year}</span>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#B8F53C] group-hover:bg-[#B8F53C] group-hover:text-[#09090B]">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="relative">
        <span
          className={`f-mono mb-3 inline-block rounded-full px-2.5 py-1 text-[10px] ${
            project.status === "Template" ? "border border-dashed border-white/25 text-[#8A8A93]" : "bg-[#B8F53C] text-[#09090B]"
          }`}
        >
          {project.status}
        </span>
        <h3 className="f-display max-w-md text-3xl font-bold leading-[1.05] tracking-tight transition-transform duration-500 group-hover:translate-x-1">
          {project.title}
        </h3>
        <p className="mt-3 line-clamp-2 max-w-md text-[15px] leading-relaxed text-[#A6A6AE]">{project.summary}</p>
        <div className="f-mono mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#8A8A93]">
          {project.stack.slice(0, 5).map((s) => (
            <span key={s}>/{s}</span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export default function ProjectsSection() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], []);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="f-mono text-xs text-[#B8F53C]">01 / selected work</p>
          <h2 className="f-display mt-4 text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[0.95] tracking-tight">
            <RevealLines lines={["Things I have", "built so far."]} inView />
          </h2>
        </div>

        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-1 rounded-full border border-white/10 p-1">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`f-mono relative rounded-full px-4 py-2 text-xs transition-colors ${
                filter === c ? "text-[#09090B]" : "text-[#8A8A93] hover:text-[#F4F2EC]"
              }`}
            >
              {filter === c && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-[#B8F53C]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="f-mono mt-8 text-xs text-[#8A8A93]">More projects shipping soon. Add them in src/data/projects.ts.</p>

      <AnimatePresence>
        {selected && <ProjectDrawer key={selected.id} project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
