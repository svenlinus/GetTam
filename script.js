// 2048 Tamalpais  1908
// 1024 Branson  1917
// 512 San Rafael  1924
// 256 Marin Catholic  1949
// 128 Archie Williams   1951
// 64 Novato  1957
// 32 Redwood  1958
// 16 Terra Linda  1960
// 8 San Marin  1967
// 4 Marin Academy  1971
// 2 TamisCal  1990



const start = new Event("start");
const highScore = new Event("highScore");
const reset = new Event("resetBoard");
const rick = new Event("roll");

const keys = [];
let keyDown = [];
let keyUp = [];
let mouseIsUp = false;

let states = new Array(5);

let movement;

let numbers = false;

let cnv, board, cam, dcam, cyp;
let restartButton;
let icons = [];
let hawk, indicateBoard;
let pastWinner = false;
let showIndicator = true;
let restartNum = 0;

let won = false;
let pscore = 0;
let dscore = 0;
let started = false;
let bruh = false;


function preload() {
  icons = [
    loadImage("images/tamiscal.png"),
    loadImage("images/ma.png"),
    loadImage("images/sanmarin.png"),
    loadImage("images/tl.png"),
    loadImage("images/redwood.png"),
    loadImage("images/novato.png"),
    loadImage("images/archie.jpeg"),
    loadImage("images/mc.png"),
    loadImage("images/sr.jpg"),
    loadImage("images/branson.png"),
    loadImage("images/tam.png"),
    loadImage("images/last.png"),
    loadImage("images/outside.png")
  ];

  hawkSound = loadSound("sounds/hawk.mp3");
}

function hawkIcon() {
  let img = createImg(
    "images/tamicon.png",
    "Hawk Icon"
  );
  img.size(72, 60);
  img.position(610, 60);
  return img;
}

function indicate() {
  let p = createP("Click to see the leaderboard! -->")
  p.style('color', '#1f4ba3');
  p.style('font-weight', 'bold');
  p.id("indicate");
  p.position(width / 2, 60);
  return p;
}


function setup() {
  document.getElementById('win-buttons').innerHTML = '';
  document.dispatchEvent(start);
  // document.dispatchEvent(highScore);

  showIndicator = restartNum == 0 && !getCookie("name");
  if (hasWon() || getCookie("maxSchool") == 10) {
    hasWon(true);
    hawk = hawkIcon();
    pastWinner = true;
  }
  if (showIndicator) {
    indicateBoard = indicate();
  }
  won = false;
  lost = false;
  continued = false;
  maxVal = 11;

  cnv = createCanvas(616, 616);
  // Tie canvas to a div
  document.getElementById("board").innerHTML = "";
  cnv.parent("board");

  score = 0;
  bestSchool = 0;
  Screen.reset();


  board = new Board(4, 4);
  movement = createVector(0, 0);
  cam = createVector(0, 0);
  dcam = createVector(0, 0);
  restartButton = new Button("Restart", width / 2, height / 2, setup);

  update_score(0);
  update_school(0);
  addSwipe();

  background(255);
}


function draw() {
  pscore = score;
  started = true;
  if (pastWinner) hawk.position(windowWidth / 2 + 310, 75);
  if (showIndicator) indicateBoard.position(windowWidth / 2 - 260 + sin(frameCount * 0.1) * 10, 85);
  else if (indicateBoard) indicateBoard.html("");

  push();
  translate(8 - cam.x, 8 - cam.y);
  background(225);

  if (keyDown[38] || keyDown[87]) movement.y = -1;
  if (keyDown[40] || keyDown[83]) movement.y = 1;
  if (keyDown[37] || keyDown[65]) movement.x = -1;
  if (keyDown[39] || keyDown[68]) movement.x = 1;

  board.display();
  pop();

  dscore = score - pscore;
  if (dscore > 10000) {
    document.dispatchEvent(rick);
  }
  if (lost) lose();

  const k = 0.1, damp = 0.1;
  dcam.x -= (cam.x) * k + dcam.x * damp;  // spring equation
  dcam.y -= (cam.y) * k + dcam.y * damp;
  cam.add(dcam);

  // Due to even more popular request, you now need to click Shift+Space to reset the board
  if (keys[16] && keyUp[32]) {
    restartNum++;
    setup();
  }

  if (keyUp[82] && !lost && !won) {
    board.rotate();
    movement.set(0, 0);
  }

  keyDown = [];
  keyUp = [];
  mouseIsUp = false;
  movement.set(0, 0);
  bruh = false;
}


function keyPressed() {
  keys[keyCode] = true;
  keyDown[keyCode] = true;
}
function keyReleased() {
  keys[keyCode] = false;
  keyUp[keyCode] = true;

  // if(keyCode == 27) clearCookies();
}

function mouseClicked() {
  mouseIsUp = true;
  showIndicator = false;
}


function clearCookies() {
  setCookie("maxScore", 0, 0);
  setCookie("maxSchool", 0, 0);
  setCookie("gotTam", 0, 0);
  setup();
}


// function customTiles(tiles) {
//   forEach2D(tiles, (t, i, j) => {
//     board.tiles[j][i] = t > 0 ? new Tile(j, i, t): 0;
//   });
// }


const keepGoing = () => {
  maxVal++;
  won = false;
  winCoords.tile.i = winCoords.i;
  winCoords.tile.j = winCoords.j;
  document.getElementById('win-buttons').innerHTML = '';
}

function goToCredits() {
  location.href = "./credits.html";
}

function win() {
  document.getElementById('win-buttons').innerHTML = '<button class="btn" onClick="goToCredits()">Credits</button>';
  document.dispatchEvent(highScore);
  document.getElementById('win-buttons').innerHTML = `
<button class="btn" onClick="keepGoing()">Continue</button>
<button class="btn" onClick="goToCredits()">Credits</button>`;
}

function lose() {
  Screen.fade();
}

function parr(arr) {  // print array
  for (let e of arr)
    print(e);
}


// function windowResized() {
//   let pt = (windowHeight-height)/2;
//   let pl = (windowWidth-width)/2
//   cnv.position(pl, pt);
// }



