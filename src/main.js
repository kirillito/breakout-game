const FPS = 30;

let canvas;
let canvasContext;

let audioFormat = ".mp3";

const musicBackground = new MusicWrapper();
const soundBallHit = new SoundWrapper('assets/sounds/hit');
const soundBallWallHit = new SoundWrapper('assets/sounds/wall-hit');
const soundBallMiss = new SoundWrapper('assets/sounds/miss');

const ball = new Ball();
const paddle = new Paddle();

let brickLevel = new BrickLevel();

const TOP_INFO_HEIGHT = 20

let playerScore = 0;
const STARTING_LIVES = 3;
let playerLives = STARTING_LIVES;

let showingLoseScreen = false;
let showingWinScreen = false;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  initInput();
  loadImages();

  brickLevel.reset();
  ball.reset();
}

function launchIfReady() {
  if (imagesToLoad === 0) {
    startGame();
  }
}

function startGame() {
  setInterval(function() {
    update();
    draw();
  }, 1000/FPS);

//  showingMenuScreen = true;

  paddle.init();
  ball.init();
}


function update() {
  if(showingLoseScreen) {
    return;
  }

  ball.move();
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');

  if(showingLoseScreen) {
    canvasContext.fillStyle = 'white';

    canvasContext.fillText("You're score: " + playerScore, 350, 200);

    canvasContext.fillText("click to continue", 350, 500);
    return;
  } else if(showingWinScreen) {
    canvasContext.fillStyle = 'white';

    canvasContext.fillText("You Win! You're score: " + playerScore, 350, 200);

    canvasContext.fillText("click to continue", 350, 500);
    return;
  }

  brickLevel.draw();

  // paddle
  paddle.draw();

  // ball
  ball.draw();

  drawColoredText('Lives: ' + playerLives, canvas.width - 200, 10, 'white');
  drawColoredText('Score: ' + playerScore, canvas.width - 100, 10, 'white');
}