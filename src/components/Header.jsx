import React from 'react';
import { playTap } from '../utils/audio';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0B0B]/95 backdrop-blur-md border-b border-zinc-800/80 px-2 sm:px-3 pt-[max(env(safe-area-inset-top,8px),8px)] pb-3 transition-all">
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
  );
}
