import React from 'react';
import { playTap } from '../utils/audio';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0B0B]/95 backdrop-blur-md border-b border-zinc-800/80 px-3 pt-[max(env(safe-area-inset-top,8px),8px)] pb-2 transition-all">
      <div className="max-w-md mx-auto">
        {/* Full-width Campaign Badge Banner across the entire top header */}
        <div 
          onClick={() => {
            playTap();
            if (setActiveTab) setActiveTab('map');
          }}
          className="w-full cursor-pointer transition-transform active:scale-[0.99] flex items-center justify-center"
          title="Chase the Original - Coca-Cola × Κωνσταντίνος Αργυρός"
        >
          <img 
            src="/Pics/campaign-badge.svg" 
            alt="Coca-Cola Original Taste – Chase the Original × Κ. Αργυρός" 
            className="w-full h-auto max-h-20 sm:max-h-22 object-contain drop-shadow-[0_4px_14px_rgba(244,0,9,0.2)]"
          />
        </div>
      </div>
    </header>
  );
}
