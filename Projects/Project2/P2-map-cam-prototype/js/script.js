"use strict";

// let forest = [
//   [`F`, ` `, ` `, ` `, `F`],
//   [` `, ` `, ` `, ` `, ` `],
//   [` `, ` `, ` `, ` `, ` `],
//   [`F`, `.`, ` `, ` `, ` `],
//   [` `, ` `, ` `, `F`, ` `],
// ];

let forest = [];
let rows = 5;
let cols = 5;

let unit;

let player;

function setup() {
  createCanvas(1066.56, 899.91);

  createPlayer(230, 200); // (x,y) starting positions declared and new Player is created

  for (let r = 0; r < rows; r++) {
    forest.push([]);
    for (let c = 0; c < cols; c++) {
      if (random() < 0.15) {
        forest[r][c] = `F`;
      } else {
        forest[r][c] = ` `;
      }
    }
  }

  unit = height / forest.length;
}

// Create player
function createPlayer(x, y) {
  // create new player class
  player = new Player(x, y);
}

function draw() {
  handlePausePlayerState(); // Handle pause player state

  background(200);
  displayPlayer(); // displays player and also constrains them to move only on the ground

  createCamBox(480, 320, 250, 250);
  //displayForest();
}

// Program draw function functions //
function handlePausePlayerState() {
  // Pause state handler
  if (player.isPaused === true) {
    // if player is paused...
    pausePlayer(); // set player x,y velocities to 0 and ignore handleInput + move
  } else if (player.isPaused === false) {
    // if player is not paused...
    movePlayer(); // handle user input and move player avatar
  }
}

function pausePlayer() {
  // turns player velocities to 0
  player.vx = 0;
  player.vy = 0;
}

function movePlayer() {
  player.handleInput(); // handle player input
  player.move(); // and move player avatar
}

function displayPlayer() {
  // player is displayed
  player.constrain(); // movement is constrained to the ground
  player.display(); // display player
}

function createCamBox(x, y, w, h) {
  push();
  fill(0);
  rectMode(CENTER);
  rect(x, y, w, h);
  pop();
}
// function displayForest() {
//   for (let y = 0; y < forest.length; y++) {
//     let row = forest[y];
//     for (let x = 0; x < forest[y].length; x++) {
//       push();
//       noFill();
//       stroke(0);
//       rect(x * unit, y * unit, unit, unit);
//       pop();
//       let cell = forest[y][x];
//       if (cell === `F`) {
//         drawFirTree(x, y);
//       }
//     }
//   }
// }

function drawFirTree(x, y) {
  push();
  noStroke();
  fill(100, 200, 100);
  ellipseMode(CORNER);
  ellipse(x * unit, y * unit, unit);
  pop();
}

//
