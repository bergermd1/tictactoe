const Gameboard = (() => {
    let playerTurn = 1;
    const marks = {
        player1:[],
        player2:[]
    };
    const WINNINGTRIOS = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [7,5,3]]

    const isOver = () => {
        // return marks.player1.length + marks.player2.length === 9;
        // marks.player1
        WINNINGTRIOS.forEach(trio => {
            if (marks.player1.includes(trio[0]) &&
                marks.player1.includes(trio[1]) &&
                marks.player1.includes(trio[2])) {
                    console.log(`Game over, Player1 wins!`);
                    return true;
            }
        })
        WINNINGTRIOS.forEach(trio => {
            if (marks.player2.includes(trio[0]) &&
                marks.player2.includes(trio[1]) &&
                marks.player2.includes(trio[2])) {
                    console.log(`Game over, Player2 wins!`);
                    return true;
            }
        })
        return false;
    }

    const getPlayerTurn = () => playerTurn;

    const switchPlayers = () => {
        playerTurn === 1 ? playerTurn = 2 : playerTurn = 1;
    }

    const markBoard = square => {
        if (isValid(square)) {
            marks[`player${playerTurn}`].push(square);
            if (!isOver()) {
                switchPlayers();
            } 
        }
    }

    function isValid(square) {
        const alreadyPlayed = marks.player1.includes(square) || marks.player2.includes(square)
        return !alreadyPlayed;
    }

    return {getPlayerTurn, markBoard};
})();

function Player(name, marker) {
    function makeSelection(gameboard, square) {
        gameboard.markBoard(square, marker);
    }

    return {name, marker, makeSelection}
}

const player1 = new Player(`Player 1`, `X`)
const player2 = new Player(`Player 2`, `O`)
// console.log(player1);
// player1.makeSelection();

player1.makeSelection(Gameboard, 1);
player2.makeSelection(Gameboard, 4);
player1.makeSelection(Gameboard, 2);
player2.makeSelection(Gameboard, 5);
player1.makeSelection(Gameboard, 7);
player2.makeSelection(Gameboard, 6);
// player1.makeSelection(Gameboard, );
// player2.makeSelection(Gameboard, );
// player1.makeSelection(Gameboard, );
