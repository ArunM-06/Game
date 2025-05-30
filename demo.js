let player1 = { score: 0 };
let player2 = { score: 0 };
let currentPlayer = 1;
let gameOver = false;
let currentRound = 1;

function updateActivePlayer() {
    document.querySelector('.player1').classList.remove('active-player');
    document.querySelector('.player2').classList.remove('active-player');

    if (currentPlayer === 1) {
        document.querySelector('.player1').classList.add('active-player');
    } else {
        document.querySelector('.player2').classList.add('active-player');
    }
}

function rollDice() {
    if (gameOver) return;

    const diceValue = Math.floor(Math.random() * 6) + 1;
    const diceImage = `./images/dice-${diceValue}.png`;

    let player = currentPlayer === 1 ? player1 : player2;
    document.getElementById("dice1").setAttribute("src", diceImage);

    player.score += diceValue;
    document.getElementById("result").innerText = `Player ${currentPlayer} rolled ${diceValue}`;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    if (currentPlayer === 1) {
        currentRound++;
    }

    updateUI();
    updateActivePlayer();
    checkGameEnd();
}

function updateUI() {
    document.getElementById("current-round").innerText = currentRound;
    document.getElementById("p1-score").innerText = player1.score;
    document.getElementById("p2-score").innerText = player2.score;
}

function checkGameEnd() {
    if (currentRound > 10) {
        let message;
        if (player1.score > player2.score) {
            message = `🎉 Player 1 Wins! Final Score: ${player1.score} - ${player2.score}`;
        } else if (player2.score > player1.score) {
            message = `🎉 Player 2 Wins! Final Score: ${player1.score} - ${player2.score}`;
        } else {
            message = `🤝 It's a Draw! Score: ${player1.score} - ${player2.score}`;
        }
        endGame(message);
    }
}

function endGame(message) {
    gameOver = true;
    document.getElementById("result").innerText = message;
    document.getElementById("dice-btn").disabled = true;
    document.querySelector('.player1').classList.remove('active-player');
    document.querySelector('.player2').classList.remove('active-player');
    setTimeout(resetGame, 3000);
}

function resetGame() {
    player1 = { score: 0 };
    player2 = { score: 0 };
    currentPlayer = 1;
    currentRound = 1;
    gameOver = false;

    document.getElementById("dice1").src = "./images/dice-1.png";
    document.getElementById("result").innerText = "New Game! 🎲 Roll to Start";
    document.getElementById("dice-btn").disabled = false;

    updateUI();
    updateActivePlayer();
}

document.addEventListener('DOMContentLoaded', function () {
    updateActivePlayer();
});
