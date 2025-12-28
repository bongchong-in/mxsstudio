
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SITE_CONTENT } from '../data/content';
import VerificationModal from './VerificationModal';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Form State
  const [handle, setHandle] = useState('');
  const [requested, setRequested] = useState(false);
  const [inputPlaceholder, setInputPlaceholder] = useState(SITE_CONTENT.footer.inputPlaceholder);
  const [inputError, setInputError] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();
      
      tl.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        pointerEvents: 'auto'
      })
      .fromTo(contentRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' },
        "-=0.2"
      );
    } else {
      document.body.style.overflow = '';
      setHandle(''); // Reset on close
      setRequested(false);
      
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        pointerEvents: 'none'
      });
    }
  }, [isOpen]);

  const handleRequestClick = () => {
    if (handle.trim() !== "") {
      setShowVerification(true);
    } else {
      setInputPlaceholder(SITE_CONTENT.footer.inputError);
      setInputError(true);
      setTimeout(() => { 
          setInputPlaceholder(SITE_CONTENT.footer.inputPlaceholder);
          setInputError(false);
      }, 1500);
    }
  };

  const handleVerificationSuccess = () => {
      setRequested(true);
      setShowVerification(false);
      // Optional: Close About Modal after success
      // setTimeout(onClose, 2000); 
  };

  return (
    <>
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[150] bg-void/95 backdrop-blur-sm opacity-0 pointer-events-none overflow-hidden flex flex-col text-paper"
    >
      {/* Header */}
      <div className="w-full border-b border-code/30 p-6 md:p-8 flex justify-between items-center bg-void shrink-0 z-10">
        <h2 className="font-mono text-sm md:text-base text-gold tracking-[0.2em] uppercase">
          {SITE_CONTENT.about.title}
        </h2>
        <button 
          onClick={onClose}
          className="group flex items-center gap-4 text-code hover:text-gold transition-colors hover-trigger"
        >
          <span className="font-mono text-xs uppercase tracking-widest hidden md:block">Close</span>
          <div className="w-8 h-8 border border-current flex items-center justify-center transition-all duration-300 group-hover:rotate-90">
            <span className="font-light text-xl leading-none font-serif">&times;</span>
          </div>
        </button>
      </div>

      {/* Content */}
      <div 
        className="flex-grow overflow-y-auto w-full custom-scrollbar"
        data-lenis-prevent
      >
        <div ref={contentRef} className="w-full max-w-3xl px-6 py-12 md:py-20 opacity-0 mx-auto">
           
           {/* Header Section */}
           <div className="mb-16 md:mb-24 text-center">
              <p className="font-serif italic text-gold/80 text-lg md:text-xl mb-6">{SITE_CONTENT.about.subtitle}</p>
           </div>

           {/* Content Sections */}
           <div className="space-y-16 md:space-y-24">
              {SITE_CONTENT.about.sections.map((section, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16">
                      <div className="md:w-1/3 shrink-0">
                          <h3 className="font-mono text-sm text-gold uppercase tracking-[0.2em] sticky top-8">{section.heading}</h3>
                      </div>
                      <div className="md:w-2/3 space-y-6">
                          {section.text.map((para, pIdx) => (
                              <p key={pIdx} className="font-sans font-light text-paper/80 leading-relaxed text-justify md:text-left">
                                  {para}
                              </p>
                          ))}
                      </div>
                  </div>
              ))}

              {/* Philosophy Quote */}
              <div className="py-12 border-t border-b border-code/20 text-center">
                   <h3 className="font-mono text-xs text-code uppercase tracking-widest mb-6">{SITE_CONTENT.about.philosophy.heading}</h3>
                   <p className="font-serif text-2xl md:text-4xl italic text-gold">{SITE_CONTENT.about.philosophy.quote}</p>
              </div>

              {/* CTA Section - Replicating Footer Style */}
              <div className="pt-12 md:pt-16">
                  <div className="text-center mb-12">
                      <h3 className="font-cinzel text-3xl md:text-5xl">{SITE_CONTENT.about.cta}</h3>
                  </div>

                  <div className="relative group flex flex-col md:block">
                    <input 
                    type="text" 
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    disabled={requested}
                    placeholder={inputPlaceholder} 
                    className={`w-full bg-transparent border-b-2 border-void/20 md:border-code/30 py-4 md:py-6 text-sm sm:text-lg md:text-2xl lg:text-3xl font-serif focus:outline-none focus:border-gold transition-colors hover-trigger text-paper pr-0 md:pr-48 placeholder:transition-colors ${inputError ? 'placeholder-alert' : 'placeholder-code/20'}`} 
                    />
                    
                    <button 
                    onClick={handleRequestClick}
                    disabled={requested}
                    className={`
                        mt-6 md:mt-0 w-full md:w-auto
                        md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 
                        font-mono text-xs md:text-sm 
                        border border-paper md:border-code 
                        px-6 py-4 md:px-6 md:py-3 
                        hover-trigger transition-all duration-300 
                        bg-void z-10 
                        ${requested ? 'border-alert text-alert md:rotate-[-10deg] md:scale-90' : 'hover:bg-paper hover:text-void'}
                    `}
                    >
                    {requested ? SITE_CONTENT.footer.button.active : SITE_CONTENT.footer.button.default}
                    </button>
                </div>
                 <div className={`
                    mt-4 text-center md:text-left
                    font-mono text-xs text-green-500 
                    transition-opacity duration-500 
                    ${requested ? 'opacity-100' : 'opacity-0'}
                `}>
                    {SITE_CONTENT.footer.successMessage}
                </div>
              </div>

              <div className="h-16"></div> {/* Spacer */}
           </div>
        </div>
      </div>
    </div>
    
    {/* Verification Modal Instance */}
    <VerificationModal 
        isOpen={showVerification} 
        onClose={() => setShowVerification(false)} 
        handle={handle}
        onSuccess={handleVerificationSuccess}
    />
    </>
  );
};

export default AboutModal;
