import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  RotateCcw, 
  Share2, 
  ShieldCheck, 
  Layers, 
  Sliders, 
  Eye, 
  ZoomIn, 
  ZoomOut,
  Shirt,
  HardHat
} from 'lucide-react';
import { playTap, playSuccess } from '../utils/audio';

export default function AvatarStudio({
  gender,
  setGender,
  equipped,
  setEquipped,
  userLevel,
  totalPoints,
  unlockedWearables,
}) {
  const [zoomLevel, setZoomLevel] = useState('full'); // 'full' | 'close'
  const [toastMsg, setToastMsg] = useState('');

  const toggleEquip = (wearableKey) => {
    playTap();
    setEquipped((prev) => {
      const nextState = { ...prev, [wearableKey]: !prev[wearableKey] };
      showToast(nextState[wearableKey] ? `Εξοπλίστηκε: ${wearableKey}` : `Αφαιρέθηκε: ${wearableKey}`);
      return nextState;
    });
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleShare = () => {
    playSuccess();
    if (navigator.share) {
      navigator.share({
        title: 'Chase the Original - My Avatar',
        text: `Δες το δικό μου Chase the Original Avatar! Συνολικά XP: ${totalPoints}.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Ο σύνδεσμος αντιγράφηκε στο πρόχειρο!');
    }
  };

  const getAvatarImage = () => {
    if (gender === 'male') {
      if (equipped.hoodie && equipped.hat) {
        return '/Pics/avatar-both.jpg';
      }
      if (equipped.hoodie) {
        return '/Pics/avatar-male-wear-hoodie.jpg';
      }
      if (equipped.hat) {
        return '/Pics/avatar-male-wear-buckethat.jpg';
      }
      return '/Pics/avatar-base.png';
    } else {
      // female avatar
      if (equipped.hoodie) {
        return '/Pics/avatar-female-wear-hoodie.jpg';
      }
      return '/Pics/avatar-base-female.png';
    }
  };

  const currentAvatarImage = getAvatarImage();

  return (
    <div className="w-full space-y-4">
      {/* Main Avatar Stage & Layering Canvas Container */}
      <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#18181B] via-[#121212] to-[#0A0A0A] border border-zinc-800 p-4 overflow-hidden shadow-2xl">
        
        {/* Subtle studio spotlight backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#F40009]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Tactical Crosshairs & Grid Background */}
        <div className="absolute inset-0 tactical-grid opacity-30 pointer-events-none" />

        {/* Canvas Controls: Gender & Zoom */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between">
          
          {/* Gender / Base Toggle (Prompt requirement) */}
          <div className="p-1 rounded-xl bg-black/80 border border-zinc-800 backdrop-blur-md flex items-center gap-1">
            <button
              onClick={() => { playTap(); setGender('male'); }}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                gender === 'male'
                  ? 'bg-[#F40009] text-white shadow-[0_0_8px_#F40009]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => { 
                playTap(); 
                setGender('female'); 
                setEquipped(prev => ({ ...prev, hat: false }));
              }}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                gender === 'female'
                  ? 'bg-[#F40009] text-white shadow-[0_0_8px_#F40009]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Female
            </button>
          </div>

          {/* Zoom Toggle */}
          <button
            onClick={() => {
              playTap();
              setZoomLevel(zoomLevel === 'full' ? 'close' : 'full');
            }}
            className="p-2 rounded-xl bg-black/80 border border-zinc-800 backdrop-blur-md text-zinc-400 hover:text-white transition-colors"
            title="Zoom View"
          >
            {zoomLevel === 'full' ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
          </button>

        </div>

        {/* THE AVATAR CANVAS */}
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden my-2">
          
          <div 
            className={`relative w-full h-full max-w-[280px] transition-transform duration-500 ease-out flex items-center justify-center ${
              zoomLevel === 'close' ? 'scale-[1.8] translate-y-28' : 'scale-100 translate-y-0'
            }`}
          >

            {/* AVATAR RENDERED IMAGE */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <img
                key={currentAvatarImage}
                src={currentAvatarImage}
                alt={`${gender} avatar`}
                className="max-h-full max-w-full object-contain filter contrast-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] animate-fadeIn"
              />
            </div>

          </div>

        </div>

        {/* Bottom Stage Overlay: Active Equipped Badges */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[10px] font-mono">
          <div className="flex items-center gap-1 text-zinc-400">
            <Layers className="w-3 h-3 text-[#F40009]" />
            <span>Active Layers:</span>
            <span className="text-white font-bold">
              Base ({gender})
              {equipped.hoodie && ' + Hoodie'}
              {gender === 'male' && equipped.hat && ' + Hat'}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
          >
            <Share2 className="w-3 h-3" /> Share Look
          </button>
        </div>

      </div>

      {/* Wardrobe Inventory (Physical-to-Digital Sync Directives) */}
      <div className="p-4 rounded-2xl bg-[#141414] border border-zinc-800 shadow-md space-y-3">
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Shirt className="w-3.5 h-3.5 text-[#F40009]" /> Wardrobe Inventory & Digital Twins
            </h3>
            <p className="text-[10px] text-zinc-400 mt-0.5">
              Ψηφιακά wearables που ξεκλειδώνονται μέσω του Rewards Vault
            </p>
          </div>

          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
            {gender === 'female' 
              ? `${equipped.hoodie ? 1 : 0}/1 Equipped`
              : `${Object.values(equipped).filter(Boolean).length}/2 Equipped`}
          </span>
        </div>

        {/* Wearables Grid */}
        <div className={`grid gap-2.5 ${gender === 'female' ? 'grid-cols-1 max-w-sm mx-auto' : 'grid-cols-2'}`}>
          
          {/* Wearable 1: Bucket Hat (Only available for male avatar) */}
          {gender === 'male' && (
            <div className={`p-3 rounded-xl border transition-all ${
              equipped.hat 
                ? 'bg-zinc-900/90 border-[#F40009]/80 shadow-[0_0_12px_rgba(244,0,9,0.2)]' 
                : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
            }`}>
              <div className="w-full h-20 rounded-lg bg-black/60 border border-zinc-800 p-1 flex items-center justify-center mb-2">
                <img 
                  src="/Pics/avatar-wearable-hat-transparent.png" 
                  alt="Bucket Hat" 
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                />
              </div>

              <div className="text-[11px] font-bold text-white truncate">
                Original Bucket Hat
              </div>
              <div className="text-[9px] font-mono text-zinc-500 mb-2">
                Head Layer // z-20
              </div>

              <button
                onClick={() => toggleEquip('hat')}
                className={`w-full py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                  equipped.hat
                    ? 'bg-[#F40009] text-white shadow-sm'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                {equipped.hat ? '✓ Equipped' : 'Equip Hat'}
              </button>
            </div>
          )}

          {/* Wearable 2: Tour Hoodie */}
          <div className={`p-3 rounded-xl border transition-all ${
            equipped.hoodie 
              ? 'bg-zinc-900/90 border-[#F40009]/80 shadow-[0_0_12px_rgba(244,0,9,0.2)]' 
              : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
          }`}>
            <div className="w-full h-20 rounded-lg bg-black/60 border border-zinc-800 p-1 flex items-center justify-center mb-2">
              <img 
                src="/Pics/avatar-wearable-hoodie-transparent.png" 
                alt="Tour Hoodie" 
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div className="text-[11px] font-bold text-white truncate">
              Tour Hoodie 2026
            </div>
            <div className="text-[9px] font-mono text-zinc-500 mb-2">
              Torso Layer // z-10
            </div>

            <button
              onClick={() => toggleEquip('hoodie')}
              className={`w-full py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                equipped.hoodie
                  ? 'bg-[#F40009] text-white shadow-sm'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {equipped.hoodie ? '✓ Equipped' : 'Equip Hoodie'}
            </button>
          </div>

        </div>

      </div>

      {/* Micro Toast */}
      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-black/90 border border-[#F40009]/80 text-white text-xs font-mono font-bold shadow-2xl backdrop-blur-md animate-fadeIn">
          {toastMsg}
        </div>
      )}

    </div>
  );
}
