"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Makes every animation respect the visitor's `prefers-reduced-motion` setting. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
