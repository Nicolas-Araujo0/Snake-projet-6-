let snake = [
    { y: 0, x: 0, deg: "rotateZ(270deg)" },
    { y: 0, x: 1, deg: "rotateZ(270deg)" },
    { y: 0, x: 2, deg: "rotateZ(270deg)" },
    { y: 0, x: 3, deg: "rotateZ(270deg)" },
    { y: 0, x: 4, deg: "rotateZ(270deg)" }
]

let tableauLigneSize = 10;
let tableauColumnSize = 10;
let lastMove = "";
let buttonOff = document.querySelector("button");
buttonOff.disabled = true;

let keepGoing = ""
document.addEventListener("keydown", function (event) {
    keepGoing = lastMove;
    lastMove = event.code
})


let appleSpawn = 0;
let previousSnake
function moveSnake() {
    if (gameEnded == false) {
        if (lastMove == "ArrowUp"
            || lastMove == "ArrowDown"
            || lastMove == "ArrowLeft"
            || lastMove == "ArrowRight") {

            previousSnake = JSON.parse(JSON.stringify(snake))
            if (lastMove == "ArrowUp" && ((snake[1].y != snake[0].y - 1) && (snake[1].y - (tableauColumnSize - 1) != snake[0].y))) {
                snake[0].y -= 1;
                snake[0].deg = "rotateZ(0deg)";
                for (let b = 1; b < snake.length; b++) {
                    snake[b] = previousSnake[b - 1]
                }
            }
            else if (lastMove == "ArrowDown" && ((snake[1].y != snake[0].y + 1) && ((snake[1].y + (tableauColumnSize - 1)) != snake[0].y))) {
                snake[0].y += 1;
                snake[0].deg = "rotateZ(180deg)";
                for (let b = 1; b < snake.length; b++) {
                    snake[b] = previousSnake[b - 1]
                }
            }
            else if (lastMove == "ArrowLeft" && ((snake[1].x != snake[0].x - 1) && (snake[1].x - (tableauLigneSize - 1) != (snake[0].x)))) {
                snake[0].x -= 1;
                snake[0].deg = "rotateZ(270deg)";
                for (let b = 1; b < snake.length; b++) {
                    snake[b] = previousSnake[b - 1]
                }
            }
            else if (lastMove == "ArrowRight" && ((snake[1].x != snake[0].x + 1) && ((snake[1].x + (tableauLigneSize - 1)) != snake[0].x))) {
                snake[0].x += 1;
                snake[0].deg = "rotateZ(90deg)";
                for (let b = 1; b < snake.length; b++) {
                    snake[b] = previousSnake[b - 1]
                }
            } else {
                lastMove = keepGoing
            }

            appleSpawn++
            if (sourisPos.length > 0) {
                mouseNextMovement--
            }
            highScore()
            endGame()
            console.log(mouseNextMovement)
            if (mouseNextMovement == 0) {
                sourisMove()
            }
            displayBoard()
        }

        setTimeout(() => {
            window.requestAnimationFrame(() => {
                moveSnake();
            })
        }, 150);
        //     window.requestAnimationFrame(() => {
        //     moveSnake();
        // })
    }
}


let objectBoard = [
    { y: 5, x: 5 }
]
// apparition de pomme 
function objectSpawn() {
    if (appleSpawn == 15) {
        let pommeRandomY;
        let pommeRandomX;
        do {
            pommeRandomY = Math.floor(Math.random() * tableauColumnSize)
            pommeRandomX = Math.floor(Math.random() * tableauLigneSize)
        } while (boardGame[pommeRandomY][pommeRandomX] != 0)
        let applePos = {
            y: pommeRandomY,
            x: pommeRandomX
        }
        objectBoard.push(applePos)
        appleSpawn = 0;
    }
}

// ptite souris qui se promene
let sourisPos = []
let sourisNextSpawn = 0;
function sourisSpawn() {
    if (sourisNextSpawn == 5) {
        let mouseRandomY;
        let mouseRandomX;
        do {
            mouseRandomY = Math.floor(Math.random() * tableauColumnSize)
            mouseRandomX = Math.floor(Math.random() * tableauLigneSize)
        } while (boardGame[mouseRandomY][mouseRandomX] != 0)
        let newMouse = {
            y: mouseRandomY,
            x: mouseRandomX,
            moved: false,
        }
        sourisPos.push(newMouse);
        sourisNextSpawn = 0;
    }
}

let mouseNextMovement = 10;
function sourisMove() {
    for (let i = 0; i < sourisPos.length; i++) {
        let randomMovement = Math.floor(Math.random() * 4)
        for (let b = 0; b < snake.length; b++) {


            if ((randomMovement == 0 && ( (snake[b].y != sourisPos[i].y -1)  && (sourisPos[i].x != snake[b].x)) )&& sourisPos[i].moved == false) {
                // move top
                sourisPos[i].y -= 1
                sourisPos[i].moved = true;
                if (sourisPos[i].y < 0) {
                    sourisPos[i].y = tableauColumnSize - 1
                    console.log("téléporte bas")
                }
            } else {
                randomMovement = 1;
            }
             if ((randomMovement == 1 && ( (snake[b].y != sourisPos[i].y +1)  && (sourisPos[i].x != snake[b].x)) ) && sourisPos[i].moved == false) {
                // move bottom
                sourisPos[i].y += 1
                sourisPos[i].moved = true;
                if (sourisPos[i].y > tableauColumnSize - 1) {
                    sourisPos[i].y = 0;
                    console.log("téléporte haut")
                }
            } else {
                randomMovement = 2;
            }
             if ((randomMovement == 2 && ( (snake[b].x != sourisPos[i].x +1)  && (sourisPos[i].y != snake[b].y)) ) && sourisPos[i].moved == false){
                // move right
                sourisPos[i].x += 1
                sourisPos[i].moved = true;
                if (sourisPos[i].x > tableauLigneSize - 1) {
                    sourisPos[i].x = 0;
                    console.log("téléporte gauche")
                }
            } else {
                randomMovement = 3;
            }
             if ((randomMovement == 3 && ( (snake[b].x != sourisPos[i].x -1)  && (sourisPos[i].y != snake[b].y))  ) && sourisPos[i].moved == false){
                // move left
                sourisPos[i].x -= 1
                sourisPos[i].moved = true;
                if (sourisPos[i].x < 0) {
                    sourisPos[i].x = tableauLigneSize - 1
                    console.log("téléporte drpot")
                }
            } else {
                randomMovement = 0;
            }
        }

        mouseNextMovement = 10;
        console.log(sourisPos[i])
        sourisPos[i].moved = false
    }
}




//Display Gameboard

let boardGame
function displayBoard() {
    boardGame = []

    for (let i = 0; i < tableauColumnSize; i++) {
        let boardXLigne = []
        for (let j = 0; j < tableauLigneSize; j++) {
            let boardLigne =
                0
            boardXLigne.push(boardLigne)
        }
        boardGame.push(boardXLigne)
    }


    for (let j = 1; j < snake.length; j++) {
        boardGame[snake[j].y][snake[j].x] = 1;
    }
    objectSpawn()
    // boucle pomme
    for (let p = 0; p < objectBoard.length; p++) {
        boardGame[objectBoard[p].y][objectBoard[p].x] = 3;

        // Pomme dispawn
        if ((snake[0].x == objectBoard[p].x) && (snake[0].y == objectBoard[p].y)) {
            objectBoard.splice(p, 1)
            let newPart = {
                y: previousSnake[previousSnake.length - 1].y,
                x: previousSnake[previousSnake.length - 1].x,
                deg: previousSnake[previousSnake.length - 1].deg
            };
            snake.push(newPart)

            score = (score * 1.1).toFixed(0)
            sourisNextSpawn++;
        }
    }

    sourisSpawn()
    // boucle mouse
    for (let p = 0; p < sourisPos.length; p++) {
        boardGame[sourisPos[p].y][sourisPos[p].x] = 4;

        // Pomme dispawn
        if ((snake[0].x == sourisPos[p].x) && (snake[0].y == sourisPos[p].y)) {
            sourisPos.splice(p, 1)


            score = (score * 2).toFixed(0)
        }
    }

    boardGame[snake[0].y][snake[0].x] = 2;

    const board = document.querySelector("#board")
    board.innerHTML = ""
    for (let i = 0; i < boardGame.length; i++) {
        for (let k = 0; k < boardGame.length; k++) {
            let newDiv = document.createElement("div")
            if (boardGame[i][k] == 2) {
                newDiv.classList.add("head")
                newDiv.classList.add("snake")

            }
            else if (boardGame[i][k] == 1) {
                newDiv.classList.add("snake")
            }
            else if (boardGame[i][k] == 3) {
                newDiv.classList.add("apple")
            }
            else if (boardGame[i][k] == 4) {
                newDiv.classList.add("mouse")
            }

            // else if(boardGame[i][k] == 1){
            // }
            newDiv.style.width = (100 / tableauLigneSize) + "%"
            newDiv.style.length = (100 / tableauColumnSize) + "%"
            board.append(newDiv)
        }
    }
    let divAll = document.querySelectorAll("div div")


    for (let i = 0; i < snake.length; i++) {
        let trouvé = divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))]
        trouvé.style.transform = snake[i].deg;


    }
    // Changement d'image + rotate pour l'angle 
    for (let i = 1; i < snake.length - 1; i++) {
        if (snake[i].deg != snake[i - 1].deg) {
            divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))].classList.add("tourne")

            if (snake[i - 1].deg == "rotateZ(0deg)" && snake[i].deg == "rotateZ(90deg)") {
                divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))].style.transform = "rotateZ(270deg)"
            } else if (snake[i - 1].deg == "rotateZ(0deg)" && snake[i].deg == "rotateZ(270deg)") {
                divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))].style.transform = "rotateZ(0deg)"
            }

            else if (snake[i - 1].deg == "rotateZ(90deg)" && snake[i].deg == "rotateZ(0deg)") {
                divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))].style.transform = "rotateZ(90deg)"
            } else if (snake[i - 1].deg == "rotateZ(90deg)" && snake[i].deg == "rotateZ(180deg)") {
                divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))].style.transform = "rotateZ(0deg)"
            }

            else if (snake[i - 1].deg == "rotateZ(180deg)" && snake[i].deg == "rotateZ(90deg)") {
                divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))].style.transform = "rotateZ(180deg)"
            } else if (snake[i - 1].deg == "rotateZ(180deg)" && snake[i].deg == "rotateZ(270deg)") {
                divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))].style.transform = "rotateZ(90deg)"
            }

            else if (snake[i - 1].deg == "rotateZ(270deg)" && snake[i].deg == "rotateZ(0deg)") {
                divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))].style.transform = "rotateZ(180deg)"
            } else if (snake[i - 1].deg == "rotateZ(270deg)" && snake[i].deg == "rotateZ(180deg)") {
                divAll[((snake[i].x) + (snake[i].y * tableauLigneSize))].style.transform = "rotateZ(270deg)"
            }
        }
    }

    divAll[((snake[snake.length - 1].x) + (snake[snake.length - 1].y * tableauLigneSize))].classList.add("tail");
    divAll[((snake[snake.length - 1].x) + (snake[snake.length - 1].y * tableauLigneSize))].style.transform = snake[snake.length - 2].deg;

    if (gameEnded) {
        let allSnake = document.querySelectorAll(".snake")
        for (let i = 0; i < allSnake.length; i++) {
            allSnake[i].classList.add("snakeDeath")
        }
    }

}

let movement;


let gameEnded = false;

function endGame() {
    if (snake[0].y < 0) {
        snake[0].y = tableauColumnSize - 1;

    }
    if (snake[0].x < 0) {
        snake[0].x = tableauLigneSize - 1;

    }
    if (snake[0].y > tableauColumnSize - 1) {
        snake[0].y = 0;

    }
    if (snake[0].x > tableauLigneSize - 1) {
        snake[0].x = 0;

    }
    for (let a = 1; a < snake.length; a++) {
        if ((snake[0].x == snake[a].x) && (snake[0].y == snake[a].y)) {
            gameEnded = true;
            buttonOff.disabled = false;


            setTimeout(() => {
                alert("Don't bite your tail idiot")
            }, 1500);
        }
    }


}

// Score storage
let score = 0;
let h2 = document.querySelector("h2");
let highScoreShown = false
let player = 1;
function highScore() {
    if (gameEnded == false) {
        h2.textContent = "Your score is : " + score;
        score++
        setTimeout(() => {
            highScore()
        }, 100);
    } if (highScoreShown == false && gameEnded) {
        scoreBoard.push(score)
        let aside = document.querySelector("aside");
        let div = document.createElement("div");
        let currDate = new Date();
        let lastPlayer = currDate.getHours() + "h" + currDate.getMinutes();
        div.textContent =lastPlayer + " : " + score + "pts";
        aside.append(div)
        player++;
        highScoreShown = true;
    }
}
let scoreBoard = []

displayBoard();
moveSnake();

function restart() {
    gameEnded = false
    snake = [
        { y: 0, x: 0, deg: "rotateZ(270deg)" },
        { y: 0, x: 1, deg: "rotateZ(270deg)" },
        { y: 0, x: 2, deg: "rotateZ(270deg)" },
        { y: 0, x: 3, deg: "rotateZ(270deg)" },
        { y: 0, x: 4, deg: "rotateZ(270deg)" }
    ];
    objectBoard = [
        { y: 5, x: 5 }
    ];
    sourisPos = [];
    appleSpawn = 0;
    sourisNextSpawn = 0;
    mouseNextMovement = 10;
    lastMove = "";
    score = 0;
    highScoreShown = false;
    displayBoard();
    moveSnake()
    buttonOff.disabled = true;
}