import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { SITE_CONTENT, COUNTRIES } from '../../data/content';

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
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  const [phone, setPhone] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [errors, setErrors] = useState<{email?: string, phone?: string, authorized?: string}>({});

  // Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.code.includes(searchQuery)
    );
  }, [searchQuery]);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tl.to(modalRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        pointerEvents: 'auto'
      })
      .fromTo(contentRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' },
        "-=0.2"
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none'
      });
    }
  }, [isModalOpen]);

  const handleRequestClick = () => {
    if (handle.trim() !== "") {
      setIsModalOpen(true);
      // Reset errors when opening
      setErrors({});
      setSearchQuery('');
      setIsDropdownOpen(false);
    } else {
      setInputPlaceholder(SITE_CONTENT.footer.inputError);
      setInputError(true);
      setTimeout(() => { 
          setInputPlaceholder(SITE_CONTENT.footer.inputPlaceholder);
          setInputError(false);
      }, 1500);
    }
  };

  const handleFinalSubmit = async () => {
    const newErrors: {email?: string, phone?: string, authorized?: string} = {};
    let isValid = true;

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "INVALID EMAIL";
      isValid = false;
    }

    // Phone Validation
    const phoneRegex = /^\d{6,14}$/;

    if (!countryCode) {
        newErrors.phone = "SELECT CODE";
        isValid = false;
    } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = "INVALID NUMBER";
      isValid = false;
    }

    // Authorization Validation
    if (!authorized) {
        newErrors.authorized = "AUTHORIZATION REQUIRED";
        isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const btn = document.getElementById('modal-submit-btn');
      
      try {
        // UI Feedback: Transmitting
        if (btn) btn.innerText = "TRANSMITTING...";

        // Google Form Submission Logic
        const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd0uTXvBkYY8iJmhvR6-9SzdV55yriZR12nzbQpPCHhIiHmoA/formResponse";
        
        const formData = new FormData();
        formData.append('entry.316619129', handle); // Instagram Handle
        formData.append('entry.2004379225', email); // Email
        formData.append('entry.1663992994', `${countryCode} ${phone}`); // Mobile Number

        // Submit to Google Forms (no-cors mode is required for client-side submission without proxy)
        await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });

        // Success Animation before close
        if (btn) btn.innerText = SITE_CONTENT.modal.successText;
        
        setTimeout(() => {
            setIsModalOpen(false);
            setRequested(true);
        }, 600);

      } catch (error) {
        console.error("Transmission Error", error);
        if (btn) btn.innerText = "ERROR - RETRY";
        setTimeout(() => {
            if (btn) btn.innerText = SITE_CONTENT.modal.submitText;
        }, 2000);
      }
    }
  };

  const closeModal = () => {
      setIsModalOpen(false);
  }

  const selectCountry = (code: string) => {
      setCountryCode(code);
      setIsDropdownOpen(false);
      setSearchQuery('');
  }

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

    {/* Identity Verification Modal */}
    <div 
        ref={modalRef}
        className="fixed inset-0 z-[100] bg-void/90 backdrop-blur-md flex items-center justify-center opacity-0 pointer-events-none"
    >
        <div 
            ref={contentRef}
            className="w-full max-w-lg mx-6 p-8 border border-code/30 bg-black/40 relative shadow-2xl"
        >
            <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-code hover:text-alert font-mono text-xs uppercase tracking-widest hover-trigger"
            >
                CLOSE
            </button>

            <div className="mb-8">
                <h3 className="font-mono text-xs text-gold tracking-[0.3em] uppercase mb-2">{SITE_CONTENT.modal.brand}</h3>
                <h2 className="font-serif text-3xl text-paper">{SITE_CONTENT.modal.title}</h2>
            </div>

            <div className="space-y-6">
                {/* Email Field */}
                <div className="group">
                    <label className="block font-mono text-[10px] text-code uppercase tracking-widest mb-2">
                        {SITE_CONTENT.modal.emailLabel}
                    </label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full bg-transparent border-b ${errors.email ? 'border-alert text-alert' : 'border-code/30 text-paper'} py-2 font-mono text-sm focus:outline-none focus:border-gold transition-colors placeholder-code/20`}
                    />
                    {errors.email && (
                        <p className="font-mono text-[10px] text-alert mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Mobile Field */}
                <div className="group">
                    <label className="block font-mono text-[10px] text-code uppercase tracking-widest mb-2">
                         {SITE_CONTENT.modal.phoneLabel}
                    </label>
                    <div className="flex gap-4 relative z-50">
                        {/* Custom Country Dropdown */}
                        <div className="w-24 flex-shrink-0 relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-full text-left bg-transparent border-b ${errors.phone ? 'border-alert text-alert' : 'border-code/30 text-paper'} py-2 font-mono text-sm focus:outline-none transition-colors flex justify-between items-center`}
                            >
                                <span className={!countryCode ? 'text-code/50' : ''}>
                                    {countryCode || "Code"}
                                </span>
                                <span className="text-[10px] opacity-50">▼</span>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute top-full left-0 w-64 max-h-60 overflow-y-auto bg-void border border-code/30 shadow-2xl mt-1 scrollbar-hide">
                                    <div className="sticky top-0 bg-void border-b border-code/30 p-2">
                                        <input
                                            type="text"
                                            placeholder="Search country..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            autoFocus
                                            className="w-full bg-transparent text-paper font-mono text-xs focus:outline-none placeholder-code/40"
                                        />
                                    </div>
                                    <div className="py-2">
                                        {filteredCountries.length > 0 ? (
                                            filteredCountries.map((c) => (
                                                <button
                                                    key={c.iso}
                                                    onClick={() => selectCountry(c.code)}
                                                    className="w-full text-left px-4 py-2 hover:bg-white/5 hover:text-gold transition-colors group flex justify-between items-center"
                                                >
                                                    <span className="font-serif text-sm truncate pr-2">{c.name}</span>
                                                    <span className="font-mono text-xs text-code group-hover:text-gold/70">{c.code}</span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 font-mono text-xs text-code">No matches</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Phone Number Input */}
                        <div className="flex-grow">
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="1234567890"
                                className={`w-full bg-transparent border-b ${errors.phone ? 'border-alert text-alert' : 'border-code/30 text-paper'} py-2 font-mono text-sm focus:outline-none focus:border-gold transition-colors placeholder-code/20`}
                            />
                        </div>
                    </div>
                    {errors.phone && (
                        <p className="font-mono text-[10px] text-alert mt-1">{errors.phone}</p>
                    )}
                </div>

                {/* Authorization Checkbox */}
                <div 
                    className="flex items-center gap-3 group cursor-pointer mt-4" 
                    onClick={() => setAuthorized(!authorized)}
                >
                    <div className={`w-4 h-4 border ${errors.authorized ? 'border-alert' : 'border-code/50'} flex items-center justify-center transition-colors duration-300 group-hover:border-gold bg-transparent shrink-0`}>
                        <div className={`w-2 h-2 bg-gold transition-opacity duration-200 ${authorized ? 'opacity-100' : 'opacity-0'}`}></div>
                    </div>
                    <span className={`font-mono text-[10px] uppercase tracking-wider ${errors.authorized ? 'text-alert' : 'text-code'} group-hover:text-paper transition-colors select-none`}>
                         {SITE_CONTENT.modal.authorizeLabel}
                    </span>
                </div>

                {/* Submit */}
                <button 
                    id="modal-submit-btn"
                    onClick={handleFinalSubmit}
                    className="w-full mt-2 border border-code/50 hover:border-gold text-paper hover:text-gold py-4 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/5 hover-trigger"
                >
                     {SITE_CONTENT.modal.submitText}
                </button>
            </div>
            
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r border-b border-gold/50"></div>
            <div className="absolute -top-1 -left-1 w-4 h-4 border-l border-t border-gold/50"></div>
        </div>
    </div>
    </>
  );
};

export default Footer;