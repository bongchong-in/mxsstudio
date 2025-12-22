import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE_CONTENT } from '../data/content';

interface LegalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalOverlay: React.FC<LegalOverlayProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();
      
      // Reveal Container
      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        pointerEvents: 'auto'
      })
      // Reveal Content
      .fromTo(contentRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
        "-=0.2"
      );
    } else {
      // Unlock body scroll
      document.body.style.overflow = '';

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        pointerEvents: 'none'
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-void text-paper opacity-0 pointer-events-none overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="w-full border-b border-code/30 p-6 md:p-8 flex justify-between items-center bg-void shrink-0 z-10">
        <h2 className="font-mono text-sm md:text-base text-gold tracking-[0.2em] uppercase">
          {SITE_CONTENT.legalOverlay.title}
        </h2>
        <button 
          onClick={onClose}
          className="font-mono text-xs text-code hover:text-gold uppercase tracking-widest hover-trigger transition-colors"
        >
          {SITE_CONTENT.legalOverlay.backText}
        </button>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-grow overflow-y-auto w-full custom-scrollbar"
        data-lenis-prevent
      >
        <div ref={contentRef} className="w-full max-w-2xl px-6 py-12 md:py-20 opacity-0 mx-auto">
          
          {SITE_CONTENT.legalOverlay.protocols.map((protocol, i) => (
             <div key={i} className="mb-16">
                <div className="flex items-baseline gap-4 mb-6 border-b border-code/20 pb-2">
                  <span className="font-mono text-gold text-xs">{protocol.id}</span>
                  <h3 className="font-mono text-lg text-paper tracking-wide uppercase">{protocol.title}</h3>
                </div>
                <div className="font-sans text-sm text-code leading-relaxed space-y-4 text-justify">
                  {protocol.content.map((para, j) => (
                      <p key={j} className={para.alert ? 'text-alert/80' : (para.label === "Communication Consent" ? 'text-paper/80' : '')}>
                        <strong>{para.label}:</strong> {para.text}
                      </p>
                  ))}
                </div>
             </div>
          ))}

          {/* Footer of Modal */}
          <div className="mt-24 pt-8 border-t border-code/30 text-center">
            <p className="font-mono text-[10px] text-code uppercase tracking-widest">
              {SITE_CONTENT.legalOverlay.footer}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LegalOverlay;