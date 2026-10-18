const PADDLE_THICKNESS = 10;
const PADDLE_WIDTH = 100;
const PADDLE_KEY_SPEED = 12; // px per frame

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
    // Keyboard movement (mouse movement is handled in input.js)
    let dir = (keysHeld.right ? 1 : 0) - (keysHeld.left ? 1 : 0);
    if (dir !== 0) {
      this.x = Math.max(0, Math.min(canvas.width - this.width, this.x + dir * PADDLE_KEY_SPEED));
      if (ball.isStopped) {
        ball.x = this.x + this.width/2;
      }
    }

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
      this.powerUpTimer = SUPERPADDLE_DURATION;
    }
  }

  draw() {
    drawImageCenteredAtLocationWithScaling(this.imgSprite, this.x+paddle.width/2, this.y, paddle.width, PADDLE_THICKNESS);
  }
}