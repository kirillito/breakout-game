
const KEY_1 = 49;
const KEY_2 = 50;

function initInput() {
  canvas.addEventListener('mousemove', 
    function(e) {
      let mousePos = calculateMousePos(e);
      paddle.x = mousePos.x - paddle.width/2;

      if (ball.isStopped) {
        ball.x = mousePos.x;
      }
    }
  );
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
  // Auto-pause when the tab/window loses focus during play
  window.addEventListener('blur', function() { if (!isPaused) togglePause(); });

  canvas.addEventListener('mousedown', handleMouseClick);
}

function handleMouseClick(e) {
  handleLaunchAction();
}

// Start a new game from the title screen, or launch the ball (mouse click / Space)
function handleLaunchAction() {
  if (isPaused) return;
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

// Keyboard state read by Paddle.update()
const keysHeld = {left: false, right: false};

const KEY_LEFT_CODES = ['ArrowLeft', 'KeyA'];
const KEY_RIGHT_CODES = ['ArrowRight', 'KeyD'];

function keyPressed(e) {
  // Only swallow keys the game uses, so browser shortcuts (F5, F12...) keep working
  if (KEY_LEFT_CODES.includes(e.code)) {
    keysHeld.left = true;
  } else if (KEY_RIGHT_CODES.includes(e.code)) {
    keysHeld.right = true;
  } else if (e.code === 'Space') {
    if (!e.repeat) handleLaunchAction();
  } else if (e.code === 'KeyP' || e.code === 'Escape') {
    if (!e.repeat) togglePause();
  } else {
    return;
  }
  e.preventDefault();
}

function keyReleased(e) {
  if (KEY_LEFT_CODES.includes(e.code)) keysHeld.left = false;
  if (KEY_RIGHT_CODES.includes(e.code)) keysHeld.right = false;
}
