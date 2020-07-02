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
let playerLastScore = 0;
const STARTING_LIVES = 3;
let playerLives = STARTING_LIVES;

let showingTitleScreen = false;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  initInput();
  loadImages();

  ball.reset();
  brickLevel.reset();
  paddle.reset();
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

  showingTitleScreen = true;

  paddle.init(paddlePic);
  ball.init(ballPic);
}

function restartGame() {
  playerScore = 0;
  playerLives = STARTING_LIVES;
  showingTitleScreen = false;

  ball.reset();
  brickLevel.reset();
  paddle.reset();
}

function update() {
  if(showingTitleScreen) {
    return;
  }

  ball.move();
}

function draw() {	
  // background
  drawImageCenteredAtLocationWithScaling(bgPic, canvas.width/2, canvas.height/2, canvas.width, canvas.height);

  if(showingTitleScreen) {
    drawTitleScreen();
    return;
  } 

  brickLevel.draw();

  // paddle
  paddle.draw();

  // ball
  ball.draw();

  drawLives();
  drawColoredText('Score: ' + playerScore, canvas.width - 100, 10, 'white');
}

function drawTitleScreen() {
  canvasContext.save();
 
  canvasContext.font = "60px Arial bold";
  canvasContext.fillStyle = 'white';

  if (playerLastScore > 0) {
    canvasContext.fillText("You're last score: " + playerLastScore, 160, 200);
  }

  canvasContext.fillText("Click to start new game", 140, 400);

  canvasContext.restore();
  return;
}

function drawLives() {
  drawColoredText('Lives:', canvas.width - 200, 10, 'white');
  for (var i=playerLives; i>0; i--) {
    drawImageCenteredAtLocationWithScaling(ballPic, canvas.width - 180 + i*14, 7, BALL_RADIUS*1.5, BALL_RADIUS*1.5);
  }
}