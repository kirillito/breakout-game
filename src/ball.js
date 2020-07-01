const BALL_RADIUS = 7;

class Ball {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.isStopped = true;
  }

  init() {
  }

  push() {
    this.isStopped = false;
    this.speedX = 10;
    this.speedY = 10;
  }

  reset() {
    if (playerLives <= 0) {
      showingLoseScreen = true;
    }
  
    this.isStopped = true;
    this.speedX = 0;
    this.speedY = 0;
    this.x = canvas.width/2
    this.y = paddle.y-PADDLE_THICKNESS-BALL_RADIUS*2;
    paddle.x = (canvas.width-PADDLE_WIDTH)/2;
  }

  move() {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
  
    if (this.y <=  BALL_RADIUS) {
      this.speedY = -this.speedY
    }
    if (this.y >= paddle.y-PADDLE_THICKNESS-BALL_RADIUS 
        && this.x >= paddle.x && this.x <= paddle.x+PADDLE_WIDTH
        && this.speedY > 0) {
      this.speedY = -this.speedY
  
      let deltaX = this.x - (paddle.x + PADDLE_WIDTH/2);
      this.speedX = deltaX * 0.35;
    } else if (this.y >= canvas.height) {
        playerLives--;
        if (!playerLives) {
          showingLoseScreen = true;
        }
  
        this.reset();
    }
    if (this.x >= canvas.width-BALL_RADIUS || this.x <= BALL_RADIUS) {
      this.speedX = -this.speedX
    }
  
    this.breakAndBounceOffBrickAtPixelCoord(this.x, this.y);
  }

  breakAndBounceOffBrickAtPixelCoord(x, y) {
    let col = Math.floor(x/BRICK_W);
    let row = Math.floor(y/BRICK_H);
  
    // outside the brick area - don't do anything
    if (col < 0 || col >= BRICK_COLS || row < 0 || row >= BRICK_ROWS) 
      return;
  
    let brickIndex = brickLevel.brickCoordToIndex(row, col);
    // if brick is not removed
    if (brickLevel.grid[brickIndex] == 1) {
      let previousCol = Math.floor((this.x-this.speedX) / BRICK_W);
      let previousRow = Math.floor((this.y-this.speedY) / BRICK_H);
  
      let bothTestsFailed = true;
  
      // ball changed columns of the brick grid
      if (previousCol != col) {
        // make sure that there is no horizontally adjacent brick from where the ball is coming
        let	adjacentBrickIndex	=	brickLevel.brickCoordToIndex(row, previousCol);
        if (brickLevel.grid[adjacentBrickIndex] != 1)	{
          this.speedX = -this.speedX;
          bothTestsFailed	= false;
        }
      }
  
      // ball changed rows of the brick grid
      if (previousRow != row) {
        // make sure that there is no vertically adjacent brick from where the ball is coming
        let	adjacentBrickIndex	=	brickLevel.brickCoordToIndex(previousRow, col);
        if (brickLevel.grid[adjacentBrickIndex] != 1)	{
          this.speedY = -this.speedY;
          bothTestsFailed	= false;
        }
      }
  
      // the ball hit three bricks in L-like shape - reverse movement 
      if (bothTestsFailed) {
        this.speedX = -this.speedX;
        this.speedY = -this.speedY;
      }
  
      brickLevel.grid[brickIndex] = 0;
      brickLevel.brickCounter--;
      playerScore += BRICK_SCORE;
      
      if (brickLevel.brickCounter == 0) {
        showingWinScreen = true;
      }
    }
    return;
  }

  draw() {
    drawCircle(this.x, this.y, BALL_RADIUS, 'yellow');
  }
}