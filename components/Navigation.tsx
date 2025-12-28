
import React, { useState, useEffect } from 'react';
import { SITE_CONTENT } from '../data/content';

interface NavigationProps {
  currentView: 'home' | 'about';
  onViewChange: (view: 'home' | 'about') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Check if we are close to the bottom (within 50px buffer)
      if (docHeight - scrollPosition < 50) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed inset-0 pointer-events-none z-50 block mix-blend-difference text-paper">
      {/* Top Left - Logo (Home) */}
      <div 
        onClick={() => {
            onViewChange('home');
            scrollToTop();
        }}
        className={`absolute top-4 left-4 md:top-6 md:left-6 font-mono text-sm pointer-events-auto hover-trigger cursor-pointer select-none transition-colors ${currentView === 'home' ? 'text-gold' : 'text-paper hover:text-gold'}`}
      >
        {SITE_CONTENT.general.logo}
      </div>

      {/* Top Center-Left - Studio Link */}
      <div 
        onClick={() => {
            if (currentView === 'home') {
                onViewChange('about');
                scrollToTop();
            } else {
                onViewChange('home');
                scrollToTop();
            }
        }}
        className={`absolute top-4 left-20 md:top-6 md:left-24 font-mono text-sm pointer-events-auto hover-trigger cursor-pointer uppercase tracking-widest transition-colors select-none ${currentView === 'about' ? 'text-gold line-through' : 'text-paper hover:text-gold'}`}
      >
        {SITE_CONTENT.navigation.studio}
      </div>

      {/* Top Right - Action */}
      <div 
        onClick={scrollToFooter}
        className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-sm pointer-events-auto hover-trigger cursor-none uppercase tracking-widest hover:text-gold transition-colors select-none"
      >
        {SITE_CONTENT.navigation.apply}
      </div>

      {/* Bottom Left - Direction */}
      <div 
        onClick={isAtBottom ? scrollToTop : undefined}
        className={`absolute bottom-4 left-4 md:bottom-6 md:left-6 font-mono text-xs text-code animate-pulse select-none transition-all duration-300 ${isAtBottom ? 'pointer-events-auto cursor-pointer hover:text-gold hover-trigger' : ''}`}
      >
        {isAtBottom ? SITE_CONTENT.navigation.backToTop : SITE_CONTENT.navigation.scrollDown}
      </div>

      {/* Bottom Right - Version */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 font-mono text-xs text-code select-none">
        {SITE_CONTENT.general.version}
      </div>
    </nav>
  );
};

export default Navigation;
