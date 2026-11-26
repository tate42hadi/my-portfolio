# Hadi Haidari — Portfolio (Next.js + TypeScript + Tailwind + Framer Motion)

## Setup
npx create-next-app@latest hadi-portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd hadi-portfolio
npm install framer-motion lucide-react

Copy the `src/` and `public/` folders from this package over the generated ones (replace when asked), then:

npm run dev

## Editing
- Personal info, skills and projects: src/data/projects.ts
- To add a project, copy one object in the `projects` array and give it a unique id.
- Portrait: public/images/hadi.webp (transparent cutout)
