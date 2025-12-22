import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navigation from './components/Navigation';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Hero from './components/Sections/Hero';
import Philosophy from './components/Sections/Philosophy';
import Process from './components/Sections/Process';
import Gallery from './components/Sections/Gallery';
import Pricing from './components/Sections/Pricing';
import Status from './components/Sections/Status';
import Footer from './components/Sections/Footer';
import LegalOverlay from './components/LegalOverlay';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker for the animation loop
    // This ensures better synchronization between GSAP and Lenis
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Prevent jumps during heavy loads

    // Initial ScrollTrigger config
    ScrollTrigger.defaults({
      markers: false,
    });

    // Handle global resize
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);

  // When loading finishes, we need to refresh all scroll-based measurements
  useEffect(() => {
    if (!isLoading) {
      // Small timeout to ensure DOM has settled after preloader is removed
      const timer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
        ScrollTrigger.refresh();
        // Force scroll to top on refresh/load
        window.scrollTo(0, 0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      <Cursor />
      <div className="noise-overlay" />
      
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Global Legal Overlay */}
      <LegalOverlay isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />

      <Navigation />

      <main className={`w-full relative overflow-x-hidden ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <Hero />
        <Philosophy />
        <Process />
        <Gallery />
        <Pricing />
        <Status />
        <Footer onOpenLegal={() => setIsLegalOpen(true)} />
      </main>
    </>
  );
};

export default App;