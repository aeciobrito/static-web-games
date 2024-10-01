const playBoard = document.querySelector(".play-board");
const gameSpeed = 200;
let foodX, foodY;
let snakeX = 15, snakeY = 15;
let directionX = 0, directionY = 0;
let snakeBody = [];

const changeFoodPoition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (input) => {
    switch (input.key) {
        case "ArrowUp":
            directionX = 0;
            directionY = -1;
            break;
        case "ArrowDown":
            directionX = 0;
            directionY = 1;
            break;
        case "ArrowLeft":
            directionX = -1;
            directionY = 0;
            break;
        case "ArrowRight":
            directionX = 1;
            directionY = 0;
            break;
        default:
            directionX = 0;
            directionY = 0;
    }
};

const initGame = () => {
    let htmlMarkup = `
    <div class="food" 
      style="grid-area: ${foodY} / ${foodX}">
    </div>`;

    htmlMarkup += `
    <div class="head" 
      style="grid-area: ${snakeY} / ${snakeX}">
    </div>`;

    if (snakeY === foodY && snakeX === foodX) {
        changeFoodPoition();
        snakeBody.push([foodX, foodY]);
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += directionX;
    snakeY += directionY;

    if(snakeX <= 0) {
      snakeX = 30;
    } else if (snakeX > 30) {
      snakeX = 1;
    }

    console.log(snakeY);
    if(snakeY <= 0) {
      snakeY = 30;
    } else if(snakeY >= 31) {
      snakeY = 1;
    } 


    for (let i = 0; i < snakeBody.length; i++) {
        //Add a div for each part of the sanke's body
        htmlMarkup +=
            `<div class="head" 
      style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}">
    </div>`;
    }

    playBoard.innerHTML = htmlMarkup;
};

document.addEventListener("keydown", changeDirection);
changeFoodPoition();
setInterval(initGame, gameSpeed);
