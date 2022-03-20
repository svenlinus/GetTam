let touchstartX = []
let touchendX = []
let touchstartY = []
let touchendY = []
let touchNum = 0

const threshold = 20

// Chat


function addSwipe() {

  const boardElement = document.getElementById('board')
  
  function handleGesture() {
    const tix = touchstartX[0], tiy = touchstartY[0];  // touch-initial
    const tfx = touchendX[0], tfy = touchendY[0];      // touch-final
    
    if(touchNum == 2) {
      board.rotate();
      touchNum = 0;
      return;
    }

    
    if(abs(movement.y) == 0 && abs(tfx-tix) > abs(tfy-tiy)){
      if (tfx < tix-threshold) movement.x = -1
      if (tfx > tix+threshold) movement.x = 1
    }
    movement.y = swipingVertDir(tix, tiy, tfx, tfy);
  }
  
  boardElement.addEventListener('touchstart', e => {
    touchstartX = mapList(e.changedTouches, t => t.screenX);
    touchstartY = mapList(e.changedTouches, t => t.screenY);
    touchNum = e.touches.length;
  })
  
  boardElement.addEventListener('touchend', e => {
    touchendX = mapList(e.changedTouches, t => t.screenX);
    touchendY = mapList(e.changedTouches, t => t.screenY);
    if(touchNum > 0) handleGesture();
  })


  boardElement.style.setProperty("overscroll-behavior", "contain");

}

function swipingVertDir(tix, tiy, tfx, tfy) {
  if(abs(movement.x) == 0 && abs(tfx-tix) < abs(tfy-tiy)){
    if (tfy < tiy-threshold) return -1
    if (tfy > tiy+threshold) return 1
  }
  return 0;
}

function mapList(list, f) {
  const newArr = [];
  for(let i = 0; i < list.length; i ++) {
    newArr[i] = f(list[i]);
  }
  return newArr;
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