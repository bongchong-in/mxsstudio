
import React, { useState } from 'react';
import { SITE_CONTENT } from '../data/content';
import VerificationModal from './VerificationModal';

interface FooterProps {
    onOpenLegal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const [requested, setRequested] = useState(false);
  const [handle, setHandle] = useState('');
  
  // Main Input State
  const [inputPlaceholder, setInputPlaceholder] = useState(SITE_CONTENT.footer.inputPlaceholder);
  const [inputError, setInputError] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestClick = () => {
    if (handle.trim() !== "") {
      setIsModalOpen(true);
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
      setIsModalOpen(false);
  };

  return (
    <>
    <footer id="footer" className="min-h-[50vh] md:min-h-[60vh] lg:min-h-[80vh] w-full bg-paper text-void flex flex-col justify-between p-6 md:p-12 relative z-20 transition-colors duration-500">
      <div className="w-full pt-12">
        <p className="font-mono text-xs uppercase tracking-widest mb-4 text-void/70">{SITE_CONTENT.footer.requestTitle}</p>
        
        {/* Form Container */}
        <div className="max-w-4xl">
          {/* Input & Button Wrapper - Keeps button aligned relative to input */}
          <div className="relative group flex flex-col md:block">
            <input 
              type="text" 
              id="handle-input" 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              disabled={requested}
              placeholder={inputPlaceholder} 
              // Typography & Spacing: 
              // Adjusted to a more conservative scale to guarantee fit on all landscape devices.
              // Mobile: text-sm, Tablet: text-2xl, Desktop: text-5xl.
              className={`w-full bg-transparent border-b-2 border-void/20 py-4 md:py-8 text-sm sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl font-serif focus:outline-none focus:border-void transition-colors hover-trigger text-void pr-0 md:pr-48 placeholder:transition-colors ${inputError ? 'placeholder-alert' : 'placeholder-void/20'}`} 
            />
            
            <button 
              onClick={handleRequestClick}
              disabled={requested}
              // Button Layout: Stacked full-width on mobile with margin. Absolute right on desktop.
              className={`
                mt-6 md:mt-0 w-full md:w-auto
                md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 
                font-mono text-xs md:text-sm 
                border border-void 
                px-6 py-4 md:px-6 md:py-3 
                hover-trigger transition-all duration-300 
                bg-paper z-10 
                ${requested ? 'border-alert text-alert md:rotate-[-10deg] md:scale-90' : 'hover:bg-void hover:text-paper'}
              `}
            >
              {requested ? SITE_CONTENT.footer.button.active : SITE_CONTENT.footer.button.default}
            </button>
          </div>
          
          {/* Status Message - Now in normal flow to prevent overlap */}
          <div className={`
            mt-4 
            font-mono text-xs text-green-700 
            transition-opacity duration-500 
            ${requested ? 'opacity-100' : 'opacity-0'}
          `}>
            {SITE_CONTENT.footer.successMessage}
          </div>
        </div>
        
        <p className="mt-8 md:mt-4 font-mono text-xs text-void/50">{SITE_CONTENT.footer.subText}</p>
      </div>

      {/* Bottom Footer Section */}
      {/* Decreased md margin to prevent large gaps on tablet, kept lg margin for desktop */}
      <div className="flex flex-col w-full pb-12 mt-12 md:mt-24 lg:mt-64">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="mb-8 md:mb-0">
            <h2 className="font-cinzel text-4xl md:text-6xl text-void">{SITE_CONTENT.general.brandName}</h2>
            <p className="font-mono text-xs mt-2 text-void/70">{SITE_CONTENT.general.brandSub}</p>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-xs">
            <a href={SITE_CONTENT.footer.links.concierge.url} target="_blank" rel="noreferrer" className="text-void/70 hover:text-green-600 transition-colors hover-trigger flex items-center gap-2">
                <span className="text-[8px] opacity-50">●</span> {SITE_CONTENT.footer.links.concierge.text}
            </a>
            <a href={SITE_CONTENT.footer.links.instagram.url} className="text-void/70 hover:text-gold transition-colors hover-trigger">{SITE_CONTENT.footer.links.instagram.text}</a>
            <a href={SITE_CONTENT.footer.links.email.url} className="text-void/70 hover:text-gold transition-colors hover-trigger">{SITE_CONTENT.footer.links.email.text}</a>
            </div>
        </div>

        {/* Legal Links Row */}
        <div className="w-full flex justify-center md:justify-start pt-8 border-t border-void/10">
             <div className="font-mono text-[10px] text-void/40 flex gap-2">
                {SITE_CONTENT.footer.legalLinks.map((link, i) => (
                  <React.Fragment key={i}>
                    <button onClick={onOpenLegal} className="hover:text-gold hover:opacity-100 transition-colors hover-trigger uppercase">{link}</button>
                    {i < SITE_CONTENT.footer.legalLinks.length - 1 && <span>|</span>}
                  </React.Fragment>
                ))}
             </div>
        </div>
      </div>
    </footer>

    {/* Reusable Identity Verification Modal */}
    <VerificationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handle={handle}
        onSuccess={handleVerificationSuccess}
    />
    </>
  );
};

export default Footer;
