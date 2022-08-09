const PLAYER_ONE = 0;
const PLAYER_TWO = 1;

let currentPlayer = PLAYER_ONE;
let gameEnded = false;
const PLAYER_COLORS = ["#f57e42", "#429bf5"];
const board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

const cells = document.querySelectorAll(".slot");
const messageBoard = document.querySelector("h3");
const resetBtn =document.querySelector("#reset")

for(let cell of cells) {
    cell.addEventListener("click", function() {
            let x = parseInt(this.dataset.x);
            let y = parseInt(this.dataset.y);

            let isCellEmpty = board[x][y] == -1;

            if(isCellEmpty && !gameEnded) {

                board[x][y] = currentPlayer;
                cell.style.backgroundColor = PLAYER_COLORS[currentPlayer];

                if(didPlayerWin(currentPlayer)) {
                    playerWon(currentPlayer);
                    gameEnded = true
                }
                else if(isTie()) {
                    playerWon(-1);
                    gameEnded = true;
                }
                else {
                    nextTurn();
                }           
            }
        }//End function of EventListener
    )//End addEventListener
} //End the iterator on cells

resetBtn.addEventListener("click", startGame);

startGame();

function play(cell) {

}

function writeOnMessageBoard(text, color) {
    messageBoard.innerText = text;
    if(color) {
        messageBoard.style.color = color;
    }
    else
    {
        messageBoard.style.color = "black";
    }
    
}

function startGame() {
    for(let x = 0; x < 3; x++) {
        for(let y= 0; y < 3; y++) {
            board[x][y] = -1;
        }
    }

    for(let cell of cells) {
        cell.style.backgroundColor = "white";
    }

    currentPlayer = PLAYER_ONE;
    writeOnMessageBoard("Player 1's turn", PLAYER_COLORS[currentPlayer])
    gameEnded = false;
}

function nextTurn() {
    if(currentPlayer == PLAYER_ONE){
        currentPlayer = PLAYER_TWO;
        writeOnMessageBoard("Player 2's turn", PLAYER_COLORS[currentPlayer]);
    }
    else {
        currentPlayer = PLAYER_ONE
        writeOnMessageBoard("Player 1's turn", PLAYER_COLORS[currentPlayer]);
    }
}

function didPlayerWin(player) {
    if(board[0][0] == player && board[0][1] == player && board[0][2] == player) {
        return true;
    }
    else if(board[1][0] == player && board[1][1] == player && board[1][2] == player) {
        return true;
    }
    else if(board[2][0] == player && board[2][1] == player && board[2][2] == player) {
        return true;
    }
    else if(board[0][0] == player && board[1][0] == player && board[2][0] == player) {
        return true;
    }
    else if(board[0][1] == player && board[1][1] == player && board[2][1] == player) {
        return true;
    }
    else if(board[0][2] == player && board[1][2] == player && board[2][2] == player) {
        return true;
    }
    else if(board[0][0] == player && board[1][1] == player && board[2][2] == player) {
        return true;
    }
    else if(board[2][0] == player && board[1][1] == player && board[0][2] == player) {
        return true;
    }
    else {
        return false;
    }
}

function playerWon(player) {
    if(player == PLAYER_ONE) {
        writeOnMessageBoard("Player 1 won!",PLAYER_COLORS[player]);
    }
    else if(player == PLAYER_TWO) {
        writeOnMessageBoard("Player 2 won!",PLAYER_COLORS[player]);
    }
    else {
        writeOnMessageBoard("The match ended in tie!","grey");
    }
}

function isTie() {
    let x = 0;
    let y = 0;

    let isCellOccupied = board[x][y] != -1;
    let areCoordinatesInRange = (x < 3) && (y < 3);

    while(isCellOccupied && areCoordinatesInRange) {
        if(y < 2) {
            y++;
        }
        else {
            x++;
            y = 0;
        }
        
        areCoordinatesInRange = x < 3;

        if(areCoordinatesInRange) {
            isCellOccupied = board[x][y] != -1;
        }
    }
    
    let isTie = false;

    if(!areCoordinatesInRange) {
        isTie = true;
    }

    return isTie;
}