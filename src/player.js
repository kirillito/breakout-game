const STARTING_LIVES = 3;

const SCORE_UNTIL_BONUS_LIFE_DEFAULT = 1000;
const BONUS_MESSAGE_TIMEOUT_FRAMES = 120;

const MAX_LIVES = 5;

class Player {
  constructor() {
    this.score = 0;
    this.lastScore = 0;
    this.lives = STARTING_LIVES;
    this.scoreUntilBonusLife = SCORE_UNTIL_BONUS_LIFE_DEFAULT;
    this.currentLevel = 1;
  }

  reset() {
    this.score = 0;
    this.currentLevel = 1;
  }
  
  addScore(score) {
    this.score += score;
    this.scoreUntilBonusLife -= score;
    if (this.scoreUntilBonusLife <= 0) {
      if (this.lives < MAX_LIVES) {
        this.lives++;
        soundBonus.play();
        this.displayBonusMessageCounter = BONUS_MESSAGE_TIMEOUT_FRAMES;
      }
      this.scoreUntilBonusLife += SCORE_UNTIL_BONUS_LIFE_DEFAULT;
    }
  }

  loose() {
    this.lives--;
    if (!this.lives) {
      showingTitleScreen = true;
      this.lastScore = this.score;
    }
  }

  // display relevant player data
  draw() {
    drawColoredText('Lives:', canvas.width - 200, 10, 'white');
    for (var i=this.lives; i>0; i--) {
      drawImageCenteredAtLocationWithScaling(ballPic, canvas.width - 180 + i*14, 7, BALL_RADIUS*1.5, BALL_RADIUS*1.5);
    }

    drawColoredText('Score: ' + this.score, canvas.width - 100, 10, 'white');

    if (this.displayBonusMessageCounter > 0) {
      drawColoredText('Bonus life for ' + SCORE_UNTIL_BONUS_LIFE_DEFAULT + ' scores!', canvas.width - 400, 10, 'yellow');
      this.displayBonusMessageCounter--;
    }  
  }
}