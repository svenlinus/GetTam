// 2048 Tamalpais  1908 *
// 1024 Branson  1917
// 512 San Rafael  1924
// 256 Marin Catholic  1949 *
// 128 Archie Williams   1951 *
// 64 Novato  1957 *
// 32 Redwood  1958 *
// 16 Terra Linda  1960 *
// 8 San Marin  1967 *
// 4 Marin Academy  1971 *
// 2 TamisCal  1990 *



const keys = [];
let keyDown = [];
let keyUp = [];

let numbers = false;

let size, cnv;
let board;
let icons = [];

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
    // loadImage("tamiscal.png"),
    // loadImage("tamiscal.png"),
    loadImage("images/tam.png"),
  ];
}


function setup() {
  // size = min(windowWidth, windowHeight);
  cnv = createCanvas(600, 600);
  let pt = (windowHeight-height)/2;
  let pl = (windowWidth-width)/2;
  cnv.position(pl, pt);

  board = new Board(4, 4);
  
  background(255);
}

function draw() {
  background(225);
  board.display();
  keyDown = [];
  keyUp = [];
}


function keyPressed() {
  keys[keyCode] = true;
  keyDown[keyCode] = true;
}
function keyReleased() {
  keys[keyCode] = false;
  keyUp[keyCode] = true;
}




function windowResized() {
  let pt = (windowHeight-height)/2;
  let pl = (windowWidth-width)/2
  cnv.position(pl, pt);
}