import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONTENT } from '../../data/content';

const Philosophy: React.FC = () => {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    });
  }, []);

  return (
    <section id="philosophy" className="w-full py-16 md:py-20 lg:py-24 lg:min-h-screen relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold to-transparent opacity-30"></div>

      <div className="container mx-auto px-4 md:px-0">
        {SITE_CONTENT.philosophy.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={index}
              ref={el => { itemsRef.current[index] = el }} 
              className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 lg:mb-32"
            >
              {/* Layout varies based on index parity to alternate alignment */}
              <div className={`md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0 mb-4 md:mb-0 ${!isEven ? 'order-2 md:order-1' : ''}`}>
                {!isEven ? (
                   <p className="font-mono text-xs text-code max-w-xs ml-auto">
                     {item.content}
                   </p>
                ) : (
                   <h2 className={`text-3xl md:text-5xl font-serif ${item.highlight ? 'text-gold' : ''}`}>{item.title}</h2>
                )}
              </div>

              <div className={`md:w-1/2 md:pl-12 pl-12 ${!isEven ? 'order-1 md:order-2' : ''}`}>
                {!isEven ? (
                    <h2 className={`text-3xl md:text-5xl font-serif ${item.highlight ? 'text-gold' : ''}`}>{item.title}</h2>
                ) : (
                    <p className="font-mono text-xs text-code max-w-xs">
                     {item.content}
                   </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Philosophy;