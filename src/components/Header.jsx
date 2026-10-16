import React, { useState } from 'react';
import { Sparkles, Trophy, ChevronRight, ShieldCheck, Ticket } from 'lucide-react';
import { playTap } from '../utils/audio';

export default function Header({
  availablePoints,
  totalPoints,
  activeTab,
  setActiveTab,
  gender,
  equipped,
}) {
  const [showWalletModal, setShowWalletModal] = useState(false);

  // Level & raffle calculation
  let currentLevel = 1;
  let levelName = "Starter Tier";
  if (totalPoints >= 5000) {
    currentLevel = 4;
    levelName = "The Escape MAX";
  } else if (totalPoints >= 3000) {
    currentLevel = 3;
    levelName = "Original Elite";
  } else if (totalPoints >= 1500) {
    currentLevel = 2;
    levelName = "Original Pioneer";
  } else if (totalPoints >= 500) {
    currentLevel = 1;
    levelName = "Starter Tier";
  }

  // Raffle entries: 1 entry at 5,000 PTS, +1 for each extra 1,000 PTS
  const raffleEntries = totalPoints >= 5000 ? 1 + Math.floor((totalPoints - 5000) / 1000) : 0;
  const progressPercent = Math.min(100, Math.round((totalPoints / 5000) * 100));

  const avatarSrc = gender === 'male' ? '/Pics/avatar-base.png' : '/Pics/avatar-base-female.png';

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0B0B0B]/95 backdrop-blur-md border-b border-zinc-800/80 px-3 pt-[max(env(safe-area-inset-top,8px),8px)] pb-2.5 transition-all">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Embedded Campaign Badge */}
          <div 
            onClick={() => { playTap(); setActiveTab('map'); }}
            className="cursor-pointer shrink-0 transition-transform active:scale-95"
            title="Chase the Original"
          >
            <img 
              src="/Pics/campaign-badge.svg" 
              alt="Chase the Original" 
              className="h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(244,0,9,0.2)]"
            />
          </div>

          {/* Center: Dual Wallet & Progress Bar */}
          <div 
            onClick={() => { playTap(); setShowWalletModal(true); }}
            className="flex-1 flex flex-col justify-center px-2 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between text-[11px] font-mono leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-zinc-400">Avail:</span>
                <span className="font-bold text-[#F40009]">{availablePoints.toLocaleString()}</span>
                <span className="text-[9px] text-zinc-500">PTS</span>
              </div>
              <div className="h-2.5 w-[1px] bg-zinc-700/60" />
              <div className="flex items-center gap-1">
                <span className="text-zinc-400">Total:</span>
                <span className="font-bold text-white">{totalPoints.toLocaleString()}</span>
                <span className="text-[9px] text-zinc-500">XP</span>
              </div>
            </div>

            {/* Subtle Progress Bar toward 5,000 PTS */}
            <div className="w-full mt-1.5 flex items-center gap-1.5">
              <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-[#F40009] to-[#ff474d] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[9px] font-mono font-semibold text-zinc-400 whitespace-nowrap">
                {totalPoints >= 5000 ? (
                  <span className="text-amber-400 flex items-center gap-0.5">
                    <Ticket className="w-2.5 h-2.5 inline" /> {raffleEntries} VIP
                  </span>
                ) : (
                  `${progressPercent}%`
                )}
              </span>
            </div>
          </div>

          {/* Right: Circular Avatar Thumbnail */}
          <div 
            onClick={() => { playTap(); setActiveTab('avatar'); }}
            className={`relative shrink-0 w-10 h-10 rounded-full p-[1.5px] cursor-pointer transition-transform active:scale-90 ${
              activeTab === 'avatar' 
                ? 'ring-2 ring-[#F40009] bg-zinc-900' 
                : 'ring-1 ring-zinc-700 hover:ring-zinc-500 bg-zinc-900'
            }`}
            title="My Avatar & Identity"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-800 relative">
              <img 
                src={avatarSrc} 
                alt="Avatar" 
                className="w-full h-full object-cover object-top scale-125 translate-y-1"
              />
              {/* Wearable mini indicator dot */}
              {(equipped.hoodie || equipped.hat) && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#F40009] ring-1 ring-black" />
              )}
            </div>
            
            {/* Level Badge pill */}
            <span className="absolute -bottom-1 -right-1 px-1 bg-black text-[#F40009] border border-zinc-800 text-[8px] font-mono font-extrabold rounded-full">
              L{currentLevel}
            </span>
          </div>

        </div>
      </header>

      {/* Dual Wallet Status Drawer / Modal */}
      {showWalletModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-fadeIn"
          onClick={() => setShowWalletModal(false)}
        >
          <div 
            className="w-full max-w-sm bg-[#141414] border border-zinc-800 rounded-2xl p-5 text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowWalletModal(false)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-xs"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#F40009]/10 border border-[#F40009]/30 flex items-center justify-center text-[#F40009]">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider font-display">Dual Wallet Architecture</h3>
                <p className="text-[11px] text-zinc-400">Επίσημο Σύστημα Πόντων Original Taste</p>
              </div>
            </div>

            {/* Dual Cards */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {/* Spendable */}
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Διαθεσιμοι
                </span>
                <div className="text-xl font-bold font-mono text-[#F40009]">
                  {availablePoints.toLocaleString()}
                </div>
                <p className="text-[10px] text-zinc-500 mt-1 leading-snug">
                  Ξόδεψε στο Rewards Vault & Smart Vending Hubs
                </p>
              </div>

              {/* Cumulative */}
              <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Συνολικοι XP
                </span>
                <div className="text-xl font-bold font-mono text-white">
                  {totalPoints.toLocaleString()}
                </div>
                <p className="text-[10px] text-zinc-500 mt-1 leading-snug">
                  Δεν μειώνεται ποτέ. Καθορίζει το Tier & Raffle.
                </p>
              </div>
            </div>

            {/* Progression Tier */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800/90 mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-zinc-300 font-medium">Τρέχον Επίπεδο:</span>
                <span className="font-bold text-[#F40009] font-mono uppercase">
                  Level {currentLevel} // {levelName}
                </span>
              </div>

              {/* Progress */}
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden my-2">
                <div 
                  className="h-full bg-gradient-to-r from-[#F40009] to-[#ff474d] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>0 PTS</span>
                <span>5,000 PTS (MAX TIER)</span>
              </div>
            </div>

            {/* Raffle Status */}
            <div className="p-3 rounded-xl bg-[#F40009]/5 border border-[#F40009]/20 flex items-start gap-3">
              <Ticket className="w-5 h-5 text-[#F40009] shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <div className="font-bold text-white uppercase tracking-wider">
                  Μεγαλη Κληρωση VIP Συναυλιας (Αργυρος)
                </div>
                <div className="text-zinc-400 mt-0.5">
                  {totalPoints >= 5000 ? (
                    <span className="text-emerald-400 font-semibold">
                      ✓ Έχεις κατοχυρώσει {raffleEntries} {raffleEntries === 1 ? 'συμμετοχή' : 'συμμετοχές'} για τα 4 VIP εισιτήρια!
                    </span>
                  ) : (
                    <span>
                      Χρειάζεσαι ακόμα <strong className="text-white font-mono">{5000 - totalPoints} PTS</strong> για αυτόματη είσοδο στην κλήρωση των 4 VIP εισιτηρίων συναυλίας!
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowWalletModal(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              Ενταξει
            </button>
          </div>
        </div>
      )}
    </>
  );
}
