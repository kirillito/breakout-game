const POWER_UP_FALL_SPEED = 2;

class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.imgSprite = null;
  }

  move() {
    this.y += POWER_UP_FALL_SPEED;
  }

  draw() {
    drawCircle(this.x, this.y, 4, 'red');
  }
}