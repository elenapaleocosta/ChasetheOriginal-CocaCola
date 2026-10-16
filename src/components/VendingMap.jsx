'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { playTap } from '../utils/audio';

// 1. ΣΤΑΤΙΚΑ BADGES (ΧΩΡΙΣ PULSE / ΧΩΡΙΣ KEYFRAMES / ΧΩΡΙΣ ΑΡΙΘΜΗΣΗ)
const createStaticPin = (isSelected) =>
  L.divIcon({
    className: 'static-coke-pin',
    html: `
      <div style="
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: transform 0.15s ease-out;
        transform: scale(${isSelected ? '1.15' : '1.0'});
      ">
        <!-- Κεντρικό συμπαγές Badge -->
        <div style="
          width: 36px;
          height: 36px;
          background: #F40009;
          border: 2px solid #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <!-- White Pin SVG Icon -->
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

// 2. MOCK HUBS DATA (ΑΘΗΝΑ)
export const HUBS = [
  {
    id: 'hub-01',
    code: 'HUB-01',
    name: 'Σταθμός Μετρό Σύνταγμα',
    subLocation: 'Αθήνα (Κεντρική Αποβάθρα)',
    lat: 37.9753,
    lng: 23.7361,
    stock: [
      { name: 'JBL Clip 4', count: 2, category: 'tech' },
      { name: 'Tour Hoodie', count: 6, category: 'merch' },
      { name: 'Bucket Hat', count: 5, category: 'merch' },
      { name: 'efood 10€', count: 18, category: 'voucher' },
      { name: 'Wolt 10€', count: 14, category: 'voucher' },
      { name: 'Coca-Cola Original Cans', count: 48, category: 'cans' },
    ],
  },
  {
    id: 'hub-04',
    code: 'HUB-04',
    name: 'Μαρίνα Φλοίσβου',
    subLocation: 'Παλαιό Φάληρο (Κεντρικός Πεζόδρομος)',
    lat: 37.9288,
    lng: 23.6841,
    stock: [
      { name: 'JBL Clip 4', count: 4, category: 'tech' },
      { name: 'Tour Hoodie', count: 5, category: 'merch' },
      { name: 'Bucket Hat', count: 6, category: 'merch' },
      { name: 'Netflix Pass', count: 10, category: 'voucher' },
      { name: 'Coca-Cola Original Cans', count: 60, category: 'cans' },
    ],
  },
  {
    id: 'hub-03',
    code: 'HUB-03',
    name: 'Πλατεία Μοναστηρακίου',
    subLocation: 'Μοναστηράκι (Έξοδος Ερμού)',
    lat: 37.9765,
    lng: 23.7258,
    stock: [
      { name: 'Bucket Hat', count: 7, category: 'merch' },
      { name: 'Tour Hoodie', count: 4, category: 'merch' },
      { name: 'viva.com pass', count: 6, category: 'voucher' },
      { name: 'Coca-Cola Original Cans', count: 52, category: 'cans' },
    ],
  },
  {
    id: 'hub-02',
    code: 'HUB-02',
    name: 'The Mall Athens',
    subLocation: 'Μαρούσι (Food Court Επίπεδο 3)',
    lat: 38.0449,
    lng: 23.7915,
    stock: [
      { name: 'JBL Clip 4', count: 1, category: 'tech' },
      { name: 'Tour Hoodie', count: 5, category: 'merch' },
      { name: 'Bucket Hat', count: 5, category: 'merch' },
      { name: 'Coca-Cola Original Cans', count: 36, category: 'cans' },
    ],
  },
];

// Helper component για FlyTo κατά το κλικ
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 0.8 });
  }, [center, map]);
  return null;
}

export default function VendingMapSection({
  onOpenDispense,
  selectedMachineId,
  setSelectedMachineId,
  vaultItemsCount,
}) {
  const [activeHub, setActiveHub] = useState(HUBS[0]);
  const [filter, setFilter] = useState('all');

  // Synchronize when selectedMachineId is passed from external components
  useEffect(() => {
    if (selectedMachineId) {
      const match = HUBS.find(
        (h) => h.id === selectedMachineId.toLowerCase() || h.code === selectedMachineId.toUpperCase()
      );
      if (match) {
        setActiveHub(match);
      }
    }
  }, [selectedMachineId]);

  const filteredHubs = HUBS.filter((hub) => {
    if (filter === 'all') return true;
    return hub.stock.some((s) => s.category === filter && s.count > 0);
  });

  const handleSelectHub = (hub) => {
    playTap();
    setActiveHub(hub);
    if (setSelectedMachineId) {
      setSelectedMachineId(hub.code);
    }
  };

  const handleDispenseClick = () => {
    playTap();
    if (onOpenDispense) {
      onOpenDispense({
        id: activeHub.id,
        name: activeHub.name,
        area: activeHub.subLocation,
        status: 'Online / Tap-Ready',
        inventory: activeHub.stock,
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Inline Dark Filter Styling για να εξαφανιστεί το Watermark της CARTO */}
      <style dangerouslySetInnerHTML={{ __html: `
        .clean-osm-dark-tiles {
          filter: invert(100%) hue-rotate(180deg) brightness(85%) contrast(90%) !important;
        }
        .leaflet-container {
          background-color: #0B0B0B !important;
          border-radius: 1rem;
        }
        .leaflet-control-attribution {
          background: rgba(11, 11, 11, 0.85) !important;
          color: #71717A !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a {
          color: #A1A1AA !important;
        }
        .static-coke-pin {
          background: transparent !important;
          border: none !important;
        }
      `}} />

      {/* Filter Badges */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { key: 'all', label: 'Όλα τα Hubs' },
          { key: 'tech', label: 'JBL Speakers' },
          { key: 'merch', label: 'Exclusive Merch' },
          { key: 'voucher', label: 'Vouchers' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => { playTap(); setFilter(item.key); }}
            className={`text-[11px] font-bold px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
              filter === item.key
                ? 'bg-[#F40009] text-white border-[#F40009]'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Map Box */}
      <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-zinc-800 bg-[#0B0B0B]">
        <MapContainer
          center={[activeHub.lat, activeHub.lng]}
          zoom={12}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          {/* ΚΑΘΑΡΟ OPENSTREETMAP ΧΩΡΙΣ API KEY Ή WATERMARK */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="clean-osm-dark-tiles"
          />

          <MapController center={[activeHub.lat, activeHub.lng]} />

          {filteredHubs.map((hub) => (
            <Marker
              key={hub.id}
              position={[hub.lat, hub.lng]}
              icon={createStaticPin(activeHub.id === hub.id)}
              eventHandlers={{
                click: () => handleSelectHub(hub),
              }}
            />
          ))}
        </MapContainer>
      </div>

      {/* Bottom Drawer Card */}
      <div className="p-4 bg-zinc-900/95 border border-zinc-800 rounded-2xl space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F40009]/10 border border-[#F40009]/30 flex items-center justify-center shrink-0">
              <img src="/Pics/campaign-badge.svg" alt="Hub" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white tracking-tight">{activeHub.name}</h4>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                {activeHub.subLocation}
              </p>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-[#F40009] hover:bg-red-600 text-white text-xs font-black tracking-wider rounded-lg transition-colors">
            ΑΠΟΘΕΜΑ
          </button>
        </div>

        {/* Live Stock Pill Grid */}
        <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-2 gap-2">
          {activeHub.stock.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-zinc-950/60 px-2.5 py-1.5 rounded-lg border border-zinc-800/50 text-[11px]">
              <span className="text-zinc-300 truncate pr-1">{item.name}</span>
              <span className="font-mono font-bold text-[#F40009] shrink-0">{item.count}x</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              activeHub.name + ' ' + activeHub.subLocation
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition-colors text-center block"
          >
            Οδήγησε με εδώ
          </a>
          <button
            onClick={handleDispenseClick}
            className="w-full py-2 bg-[#F40009] hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-900/20 transition-colors"
          >
            Tap to Dispense
          </button>
        </div>
      </div>
    </div>
  );
}
