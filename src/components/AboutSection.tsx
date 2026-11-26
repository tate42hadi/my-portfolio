"use client";

import { motion } from "framer-motion";
import { buildNotes, profile } from "@/data/projects";
import { EASE } from "@/lib/motion";
import { RevealLines } from "./RevealText";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function AboutSection() {
  const facts = [
    ["Based in", `${profile.city}, ${profile.country}`],
    ["Timezone", `${profile.timezone} (${profile.utcOffset})`],
    ["Age", String(profile.age)],
    ["Focus", "Django + Next.js"],
  ];

  return (
    <section id="about" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="f-mono text-xs text-[#B8F53C]">03 / about</p>
            <h2 className="f-display mt-4 text-[clamp(2.6rem,5.4vw,4.8rem)] font-extrabold leading-[0.95] tracking-tight">
              <RevealLines lines={["Sixteen,", "from Herat,", "shipping code."]} inView />
            </h2>
            <motion.dl
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="mt-10 border-t border-white/10"
            >
              {facts.map(([k, v]) => (
                <motion.div key={k} variants={fade} className="flex justify-between gap-6 border-b border-white/10 py-3.5">
                  <dt className="f-mono text-xs text-[#8A8A93]">{k}</dt>
                  <dd className="text-right text-sm">{v}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.p
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="f-display text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
          >
            {profile.bio}
          </motion.p>

          <h3 className="f-mono mt-20 text-xs text-[#8A8A93]">How I structure Django + Next.js apps</h3>
          <ol className="mt-6 border-t border-white/10">
            {buildNotes.map((n, i) => (
              <motion.li
                key={n.title}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="group grid grid-cols-[48px_1fr] gap-4 border-b border-white/10 py-7 sm:grid-cols-[64px_220px_1fr]"
              >
                <span className="f-mono pt-1 text-xs text-[#B8F53C]">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="f-display text-xl font-bold transition-transform duration-500 group-hover:translate-x-2">{n.title}</h4>
                <p className="col-span-2 leading-relaxed text-[#A6A6AE] sm:col-span-1">{n.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
