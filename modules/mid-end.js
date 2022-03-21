import {newGame, printBruh, highScoreEvent, resetBoard} from './index.js';


document.addEventListener("start", newGame );

document.addEventListener("highScore", highScoreEvent );

document.addEventListener("resetBoard", resetBoard );
  
