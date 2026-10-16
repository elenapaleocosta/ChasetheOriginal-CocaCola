import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import GamemasterBanner from './components/GamemasterBanner';
import VendingMap from './components/VendingMap';
import CodeEntry from './components/CodeEntry';
import RewardsVault from './components/RewardsVault';
import AvatarStudio from './components/AvatarStudio';
import OriginalMoment from './components/OriginalMoment';
import { playTap } from './utils/audio';

const STORAGE_KEY = 'coca_cola_chase_state_v4';

export default function App() {
  // Initial states with realistic starting demo balance
  const [availablePoints, setAvailablePoints] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { 
        const pts = JSON.parse(saved).availablePoints;
        if (typeof pts === 'number') return Math.max(2000, pts);
      } catch (e) {}
    }
    return 2500; // Starting spendable points
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).totalPoints; } catch (e) {}
    }
    return 3500; // Starting all-time cumulative points
  });

  const [activeTab, setActiveTab] = useState('map'); // 'map' | 'code' | 'moments' | 'rewards' | 'avatar'
  const [selectedMachineId, setSelectedMachineId] = useState('HUB-01');

  const [claimedCodes, setClaimedCodes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).claimedCodes; } catch (e) {}
    }
    return [
      { code: 'ORIG-100A', points: 100, date: '16:42' },
      { code: 'ORIG-100B', points: 100, date: '17:15' },
    ];
  });

  const [vaultItems, setVaultItems] = useState([]);

  // Avatar state
  const [gender, setGender] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved).gender; } catch (e) {}
    }
    return 'male';
  });

  const [equipped, setEquipped] = useState({
    hoodie: true,
    hat: false,
  });

  const [dispenseTargetItem, setDispenseTargetItem] = useState(null);

  // Force clean state on initial mount: wipe bucket hat and legacy storages
  useEffect(() => {
    try {
      localStorage.clear();
    } catch (e) {}
    setVaultItems([]);
    setEquipped({ hoodie: true, hat: false });
    setAvailablePoints(2500);
    setTotalPoints(3500);
  }, []);

  // Save state changes
  useEffect(() => {
    const stateToSave = {
      availablePoints,
      totalPoints,
      claimedCodes,
      vaultItems,
      gender,
      equipped,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [availablePoints, totalPoints, claimedCodes, vaultItems, gender, equipped]);

  // Calculate current user level
  let userLevel = 1;
  if (totalPoints >= 5000) userLevel = 4;
  else if (totalPoints >= 3000) userLevel = 3;
  else if (totalPoints >= 1500) userLevel = 2;

  // Handlers
  const handleClaimCode = ({ code, points, basePoints, welcomeBonus, date }) => {
    setAvailablePoints((prev) => prev + points);
    setTotalPoints((prev) => prev + points);
    setClaimedCodes((prev) => [{ code, points, date }, ...prev]);
  };

  const handleAwardMomentPoints = ({ type, points, title }) => {
    setAvailablePoints((prev) => prev + points);
    setTotalPoints((prev) => prev + points);
  };

  const handleRedeemItem = (catalogItem) => {
    setAvailablePoints((prev) => Math.max(0, prev - catalogItem.cost));
    const newItem = {
      id: `vault-${Date.now()}`,
      catalogId: catalogItem.id,
      title: catalogItem.greekTitle,
      cost: catalogItem.cost,
      status: 'ready',
      token: `NFC-${Math.floor(1000 + Math.random() * 9000)}-${catalogItem.category.toUpperCase().slice(0, 4)}`,
      date: 'Μόλις τώρα',
      wearableKey: catalogItem.wearableKey,
      image: catalogItem.image,
      partnerSvg: catalogItem.partnerSvg,
    };
    setVaultItems((prev) => [newItem, ...prev]);
  };

  const handleRemoveFromVault = (catalogIdOrId, refundCost = 0) => {
    setVaultItems((prev) => prev.filter((item) => item.catalogId !== catalogIdOrId && item.id !== catalogIdOrId));
    if (refundCost > 0) {
      setAvailablePoints((prev) => prev + refundCost);
    }
    if (catalogIdOrId === 'merch-bucket-hat' || catalogIdOrId === 'hat') {
      setEquipped((eq) => ({ ...eq, hat: false }));
    }
  };

  const handleDispenseItem = (itemId) => {
    setVaultItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          // If it has wearable key, also equip it!
          if (item.wearableKey) {
            setEquipped((eq) => ({ ...eq, [item.wearableKey]: true }));
          }
          return { ...item, status: 'dispensed' };
        }
        return item;
      })
    );
  };

  const handleOpenDispenseFromMap = (machine) => {
    // If user has a ready item in vault, trigger it
    const readyItem = vaultItems.find((i) => i.status === 'ready');
    if (readyItem) {
      setDispenseTargetItem(readyItem);
      setActiveTab('rewards');
    } else {
      setActiveTab('rewards');
    }
  };

  const handleResetDemo = () => {
    playTap();
    try {
      localStorage.clear();
    } catch (e) {}
    setAvailablePoints(2500);
    setTotalPoints(3500);
    setClaimedCodes([
      { code: 'ORIG-100A', points: 100, date: '16:42' },
      { code: 'ORIG-100B', points: 100, date: '17:15' },
    ]);
    setVaultItems([]);
    setGender('male');
    setEquipped({ hoodie: true, hat: false });
  };

  const pendingVaultCount = vaultItems.filter((i) => i.status === 'ready').length;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col font-sans selection:bg-[#F40009] selection:text-white">
      
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Tab Content Container (Mobile-first centered max-w-md layout) */}
      <main className="flex-1 max-w-md w-full mx-auto px-3.5 pt-3.5 pb-32 space-y-4">
        
        {/* TAB 1: CHASE & VENDING MAP */}
        {activeTab === 'map' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Gamemaster Clue Banner */}
            <GamemasterBanner
              onSelectLocation={(machineId) => {
                setSelectedMachineId(machineId);
              }}
            />

            {/* Interactive Vending Machine Map & Inventory */}
            <VendingMap
              onOpenDispense={handleOpenDispenseFromMap}
              selectedMachineId={selectedMachineId}
              setSelectedMachineId={setSelectedMachineId}
              vaultItemsCount={pendingVaultCount}
            />
          </div>
        )}

        {/* TAB 2: CODE ENTRY (The Action Engine) */}
        {activeTab === 'code' && (
          <div className="animate-fadeIn">
            <CodeEntry
              onClaimCode={handleClaimCode}
              claimedCodes={claimedCodes}
              isFirstSubmission={claimedCodes.length === 0}
            />
          </div>
        )}

        {/* TAB 3: ORIGINAL MOMENTS (Music Events & Live Stages) */}
        {activeTab === 'moments' && (
          <div className="animate-fadeIn">
            <OriginalMoment
              onAwardPoints={handleAwardMomentPoints}
              userLevel={userLevel}
            />
          </div>
        )}

        {/* TAB 4: REWARDS VAULT & CONTACTLESS DISPENSE */}
        {activeTab === 'rewards' && (
          <div className="animate-fadeIn">
            <RewardsVault
              availablePoints={availablePoints}
              totalPoints={totalPoints}
              userLevel={userLevel}
              vaultItems={vaultItems}
              onRedeemItem={handleRedeemItem}
              onRemoveFromVault={handleRemoveFromVault}
              onDispenseItem={handleDispenseItem}
              onGoToAvatar={() => setActiveTab('avatar')}
              dispenseTargetItem={dispenseTargetItem}
              setDispenseTargetItem={setDispenseTargetItem}
            />
          </div>
        )}

        {/* TAB 4: AVATAR & IDENTITY */}
        {activeTab === 'avatar' && (
          <div className="animate-fadeIn">
            <AvatarStudio
              gender={gender}
              setGender={setGender}
              equipped={equipped}
              setEquipped={setEquipped}
              userLevel={userLevel}
              totalPoints={totalPoints}
              unlockedWearables={vaultItems.map((i) => i.wearableKey).filter(Boolean)}
            />
          </div>
        )}

        {/* Micro Footer Bar with Reset & Commercial Objective Note */}
        <div className="pt-6 pb-2 text-center text-[10px] font-mono text-zinc-600 border-t border-zinc-900 space-y-1">
          <div>
            COCA-COLA ORIGINAL TASTE // EXCLUSIVE CAMPAIGN 2026
          </div>
          <div className="flex items-center justify-center gap-3 text-zinc-500">
            <span>Κ. ΑΡΓΥΡΟΣ // THE GAMEMASTER</span>
            <span>•</span>
            <button
              onClick={handleResetDemo}
              className="text-zinc-500 hover:text-[#F40009] underline transition-colors"
            >
              Reset Demo State
            </button>
          </div>
        </div>

      </main>

      {/* Bottom Sticky Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        vaultCount={pendingVaultCount}
      />

    </div>
  );
}
