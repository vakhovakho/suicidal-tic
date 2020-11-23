// Variables
const boardElement = document.getElementById("board");

const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

let turns = 0;
// Functions
function choose(a, b, symbol) {
    if(symbol === "X" && turns % 2) {
        return;
    }

    if(board[a][b] === null) {
        board[a][b] = symbol;
        turns++;
    }

    render();
    
    if(symbol === "X") {
        let won = checkForWin(a,b,"X");

        if(won) {
            // setTimeout(() => {
                log("You Won");
            // }, 0)

            // window.location.reload();
            return;
        }
    }

    if(turns === 9) {
        // setTimeout(() => {
            log("It's A Tie");
        // }, 0)
        return;
    }
    // debugger;
    if(turns % 2) {
        calculateComputerMove();
    }
}

function calculateComputerMove(){
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board.length; j++) {
            if(board[i][j] === null) {
                if(!checkForWin(i, j, "O")) {
                    choose(i, j, "O");
                    return;
                }
            }
        }
    }
    log("Sorry, There is no way to loose here");
    return;
}

function checkForWin(a, b, symbol) {
    const newBoard = [[...board[0]], [...board[1]],[...board[2]]];
    if(newBoard[a][b] === null) {
        newBoard[a][b] = symbol;
    }

    return checkForRowsWin(newBoard) || checkForDiagonalWin(newBoard) || checkForColumnsWin(newBoard);
}

function checkForRowsWin(newBoard) {
    for(let i = 0; i < newBoard.length; i++) {
        if(newBoard[i][0] === null) {
            continue;
        }
        if(newBoard[i][0] === newBoard[i][1] && newBoard[i][0] === newBoard[i][2]) {
            return true;
        }
    }

    return false;
}

function checkForColumnsWin(newBoard) {
    for(let i = 0; i < newBoard.length; i++) {
        if(newBoard[0][i] === null) {
            continue;
        }
        if(newBoard[0][i] === newBoard[1][i] && newBoard[0][i] === newBoard[2][i]) {
            return true;
        }
    }

    return false;
}

function checkForDiagonalWin(newBoard) {
    
    if(newBoard[0][0] !== null) {
        if(newBoard[0][0] === newBoard[1][1] && newBoard[0][0] === newBoard[2][2]) {
            return true;
        } 
    }
    
    if(newBoard[2][0] !== null) {
        if(newBoard[2][0] === newBoard[1][1] && newBoard[2][0] === newBoard[0][2]) {
            return true;
        } 
    }

    return false;
    
}


function render() {
    boardElement.innerHTML = "";
    
    for(let i = 0; i < board.length; i++) {
        let tr = document.createElement("tr");
        for(let j = 0; j < board[i].length; j++) {
            let td = document.createElement("td");
            td.dataset.x = i;
            td.dataset.y = j;
            td.textContent = board[i][j] || "";
            tr.appendChild(td);
            
        }
        boardElement.appendChild(tr);
    }
}

function log(str) {
    document.querySelector("p").textContent = str;
}

// Event Handlers
function selectElement(e) {
    if(e.target.tagName !== "TD") {
        return;
    }
    choose(+e.target.dataset.x,  +e.target.dataset.y, "X");
}

// Registrating Listeners

boardElement.addEventListener("click", selectElement);

render();