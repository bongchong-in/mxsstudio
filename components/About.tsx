
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SITE_CONTENT } from '../data/content';
import Footer from './Sections/Footer';

interface AboutProps {
  onOpenLegal: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenLegal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initial Reveal
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo('.about-header',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Section Reveals on Scroll
    textRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="w-full bg-void min-h-screen pt-32 md:pt-48 relative">
      {/* Background Architectural Lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none h-full">
         <div className="absolute top-0 left-6 md:left-24 w-[1px] h-full bg-code"></div>
         <div className="absolute top-0 right-6 md:right-24 w-[1px] h-full bg-code"></div>
      </div>

      <div className="container mx-auto px-6 md:px-24 relative z-10">
        
        {/* Header */}
        <div className="about-header opacity-0 mb-24 md:mb-32 text-center">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-paper mb-6">
                {SITE_CONTENT.about.title}
            </h1>
            <p className="font-mono text-xs md:text-sm text-code tracking-[0.2em] uppercase">
                {SITE_CONTENT.about.subtitle}
            </p>
        </div>

        {/* Content Sections */}
        <div className="max-w-5xl mx-auto space-y-24 md:space-y-48 pb-24">
            {SITE_CONTENT.about.sections.map((section, index) => (
                <div 
                    key={index} 
                    ref={el => { textRefs.current[index] = el }}
                    className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
                >
                    <div className="md:w-1/3 pt-2 border-t border-gold/30 md:border-t-0 md:border-l md:pl-6">
                        <h2 className="font-mono text-gold text-sm tracking-[0.2em] uppercase">
                            {section.title}
                        </h2>
                    </div>
                    <div className="md:w-2/3 space-y-6">
                        {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="font-serif text-lg md:text-xl lg:text-2xl text-paper/80 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Philosophy Quote */}
        <div className="py-24 md:py-32 border-t border-code/20 text-center">
             <h3 className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-gold/90 leading-tight max-w-4xl mx-auto">
                 {SITE_CONTENT.about.philosophy}
             </h3>
        </div>

      </div>

      <Footer onOpenLegal={onOpenLegal} />
    </div>
  );
};

export default About;
