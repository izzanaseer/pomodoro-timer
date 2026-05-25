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

// ==========================================
// 2. APP STATE VARIABLES (The Timer's Memory)
// ==========================================
let timerInterval = null; // Stores the countdown engine loop
let isPaused = true;      // Tracks if the timer is stopped or running
let currentMode = 'focus'; // Can be 'focus' or 'break'
let timeLeft = 25 * 60;   // Time remaining in TOTAL SECONDS (Default: 25 mins)

// ==========================================
// 3. CORE TIMER FUNCTIONS
// ==========================================

// Updates the big text display on the screen
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // "padStart(2, '0')" ensures that if seconds is 5, it displays as "05" instead of "5"
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    
    timeDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
}

// This function runs every 1 second when the timer is active
function tick() {
    if (timeLeft > 0) {
        timeLeft--; // Subtract 1 second
        updateDisplay(); // Show the new time on screen
    } else {
        // Time ran out! (We will handle switching from focus to break here later)
        clearInterval(timerInterval);
        alert("Session Finished!"); 
    }
}

// ==========================================
// 4. BUTTON EVENT LISTENERS
// ==========================================

// When START is clicked
startBtn.addEventListener('click', () => {
    if (isPaused) {
        isPaused = false;
        
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
});

// Initialize the screen right away on page load
updateDisplay();