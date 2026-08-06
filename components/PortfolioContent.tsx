import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TestimonialsSection />
      <ExperienceSection />
      <ProjectsSection />
    </>
  );
}

export default PortfolioContent;
