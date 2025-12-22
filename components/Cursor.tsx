import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    
    if (!dot || !ring) return;

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotX(mouseX);
      setDotY(mouseY);

      // Check for hover targets
      const target = e.target as HTMLElement;
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('input') || 
        target.closest('.hover-trigger')
      ) {
        document.body.classList.add('hovering');
      } else {
        document.body.classList.remove('hovering');
      }
    };

    const loop = () => {
        const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
        ringX += (mouseX - ringX) * dt;
        ringY += (mouseY - ringY) * dt;
        setRingX(ringX);
        setRingY(ringY);
    };

    window.addEventListener('mousemove', onMouseMove);
    gsap.ticker.add(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(loop);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
};

export default Cursor;