const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winnerText = document.getElementById('winnerText');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startGame() {
    isXTurn = true;
    winnerText.innerText = '';
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.innerText = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    cell.classList.add(currentClass);
    cell.innerText = currentClass.toUpperCase();

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        isXTurn = !isXTurn;
    }
}

function checkWin(currentClass) {
    return WINNING_COMBOS.some(combo => {
        return combo.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    if (draw) {
        winnerText.innerText = 'Draw!';
    } else {
        winnerText.innerText = `${isXTurn ? 'X' : 'O'} Wins!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartButton.addEventListener('click', startGame);

startGame();
