/**
 * Kiddy3D - Kid's 3D Printer Dashboard & Reading Companion
 * Built for 6-Year-Old Early Readers & Young Makers on iPad
 */

class Kiddy3DApp {
  constructor() {
    this.speechRate = 1.0; // 1.0 normal, 0.75 slow
    this.audioCtx = null;
    this.isSpeaking = false;
    this.activeUtterance = null;
    this.activeManualIndex = 0;
    this.parentPin = "1234";

    // Default Printers with SVG generated avatars
    this.defaultPrinters = [
      {
        id: "printer-1",
        name: "Bambu Lab A1 (Speedy 🚀)",
        avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230284C7'/><rect x='20' y='25' width='60' height='55' rx='10' fill='%23FFFFFF'/><circle cx='50' cy='52' r='18' fill='%2310B981'/><polygon points='45,42 62,52 45,62' fill='%23FFFFFF'/></svg>",
        status: "printing",
        jobName: "Super Space Rocket 🚀",
        progress: 68,
        nozzleTemp: 215,
        targetNozzle: 220,
        bedTemp: 60,
        targetBed: 60,
        timeLeftMins: 18,
        streamUrl: "",
        lightOn: true
      },
      {
        id: "printer-2",
        name: "Ender 3 V2 (Blue Builder 🛠️)",
        avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%233B82F6'/><rect x='15' y='20' width='70' height='60' rx='8' fill='%231E293B'/><rect x='25' y='65' width='50' height='8' fill='%23F59E0B'/><polygon points='45,40 55,40 50,55' fill='%23EF4444'/></svg>",
        status: "ready",
        jobName: "Cute Dinosaur 🦖",
        progress: 100,
        nozzleTemp: 26,
        targetNozzle: 0,
        bedTemp: 24,
        targetBed: 0,
        timeLeftMins: 0,
        streamUrl: "",
        lightOn: false
      },
      {
        id: "printer-3",
        name: "Prusa MK4 (Orange Power 🧡)",
        avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23F97316'/><rect x='20' y='20' width='60' height='60' rx='10' fill='%230F172A'/><circle cx='50' cy='50' r='16' fill='%23F97316'/><circle cx='50' cy='50' r='6' fill='%23FFFFFF'/></svg>",
        status: "paused",
        jobName: "Race Car Toy 🏎️",
        progress: 42,
        nozzleTemp: 200,
        targetNozzle: 200,
        bedTemp: 55,
        targetBed: 55,
        timeLeftMins: 32,
        streamUrl: "",
        lightOn: true
      }
    ];

    this.printers = this.loadPrinters();
    this.activePrinterId = this.printers[0].id;

    // Reading Manuals Curriculum
    this.manuals = [
      {
        title: "The Golden Safety Rules",
        desc: "Read these 4 rules to keep your fingers safe!",
        steps: [
          {
            title: "Rule 1: Never Touch the Nozzle",
            text: "The nozzle tip gets as hot as a baking oven! Only grown-ups may touch near the nozzle.",
            safety: "hot"
          },
          {
            title: "Rule 2: Keep Hands Clear of Belts",
            text: "When the printer moves, motors pull the belts fast. Watch with your eyes, not your hands!",
            safety: "move"
          },
          {
            title: "Rule 3: Wait for the Bed to Cool",
            text: "Wait until the bed temperature is cool blue before taking your fresh toy off the plate.",
            safety: "cool"
          },
          {
            title: "Rule 4: Wash Hands After Making",
            text: "Always wash your hands with soap after playing with 3D prints, glue sticks, and tools.",
            safety: "clean"
          }
        ]
      },
      {
        title: "Pre-Flight Checklist",
        desc: "Check these 4 items before you start any print!",
        steps: [
          {
            title: "Step 1: Check the Print Bed",
            text: "Look closely at the flat bed. Is it clean, smooth, and empty of old plastic?",
            safety: "check"
          },
          {
            title: "Step 2: Check the Plastic Spool",
            text: "Look at the wheel of filament. Is there plenty of colorful string left for your toy?",
            safety: "check"
          },
          {
            title: "Step 3: Pick Your File",
            text: "Choose the toy file on the screen and tap Start Print with a grown-up.",
            safety: "check"
          },
          {
            title: "Step 4: Watch the First Layer",
            text: "Always stand by and watch the very first layer. If it sticks flat, you are ready to fly!",
            safety: "check"
          }
        ]
      },
      {
        title: "Loading the Filament",
        desc: "How plastic string goes into the printer machine.",
        steps: [
          {
            title: "Step 1: Preheat the Hotend",
            text: "Turn on the nozzle heater so the metal tip gets warm enough to melt plastic smoothly.",
            safety: "hot"
          },
          {
            title: "Step 2: Snip the Tip Like a Pencil",
            text: "Cut the end of the filament plastic at a sharp angle so it slides into the hole easily.",
            safety: "tool"
          },
          {
            title: "Step 3: Push into Extruder Gears",
            text: "Squeeze the little arm lever and gently push the filament line down toward the hotend.",
            safety: "move"
          },
          {
            title: "Step 4: Watch the Plastic Noodle",
            text: "Cheer when you see a squiggly noodle of melted color curl out of the bottom tip!",
            safety: "fun"
          }
        ]
      },
      {
        title: "Removing Finished Prints",
        desc: "How to safely celebrate and unbox your 3D toy!",
        steps: [
          {
            title: "Step 1: Wait for the Chime",
            text: "Wait until the printer says 100 percent and the bed cools down to room temperature.",
            safety: "cool"
          },
          {
            title: "Step 2: Lift the Magnetic Plate",
            text: "Carefully pick up the spring steel sheet from the front corners.",
            safety: "gentle"
          },
          {
            title: "Step 3: Gently Flex the Plate",
            text: "Give the flexible sheet a small bend and listen for the satisfying pop sound!",
            safety: "pop"
          },
          {
            title: "Step 4: Show Off Your Creation",
            text: "Hold up your brand new toy, admire every tiny layer line, and give Dad a high five!",
            safety: "celebrate"
          }
        ]
      }
    ];

    // Word Bank
    this.words = [
      {
        word: "NOZZLE",
        syllables: "NOZ - ZLE",
        definition: "The tiny metal tip that gets very hot and squirts out melted plastic.",
        emoji: "🔥"
      },
      {
        word: "FILAMENT",
        syllables: "FIL - A - MENT",
        definition: "The colorful plastic string rolled around a wheel that builds your toy.",
        emoji: "🧵"
      },
      {
        word: "BED",
        syllables: "BED",
        definition: "The flat metal plate where the printer draws and stacks the plastic.",
        emoji: "🛏️"
      },
      {
        word: "EXTRUDER",
        syllables: "EX - TRU - DER",
        definition: "The motor with little gears that pushes the plastic string forward.",
        emoji: "⚙️"
      },
      {
        word: "LAYER",
        syllables: "LAY - ER",
        definition: "One thin slice of plastic. Thousands of layers stack together to make a toy!",
        emoji: "🥞"
      },
      {
        word: "LEVELING",
        syllables: "LEV - EL - ING",
        definition: "Making sure the bed is perfectly straight and even like a table.",
        emoji: "📏"
      },
      {
        word: "SPOOL",
        syllables: "SPOOL",
        definition: "The big round wheel that holds all your rolled-up plastic string.",
        emoji: "🎡"
      },
      {
        word: "COOLING",
        syllables: "COOL - ING",
        definition: "Fans blowing cold air onto the hot plastic so it turns hard instantly.",
        emoji: "💨"
      }
    ];

    // Videos
    this.videos = [
      {
        title: "How Does a 3D Printer Work?",
        desc: "Watch how plastic noodles stack up to build awesome toys!",
        youtubeId: "Vx0Z6LplaMU",
        emoji: "🤖"
      },
      {
        title: "3D Printing Safety for Kids",
        desc: "Fun safety tips: Hot zones, safe zones, and happy printing!",
        youtubeId: "scF2nI2rY8Y",
        emoji: "🛡️"
      },
      {
        title: "The Magic First Layer",
        desc: "See how the printer squishes the very first line of plastic.",
        youtubeId: "7q8y1tC0bZs",
        emoji: "👀"
      },
      {
        title: "What is 3D Filament Made Of?",
        desc: "Discover how PLA plastic is made from corn and plants!",
        youtubeId: "3x9p6J3f9x8",
        emoji: "🌽"
      }
    ];

    this.stars = parseInt(localStorage.getItem("kiddy3d_stars") || "0", 10);
    this.init();
  }

  init() {
    this.renderStars();
    this.renderPrinterTabs();
    this.updateActivePrinterUI();
    this.renderManual(this.activeManualIndex);
    this.renderWordBank();
    this.renderVideos();
    this.initPWA();
    this.startSimulationTimer();
  }

  // ==================== AUDIO SYNTHESIS & TTS ====================
  initAudio() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.2, gainLevel = 0.15) {
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(gainLevel, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  playChime() {
    this.playTone(523.25, 'triangle', 0.2, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.25, 0.2), 120); // E5
  }

  playClick() {
    this.playTone(800, 'sine', 0.08, 0.1);
  }

  playSuccess() {
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.3, 0.25), idx * 110);
    });
  }

  playAlert() {
    this.playTone(400, 'sawtooth', 0.18, 0.15);
    setTimeout(() => this.playTone(300, 'sawtooth', 0.25, 0.15), 180);
  }

  // Text-To-Speech with Karaoke Word Highlighting
  speak(text, onWordCallback, onEndCallback) {
    if (!('speechSynthesis' in window)) {
      console.warn("Speech synthesis not supported in this browser");
      return;
    }
    window.speechSynthesis.cancel();
    this.isSpeaking = true;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.speechRate;
    utterance.pitch = 1.15; // Friendly, slightly higher kid-accessible pitch

    // Choose friendly voice if available
    const voices = window.speechSynthesis.getVoices();
    const kidVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Karen') || v.name.includes('Natural')));
    if (kidVoice) {
      utterance.voice = kidVoice;
    }

    if (onWordCallback) {
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          onWordCallback(event.charIndex, event.charLength);
        }
      };
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEndCallback) onEndCallback();
    };

    this.activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  toggleSpeed() {
    this.playClick();
    if (this.speechRate >= 1.0) {
      this.speechRate = 0.75;
      document.getElementById('speed-icon').textContent = '🐢';
      document.getElementById('speed-label').textContent = 'Slow';
      this.speak("Slow reading mode. Words are spoken nice and slow.");
    } else {
      this.speechRate = 1.0;
      document.getElementById('speed-icon').textContent = '🐰';
      document.getElementById('speed-label').textContent = 'Normal';
      this.speak("Normal reading speed!");
    }
  }

  // ==================== TABS & PRINTER NAVIGATION ====================
  switchTab(tabName) {
    this.playClick();
    document.querySelectorAll('.nav-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === `tab-${tabName}`);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadPrinters() {
    try {
      const saved = localStorage.getItem("kiddy3d_printers");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return this.defaultPrinters;
  }

  savePrinters() {
    localStorage.setItem("kiddy3d_printers", JSON.stringify(this.printers));
  }

  getActivePrinter() {
    return this.printers.find(p => p.id === this.activePrinterId) || this.printers[0];
  }

  renderPrinterTabs() {
    const container = document.getElementById('printer-tabs-container');
    if (!container) return;
    container.innerHTML = '';

    this.printers.forEach(printer => {
      const card = document.createElement('div');
      card.className = `printer-tab-card ${printer.id === this.activePrinterId ? 'active' : ''}`;
      card.onclick = () => this.selectPrinter(printer.id);

      const statusClass = `status-${printer.status}`;
      const statusLabel = printer.status.toUpperCase();

      card.innerHTML = `
        <img src="${printer.avatar}" alt="${printer.name}" class="printer-tab-photo">
        <div class="printer-tab-info">
          <span class="printer-tab-title">${printer.name}</span>
          <span class="printer-tab-status ${statusClass}">
            <span class="status-dot"></span>
            ${statusLabel} ${printer.status === 'printing' ? `(${printer.progress}%)` : ''}
          </span>
        </div>
      `;
      container.appendChild(card);
    });
  }

  selectPrinter(id) {
    this.playChime();
    this.activePrinterId = id;
    this.renderPrinterTabs();
    this.updateActivePrinterUI();
    const p = this.getActivePrinter();
    this.speak(`Switched to ${p.name}!`);
  }

  updateActivePrinterUI() {
    const p = this.getActivePrinter();
    if (!p) return;

    // Header info
    document.getElementById('active-printer-name').textContent = p.name;
    document.getElementById('active-printer-avatar').src = p.avatar;

    const statusPill = document.getElementById('active-printer-status-pill');
    const statusText = document.getElementById('active-printer-status-text');
    statusText.textContent = p.status.toUpperCase();
    statusPill.className = `status-pill status-${p.status}`;

    // Job and Progress
    document.getElementById('current-job-name').textContent = p.jobName;
    document.getElementById('job-percent-badge').textContent = `${p.progress}%`;
    document.getElementById('meter-fill').style.width = `${p.progress}%`;

    const timeLeftEl = document.getElementById('time-left-text');
    if (p.status === 'printing') {
      timeLeftEl.textContent = `${p.timeLeftMins} minutes`;
    } else if (p.status === 'paused') {
      timeLeftEl.textContent = "Paused";
    } else {
      timeLeftEl.textContent = "All Done!";
    }

    // Kid Time readout
    const kidTimeEl = document.getElementById('kid-time-chip');
    if (p.status === 'printing') {
      if (p.timeLeftMins <= 10) {
        kidTimeEl.innerHTML = `<span>⚡ Super quick! 1 song left!</span> <button class="speak-inline-btn">🔊</button>`;
      } else if (p.timeLeftMins <= 30) {
        kidTimeEl.innerHTML = `<span>🍿 About 1 cartoon show!</span> <button class="speak-inline-btn">🔊</button>`;
      } else {
        kidTimeEl.innerHTML = `<span>🎬 About 1 movie show!</span> <button class="speak-inline-btn">🔊</button>`;
      }
    } else if (p.status === 'ready') {
      kidTimeEl.innerHTML = `<span>✨ Ready for a new toy!</span> <button class="speak-inline-btn">🔊</button>`;
    } else {
      kidTimeEl.innerHTML = `<span>⏸️ Paused right now</span> <button class="speak-inline-btn">🔊</button>`;
    }

    // Camera feed vs Simulation
    const liveImg = document.getElementById('live-camera-img');
    const simBox = document.getElementById('camera-simulation');
    if (p.streamUrl && p.streamUrl.trim().length > 0) {
      liveImg.src = p.streamUrl;
      liveImg.style.display = 'block';
      simBox.classList.add('hidden');
    } else {
      liveImg.style.display = 'none';
      simBox.classList.remove('hidden');
    }

    // Nozzle Temp
    const nozzVal = document.getElementById('nozzle-temp-display');
    const nozzBadge = document.getElementById('nozzle-safety-badge');
    const nozzCard = document.getElementById('nozzle-gauge-card');
    nozzVal.textContent = `${p.nozzleTemp}°C`;

    if (p.nozzleTemp > 50) {
      nozzBadge.className = "gauge-safety-badge danger";
      nozzBadge.textContent = "⚠️ VERY HOT! NO TOUCH!";
      nozzCard.className = "temp-gauge-card hot";
    } else {
      nozzBadge.className = "gauge-safety-badge safe";
      nozzBadge.textContent = "❄️ SAFE & COOL TO TOUCH";
      nozzCard.className = "temp-gauge-card";
    }

    // Bed Temp
    const bedVal = document.getElementById('bed-temp-display');
    const bedBadge = document.getElementById('bed-safety-badge');
    const bedCard = document.getElementById('bed-gauge-card');
    bedVal.textContent = `${p.bedTemp}°C`;

    if (p.bedTemp > 45) {
      bedBadge.className = "gauge-safety-badge warm";
      bedBadge.textContent = "♨️ WARM BED - BE CAREFUL";
      bedCard.className = "temp-gauge-card warm";
    } else {
      bedBadge.className = "gauge-safety-badge safe";
      bedBadge.textContent = "❄️ COOL & SAFE";
      bedCard.className = "temp-gauge-card";
    }

    // Controls label
    const pauseBtnText = document.getElementById('pause-btn-text');
    if (p.status === 'paused') {
      pauseBtnText.textContent = "RESUME ▶️";
    } else {
      pauseBtnText.textContent = "PAUSE ⏸️";
    }

    const lightBtnText = document.getElementById('light-btn-text');
    lightBtnText.textContent = p.lightOn ? "LIGHT: ON 💡" : "LIGHT: OFF 🌑";
  }

  // ==================== KID CONTROLS ====================
  togglePause() {
    this.playClick();
    const p = this.getActivePrinter();
    if (p.status === 'printing') {
      p.status = 'paused';
      this.speak("Pausing the print! The printer took a break.");
    } else if (p.status === 'paused') {
      p.status = 'printing';
      this.speak("Resuming! The printer is moving again!");
    } else {
      this.speak("Printer is ready!");
    }
    this.savePrinters();
    this.renderPrinterTabs();
    this.updateActivePrinterUI();
  }

  toggleChamberLight() {
    this.playClick();
    const p = this.getActivePrinter();
    p.lightOn = !p.lightOn;
    this.savePrinters();
    this.updateActivePrinterUI();
    this.speak(p.lightOn ? "Light turned ON!" : "Light turned OFF!");
  }

  actionPreheat() {
    this.playClick();
    const p = this.getActivePrinter();
    p.targetNozzle = 205;
    p.targetBed = 60;
    p.nozzleTemp = Math.max(p.nozzleTemp, 180);
    p.bedTemp = Math.max(p.bedTemp, 55);
    this.savePrinters();
    this.updateActivePrinterUI();
    this.speak("Warming up for plastic filament! Warning: nozzle will get very hot!");
  }

  actionCoolDown() {
    this.playClick();
    const p = this.getActivePrinter();
    p.targetNozzle = 0;
    p.targetBed = 0;
    p.nozzleTemp = 28;
    p.bedTemp = 25;
    this.savePrinters();
    this.updateActivePrinterUI();
    this.speak("Cooling down! Fans are blowing cold air to make it safe to touch!");
  }

  requestStopPrint() {
    this.playAlert();
    document.getElementById('stop-confirm-modal').classList.remove('hidden');
    this.speak("Warning! Do you want to stop this print? Ask a grown-up before tapping stop!");
  }

  closeStopModal() {
    this.playClick();
    document.getElementById('stop-confirm-modal').classList.add('hidden');
  }

  confirmStopPrint() {
    this.playAlert();
    this.closeStopModal();
    const p = this.getActivePrinter();
    p.status = 'ready';
    p.progress = 0;
    p.timeLeftMins = 0;
    this.savePrinters();
    this.renderPrinterTabs();
    this.updateActivePrinterUI();
    this.speak("Print stopped. The printer is resting now.");
  }

  readPrinterStatus() {
    const p = this.getActivePrinter();
    const text = `${p.name} is currently ${p.status}. It is printing ${p.jobName} at ${p.progress} percent complete!`;
    this.speak(text);
  }

  speakNozzleStatus() {
    const p = this.getActivePrinter();
    if (p.nozzleTemp > 50) {
      this.speak(`Nozzle tip is ${p.nozzleTemp} degrees Celsius. Warning! Very hot! Do not touch!`);
    } else {
      this.speak(`Nozzle tip is ${p.nozzleTemp} degrees Celsius. Cool and safe!`);
    }
  }

  speakBedStatus() {
    const p = this.getActivePrinter();
    this.speak(`Build bed temperature is ${p.bedTemp} degrees Celsius.`);
  }

  speakKidTime() {
    const p = this.getActivePrinter();
    if (p.status === 'printing') {
      this.speak(`Time left is ${p.timeLeftMins} minutes. That is about as long as one cartoon show!`);
    } else {
      this.speak("Printer is not printing right now.");
    }
  }

  refreshCamera() {
    this.playClick();
    const liveImg = document.getElementById('live-camera-img');
    const p = this.getActivePrinter();
    if (p.streamUrl) {
      const sep = p.streamUrl.includes('?') ? '&' : '?';
      liveImg.src = `${p.streamUrl}${sep}_t=${Date.now()}`;
      this.speak("Camera refreshed!");
    } else {
      this.speak("Camera simulation refreshed!");
    }
  }

  toggleCameraFullscreen() {
    this.playClick();
    const elem = document.getElementById('camera-viewport');
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  onCameraError() {
    document.getElementById('live-camera-img').style.display = 'none';
    document.getElementById('camera-simulation').classList.remove('hidden');
  }

  // ==================== TAB 2: MANUALS & EARLY READING ====================
  loadManual(index) {
    this.playClick();
    this.activeManualIndex = index;
    document.querySelectorAll('.manual-chip').forEach((chip, i) => {
      chip.classList.toggle('active', i === index);
    });
    this.renderManual(index);
    const man = this.manuals[index];
    this.speak(`Opened manual: ${man.title}. ${man.desc}`);
  }

  renderManual(index) {
    const container = document.getElementById('manual-viewer-card');
    const manual = this.manuals[index];
    if (!container || !manual) return;

    let html = `
      <div class="manual-heading-row mb-3">
        <h3 style="font-size: 26px; color: #0369A1; font-weight: 800;">${manual.title}</h3>
        <p style="font-size: 16px; color: #64748B; margin-top: 4px;">${manual.desc}</p>
      </div>
      <div class="manual-steps-list">
    `;

    manual.steps.forEach((step, sIdx) => {
      const stepId = `m-${index}-s-${sIdx}`;
      const isChecked = localStorage.getItem(`kiddy3d_step_${stepId}`) === "true";

      // Split words for karaoke-style word highlighting
      const words = step.text.split(" ");
      const wordsHtml = words.map((w, wIdx) => {
        return `<span class="word-span" id="${stepId}-w-${wIdx}" onclick="app.speakWord(this, '${w}')">${w}</span>`;
      }).join(" ");

      html += `
        <div class="manual-step-card" id="step-card-${stepId}">
          <div class="step-num-badge">${sIdx + 1}</div>
          <div class="step-body">
            <div class="step-title">
              <span>${step.title}</span>
              <button class="speak-inline-btn" onclick="app.speakStepText('${stepId}', '${step.title.replace(/'/g, "\\'")}. ${step.text.replace(/'/g, "\\'")}')">🔊 Read Step</button>
            </div>
            <div class="step-text" id="step-text-${stepId}">
              ${wordsHtml}
            </div>
            <div class="step-action-row">
              <button class="check-task-btn ${isChecked ? 'checked' : ''}" onclick="app.toggleStepCheck('${stepId}')">
                <span>${isChecked ? '✅ Checked & Done!' : '⬜ I Did This!'}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  speakStepText(stepId, fullText) {
    const card = document.getElementById(`step-card-${stepId}`);
    if (card) card.classList.add('active-reading');

    const stepTextEl = document.getElementById(`step-text-${stepId}`);
    const wordSpans = stepTextEl ? Array.from(stepTextEl.querySelectorAll('.word-span')) : [];

    let currentWordIndex = 0;

    this.speak(
      fullText,
      () => {
        // Karaoke Word boundary highlight
        wordSpans.forEach(w => w.classList.remove('speaking-word'));
        if (wordSpans[currentWordIndex]) {
          wordSpans[currentWordIndex].classList.add('speaking-word');
          currentWordIndex++;
        }
      },
      () => {
        // On end
        if (card) card.classList.remove('active-reading');
        wordSpans.forEach(w => w.classList.remove('speaking-word'));
      }
    );
  }

  speakWord(element, word) {
    this.playClick();
    element.classList.add('speaking-word');
    // clean punctuation
    const cleanWord = word.replace(/[.,!?:;]/g, '');
    this.speak(cleanWord, null, () => {
      setTimeout(() => element.classList.remove('speaking-word'), 300);
    });
  }

  speakCurrentManual() {
    const manual = this.manuals[this.activeManualIndex];
    let full = `${manual.title}. ${manual.desc}. `;
    manual.steps.forEach((s, idx) => {
      full += `Step ${idx + 1}: ${s.title}. ${s.text}. `;
    });
    this.speak(full);
  }

  toggleStepCheck(stepId) {
    const key = `kiddy3d_step_${stepId}`;
    const currentlyChecked = localStorage.getItem(key) === "true";
    const newChecked = !currentlyChecked;
    localStorage.setItem(key, newChecked ? "true" : "false");

    if (newChecked) {
      this.playSuccess();
      this.addStars(1);
      this.launchConfetti();
      this.speak("Awesome job! You earned a maker star! Keep reading!");
    } else {
      this.playClick();
    }

    this.renderManual(this.activeManualIndex);
  }

  // ==================== TAB 3: WORD BANK & PHONICS ====================
  renderWordBank() {
    const container = document.getElementById('word-cards-grid');
    if (!container) return;
    container.innerHTML = '';

    this.words.forEach(w => {
      const card = document.createElement('div');
      card.className = "word-card";
      card.onclick = () => this.speakWordCard(w);

      card.innerHTML = `
        <div class="word-header-row">
          <span class="word-main-text">${w.word}</span>
          <span class="syllable-badge">${w.syllables}</span>
        </div>
        <div class="word-illustration">${w.emoji}</div>
        <div class="word-definition">${w.definition}</div>
        <button class="tts-pill-btn small mt-1">🔊 Pronounce & Learn</button>
      `;
      container.appendChild(card);
    });
  }

  speakWordCard(w) {
    this.playClick();
    const explanation = `${w.word}! Sounds like: ${w.syllables}. ${w.definition}`;
    this.speak(explanation);
  }

  // ==================== TAB 4: VIDEOS ====================
  renderVideos() {
    const container = document.getElementById('video-cards-grid');
    if (!container) return;
    container.innerHTML = '';

    this.videos.forEach(v => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.onclick = () => this.openVideoModal(v);

      const thumbUrl = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;

      card.innerHTML = `
        <div class="video-thumb-box">
          <img src="${thumbUrl}" alt="${v.title}" class="video-thumb-img" onerror="this.src='icons/icon.svg'">
          <div class="video-play-overlay">▶</div>
        </div>
        <div class="video-card-body">
          <h4 class="video-title">${v.emoji} ${v.title}</h4>
          <p class="video-desc">${v.desc}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  openVideoModal(video) {
    this.playClick();
    document.getElementById('video-modal-title').textContent = `${video.emoji} ${video.title}`;
    const frameBox = document.getElementById('video-frame-container');
    frameBox.innerHTML = `
      <iframe 
        src="https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0" 
        title="${video.title}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `;
    document.getElementById('video-player-modal').classList.remove('hidden');
    this.speak(`Playing video: ${video.title}`);
  }

  closeVideoModal() {
    this.playClick();
    const frameBox = document.getElementById('video-frame-container');
    frameBox.innerHTML = '';
    document.getElementById('video-player-modal').classList.add('hidden');
  }

  // ==================== STARS & REWARDS ====================
  renderStars() {
    const el = document.getElementById('star-count');
    if (el) el.textContent = this.stars;
  }

  addStars(num = 1) {
    this.stars += num;
    localStorage.setItem("kiddy3d_stars", this.stars.toString());
    this.renderStars();
  }

  celebrateStars() {
    this.playSuccess();
    this.launchConfetti();
    this.speak(`You have collected ${this.stars} maker stars! You are an amazing 3D printing engineer!`);
  }

  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#0284C7', '#38BDF8', '#F59E0B', '#10B981', '#EC4899', '#A855F7'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        alpha: 1.0
      });
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vr;
        p.alpha -= 0.015;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (alive && frame < 100) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    animate();
  }

  // ==================== PARENT ZONE & CONFIG ====================
  openParentModal() {
    this.playClick();
    document.getElementById('parent-modal').classList.remove('hidden');
    document.getElementById('parent-pin-gate').classList.remove('hidden');
    document.getElementById('parent-settings-content').classList.add('hidden');
    document.getElementById('parent-pin-input').value = '';
    
    // Quick math challenge
    const a = Math.floor(Math.random() * 4) + 4;
    const b = Math.floor(Math.random() * 5) + 2;
    this.expectedAnswer = (a + b).toString();
    document.getElementById('math-challenge').textContent = `${a} + ${b} = ?`;
  }

  closeParentModal() {
    this.playClick();
    document.getElementById('parent-modal').classList.add('hidden');
  }

  verifyParentPin() {
    const input = document.getElementById('parent-pin-input').value.trim();
    if (input === this.parentPin || input === this.expectedAnswer) {
      this.playSuccess();
      document.getElementById('parent-pin-gate').classList.add('hidden');
      document.getElementById('parent-settings-content').classList.remove('hidden');
      this.renderParentPrinterList();
    } else {
      this.playAlert();
      alert("Incorrect PIN or math answer. Try PIN 1234");
    }
  }

  switchSettingsTab(tab) {
    this.playClick();
    document.querySelectorAll('.settings-tabs-row .chip-tab').forEach(b => {
      b.classList.toggle('active', b.textContent.toLowerCase().includes(tab));
    });
    document.getElementById('settings-tab-printers').classList.toggle('hidden', tab !== 'printers');
    document.getElementById('settings-tab-app').classList.toggle('hidden', tab !== 'app');
  }

  renderParentPrinterList() {
    const container = document.getElementById('parent-printer-list');
    if (!container) return;
    container.innerHTML = '';

    this.printers.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'printer-edit-card';
      card.innerHTML = `
        <div class="edit-row">
          <label>Printer Name:</label>
          <input type="text" value="${p.name}" onchange="app.updatePrinterField(${idx}, 'name', this.value)">
        </div>
        <div class="edit-row">
          <label>Webcam URL:</label>
          <input type="text" placeholder="http://192.168.1.x/webcam/?action=stream" value="${p.streamUrl || ''}" onchange="app.updatePrinterField(${idx}, 'streamUrl', this.value)">
        </div>
        <div class="edit-row">
          <label>Photo URL / SVG:</label>
          <input type="text" value="${p.avatar.startsWith('data:') ? 'Default SVG Icon' : p.avatar}" onchange="app.updatePrinterField(${idx}, 'avatar', this.value)">
        </div>
        <div class="edit-row">
          <label>Delete:</label>
          <button class="btn-cancel" style="padding: 6px 12px; font-size: 13px;" onclick="app.deletePrinter(${idx})">🗑️ Remove Printer</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  updatePrinterField(idx, field, value) {
    if (this.printers[idx]) {
      this.printers[idx][field] = value;
      this.savePrinters();
      this.renderPrinterTabs();
      this.updateActivePrinterUI();
    }
  }

  deletePrinter(idx) {
    if (this.printers.length <= 1) {
      alert("You need at least one printer configured!");
      return;
    }
    if (confirm("Delete this printer from the dashboard?")) {
      this.printers.splice(idx, 1);
      this.activePrinterId = this.printers[0].id;
      this.savePrinters();
      this.renderParentPrinterList();
      this.renderPrinterTabs();
      this.updateActivePrinterUI();
    }
  }

  addNewPrinterPrompt() {
    const name = prompt("Enter new printer name (e.g. Ender 5, Voron 2.4, etc.):");
    if (name && name.trim()) {
      const newP = {
        id: `printer-${Date.now()}`,
        name: name.trim(),
        avatar: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%2310B981'/><rect x='25' y='25' width='50' height='50' rx='10' fill='%23FFFFFF'/><circle cx='50' cy='50' r='14' fill='%23059669'/></svg>",
        status: "ready",
        jobName: "New Print Job",
        progress: 0,
        nozzleTemp: 24,
        targetNozzle: 0,
        bedTemp: 23,
        targetBed: 0,
        timeLeftMins: 0,
        streamUrl: "",
        lightOn: false
      };
      this.printers.push(newP);
      this.savePrinters();
      this.renderParentPrinterList();
      this.renderPrinterTabs();
      this.selectPrinter(newP.id);
    }
  }

  resetDefaultPrinters() {
    if (confirm("Reset printers to original factory defaults?")) {
      this.printers = JSON.parse(JSON.stringify(this.defaultPrinters));
      this.savePrinters();
      this.renderParentPrinterList();
      this.renderPrinterTabs();
      this.selectPrinter(this.printers[0].id);
    }
  }

  saveAppConfig() {
    this.playClick();
    const rate = parseFloat(document.getElementById('cfg-voice-rate').value);
    this.speechRate = rate;
  }

  // ==================== LIVE SIMULATION LOOP ====================
  startSimulationTimer() {
    setInterval(() => {
      const p = this.getActivePrinter();
      if (p && p.status === 'printing') {
        if (p.progress < 100) {
          p.progress = Math.min(100, p.progress + 1);
          if (p.timeLeftMins > 1) {
            p.timeLeftMins = Math.max(1, p.timeLeftMins - 1);
          }
        } else {
          p.status = 'ready';
          p.jobName = "Toy Finished! 🎉";
          p.timeLeftMins = 0;
          this.playSuccess();
          this.launchConfetti();
        }
        this.updateActivePrinterUI();
      }
    }, 15000); // Progress tick every 15s
  }

  // ==================== PWA SERVICE WORKER ====================
  initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('Kiddy3D ServiceWorker registered', reg.scope))
          .catch(err => console.log('ServiceWorker error', err));
      });
    }
  }
}

// Global instance initiation
const app = new Kiddy3DApp();
window.app = app;
