const PADDLE_THICKNESS = 10;
const PADDLE_WIDTH = 100;

class Paddle {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  init() {
    this.x = 250;
    this.y = canvas.height - 10;
  }

  draw() {
    drawRectangle(this.x, this.y - PADDLE_THICKNESS,PADDLE_WIDTH,PADDLE_THICKNESS,'white');
  }
}