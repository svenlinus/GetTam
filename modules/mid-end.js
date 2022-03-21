import {newGame, printBruh, highScoreEvent} from './index.js';


document.addEventListener("start", () => {
  newGame();
});

document.addEventListener("highScore", () => {
  highScoreEvent();
  
});

  
