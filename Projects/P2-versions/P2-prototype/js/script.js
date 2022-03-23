/**
Mish Mash
Frankie Latreille

This is the prototype for my CART 263 P2
An peach collecting simulation, where player can give NPC peaches, and the NPC becomes friendly.
The friendly NPC changes its dialog, (and gives player a piece of pie).
*/

("use strict");

// the playable area of the canvas is seperated in a 15 by 15 cell grid
// keys in these indexed cells represent an NPC, a Peach, the player, and solid barriers
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
  [``, `NPC`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `Pl`, ``], // [12]
  [(``, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `)], // [13]
  [`S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`], // [14]
];
// these next three variables are not used by the grid, but are used for convenience sake in for loops to check the grid
let rows = 15;
let columns = 15;
let gridUnit;

// create player object with inventory array inside
let player = {
  // inventory array holds (item) objects with name, qty, and image name
  inventory: [{ itemName: "empty", itemQty: 0, itemImageName: "no image" }],
};

let currentPlayerIndex; // indexed grid cell where Player currently is
let playerPaused = false; // status whether player is paused or not, starts unpaused

// initializes selectItem to empty
let selectItem = { itemName: "empty", itemQty: 0, itemImageName: "no image" };
let selectItemNumber = 0; // to manage inventory using digit keys
let selectItemHeldOut = false; // status whether select item is held out or not, starts item "empty" hidden

let invItemToDisplay; // item that will be displayed, in each box from the inventory
let stopTextBubble = true; // status whether text bubble is displayed or not, starts true so textbox is stopped

let npcText = `How fantastic to meet you!`; // npc's first utterance
let npcPeachEvent = 0; // peach event npc state handler, starts at zero and increases with every gifted peach
let npcPeachEventOngoing = true; // this maintains the peach event npc state, starts true
let npcFriendEvent = 0; // friend event npc state handler
let npcFriendEventOngoing = false; // this maintains the friend event npc state, is turned true once peach event is completed

// image names
let peachImage, peachTreeImage, sliceOPieImage;

// array of gridUnits where peaches can appear when one is picked up by player
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

/**
preload peach, peach tree, sliceOPie png files
*/
function preload() {
  // image assets
  peachImage = loadImage(`assets/images/peach.png`);
  peachTreeImage = loadImage(`assets/images/peachtree.png`);
  sliceOPieImage = loadImage(`assets/images/slice-of-pie.png`);
}

/**
setup is used to save the player's initial position in currentPlayerIndex and calculate the gridUnit
both variables are needed to permit the player to move around the grid
*/
function setup() {
  createCanvas(500, 500);
  // move throughout the gridMap, save the player's initial position in currentPlayerIndex
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (gridMap[r][c] === `Pl`) {
        // save player's current position in an object so an index can be appropriately called up and manipulated in the grid
        currentPlayerIndex = {
          playerRow: r,
          playerCollumn: c,
        };
      }
    }
  }
  // calculate the size of the gridUnit by dividing canvas height by gridMap array length i.e., number of rows
  gridUnit = height / gridMap.length;
}

/**
draw the background with a blue sky, green grass, and a peach tree
then display text (whenever textBox is not stopped),
display the grid (this displays everything that is on the grid, npcs, items, and the player),
and display inventory, which displays the ui boxes where item pngs appear when items are picked up off the grid
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
  displayGrid();
  displayInventory();
}

function displayText() {
  if (stopTextBubble === false) {
    // when text bubble is not stopped
    // white text bubble box
    push();
    fill(255);
    rectMode(CENTER);
    rect(250, 100, 320, 75);
    pop();
    //
    push();
    // npc name
    stroke(0);
    fill(`yellow`);
    textAlign(CENTER, CENTER);
    textSize(15);
    text("NPC", 120, 75);
    // npc text
    noStroke();
    fill(0);
    textSize(12);
    text(npcText, 250, 100);
    pop();
  } else if (stopTextBubble === true) {
    // do nothing
  }
}

function displayGrid() {
  // go through the girdMap
  for (let y = 0; y < gridMap.length; y++) {
    // rows
    for (let x = 0; x < gridMap[y].length; x++) {
      // collumns

      /* Comment out if you want to see the grid //
      push();
      noFill();
      stroke(0);
      rect(x * gridUnit, y * gridUnit, gridUnit, gridUnit);
      pop(); */

      let cell = gridMap[y][x]; // cell = index
      // check each cell for a key
      if (cell === `Pl`) {
        // Pl for Player
        drawCharacter(x, y, `lime`);
        if (selectItemHeldOut === true) {
          if (selectItem.itemName === "empty") {
            // if item selected by player is the empty box
            //display nothing
          } else {
            // ### if peach smolpeach, if pie smolpie  drawSmolItem
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
        drawCharacter(x, y, `yellow`);
      }
      if (cell === `S`) {
        // S for Solid
        playerBarrier();
      }
    }
  }
}

function displayInventory() {
  // displays UI 10 inventory boxes at the bottom of canvas
  // long rectangle at the bottom of canvas
  push();
  fill(220, 200, 100); // beige
  rectMode(CENTER);
  rect(250, 475, 400, 40);
  // digits, 0 is always empty
  fill(0);
  textAlign(LEFT);
  text(
    "0          1          2          3          4          5          6          7          8          9",
    80,
    465
  );
  // the 10 boxes
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

  // go through the player's inventory array and display each item in the array in the corresponding UI inventory box
  for (let i = 0; i < player.inventory.length; i++) {
    if (i === 0) {
      // in box 0
      //display nothing
    } else if (i === 1) {
      // in box 1
      invItemToDisplay = player.inventory[i].itemImageName; // find itemImageName in the item object at index 1 in inventory
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 110, 475, 34, 35); // display image of item at index 1 in inventory
      pop();
    } else if (i === 2) {
      // in box 2
      invItemToDisplay = player.inventory[i].itemImageName; // find itemImageName in the item object at index 2 in inventory
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 150, 475, 34, 35); // display image of item at index 2 in inventory
      pop();
    } else if (i === 3) {
      // in box 3
      invItemToDisplay = player.inventory[i].itemImageName; // find itemImageName in the item object at index 3 in inventory
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 190, 475, 34, 35); // display image of item at index 3 in inventory
      pop();
    } else if (i === 4) {
      // in box 4
      invItemToDisplay = player.inventory[i].itemImageName; // find itemImageName in the item object at index 4 in inventory
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 230, 475, 34, 35); // display image of item at index 4 in inventory
      pop();
    } else if (i === 5) {
      // in box 5
      invItemToDisplay = player.inventory[i].itemImageName; // find itemImageName in the item object at index 5 in inventory
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 270, 475, 34, 35); // display image of item at index 5 in inventory
      pop();
    } else if (i === 6) {
      // in box 6
      invItemToDisplay = player.inventory[i].itemImageName; // find itemImageName in the item object at index 6 in inventory
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 310, 475, 34, 35); // display image of item at index 6 in inventory
      pop();
    } else if (i === 7) {
      // in box 7
      invItemToDisplay = player.inventory[i].itemImageName; // find itemImageName in the item object at index 7 in inventory
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 350, 475, 34, 35); // display image of item at index 7 in inventory
      pop();
    } else if (i === 8) {
      // in box 8
      invItemToDisplay = player.inventory[i].itemImageName; // find itemImageName in the item object at index 8 in inventory
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 390, 475, 34, 35); // display image of item at index 8 in inventory
      pop();
    } else if (i === 9) {
      // in box 9
      invItemToDisplay = player.inventory[i].itemImageName; // find itemImageName in the item object at index 9 in inventory
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 430, 475, 34, 35); // display image of item at index 9 in inventory
      pop();
    }
  }
}

function drawPeach(x, y) {
  push();
  imageMode(LEFT);
  image(peachImage, x * gridUnit, y * gridUnit, 34, 35); // hard numbers
  pop();
  // display peach image
}

function drawSmolPeach(x, y) {
  push();
  imageMode(CENTER);
  image(peachImage, x * gridUnit + 15, y * gridUnit, 25, 26); // hard numbers
  pop();
  // display peach image
}

function drawCharacter(x, y, color) {
  push();
  noStroke();
  fill(color);
  ellipseMode(CORNER);
  ellipse(x * gridUnit, y * gridUnit, gridUnit);
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
      if (selectItemHeldOut === true) {
        selectItemHeldOut = false;
      } else if (selectItemHeldOut === false) {
        // do nothing
        selectItemHeldOut = true;
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
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
        } else {
          // pick up peach, add to inventory ###
          player.inventory.push({
            itemName: "peach",
            itemQty: 1,
            itemImageName: peachImage,
          });
        }
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
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
        } else {
          // pick up peach, add to inventory ###
          player.inventory.push({
            itemName: "peach",
            itemQty: 1,
            itemImageName: peachImage,
          });

          // pick up peach, add to inventory ###
        }
        let treeDropTime = random(1500, 3500);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
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
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
        } else {
          // pick up peach, add to inventory ###
          player.inventory.push({
            itemName: "peach",
            itemQty: 1,
            itemImageName: peachImage,
          });

          // pick up peach, add to inventory ###
        }
        let treeDropTime = random(1500, 3500);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
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
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
        } else {
          // pick up peach, add to inventory ###
          player.inventory.push({
            itemName: "peach",
            itemQty: 1,
            itemImageName: peachImage,
          });

          // pick up peach, add to inventory ###
        }
        let treeDropTime = random(1500, 3500);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
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

            if (npcFriendEvent === 1) {
              npcFriendEvent++;
              if (npcFriendEvent === 2) {
                npcText = "Hey, buddy! How's it going?";
              }
            }

            // npc verifies what player is giving
            if (selectItem.itemName === "peach" && selectItemHeldOut === true) {
              player.inventory.splice(selectItemNumber, 1);
              selectItem = player.inventory[0];
              if (npcPeachEventOngoing === true) {
                npcPeachEvent++;
                npcText = "Thanks for that peach, can you bring me 5 total?";
                if (npcPeachEvent === 5) {
                  npcText = "You are the bomb! I love you!";
                  npcPeachEventOngoing = false;
                }
              } else {
                npcText = "Another peach! You shouldn't have.";
                npcFriendEventOngoing = true;
              }
              if (npcFriendEventOngoing === true) {
                npcFriendEvent++;
                if (npcFriendEvent >= 3) {
                  npcText = "Thanks, I know you've got me covered";
                  return;
                }
              }
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
  console.log(npcPeachEvent);
  console.log(player.inventory);
  console.log(selectItem.itemName);
}
