/* global document, window */
let homeScore = 0;
let guestScore = 0;
let homeFouls = 0;
let guestFouls = 0;
let period = 1;
let timerSeconds = 600;
let timerIntervalId = null;

const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");
const homeFoulsEl = document.getElementById("home-fouls");
const guestFoulsEl = document.getElementById("guest-fouls");
const periodEl = document.getElementById("period-value");
const timerEl = document.getElementById("timer-value");
const homeCardEl = document.getElementById("home-card");
const guestCardEl = document.getElementById("guest-card");
const leaderNoteEl = document.getElementById("leader-note");

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateLeaderHighlight() {
  homeCardEl.classList.remove("leader");
  guestCardEl.classList.remove("leader");

  if (homeScore === guestScore) {
    leaderNoteEl.textContent = "Leader: Tie game";
    return;
  }

  if (homeScore > guestScore) {
    homeCardEl.classList.add("leader");
    leaderNoteEl.textContent = "Leader: Home";
    return;
  }

  guestCardEl.classList.add("leader");
  leaderNoteEl.textContent = "Leader: Guest";
}

function renderAll() {
  homeScoreEl.textContent = homeScore;
  guestScoreEl.textContent = guestScore;
  homeFoulsEl.textContent = homeFouls;
  guestFoulsEl.textContent = guestFouls;
  periodEl.textContent = period;
  timerEl.textContent = formatTime(timerSeconds);
  updateLeaderHighlight();
}

window.addPoints = function addPoints(team, points) {
  if (team === "home") {
    homeScore += points;
  } else {
    guestScore += points;
  }

  renderAll();
};

window.changeFouls = function changeFouls(team, delta) {
  if (team === "home") {
    homeFouls = Math.max(0, homeFouls + delta);
  } else {
    guestFouls = Math.max(0, guestFouls + delta);
  }

  renderAll();
};

window.changePeriod = function changePeriod(delta) {
  period = Math.min(4, Math.max(1, period + delta));
  renderAll();
};

window.startTimer = function startTimer() {
  if (timerIntervalId !== null || timerSeconds === 0) {
    return;
  }

  timerIntervalId = window.setInterval(() => {
    timerSeconds -= 1;
    renderAll();

    if (timerSeconds === 0) {
      window.clearInterval(timerIntervalId);
      timerIntervalId = null;
    }
  }, 1000);
};

window.pauseTimer = function pauseTimer() {
  if (timerIntervalId === null) {
    return;
  }

  window.clearInterval(timerIntervalId);
  timerIntervalId = null;
};

window.resetTimer = function resetTimer() {
  window.pauseTimer();
  timerSeconds = 600;
  renderAll();
};

window.newGame = function newGame() {
  window.pauseTimer();
  homeScore = 0;
  guestScore = 0;
  homeFouls = 0;
  guestFouls = 0;
  period = 1;
  timerSeconds = 600;
  renderAll();
};

renderAll();
