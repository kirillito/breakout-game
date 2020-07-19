const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 18;

const BRICK_SCORE = 10;		

class BrickLevel {
  //TODO: put level layouts into array
  LEVEL_LAYOUTS = [
    [
      0,0,0,0,0,0,0,0,0,0,
      0,0,6,6,6,6,6,6,6,6,
      0,0,0,6,6,6,6,6,6,6,
      0,0,0,0,6,6,6,6,6,6,
      0,0,0,0,0,6,6,6,6,6,
      0,0,0,0,0,0,6,6,6,6,
      1,0,0,0,0,0,0,6,6,6,
      1,1,0,0,0,0,0,0,6,6,
      1,1,1,0,0,0,0,0,0,6,
      1,1,1,1,0,0,0,0,0,0,
      1,1,1,1,1,0,0,0,0,0,
      1,1,1,1,1,1,0,0,0,0,
      1,1,1,1,1,1,1,0,0,0,
      1,1,1,1,1,1,1,1,0,0,
      1,1,1,1,1,1,1,1,1,0,
      1,1,1,1,1,1,1,1,1,1,
      2,2,2,2,2,2,2,2,2,2,
      3,3,3,3,3,3,3,3,3,3
    ],
    [
      0,0,0,0,0,0,0,0,0,0,
      0,1,1,0,1,1,0,1,1,0,
      0,1,1,0,1,1,0,1,1,0,
      0,1,2,1,1,1,1,2,1,0,
      0,1,1,1,1,1,1,1,1,0,
      0,1,1,6,1,1,6,1,1,0,
      0,1,1,6,3,3,6,1,1,0,
      0,1,1,1,3,3,1,1,1,0,
      0,1,1,1,3,3,1,1,1,0,
      0,1,1,0,3,3,0,1,1,0,
      0,1,2,6,1,1,6,2,1,0,
      0,1,2,1,1,1,1,2,1,0,
      0,1,2,1,1,1,1,2,1,0,
      0,1,1,1,1,1,1,1,1,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
    ],
    [
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,
      3,3,3,3,3,3,3,3,3,3,
      2,2,2,2,2,2,2,2,2,2,
      1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,
      3,3,3,3,3,3,3,3,3,3,
      2,2,2,2,2,2,2,2,2,2,
      1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,1
    ]
  ];

  constructor() {
    this.grid = new Array();
    this.brickCounter = 0;
    this.brickImages = [null, brick1Pic, brick2Pic, brick3Pic, null, null, brick6Pic];
  }

  reset(level) {
    this.buildLevel(level);
  }

  buildLevel(levelGrid) {
    this.brickCounter = 0;
    this.grid = levelGrid.slice();

    for (let i=0; i<this.grid.length; i++) {
      if (this.grid[i] >= 1 && this.grid[i] <= 5) {
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

        if (brickType >= 1) {
          drawImageCenteredAtLocationWithScaling(this.brickImages[brickType], brickX,	brickY, BRICK_W, BRICK_H);
        }

        brickIndex++;
        
        brickX += BRICK_W;
      }
      brickY += BRICK_H;
    }
  
  }
}