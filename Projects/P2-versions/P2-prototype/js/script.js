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
  //[`0`,`1`,`2`,`3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`,`12`,`13`,`14`]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [0]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [1]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [2]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [3]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [4]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [5]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [6]
  [`S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`], // [7]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `], // [8]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `], // [9]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `], // [10]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `Pe`, ` `, ` `, ` `, ` `, ` `, ` `], // [11]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `Pl`, ` `], // [12]
  [` `, `NPC`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [13]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [14]
];

// gridMap[R][C]
//gridMap[currentPlayerIndex.playerRow][currentPlayerIndex.playerCollumn]

let player = {
  inventory: [{ itemName: "empty", itemQty: 1 }],
};

let playerPaused = false;

let peachImage, peachTreeImage;
let currentPlayerIndex;

//let gridMap = [];
let rows = 15;
let columns = 15;

let unit;

let stopTextBubble = true;

let peachFallAreas = [
  { row: 9, collumn: 8 },
  { row: 9, collumn: 9 },
  { row: 9, collumn: 11 },
  { row: 9, collumn: 12 },
  { row: 10, collumn: 8 },
  { row: 10, collumn: 9 },
  { row: 10, collumn: 11 },
  { row: 10, collumn: 12 },
  { row: 11, collumn: 8 },
  { row: 11, collumn: 9 },
  { row: 11, collumn: 10 },
  { row: 11, collumn: 11 },
  { row: 11, collumn: 12 },
  { row: 12, collumn: 9 },
  { row: 12, collumn: 10 },
  { row: 12, collumn: 11 },
];

let fallenPeachRow;
let fallenPeachCollumn;

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

  displayText();

  // display grid
  displayGrid();

  // END OF BACKGROUND //
}

function displayGrid() {
  for (let y = 0; y < gridMap.length; y++) {
    //let row = gridMap[y];
    for (let x = 0; x < gridMap[y].length; x++) {
      push();
      noFill();
      //stroke(0);
      //rect(x * unit, y * unit, unit, unit);
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
  image(peachImage, x * unit, y * unit, 34, 35); // hard numbers
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
  if (playerPaused === true) {
  } else if (playerPaused === false) {
    if (keyCode === LEFT_ARROW) {
      //console.log("wait a minute?");
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
        let treeDropTime = random(1500, 3500);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
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
      //console.log("wait a minute?");
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
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `;
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn + 1
        ] = `Pl`;
        // pick up peach, add to inventory ###
        player.inventory.push({ itemName: "peach", itemQty: 1 });
        let treeDropTime = random(1500, 3500);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
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
      //console.log("wait a minute?");
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
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `;
        gridMap[currentPlayerIndex.playerRow - 1][
          currentPlayerIndex.playerCollumn
        ] = `Pl`;
        // pick up peach, add to inventory ###
        player.inventory.push({ itemName: "peach", itemQty: 1 });
        let treeDropTime = random(1500, 3500);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
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
      //console.log("wait a minute?");
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
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `;
        gridMap[currentPlayerIndex.playerRow + 1][
          currentPlayerIndex.playerCollumn
        ] = `Pl`;
        // pick up peach, add to inventory ###
        player.inventory.push({ itemName: "peach", itemQty: 1 });
        let treeDropTime = random(15000, 35000);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
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
  }

  if (keyCode === 32) {
    //console.log("yum");
    // if player is adjacent to NPC, dialog box, or give item
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        //console.log(`${gridMap[r][c]}`);
        if (
          (gridMap[r][c] === `NPC` && gridMap[r - 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `NPC` && gridMap[r - 1][c] === `Pl`) ||
          (gridMap[r][c] === `NPC` && gridMap[r - 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `NPC` && gridMap[r][c - 1] === `Pl`) ||
          (gridMap[r][c] === `NPC` && gridMap[r][c] === `Pl`) ||
          (gridMap[r][c] === `NPC` && gridMap[r][c + 1] === `Pl`) ||
          (gridMap[r][c] === `NPC` && gridMap[r + 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `NPC` && gridMap[r + 1][c] === `Pl`) ||
          (gridMap[r][c] === `NPC` && gridMap[r + 1][c + 1] === `Pl`)
        ) {
          console.log("NPC DIALOG");
          if (stopTextBubble === true) {
            // when space is pressed beside npc, text bubble is displayed
            // player is paused
            playerPaused = true;
            // if player item is out, player gives npc item ###
            stopTextBubble = false;
          } else if (stopTextBubble === false) {
            stopTextBubble = true;
            playerPaused = false;
          }
        }
      }
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
        //console.log("do you come back out of here?");
      }
    }
  }
}

function displayText() {
  console.log(stopTextBubble);
  if (stopTextBubble === false) {
    //console.log("well???");
    push();
    fill(255);
    rectMode(CENTER);
    rect(250, 250, 320, 75);
    pop();
    push();
    //textAlign(CENTER);
    fill(0);
    textAlign(CENTER, CENTER);
    text(`How fantastic to meet you!`, 250, 250);
    pop();
  } else if (stopTextBubble === true) {
    // do nothing
  }
}

function dropPeach() {
  // randomly select a place near the tree to drop a peach
  //console.log("do you come here?");
  let fallenPeachIndex = random(peachFallAreas);
  if (gridMap[fallenPeachIndex.row][fallenPeachIndex.collumn] === `Pl`) {
    fallenPeachIndex = random(peachFallAreas);
    dropPeach();
  } else {
    gridMap[fallenPeachIndex.row][fallenPeachIndex.collumn] = `Pe`;
  }
}

// ### remember for inventory, use an array that player can press numbers to select items

function mouseClicked() {
  //console.log(gridMap);
  console.log(player.inventory);
}
