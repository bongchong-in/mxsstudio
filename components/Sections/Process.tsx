import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONTENT } from '../../data/content';

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = gsap.utils.toArray('.process-step');
    gsap.to(steps, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%"
      },
      y: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 1,
      ease: "power2.out"
    });
  }, []);

  return (
    <section ref={containerRef} className="w-full py-16 md:py-20 lg:py-24 bg-void relative z-10 border-t border-b border-code/10">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="font-mono text-xs text-code tracking-[0.3em] uppercase">{SITE_CONTENT.process.sectionTitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12">
          
          {SITE_CONTENT.process.steps.map((step, index) => (
             <div key={index} className="process-step opacity-0 transform translate-y-8 border-l border-code/30 pl-6 pb-12 md:pb-0">
                <span className="font-mono text-gold text-sm block mb-4">{step.number}</span>
                <h3 className="font-serif text-2xl mb-4 text-paper">{step.title}</h3>
                <p className="font-mono text-xs text-code leading-relaxed">
                  {step.description}
                </p>
             </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Process;