const grid = document.getElementById("gameGrid");
const playBtn = document.getElementById("playBtn");
const cashoutBtn = document.getElementById("cashoutBtn");
let activeGame = false;
let multiplier = 1.0;
let winAmount = 0;
let balance = 1000;
let selected = 0;
let trapIndexes = [];

function updateDisplay() {
  document.getElementById("multiplier").textContent = `x${multiplier.toFixed(2)}`;
  document.getElementById("winAmount").textContent = `${winAmount.toFixed(2)} Rs`;
  document.getElementById("balance").textContent = `${balance.toFixed(2)} Rs`;
}

function generateGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const btn = document.createElement("button");
    btn.disabled = !activeGame;
    btn.onclick = () => selectTile(i, btn);
    grid.appendChild(btn);
  }
}

function selectTile(index, btn) {
  if (!activeGame || btn.disabled) return;

  btn.disabled = true;

  if (trapIndexes.includes(index)) {
    btn.textContent = "💣";
    endGame(false);
  } else {
    btn.textContent = "💎";
    selected++;
    multiplier += 0.15;
    winAmount = parseInt(document.getElementById("betAmount").value) * multiplier;
    updateDisplay();
  }
}

function startGame() {
  if (activeGame) return;
  const traps = parseInt(document.getElementById("trapsCount").value);
  const bet = parseInt(document.getElementById("betAmount").value);
  if (bet > balance) return alert("Insufficient balance!");

  balance -= bet;
  multiplier = 1.0;
  winAmount = 0;
  selected = 0;
  activeGame = true;
  updateDisplay();

  const indices = Array.from({ length: 25 }, (_, i) => i);
  trapIndexes = [];
  while (trapIndexes.length < traps) {
    const idx = Math.floor(Math.random() * indices.length);
    trapIndexes.push(...indices.splice(idx, 1));
  }

  generateGrid();
}

function endGame(won) {
  activeGame = false;
  document.querySelectorAll("#gameGrid button").forEach(btn => btn.disabled = true);

  if (won) {
    balance += winAmount;
    saveGame(winAmount);
  }

  updateDisplay();
}

function saveGame(amount) {
  fetch("/api/save", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      playerName: "Guest",
      bet: parseInt(document.getElementById("betAmount").value),
      multiplier,
      winAmount: amount
    })
  }).then(loadLeaderboard);
}

function loadLeaderboard() {
  fetch("/api/leaderboard")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("leaderboardTable");
      tbody.innerHTML = "";
      data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${row.playerName}</td><td>${row.bet}</td><td>x${row.multiplier.toFixed(2)}</td><td>${row.winAmount}</td>`;
        tbody.appendChild(tr);
      });
    });
}

playBtn.onclick = startGame;
cashoutBtn.onclick = () => endGame(true);
generateGrid();
loadLeaderboard();
updateDisplay();
// auth.js or inside script.js

// Get token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
async function saveGame(result) {
  try {
    const res = await fetch("/api/game/save", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(result),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("Game saved", data);
    } else {
      console.error("Save failed:", data.error);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
