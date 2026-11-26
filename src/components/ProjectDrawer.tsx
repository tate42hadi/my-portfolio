"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { EASE } from "@/lib/motion";

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function ProjectDrawer({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.65, ease: EASE }}
        className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#0D0D10] p-6 sm:p-9"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: { staggerChildren: 0.07, delayChildren: 0.25 },
            },
          }}
        >
          <motion.div
            variants={item}
            className="flex items-center justify-between"
          >
            <span className="f-mono rounded-full border border-[#B8F53C]/40 px-3 py-1 text-[11px] text-[#B8F53C]">
              {project.status}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close case study"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-[#B8F53C] hover:text-[#B8F53C]"
            >
              <X size={18} />
            </button>
          </motion.div>

          <motion.h3
            variants={item}
            className="f-display mt-8 text-4xl font-extrabold leading-[1.02] tracking-tight"
          >
            {project.title}
          </motion.h3>
          <motion.p
            variants={item}
            className="mt-5 leading-relaxed text-[#A6A6AE]"
          >
            {project.summary}
          </motion.p>

          <motion.dl
            variants={item}
            className="mt-8 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10"
          >
            {[
              ["Role", project.role],
              ["Year", project.year],
              ["Type", project.category],
            ].map(([k, v]) => (
              <div key={k} className="px-4 py-4 first:pl-0">
                <dt className="f-mono text-[10px] text-[#8A8A93]">{k}</dt>
                <dd className="mt-1 text-sm">{v}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="f-mono rounded-full border border-white/12 px-3 py-1.5 text-[11px]"
              >
                {s}
              </span>
            ))}
          </motion.div>

          <motion.ul variants={item} className="mt-8 space-y-3">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 text-[15px] leading-relaxed text-[#D6D4CE]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8F53C]" />
                {h}
              </li>
            ))}
          </motion.ul>

          {project.architecture && project.architecture.length > 0 && (
            <motion.pre
              variants={item}
              className="f-mono mt-8 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-5 text-[12px] leading-7 text-[#8A8A93]"
            >
              <span className="text-[#B8F53C]">$ cat architecture.txt</span>
              {"\n"}
              {project.architecture.join("\n")}
            </motion.pre>
          )}

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            {(
              [
                ["Live site", project.links.live],
                ["Source code", project.links.repo],
              ] as const
            ).map(([label, href]) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#B8F53C] px-5 py-3 text-sm font-semibold text-[#09090B]"
                >
                  {label} <ArrowUpRight size={15} />
                </a>
              ) : (
                <span
                  key={label}
                  className="f-mono rounded-full border border-dashed border-white/15 px-5 py-3 text-xs text-[#8A8A93]"
                >
                  {label}: coming soon
                </span>
              ),
            )}
          </motion.div>
        </motion.div>
      </motion.aside>
    </div>
  );
}
