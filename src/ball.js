const BALL_RADIUS = 7;
const BALL_SPEEDUP_RATE = 0.0005;

const BALL_TRAIL_SIZE = 5;

class Ball {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.speedMultiplier = 1;
    this.isStopped = true;
    this.brickHitCounter = 0;
    
    this.trail = new Array(BALL_TRAIL_SIZE);
    this.imgSprite = null;
  }

  init(img) {
    this.imgSprite = img;
  }

  push() {
    this.isStopped = false;
    this.speedX = 10;
    this.speedY = 10;
  }
  
  spawnPowerUp(x, y) {
    powerUps.push(new PowerUp(x,y));
  }

  reset() {
    if (player.lives <= 0) {
      showingTitleScreen = true;
    }
  
    this.isStopped = true;
    this.speedX = 0;
    this.speedY = 0;
    this.x = canvas.width/2
    this.y = paddle.y-PADDLE_THICKNESS-BALL_RADIUS*2;
    this.brickHitCounter = 0;
    this.speedMultiplier = 1;

    this.trail = this.trail.fill({x: this.x, y: this.y});
  }

  move() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
  
    if (this.y <=  BALL_RADIUS+TOP_INFO_HEIGHT) {
      this.speedY = -this.speedY
      soundBallHit.play();
    }
    if (this.y >= paddle.y-PADDLE_THICKNESS-BALL_RADIUS 
        && this.x >= paddle.x && this.x <= paddle.x+PADDLE_WIDTH
        && this.speedY > 0) {
      this.speedY = -this.speedY * this.speedMultiplier
  
      let deltaX = this.x - (paddle.x + PADDLE_WIDTH/2);
      this.speedX = deltaX * 0.35 * this.speedMultiplier;

      this.speedMultiplier += BALL_SPEEDUP_RATE;
      this.brickHitCounter = 0;
      soundBallHit.play();
    } else if (this.y >= canvas.height) {
      player.loose();
  
      soundBallMiss.play();
      this.reset();
      paddle.reset();
    }
    if (this.x >= canvas.width-BALL_RADIUS && this.speedX > 0) {
      this.speedX = -this.speedX;
      soundBallHit.play();
    } else if (this.x <= BALL_RADIUS && this.speedX < 0) {
      this.speedX = -this.speedX;
      soundBallHit.play();
    }
  
    this.breakAndBounceOffBrickAtPixelCoord(this.x, this.y);

    this.trail.shift();
    this.trail.push({x: this.x, y: this.y});
  }

  breakAndBounceOffBrickAtPixelCoord(x, y) {
    let col = Math.floor(x/BRICK_W);
    let row = Math.floor(y/BRICK_H);
  
    // outside the brick area - don't do anything
    if (col < 0 || col >= BRICK_COLS || row < 0 || row >= BRICK_ROWS) 
      return;
  
    let brickIndex = brickLevel.brickCoordToIndex(row, col);
    // if brick is not removed
    if (brickLevel.grid[brickIndex] >= 1) {
      let previousCol = Math.floor((this.x-this.speedX) / BRICK_W);
      let previousRow = Math.floor((this.y-this.speedY) / BRICK_H);
  
      let bothTestsFailed = true;
  
      // ball changed columns of the brick grid
      if (previousCol != col) {
        // make sure that there is no horizontally adjacent brick from where the ball is coming
        let	adjacentBrickIndex	=	brickLevel.brickCoordToIndex(row, previousCol);
        if (brickLevel.grid[adjacentBrickIndex] === undefined || brickLevel.grid[adjacentBrickIndex] === 0)	{
          this.speedX = -this.speedX;
          bothTestsFailed	= false;
          soundBallHit.play();
        }
      }
  
      // ball changed rows of the brick grid
      if (previousRow != row) {
        // make sure that there is no vertically adjacent brick from where the ball is coming
        let	adjacentBrickIndex	=	brickLevel.brickCoordToIndex(previousRow, col);
        if (brickLevel.grid[adjacentBrickIndex] === undefined || brickLevel.grid[adjacentBrickIndex] === 0)	{
          this.speedY = -this.speedY;
          bothTestsFailed	= false;
          soundBallHit.play();
        }
      }
  
      // the ball hit three bricks in L-like shape - reverse movement 
      if (bothTestsFailed) {
        this.speedX = -this.speedX;
        this.speedY = -this.speedY;
        soundBallHit.play();
      }
  
      if (brickLevel.grid[brickIndex] <= 5) {
        brickLevel.grid[brickIndex]--;

        if (brickLevel.grid[brickIndex] === 0) {
          brickLevel.brickCounter--;
          player.addScore((this.brickHitCounter + 1) * BRICK_SCORE);
          this.brickHitCounter++;
          this.spawnPowerUp(this.x, this.y);
          
          if (brickLevel.brickCounter <= 0) {            
            player.lastScore = player.score;
            nextLevel();
          }
        }
 
      }
    }
    return;
  }

  draw() {
    // trail
    for (let i=this.trail.length-1; i>=0; i--) {
      canvasContext.globalAlpha = 0.1*i;
      drawImageCenteredAtLocationWithScaling(this.imgSprite, this.trail[i].x, this.trail[i].y, BALL_RADIUS*2, BALL_RADIUS*2);
    }

    canvasContext.globalAlpha = 1;
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x, this.y, BALL_RADIUS*2, BALL_RADIUS*2);
  }
}