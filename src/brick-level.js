const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;

const BRICK_SCORE = 10;		

class BrickLevel {
  constructor() {
    this.grid = new Array(BRICK_ROWS * BRICK_COLS);
    this.brickCounter = 0;
    
  }

  reset() {
    for (let i=3*BRICK_COLS; i<BRICK_ROWS * BRICK_COLS; i++) {
      this.grid[i]	= 1;
      this.brickCounter++;
    }
  }

  doesBrickExist(row, col) {
    let brickIndex = this.brickCoordToIndex(row, col);
    return (this.grid[brickIndex] == 1);
  }
  
  brickCoordToIndex(row, col) {
    return col + BRICK_COLS * row;
  }
  
  draw() {
    for (let i=0;	i<BRICK_ROWS;	i++) {
      for (let j=0;	j<BRICK_COLS;	j++) {
        if (this.doesBrickExist(i, j)) {
          let	brickX = j * BRICK_W;
          let	brickY = i * BRICK_H + TOP_INFO_HEIGHT;
  
          drawRectangle(brickX,	brickY, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, 'blue');
        }
      }
    }
  
  }
}