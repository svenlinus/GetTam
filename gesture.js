let touchstartX = 0
let touchendX = 0
let touchstartY = 0
let touchendY = 0

const threshold = 20

// Chat


function addSwipe() {

  const board = document.getElementById('board')
  
  function handleGesture() {
    if(abs(movement.y) == 0 && abs(touchendX-touchstartX) > abs(touchendY-touchstartY)){
      if (touchendX < touchstartX-threshold) movement.x = -1
      if (touchendX > touchstartX+threshold) movement.x = 1
    }
    if(abs(movement.x) == 0 && abs(touchendX-touchstartX) < abs(touchendY-touchstartY)){
      if (touchendY < touchstartY-threshold) movement.y = -1
      if (touchendY > touchstartY+threshold) movement.y = 1
    }
  }
  
  board.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    touchstartY = e.changedTouches[0].screenY
  })
  
  board.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY
    handleGesture()
  })

  board.style.setProperty("overscroll-behavior", "contain");

}

// Stops scrolling with arrow keys
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// Stops scrolling with swipes on canvas
document.addEventListener('DOMContentLoaded', stop_move)

function stop_move() {
	board_div = document.querySelector('#board');
  // Ill move this to gesture.js where it will be in scope.  May I? Yes also it works! Never mind then.    lets go
	board_div.addEventListener('touchstart', (e) => e.preventDefault(), false);
	board_div.addEventListener('touchmove', (e) => e.preventDefault(), false);
}