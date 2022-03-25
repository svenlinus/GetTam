import {newGame, printBruh, highScoreEvent, resetBoard, blacklistUser } from './index.js';


document.addEventListener("start", newGame );

document.addEventListener("highScore", () => {
  if(!getCookie('name')) return;
  highScoreEvent();
});

document.addEventListener("resetBoard", resetBoard );
  
