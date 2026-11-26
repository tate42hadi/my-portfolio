/**
 * ─────────────────────────────────────────────────────────────────────────
 *  EDIT ME — the single source of truth for personal info, skills & projects.
 *
 *  Adding a project later (3rd, 4th, 5th…):
 *    1. Copy one whole object inside the `projects` array below.
 *    2. Paste it after the last one and give it a unique `id`.
 *    3. Fill in the fields. Done — the grid, category filters and the
 *       case-study drawer update automatically. No other file needs touching.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** To introduce a brand-new category, add it to this union and use it in a project. */
export type Category = "Full-Stack" | "Backend" | "Frontend" | "Tooling";
export type Status = "Live" | "In progress" | "Template";

export interface Project {
  /** Unique, URL-safe id (used as React key). */
  id: string;
  title: string;
  category: Category;
  year: string;
  status: Status;
  /** One or two sentences shown on the card. */
  summary: string;
  role: string;
  stack: string[];
  /** Bullet points in the case-study drawer. */
  highlights: string[];
  /** Short architecture notes, rendered like terminal output in the drawer. */
  architecture?: string[];
  /** Leave a link out and the drawer shows "coming soon" for it. */
  links: { live?: string; repo?: string };
}

export const profile = {
  name: "Hadi Haidari",
  handle: "hadi.dev",
  role: "Full-Stack Developer",
  age: 16,
  city: "Herat",
  country: "Afghanistan",
  timezone: "Asia/Kabul",
  utcOffset: "UTC+4:30",
  email: "tatehadi42@gmail.com", // ← replace with your real email
  tagline: "Fast, practical web apps, built in Herat.",
  bio: "A passionate 16-year-old full-stack developer from Herat, Afghanistan, dedicated to sharpening my programming skills and building fast, practical web applications.",
  socials: [
    { label: "GitHub", handle: "github.com/your-username", href: "https://github.com/your-username" },
    { label: "LinkedIn", handle: "linkedin.com/in/your-name", href: "https://linkedin.com/in/your-name" },
    { label: "Instagram", handle: "@your_handle", href: "https://instagram.com/your_handle" },
    { label: "Telegram", handle: "@your_handle", href: "https://t.me/your_handle" },
  ],
};

export const skills: { name: string; note: string }[] = [
  { name: "Python", note: "My main language: clean, readable backend logic and automation." },
  { name: "Django", note: "Models, ORM, admin and auth: the backbone of every project I ship." },
  { name: "Django REST Framework", note: "Serializers, viewsets and permissions behind a versioned JSON API." },
  { name: "Full-Stack Development", note: "From database schema to deployed UI, owning the whole path." },
  { name: "JavaScript", note: "The language of the browser; the foundation under everything frontend." },
  { name: "TypeScript", note: "Typed API contracts so the frontend and backend never drift apart." },
  { name: "Next.js", note: "App Router, server components and fast, SEO-friendly pages." },
  { name: "Tailwind CSS", note: "Utility-first styling with a consistent design system and no CSS sprawl." },
];

/** Shown in About → “How I structure Django + Next.js apps”. */
export const buildNotes: { title: string; text: string }[] = [
  { title: "Django owns the data", text: "Models, validation and business rules live in Django. The frontend never decides what is allowed." },
  { title: "DRF is the contract", text: "A versioned JSON API with explicit serializers and permissions, so every response is predictable." },
  { title: "Next.js renders fast", text: "Server components fetch data on the server, ship less JavaScript and keep pages quick on slow networks." },
  { title: "Types at the seam", text: "TypeScript interfaces mirror the API shapes. A backend change shows up as a compile error, not a runtime bug." },
];

export const projects: Project[] = [
  {
    id: "Tasallot",
    title: "Tasallot Educational Center",
    category: "Full-Stack",
    year: "2026",
    status: "Live",
    summary:
      "A Modern and Active web app for a language and computer course center: public site, class catalogue, and an admin area to manage content.",
    role: "Design, backend and frontend",
    stack: ["Python", "Django", "DRF", "Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Bilingual interface (English / Persian) with right-to-left layout support",
      "Class catalogue and course pages managed from the admin panel",
      "Public marketing site with fast server-rendered pages",
      "Clean REST API consumed by the Next.js frontend",
    ],
    architecture: [
      "frontend  next.js (app router) → server components",
      "api       django rest framework → /api/v1/",
      "data      django orm → sqlite (dev) / postgres (prod)",
      "cms       django admin for classes, teachers, pages",
    ],
    links: {
      // live: "https://my-first-project-rosy-five.vercel.app/",
      // repo: "https://github.com/your-username/tasallot",
    },
  },
  {
    id: "Hindukush",
    title: "Hindukush Bridge Network",
    category: "Full-Stack",
    year: "2026",
    status: "Live",
    summary:
      "My final project: a Next.js storefront website with Framer-Motion styles. This was my Final Project of Frontend, there are a variety of internet packages originated from the real Hindukush Bridge Packages.",
    role: "Full-stack developer",
    stack: ["Python", "Next.js", "Tailwind CSS", "JavaScript"],
    highlights: [
      "Interactive Page Designs built in SEO Rules",
      "Various internet packages based on real packages of Hindukush Network",
    ],
    links: {
      live: "https://my-first-project-rosy-five.vercel.app/"
    },
  },
];
