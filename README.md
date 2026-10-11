# 🚀 Kiddy3D - Kid's 3D Printer Companion & Reading Trainer

> **Domain:** [kiddy3d.beechem.site](https://kiddy3d.beechem.site)  
> **Target Audience:** 6-year-old early reader & young maker  
> **Primary Device:** Apple iPad (touch gestures, high readability, sound & speech)  
> **Hosting:** GitHub Pages via Cloudflare  
> **Repository:** `https://github.com/KhanTheDaleK1/kiddy-printer.git`

---

## 🌟 Key Features

1. **Kid-Friendly Printer Dashboard:**
   - Tabs for each printer with photos, badges, and real-time status.
   - **Live Webcam Feeds:** Direct MJPEG / snapshot stream support (OctoPrint / Moonraker).
   - **Fallback 3D Printing Simulation:** Animated gantry, extruder, and growing toy model when offline.
   - **Safety-First Temperature Gauges:** Big color-coded visual gauges:
     - ⚠️ `HOT! NO TOUCH!` (Red)
     - ❄️ `SAFE & COOL` (Blue)
   - **Kid-Safe Controls:** Pause, Resume, Stop (with confirmation dialog), Light switch, Warm Up, and Cool Down.
   - **Kid Time:** Converts raw minutes into early-childhood references (e.g., *"About 1 cartoon episode! 📺"*).

2. **Early Reading & Phonics Engine:**
   - **Text-to-Speech (TTS):** Every button, status, and manual step has a 🔊 read-aloud button.
   - **Karaoke Word Highlighting:** Words highlight in yellow in real-time as spoken, helping young eyes follow along with sounds.
   - **Voice Speed Control:** Switch between 🐰 Normal and 🐢 Slow for phonics learning.
   - **Word Bank & Syllable Cards:** Interactive cards for terms like `NOZ-ZLE`, `FIL-A-MENT`, `BED`, `EX-TRU-DER`, `LAY-ER`.

3. **Interactive 3D Printer Manuals & Checklists:**
   - Lesson 1: *The Golden Safety Rules*
   - Lesson 2: *Pre-Flight Checklist* (Bed clean? Spool full? First layer watched?)
   - Lesson 3: *Loading the Filament*
   - Lesson 4: *Removing Finished Prints*
   - Interactive checkmarks that reward maker stars ⭐ and trigger celebratory confetti 🎉!

4. **Curated Video Tutorials:**
   - Embedded kid-friendly educational videos about how 3D printers work and safety tips.

5. **iPad PWA (Progressive Web App):**
   - Offline caching with Service Worker.
   - Installable as a standalone iPad Home Screen app (no browser bars or distraction).

6. **Parent Zone (PIN Protected):**
   - Default PIN: `1234` (or answer a simple math puzzle).
   - Add/edit printers, configure webcam URLs, Moonraker/OctoPrint endpoints, and custom photos.

---

## 📱 iPad Installation (PWA)

1. Open Safari on the iPad and navigate to `https://kiddy3d.beechem.site`.
2. Tap the **Share** button (box with an arrow pointing up ⎋).
3. Scroll down and tap **"Add to Home Screen"** ➕.
4. Name it **Kiddy3D** and tap **Add**.
5. Launch from the Home Screen for a fullscreen, tablet-native experience!

---

## 🌐 Cloudflare & GitHub Pages Setup

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial release of Kiddy3D PWA"
   git branch -M main
   git push -u origin main
   ```
2. **GitHub Pages Settings:**
   - Go to repo **Settings** > **Pages**.
   - **Source:** Deploy from a branch (`main` / `root`).
   - **Custom Domain:** `kiddy3d.beechem.site` (already configured in the `CNAME` file).
   - Check **Enforce HTTPS**.
3. **Cloudflare DNS:**
   - Add a `CNAME` record:
     - **Name:** `kiddy3d`
     - **Target:** `khanthedalek1.github.io`
     - **Proxy status:** Proxied (Orange Cloud) or DNS Only.
     - **SSL/TLS mode:** Full / Full (strict).
