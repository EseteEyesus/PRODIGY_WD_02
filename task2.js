    let startTime;
    let elapsedTime = 0;
    let timerInterval;

    function timeToString(time) {
        let date = new Date(time);
        let hours = date.getUTCHours().toString().padStart(2, '0');
        let minutes = date.getUTCMinutes().toString().padStart(2, '0');
        let seconds = date.getUTCSeconds().toString().padStart(2, '0');
        let milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    function startStopwatch() {
        if (!timerInterval) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                document.getElementById("display").textContent = timeToString(elapsedTime);
            }, 10);
        }
    }
function pauseStopwatch() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetStopwatch() {
        clearInterval(timerInterval);
        timerInterval = null;
        elapsedTime = 0;
        document.getElementById("display").textContent = "00:00:00.000";
        document.getElementById("laps").innerHTML = "";
        localStorage.removeItem("laps");
    }

    function recordLap() {
        const lapTime = timeToString(elapsedTime);
        const lapContainer = document.getElementById("laps");
        const lapItem = document.createElement("div");
        lapItem.className = "lap-item";
        lapItem.textContent = lapTime;
        lapContainer.appendChild(lapItem);
        saveLap(lapTime);
    }

    function saveLap(lapTime) {
        let laps = JSON.parse(localStorage.getItem("laps")) || [];
        laps.push(lapTime);
        localStorage.setItem("laps", JSON.stringify(laps));
    }

    function loadLaps() {
        let laps = JSON.parse(localStorage.getItem("laps")) || [];
        laps.forEach(lapTime => {
            const lapContainer = document.getElementById("laps");
            const lapItem = document.createElement("div");
            lapItem.className = "lap-item";
            lapItem.textContent = lapTime;
            lapContainer.appendChild(lapItem);
        });
    }

    function downloadLaps() {
        let laps = JSON.parse(localStorage.getItem("laps")) || [];
        let lapText = laps.join("\n");
        let blob = new Blob([lapText], { type: 'text/plain' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'laps.txt';
        link.click();
} 
    window.onload = loadLaps;