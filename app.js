/**
 * FACE FUN ADVENTURE - Educational Game for 1st Grade Elementary School
 * Learning Objective: Identify & imitate pronunciation of face parts (eyes, ears, nose, mouth)
 */

// ================= CONSTANTS & VOCAB DATA =================
const VOCAB_DATA = {
  eyes: {
    word: 'Eyes',
    phonetic: '/ aɪz /',
    meaning: 'Mata',
    emoji: '👀',
    sampleSentence: 'These are eyes. I see with my eyes.',
    idSentence: 'Ini adalah mata. Kita melihat dengan mata.',
    svg: `
      <svg viewBox="0 0 100 50">
        <ellipse cx="28" cy="25" rx="18" ry="14" fill="#ffffff" stroke="#2d3436" stroke-width="3"/>
        <ellipse cx="30" cy="25" rx="9" ry="9" fill="#1a252f"/>
        <ellipse cx="33" cy="22" rx="3.5" ry="3.5" fill="#ffffff"/>
        <ellipse cx="27" cy="28" rx="1.5" ry="1.5" fill="#ffffff"/>
        <path d="M 12 13 Q 28 5 44 14" stroke="#2d3436" stroke-width="4" stroke-linecap="round" fill="none"/>
        <ellipse cx="72" cy="25" rx="18" ry="14" fill="#ffffff" stroke="#2d3436" stroke-width="3"/>
        <ellipse cx="70" cy="25" rx="9" ry="9" fill="#1a252f"/>
        <ellipse cx="73" cy="22" rx="3.5" ry="3.5" fill="#ffffff"/>
        <ellipse cx="67" cy="28" rx="1.5" ry="1.5" fill="#ffffff"/>
        <path d="M 56 14 Q 72 5 88 13" stroke="#2d3436" stroke-width="4" stroke-linecap="round" fill="none"/>
      </svg>`
  },
  ears: {
    word: 'Ears',
    phonetic: '/ ɪərz /',
    meaning: 'Telinga',
    emoji: '👂',
    sampleSentence: 'These are ears. I listen with my ears.',
    idSentence: 'Ini adalah telinga. Kita mendengar dengan telinga.',
    leftSvg: `
      <svg viewBox="0 0 50 72">
        <path d="M 42 12 C 16 12, 10 50, 30 64 C 40 56, 42 24, 42 12 Z" fill="#fed695" stroke="#e08253" stroke-width="3.5"/>
        <path d="M 30 26 C 20 32, 22 48, 30 52" stroke="#d46b3b" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>`,
    rightSvg: `
      <svg viewBox="0 0 50 72">
        <path d="M 8 12 C 34 12, 40 50, 20 64 C 10 56, 8 24, 8 12 Z" fill="#fed695" stroke="#e08253" stroke-width="3.5"/>
        <path d="M 20 26 C 30 32, 28 48, 20 52" stroke="#d46b3b" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>`,
    svg: `
      <svg viewBox="0 0 100 50">
        <path d="M 28 8 C 10 8, 8 40, 24 46 C 30 40, 30 15, 28 8 Z" fill="#fed695" stroke="#e08253" stroke-width="3"/>
        <path d="M 22 17 C 16 20, 16 30, 22 34" stroke="#d46b3b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M 72 8 C 90 8, 92 40, 76 46 C 70 40, 70 15, 72 8 Z" fill="#fed695" stroke="#e08253" stroke-width="3"/>
        <path d="M 78 17 C 84 20, 84 30, 78 34" stroke="#d46b3b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>`
  },
  nose: {
    word: 'Nose',
    phonetic: '/ noʊz /',
    meaning: 'Hidung',
    emoji: '👃',
    sampleSentence: 'This is a nose. I smell with my nose.',
    idSentence: 'Ini adalah hidung. Kita membau dengan hidung.',
    svg: `
      <svg viewBox="0 0 50 48">
        <path d="M 25 6 L 22 28 C 16 28, 14 38, 25 38 C 30 38, 35 38, 38 33 C 41 28, 35 27, 29 27" fill="#ff9f75" stroke="#d46b3b" stroke-width="3" stroke-linejoin="round"/>
        <ellipse cx="23" cy="33" rx="2.5" ry="2" fill="#a44b20"/>
        <ellipse cx="32" cy="31" rx="2" ry="1.5" fill="#a44b20"/>
      </svg>`
  },
  mouth: {
    word: 'Mouth',
    phonetic: '/ maʊθ /',
    meaning: 'Mulut',
    emoji: '👄',
    sampleSentence: 'This is a mouth. I smile with my mouth.',
    idSentence: 'Ini adalah mulut. Kita tersenyum dengan mulut.',
    svg: `
      <svg viewBox="0 0 110 52">
        <path d="M 20 18 Q 55 14 90 18 Q 55 52 20 18 Z" fill="#e84118" stroke="#b33924" stroke-width="3.5"/>
        <path d="M 28 19 Q 55 16 82 19 Q 55 30 28 19 Z" fill="#ffffff"/>
        <ellipse cx="55" cy="36" rx="16" ry="8" fill="#ff7675"/>
        <path d="M 16 16 C 18 12, 24 20, 28 20" stroke="#b33924" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 94 16 C 92 12, 86 20, 82 20" stroke="#b33924" stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>`
  }
};

// ================= GAME STATE =================
const state = {
  stars: 0,
  soundEnabled: true,
  currentMode: 'learn',
  draggedPart: null,
  selectedPartForTap: null,
  placedParts: {
    eyes: false,
    ears: false,
    nose: false,
    mouth: false
  },
  currentPracticeWord: 'eyes',
  recognition: null,
  isRecording: false,
  quizCurrentIndex: 0,
  quizScore: 0,
  quizList: ['eyes', 'ears', 'nose', 'mouth']
};

// ================= WEB AUDIO SYNTHESIZER =================
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  playDing() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.08); // A5
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.52);
  }

  playFanfare() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = this.ctx.currentTime + idx * 0.12;
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  playWrong() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(160, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.26);
  }
}

const sfx = new SoundFX();

// ================= SPEECH SYNTHESIS (PRONUNCIATION) =================
function speakWord(word, rate = 1, onEndCallback = null) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any pending speech

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = rate; // 1 = normal, 0.6 = slow for kids
  utterance.pitch = 1.15; // slightly cheerful higher pitch for children

  // Pick an English voice
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Victoria'))) 
               || voices.find(v => v.lang.startsWith('en')) 
               || null;
  if (enVoice) {
    utterance.voice = enVoice;
    utterance.lang = enVoice.lang;
  } else {
    utterance.lang = 'en-US';
  }

  if (onEndCallback) {
    utterance.onend = onEndCallback;
  }

  window.speechSynthesis.speak(utterance);
}

function speakInstruction(text, lang = 'id-ID') {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1.0;
  utterance.pitch = 1.1;

  const voices = window.speechSynthesis.getVoices();
  const targetVoice = voices.find(v => v.lang.startsWith(lang.slice(0, 2)));
  if (targetVoice) utterance.voice = targetVoice;

  window.speechSynthesis.speak(utterance);
}

// Pre-load voices
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

// ================= STARS SYSTEM =================
function addStars(count = 1) {
  state.stars += count;
  const starDisplay = document.getElementById('star-count');
  if (starDisplay) {
    starDisplay.textContent = state.stars;
    starDisplay.classList.remove('pulse-animation');
    void starDisplay.offsetWidth; // re-trigger reflow
    starDisplay.classList.add('pulse-animation');
  }
}

// ================= DRAG AND DROP LOGIC =================
function initDragAndDrop() {
  const dragItems = document.querySelectorAll('.drag-item');
  const dropZones = document.querySelectorAll('.drop-zone');

  dragItems.forEach(item => {
    // HTML5 Drag Events
    item.addEventListener('dragstart', (e) => {
      sfx.playPop();
      state.draggedPart = item.dataset.part;
      item.classList.add('dragging');
      e.dataTransfer.setData('text/plain', item.dataset.part);
      e.dataTransfer.effectAllowed = 'move';

      // Highlight target drop zones
      highlightMatchingZones(state.draggedPart);
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      state.draggedPart = null;
      clearTargetHighlights();
    });

    // Touch & Click to Select (Ideal for Tablets and 1st Graders)
    item.addEventListener('click', (e) => {
      // Don't trigger if mini audio button clicked
      if (e.target.closest('.btn-mini-audio')) return;

      sfx.playPop();
      const part = item.dataset.part;

      // Toggle selection
      if (state.selectedPartForTap === part) {
        state.selectedPartForTap = null;
        item.classList.remove('selected-for-tap');
        clearTargetHighlights();
      } else {
        document.querySelectorAll('.drag-item').forEach(i => i.classList.remove('selected-for-tap'));
        clearTargetHighlights();

        state.selectedPartForTap = part;
        item.classList.add('selected-for-tap');
        highlightMatchingZones(part);
        speakWord(VOCAB_DATA[part].word);
      }
    });
  });

  dropZones.forEach(zone => {
    // HTML5 Drag & Drop Target Events
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      clearTargetHighlights();
      const droppedPart = e.dataTransfer.getData('text/plain') || state.draggedPart;
      handlePlacement(droppedPart, zone);
    });

    // Click on Dropzone (completes tap-to-select flow)
    zone.addEventListener('click', () => {
      if (state.selectedPartForTap) {
        const selected = state.selectedPartForTap;
        clearTargetHighlights();
        handlePlacement(selected, zone);
      }
    });
  });
}

function highlightMatchingZones(part) {
  clearTargetHighlights();
  if (part === 'ears') {
    document.getElementById('zone-ear-left')?.classList.add('drag-target-hint');
    document.getElementById('zone-ear-right')?.classList.add('drag-target-hint');
  } else {
    document.getElementById(`zone-${part}`)?.classList.add('drag-target-hint');
  }
}

function clearTargetHighlights() {
  document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-target-hint'));
}

function handlePlacement(partName, dropZone) {
  if (!partName) return;
  const acceptPart = dropZone.dataset.accept;

  if (partName === acceptPart) {
    // Correct Match!
    sfx.playDing();
    state.placedParts[partName] = true;

    if (partName === 'ears') {
      // Fill both Left and Right Ear zones
      const leftZone = document.getElementById('zone-ear-left');
      const rightZone = document.getElementById('zone-ear-right');
      if (leftZone) {
        const leftCont = leftZone.querySelector('.dropped-content');
        if (leftCont) leftCont.innerHTML = VOCAB_DATA.ears.leftSvg;
        leftZone.classList.add('filled');
      }
      if (rightZone) {
        const rightCont = rightZone.querySelector('.dropped-content');
        if (rightCont) rightCont.innerHTML = VOCAB_DATA.ears.rightSvg;
        rightZone.classList.add('filled');
      }
    } else {
      // Normal single zone (eyes, nose, mouth)
      const container = dropZone.querySelector('.dropped-content');
      if (container) {
        container.innerHTML = VOCAB_DATA[partName].svg;
      }
      dropZone.classList.add('filled');
    }

    // Disable drag item in tray
    const itemEl = document.getElementById(`item-${partName}`);
    if (itemEl) {
      itemEl.classList.remove('selected-for-tap');
      itemEl.classList.add('disabled');
      itemEl.setAttribute('draggable', 'false');
    }
    state.selectedPartForTap = null;

    // Pronounce clearly!
    speakWord(VOCAB_DATA[partName].word, 1);

    addStars(1);
    updateFaceProgress();

  } else {
    // Incorrect match!
    sfx.playWrong();
    dropZone.classList.add('wrong-shake');
    setTimeout(() => dropZone.classList.remove('wrong-shake'), 600);
    
    // Friendly reminder
    const targetData = VOCAB_DATA[acceptPart];
    speakInstruction(`Ups, ini tempat untuk ${targetData.word}! Coba lagi yuk!`);
  }
}

function updateFaceProgress() {
  const placedCount = Object.values(state.placedParts).filter(Boolean).length;
  const statusEl = document.getElementById('face-status');
  const speakAllBtn = document.getElementById('btn-speak-all');

  if (statusEl) {
    if (placedCount === 4) {
      statusEl.textContent = '🎉 Lengkap! (4/4)';
      statusEl.classList.add('complete');
    } else {
      statusEl.textContent = `⭐ Terpasang: ${placedCount}/4`;
      statusEl.classList.remove('complete');
    }
  }

  if (speakAllBtn) {
    speakAllBtn.disabled = placedCount < 4;
  }

  // All 4 Placed -> CELEBRATION!
  if (placedCount === 4) {
    setTimeout(() => {
      triggerCelebration();
    }, 700);
  }
}

function resetFace() {
  sfx.playPop();
  Object.keys(state.placedParts).forEach(key => {
    state.placedParts[key] = false;

    if (key === 'ears') {
      ['zone-ear-left', 'zone-ear-right'].forEach(id => {
        const zone = document.getElementById(id);
        if (zone) {
          zone.classList.remove('filled');
          const container = zone.querySelector('.dropped-content');
          if (container) container.innerHTML = '';
        }
      });
    } else {
      const zone = document.getElementById(`zone-${key}`);
      if (zone) {
        zone.classList.remove('filled');
        const container = zone.querySelector('.dropped-content');
        if (container) container.innerHTML = '';
      }
    }

    const item = document.getElementById(`item-${key}`);
    if (item) {
      item.classList.remove('disabled', 'selected-for-tap');
      item.setAttribute('draggable', 'true');
    }
  });

  state.selectedPartForTap = null;
  state.draggedPart = null;
  updateFaceProgress();
}

function triggerCelebration() {
  sfx.playFanfare();
  addStars(3);

  // Confetti effect
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 300);
  }

  // Speak congratulatory phrase
  speakWord("Awesome! You completed Timi's face! Eyes, ears, nose, and mouth!");

  // Open modal
  const modal = document.getElementById('celebration-modal');
  if (modal) modal.classList.add('active');
}

// ================= MODAL: PRACTICE & REPEAT (TIRUKAN) =================
function openPracticeModal(wordKey) {
  sfx.playPop();
  state.currentPracticeWord = wordKey;
  const data = VOCAB_DATA[wordKey];

  document.getElementById('p-emoji').textContent = data.emoji;
  document.getElementById('p-word').textContent = data.word;
  document.getElementById('p-phonetic').textContent = data.phonetic;
  document.getElementById('p-meaning').textContent = data.meaning;
  document.getElementById('practice-result').innerHTML = '';
  document.getElementById('recording-indicator').classList.remove('active');

  const modal = document.getElementById('practice-modal');
  modal.classList.add('active');

  // Immediately play pronunciation once modal opens
  speakWord(data.word);
}

function closePracticeModal() {
  sfx.playPop();
  document.getElementById('practice-modal').classList.remove('active');
  if (state.recognition && state.isRecording) {
    state.recognition.stop();
  }
}

function initSpeechRecognition() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    console.log('Web Speech Recognition not supported in this browser.');
    return;
  }

  state.recognition = new SpeechRec();
  state.recognition.lang = 'en-US';
  state.recognition.continuous = false;
  state.recognition.interimResults = false;

  state.recognition.onstart = () => {
    state.isRecording = true;
    document.getElementById('recording-indicator').classList.add('active');
    document.getElementById('practice-result').innerHTML = '<span style="color:#636e72">Mendengarkan...</span>';
  };

  state.recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    const targetWord = VOCAB_DATA[state.currentPracticeWord].word.toLowerCase();
    const resultBox = document.getElementById('practice-result');

    // Compare similarity (allow plural / singular, e.g., eye vs eyes, ear vs ears)
    const isMatch = transcript.includes(targetWord) || 
                    (targetWord === 'eyes' && transcript.includes('eye')) ||
                    (targetWord === 'ears' && transcript.includes('ear')) ||
                    transcript === targetWord;

    if (isMatch) {
      sfx.playDing();
      addStars(2);
      resultBox.innerHTML = `
        <span style="color:#2ed573">🌟 HEBAT! Kamu melafalkan: "<b>${transcript}</b>" dengan sangat baik!</span>
      `;
      if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      }
    } else {
      resultBox.innerHTML = `
        <span style="color:#e67e22">Kamu menyebutkan: "<b>${transcript}</b>". Ayo dengarkan lagi dan coba ulangi: "<b>${targetWord}</b>"!</span>
      `;
    }
  };

  state.recognition.onerror = (err) => {
    console.warn('Speech rec error:', err);
    state.isRecording = false;
    document.getElementById('recording-indicator').classList.remove('active');
    const resultBox = document.getElementById('practice-result');
    resultBox.innerHTML = '<span style="color:#b2bec3">Mikrofon belum aktif, yuk coba tombol "Dengarkan Lagi" atau klik "Saya Sudah Tirukan"!</span>';
  };

  state.recognition.onend = () => {
    state.isRecording = false;
    document.getElementById('recording-indicator').classList.remove('active');
  };
}

// ================= MODE 3: AUDIO LISTENING QUIZ =================
function startQuiz() {
  state.quizCurrentIndex = 0;
  state.quizScore = 0;
  // Shuffle questions
  state.quizList = ['eyes', 'ears', 'nose', 'mouth'].sort(() => Math.random() - 0.5);
  updateQuizView();
}

function updateQuizView() {
  const currentKey = state.quizList[state.quizCurrentIndex];
  document.getElementById('quiz-current-num').textContent = state.quizCurrentIndex + 1;
  document.getElementById('quiz-score-val').textContent = state.quizScore;
  document.getElementById('quiz-progress-fill').style.width = `${((state.quizCurrentIndex + 1) / 4) * 100}%`;
  
  const feedback = document.getElementById('quiz-feedback');
  feedback.className = 'quiz-feedback-box';
  feedback.innerHTML = '';

  // Reset button states
  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.classList.remove('correct', 'wrong');
    btn.disabled = false;
  });

  // Prompt audio after short pause
  setTimeout(() => {
    playQuizAudio();
  }, 400);
}

function playQuizAudio() {
  sfx.playPop();
  const currentKey = state.quizList[state.quizCurrentIndex];
  const word = VOCAB_DATA[currentKey].word;
  speakWord(word);
  document.getElementById('quiz-hint-text').textContent = `Mendengarkan: "${word}"... Mana gambarnya?`;
}

function handleQuizAnswer(selectedKey, btnElement) {
  const currentTarget = state.quizList[state.quizCurrentIndex];
  const feedback = document.getElementById('quiz-feedback');

  // Disable buttons during evaluation
  document.querySelectorAll('.quiz-opt-btn').forEach(b => b.disabled = true);

  if (selectedKey === currentTarget) {
    // CORRECT!
    sfx.playDing();
    btnElement.classList.add('correct');
    state.quizScore += 25;
    document.getElementById('quiz-score-val').textContent = state.quizScore;
    addStars(1);

    feedback.className = 'quiz-feedback-box correct';
    feedback.innerHTML = `🎉 BENAR! Ini adalah <b>${VOCAB_DATA[currentTarget].word}</b> (${VOCAB_DATA[currentTarget].meaning})!`;

    if (typeof confetti === 'function') {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.65 } });
    }

    setTimeout(() => {
      nextQuizQuestion();
    }, 1800);

  } else {
    // WRONG!
    sfx.playWrong();
    btnElement.classList.add('wrong');
    feedback.className = 'quiz-feedback-box wrong';
    feedback.innerHTML = `Belum tepat. Coba dengarkan lagi ya!`;

    // Highlight the correct one
    const correctBtn = document.querySelector(`.quiz-opt-btn[data-answer="${currentTarget}"]`);
    if (correctBtn) correctBtn.classList.add('correct');

    setTimeout(() => {
      nextQuizQuestion();
    }, 2200);
  }
}

function nextQuizQuestion() {
  state.quizCurrentIndex++;
  if (state.quizCurrentIndex >= state.quizList.length) {
    // Quiz finished
    sfx.playFanfare();
    const feedback = document.getElementById('quiz-feedback');
    feedback.className = 'quiz-feedback-box correct';
    feedback.innerHTML = `🏆 Kuis Selesai! Skor Akhir: <b>${state.quizScore}</b> Poin! Hebat!`;
    addStars(2);
    setTimeout(() => {
      switchTab('game');
    }, 2500);
  } else {
    updateQuizView();
  }
}

// ================= TABS & SCREEN SWITCHER =================
function switchTab(mode) {
  sfx.playPop();
  state.currentMode = mode;

  // Tabs UI
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  // Screens UI
  document.querySelectorAll('.screen-view').forEach(screen => {
    screen.classList.remove('active');
  });

  const targetScreen = document.getElementById(`screen-${mode}`);
  if (targetScreen) targetScreen.classList.add('active');

  // Mode specific hooks
  if (mode === 'quiz') {
    startQuiz();
  }
}

// ================= EVENT LISTENERS INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initDragAndDrop();
  initSpeechRecognition();

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.mode);
    });
  });

  // Mode 1: Learn Cards Pronunciation Buttons
  document.querySelectorAll('.btn-speak').forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playPop();
      const wordKey = btn.dataset.word;
      speakWord(VOCAB_DATA[wordKey].word, 1);
    });
  });

  document.querySelectorAll('.btn-slow').forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playPop();
      const wordKey = btn.dataset.word;
      speakWord(VOCAB_DATA[wordKey].word, 0.6);
    });
  });

  document.querySelectorAll('.btn-practice').forEach(btn => {
    btn.addEventListener('click', () => {
      openPracticeModal(btn.dataset.word);
    });
  });

  document.getElementById('btn-go-to-game').addEventListener('click', () => {
    switchTab('game');
  });

  // Mode 2: Mini audio buttons on draggable tray
  document.querySelectorAll('.btn-mini-audio').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      sfx.playPop();
      const wordKey = btn.dataset.speak;
      speakWord(VOCAB_DATA[wordKey].word, 1);
    });
  });

  // Reset face button
  document.getElementById('btn-reset-face').addEventListener('click', resetFace);

  // Speak all parts on face
  document.getElementById('btn-speak-all').addEventListener('click', () => {
    sfx.playPop();
    speakWord("Eyes! Ears! Nose! and Mouth! Great job!", 0.9);
  });

  // Audio instruction button
  document.getElementById('btn-listen-task').addEventListener('click', () => {
    sfx.playPop();
    speakInstruction("Tarik anggota wajah di kotak kanan, lalu letakkan di posisi yang tepat pada wajah Timi!");
  });

  // Mode 3: Quiz audio button & answer options
  document.getElementById('btn-quiz-play-audio').addEventListener('click', playQuizAudio);

  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.dataset.answer;
      handleQuizAnswer(answer, btn);
    });
  });

  // Practice Modal Actions
  document.getElementById('btn-close-modal').addEventListener('click', closePracticeModal);
  
  document.getElementById('btn-modal-listen').addEventListener('click', () => {
    sfx.playPop();
    const data = VOCAB_DATA[state.currentPracticeWord];
    speakWord(data.word, 0.8);
  });

  document.getElementById('btn-modal-mic').addEventListener('click', () => {
    sfx.playPop();
    if (state.recognition) {
      try {
        state.recognition.start();
      } catch (e) {
        console.warn('Recognition already started or error:', e);
      }
    } else {
      document.getElementById('practice-result').innerHTML = `
        <span style="color:#636e72">Suara pelafalan: <b>${VOCAB_DATA[state.currentPracticeWord].word}</b>. Klik "Saya Sudah Tirukan" di bawah jika sudah melafalkannya! 👍</span>
      `;
    }
  });

  document.getElementById('btn-confirm-practice').addEventListener('click', () => {
    sfx.playDing();
    addStars(1);
    document.getElementById('practice-result').innerHTML = `
      <span style="color:#2ed573">🌟 Hebat! Bintangmu bertambah! Kamu murid pintar! ⭐</span>
    `;
    setTimeout(() => {
      closePracticeModal();
    }, 1200);
  });

  // Celebration Modal Actions
  document.getElementById('btn-replay-game').addEventListener('click', () => {
    sfx.playPop();
    document.getElementById('celebration-modal').classList.remove('active');
    resetFace();
  });

  document.getElementById('btn-go-quiz').addEventListener('click', () => {
    document.getElementById('celebration-modal').classList.remove('active');
    switchTab('quiz');
  });

  // Help Modal Actions
  const helpModal = document.getElementById('help-modal');
  document.getElementById('btn-help').addEventListener('click', () => {
    sfx.playPop();
    helpModal.classList.add('active');
  });

  document.getElementById('btn-close-help').addEventListener('click', () => {
    sfx.playPop();
    helpModal.classList.remove('active');
  });

  document.getElementById('btn-help-ok').addEventListener('click', () => {
    sfx.playPop();
    helpModal.classList.remove('active');
  });

  // Character switcher
  document.querySelectorAll('.char-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchCharacter(btn.dataset.char);
    });
  });

  // Sound toggle button
  const soundBtn = document.getElementById('btn-sound-toggle');
  soundBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
    sfx.playPop();
  });

  // Close modals when clicking outside modal card
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
});

function switchCharacter(charName) {
  sfx.playPop();
  state.currentChar = charName;
  document.querySelectorAll('.char-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.char === charName);
  });
  
  const shirt = document.getElementById('shirt-path');
  const hairBack = document.getElementById('hair-back-group');
  const hairFront = document.getElementById('hair-front-group');
  
  if (charName === 'lala') {
    if (shirt) shirt.setAttribute('fill', 'url(#shirt-lala)');
    if (hairBack) {
      hairBack.innerHTML = `
        <circle cx="60" cy="125" r="38" fill="url(#hair-lala)" />
        <circle cx="300" cy="125" r="38" fill="url(#hair-lala)" />
        <circle cx="80" cy="145" r="11" fill="#ff7675" />
        <circle cx="280" cy="145" r="11" fill="#ff7675" />
        <ellipse cx="180" cy="180" rx="142" ry="142" fill="url(#hair-lala)" />
      `;
    }
    if (hairFront) {
      hairFront.innerHTML = `
        <path d="M 72 135 C 90 70, 270 70, 288 135 C 265 118, 225 118, 205 130 C 185 118, 150 118, 130 130 C 110 120, 88 122, 72 135 Z" fill="url(#hair-lala)"/>
        <polygon points="100,105 103,113 111,113 105,118 107,126 100,121 93,126 95,118 89,113 97,113" fill="#ffeaa7" stroke="#fdcb6e" stroke-width="1.5"/>
      `;
    }
  } else {
    // Timi
    if (shirt) shirt.setAttribute('fill', 'url(#shirt-timi)');
    if (hairBack) {
      hairBack.innerHTML = `<ellipse cx="180" cy="180" rx="142" ry="142" fill="url(#hair-timi)" />`;
    }
    if (hairFront) {
      hairFront.innerHTML = `<path d="M 72 135 C 90 70, 270 70, 288 135 C 265 110, 225 110, 205 130 C 185 110, 150 110, 130 130 C 110 115, 88 120, 72 135 Z" fill="url(#hair-timi)"/>`;
    }
  }
}
