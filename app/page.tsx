import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import ResumeSection from '../components/ResumeSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
