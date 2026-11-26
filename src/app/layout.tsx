import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const display = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Space_Grotesk({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  // Replace with your real domain once deployed.
  metadataBase: new URL("https://your-domain.com"),
  title: "Hadi Haidari — Full-Stack Developer from Herat",
  description:
    "Portfolio of Hadi Haidari, a full-stack developer from Herat, Afghanistan, building fast, practical web apps with Python, Django, DRF, Next.js and Tailwind CSS.",
  keywords: ["Hadi Haidari", "full-stack developer", "Django", "Next.js", "Python", "Herat", "Afghanistan", "portfolio"],
  authors: [{ name: "Hadi Haidari" }],
  openGraph: {
    title: "Hadi Haidari — Full-Stack Developer",
    description: "Fast, practical web apps with Django, DRF and Next.js. Based in Herat, Afghanistan.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Hadi Haidari — Full-Stack Developer" },
};

export const viewport: Viewport = { themeColor: "#09090b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable} grain antialiased`}>{children}</body>
    </html>
  );
}
