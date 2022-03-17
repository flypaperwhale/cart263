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

let gridMap = [
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
  [`S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `Pe`, ` `, ` `, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `Pl`, ` `],
  [` `, `NPC`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `],
];

let player = {
  inventory: [{ itemName: "empty", itemQty: 1 }],
};

let peachImage, peachTreeImage;
let currentPlayerIndex;

//let gridMap = [];
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
    for (let c = 0; c < columns; c++) {
      if (gridMap[r][c] === `Pl`) {
        // save player's current position
        currentPlayerIndex = {
          playerRow: r,
          playerCollumn: c,
        };
        console.log("do you come back out of here?");

        //  }${r},${c}`;
      }
      //gridMap[r][c] = ` `;
    }
  }

  // for (let r = 0; r < rows; r++) {
  //   gridMap.push([]);
  //   for (let c = 0; c < columns; c++) {
  //     gridMap[r][c] = ` `;
  //   }
  // }
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
      if (cell === `Pl`) {
        // Pl for Player
        drawPlayer(x, y, `lime`);
      }
      if (cell === `Pe`) {
        // Pe for Peach
        drawPeach(x, y);
      }
      if (cell === `NPC`) {
        // NPC
        drawPlayer(x, y, `yellow`);
      }
      if (cell === `S`) {
        // S for Solid
        playerBarrier();
      }
    }
  }
}

function drawPeach(x, y) {
  push();
  imageMode(LEFT);
  image(peachImage, x * unit, y * unit, 34, 28); // hard numbers
  pop();
  // display peach image
}

function drawPlayer(x, y, color) {
  push();
  noStroke();
  fill(color);
  ellipseMode(CORNER);
  ellipse(x * unit, y * unit, unit);
  pop();
}

function playerBarrier(x, y) {
  // block player from moving onto
}

function controlPlayer(currentPressedKey) {
  // if (currentPressedKey === ``){
  //
  // }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    console.log("wait a minute?");
    if (
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn - 1
      ] === `S` ||
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn - 1
      ] === `NPC` ||
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn - 1
      ] === undefined
    ) {
      // do nothing
    } else if (
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn - 1
      ] === `Pe`
    ) {
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn
      ] = ` `;
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn - 1
      ] = `Pl`;
      // pick up peach, add to inventory ###
      player.inventory.push({ itemName: "peach", itemQty: 1 });
    } else {
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn
      ] = ` `;
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn - 1
      ] = `Pl`;
    }
  }

  if (keyCode === RIGHT_ARROW) {
    console.log("wait a minute?");
    if (
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn + 1
      ] === `S` ||
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn + 1
      ] === `NPC` ||
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn + 1
      ] === undefined
    ) {
      // do nothing
    } else if (
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn + 1
      ] === `Pe`
    ) {
      // pick up peach, add to inventory ###
    } else {
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn
      ] = ` `;
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn + 1
      ] = `Pl`;
    }
  }

  if (keyCode === UP_ARROW) {
    console.log("wait a minute?");
    if (
      gridMap[currentPlayerIndex.playerRow - 1][
        currentPlayerIndex.playerCollumn
      ] === `S` ||
      gridMap[currentPlayerIndex.playerRow - 1][
        currentPlayerIndex.playerCollumn
      ] === `NPC` ||
      gridMap[currentPlayerIndex.playerRow - 1][
        currentPlayerIndex.playerCollumn
      ] === undefined
    ) {
      // do nothing
    } else if (
      gridMap[currentPlayerIndex.playerRow - 1][
        currentPlayerIndex.playerCollumn
      ] === `Pe`
    ) {
      // pick up peach, add to inventory ###
    } else {
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn
      ] = ` `;
      gridMap[currentPlayerIndex.playerRow - 1][
        currentPlayerIndex.playerCollumn
      ] = `Pl`;
    }
  }

  if (keyCode === DOWN_ARROW) {
    console.log("wait a minute?");
    if (
      gridMap[currentPlayerIndex.playerRow + 1][
        currentPlayerIndex.playerCollumn
      ] === `S` ||
      gridMap[currentPlayerIndex.playerRow + 1][
        currentPlayerIndex.playerCollumn
      ] === `NPC` ||
      gridMap[currentPlayerIndex.playerRow + 1][
        currentPlayerIndex.playerCollumn
      ] === undefined
    ) {
      // do nothing
    } else if (
      gridMap[currentPlayerIndex.playerRow + 1][
        currentPlayerIndex.playerCollumn
      ] === `Pe`
    ) {
      // pick up peach, add to inventory ###
    } else {
      gridMap[currentPlayerIndex.playerRow][
        currentPlayerIndex.playerCollumn
      ] = ` `;
      gridMap[currentPlayerIndex.playerRow + 1][
        currentPlayerIndex.playerCollumn
      ] = `Pl`;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (gridMap[r][c] === `Pl`) {
        // save player's current position
        currentPlayerIndex = {
          playerRow: r,
          playerCollumn: c,
        };
        console.log("do you come back out of here?");

        //  }${r},${c}`;
      }
      //gridMap[r][c] = ` `;
    }
  }
}

function mouseClicked() {
  console.log(gridMap);
  console.log(player.inventory);
}
