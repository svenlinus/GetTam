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





const keys = [];
let keyDown = [];
let keyUp = [];
let mouseIsUp = false;

let movement;

let numbers = false;

let cnv, board, cam, dcam, cyp;
let restartButton;
let icons = [];

let won = false;

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
  ];

  hawkSound = loadSound("sounds/hawk.mp3");
}


function setup() {
  won = false;
  lost = false;
  cnv = createCanvas(616, 616);
	// Tie canvas to a div
	cnv.parent("board");
  
  score = 0;
  bestSchool = 0;
  Screen.reset();

  update_score(0);
  update_school(0);
  
  addSwipe();
  
  board = new Board(4, 4);
  movement = createVector(0, 0);
  cam = createVector(0, 0);
  dcam = createVector(0, 0);
  restartButton = new Button("Restart", width/2, height/2, setup);
  
  background(255);

 
  
}

function draw() {
  if(mouseIsUp) print('up')
  push();
  translate(8-cam.x, 8-cam.y);
  background(225);
  
  if(keyDown[38] || keyDown[87]) movement.y = -1;
  if(keyDown[40] || keyDown[83]) movement.y = 1;
  if(keyDown[37] || keyDown[65]) movement.x = -1;
  if(keyDown[39] || keyDown[68]) movement.x = 1;
  
  board.display();
  pop();

  if(won) win();
  if(lost) lose();

  const k = 0.1, damp = 0.025;
  dcam.x -= (cam.x)*k + dcam.x*damp;  // spring equation
  dcam.y -= (cam.y)*k + dcam.y*damp;
  cam.add(dcam);
  
  if(keyUp[32]) setup();
  if(keys[16] && keyUp[192]) {
    customTiles([
      [7, 6, 3, 2],
      [8, 5, 1, 4],
      [9, 4, 1, 8],
      [10, 3, 2, 4],
    ])
  }
  
  keyDown = [];
  keyUp = [];
  mouseIsUp = false;
  movement.set(0, 0)
}


function keyPressed() {
  keys[keyCode] = true;
  keyDown[keyCode] = true;
}
function keyReleased() {
  keys[keyCode] = false;
  keyUp[keyCode] = true;

  if(keyCode == 27) clearCookies();
}

function mouseClicked() {
  mouseIsUp = true;
}


function clearCookies() {
  setCookie("maxScore", 0, 0);
  setCookie("maxSchool", 0, 0);
  setup();
}


function customTiles(tiles) {
  forEach2D(tiles, (t, i, j) => {
    board.tiles[j][i] = t > 0 ? new Tile(j, i, t): 0;
  });
}


function win() {
  // GUI.fade();
}

function lose() {
  Screen.fade();
}



// function windowResized() {
//   let pt = (windowHeight-height)/2;
//   let pl = (windowWidth-width)/2
//   cnv.position(pl, pt);
// }




