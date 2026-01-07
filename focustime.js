let timer = null; // Initialize as null
let isTimerRunning = false; // A "flag" to track state

function startFocus() {
    // Prevent multiple timers from starting if they click twice
    if (isTimerRunning) return; 

    let timeLeft = 25 * 60;
    const display = document.getElementById("timerDisplay");
    
    // Check if the element exists to avoid errors
    if (!display) return; 

    isTimerRunning = true;
    document.getElementById("focusBox").classList.add("active-focus");
    
    timer = setInterval(() => {
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        display.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            isTimerRunning = false;
            alert("Great job! You earned 20 Coins!");
        }
        timeLeft--;
    }, 1000);
}

// THE "TWIST": Only reset if the timer was actually active
document.addEventListener("visibilitychange", () => {
    if (document.hidden && isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false; // Reset the state
        alert("Focus broken! You switched tabs. Timer reset.");
        
        // Instead of reload, just reset the text
        document.getElementById("timerDisplay").innerText = "25:00";
        document.getElementById("focusBox").classList.remove("active-focus");
    }
});