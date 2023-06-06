//The p5js animation of wave is modified from https://editor.p5js.org/pippinbarr/sketches/bgKTIXoir
// How many rows of waves to display
let rows = 5;
// What is the range of motion for a single wave (vertically)
let waveMaxHeight = window.innerHeight/3;
// A base time value for our noise() function which we'll
// use to move the waves overall
let baseT = 0;

function setup() {
  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('wave');
}

function draw() {
  background('white');
  
  drawWaves(rows);
}

/**
Draws the specified number of waves on the canvas!
*/
function drawWaves(number) {
  // Loop through all our rows and draw each wave
  // We loop "backwards" to draw them one on top of the other
  // nicely
  for (let i = number; i >= 0; i--) {
    drawWave(i, number);
  }
  // Increment the base time parameter so that the waves move
  baseT += 0.01;
}

/**
Draws the nth wave.

Paramters are
* n - the number of the wave
* rows - the total number of waves
*/
function drawWave(n, rows) {
  // Calculate the base y for this wave based on an offset from the
  // bottom of the canvas and subtracting the number of waves
  // to move up. We're dividing the wave height in order to make the
  // waves overlap
  let baseY = height - n*waveMaxHeight/3;
  // Get the starting time parameter for this wave based on the
  // base time and an offset based on the wave number
  let t = baseT + n*100;
  // We'll start each wave at 0 on the x axis
  let startX = 0;
  // Let's start drawing
  push();
  // We'll use the HSB model to vary their color more easily
  colorMode(HSB);
  // Calculate the hue (0 - 360) based on the wave number, mapping
  // it to an HSB hue value
  let hue = map(n, 0, rows, 190, 230);
  let brightness = map(n, 0, rows, 100, 70);
  fill(hue, 70, brightness);
  noStroke();
  // We're using vertex-based drawing
  beginShape();
  // Starting vertex!
  vertex(startX, baseY);
  // Loop along the x axis drawing vertices for each point
  // along the noise() function in increments of 10
  for (let x = startX; x <= width; x += 10) {
    // Calculate the wave's y based on the noise() function
    // and the baseY
    let y = baseY - map(noise(t), 0, 1, 10, waveMaxHeight);
    // Draw our vertex
    vertex(x, y);
    // Increment our time parameter so the wave varies on y
    t += 0.01;
  }
  // Draw the final three vertices to close the shape around
  // the edges of the canvas
  vertex(width, baseY);
  vertex(width, height);
  vertex(0, height);
  // Done!
  endShape();
}