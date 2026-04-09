document.addEventListener("DOMContentLoaded", function () {
    const timeFace = document.getElementById("timeFace");
    const startBtn = document.getElementById("startBtn");
    let countdown;

    // format time function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    // countdown function
    function startCountdown() {
        clearInterval(countdown);
        let remainingTime = paresInt(inputSeconds.value);

        if (isNaN(remainingTime) || remainingTime <= 0) {
            alert("need positive number");
            return;
        }

        timeFace.textContent = formatTime(remainingTime);

        countdown = setInterval(() => {
            remainingTime--;

            if (remainingTime >= 0) {
                timeFace.textContent = formatTime(remainingTime);
            } else {
                clearInterval(countdown);
                timeFace.textContent = "00:00";
                inputSeconds.value = "";
            }
        }, 1000);
    }

    startBtn.addEventListener("click", startCountdown);
});