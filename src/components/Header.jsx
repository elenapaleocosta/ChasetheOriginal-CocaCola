import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { playTap } from '../utils/audio';

export default function Header({ activeTab, setActiveTab }) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const touchStartYRef = useRef(null);

  // Auto-hide when scrolling/sliding down, reveal when scrolling up or at top
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Always visible near top of the page
          if (currentScrollY <= 20) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollYRef.current + 8 && currentScrollY > 50) {
            // Scrolling / sliding down -> slide banner up (hide)
            setIsVisible(false);
          } else if (currentScrollY < lastScrollYRef.current - 8) {
            // Scrolling / sliding up -> slide banner down (reveal)
            setIsVisible(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset to visible whenever user switches tabs
  useEffect(() => {
    setIsVisible(true);
  }, [activeTab]);

  // Touch gesture support: swipe up on the header to slide it up
  const handleTouchStart = (e) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (touchStartYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = touchStartYRef.current - currentY;
    // If swiped upwards by > 25px, slide header up
    if (diff > 25) {
      setIsVisible(false);
      touchStartYRef.current = null;
    }
  };

  return (
    <>
      <header 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`sticky top-0 z-40 w-full bg-[#0B0B0B]/95 backdrop-blur-md border-b border-zinc-800/80 px-2 sm:px-3 pt-[max(env(safe-area-inset-top,8px),8px)] pb-3 transition-transform duration-300 ease-in-out will-change-transform ${
          isVisible 
            ? 'translate-y-0 pointer-events-auto' 
            : '-translate-y-full pointer-events-none'
        }`}
      >
        <div className="max-w-md mx-auto">
          {/* Full-width prominently sized Campaign Badge Banner */}
          <div 
            onClick={() => {
              playTap();
              if (setActiveTab) setActiveTab('map');
            }}
            className="w-full cursor-pointer transition-transform active:scale-[0.99] flex items-center justify-center px-1"
            title="Chase the Original - Coca-Cola × Κωνσταντίνος Αργυρός"
          >
            <img 
              src="/Pics/campaign-badge.svg" 
              alt="Coca-Cola Original Taste – Chase the Original × Κ. Αργυρός" 
              className="w-full h-auto max-h-36 sm:max-h-40 object-contain drop-shadow-[0_6px_22px_rgba(244,0,9,0.3)] filter contrast-105"
            />
          </div>
        </div>
      </header>

      {/* Discreet floating pill to restore banner on tap if hidden */}
      {!isVisible && (
        <button
          onClick={() => {
            playTap();
            setIsVisible(true);
          }}
          className="fixed top-2 left-1/2 -translate-x-1/2 z-40 px-3 py-1 bg-black/80 hover:bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-mono text-zinc-400 hover:text-white shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95 animate-fadeIn"
          title="Εμφάνιση banner"
        >
          <img src="/Pics/campaign-badge.svg" alt="" className="w-3.5 h-3.5 object-contain" />
          <span className="tracking-wider uppercase font-bold text-[9px]">Chase the Original</span>
          <ChevronDown className="w-3 h-3 text-[#F40009]" />
        </button>
      )}
    </>
  );
}

