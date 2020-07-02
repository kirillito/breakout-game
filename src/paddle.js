const PADDLE_THICKNESS = 10;
const PADDLE_WIDTH = 100;

class Paddle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.imgSprite = null;
  }

  init(img) {
    this.x = 250;
    this.y = canvas.height - 20;
    this.imgSprite = img;
  }

  reset() {
    this.x = (canvas.width-PADDLE_WIDTH)/2;
  }

  draw() {
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x+PADDLE_WIDTH/2, this.y, PADDLE_WIDTH, PADDLE_THICKNESS);
  }
}