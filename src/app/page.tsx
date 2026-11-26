import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  return (
    <MotionProvider>
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsMarquee />
        <AboutSection />
        <ContactSection />
      </main>
    </MotionProvider>
  );
}
