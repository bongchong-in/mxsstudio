
import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { SITE_CONTENT, COUNTRIES } from '../data/content';

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    handle: string;
    onSuccess: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, handle, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [phone, setPhone] = useState('');
    const [authorized, setAuthorized] = useState(false);
    const [errors, setErrors] = useState<{email?: string, phone?: string, authorized?: string}>({});
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const filteredCountries = useMemo(() => {
        return COUNTRIES.filter(c => 
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          c.code.includes(searchQuery)
        );
    }, [searchQuery]);

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
        if (isOpen) {
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
    }, [isOpen]);

    const selectCountry = (code: string) => {
        setCountryCode(code);
        setIsDropdownOpen(false);
        setSearchQuery('');
    };

    const handleFinalSubmit = async () => {
        const newErrors: {email?: string, phone?: string, authorized?: string} = {};
        let isValid = true;
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          newErrors.email = "INVALID EMAIL";
          isValid = false;
        }
    
        const phoneRegex = /^\d{6,14}$/;
        if (!countryCode) {
            newErrors.phone = "SELECT CODE";
            isValid = false;
        } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
          newErrors.phone = "INVALID NUMBER";
          isValid = false;
        }
    
        if (!authorized) {
            newErrors.authorized = "AUTHORIZATION REQUIRED";
            isValid = false;
        }
    
        setErrors(newErrors);
    
        if (isValid) {
          const btn = submitBtnRef.current;
          
          try {
            if (btn) btn.innerText = "TRANSMITTING...";
    
            const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd0uTXvBkYY8iJmhvR6-9SzdV55yriZR12nzbQpPCHhIiHmoA/formResponse";
            
            const formData = new FormData();
            formData.append('entry.316619129', handle); // Instagram Handle
            formData.append('entry.2004379225', email); // Email
            formData.append('entry.1663992994', `${countryCode} ${phone}`); // Mobile Number
    
            await fetch(GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
    
            if (btn) btn.innerText = SITE_CONTENT.modal.successText;
            
            setTimeout(() => {
                onSuccess();
                onClose();
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

    return (
        <div 
            ref={modalRef}
            className="fixed inset-0 z-[300] bg-void/95 backdrop-blur-md flex items-center justify-center opacity-0 pointer-events-none"
        >
            <div 
                ref={contentRef}
                className="w-full max-w-lg mx-6 p-8 border border-code/30 bg-black relative shadow-2xl"
            >
                <button 
                    onClick={onClose}
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
                            className={`w-full bg-transparent border-b ${errors.email ? 'border-alert text-alert' : 'border-code/30 text-paper'} py-2 font-mono text-sm focus:outline-none focus:border-gold transition-colors placeholder-white/20`}
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
                                    className={`w-full bg-transparent border-b ${errors.phone ? 'border-alert text-alert' : 'border-code/30 text-paper'} py-2 font-mono text-sm focus:outline-none focus:border-gold transition-colors placeholder-white/20`}
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
                        <span className={`font-mono text-[10px] uppercase tracking-wider ${errors.authorized ? 'text-alert' : 'text-code/80'} group-hover:text-paper transition-colors select-none`}>
                             {SITE_CONTENT.modal.authorizeLabel}
                        </span>
                    </div>
    
                    {/* Submit */}
                    <button 
                        ref={submitBtnRef}
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
    );
};

export default VerificationModal;
