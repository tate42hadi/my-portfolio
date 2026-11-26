"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/data/projects";
import { EASE } from "@/lib/motion";
import { RevealLines } from "./RevealText";
import Magnetic from "./Magnetic";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const t = document.createElement("textarea");
      t.value = profile.email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 px-5 pb-10 pt-28 sm:px-8">
      <div className="pointer-events-none absolute -bottom-48 left-1/2 h-96 w-[64rem] -translate-x-1/2 rounded-full bg-[#B8F53C]/10 blur-[130px]" />
      <div className="relative mx-auto max-w-[1400px]">
        <p className="f-mono text-xs text-[#B8F53C]">04 / contact</p>
        <h2 className="f-display mt-4 text-[clamp(3rem,9.5vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.035em]">
          <RevealLines lines={["Let us build", "something fast."]} inView />
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <span className="f-mono rounded-full border border-white/15 px-6 py-4 text-sm">{profile.email}</span>
          <Magnetic strength={0.3}>
            <button
              onClick={copy}
              className="flex items-center gap-2.5 rounded-full bg-[#B8F53C] px-7 py-4 text-sm font-semibold text-[#09090B]"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </Magnetic>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {profile.socials.map((s) => (
            <li key={s.label} className="bg-[#09090B]">
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 p-6 transition-colors duration-500 hover:bg-[#B8F53C] hover:text-[#09090B]"
              >
                <span>
                  <span className="f-display block text-xl font-bold">{s.label}</span>
                  <span className="f-mono text-[11px] opacity-60">{s.handle}</span>
                </span>
                <ArrowUpRight size={20} className="transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </li>
          ))}
        </ul>

        <footer className="f-mono mt-20 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-[#8A8A93]">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>
            {profile.city}, {profile.country} · {profile.timezone}
          </span>
          <a href="#top" className="transition-colors hover:text-[#B8F53C]">
            Back to top ↑
          </a>
        </footer>
      </div>

      <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[95] -translate-x-1/2">
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="f-mono flex items-center gap-2 rounded-full border border-[#B8F53C]/50 bg-[#09090B]/90 px-5 py-3 text-xs text-[#B8F53C] backdrop-blur"
            >
              <Check size={14} /> Email copied to clipboard
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
