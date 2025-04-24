const randomWords = ["apple", "banana", "cherry", "orange"];
let selectedWord = "";
let guessed = [];
let maxTries = 6;
let wrongGuesses = 0;
const canvas = document.getElementById('hangman');
const ctx = canvas.getContext('2d');

function drawHangman(step) {
  switch(step) {
    case 1:
      ctx.moveTo(10, 240); ctx.lineTo(190, 240);
      ctx.moveTo(50, 240); ctx.lineTo(50, 20);
      ctx.lineTo(130, 20); ctx.lineTo(130, 40);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath(); ctx.arc(130, 60, 20, 0, Math.PI * 2); ctx.stroke();
      break;
    case 3:
      ctx.moveTo(130, 80); ctx.lineTo(130, 140); ctx.stroke();
      break;
    case 4:
      ctx.moveTo(130, 90); ctx.lineTo(100, 120); ctx.stroke();
      break;
    case 5:
      ctx.moveTo(130, 90); ctx.lineTo(160, 120); ctx.stroke();
      break;
    case 6:
      ctx.moveTo(130, 140); ctx.lineTo(100, 190); ctx.stroke();
      ctx.moveTo(130, 140); ctx.lineTo(160, 190); ctx.stroke();
      break;
  }
}

function drawFullHangman() {
  for (let i = 1; i <= 6; i++) drawHangman(i);
}

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}

function startGame() {
  const inputWord = document.getElementById("custom-word").value.trim().toLowerCase();
  selectedWord = inputWord !== "" ? inputWord : randomWords[Math.floor(Math.random() * randomWords.length)];
  guessed = [];
  wrongGuesses = 0;
  document.getElementById("message").textContent = "";
  document.getElementById("keyboard").innerHTML = "";
  resetCanvas();
  drawHangman(1);
  updateWordDisplay();
  createKeyboard();
  document.getElementById("setup").style.display = "none";
  document.getElementById("restart-btn").style.display = "inline-block";
}

function updateWordDisplay() {
  const display = selectedWord.split('').map(letter => guessed.includes(letter) ? letter : "_").join(" ");
  document.getElementById("word").textContent = display;
  if (!display.includes("_")) {
    document.getElementById("message").textContent = "You win!";
    disableAllButtons();
  }
}

function createKeyboard() {
  const keyboardLayout = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  const keyboardDiv = document.getElementById("keyboard");
  keyboardLayout.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";
    row.split('').forEach(letter => {
      const btn = document.createElement("button");
      btn.textContent = letter;
      btn.className = "key-btn";
      btn.onclick = () => handleGuess(letter, btn);
      rowDiv.appendChild(btn);
    });
    keyboardDiv.appendChild(rowDiv);
  });
}

function handleGuess(letter, button) {
  button.disabled = true;
  if (selectedWord.includes(letter)) {
    guessed.push(letter);
    updateWordDisplay();
  } else {
    wrongGuesses++;
    drawHangman(wrongGuesses + 1);
    if (wrongGuesses >= maxTries) {
      document.getElementById("message").textContent = `Game over! The word was "${selectedWord}".`;
      disableAllButtons();
    }
  }
}

function disableAllButtons() {
  document.querySelectorAll(".key-btn").forEach(btn => btn.disabled = true);
}

function restartGame() {
  document.getElementById("setup").style.display = "block";
  document.getElementById("custom-word").value = "";
  document.getElementById("keyboard").innerHTML = "";
  document.getElementById("message").textContent = "";
  document.getElementById("word").textContent = "_ _ _ _ _";
  document.getElementById("restart-btn").style.display = "none";
  resetCanvas();
  drawFullHangman();
}

// Event listeners
document.getElementById("start-btn").onclick = startGame;
document.getElementById("restart-btn").onclick = restartGame;

// Initial figure on load
drawFullHangman();