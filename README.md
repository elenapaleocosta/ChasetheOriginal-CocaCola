Chase the Original · Coca-Cola × Κωνσταντίνος Αργυρός
A mobile-first web app prototype for "Chase the Original", a concept loyalty campaign that pairs Coca-Cola Original Taste (the classic red can) with Greek artist Κωνσταντίνος Αργυρός as the campaign's "Gamemaster".
Fans scratch codes from red cans, chase clues to smart vending hubs around Greece, post concert moments, and spend points on merch, tech and partner vouchers — collected with a contactless NFC tap at the machine. Merch redeemed in real life also unlocks a matching wearable on the user's digital avatar.
> Built as a hackathon prototype. All data is mocked on the client — there is no backend, real code validation, or real NFC/IoT integration.
Target audience: Gen-Z / young adults (18–26) · Language: Greek UI · Form factor: phone (max-width ~448px, safe-area aware)
---
✨ Features
The app is organised into five tabs with a bottom navigation bar and an auto-hiding top header.
Tab	What it does
📍 Hubs — Map	Gamemaster banner with rotating clues and flash drops (2× points, restock alerts, story riddles). Dark-styled Leaflet map of Athens vending hubs (Σύνταγμα, Μοναστηράκι, Μαρίνα Φλοίσβου, The Mall Athens) with per-machine live stock, category filters, Google Maps directions and a "Tap to Dispense" shortcut.
🔑 Codes — Scratch Can	Enter the 8-character code from a Coca-Cola Original can (`XXX-XXXXX`, auto-uppercased and hyphenated). Duplicate codes are rejected. Points: +100 base, +200 during a Gamemaster 2× Flash Drop, +100 welcome bonus on the first code. Shows redemption history.
📸 Moments — Original Moment	Social feed of concert photos. Upload a photo from a music event (e.g. Αργυρός Tour 2026 – OAKA, Release Athens, MAD VMA), add a caption, confirm a red can is in shot, and earn +150 PTS. Like posts and filter to "mine".
🎁 Vault — Rewards & Δώρα	Rewards catalog (signed merch, JBL Clip 4, efood / Wolt / viva.com / Netflix vouchers) gated by points and tier level. Redeemed items land in "Το Θησαυροφυλάκιό μου" as NFC passes with a rolling token, then play an animated contactless dispense sequence (tap → verify → dispense).
👤 Avatar — Ταυτότητα	Male / female avatar that changes based on equipped wearables (Original hoodie, bucket hat). Redeeming and dispensing merch automatically unlocks and equips its "digital twin".
Points & tiers
Two balances are tracked: available points (spendable) and lifetime points (drive the tier).
Level	Name	Lifetime points
1	Starter Tier	0+
2	Original Pioneer	1,500+
3	Original Elite	3,000+
4	The Escape MAX	5,000+ → entry into the raffle for 4 VIP concert tickets
Feel & polish
Tactile sound — taps, success chimes, NFC pings and dispenser sounds are synthesized live with the Web Audio API (no audio files).
Native-app feel — `viewport-fit=cover`, iOS/Android safe-area insets, no tap delay, no text selection, standalone web-app meta tags.
Design language — black `#0B0B0B`, charcoal `#141414`, Coca-Cola red `#F40009`, thin zinc borders; fonts Plus Jakarta Sans, Space Grotesk and Space Mono.
Demo-friendly — state starts fresh on every load (2,500 available / 3,500 lifetime points) and a Reset Demo State link in the footer restores it mid-presentation.
---
🛠 Tech stack
Layer	Technology
UI framework	React 18 (function components + hooks, JSX)
Build tool / dev server	Vite 6 with `@vitejs/plugin-react`
Styling	Tailwind CSS 3 + PostCSS + Autoprefixer, custom `coke` colour palette
Maps	Leaflet + React Leaflet 4, OpenStreetMap tiles inverted to dark via CSS
Icons	lucide-react
Fonts	Google Fonts — Plus Jakarta Sans, Space Grotesk, Space Mono
Audio	Web Audio API (oscillator-based synth)
State	React `useState` in `App.jsx`, mirrored to `localStorage`
Data	Static mock data in `src/data/campaignData.js` and component files
Language	JavaScript (ES modules)
No backend, database, auth or API keys are required.
---
📁 Project structure
```
├── index.html                 # Mobile meta tags, Google Fonts, root mount
├── public/Pics/               # Images served at /Pics/... (avatars, merch, partner logos, events)
├── Pics/                      # Source copy of the same assets
├── src/
│   ├── main.jsx               # React entry point
│   ├── App.jsx                # App state (points, codes, vault, avatar) + tab routing
│   ├── index.css              # Tailwind layers, safe-area utilities, animations
│   ├── data/campaignData.js   # Tiers, Gamemaster clues, vending hubs, rewards catalog
│   ├── utils/audio.js         # Web Audio sound effects
│   └── components/
│       ├── Header.jsx           # Auto-hiding campaign header
│       ├── Navigation.jsx       # 5-tab bottom bar
│       ├── GamemasterBanner.jsx # Clues, flash drops, quote modal
│       ├── VendingMap.jsx       # Leaflet map + hub stock drawer
│       ├── CodeEntry.jsx        # Code validation & bonus engine
│       ├── OriginalMoment.jsx   # Concert photo feed & uploads
│       ├── RewardsVault.jsx     # Catalog, vault, NFC dispense modal
│       └── AvatarStudio.jsx     # Avatar + wearables
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js             # React plugin, "@" → src alias, dev port 3000
```
---
🚀 Getting started
Requirements: Node.js 18+ and npm.
```bash
git clone https://github.com/elenapaleocosta/ChasetheOriginal-CocaCola.git
cd ChasetheOriginal-CocaCola
npm install

npm run dev       # starts at http://localhost:3000 and opens the browser
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```
For the intended experience, open it on a phone (same Wi-Fi, run `npm run dev -- --host`) or use your browser's mobile device emulation.
---
⚠️ Disclaimer
This is an unofficial concept prototype created for a hackathon. Coca-Cola, JBL, efood, Wolt, viva.com and Netflix are trademarks of their respective owners. The campaign, partnerships, rewards and locations shown are fictional and for demonstration only.
