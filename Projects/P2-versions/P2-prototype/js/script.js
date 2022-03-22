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
  [`S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`], // [6]
  [`S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`], // [7]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `], // [8]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `], // [9]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `], // [10]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `Pe`, ` `, ` `, ` `, ` `, ` `, ` `], // [11]
  [
    ` `,
    `NPC`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Pl`,
    ` `,
  ], // [12]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [13]
  [`S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`], // [14]
];

// gridMap[R][C]
//gridMap[currentPlayerIndex.playerRow][currentPlayerIndex.playerCollumn]

let player = {
  inventory: [{ itemName: "empty", itemQty: 0, itemImageName: "no image" }],
};

let playerPaused = false;
let showInventory = false;
let selectItem = { itemName: "empty", itemQty: 0, itemImageName: "no image" };
let selectItemNumber = 0;
let itemDisplay = false;
let itemToDisplay;

let npcPeachEvent = 0;

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
  // END OF BACKGROUND //
  displayText();

  // display grid
  displayGrid();
  // display INVENTORY
  displayInventory();
  // items

  if (npcPeachEvent === 5) {
    alert("You gave NPC 5 peaches!");
    npcPeachEvent = 0;
  }
}

function displayGrid() {
  for (let y = 0; y < gridMap.length; y++) {
    //let row = gridMap[y];
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
        if (itemDisplay === true) {
          if (selectItem.itemName === "empty") {
            //display nothing
          } else {
            drawSmolPeach(x, y);
          }
        }
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

function displayInventory() {
  push();
  fill(220, 200, 100);
  rectMode(CENTER);
  rect(250, 475, 400, 40);
  fill(0);
  textAlign(LEFT);
  text(
    "0          1          2          3          4          5          6          7          8          9",
    80,
    465
  );
  noFill();
  stroke(0);
  rect(70, 475, 40, 40);
  rect(110, 475, 40, 40);
  rect(150, 475, 40, 40);
  rect(190, 475, 40, 40);
  rect(230, 475, 40, 40);
  rect(270, 475, 40, 40);
  rect(310, 475, 40, 40);
  rect(350, 475, 40, 40);
  rect(390, 475, 40, 40);
  rect(430, 475, 40, 40);
  pop();

  // #####
  // for (let i = 0; i < player.inventory.length; i++) {
  //   if (i === 0) {
  //     //display nothing
  //     console.log("yes that's right, nothing");
  //   } else {
  //     console.log("this is gonna bug");
  //     // find what object is in array
  //     // display item image in inventory
  //     itemToDisplay = player.inventory[i].itemImageName;
  //     console.log(itemToDisplay);
  //     push();
  //     imageMode(CENTER);
  //     console.log(i);
  //     image(itemToDisplay, 40 * i, 475, 34, 35);
  //     pop();
  //   }
  // }
}

function drawPeach(x, y) {
  push();
  imageMode(LEFT);
  image(peachImage, x * unit, y * unit, 34, 35); // hard numbers
  pop();
  // display peach image
}

function drawSmolPeach(x, y) {
  push();
  imageMode(CENTER);
  image(peachImage, x * unit + 15, y * unit, 25, 26); // hard numbers
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
    // do not move
    // do not enter inventory
  } else if (playerPaused === false) {
    if (keyCode === RETURN) {
      // display item over avatar
      if (itemDisplay === true) {
        itemDisplay = false;
      } else if (itemDisplay === false) {
        // do nothing
        itemDisplay = true;
      }
    }
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
        player.inventory.push({
          itemName: "peach",
          itemQty: 1,
          itemImageName: "peachImage",
        });
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

            // npc verifies what player is giving
            if (selectItem.itemName === "peach") {
              player.inventory[selectItemNumber].splice;
              npcPeachEvent++;
            }
          } else if (stopTextBubble === false) {
            stopTextBubble = true;
            playerPaused = false;
          }
        }
      }
    }
  }

  if (keyCode === 48) {
    // 0
    // empty box, player can talk to npc without giving item
    selectItemNumber = 0;
    selectItem = player.inventory[0];
  }
  if (keyCode === 49) {
    // 1
    selectItemNumber = 1;
    if (player.inventory[1] === undefined) {
      selectItem = player.inventory[0];
    } else {
      selectItem = player.inventory[1];
    }
  }
  if (keyCode === 50) {
    // 2
    selectItemNumber = 2;
    if (player.inventory[2] === undefined) {
      selectItem = player.inventory[0];
    } else {
      selectItem = player.inventory[2];
    }
  }
  if (keyCode === 51) {
    // 3
    selectItemNumber = 3;
    if (player.inventory[3] === undefined) {
      selectItem = player.inventory[0];
    } else {
      selectItem = player.inventory[3];
    }
  }
  if (keyCode === 52) {
    // 4
    selectItemNumber = 4;
    if (player.inventory[4] === undefined) {
      selectItem = player.inventory[0];
    } else {
      selectItem = player.inventory[4];
    }
  }
  if (keyCode === 53) {
    // 5
    selectItemNumber = 5;
    if (player.inventory[5] === undefined) {
      selectItem = player.inventory[0];
    } else {
      selectItem = player.inventory[5];
    }
  }
  if (keyCode === 54) {
    // 6
    selectItemNumber = 6;
    if (player.inventory[6] === undefined) {
      selectItem = player.inventory[0];
    } else {
      selectItem = player.inventory[6];
    }
  }
  if (keyCode === 55) {
    // 7
    selectItemNumber = 7;
    if (player.inventory[7] === undefined) {
      selectItem = player.inventory[0];
    } else {
      selectItem = player.inventory[7];
    }
  }
  if (keyCode === 56) {
    // 8
    selectItemNumber = 8;
    if (player.inventory[8] === undefined) {
      selectItem = player.inventory[0];
    } else {
      selectItem = player.inventory[8];
    }
  }
  if (keyCode === 57) {
    // 9
    selectItemNumber = 9;
    if (player.inventory[9] === undefined) {
      selectItem = player.inventory[0];
    } else {
      selectItem = player.inventory[9];
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
  //console.log(stopTextBubble);
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
  console.log(selectItem.itemName);
}
