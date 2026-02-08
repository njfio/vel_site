import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import ParticleField from './components/ParticleField';

// Import sections
import HeroSection from './sections/HeroSection';
import SixWaysSection from './sections/SixWaysSection';
import CharacterProfilesSection from './sections/CharacterProfilesSection';
import SampleChapterSection from './sections/SampleChapterSection';
import ContinuumSection from './sections/ContinuumSection';
import ReviewsSection from './sections/ReviewsSection';
import NewsletterSection from './sections/NewsletterSection';
import OrderSection from './sections/OrderSection';
import FooterSection from './sections/FooterSection';
import Navigation from './sections/Navigation';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Starfield Background */}
      <img 
        src="/starfield.jpg" 
        alt="" 
        className="starfield-bg"
        aria-hidden="true"
      />
      
      {/* Particle Field */}
      <ParticleField />
      
      {/* Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <main className="relative">
        {/* Pinned Sections */}
        <HeroSection className="z-10" />
        <SixWaysSection className="z-20" />
        <ContinuumSection className="z-30" />
        
        {/* Flowing Sections */}
        <CharacterProfilesSection className="z-50" />
        <SampleChapterSection className="z-50" />
        <ReviewsSection className="z-50" />
        <NewsletterSection className="z-50" />
        <OrderSection className="z-50" />
        <FooterSection className="z-50" />
      </main>
    </div>
  );
}

export default App;
