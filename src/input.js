function initInput() {
  canvas.addEventListener('mousemove', 
    function(e) {
      let mousePos = calculateMousePos(e);
      paddle.x = mousePos.x - PADDLE_WIDTH/2;

      if (ball.isStopped) {
        ball.x = mousePos.x;
      }
    }
  );

  canvas.addEventListener('mousedown', handleMouseClick);
}

function handleMouseClick(e) {
  if(showingLoseScreen) {
    playerScore = 0;
    playerLives = STARTING_LIVES;
    showingLoseScreen = false;

    bricksReset();
    ballReset();
  }
  else if(showingWinScreen) {
    showingWinScreen = false;

    bricksReset();
    ballReset();
  } else if (ball.isStopped) {
    ball.push();
  }
}

function calculateMousePos(e) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft
  let mouseY = e.clientY - rect.top - root.scrollTop

  return {
    x:mouseX,
    y:mouseY
  }
}

function keyPressed(e) {
  e.preventDefault();

  if (e.keyCode === KEY_1) {
    if (showingMenuScreen) {
      isTwoPlayerMode = false;
      restartGame();
    }
  }
  else if (e.keyCode === KEY_2) {
    if (showingMenuScreen) {
      isTwoPlayerMode = true;
      restartGame();
    }
  }
  else {
    setKeyHoldState(e.keyCode, true);
  }
}

function keyReleased(e) {
  setKeyHoldState(e.keyCode, false);
}

function setKeyHoldState(keyCode, isPressed) {
  if (keyCode === paddle1.controlKeyUp) {
    paddle1.keyHeld_Up	= isPressed;
  }
  else if (keyCode === paddle1.controlKeyDown) {
    paddle1.keyHeld_Down	= isPressed;
  }
  else if (keyCode === paddle2.controlKeyUp) {
    paddle2.keyHeld_Up	= isPressed;
  }
  else if (keyCode === paddle2.controlKeyDown) {
    paddle2.keyHeld_Down	= isPressed;
  }
}