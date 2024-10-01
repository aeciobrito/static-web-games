const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const gameSpeed = 200;
let foodX, foodY;
let snakeX = 15, snakeY = 15;
let directionX = 0, directionY = 0;
let snakeBody = [];

let gameOver = false;
let score = 0;
let highScore = localStorage.getItem("high-score" || 0);
highScoreElement.innerText = `High Score: ${highScore}`;
let wallHit = true;
let setIntervalId;

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

const hadleGameOver = () => {
  // future dialog with share points and screenshot of the game
  clearInterval(setIntervalId);
  alert("Game Over!");
  location.reload();
}

const initGame = () => {
  if(gameOver) return hadleGameOver();
  let htmlMarkup = `
    <div class="food" 
      style="grid-area: ${foodY} / ${foodX}">
    </div>`;

  htmlMarkup += `
    <div class="head" 
      style="grid-area: ${snakeY} / ${snakeX}">
    </div>`;

  if (snakeY === foodY && snakeX === foodX) {
    score++;
    changeFoodPoition();
    snakeBody.push([foodX, foodY]);

    scoreElement.innerText = `Score: ${score}`;    
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  snakeX += directionX;
  snakeY += directionY;

  if (wallHit) {
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      highScore = score >= highScore? score : highScore;
      localStorage.setItem("high-score", highScore);
      gameOver = true;      
    }
  } else {
    if (snakeX <= 0) {
      snakeX = 30;
    } else if (snakeX > 30) {
      snakeX = 1;
    }

    if (snakeY <= 0) {
      snakeY = 30;
    } else if (snakeY >= 31) {
      snakeY = 1;
    }
  }

  for (let i = 0; i < snakeBody.length; i++) {
    //Add a div for each part of the sanke's body
    htmlMarkup +=
      `<div class="head" 
      style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}">
    </div>`;
    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};

document.addEventListener("keydown", changeDirection);
changeFoodPoition();
setIntervalId = setInterval(initGame, gameSpeed);
