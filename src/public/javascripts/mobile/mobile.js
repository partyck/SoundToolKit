let font, fontSize = 30;
let logic;

function preload() {
  font = loadFont('assets/Code.ttf');
}

function setup() {
  pixelDensity(1);
  logic = new Logic();
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  rectMode(CENTER);
  textFont(font);
  textSize(fontSize);
}

function draw() {
  logic.listenAcc();
  logic.sendData();
  printBackground();
  printLabel();
  if (mouseIsPressed) {
    logic.sendtouch();
    drawPoint();
  }
}

function printBackground() {
  var red = map(logic.accX, -9.81, 9.81, 0, 255);
  var green = map(logic.accY, -9.81, 9.81, 0, 255);
  var blue = map(logic.accZ, -9.81, 9.81, 0, 255);
  background(red, green, blue);
}

function printLabel() {
  let sess = 'SESSION: ' + logic.session + ' ' + logic.accSuport;
  text(sess, 20, 100);

  let coorx = 'X: ' + logic.accX;
  text(coorx, 20, 140);
  let coory = 'Y: ' + logic.accY;
  text(coory, 20, 180);
  let coorz = 'Z: ' + logic.accZ;
  text(coorz, 20, 220);

  let touchx = 'mouseX: ' + winMouseX;
  text(touchx, 20, 260);
  let touchy = 'mouseY: ' + winMouseY;
  text(touchy, 20, 300);
}

function drawPoint() {
  noStroke();
  fill('rgb(0,255,0)');
  circle(winMouseX,winMouseY,50);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

