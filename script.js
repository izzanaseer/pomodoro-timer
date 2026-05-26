// ==========================================
// 1. DOM ELEMENTS (Bridging HTML to JS)
// ==========================================
const timerState = document.getElementById('timer-state');
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const focusInput = document.getElementById('focus-input');
const breakInput = document.getElementById('break-input');
const historyList = document.getElementById('history-list');
const alarmSound = new Audio('alarm.mp3');

// ==========================================
// 2. APP STATE VARIABLES (Timer's Memory)
// ==========================================
let timerInterval = null; // Stores the countdown engine loop
let isPaused = true;      // Tracks if the timer is stopped or running
let currentMode = 'focus'; // Can be 'focus' or 'break'
let timeLeft = 25 * 60;   // Time remaining in TOTAL SECONDS (Default: 25 mins)

// ==========================================
// 3. CORE TIMER FUNCTIONS
// ==========================================

function playAlarm() {
    alarmSound.currentTime = 0; // Rewind sound to the beginning
    alarmSound.play().catch(error => console.log("Audio waiting for user click:", error));
}

// Temporary placeholder function so the code doesn't crash
function logSession() {
    console.log("Session completed! History logging will go here next.");
}

// Updates the big text display on the screen
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // "padStart(2, '0')" ensures that if seconds is 5, it displays as "05" instead of "5"
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    
    timeDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
}

// Adjusts application colors based on what the timer is doing
function updateTheme() {
    if (isPaused) {
        // Muted gray/blue if the app is paused or inactive
        document.documentElement.style.setProperty('--bg-color', '#f0f4f8');
    } else if (currentMode === 'focus') {
        // Deep, motivating, focused brick-red/terracotta background
        document.documentElement.style.setProperty('--bg-color', '#fff5f5');
        document.documentElement.style.setProperty('--state-color', '#e53e3e');
    } else if (currentMode === 'break') {
        // Relaxing, soothing pastel green background
        document.documentElement.style.setProperty('--bg-color', '#f0fff4');
        document.documentElement.style.setProperty('--state-color', '#38a169');
    }
}

// This function runs every 1 second when the timer is active
function tick() {
    if (timeLeft > 0) {
        timeLeft--; // Subtract 1 second
        updateDisplay(); // Show the new time on screen
    } else {
        // TIMER ran out and HIT 00:00! Switch modes automatically
        switchMode();
    }
}

// Switches between Focus and Break modes seamlessly
function switchMode() {
    playAlarm();

    if (currentMode === 'focus') {
        // If we just finished focus, log it to history before switching!
        logSession(); 

        currentMode = 'break';
        timerState.textContent = "Break Time 🎉";
        timeLeft = breakInput.value * 60; // Set time to break duration input
    } else {
        currentMode = 'focus';
        timerState.textContent = "Focus Time 💪";
        timeLeft = focusInput.value * 60; // Set time to focus duration input
    }

    updateTheme();
    updateDisplay();
}

// ==========================================
// 4. BUTTON & INPUT EVENT LISTENERS
// ==========================================

// Update display instantly when user types a new focus duration
focusInput.addEventListener('input', () => {
    if (isPaused && currentMode === 'focus') {
        timeLeft = focusInput.value * 60;
        updateDisplay();
    }
});

// Update display instantly when user types a new break duration
breakInput.addEventListener('input', () => {
    if (isPaused && currentMode === 'break') {
        timeLeft = breakInput.value * 60;
        updateDisplay();
    }
});

// When START is clicked
startBtn.addEventListener('click', () => {
    if (isPaused) {
        isPaused = false;
        updateTheme();
        
        // Disable Start, Enable Pause
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        
        // Start the engine! Run the 'tick' function every 1000 milliseconds (1 second)
        timerInterval = setInterval(tick, 1000);
    }
});

// When PAUSE is clicked
pauseBtn.addEventListener('click', () => {
    isPaused = true;
    updateTheme();
    
    // Disable Pause, Enable Start
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    // Stop the engine loop
    clearInterval(timerInterval);
});

// When RESET is clicked
resetBtn.addEventListener('click', () => {
    isPaused = true;
    clearInterval(timerInterval);
    
    // Reset buttons
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    // Reset to user's custom focus setting input
    currentMode = 'focus';
    timerState.textContent = "Focus Time";
    timeLeft = focusInput.value * 60; 
    
    updateDisplay();
    updateTheme();
});

// Initialize the screen right away on page load
updateDisplay();