import React from 'react';
import { MapPin, KeyRound, Gift, User, Camera } from 'lucide-react';
import { playTap } from '../utils/audio';

export default function Navigation({ activeTab, setActiveTab, vaultCount }) {
  const tabs = [
    {
      id: 'map',
      label: 'Hubs',
      greek: 'Χάρτης Hubs',
      icon: MapPin,
      badge: 'LIVE',
      badgeColor: 'bg-[#F40009]',
    },
    {
      id: 'code',
      label: 'Codes',
      greek: 'Scratch Can',
      icon: KeyRound,
      badge: '+100',
      badgeColor: 'bg-zinc-800 text-zinc-300',
    },
    {
      id: 'moments',
      label: 'Moments',
      greek: 'Original Moment',
      icon: Camera,
      badge: '+150',
      badgeColor: 'bg-[#F40009]',
    },
    {
      id: 'rewards',
      label: 'Vault',
      greek: 'Vault & Δώρα',
      icon: Gift,
      badge: vaultCount > 0 ? `${vaultCount}` : null,
      badgeColor: 'bg-[#F40009]',
    },
    {
      id: 'avatar',
      label: 'Avatar',
      greek: 'Ταυτότητα',
      icon: User,
      badge: null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0B]/95 backdrop-blur-lg border-t border-zinc-800/80 px-1 pt-1.5 pb-[max(env(safe-area-inset-bottom,8px),8px)]">
      <div className="max-w-md mx-auto grid grid-cols-5 gap-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                playTap();
                setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center min-h-[50px] py-1 px-1 rounded-xl transition-all duration-200 touch-manipulation ${
                isActive
                  ? 'text-white bg-zinc-900/90 border border-zinc-800 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 active:scale-95'
              }`}
            >
              {/* Active top line accent */}
              {isActive && (
                <span className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#F40009] rounded-full shadow-[0_0_8px_#F40009]" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'text-[#F40009] scale-110' : 'text-zinc-400'
                  }`}
                />
                {tab.badge && (
                  <span
                    className={`absolute -top-1 -right-2 px-1 text-[8px] font-mono font-bold rounded-full ${tab.badgeColor} text-white ring-1 ring-black`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-1 font-medium tracking-tight whitespace-nowrap ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
