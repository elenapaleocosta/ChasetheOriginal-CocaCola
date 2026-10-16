# Chase the Original | Coca-Cola × Κωνσταντίνος Αργυρός

Interactive, mobile-first Web App / Prototype for the exclusive campaign **"Chase the Original"** (The Coca-Cola Company × Κωνσταντίνος Αργυρός).

Commercial Objective: **EXCLUSIVELY Promoting Coca-Cola Original Taste** (Classic Red Can).  
Target Audience: Gen-Z / Young Adults (18–26).

---

## 📱 Mobile-First Phone Optimizations
- **Full Viewport & Safe Area Support:** `viewport-fit=cover` and dynamic safe-area insets (`pt-safe`, `pb-safe`) for edge-to-edge iOS & Android mobile display.
- **Mobile Touch Handling:** Zero tap-delay (`touch-action: manipulation`), responsive thumb reach layout, and `touch-action: none` on the interactive scratch canvas to prevent jitter during scratching.
- **Tactile Audio Feedback:** Ultra-low latency Web Audio API synthesizer for button taps, scratch noises, NFC chimes, and mechanical dispenser sounds.
- **Dark Minimal Design (Strict No-AI-Slop):** Pure Black (`#0B0B0B`), Dark Charcoal (`#141414`), Coca-Cola Red (`#F40009`), Pure White (`#FFFFFF`), Zinc Muted (`#8E8E93`), and razor-sharp 1px borders (`border-zinc-800`).

---

## 🚀 Key Modules & Architecture (4 Tabs)

### 1. Sticky Header / Dual Points Progression
- **Campaign Badge:** Embedded vector `Pics/campaign-badge.svg`.
- **Dual Wallet:**
  - **Available Balance:** Points ready to be spent in the Rewards Vault.
  - **Lifetime XP:** Cumulative points determining Hunter Tier and Concert Raffle entries.
- **Level 4 - The Escape MAX (5,000 PTS):** Automatic entry to the grand raffle for 4 VIP concert tickets for Κωνσταντίνος Αργυρός (+1 entry per +1,000 extra PTS).
- **Mini Avatar Thumbnail:** Taps directly into Tab 4 with live wearable indicator.

### 2. Tab 1: "Chase & Vending Map"
- **The Gamemaster Clue Hub (Κωνσταντίνος Αργυρός):**
  - High-contrast portrait card (`Pics/argyros-gamemaster-portrait.png`).
  - Rotating live ticker with Flash Drop announcements (e.g. 2x Double Points, Restock alerts).
  - Modal with voice quotes and GPS directions.
- **Interactive Dark Map (Leaflet + Clean OpenStreetMap Dark Tiles):**
  - Dark styling using inverted OSM tiles (Zero watermarks, Zero API keys).
  - **100% Static Map Markers:** Solid `#F40009` circle with a 2px pure white border (`border-2 border-white`) and black hub tag (no keyframe pulsing/blinking for maximum visual comfort).
  - **Athens Hub Network:** Σύνταγμα (`HUB-01`), Μαρίνα Φλοίσβου (`HUB-04`), Μοναστηράκι (`HUB-03`), The Mall Athens (`HUB-02`).
  - **Live IoT Stock Drawer:** Real-time inventory per machine with 3°C temperature reading, Google Maps directions, and direct *Tap to Dispense* CTA.

### 3. Tab 2: "Code Entry" (The Action Engine)
- **Visual Can Reference:** `Pics/coca-cola-can-original.png`.
- **Interactive Scratch Validation Showcase:** Touch/mouse interactive scratch card layer over the code (`A37-F92B`).
- **Monospaced Input:** 8-character input (`XXX-XXXXX`) with auto-hyphenation.
- **Strict Notice:** *"Ισχύει αποκλειστικά για κωδικούς από scratch stickers σε κουτάκια Coca-Cola Original Taste."*
- **Bonus Engine:**
  - Base: +100 PTS
  - First-time Welcome Bonus: +100 PTS
  - Gamemaster 2x Flash Drop Multiplier: +200 PTS toggle.

### 4. Tab 3: "Vault & Rewards"
- **Rewards Catalog:**
  - **Exclusive Merch:** Stamped with official vector signature (`Pics/argyros-signature.svg`).
  - **Tech & Gadgets:** JBL Clip 4 Speaker, Retro 35mm Camera.
  - **Vouchers:** Powered by partner SVGs (`partner-efood.svg`, `partner-wolt.svg`, `partner-viva.svg`, `partner-netflix.svg`).
- **User Vault ("Το Θησαυροφυλάκιό μου"):** Active secure passes with encrypted tokens.
- **Contactless NFC Dispense Simulation:** Interactive modal simulating smartphone tap to the vending machine reader, radio wave handshake, and mechanical dispensing sequence.

### 5. Tab 4: "Avatar & Identity"
- **Gender Toggle:** Switch between Male (`Pics/avatar-base.png`) and Female (`Pics/avatar-base-female.png`).
- **Strict Layering Canvas:**
  - Base Layer (`z-0`): Avatar base model.
  - Torso Layer (`z-10`): Coca-Cola Hoodie (`Pics/avatar-wearable-hoodie.png`).
  - Head Layer (`z-20`): Original Bucket Hat (`Pics/avatar-wearable-hat.png`).
- **Physical-to-Digital Sync:** Merch redeemed from the Vault automatically unlocks digital twins in the wardrobe inventory.
- **Badge:** `Meta Avatar Sync Ready`.

---

## 🛠 Local Assets (`Pics/`)
All assets are referenced strictly from the local repository directory:
- `Pics/coca-cola-can-original.png`
- `Pics/campaign-badge.svg`
- `Pics/argyros-gamemaster-portrait.png`
- `Pics/argyros-signature.svg`
- `Pics/partner-efood.svg`
- `Pics/partner-wolt.svg`
- `Pics/partner-viva.svg`
- `Pics/partner-netflix.svg`
- `Pics/avatar-base.png`
- `Pics/avatar-base-female.png`
- `Pics/avatar-wearable-hoodie.png`
- `Pics/avatar-wearable-hat.png`
- `Pics/vending-machine-photo.png`

---

## 💻 Getting Started Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```
