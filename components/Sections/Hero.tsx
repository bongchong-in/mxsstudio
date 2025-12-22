import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE_CONTENT } from '../../data/content';

const Hero: React.FC = () => {
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 }); // Wait for preloader

    tl.fromTo(
      [text1Ref.current, text2Ref.current],
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        stagger: 0.2, 
        ease: 'power4.out' 
      }
    )
    .fromTo(
      subtextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 }, 
      "-=1.0"
    );
  }, []);

  return (
    <section id="hero" className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center z-10">
        <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif leading-tight mix-blend-exclusion">
          <div className="overflow-hidden">
            <span ref={text1Ref} className="block">{SITE_CONTENT.hero.line1}</span>
          </div>
          <div className="overflow-hidden">
            <span ref={text2Ref} className="block italic text-gold/90">{SITE_CONTENT.hero.line2}</span>
          </div>
        </h1>
        <div className="mt-8 md:mt-12 overflow-hidden">
          <p ref={subtextRef} className="font-mono text-xs md:text-sm tracking-widest text-code uppercase">
            {SITE_CONTENT.hero.subtext}
          </p>
        </div>
      </div>
      
      {/* Abstract architectural lines bg */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-code"></div>
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-code"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-code"></div>
      </div>
    </section>
  );
};

export default Hero;