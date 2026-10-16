import React, { useState, useEffect } from 'react';
import { Radio, ChevronRight, Volume2, Sparkles, MapPin, Clock } from 'lucide-react';
import { GAMEMASTER_CLUES } from '../data/campaignData';
import { playTap } from '../utils/audio';

export default function GamemasterBanner({ onSelectLocation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Auto rotate ticker every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GAMEMASTER_CLUES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentClue = GAMEMASTER_CLUES[currentIndex];

  return (
    <>
      <div 
        onClick={() => { playTap(); setShowModal(true); }}
        className="w-full bg-[#141414] border border-zinc-800 rounded-2xl p-4 cursor-pointer relative overflow-hidden group hover:border-zinc-700 transition-all shadow-xl"
      >
        {/* Subtle red background glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#F40009]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          
          {/* Portrait Container - Larger & More Cinematic */}
          <div className="relative shrink-0 w-20 h-24 rounded-xl overflow-hidden bg-black border border-zinc-700/80 group-hover:border-[#F40009]/80 transition-colors shadow-md">
            <img 
              src="/Pics/argyros-gamemaster-portrait.png" 
              alt="Κωνσταντίνος Αργυρός - The Gamemaster" 
              className="w-full h-full object-cover object-top filter brightness-105 group-hover:scale-105 transition-transform duration-300"
            />
            {/* Live indicator dot (static) */}
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F40009]" />
            </span>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent py-1 px-0.5 text-center">
              <span className="text-[8px] font-mono font-bold tracking-tight text-white uppercase">
                Gamemaster
              </span>
            </div>
          </div>

          {/* Ticker Content */}
          <div className="flex-1 min-w-0">
            {/* Tag line */}
            <div className="flex items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-[#F40009] flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 animate-pulse" /> {currentClue.tag}
                </span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">
                {currentClue.timeRemaining}
              </span>
            </div>

            {/* Title & Short Text */}
            <h4 className="text-xs font-bold text-white tracking-tight truncate mb-1">
              {currentClue.title}
            </h4>
            <p className="text-[11px] text-zinc-300 leading-snug line-clamp-2">
              {currentClue.shortText}
            </p>

            {/* Micro bottom row */}
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-zinc-800/60 text-[9px] font-mono text-zinc-400">
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-2.5 h-2.5 text-[#F40009]" /> {currentClue.location}
              </span>
              <span className="text-[#F40009] font-semibold flex items-center gap-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform">
                Ανάγνωση <ChevronRight className="w-3 h-3" />
              </span>
            </div>

          </div>

        </div>

        {/* Carousel slide indicators */}
        <div className="flex justify-center gap-1 mt-2.5">
          {GAMEMASTER_CLUES.map((clue, idx) => (
            <button
              key={clue.id}
              onClick={(e) => {
                e.stopPropagation();
                playTap();
                setCurrentIndex(idx);
              }}
              className={`h-1 rounded-full transition-all ${
                idx === currentIndex ? 'w-5 bg-[#F40009]' : 'w-1.5 bg-zinc-800'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Gamemaster Transmission Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-3 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-sm bg-[#141414] border border-zinc-800 rounded-2xl p-5 text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-xs"
            >
              ✕
            </button>

            {/* Header with portrait */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-16 rounded-xl overflow-hidden border border-[#F40009]/60 shrink-0 bg-black">
                <img 
                  src="/Pics/argyros-gamemaster-portrait.png" 
                  alt="Konstantinos Argyros" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#F40009] font-bold tracking-widest uppercase block">
                  ΕΠΙΣΗΜΟ GAMEMASTER DISPATCH
                </span>
                <h3 className="text-base font-bold font-display uppercase tracking-tight text-white">
                  Κωνσταντίνος Αργυρός
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {currentClue.tag} // {currentClue.timeRemaining}
                </span>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 relative mb-4">
              <div className="text-[13px] italic font-serif leading-relaxed text-zinc-200">
                {currentClue.fullQuote}
              </div>
            </div>

            {/* Info Row */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono mb-4">
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80">
                <span className="text-zinc-500 block mb-0.5">ΤΟΠΟΘΕΣΙΑ</span>
                <span className="text-white font-bold truncate block">{currentClue.location}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80">
                <span className="text-zinc-500 block mb-0.5">ΚΑΤΑΣΤΑΣΗ</span>
                <span className="text-emerald-400 font-bold">Ενεργό Τώρα</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  if (currentClue.id === 'clue-restock-1' && onSelectLocation) {
                    onSelectLocation('HUB-01');
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-[#F40009] hover:bg-[#d60008] text-white font-bold text-xs tracking-wider uppercase transition-colors"
              >
                Εντοπισμος στον Χαρτη
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
