const POWER_UP_FALL_SPEED = 2;
const POWER_UP_ICON_SIZE = 18;

// Durations are in frames (game runs at FPS = 30)
const FIREBALL_DURATION = 150;
const SUPERPADDLE_DURATION = 300;
const SLOWBALL_DURATION = 240;
const SLOWBALL_FACTOR = 0.6;

// type -> drop weight. Higher = more common.
const POWER_UP_WEIGHTS = {
  fireball: 3,
  superpaddle: 3,
  slowball: 3,
  extralife: 1, // rare
};

class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = PowerUp.getRandomType();
    this.isDestroyed = false;
  }

  // Weighted random pick from POWER_UP_WEIGHTS
  static getRandomType() {
    const types = Object.keys(POWER_UP_WEIGHTS);
    let roll = Math.random() * types.reduce((sum, t) => sum + POWER_UP_WEIGHTS[t], 0);
    for (const t of types) {
      roll -= POWER_UP_WEIGHTS[t];
      if (roll < 0) return t;
    }
    return types[0];
  }

  move() {
    this.y += POWER_UP_FALL_SPEED;

    if (this.y >= paddle.y && this.y <= paddle.y + PADDLE_THICKNESS
          && this.x >= paddle.x && this.x <= paddle.x + paddle.width) {
      this.isDestroyed = true;
      this.apply();
      soundPowerUp.play();
    } else if (this.y >= canvas.height) {
      this.isDestroyed = true;
    }
  }

  // Route the effect to whoever owns it
  apply() {
    switch (this.type) {
      case 'superpaddle':
        paddle.powerUp(this.type);
        break;
      case 'extralife':
        player.addLife();
        break;
      default: // fireball, slowball
        ball.powerUp(this.type);
    }
  }

  draw() {
    // Sprite if one is configured and loaded, otherwise a vector placeholder
    const icon = powerUpPics[this.type];
    if (icon) {
      drawImageCenteredAtLocationWithScaling(icon, this.x, this.y, POWER_UP_ICON_SIZE, POWER_UP_ICON_SIZE);
      return;
    }

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
      case 'slowball':
        drawCircle(this.x, this.y, 6, 'deepskyblue');
        drawCircle(this.x, this.y, 4, 'white');
        drawRectangle(this.x-0.5, this.y-3, 1, 3, 'deepskyblue'); // clock hands
        drawRectangle(this.x-0.5, this.y-0.5, 3, 1, 'deepskyblue');
        break;
      case 'extralife':
        drawCircle(this.x-3, this.y-2, 3.5, 'hotpink');
        drawCircle(this.x+3, this.y-2, 3.5, 'hotpink');
        canvasContext.fillStyle = 'hotpink';
        canvasContext.beginPath();
        canvasContext.moveTo(this.x-6.4, this.y-0.5);
        canvasContext.lineTo(this.x+6.4, this.y-0.5);
        canvasContext.lineTo(this.x, this.y+6);
        canvasContext.fill();
        break;
      default:
        break;
    }
  }
}

// Small bars in the bottom-left corner showing remaining time of active power-ups
function drawActivePowerUpHud() {
  const active = [
    {label: 'Fireball',    left: ball.isFireMode ? ball.powerUpTimer : 0,   total: FIREBALL_DURATION,    color: 'orange'},
    {label: 'Slow ball',   left: ball.slowTimer,                            total: SLOWBALL_DURATION,    color: 'deepskyblue'},
    {label: 'Wide paddle', left: paddle.powerUpTimer,                       total: SUPERPADDLE_DURATION, color: 'royalblue'},
  ].filter(p => p.left > 0);

  const barW = 80;
  let y = canvas.height - 8;
  active.forEach(p => {
    drawRectangle(70, y - 6, barW, 6, 'rgba(255,255,255,0.25)');
    drawRectangle(70, y - 6, barW * p.left / p.total, 6, p.color);
    drawColoredText(p.label, 6, y, 'white');
    y -= 12;
  });
}
