/**
Mish Mash
Frankie Latreille

This is the prototype for my CART 263 P2
*/

/*
TO DO:
+ use OOP states // title, simulation (would possibly be subdivided in final),
+ create canvas (grass and sky)
+ implement a grid system
+ create Player class
+ create NPC class
+ create Object class
+ have player pick up item, add item to an inventory,
+ have player select item box or empty box, selected box display item over player
+ have player give item to NPC (this will manipulate NPC property value for event "collecting item X")
+ have possibility for player to collect multiples of item
+ have item disappear when picked, and a new one appear randomly on map

*/

let peachImage, peachTreeImage;

let gridMap = [];
let rows = 15;
let columns = 15;

let unit;

("use strict");

/**
Description of preload
*/
function preload() {
  // image assets
  peachImage = loadImage(`assets/images/peach.png`);
  peachTreeImage = loadImage(`assets/images/peachtree.png`);
}

/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);

  for (let r = 0; r < rows; r++) {
    gridMap.push([]);
    for (let c = 0; c < columns; c++) {
      gridMap[r][c] = ` `;
    }
  }
  //
  unit = height / gridMap.length;
}

/**
Description of draw()
*/
function draw() {
  noStroke();

  // BACKGROUND //
  background(`skyblue`);
  // draw grass
  push();
  fill(`green`);
  rectMode(CENTER);
  rect(250, 432, width, height / 1.5);
  pop();

  // display the tree!
  push();
  imageMode(CENTER);
  image(peachTreeImage, 355, 270, 200, 200); // hard numbers
  pop();

  // display grid
  displayGrid();

  // END OF BACKGROUND //
}

function displayGrid() {
  for (let y = 0; y < gridMap.length; y++) {
    let row = gridMap[y];
    for (let x = 0; x < gridMap[y].length; x++) {
      push();
      noFill();
      stroke(0);
      rect(x * unit, y * unit, unit, unit);
      pop();
      let cell = gridMap[y][x];
      // if (cell === `F`) {
      //   drawFirTree(x, y);
    }
  }
}
