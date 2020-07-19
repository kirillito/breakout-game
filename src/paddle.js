const PADDLE_THICKNESS = 10;
const PADDLE_WIDTH = 100;

class Paddle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.thickness = PADDLE_THICKNESS;
    this.width = PADDLE_WIDTH;
    this.imgSprite = null;
    this.powerUpTimer = 0;
  }

  init(img) {
    this.x = 250;
    this.y = canvas.height - 20;
    this.imgSprite = img;
  }

  reset() {
    this.x = (canvas.width-paddle.width)/2;
    this.resetPowerUp();
  }

  update() {
    this.powerUpTimer--;
    if (this.powerUpTimer <= 0) {
      this.resetPowerUp();
    }
  }

  resetPowerUp() {
    this.width = PADDLE_WIDTH;
  }

  powerUp(type) {
    if (type === 'superpaddle') {
      this.resetPowerUp();
      this.width *= 2;
      this.powerUpTimer = 300;
    }
  }

  draw() {
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x+paddle.width/2, this.y, paddle.width, PADDLE_THICKNESS);
  }
}