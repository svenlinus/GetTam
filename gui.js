const gui_elements = [];

class Button {
  constructor(msg, x, y, onClick) {
    this.msg = msg;
    this.x = x;
    this.y = y;
    this.z = 1;

    this.down = false;
    this.onClick = onClick;
    gui_elements.push(this);
  }

  display() {
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(35);
    this.height = textAscent()+textDescent()+20;
    this.width = textWidth(this.msg)+40;

    if(this.mouseDown()) {
      this.z = 0;
      this.down = true;
    } else this.z = 1;
    if(this.mouseUp()) {
      this.onClick();
    }

    if(!mouseIsPressed) this.down = false;

    push();
    translate(this.x, this.y);
    noStroke();
    fill(0, min(Screen.textA, 160));
    rect(0, 0, this.width, this.height);
    fill(31, 75, 163, min(Screen.textA, 255));
    translate(-this.z*4, -this.z*4);
    rect(0, 0, this.width, this.height);
    fill(255, Screen.textA);
    text(this.msg, 0, 2);
    pop();
  }

  mouseOver() {
    return abs(mouseX-this.x) <= this.width/2+20 && abs(mouseY-this.y) <= this.height/2+20;
  }

  mouseDown() {
    return mouseIsPressed && this.mouseOver()
  }

  mouseUp() {
    return this.mouseOver() && this.down && !mouseIsPressed;
  }
}


class Screen {
  static alpha = 0;
  static textA = 0;

  static fade() {
    textAlign(CENTER, CENTER);
    rectMode(CORNER);
    fill(31, 75, 163, min(Screen.alpha, 140));
    rect(0, 0, width, height);
    noStroke();
    textSize(65);
    fill(0, min(0.2*Screen.textA, 80) );
    text("Game Over", width/2+2, 180+2);
    fill(255, Screen.textA);
    text("Game Over", width/2, 180);
    
    Screen.alpha += 1;
    Screen.textA = max(130, 3*Screen.alpha-130)-130;
    
    restartButton.display();
  }

  static reset() {
    Screen.alpha = 0;
    Screen.textA = 0;
  }
}