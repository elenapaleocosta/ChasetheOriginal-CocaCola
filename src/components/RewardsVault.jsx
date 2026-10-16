import React, { useState } from 'react';
import { 
  Gift, 
  Lock, 
  Check, 
  Smartphone, 
  Radio, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { REWARDS_CATALOG } from '../data/campaignData';
import { playTap, playSuccess, playNfcPing, playDispense } from '../utils/audio';

export default function RewardsVault({
  availablePoints,
  totalPoints,
  userLevel,
  vaultItems,
  onRedeemItem,
  onRemoveFromVault,
  onDispenseItem,
  onGoToAvatar,
  dispenseTargetItem,
  setDispenseTargetItem,
}) {
  const [activeSubTab, setActiveSubTab] = useState('catalog'); // 'catalog' | 'vault'
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'merch' | 'tech' | 'vouchers'
  const [dispenseState, setDispenseState] = useState('idle'); // 'idle' | 'tapping' | 'verifying' | 'dispensed'

  const handleResetItem = (catalogId, cost = 0) => {
    playTap();
    if (onRemoveFromVault) {
      onRemoveFromVault(catalogId, cost);
    }
  };

  // Filter catalog items
  const filteredItems = REWARDS_CATALOG.filter((item) => {
    if (categoryFilter === 'all') return true;
    return item.category === categoryFilter;
  });

  const handlePurchase = (item) => {
    playTap();
    if (availablePoints < item.cost) return;
    if (userLevel < item.requiredLevel) return;

    onRedeemItem(item);
    playSuccess();
    setActiveSubTab('vault');
  };

  const handleStartDispense = (item) => {
    playTap();
    setDispenseTargetItem(item);
    setDispenseState('tapping');
    playNfcPing();

    setTimeout(() => {
      setDispenseState('verifying');
      playDispense();
    }, 1400);

    setTimeout(() => {
      setDispenseState('dispensed');
      onDispenseItem(item.id);
    }, 2800);
  };

  const closeDispenseModal = () => {
    setDispenseTargetItem(null);
    setDispenseState('idle');
  };

  const pendingVaultCount = vaultItems.filter(i => i.status === 'ready').length;

  return (
    <div className="w-full space-y-4">
      
      {/* Spendable Balance Banner in Vault */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141414] border border-zinc-800 shadow-sm">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
            Διαθεσιμο Υπολοιπο Vault
          </span>
          <div className="text-lg font-bold font-mono text-[#F40009]">
            {availablePoints.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">PTS</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
            Hunter Status
          </span>
          <div className="text-xs font-bold font-mono text-white">
            Level {userLevel} // {totalPoints.toLocaleString()} XP
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation (Catalog vs User Vault) */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
        <button
          onClick={() => { playTap(); setActiveSubTab('catalog'); }}
          className={`py-2 px-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all ${
            activeSubTab === 'catalog'
              ? 'bg-[#141414] text-white border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Καταλογος Δωρων
        </button>

        <button
          onClick={() => { playTap(); setActiveSubTab('vault'); }}
          className={`relative py-2 px-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'vault'
              ? 'bg-[#141414] text-white border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Το Vault μου</span>
          {pendingVaultCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#F40009] text-white text-[9px] font-mono">
              {pendingVaultCount}
            </span>
          )}
        </button>
      </div>

      {/* VIEW 1: REWARDS CATALOG */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-3.5">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'Όλα' },
              { id: 'merch', label: 'Exclusive Merch' },
              { id: 'tech', label: 'Tech & Gadgets' },
              { id: 'vouchers', label: 'Vouchers' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => { playTap(); setCategoryFilter(cat.id); }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap transition-colors uppercase ${
                  categoryFilter === cat.id
                    ? 'bg-zinc-800 text-white border border-[#F40009]/80'
                    : 'bg-[#141414] border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of Rewards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredItems.map((item) => {
              const isLockedByLevel = userLevel < item.requiredLevel;
              const hasEnoughPoints = availablePoints >= item.cost;
              const isOwnedInVault = vaultItems.some(v => v.catalogId === item.id);

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#141414] border border-zinc-800 p-3.5 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-all shadow-md"
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono font-bold text-zinc-400 uppercase">
                      {item.tag}
                    </span>

                    <div className="flex items-center gap-1">
                      {isOwnedInVault && (
                        <span 
                          onClick={() => { playTap(); setActiveSubTab('vault'); }}
                          className="px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900/60 text-[9px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:bg-emerald-900/40"
                          title="Δες το στο Vault"
                        >
                          <Check className="w-2.5 h-2.5" /> Στο Vault
                        </span>
                      )}

                      {isLockedByLevel ? (
                        <span className="px-2 py-0.5 rounded bg-red-950/40 text-red-400 border border-red-900/60 text-[9px] font-mono font-bold flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Level {item.requiredLevel}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900/60 text-[9px] font-mono font-bold">
                          Level {item.requiredLevel}+
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Asset Preview Area - Background-free floating presentation */}
                  <div className="relative w-full h-32 rounded-xl bg-gradient-to-b from-zinc-900/50 via-zinc-950/80 to-black border border-zinc-800/80 mb-3 flex items-center justify-center p-3 overflow-hidden">
                    {/* Subtle spotlight glow behind transparent gift */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_75%)] pointer-events-none" />

                    {/* Partner SVG for Vouchers */}
                    {item.partnerSvg ? (
                      <div className="w-24 h-24 flex items-center justify-center relative z-10">
                        <img 
                          src={item.partnerSvg} 
                          alt={item.title} 
                          className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      /* Merch / Tech Photo with transparent background */
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="max-h-full max-w-full object-contain relative z-10 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    {/* Stamped Argyros Signature Overlay over Exclusive Merch */}
                    {item.hasSignature && (
                      <div className="absolute bottom-1.5 right-1.5 w-24 h-9 pointer-events-none opacity-90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] z-20">
                        <img 
                          src="/Pics/argyros-signature.svg" 
                          alt="Official Signature Κωνσταντίνος Αργυρός" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="mb-3">
                    <h4 className="text-sm font-bold text-white leading-snug group-hover:text-[#F40009] transition-colors">
                      {item.greekTitle}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action Button */}
                  <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <div className="font-mono leading-none">
                      <span className="text-xs text-zinc-500 uppercase block text-[9px] mb-0.5">Κοστος</span>
                      <span className="text-sm font-bold text-[#F40009]">
                        {item.cost.toLocaleString()} <span className="text-[10px] text-zinc-400 font-normal">PTS</span>
                      </span>
                    </div>

                    {isLockedByLevel ? (
                      <button
                        disabled
                        className="py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-600 font-mono text-[10px] font-bold uppercase cursor-not-allowed flex items-center gap-1"
                      >
                        <Lock className="w-3 h-3" /> Κλειδωμένο
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item)}
                        className="py-1.5 px-3.5 rounded-lg bg-[#F40009] hover:bg-[#d60008] text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(244,0,9,0.3)] active:scale-95"
                      >
                        Αποκτηση
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* VIEW 2: USER VAULT ("Το Θησαυροφυλάκιό μου") */}
      {activeSubTab === 'vault' && (
        <div className="space-y-3.5">
          
          <div className="p-3 rounded-xl bg-gradient-to-r from-zinc-900 to-[#141414] border border-zinc-800 text-xs">
            <div className="font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#F40009]" /> Το Θησαυροφυλακιο μου
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Τα αντικείμενα που έχεις κατοχυρώσει. Επισκέψου οποιοδήποτε Smart Vending Hub και κάνε ανέπαφο Contactless Tap (NFC) για άμεση εξαγωγή!
            </p>
          </div>

          {vaultItems.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#141414] border border-zinc-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-600">
                <Gift className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">Το Vault σου είναι ακόμα άδειο</h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Εξαργύρωσε πόντους από τον Κατάλογο Δώρων για να αποκτήσεις Secure Vending Passes.
              </p>
              <button
                onClick={() => { playTap(); setActiveSubTab('catalog'); }}
                className="py-2 px-4 rounded-xl bg-[#F40009] text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                Εξερευνηση Καταλογου
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {vaultItems.map((item) => {
                const isReady = item.status === 'ready';

                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#141414] border border-zinc-800 hover:border-zinc-700 transition-all flex items-center justify-between gap-3 shadow-md"
                  >
                    {/* Item info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-black border border-zinc-800 p-1 flex items-center justify-center shrink-0">
                        {item.partnerSvg ? (
                          <img src={item.partnerSvg} alt={item.title} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {isReady ? (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[8px] font-mono font-bold uppercase">
                              Tap-Ready NFC Pass
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 text-[8px] font-mono font-bold uppercase">
                              Εξαργυρώθηκε
                            </span>
                          )}
                          <span className="text-[9px] font-mono text-zinc-500">
                            {item.token}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-white truncate">
                          {item.title}
                        </h4>

                        <span className="text-[10px] text-zinc-400 font-mono">
                          {item.date} // {item.cost} PTS
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      {isReady ? (
                        <button
                          onClick={() => handleStartDispense(item)}
                          className="py-2 px-3 rounded-xl bg-[#F40009] hover:bg-[#d60008] text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(244,0,9,0.3)] transition-all"
                        >
                          <Smartphone className="w-3.5 h-3.5" /> Tap Dispense
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
                          <Check className="w-3.5 h-3.5" /> Dispensed
                        </div>
                      )}

                      <button
                        onClick={() => handleResetItem(item.catalogId || item.id, item.cost)}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-[#F40009] hover:border-zinc-700 transition-colors"
                        title="Αφαίρεση / Reset αντικειμένου για νέα δοκιμή"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* Contactless Tap & Dispense Simulation Modal */}
      {dispenseTargetItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeDispenseModal}
        >
          <div 
            className="w-full max-w-sm bg-[#141414] border border-zinc-800 rounded-3xl p-6 text-white text-center shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button 
              onClick={closeDispenseModal}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-xs"
            >
              ✕
            </button>

            {/* Stage 1: Tapping Animation */}
            {dispenseState === 'tapping' && (
              <div className="py-6 space-y-4">
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full border-2 border-[#F40009] animate-ping opacity-60" />
                  <span className="absolute inset-3 rounded-full border border-[#F40009] animate-pulse" />
                  <div className="w-16 h-16 rounded-full bg-[#F40009]/20 border border-[#F40009] flex items-center justify-center text-[#F40009]">
                    <Smartphone className="w-8 h-8 animate-bounce" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#F40009] uppercase tracking-widest block">
                    NFC CONTACTLESS HANDSHAKE
                  </span>
                  <h3 className="text-base font-bold text-white font-display uppercase">
                    Πλησιάστε το κινητό στο Vending Hub
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Κρυπτογραφημένο Rolling Token: {dispenseTargetItem.token}
                  </p>
                </div>
              </div>
            )}

            {/* Stage 2: Verifying & Mechanical Dispense */}
            {dispenseState === 'verifying' && (
              <div className="py-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-700 mx-auto flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-[#F40009] border-t-transparent rounded-full animate-spin" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                    ΕΠΑΛΗΘΕΥΣΗ SESSION & ΜΗΧΑΝΙΣΜΟΣ ΕΞΑΓΩΓΗΣ
                  </span>
                  <h3 className="text-base font-bold text-white font-display uppercase">
                    Εξαγωγή {dispenseTargetItem.title}...
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Έλεγχος αισθητήρα βάρους & ξεκλείδωμα θυρίδας παραλαβής
                  </p>
                </div>
              </div>
            )}

            {/* Stage 3: Dispensed Successfully */}
            {dispenseState === 'dispensed' && (
              <div className="py-3 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                    ΕΠΙΤΥΧΗΣ ΕΞΑΡΓΥΡΩΣΗ & ΕΞΑΓΩΓΗ
                  </span>
                  <h3 className="text-lg font-bold text-white font-display uppercase">
                    Το δώρο εξήχθη από το Vending Hub!
                  </h3>
                  <p className="text-xs text-zinc-400 leading-snug">
                    Παραλάβετε το <strong className="text-white">{dispenseTargetItem.title}</strong> από την υποδοχή του μηχανήματος.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={closeDispenseModal}
                    className="py-2.5 rounded-xl bg-zinc-800 text-white font-mono text-xs font-bold uppercase hover:bg-zinc-700 transition-colors"
                  >
                    Κλεισιμο
                  </button>

                  <button
                    onClick={() => {
                      closeDispenseModal();
                      if (onGoToAvatar) onGoToAvatar();
                    }}
                    className="py-2.5 rounded-xl bg-[#F40009] text-white font-mono text-xs font-bold uppercase hover:bg-[#d60008] transition-colors"
                  >
                    Avatar Studio
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
