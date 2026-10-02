// TypeX - Modern Typing Practice Application

// DOM Elements
const typingTestSection = document.getElementById('test');
const practiceSection = document.getElementById('practice');
const statsSection = document.getElementById('stats');
const settingsSection = document.getElementById('settings');
const resultsSection = document.getElementById('results');

const textDisplay = document.getElementById('text-display');
const typingInput = document.getElementById('typing-input');
const restartBtn = document.getElementById('restart-btn');

const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timeDisplay = document.getElementById('time');
const errorsDisplay = document.getElementById('errors');

const practiceDisplay = document.getElementById('practice-display');
const practiceInput = document.getElementById('practice-input');
const practiceWpmDisplay = document.getElementById('practice-wpm');
const practiceAccuracyDisplay = document.getElementById('practice-accuracy');

const resultWpm = document.getElementById('result-wpm');
const resultAccuracy = document.getElementById('result-accuracy');
const resultChars = document.getElementById('result-chars');
const resultErrors = document.getElementById('result-errors');
const resultTime = document.getElementById('result-time');
const tryAgainBtn = document.getElementById('try-again');
const newTestBtn = document.getElementById('new-test');

const navLinks = document.querySelectorAll('nav a');
const profileBtn = document.querySelector('.profile-btn');

const difficultyBtns = document.querySelectorAll('.difficulty-btn');
const durationBtns = document.querySelectorAll('.duration-btn');
const themeBtns = document.querySelectorAll('.theme-btn');
const soundToggle = document.getElementById('sound-toggle');
const highlightToggle = document.getElementById('highlight-toggle');
const saveSettingsBtn = document.getElementById('save-settings');
const resetStatsBtn = document.getElementById('reset-stats');

const bestWpmDisplay = document.getElementById('best-wpm');
const avgWpmDisplay = document.getElementById('avg-wpm');
const bestAccuracyDisplay = document.getElementById('best-accuracy');
const testsCompletedDisplay = document.getElementById('tests-completed');

// Application State
let state = {
    currentText: '',
    typedText: '',
    startTime: 0,
    timer: null,
    timeLimit: 60, // seconds
    wpm: 0,
    accuracy: 100,
    errors: 0,
    charsTyped: 0,
    isTesting: false,
    isPracticeMode: false,
    practiceLevel: 'beginner',
    testDuration: 60,
    theme: 'dark',
    soundEnabled: true,
    highlightErrors: true,
    passages: {
        test: [
            "The quick brown fox jumps over the lazy dog.",
            "Pack my box with five dozen liquor jugs.",
            "How vexingly quick daft zebras jump!",
            "Sphinx of black quartz, judge my vow.",
            "Five quacking zephyrs jolt my wax bed.",
            "Jackdaws love my big sphinx of quartz.",
            "Waltz, nymph, for quick jigs vex Bud.",
            "Cozy sphinx waves quart jug of bad milk.",
            "Quick zephyrs blow, vexing daft Jim.",
            "Blowzy red vixens fight for quick jack."
        ],
        beginner: [
            "The cat sat on the mat.",
            "Hello world!",
            "I like to type.",
            "Practice makes perfect.",
            "Today is a good day.",
            "My name is Alex.",
            "I love to code.",
            "The sky is blue.",
            "Birds fly in the sky.",
            "Fish swim in water."
        ],
        intermediate: [
            "Programming is fun and challenging.",
            "I enjoy learning new things every day.",
            "The quick brown fox jumps over the lazy dog.",
            "Consistent practice leads to improvement.",
            "Keyboard skills are essential in modern life.",
            "Technology continues to advance rapidly.",
            "Problem solving requires logical thinking.",
            "Creativity and innovation drive progress.",
            "Effective communication is key to success.",
            "Hard work and dedication pay off."
        ],
        advanced: [
            "The quintessential brown fox demonstrated remarkable agility when leaping over the indolent canine.",
            "Participants in the lexical decathlon must exhibit extraordinary precision and velocity.",
            "Pseudonyms are particularly useful in literary contexts where anonymity is desired.",
            "The characterization of juxtaposition emphasizes stark differences between elements.",
            "Zephyrs zealously zipped through the zenith, creating a melodious whistling sound.",
            "Quantum mechanics perplexes even the most erudite physicists with its paradoxical principles.",
            "Ubiquitous computing environments necessitate robust security protocols and encryption.",
            "Philosophical discourse often examines the fundamental nature of reality and existence.",
            "Architectural blueprints require meticulous attention to structural integrity and aesthetics.",
            "Bioluminescent organisms illuminate ocean depths with ethereal, pulsing glows."
        ]
    },
    stats: {
        bestWpm: 0,
        totalWpm: 0,
        testsCount: 0,
        bestAccuracy: 0
    }
};

// Initialize Application
function init() {
    loadSettings();
    loadStats();
    showSection('test');
    loadRandomTestPassage();
    setupEventListeners();
    applyTheme();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
            updateNavActive(link);
        });
    });
    
    // Profile button (opens settings)
    profileBtn.addEventListener('click', () => {
        showSection('settings');
        updateNavActive(document.querySelector('nav a[data-section="settings"]'));
    });
    
    // Typing test
    typingInput.addEventListener('input', handleTypingInput);
    typingInput.addEventListener('focus', () => {
        if (!state.isTesting) startTest();
    });
    restartBtn.addEventListener('click', restartTest);
    
    // Practice mode
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.practiceLevel = btn.getAttribute('data-level');
            loadPracticePassage();
            resetPracticeStats();
        });
    });
    
    practiceInput.addEventListener('input', handlePracticeInput);
    practiceInput.addEventListener('focus', () => {
        if (!state.isPracticeMode) startPractice();
    });
    
    // Results screen
    tryAgainBtn.addEventListener('click', () => {
        showSection('test');
        restartTest();
    });
    newTestBtn.addEventListener('click', () => {
        showSection('test');
        loadRandomTestPassage();
        restartTest();
    });
    
    // Settings
    durationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            durationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.testDuration = parseInt(btn.getAttribute('data-time'));
        });
    });
    
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.theme = btn.getAttribute('data-theme');
            applyTheme();
        });
    });
    
    soundToggle.addEventListener('change', () => {
        state.soundEnabled = soundToggle.checked;
        saveSettings();
    });
    
    highlightToggle.addEventListener('change', () => {
        state.highlightErrors = highlightToggle.checked;
        saveSettings();
    });
    
    saveSettingsBtn.addEventListener('click', () => {
        saveSettings();
        showNotification('Settings saved!');
    });
    
    resetStatsBtn.addEventListener('click', () => {
        if (confirm('Reset all statistics?')) {
            resetStats();
            showNotification('Statistics reset!');
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (resultsSection.classList.contains('active')) {
                showSection('test');
            }
        }
    });
}

// Section Management
function showSection(sectionId) {
    const sections = document.querySelectorAll('.page');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function updateNavActive(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Typing Test Logic
function loadRandomTestPassage() {
    const passages = state.passages.test;
    const randomIndex = Math.floor(Math.random() * passages.length);
    state.currentText = passages[randomIndex];
    renderTextDisplay();
    resetTestStats();
}

function renderTextDisplay() {
    textDisplay.innerHTML = '';
    state.currentText.split('').forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char === ' ' ? ' ' : char;
        charSpan.className = 'untyped';
        charSpan.dataset.index = index;
        textDisplay.appendChild(charSpan);
    });
}

function handleTypingInput(e) {
    const typedValue = typingInput.value;
    state.typedText = typedValue;
    
    if (!state.isTesting && typedValue.length > 0) {
        startTest();
    }
    
    updateHighlighting();
    updateStats();
    
    // Check if test is complete
    if (typedValue.length === state.currentText.length) {
        finishTest();
    }
}

function startTest() {
    state.isTesting = true;
    state.startTime = Date.now();
    state.typedText = '';
    typingInput.value = '';
    clearInterval(state.timer);
    state.timer = setInterval(updateTimer, 1000);
    updateTimer(); // Initial update
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const remaining = state.timeLimit - elapsed;
    
    if (remaining <= 0) {
        finishTest();
        return;
    }
    
    timeDisplay.textContent = `${remaining}s`;
}

function updateHighlighting() {
    const chars = textDisplay.querySelectorAll('span');
    const typed = state.typedText;
    
    chars.forEach((charSpan, index) => {
        const correctChar = state.currentText[index];
        const typedChar = typed[index];
        
        // Remove all classes
        charSpan.className = '';
        
        if (index < typed.length) {
            // Character has been typed
            if (typedChar === correctChar) {
                charSpan.classList.add('correct');
            } else {
                charSpan.classList.add('incorrect');
                if (state.highlightErrors && !charSpan.dataset.errorPlayed) {
                    playErrorSound();
                    charSpan.dataset.errorPlayed = true;
                }
            }
        } else if (index === typed.length) {
            // Current character to type
            charSpan.classList.add('current-char');
        } else {
            // Future characters
            charSpan.classList.add('untyped');
        }
    });
    // REMOVED: typingInput.value = state.typedText;
}

function updateStats() {
    const typed = state.typedText;
    const correctChars = getCorrectChars(typed);
    const totalChars = typed.length;
    
    // Calculate accuracy
    state.accuracy = totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100);
    
    // Calculate WPM (words per minute)
    const minutes = Math.max((Date.now() - state.startTime) / 60000, 0.001); // Avoid division by zero
    const words = correctChars / 5; // Assuming 5 characters per word
    state.wpm = Math.round(words / minutes);
    
    // Update errors
    state.errors = typed.length - correctChars;
    
    // Update displays
    wpmDisplay.textContent = state.wpm;
    accuracyDisplay.textContent = `${state.accuracy}%`;
    errorsDisplay.textContent = state.errors;
    
    // REMOVED: typingInput.value = state.typedText;
}

function getCorrectChars(typed) {
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] === state.currentText[i]) {
            correct++;
        }
    }
    return correct;
}

function finishTest() {
    state.isTesting = false;
    clearInterval(state.timer);
    
    // Final calculations
    updateStats();
    
    // Update stats
    updateSessionStats();
    
    // Show results
    showResults();
    
    // Play completion sound
    playCompletionSound();
}

function updateSessionStats() {
    state.stats.testsCount++;
    state.stats.totalWpm += state.wpm;
    
    if (state.wpm > state.stats.bestWpm) {
        state.stats.bestWpm = state.wpm;
    }
    
    if (state.accuracy > state.stats.bestAccuracy) {
        state.stats.bestAccuracy = state.accuracy;
    }
    
    saveStats();
    updateStatsDisplay();
}

function showResults() {
    resultWpm.textContent = state.wpm;
    resultAccuracy.textContent = `${state.accuracy}%`;
    resultChars.textContent = state.currentText.length;
    resultErrors.textContent = state.errors;
    resultTime.textContent = `${state.timeLimit}s`;
    
    showSection('results');
}

function restartTest() {
    state.isTesting = false;
    clearInterval(state.timer);
    loadRandomTestPassage();
    resetTestStats();
    typingInput.value = '';
    textDisplay.innerHTML = '';
    renderTextDisplay();
    timeDisplay.textContent = `${state.timeLimit}s`;
}

function resetTestStats() {
    state.wpm = 0;
    state.accuracy = 100;
    state.errors = 0;
    state.typedText = '';
    state.isTesting = false;
    
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    timeDisplay.textContent = `${state.timeLimit}s`;
    errorsDisplay.textContent = '0';
}

// Practice Mode Logic
function loadPracticePassage() {
    const passages = state.passages[state.practiceLevel];
    const randomIndex = Math.floor(Math.random() * passages.length);
    state.currentText = passages[randomIndex];
    renderPracticeDisplay();
    resetPracticeStats();
}

function renderPracticeDisplay() {
    practiceDisplay.innerHTML = '';
    state.currentText.split('').forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char === ' ' ? ' ' : char;
        charSpan.className = 'untyped';
        charSpan.dataset.index = index;
        practiceDisplay.appendChild(charSpan);
    });
}

function handlePracticeInput(e) {
    const typedValue = practiceInput.value;
    state.typedText = typedValue;
    
    if (!state.isPracticeMode && typedValue.length > 0) {
        startPractice();
    }
    
    updatePracticeHighlighting();
    updatePracticeStats();
}

function startPractice() {
    state.isPracticeMode = true;
    state.typedText = '';
    practiceInput.value = '';
}

function updatePracticeHighlighting() {
    const chars = practiceDisplay.querySelectorAll('span');
    const typed = state.typedText;
    
    chars.forEach((charSpan, index) => {
        const correctChar = state.currentText[index];
        const typedChar = typed[index];
        
        charSpan.className = '';
        
        if (index < typed.length) {
            if (typedChar === correctChar) {
                charSpan.classList.add('correct');
            } else {
                charSpan.classList.add('incorrect');
            }
        } else if (index === typed.length) {
            charSpan.classList.add('current-char');
        } else {
            charSpan.classList.add('untyped');
        }
    });
    // REMOVED: practiceInput.value = state.typedText;
}

function updatePracticeStats() {
    const typed = state.typedText;
    const correctChars = getCorrectChars(typed);
    const totalChars = typed.length;
    
    const accuracy = totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100);
    
    // For practice, we'll show simple stats without timing
    practiceWpmDisplay.textContent = Math.round((correctChars / 5) / Math.max(typed.length / 300, 0.01)); // Rough estimate
    practiceAccuracyDisplay.textContent = `${accuracy}%`;
    
    // REMOVED: practiceInput.value = state.typedText;
}

function resetPracticeStats() {
    state.typedText = '';
    state.isPracticeMode = false;
    practiceInput.value = '';
    practiceWpmDisplay.textContent = '0';
    practiceAccuracyDisplay.textContent = '100%';
    renderPracticeDisplay();
}

// Statistics
function loadStats() {
    const savedStats = localStorage.getItem('typexStats');
    if (savedStats) {
        state.stats = JSON.parse(savedStats);
    }
    updateStatsDisplay();
}

function saveStats() {
    localStorage.setItem('typexStats', JSON.stringify(state.stats));
}

function updateStatsDisplay() {
    bestWpmDisplay.textContent = state.stats.bestWpm || 0;
    avgWpmDisplay.textContent = state.stats.testsCount > 0 ? Math.round(state.stats.totalWpm / state.stats.testsCount) : 0;
    bestAccuracyDisplay.textContent = `${state.stats.bestAccuracy || 0}%`;
    testsCompletedDisplay.textContent = state.stats.testsCount || 0;
}

function resetStats() {
    state.stats = {
        bestWpm: 0,
        totalWpm: 0,
        testsCount: 0,
        bestAccuracy: 0
    };
    saveStats();
    updateStatsDisplay();
}

// Settings
function loadSettings() {
    const savedSettings = localStorage.getItem('typexSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        state.testDuration = settings.testDuration || 60;
        state.theme = settings.theme || 'dark';
        state.soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : true;
        state.highlightErrors = state.highlightErrors !== undefined ? state.highlightErrors : true;
    }
    
    // Apply loaded settings to UI
    updateDurationButtons();
    updateThemeButtons();
    soundToggle.checked = state.soundEnabled;
    highlightToggle.checked = state.highlightErrors;
}

function saveSettings() {
    const settings = {
        testDuration: state.testDuration,
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        highlightErrors: state.highlightErrors
    };
    localStorage.setItem('typexSettings', JSON.stringify(settings));
    applyTheme();
}

function updateDurationButtons() {
    durationBtns.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.getAttribute('data-time')) === state.testDuration) {
            btn.classList.add('active');
        }
    });
}

function updateThemeButtons() {
    themeBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === state.theme) {
            btn.classList.add('active');
        }
    });
}

function applyTheme() {
    // Remove all theme classes
    document.documentElement.classList.remove('theme-dark', 'theme-light', 'theme-blue');
    
    // Add current theme
    document.documentElement.classList.add(`theme-${state.theme}`);
    
    // Update CSS variables based on theme
    if (state.theme === 'dark') {
        document.documentElement.style.setProperty('--bg-dark', '#0a0a0a');
        document.documentElement.style.setProperty('--bg-darker', '#050505');
        document.documentElement.style.setProperty('--bg-card', '#111111');
        document.documentElement.style.setProperty('--accent', '#00f3ff');
    } else if (state.theme === 'light') {
        document.documentElement.style.setProperty('--bg-dark', '#f5f5f5');
        document.documentElement.style.setProperty('--bg-darker', '#e0e0e0');
        document.documentElement.style.setProperty('--bg-card', '#ffffff');
        document.documentElement.style.setProperty('--accent', '#0066ff');
        document.documentElement.style.setProperty('--text-primary', '#000000');
        document.documentElement.style.setProperty('--text-secondary', '#666666');
        document.documentElement.style.setProperty('--text-muted', '#999999');
    } else if (state.theme === 'blue') {
        document.documentElement.style.setProperty('--bg-dark', '#001a33');
        document.documentElement.style.setProperty('--bg-darker', '#000d1a');
        document.documentElement.style.setProperty('--bg-card', '#002640');
        document.documentElement.style.setProperty('--accent', '#00bfff');
    }
}

// Sound Effects
function playErrorSound() {
    if (!state.soundEnabled) return;
    // Simple beep using Web Audio API
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

function playCompletionSound() {
    if (!state.soundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator1 = audioCtx.createOscillator();
        const oscillator2 = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator1.type = 'sine';
        oscillator2.type = 'sine';
        oscillator1.frequency.setValueAtTime(500, audioCtx.currentTime);
        oscillator2.frequency.setValueAtTime(600, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator1.start();
        oscillator2.start();
        oscillator1.stop(audioCtx.currentTime + 0.5);
        oscillator2.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Utility Functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 30px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 0.9rem;
    }
    .notification.show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
