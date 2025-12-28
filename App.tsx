
import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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
import About from './components/About';
import LegalOverlay from './components/LegalOverlay';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
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

  // Handle Legal Overlay
  useEffect(() => {
    if (lenisRef.current) {
      if (isLegalOpen) {
        lenisRef.current.stop();
      } else if (!isLoading) {
        lenisRef.current.start();
      }
    }
  }, [isLegalOpen, isLoading]);

  // Handle View Change & Scroll Reset
  useEffect(() => {
    if (!isLoading && lenisRef.current) {
       window.scrollTo(0,0);
       // Small timeout to allow render
       setTimeout(() => {
         ScrollTrigger.refresh();
         lenisRef.current?.resize();
       }, 100);
    }
  }, [currentView, isLoading]);

  return (
    <>
      <Cursor />
      <div className="noise-overlay" />
      
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Global Legal Overlay */}
      <LegalOverlay isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />

      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      {/* Main Container */}
      <main className="w-full relative">
        {currentView === 'home' ? (
          <>
            <Hero />
            <Philosophy />
            <Process />
            <Gallery />
            <Pricing />
            <Status />
            <Footer onOpenLegal={() => setIsLegalOpen(true)} />
          </>
        ) : (
          <About onOpenLegal={() => setIsLegalOpen(true)} />
        )}
      </main>
    </>
  );
};

export default App;
