const gameBoard = document.querySelector("#game-board");
const scoreDisplay = document.querySelector("#current-score");
const highScoreDisplay = document.querySelector("#high-score");
const controls = document.querySelectorAll(".game-controls button");

const GRID_SIZE = 30;
const GAME_SPEED = 200;
const INITIAL_SNAKE_POSITION = { x: 15, y: 15 };

let snake = [INITIAL_SNAKE_POSITION];
let food = { x: 0, y: 0 };
let direction = { x: 0, y: 0 };  
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
let isGameOver = false;
let gameInterval;
let wallHit = false;  

highScoreDisplay.innerText = `High Score: ${highScore}`;

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE) + 1,
  y: Math.floor(Math.random() * GRID_SIZE) + 1
});

const resetGame = () => {
  clearInterval(gameInterval);
  alert("Game Over!");
  location.reload();
};

const updateScore = () => {
  score++;
  scoreDisplay.innerText = `Score: ${score}`;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("high-score", highScore);
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  }
};

const moveSnake = () => {
  if (direction.x === 0 && direction.y === 0) return;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  if (head.x === food.x && head.y === food.y) {
    updateScore();
    food = getRandomPosition();
  } else {
    snake.pop();  
  }
  
  snake.unshift(head);
  
  if (wallHit) {
    if (
      head.x <= 0 || head.x > GRID_SIZE || 
      head.y <= 0 || head.y > GRID_SIZE || 
      isSnakeColliding(head)
    ) {
      isGameOver = true;
      resetGame();
    }
  } else {    
    if (head.x <= 0) head.x = GRID_SIZE;
    if (head.x > GRID_SIZE) head.x = 1;
    if (head.y <= 0) head.y = GRID_SIZE;
    if (head.y > GRID_SIZE) head.y = 1;
    
    if (isSnakeColliding(head)) {
      isGameOver = true;
      resetGame();
    }
  }
};

const isSnakeColliding = (head) => {
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
};

const drawGameBoard = () => {
  gameBoard.innerHTML = '';
  snake.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridArea = `${segment.y} / ${segment.x}`;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });

  const foodElement = document.createElement('div');
  foodElement.style.gridArea = `${food.y} / ${food.x}`;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
};

const handleInput = (input) => {
  switch (input.key) {
    case "ArrowUp":
      if (direction.y === 0) {
        direction = { x: 0, y: -1 };
      }
      break;
    case "ArrowDown":
      if (direction.y === 0) {
        direction = { x: 0, y: 1 };
      }
      break;
    case "ArrowLeft":
      if (direction.x === 0) {
        direction = { x: -1, y: 0 };
      }
      break;
    case "ArrowRight":
      if (direction.x === 0) {
        direction = { x: 1, y: 0 };
      }
      break;
  }
};

const initializeGame = () => {
  food = getRandomPosition();
  gameInterval = setInterval(() => {
    if (!isGameOver) {
      moveSnake();
      drawGameBoard();
    }
  }, GAME_SPEED);
};

document.addEventListener("keydown", handleInput);
controls.forEach(button => button.addEventListener("click", () => handleInput({ key: button.dataset.key })));

initializeGame();