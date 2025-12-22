
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONTENT } from '../../data/content';

// Define interface for GalleryCard props to ensure type safety
interface GalleryCardProps {
  title: string;
  author: string;
  role: string;
  code: React.ReactNode;
  colorClass: string;
  image?: string;
}

// Subcomponents
const GalleryCard: React.FC<GalleryCardProps> = ({ 
  title, author, role, code, colorClass, image 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    gsap.to(cardRef.current, {
      transformPerspective: 1000,
      rotationX: ((y - centerY) / centerY) * -5,
      rotationY: ((x - centerX) / centerX) * 5,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { 
      rotationX: 0, 
      rotationY: 0, 
      duration: 0.5, 
      ease: "power2.out" 
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="gallery-card relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] max-h-[70vh] bg-white/5 border border-white/10 hover-trigger group transform-style-3d flex-shrink-0"
    >
      <div className="visual-view absolute inset-0 p-8 flex flex-col justify-between z-10 transition-opacity duration-500 group-hover:opacity-20">
        <div className="w-full h-2/3 bg-black/50 relative overflow-hidden border border-white/5">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 transition-transform duration-700 group-hover:scale-105" 
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
            <span className="font-serif italic text-2xl text-white/90 drop-shadow-lg text-center px-4">{title}</span>
          </div>
        </div>
        <div className="text-left">
          <p className="font-serif text-xl text-paper">{author}</p>
          <p className="font-mono text-xs text-code mt-2">{role}</p>
        </div>
      </div>
      
      <div className={`x-ray-view absolute inset-0 z-0 p-6 font-mono text-[10px] ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden leading-tight bg-[#0a0a0a]`}>
        {code}
      </div>
    </div>
  );
};

const ArchiveCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div 
      onClick={onClick}
      className="gallery-card relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] max-h-[70vh] bg-void border border-dashed border-code/60 flex items-center justify-center hover-trigger group cursor-pointer flex-shrink-0"
    >
      <div className="text-center group-hover:text-gold transition-colors duration-300">
        <p className="font-mono text-sm tracking-widest uppercase mb-4 text-paper group-hover:text-gold">{SITE_CONTENT.gallery.archiveCard.title}</p>
        <span className="font-serif text-4xl inline-block transition-transform duration-300 group-hover:translate-x-2 text-paper group-hover:text-gold">&rarr;</span>
        <p className="font-mono text-[10px] text-code mt-8 opacity-0 group-hover:opacity-100 transition-opacity uppercase">{SITE_CONTENT.gallery.archiveCard.subtitle}</p>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !sectionRef.current) return;

    const calculateWidth = () => {
       const travelDistance = wrapper.scrollWidth - window.innerWidth;
       return Math.max(0, travelDistance);
    };

    let ctx = gsap.context(() => {
      gsap.to(wrapper, {
        x: () => -calculateWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (wrapper.scrollWidth),
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);
    
    // Refresh ScrollTrigger after a slight delay to ensure all images are layout-ready
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="h-screen w-full relative overflow-hidden flex flex-col bg-void" id="gallery-section">
        
        <div className="w-full container mx-auto px-6 pt-12 md:pt-20 pb-8 md:pb-12 shrink-0 z-20 pointer-events-none">
          <h3 className="font-mono text-xs text-code tracking-[0.3em] uppercase pl-6">{SITE_CONTENT.gallery.header}</h3>
        </div>
        
        <div className="w-full flex-grow flex items-center relative z-10">
            <div ref={wrapperRef} className="gallery-wrapper flex flex-nowrap items-center pl-6 md:pl-24 pr-6 md:pr-24 gap-8 md:gap-32 w-max h-full">
            
            {SITE_CONTENT.gallery.cards.map((card, i) => (
                <GalleryCard key={`card-${i}`} {...card} />
            ))}

            <ArchiveCard onClick={() => setModalOpen(true)} />
            
            </div>
        </div>
      </section>

      {/* Extended Archive Modal */}
      <div className={`archive-modal fixed inset-0 z-50 bg-void/90 backdrop-blur-md flex items-center justify-center ${modalOpen ? 'open pointer-events-auto' : 'pointer-events-none'}`}>
        <div className="absolute inset-0" onClick={() => setModalOpen(false)}></div>
        
        <div className="relative z-10 w-full max-w-[95vw] md:max-w-[85vw] h-[90vh] bg-void border border-code/30 flex flex-col shadow-2xl overflow-hidden">
          
          <div className="flex justify-between items-center p-6 md:p-8 border-b border-code/30 bg-void z-20 shrink-0">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl text-paper">{SITE_CONTENT.gallery.archiveModal.title}</h3>
              <p className="font-mono text-[10px] text-code tracking-widest uppercase mt-2">{SITE_CONTENT.gallery.archiveModal.subtitle}</p>
            </div>
            <button 
              onClick={() => setModalOpen(false)} 
              className="group flex items-center gap-4 text-code hover:text-gold transition-colors hover-trigger"
            >
              <span className="font-mono text-xs uppercase tracking-widest hidden md:block">{SITE_CONTENT.gallery.archiveModal.closeText}</span>
              <div className="w-8 h-8 md:w-10 md:h-10 border border-current flex items-center justify-center transition-all duration-300 group-hover:rotate-90">
                <span className="font-light text-xl md:text-2xl leading-none font-serif">&times;</span>
              </div>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 md:p-12 bg-void/50">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-16 place-items-center">
              {SITE_CONTENT.gallery.archiveModal.items.map((item, i) => (
                <GalleryCard key={`archive-${i}`} {...item} />
              ))}
            </div>

            <div className="mt-24 mb-12 text-center">
              <div className="w-px h-16 bg-code/30 mx-auto mb-6"></div>
              <p className="font-mono text-[10px] text-code uppercase tracking-widest">{SITE_CONTENT.gallery.archiveModal.endText}</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Gallery;
