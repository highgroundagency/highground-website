import { ContactProvider } from "./components/ContactModal";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/motion/ScrollProgress";
import { Hero } from "./components/sections/Hero";
import { Problem } from "./components/sections/Problem";
import { Services } from "./components/sections/Services";
import { HowItWorks } from "./components/sections/HowItWorks";
import { Expectations } from "./components/sections/Expectations";
import { Team } from "./components/sections/Team";
import { FinalCTA } from "./components/sections/FinalCTA";

export default function App() {
  return (
    <ContactProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Nav />

      <main id="main">
        <Hero />
        <Problem />
        <Services />
        <HowItWorks />
        <Expectations />
        <Team />
        <FinalCTA />
      </main>

      <Footer />

      {/* Site-wide film grain for warmth/depth */}
      <div className="grain-overlay" aria-hidden="true" />
    </ContactProvider>
  );
}
