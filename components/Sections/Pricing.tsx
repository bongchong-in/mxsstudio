import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONTENT } from '../../data/content';

const Pricing: React.FC = () => {
  useEffect(() => {
    gsap.to('.receipt-container', {
      scrollTrigger: { trigger: '.receipt-container', start: "top 70%" },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.from('.receipt-line', { width: 0, stagger: 0.2, duration: 0.8, ease: "power2.out", clearProps: "all" })
      }
    });
    gsap.set('.receipt-container', { y: 50 });
  }, []);

  return (
    <section className="w-full flex items-center justify-center bg-void py-16 md:py-20 lg:py-24 lg:min-h-screen relative z-10">
      <div className="w-full max-w-md p-8 border-t border-b-0 border-dashed border-code/30 receipt-container opacity-0 relative bg-white/[0.02]">
        <div className="text-center font-serif text-2xl mb-8 text-paper">{SITE_CONTENT.pricing.invoiceHeader}</div>
        
        <div className="space-y-4 font-mono text-sm text-paper">
          {SITE_CONTENT.pricing.items.map((item, i) => (
            <div key={i} className="flex justify-between items-end receipt-line">
              <span className="text-code">{item}</span>
              <span className="border-b border-code/20 flex-grow mx-2"></span>
              <span>₹0.00</span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-code/50 flex justify-between font-mono text-lg text-gold">
          <span>{SITE_CONTENT.pricing.totalLabel}</span>
          <span>{SITE_CONTENT.pricing.totalValue}</span>
        </div>
        
        <div className="mt-12 text-center">
          <p className="font-mono text-[10px] text-code uppercase tracking-widest">{SITE_CONTENT.pricing.footer}</p>
        </div>

        {/* CSS Sawtooth bottom - positioned to hang below the container */}
        <div className="absolute -bottom-[8px] left-0 w-full h-[8px] overflow-hidden">
           <div className="w-full h-full bg-[linear-gradient(45deg,transparent_75%,#0a0a0a_75%),linear-gradient(-45deg,transparent_75%,#0a0a0a_75%)] bg-[length:16px_16px]"></div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;