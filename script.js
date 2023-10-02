// const player1 = new Player(prompt('Enter name for player 1'), `X`)
// const player2 = new Player(prompt('Enter name for player 2'), `O`)
const player1 = new Player('Player 1', `X`)
// const player2 = new Player('Player 2', `O`)
const player2 = new Player(`Computer`, `O`);
player2.generateMove = () => {
    const openSquares = Gameboard.getOpenSquaresRemaining();
    console.log(openSquares);
    return openSquares[Math.floor(Math.random()*openSquares.length)];
}

const DisplayController = (() => {
    window.onload = () => {
        for (let i = 1; i <= 9; i++) {
            document.querySelector(`.square${i}`).addEventListener(`click`, () => {
                let currentPlayer = Gameboard.getPlayerTurn() === 1 ? player1 : player2;
                if (!Gameboard.isOver() && Gameboard.isValid(i)) {
                    document.querySelector(`.square${i}`).textContent = currentPlayer.marker;
                    currentPlayer.makeSelection(Gameboard, i);
                }
            })
        }
        document.querySelector(`.message>button`).addEventListener(`click`, () => {
            resetDisplay();
        })
    }

    function updateDisplay() {
        Gameboard.getMarks()[`player1`].forEach(square => {
            document.querySelector(`.square${square}`).textContent = player1.marker;
        })
        Gameboard.getMarks()[`player2`].forEach(square => {
            document.querySelector(`.square${square}`).textContent = player2.marker;
        })
    }

    function resetDisplay() {
        for (let i = 1; i <= 9; i++) {
            document.querySelector(`.square${i}`).textContent = ``;
        }
        document.querySelector(`.message>p`).textContent = ``;
        Gameboard.resetBoard();
    }
    
    function declareOutcome(outcome) {
        switch (outcome) {
            case 0:
                document.querySelector(`.message>p`).textContent = `It was a tie!`
            break;
            case 1:
                document.querySelector(`.message>p`).textContent = `${player1.name} wins!`
                break;
            case 2:
                document.querySelector(`.message>p`).textContent = `${player2.name} wins!`
                break;
            }
        document.querySelector(`.message>button`).style.display = `block`;
    }

    return {declareOutcome, updateDisplay};

})();

const Gameboard = (() => {
    let playerTurn = 1;
    const marks = {
        player1:[],
        player2:[]
    };
    const WINNINGTRIOS = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [7,5,3]]

    const isOver = () => {
        let over = false;
        WINNINGTRIOS.forEach(trio => {
            if (marks.player1.includes(trio[0]) &&
                marks.player1.includes(trio[1]) &&
                marks.player1.includes(trio[2])) {
                    DisplayController.declareOutcome(1);
                    over = true;
                }
            })
            WINNINGTRIOS.forEach(trio => {
                if (marks.player2.includes(trio[0]) &&
                marks.player2.includes(trio[1]) &&
                marks.player2.includes(trio[2])) {
                    DisplayController.declareOutcome(2);
                    over = true;
                }
            })
            if (!over && (marks.player1.length + marks.player2.length === 9)) {
                DisplayController.declareOutcome(0);
                over = true;
        }
        return over;
    }

    const getPlayerTurn = () => playerTurn;

    const switchPlayers = () => {
        playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
    }

    const markBoard = square => {
        if (isValid(square)) {
            if (!isOver()) {
                marks[`player${playerTurn}`].push(square);
                if (!isOver()) {
                    switchPlayers();
                    if (playerTurn === 2) {
                        markBoard(player2.generateMove());
                        DisplayController.updateDisplay();
                    }
                } 
            }
        }
    }

    function isValid(square) {
        const alreadyPlayed = marks.player1.includes(square) || marks.player2.includes(square)
        return !alreadyPlayed;
    }

    function resetBoard() {
        marks.player1 = [];
        marks.player2 = [];
        playerTurn = 1;
    }

    function getMarks() {
        return marks;
    }

    function getOpenSquaresRemaining() {
        const takenSquares = marks[`player1`].concat(marks[`player2`]);
        const openSquares = [];
        for (let i = 1; i <= 9; i++) {
            if (!takenSquares.includes(i)) {
                openSquares.push(i);
            }
        }
        return openSquares;
    }

    return {getPlayerTurn, markBoard, isOver, isValid, resetBoard, getMarks, getOpenSquaresRemaining};
})();

function Player(name, marker) {
    function makeSelection(gameboard, square) {
        gameboard.markBoard(square, marker);
    }

    return {name, marker, makeSelection}
}