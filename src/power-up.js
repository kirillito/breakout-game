const POWER_UP_FALL_SPEED = 2;

class PowerUp {
  types = ['fireball','superpaddle'];

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = this.getRandomType();
    this.isDestroyed = false;

    this.imgSprite = null;
  }

  getRandomType() {
    return this.types[Math.floor(Math.random()*2.8)];
  }

  move() {
    this.y += POWER_UP_FALL_SPEED;

    if (this.y >= paddle.y && this.y <= paddle.y + PADDLE_THICKNESS 
          && this.x >= paddle.x && this.x <= paddle.x + paddle.width) {
      this.isDestroyed = true;

      if (this.type === 'superpaddle') {
        paddle.powerUp(this.type);
      } else {
        ball.powerUp(this.type);
      }

    } else if (this.y >= canvas.height) {
      this.isDestroyed = true;
    }

  }

  draw() {
    switch (this.type) {
      case 'fireball':
        drawCircle(this.x, this.y, 6, 'red');        
        drawCircle(this.x, this.y, 4, 'orange');
        drawCircle(this.x, this.y, 2, 'yellow');        
        break;
      case 'superpaddle':
        drawRectangle(this.x-9, this.y-3, 3, 6, 'white');
        drawRectangle(this.x-3, this.y-3, 6, 6, 'blue');
        drawRectangle(this.x+3, this.y-3, 3, 6, 'white');
        break;
      default:
        break;
    }
    
  }
}