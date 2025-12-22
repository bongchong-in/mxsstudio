import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SITE_CONTENT } from '../data/content';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // We do not unmount immediately to allow smooth exit, 
        // passing callback to parent
        onComplete();
      }
    });

    // Updated animation: Line now fades in to match text effect
    tl.to(lineRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut'
    })
    .to(textRef.current, {
      opacity: 1,
      duration: 0.5
    }, "-=0.5")
    .to(containerRef.current, {
      height: 0,
      duration: 1,
      ease: 'expo.inOut',
      delay: 0.5
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <div 
          ref={textRef} 
          className="font-mono text-xs tracking-[0.5em] mb-4 text-code opacity-0"
        >
          {SITE_CONTENT.preloader.text}
        </div>
        <div 
          ref={lineRef} 
          className="h-[1px] bg-code w-64 opacity-0" 
        />
      </div>
    </div>
  );
};

export default Preloader;