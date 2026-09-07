import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Organizational from "@/components/sections/Organizational";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <div className="px-4 sm:px-8 lg:px-20">
      <Hero />
      <AboutMe />
      <TechStack />
      <Projects />
      <Experience />
      <Education />
      <Organizational />
      <Certifications />
      <Contact />
    </div>
  );
}
