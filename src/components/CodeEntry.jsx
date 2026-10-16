import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  HelpCircle, 
  Gift
} from 'lucide-react';
import { playSuccess, playTap } from '../utils/audio';

export default function CodeEntry({ 
  onClaimCode, 
  claimedCodes = [], 
  isFirstSubmission = true 
}) {
  const [codeInput, setCodeInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [flash2xActive, setFlash2xActive] = useState(true); // Argyros Flash Drop active

  // Format code input with auto uppercase and hyphen: XXX-XXXXX
  const handleInputChange = (e) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    
    // Auto-hyphen after 3 chars
    let formatted = val;
    if (val.length > 3) {
      formatted = `${val.slice(0, 3)}-${val.slice(3)}`;
    }
    setCodeInput(formatted);
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanCode = codeInput.trim().toUpperCase();

    // Validation
    const rawLength = cleanCode.replace('-', '').length;
    if (rawLength !== 8) {
      setErrorMsg('Ο κωδικός πρέπει να αποτελείται από 8 αλφαριθμητικούς χαρακτήρες (π.χ. ORIG-87X9).');
      return;
    }

    if (claimedCodes.some(c => c.code === cleanCode)) {
      setErrorMsg('Αυτός ο κωδικός έχει ήδη εξαργυρωθεί.');
      return;
    }

    // Calculation of points:
    // Base: +100 PTS per code
    // Welcome bonus: +100 PTS if first submission
    // Flash 2x: double points if Argyros flash drop active
    let basePoints = 100;
    if (flash2xActive) basePoints = 200; // 2x flash multiplier

    let welcomeBonus = 0;
    if (isFirstSubmission) {
      welcomeBonus = 100;
    }

    const totalAwarded = basePoints + welcomeBonus;

    onClaimCode({
      code: cleanCode,
      points: totalAwarded,
      basePoints,
      welcomeBonus,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    playSuccess();
    setSuccessData({
      code: cleanCode,
      points: totalAwarded,
      basePoints,
      welcomeBonus,
      isDouble: flash2xActive,
    });

    setCodeInput('');
    setErrorMsg('');
  };

  return (
    <div className="w-full space-y-4">

      {/* Gamemaster Flash Multiplier Notice Banner */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#F40009]/20 via-[#141414] to-zinc-900 border border-[#F40009]/40">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#F40009] animate-pulse" />
          <div className="text-[11px] leading-tight">
            <span className="font-bold text-white uppercase tracking-wider block font-mono">
              GAMEMASTER FLASH DROP ACTIVE
            </span>
            <span className="text-zinc-400">
              {flash2xActive ? '2x Points (+200 PTS) ανά κουτάκι Original Taste' : 'Standard 100 PTS'}
            </span>
          </div>
        </div>

        <button
          onClick={() => { playTap(); setFlash2xActive(!flash2xActive); }}
          className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${
            flash2xActive 
              ? 'bg-[#F40009] text-white shadow-[0_0_8px_#F40009]' 
              : 'bg-zinc-800 text-zinc-400'
          }`}
        >
          {flash2xActive ? '2X ON' : '1X STD'}
        </button>
      </div>

      {/* Hero Visual Reference: Physical Original Can Showcase */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#18181B] to-[#121212] border border-zinc-800 p-4 overflow-hidden shadow-lg">
        {/* Subtle red spotlight glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-[#F40009]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          {/* Coca-Cola Can Image */}
          <div className="relative w-28 h-44 shrink-0 flex items-center justify-center">
            <img 
              src="/Pics/coca-cola-can-original.png" 
              alt="Coca-Cola Original Taste Can with Scratch Sticker" 
              className="max-h-full max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] filter contrast-105"
            />
          </div>

          {/* Clean Info & Instruction */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F40009]/10 border border-[#F40009]/30 text-[9px] font-mono font-extrabold text-[#F40009] uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> Φυσικο Scratch Sticker
            </div>

            <h3 className="text-sm font-bold text-white tracking-tight leading-snug">
              Ξύσε το sticker στο κουτάκι σου
            </h3>

            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Βρες το ασημί sticker πάνω στο φυσικό σου κουτάκι <strong>Coca-Cola Original Taste</strong>, ξύσε το για να δεις τον 8ψήφιο κωδικό και πληκτρολόγησέ τον παρακάτω.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono">
              <span className="text-[#F40009] font-bold">+100 PTS</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-300">Original Taste Only</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Input & Validation Form (The Action Engine) */}
      <div className="p-4 rounded-2xl bg-[#141414] border border-zinc-800 shadow-md space-y-3.5">
        
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
            Εισαγωγη 8ψηφιου Κωδικου
          </label>
          <span className="text-[10px] font-mono text-zinc-500">
            Format: XXX-XXXXX
          </span>
        </div>

        {/* Input box */}
        <div className="relative">
          <input
            type="text"
            value={codeInput}
            onChange={handleInputChange}
            placeholder="π.χ. ORIG-87X9"
            maxLength={9}
            className="w-full bg-black/90 border-2 border-zinc-800 focus:border-[#F40009] rounded-xl px-4 py-3 text-lg font-mono font-bold tracking-widest text-center text-white placeholder-zinc-700 focus:outline-none transition-colors"
          />
          {codeInput && (
            <button
              onClick={() => setCodeInput('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-[#F40009] shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Mandatory Campaign Strict Notice */}
        <p className="text-[11px] text-zinc-400 italic text-center leading-relaxed">
          "Ισχύει αποκλειστικά για κωδικούς από scratch stickers σε κουτάκια Coca-Cola Original Taste."
        </p>

        {/* Submit CTA Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-xl bg-[#F40009] hover:bg-[#d60008] text-white font-mono font-extrabold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(244,0,9,0.35)] active:scale-[0.99]"
        >
          {flash2xActive ? 'VALIDATE & CLAIM +200 PTS (2X FLASH)' : 'VALIDATE & CLAIM +100 PTS'}
        </button>
      </div>

      {/* Claimed History List */}
      {claimedCodes.length > 0 && (
        <div className="p-3.5 rounded-xl bg-[#141414] border border-zinc-800 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono font-bold text-zinc-400 uppercase tracking-wider text-[11px]">
              Ιστορικο Εξαργυρωσεων ({claimedCodes.length})
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              Original Taste Only
            </span>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {claimedCodes.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/80 border border-zinc-800/60 font-mono text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-white">{item.code}</span>
                  <span className="text-[9px] text-zinc-500">({item.date})</span>
                </div>
                <span className="font-bold text-[#F40009]">
                  +{item.points} PTS
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Celebration Modal / Toast */}
      {successData && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSuccessData(null)}
        >
          <div 
            className="w-full max-w-sm bg-[#141414] border border-zinc-800 rounded-3xl p-6 text-white text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-[#F40009]/15 border border-[#F40009]/40 flex items-center justify-center mx-auto mb-3 text-[#F40009] shadow-[0_0_20px_rgba(244,0,9,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              ΚΩΔΙΚΟΣ ΕΠΙΚΥΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ
            </span>

            <h3 className="text-2xl font-bold font-mono tracking-tight text-white mb-1">
              +{successData.points} PTS!
            </h3>

            <p className="text-xs font-mono text-zinc-400 mb-4">
              Κωδικός: <span className="text-white font-bold">{successData.code}</span>
            </p>

            {/* Points breakdown */}
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-left text-xs font-mono space-y-1.5 mb-5">
              <div className="flex justify-between text-zinc-300">
                <span>Scratch Can Original:</span>
                <span className="text-[#F40009] font-bold">+{successData.basePoints} PTS</span>
              </div>

              {successData.welcomeBonus > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold border-t border-zinc-800/80 pt-1">
                  <span>Welcome First Code Bonus:</span>
                  <span>+{successData.welcomeBonus} PTS</span>
                </div>
              )}

              {successData.isDouble && (
                <div className="flex justify-between text-amber-400 font-bold border-t border-zinc-800/80 pt-1">
                  <span>Gamemaster 2x Flash Multiplier:</span>
                  <span>ACTIVE</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSuccessData(null)}
              className="w-full py-3 rounded-xl bg-[#F40009] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#d60008] transition-colors"
            >
              Συνεχεια
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
