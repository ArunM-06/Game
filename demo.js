// Game state
const WINNING_ROLL = 6;
const MAX_ROUNDS = 3;

let player1 = { score: 0, roundComplete: false };
let player2 = { score: 0, roundComplete: false };
let currentPlayer = 1;
let currentRound = 1;
let gameOver = false;

// UI Updates
function updateUI() {
    document.getElementById("current-round").innerText = currentRound;
    document.getElementById("p1-score").innerText = player1.score;
    document.getElementById("p2-score").innerText = player2.score;
    
    // Update active player highlight
    document.querySelector('.player1').classList.toggle('active-player', currentPlayer === 1);
    document.querySelector('.player2').classList.toggle('active-player', currentPlayer === 2);
}

// Game Logic
function rollDice() {
    if (gameOver) return;

    const diceValue = Math.floor(Math.random() * 6) + 1;
    const player = currentPlayer === 1 ? player1 : player2;
    
    // Update UI
    document.getElementById("dice1").setAttribute("src", `./images/dice-${diceValue}.png`);
    player.score += diceValue;
    
    // Handle roll result
    if (diceValue === WINNING_ROLL) {
        player.roundComplete = true;
        document.getElementById("result").innerText = `Player ${currentPlayer} rolled ${diceValue}! Round complete!`;
        handlePlayerSwitch();
    } else {
        document.getElementById("result").innerText = `Player ${currentPlayer} rolled ${diceValue}. Roll again!`;
    }

    updateUI();
}

function handlePlayerSwitch() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    
    if (player1.roundComplete && player2.roundComplete) {
        if (currentRound < MAX_ROUNDS) {
            startNewRound();
        } else {
            endGame(getWinningMessage());
        }
    }
}

function startNewRound() {
    currentRound++;
    player1.roundComplete = false;
    player2.roundComplete = false;
    document.getElementById("result").innerText = `Round ${currentRound} begins!`;
}

function getWinningMessage() {
    if (player1.score === player2.score) {
        return `🤝 It's a Draw! Score: ${player1.score} - ${player2.score}`;
    }
    const winner = player1.score > player2.score ? 1 : 2;
    return `🎉 Player ${winner} Wins! Final Score: ${player1.score} - ${player2.score}`;
}

function endGame(message) {
    gameOver = true;
    document.getElementById("result").innerText = message;
    document.getElementById("dice-btn").disabled = true;
    document.querySelector('.player1').classList.remove('active-player');
    document.querySelector('.player2').classList.remove('active-player');
}

function resetGame() {
    player1 = { score: 0, roundComplete: false };
    player2 = { score: 0, roundComplete: false };
    currentPlayer = 1;
    currentRound = 1;
    gameOver = false;

    document.getElementById("dice1").src = "./images/dice-1.png";
    document.getElementById("result").innerText = "New Game! 🎲 Roll to Start";
    document.getElementById("dice-btn").disabled = false;

    updateUI();
}

// Initialize game
document.addEventListener('DOMContentLoaded', updateUI);
