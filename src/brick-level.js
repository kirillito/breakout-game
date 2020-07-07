const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 18;

const BRICK_SCORE = 10;		

class BrickLevel {
  LEVEL3_GRID = [
    0,0,0,0,0,0,0,0,0,0,
    0,1,0,0,1,1,0,0,1,0,
    0,0,0,0,1,1,0,0,0,0,
    0,1,0,0,1,1,0,0,1,0,
    1,1,1,1,0,0,1,1,1,1,
    1,0,1,1,1,1,1,1,0,1,
    0,1,1,1,0,0,1,1,1,0,
    1,0,1,1,1,1,1,1,0,1,
    1,1,1,1,0,0,1,1,1,1,
    1,0,1,1,1,1,1,1,0,1,
    1,1,1,1,1,1,1,1,1,1,
    1,0,1,0,0,0,0,1,0,1,
    0,1,1,1,1,1,1,1,1,0,
    1,0,1,0,0,0,0,1,0,1,
    0,1,1,1,1,1,1,1,1,0,
    1,0,1,0,0,0,0,1,0,1,
    0,1,1,1,1,1,1,1,1,0,
    0,0,1,1,0,0,1,1,0,0
  ];

  LEVEL1_GRID = [
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1
  ];

  LEVEL2_GRID = 
  [
    0,0,0,0,0,0,0,0,0,0,
    0,1,1,0,1,1,0,1,1,0,
    0,1,1,0,1,1,0,1,1,0,
    0,1,1,1,1,1,1,1,1,0,
    0,1,1,1,1,1,1,1,1,0,
    0,1,1,0,1,1,0,1,1,0,
    0,1,1,0,1,1,0,1,1,0,
    0,1,1,1,1,1,1,1,1,0,
    0,1,1,1,1,1,1,1,1,0,
    0,1,1,0,1,1,0,1,1,0,
    0,1,1,0,1,1,0,1,1,0,
    0,1,1,1,1,1,1,1,1,0,
    0,1,1,1,1,1,1,1,1,0,
    0,1,1,1,1,1,1,1,1,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
  ];

  constructor() {
    this.grid = new Array();
    this.brickCounter = 0;    
  }

  reset() {
    this.buildLevel(this.LEVEL1_GRID);
  }

  buildLevel(levelGrid) {
    this.brickCounter = 0;
    this.grid = levelGrid.slice();

    for (let i=0; i<this.grid.length; i++) {
      if (this.grid[i] === 1) {
        this.brickCounter++;
      }
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
    let brickIndex = 0;
    let brickX;
    let brickY = 0.5*BRICK_H;
    let brickType;
    
    for (let i=0;	i<BRICK_ROWS;	i++) {
      brickX = 0.5*BRICK_W;
      for (var j=0;	j<BRICK_COLS;	j++) {
        brickType = this.grid[brickIndex];

        if (brickType === 1) {
          drawImageCenteredAtLocationWithScaling(brick1Pic, brickX,	brickY, BRICK_W, BRICK_H);
        }

        brickIndex++;
        
        brickX += BRICK_W;
      }
      brickY += BRICK_H;
    }
  
  }
}