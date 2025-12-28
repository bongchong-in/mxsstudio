
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
import AboutModal from './components/AboutModal';
import FAQModal from './components/FAQModal';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis
  useEffect(() => {
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

    // Immediately stop scrolling while loading
    lenis.stop();

    // Synchronize with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP Ticker
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  // Handle Loading State
  useEffect(() => {
    if (!isLoading && lenisRef.current) {
      // Small delay to ensure DOM is painted before enabling scroll
      setTimeout(() => {
        window.scrollTo(0, 0);
        lenisRef.current?.start();
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [isLoading]);

  // Handle Modal/Overlay State affecting Scroll
  useEffect(() => {
    if (lenisRef.current) {
      if (isLegalOpen || isAboutOpen || isFAQOpen) {
        lenisRef.current.stop();
      } else if (!isLoading) {
        lenisRef.current.start();
      }
    }
  }, [isLegalOpen, isAboutOpen, isFAQOpen, isLoading]);

  return (
    <>
      <Cursor />
      <div className="noise-overlay" />
      
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Global Overlays */}
      <LegalOverlay isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />

      <Navigation onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Main Container */}
      <main className="w-full relative">
        <Hero />
        <Philosophy />
        <Process />
        <Gallery />
        <Pricing />
        <Status />
        <Footer 
          onOpenLegal={() => setIsLegalOpen(true)} 
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenFAQ={() => setIsFAQOpen(true)}
        />
      </main>
    </>
  );
};

export default App;
