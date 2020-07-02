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
  if(showingTitleScreen) {
    restartGame();
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
    setKeyHoldState(e.keyCode, true);
  }
}

function keyReleased(e) {
  setKeyHoldState(e.keyCode, false);
}

function setKeyHoldState(keyCode, isPressed) {
  
}