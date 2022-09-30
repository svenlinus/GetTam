

const odds = () => max(floor(random(1, 3)-0.8), 1);
let size;
let score = 0;
let bestSchool = 1;
let lost = false;

let maxVal = 11;
let winCoords = {i:0, j:0};

class Board {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.tiles = [];
    for(let i = 0; i < w; i ++) {
      this.tiles.push([]);
      for(let j = 0; j < h; j ++)
        this.tiles[i].push(0);
    }
    
    for(let i = 0; i < 2; i ++) {
      const x = floor(random(w));
      const y = floor(random(h));
      this.tiles[x][y] = new Tile(x, y,  odds() );
    }

    this.rows = transpose(this.tiles);
  }

  display() {
    size = 600/this.width;
    this.moved = false;
    this.rows = transpose(this.tiles);

    rectMode(CORNER);
    fill(180);
    noStroke();
    for(let i = 0; i < this.width; i ++) {
      for(let j = 0; j < this.height; j ++)
        rect(i*size+8, j*size+8, size-16, size-16);
    }

    forEach2D(this.tiles, (n, i, j) => {
      if(n instanceof Tile) n.display(this);
    });

    if(won) return;
	    this.isFull();
    if(this.gameOver()) {
      if(!lost) document.dispatchEvent(highScore);
      lost = true;
      return;
    }
    
      
    if(movement.y < 0) this.moveUp();
    else if(movement.y > 0) this.moveDown();
    else if(movement.x < 0) this.moveLeft();
    else if(movement.x > 0) this.moveRight();

    // let dir = "";
    // if(movement.y < 0) dir = "up";
    // if(movement.y > 0) dir = "down";
    // if(movement.x < 0) dir = "left";
    // if(movement.x > 0) dir = "right";

    if(abs(movement.x) + abs(movement.y) > 0) {
      // states.shift();
      // states.push(table(this.rows, "val", true) + dir);
      bruh = true;
      update_score(score);
      if(!this.full && this.moved) this.addTile();
    }
  }

  rotate() {  // assuming w = h
    this.tiles = transpose(this.tiles, true);
    this.tiles = reverseI(this.tiles, true);
    this.rows = transpose(this.tiles);
  }

  isFull() {  // assuming w = h
    let full = true;
    for(let i = 0; i < this.width; i ++) {
      for(let j = 0; j < this.width; j ++) {
        if(!this.tiles[i][j] || !this.tiles[j][i]) {
          full = false;
          break;
        }
      }
    }
    this.full = full;
    return full;
  }

  gameOver() {
    if(!this.full) return false;
    if(won) return false;
    let over = true;
    let iter = 0;

    for(let i = 0; i < this.width; i ++) {
      for(let j = 0; j < this.height; j ++) {
        const t = this.tiles[i][j];
        const t2 = this.tiles[this.width-i-1][this.height-j-1];
        for(let n of t.neighbors) {
          if(n.val == t.val) {
            over = false;
            break;
          }
        }
        for(let n of t2.neighbors) {
          if(n.val == t2.val) {
            over = false;
            break;
          }
        }
        iter ++;
        if(!over) break;
      }
      if(!over) break;
    }

    return over;
  }

  addTile() {
    let x = floor(random(this.width));
    let y = floor(random(this.height));
    while(this.tiles[x][y]) {
      x = floor(random(this.width));
      y = floor(random(this.height));
    }
    this.tiles[x][y] = new Tile(x, y, odds() );
  }

  maxScore() {
    let sum = 0;
    forEach2D(this.tiles, (tile, i, j) => {
      const n = tile.val;
      if(tile.val) sum += (n-1)*pow(2, n);
    });
    return sum;
  }

  moveDown() {
    const tile = this.tiles;
    for(let i = 0; i < tile.length; i ++) {
      for(let j = tile[i].length-1; j >= 0; j --) {
        const n = tile[i][j];
        if(n instanceof Tile) n.moveDown();
      }
    }
  }

  moveUp() {
    const tile = this.tiles;
    for(let i = 0; i < tile.length; i ++) {
      for(let j = 0; j < tile[i].length; j ++) {
        const n = tile[i][j];
        if(n instanceof Tile) n.moveUp();
      }
    }
  }

  moveLeft() {
    const tile = this.rows;
    for(let i = 0; i < tile.length; i ++) {
      for(let j = 0; j < tile[i].length; j ++) {
        const n = tile[i][j];
        if(n instanceof Tile) n.moveLeft();
      }
    }
  }

  moveRight() {
    const tile = this.rows;
    for(let i = 0; i < tile.length; i ++) {
      for(let j = tile[i].length-1; j >= 0; j --) {
        const n = tile[i][j];
        if(n instanceof Tile) n.moveRight();
      }
    }
  }
}



class Tile {
  constructor(i, j, val) {
    this.i = i;
    this.j = j;
    this.pi = i;
    this.pj = j;
    
    this.val = val;
    this.displayVal = val;
    
    this.pos = createVector(i*150, j*150);
    this.contact = createVector(-1, -1);
    
    this.scale = createVector(-0.5, -0.5);
    this.ds = createVector(0, 0);

    this.combine = true;
    this.neighbors = [];
  }

  display(parent) {
    // if(keys[16] && keyDown[187] && !won) {
    //   this.val ++;
    //   this.displayVal ++;
    // }

    if(this.displayVal > bestSchool) {
      bestSchool = this.displayVal;
      update_school(bestSchool-1);
    }

    // NESW
    this.neighbors = [];
    if(!won && this.i % 1 == 0) {
      if(this.j > 0) this.neighbors.push(parent.tiles[this.i][this.j-1]);
      if(this.i < parent.width-1) this.neighbors.push(parent.tiles[this.i+1][this.j]);
      if(this.j < parent.width-1) this.neighbors.push(parent.tiles[this.i][this.j+1]);
      if(this.i > 0) this.neighbors.push(parent.tiles[this.i-1][this.j]);
    }
      
    const s = 0.3;
    rectMode(CENTER);
    // parents.tiles[this.i][this.j] = this;
    const k = 0.05, damp = 0.1;
    let t = 1;
    if(this.displayVal == maxVal) t = 2;
    else if(this.displayVal >= 11) t = 1.25;
    else if(this.displayVal >= 9) t = 1.13;
    else if(this.displayVal >= 7) t = 1.08;
    
    this.ds.x -= (this.scale.x-t)*k + this.ds.x*damp;
    this.ds.y -= (this.scale.y-t)*k + this.ds.y*damp;
    this.ds.limit(0.15);
    this.scale.add(this.ds);
    this.scale.x = constrain(this.scale.x, 0, t+0.2);
    this.scale.y = constrain(this.scale.y, 0, t+0.2);
    
    this.parent = parent;
    textAlign(CENTER, CENTER);
    textSize(70-this.val);
    
    if(this.displayVal < maxVal && this.contact && (this.pi != this.i || this.pj != this.j)) {
      const dx = this.i-this.pi;
      const dy = this.j-this.pj;

      if(abs(dx)+abs(dy) < 1) {
        this.scale.x -= dx != 0 ? 0.12 : 0;
        this.scale.y -= dy != 0 ? 0.12 : 0;
      }

      if(abs(dx) + abs(dy) < 0.05) {
        this.move();
      }
      
      push();
      translate(this.i*size, this.j*size);
      const offx = dx != 0 ? (size/2)*(1-this.scale.x)*dx/abs(dx) : 0
      const offy = dy != 0 ? (size/2)*(1-this.scale.y)*dy/abs(dy) : 0;
      translate(size/2+offx || 0, size/2+offy);
      scale(this.scale.x, this.scale.y);
      this.drawIcon();
      pop();
    }

    if(this.displayVal == maxVal) {
      if(!won) {
        hawkSound.play();
        hasWon(true);
        win();
        winCoords = {i:this.i, j:this.j, tile:this};
      }
      won = true;
      this.i = 1.5;
      this.j = 1.5;
    }


    
    this.pi = lerp(this.pi, this.i, s);
    this.pj = lerp(this.pj, this.j, s);
    
    this.pos.set(this.pi*size, this.pj*size);
    
    if(won && this.displayVal != maxVal && (this.i > 0 && this.i < 3 && this.j > 0 && this.j < 3)) return;
    
    push();
    translate(this.pos);
    translate(size/2, size/2);
    scale(this.scale.x, this.scale.y);
    this.drawIcon();
    pop();

    rectMode(CORNER);
  }

  drawIcon() {
    const val = this.displayVal;
    imageMode(CENTER);
    
    if(!numbers && icons[this.displayVal-1]) {
      image(icons[this.displayVal-1], 0, 0, size-16, size-16);
      return;
    }
    colorMode(HSB);
    fill(22-val*2, val*9, 90);
    if(val == 11) fill(340, 100, 90);
    noStroke();
    rect(0, 0, 134, 134);
    colorMode(RGB);
    fill(0);
    if(val >= 3) fill(255);
    text(pow(2, val), 0, 0);
  }

  move() {
    this.pi = this.i;
    this.pj = this.j;
    this.contact = false;
    this.displayVal = this.val;
    this.combine = true;
  }

  updateVal() {
    this.val ++;
    score += pow(2, this.val);
    this.contact = true;
    this.combine = false;

    if(this.val >= 7) {
      if(round(dcam.mag()*10)/10 < 0.3) dcam.set(p5.Vector.random2D());
      dcam.mult(this.val-5);
      dcam.mult(0.9);
    }
  }

  moveDown() {
    this.move();
    const tiles = this.parent.tiles, i = this.i, j = this.j;
    
    for(let k = j+1; k < tiles[i].length; k ++) {
      if(tiles[i][k] instanceof Tile) {
        tiles[i][j] = 0;
        if(tiles[i][k].val == this.val && tiles[i][k].combine) {
          this.updateVal();
          this.j = k;
          tiles[i][k] = this;
          tiles[i][k-1] = 0;
        } else {
          this.j = k-1;
          tiles[i][k-1] = this;
        }
        break;
      } else {
        tiles[i][this.j] = 0;
        this.j = k;
        tiles[i][k] = this;
      }
    }

    if(this.j != j) this.parent.moved = true;
  }

  moveUp() {
    this.move();
    const tiles = this.parent.tiles, i = this.i, j = this.j;
    
    for(let k = j-1; k >= 0; k --) {
      if(tiles[i][k] instanceof Tile) {
        tiles[i][j] = 0;
        if(tiles[i][k].val == this.val && tiles[i][k].combine) {
          this.updateVal();
          this.j = k;
          tiles[i][k] = this;
          tiles[i][k+1] = 0;
        } else {
          this.j = k+1;
          tiles[i][k+1] = this;
        }
        break;
      } else {
        tiles[i][this.j] = 0;
        this.j = k;
        tiles[i][k] = this;
      }
    }    
    
    if(this.j != j) this.parent.moved = true;
  }
  
  moveLeft() {
    this.move();
    const tiles = this.parent.tiles, i = this.i, j = this.j;
    
    for(let k = i-1; k >= 0; k --) {
      if(tiles[k][j] instanceof Tile) {
        tiles[i][j] = 0;
        if(tiles[k][j].val == this.val && tiles[k][j].combine) {
          this.updateVal();
          this.i = k;
          tiles[k][j] = this;
          tiles[k+1][j] = 0;
        } else {
          this.i = k+1;
          tiles[k+1][j] = this;
        }
        break;
      } else {
        tiles[this.i][j] = 0;
        this.i = k;
        tiles[k][j] = this;
      }
    }

    if(this.i != i) this.parent.moved = true;
  }
   
  moveRight() {
    this.move();
    const tiles = this.parent.tiles, i = this.i, j = this.j;
    
    for(let k = i+1; k < tiles.length; k ++) {
      if(tiles[k][j] instanceof Tile) {
        tiles[i][j] = 0;
        if(tiles[k][j].val == this.val && tiles[k][j].combine) {
          this.updateVal();
          this.i = k;
          tiles[k][j] = this;
          tiles[k-1][j] = 0;
        } else {
          this.i = k-1;
          tiles[k-1][j] = this;
        }
        break;
      } else {
        tiles[this.i][j] = 0;
        this.i = k;
        tiles[k][j] = this;
      }
    }

    if(this.i != i) this.parent.moved = true;
  }
}





function forEach2D(arr, f) {
  for(let i = 0; i < arr.length; i ++) {
    for(let j = 0; j < arr[i].length; j ++) {
      f(arr[i][j], i, j);
    }
  }
}


function reverseI(arr, update) {
  const newArr = [];
  const w = arr.length-1;
  const h = arr[0].length-1;
  for(let i = 0; i < arr.length; i ++) {
    newArr.push([]);
    for(let j = 0; j < arr[0].length; j ++) {
      if(update) arr[w-i][j].i = i;
      newArr[i][j] = arr[w-i][j];
    }
  }
  return newArr;
}

function transpose(arr, update) {
  const newArr = [];
  for(let i = 0; i < arr[0].length; i ++) {
    newArr.push([]);
    for(let j = 0; j < arr.length; j ++) {
      if(update) {
        arr[j][i].i = i;
        arr[j][i].j = j;
      }
      newArr[i][j] = arr[j][i];
    }
  }
  return newArr;
}

function table(arr, prop, ret) {
  let out = "";
  prop = prop || "val";
  for(let i = 0; i < arr.length; i ++) {
    let msg = "";
    for(let j = 0; j < arr[i].length; j ++)
      msg += arr[i][j] ? arr[i][j][prop] + " " : "0 ";
    if(!ret) print("[ " + msg + "]");
    else out += "[ " + msg + "]\n";
  }
  if(ret) return out;
}




// function copy2D(arr) {
//   const newArr = [];
//   for(let i = 0; i < arr.length; i ++) {
//     newArr.push([]);
//     for(let j = 0; j < arr[i].length; j ++) {
//       newArr[i][j] = arr[i][j];
//     }
//   }
// }
