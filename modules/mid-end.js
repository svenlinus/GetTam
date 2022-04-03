import {newGame, highScoreEvent, resetBoard, addBlacklist } from './index.js';


document.addEventListener("start", newGame );

document.addEventListener("highScore", () => {
  if(!getCookie('name')) return;
  highScoreEvent();
});

document.addEventListener("resetBoard", resetBoard );
  
document.addEventListener("roll", async () => {
  await addBlacklist(getCookie('id'));
});