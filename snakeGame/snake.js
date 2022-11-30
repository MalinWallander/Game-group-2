"use strict";

//set starting score to 0
let score = 0;

  //Set variables for the timer
const timerEl = document.getElementById("timer");
let timer;
let timerStart;
  
//create start button element to run main and genFood function, start timer, and hide the button to start the game
let startButtonEl = document.getElementById("start-button");
let refreshButtonEl = document.getElementById("refresh-button");

//Start and keep game running
function startGame(){ 
    timerStart = Date.now();
    startButtonEl.classList.add("hidden");
    refreshButtonEl.classList.remove("hidden");
    main();
    genFood();
    timer = setInterval(() => {
        updateTimer();
      }, 10);
}
//eventlistner to start function startGame when it's clicked
startButtonEl.addEventListener("click", startGame);

//seeting the timer så it updates and shows the corrct minutes, seconds and centiseconds
function updateTimer() {
    const time = Date.now() - timerStart;
    const minutes = Math.floor(time/ 1000 /60);
    const seconds = Math.floor(time / 1000) % 60;
    const centiseconds = Math.floor(time / 10) % 100;

    //put 0 before the number if it is below 10, to make it look better
    let displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    let displayCentiseconds = centiseconds < 10 ? `0${centiseconds}` : centiseconds;
  
    timerEl.innerHTML = `${displayMinutes}:${displaySeconds}:${displayCentiseconds}`;
}
//Add function to refresh-button, to start a new game
const refreshPage = () => {
    window.location.reload();
  }
  
  refreshButtonEl.addEventListener('click', refreshPage);


//get canvas element
const snakeBoard = document.getElementById("gameCanvas");
const snakeBoard_ctx = gameCanvas.getContext("2d");

//set colors for board
const board_border = 'black';
const board_background = 'white';
   
//create array that is the snake-train
let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
    ]

// True if changing direction
let changing_direction = false;
// Horizontal velocity
let food_x;
let food_y;
// Horizontal velocity, delta x
let dx = 10;
// Vertical velocity, delta y
let dy = 0;

document.addEventListener("keydown", change_direction);

const gameOverBannerEl = document.getElementById("game-over-banner");
    
    // main function called repeatedly to keep the game running
function main() {  
    if (hasGameEnded()) {
        gameOverBannerEl.classList.remove("hidden");
        clearInterval(timer);
        return;
    }

    else {
        changing_direction = false;
        setTimeout(function onTick() 
        {    
          clearCanvas(); 
          drawGlobe();   
          moveSnake();  
          drawSnake();
            // Call main again, recursive method
            main();
        }, 100)
    }
}
    
// draw a border around the canvas
function clearCanvas() {
  //  Select the colour to fill the drawing
  snakeBoard_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeBoard_ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height);
  // Draw a "border" around the entire canvas
  snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw the locomotive in the first part of the train
  drawLocomotive(snake[0]);
  // Draw the rest of the train, slicing the first part
  snake.slice(1).forEach(drawTraincart);
}

//set the globe picture as food
function drawGlobe() {
  let globe_image = new Image();
  globe_image.src = "globe-2.png";
  globe_image.onload = function(){
    snakeBoard_ctx.drawImage(globe_image, food_x, food_y, 10, 10);
  }
}

//set the locomotive picture as the head of the snake-train
function drawLocomotive(snakePart){
  let locomotive = new Image()
  locomotive.src = "locomotive.webp";
    locomotive.onload = function(){
      snakeBoard_ctx.drawImage(locomotive, snakePart.x, snakePart.y, 10, 10)
    }
}

//set the trincart image as part of the body of the snake-train
function drawTraincart(snakePart){
  let traincart = new Image()
  traincart.src = "traincart.jpg";
    traincart.onload = function(){
      snakeBoard_ctx.drawImage(traincart, snakePart.x, snakePart.y, 10, 10)
    }
}

//Set parameters to see if snake-train hits wall or self
function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeBoard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeBoard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
  }

  //Generate random number between min and max
  function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }

  function genFood() {
    // Generate a random number the food x-coordinate
    food_x = random_food(0, snakeBoard.width - 10);
    // Generate a random number for the food y-coordinate
    food_y = random_food(0, snakeBoard.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function hasSnakeEatenFood(part) {
      const has_eaten = part.x == food_x && part.y == food_y;
      if (has_eaten) genFood();
    });
  }

  //Naming keys, connecting them to keyboard number
function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    // Prevent the train from reversing

    if (changing_direction) return;
    // see which direction the snake-train is going
    else {
        changing_direction = true;
        const keyPressed = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;
      //change direction based on key pressed, if the snake-train isn't already going there
        if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -10;
            dy = 0;
        }
        if (keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -10;
        }
        if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 10;
            dy = 0;
        }
        if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = 10;
        }
    }
}

function moveSnake() {
    // Create the new Snake-train's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake-train body
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
      // Increase score
      score += 10;
      // Display score on screen
      document.getElementById('score').innerHTML = score;
      // Generate new food location
      genFood();
    } else {
      // Remove the last part of snake-train body
      snake.pop();
    }
  }
