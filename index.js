document.addEventListener("DOMContentLoaded", function () {
  const timeFace = document.getElementById("timeFace");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  let countdown = null;
  let remainingTime = 0;
  let running = false;

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function parseInputToSeconds(text) {
    text = text.trim();
    if (!text) return NaN;
    const colonMatch = text.match(/^(\d+):(\d{1,2})$/);
    if (colonMatch) {
      const mins = parseInt(colonMatch[1], 10);
      const secs = parseInt(colonMatch[2], 10);
      if (secs >= 60) return NaN;
      return mins * 60 + secs;
    }
    const n = parseInt(text, 10);
    return isNaN(n) ? NaN : n;
  }

  function updateDisplay() {
    timeFace.textContent = formatTime(Math.max(0, Math.floor(remainingTime)));
  }

  function tick() {
    remainingTime--;
    if (remainingTime > 0) {
      updateDisplay();
    } else {
      // finish
      clearInterval(countdown);
      countdown = null;
      running = false;
      remainingTime = 0;
      updateDisplay();
    }
  }

  function startFrom(seconds) {
    clearInterval(countdown);
    if (isNaN(seconds) || seconds <= 0) {
      alert("Please enter a positive time (MM:SS or seconds).");
      return;
    }
    remainingTime = seconds;
    updateDisplay();
    // start interval
    countdown = setInterval(tick, 1000);
    running = true;
    timeFace.blur();
  }

  // Start button: if timer not running, read value and start; if paused (remainingTime>0) resume
  startBtn.addEventListener("click", () => {
    if (running) return; // already running
    if (remainingTime > 0) {
      // resume
      countdown = setInterval(tick, 1000);
      running = true;
    } else {
      // fresh start from editable field
      const seconds = parseInputToSeconds(timeFace.textContent);
      startFrom(seconds);
    }
  });

  // Stop button: pause if running; if not running and there is remainingTime, clear to zero
  stopBtn.addEventListener("click", () => {
    if (running) {
      clearInterval(countdown);
      countdown = null;
      running = false;
    } else {
      // not running: pause state -> reset to 00:00
      remainingTime = 0;
      updateDisplay();
    }
  });

  // Enter starts (same behavior as clicking Start); Escape normalizes and blurs
  timeFace.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!running) {
        const seconds = parseInputToSeconds(timeFace.textContent);
        startFrom(seconds);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      const seconds = parseInputToSeconds(timeFace.textContent);
      timeFace.textContent = !isNaN(seconds) && seconds >= 0 ? formatTime(seconds) : "00:00";
      timeFace.blur();
    }
  });

  timeFace.addEventListener("blur", () => {
    const seconds = parseInputToSeconds(timeFace.textContent);
    timeFace.textContent = !isNaN(seconds) && seconds >= 0 ? formatTime(seconds) : "00:00";
  });

  // initialize
  remainingTime = 0;
  updateDisplay();
});
