let player1 = { turns: 10, score: 0 };
let player2 = { turns: 10, score: 0 };
let currentPlayer = 1;
let gameOver = false;

// Function to update active player highlighting
function updateActivePlayer() {
    // Remove active class from both players first
    document.querySelector('.player1').classList.remove('active-player');
    document.querySelector('.player2').classList.remove('active-player');
    
    // Add active class to current player
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
    
    // Update dice image
    document.getElementById("dice1").setAttribute("src", diceImage);
    
    // Decrease turns only if not rolling a 6
    if (diceValue !== 6) {
        player.turns--;
        player.score += diceValue;
        document.getElementById("result").innerText = `Player ${currentPlayer} rolled ${diceValue}`;
    } else {
        // On rolling 6, switch player without decreasing turns or adding score
        document.getElementById("result").innerText = `Player ${currentPlayer} rolled 6! Switching to other player`;
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateActivePlayer(); // Update highlighting when switching on 6
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
    if (player1.score >= 20 || player2.score >= 20) {
        endGame(`🎉 Player ${player1.score >= 20 ? 1 : 2} Wins!`);
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
    // Remove active player highlighting at game end
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
    updateActivePlayer(); // Set initial active player highlighting
}

// Call updateActivePlayer when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateActivePlayer();
});
