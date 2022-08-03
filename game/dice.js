let player1Turn = true;
let player2Turn = false;

let player1Score = 0;
let player2Score = 0;

let player1Win = false;
let player2Win = false;
//TODO any count of players write in chat DROP when more then two drop the dice log for all score.
export function diceGame(player1, player2) {
    while (player1Win === false || player2Win === false) {
        if (player1Turn) {
            player1Score = dropTheDice();
            player1Turn = false;
            player2Turn = true;
        } else if (player2Turn) {
            player2Score = dropTheDice();
            player2Turn = false;
        }
        else if (player1Score > player2Score) {
            return  `${player1} wins!`
        } else if (player1Score < player2Score) {
            return `${player2} wins!`
        } else {
            return "Draw!"
        }
    }
}

function dropTheDice() {
    return Math.floor(Math.random() * 6)+1;
}


