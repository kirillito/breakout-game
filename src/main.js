const FPS = 30;

let canvas;
let canvasContext;

let audioFormat = ".mp3";

const musicBackground = new MusicWrapper();
const soundBallHit = new SoundWrapper('assets/sounds/hit');
const soundBallMiss = new SoundWrapper('assets/sounds/miss');
const soundBonus = new SoundWrapper('assets/sounds/bonus');

const player = new Player();
const ball = new Ball();
const paddle = new Paddle();

let brickLevel = new BrickLevel();

const TOP_INFO_HEIGHT = 20

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
  player.reset();
  ball.reset();
  brickLevel.reset();
  paddle.reset();

  showingTitleScreen = false;

  musicBackground.loopMusic('assets/sounds/music');
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

  player.draw();
}

function drawTitleScreen() {
  canvasContext.save();
 
  canvasContext.font = "60px Arial bold";
  canvasContext.fillStyle = 'white';

  if (player.lastScore > 0) {
    canvasContext.fillText("You're last score: " + player.lastScore, 160, 200);
  }

  canvasContext.fillText("Click to start new game", 140, 300);

  canvasContext.restore();
  return;
}

