const FPS = 30;

let canvas;
let canvasContext;

let audioFormat = ".mp3";

const musicBackground = new MusicWrapper();
const soundBallHit = new SoundWrapper(ASSETS.sounds.hit);
const soundBallMiss = new SoundWrapper(ASSETS.sounds.miss);
const soundBonus = new SoundWrapper(ASSETS.sounds.bonus);
const soundPowerUp = new SoundWrapper(ASSETS.sounds.powerUpPickup);

const player = new Player();
const ball = new Ball();
const paddle = new Paddle();

let brickLevel = new BrickLevel();
let powerUps = new Array();

const TOP_INFO_HEIGHT = 20

let showingTitleScreen = false;
let isPaused = false;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  initInput();
  loadImages();

  ball.reset();
  brickLevel.reset(brickLevel.LEVEL_LAYOUTS[1]);
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
  brickLevel.reset(brickLevel.LEVEL_LAYOUTS[0]);
  paddle.reset();

  showingTitleScreen = false;
  isPaused = false;

  musicBackground.loopMusic(ASSETS.music);
}

function nextLevel() {
  player.currentLevel++;
  if (player.currentLevel <= 3) {
    ball.reset();
    brickLevel.reset(brickLevel.LEVEL_LAYOUTS[player.currentLevel-1]);
    paddle.reset();
  } else {
    showingTitleScreen = true;
  }
}

function update() {
  if(showingTitleScreen || isPaused) {
    return;
  }

  powerUps.forEach(p => p.move());
  powerUps = powerUps.filter(p => !p.isDestroyed);

  ball.move();
  paddle.update();
}

function draw() {	
  // background
  drawImageCenteredAtLocationWithScaling(bgPic, canvas.width/2, canvas.height/2, canvas.width, canvas.height);

  if(showingTitleScreen) {
    drawTitleScreen();
    return;
  } 

  brickLevel.draw();

  powerUps.forEach(p => p.draw());

  // paddle
  paddle.draw();

  // ball
  ball.draw();

  player.draw();
  drawActivePowerUpHud();

  if (isPaused) {
    drawPauseOverlay();
  }
}

function togglePause() {
  if (showingTitleScreen) return;
  isPaused = !isPaused;
  if (musicBackground.musicSound) {
    isPaused ? musicBackground.musicSound.pause() : musicBackground.musicSound.play();
  }
}

function drawPauseOverlay() {
  canvasContext.save();
  canvasContext.fillStyle = 'rgba(0,0,0,0.5)';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  canvasContext.font = "60px Arial bold";
  canvasContext.fillStyle = 'white';
  canvasContext.fillText("Paused", 300, 300);
  canvasContext.font = "20px Arial";
  canvasContext.fillText("Press P or Esc to resume", 300, 340);
  canvasContext.restore();
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

