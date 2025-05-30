let player1 = { turns: 10, score: 0 };
let player2 = { turns: 10, score: 0 };
let currentPlayer = 1;
let gameOver = false;

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

    if (diceValue !== 6) {
        player.turns--;
        player.score += diceValue;
        document.getElementById("result").innerText = `Player ${currentPlayer} rolled ${diceValue}`;
    } else {
        document.getElementById("result").innerText = `Player ${currentPlayer} rolled 6! Switching to other player`;
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateActivePlayer();
    }

    updateUI();
    checkGameEnd();
}

function updateUI() {
    document.getElementById("p1-chances").innerText = player1.turns;
    document.getElementById("p2-chances").innerText = player2.turns;
    document.getElementById("p1-score").innerText = player1.score;
    document.getElementById("p2-score").innerText = player2.score;
}

function checkGameEnd() {
    if (player1.score >= 25 || player2.score >= 25) {
        endGame(`🎉 Player ${player1.score >= 25 ? 1 : 2} Wins!`);
    } else if (player1.turns === 0 && player2.turns === 0) {
        let msg = player1.score > player2.score ? "🎉 Player 1 Wins!" :
            player2.score > player1.score ? "🎉 Player 2 Wins!" :
                "🤝 It's a Draw!";
        endGame(`Game Over! ${msg}`);
    } else if (player1.turns === 0 && player2.turns > 0) {
        endGame("🎉 Player 2 Wins! (Player 1 ran out of chances)");
    } else if (player2.turns === 0 && player1.turns > 0) {
        endGame("🎉 Player 1 Wins! (Player 2 ran out of chances)");
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
    player1 = { turns: 10, score: 0 };
    player2 = { turns: 10, score: 0 };
    currentPlayer = 1;
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
