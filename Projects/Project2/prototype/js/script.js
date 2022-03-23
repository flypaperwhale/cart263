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

let state = "title"; // can be title, simulation

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
  if (state === "title") {
    push();
    fill(50, 10, 100);
    textAlign(CENTER);
    textSize(54);
    text("MISH MASH", 250, 200);
    textSize(20);
    text(
      `» use arrow keys to move
» use spacebar to talk or give item
» use digit keys to select item in inventory
» use 'I' to hold selected item out to give`,
      250,
      250
    );
    fill("red");
    text("click to start!", 250, 360);
    pop();
  }

  if (state === "simulation") {
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
  rect(70, 475, 40, 40); // 0
  rect(110, 475, 40, 40); // 1
  rect(150, 475, 40, 40); // 2
  rect(190, 475, 40, 40); // 3
  rect(230, 475, 40, 40); // 4
  rect(270, 475, 40, 40); // 5
  rect(310, 475, 40, 40); // 6
  rect(350, 475, 40, 40); // 7
  rect(390, 475, 40, 40); // 8
  rect(430, 475, 40, 40); // 9
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
  // draws peach png at row x, collumn y
  push();
  imageMode(LEFT);
  image(peachImage, x * gridUnit, y * gridUnit, 34, 35);
  pop();
}

function drawSmolPeach(x, y) {
  // draws small peach over player's head
  push();
  imageMode(CENTER);
  image(peachImage, x * gridUnit + 15, y * gridUnit, 25, 26);
  pop();
}

function drawCharacter(x, y, color) {
  // draws circle character at row x, collumn y on the grid, with a specified color
  push();
  noStroke();
  fill(color);
  ellipseMode(CORNER);
  ellipse(x * gridUnit, y * gridUnit, gridUnit);
  pop();
}

function playerBarrier(x, y) {
  // block player from moving on
}

// keyPressed functions left, up, down, right, spacebar, enter, and 0,1,2,3,4,5,6,7,8,9
function keyPressed() {
  // manage pause
  if (playerPaused === true) {
    // when player is paused
    // do not move
    // do not enter inventory
  } else if (playerPaused === false) {
    // when player isn't paused
    // player can press 'I' to take out inventory item
    // and manage directions left, up, down, right
    if (keyCode === 73) {
      // when player presses 'I' //
      // display item over avatar
      if (selectItemHeldOut === true) {
        // if selectItem is held out when C is pressed
        selectItemHeldOut = false; // hide selectItem
      } else if (selectItemHeldOut === false) {
        // if selectItem is hidden when C is pressed
        selectItemHeldOut = true; // show selectItem over player's head
      }
    }
    if (keyCode === LEFT_ARROW) {
      if (
        // when player tries to move left, if there is a barrier, an npc, or an unknown
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
        // if there is an item, or an empty space different things happen
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn - 1
        ] === `Pe`
      ) {
        // if there is a peach
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player used to be is now an empty space
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn - 1
        ] = `Pl`; // where the peach used to be, now is the player
        if (player.inventory.length === 10) {
          // if the player inventory is already at length 10 when stepping over a peach
          alert("inventory is full, item not picked up");
        } else {
          // if there is still room in the inventory
          // pick up peach and add it to inventory
          player.inventory.push({
            itemName: "peach",
            itemQty: 1,
            itemImageName: peachImage,
          });
        }
        // when a peach is picked up, another peach will be dropped in 1.5-3.5 seconds
        let treeDropTime = random(1500, 3500);
        setTimeout(dropPeach, treeDropTime);
      } else {
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn - 1
        ] = `Pl`; // and the player will now be one cell left
      }
    }

    if (keyCode === RIGHT_ARROW) {
      if (
        // when player tries to move right, if there is a barrier, an npc, or an unknown
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
        // if there is an item, or an empty space different things happen
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn + 1
        ] === `Pe`
      ) {
        // if there is a peach
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player used to be is now an empty space
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn + 1
        ] = `Pl`; // where the peach used to be, now is the player
        if (player.inventory.length === 10) {
          // if the player inventory is already at length 10 when stepping over a peach
          alert("inventory is full, item not picked up");
        } else {
          // if there is still room in the inventory
          // pick up peach and add it to inventory
          player.inventory.push({
            itemName: "peach",
            itemQty: 1,
            itemImageName: peachImage,
          });
        }
        // when a peach is picked up, another peach will be dropped in 1.5-3.5 seconds
        let treeDropTime = random(1500, 3500);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
      } else {
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn + 1
        ] = `Pl`; // and the player will now be one cell left
      }
    }

    if (keyCode === UP_ARROW) {
      if (
        // when player tries to move up, if there is a barrier, an npc, or an unknown
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
        // if there is an item, or an empty space different things happen
        gridMap[currentPlayerIndex.playerRow - 1][
          currentPlayerIndex.playerCollumn
        ] === `Pe`
      ) {
        // if there is a peach
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player used to be is now an empty space
        gridMap[currentPlayerIndex.playerRow - 1][
          currentPlayerIndex.playerCollumn
        ] = `Pl`; // where the peach used to be, now is the player
        if (player.inventory.length === 10) {
          // if the player inventory is already at length 10 when stepping over a peach
          alert("inventory is full, item not picked up");
        } else {
          // if there is still room in the inventory
          // pick up peach and add it to inventory
          player.inventory.push({
            itemName: "peach",
            itemQty: 1,
            itemImageName: peachImage,
          });
        }
        // when a peach is picked up, another peach will be dropped in 1.5-3.5 seconds
        let treeDropTime = random(1500, 3500);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
      } else {
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow - 1][
          currentPlayerIndex.playerCollumn
        ] = `Pl`; // and the player will now be one cell left
      }
    }

    if (keyCode === DOWN_ARROW) {
      if (
        // when player tries to move down, if there is a barrier, an npc, or an unknown
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
        // if there is an item, or an empty space different things happen
        gridMap[currentPlayerIndex.playerRow + 1][
          currentPlayerIndex.playerCollumn
        ] === `Pe`
      ) {
        // if there is a peach
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player used to be is now an empty space
        gridMap[currentPlayerIndex.playerRow + 1][
          currentPlayerIndex.playerCollumn
        ] = `Pl`; // where the peach used to be, now is the player
        if (player.inventory.length === 10) {
          // if the player inventory is already at length 10 when stepping over a peach
          alert("inventory is full, item not picked up");
        } else {
          // if there is still room in the inventory
          // pick up peach and add it to inventory
          player.inventory.push({
            itemName: "peach",
            itemQty: 1,
            itemImageName: peachImage,
          });
        }
        // when a peach is picked up, another peach will be dropped in 1.5-3.5 seconds
        let treeDropTime = random(1500, 3500);
        console.log(dropPeach, treeDropTime);
        setTimeout(dropPeach, treeDropTime);
      } else {
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow + 1][
          currentPlayerIndex.playerCollumn
        ] = `Pl`; // and the player will now be one cell left
      }
    }
  }

  // press spacebar
  if (keyCode === 32) {
    // if player is adjacent to NPC, dialog box is toggled, and give any items held out
    // when space is pressed go through the gridMap
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (
          // for each cell adjacent to the NPC in which the player stands
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
          if (stopTextBubble === true) {
            // when space is pressed beside npc, text bubble is displayed
            playerPaused = true; // player is paused
            stopTextBubble = false; //  text bubble is not stopped anymore
            // npcFriendEvent gets launched after npcPeachEvent is completed
            if (npcFriendEvent === 1) {
              npcFriendEvent++;
              if (npcFriendEvent === 2) {
                npcText = "Hey, buddy! How's it going?"; // this dialog takes place during npcFriendEvent
                // when player presses space beside the npc
                // while the player is NOT holding out a peach to give
              }
            }
            // if player item is out, player gives npc item
            // npc verifies what player is giving
            if (selectItem.itemName === "peach" && selectItemHeldOut === true) {
              player.inventory.splice(selectItemNumber, 1); // remove selectItem from the array
              selectItem = player.inventory[0]; // select item is reset to 0
              // npcPeachEvent //
              if (npcPeachEventOngoing === true) {
                // while npcPeachEvent is ongoing
                npcPeachEvent++; // every time player gives npc a peach, event adds 1 to its status
                npcText = "Thanks for that peach, can you bring me 5 total?";
                if (npcPeachEvent === 5) {
                  // when npcPeachEvent reaches status 5
                  npcText = "You are the bomb! I love you!"; // npc now loves the player
                  npcPeachEventOngoing = false; // the npcPeachEvent is now over
                }
              } else {
                // no longer in the npcPeachEvent, when the player gives npc another peach
                npcText = "Another peach! You shouldn't have.";
                npcFriendEventOngoing = true; // the npcFriendEvent now begins
              }
              if (npcFriendEventOngoing === true) {
                // while npcFriendEvent is ongoing
                npcFriendEvent++; // every time plyer gives npc a peach, event adds 1 to its status
                if (npcFriendEvent >= 3) {
                  // when its status is 3 or more, you've reached final text
                  // status will keep going up, but text won't change here
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

  // pressing the digit keys to select an item in the inventory //
  if (keyCode === 48) {
    // 0
    // empty box, player can talk to npc without giving item
    selectItemNumber = 0;
    selectItem = player.inventory[0];
    push();
    noFill();
    stroke(0);
    strokeWeight(10);
    rect(70, 475, 40, 40); // 0
    pop();
  }
  if (keyCode === 49) {
    // 1
    selectItemNumber = 1;
    if (player.inventory[1] === undefined) {
      // if there is nothing in array index 1
      selectItem = player.inventory[0]; // select the empty box
    } else {
      selectItem = player.inventory[1];
      push();
      noFill();
      stroke(0);
      strokeWeight(4);
      rect(110, 475, 40, 40); // 1
      pop();
    }
  }
  if (keyCode === 50) {
    // 2
    selectItemNumber = 2;
    if (player.inventory[2] === undefined) {
      // if there is nothing in array index 2
      selectItem = player.inventory[0]; // select the empty box
    } else {
      selectItem = player.inventory[2];
      push();
      noFill();
      stroke(0);
      strokeWeight(4);
      rect(150, 475, 40, 40); // 2
      pop();
    }
  }
  if (keyCode === 51) {
    // 3
    selectItemNumber = 3;
    if (player.inventory[3] === undefined) {
      // if there is nothing in array index 3
      selectItem = player.inventory[0]; // select the empty box
    } else {
      selectItem = player.inventory[3];
      push();
      noFill();
      stroke(0);
      strokeWeight(4);
      rect(190, 475, 40, 40); // 3
      pop();
    }
  }
  if (keyCode === 52) {
    // 4
    selectItemNumber = 4;
    if (player.inventory[4] === undefined) {
      // if there is nothing in array index 4
      selectItem = player.inventory[0]; // select the empty box
    } else {
      selectItem = player.inventory[4];
      push();
      noFill();
      stroke(0);
      strokeWeight(4);
      rect(230, 475, 40, 40); // 4
      pop();
    }
  }
  if (keyCode === 53) {
    // 5
    selectItemNumber = 5;
    if (player.inventory[5] === undefined) {
      // if there is nothing in array index 5
      selectItem = player.inventory[0]; // select the empty box
    } else {
      selectItem = player.inventory[5];
      push();
      noFill();
      stroke(0);
      strokeWeight(4);
      rect(270, 475, 40, 40); // 5
      pop();
    }
  }
  if (keyCode === 54) {
    // 6
    selectItemNumber = 6;
    if (player.inventory[6] === undefined) {
      // if there is nothing in array index 6
      selectItem = player.inventory[0]; // select the empty box
    } else {
      selectItem = player.inventory[6];
      push();
      noFill();
      stroke(0);
      strokeWeight(4);
      rect(310, 475, 40, 40); // 6
      pop();
    }
  }
  if (keyCode === 55) {
    // 7
    selectItemNumber = 7;
    if (player.inventory[7] === undefined) {
      // if there is nothing in array index 7
      selectItem = player.inventory[0]; // select the empty box
    } else {
      selectItem = player.inventory[7];
      push();
      noFill();
      stroke(0);
      strokeWeight(4);
      rect(350, 475, 40, 40); // 7
      pop();
    }
  }
  if (keyCode === 56) {
    // 8
    selectItemNumber = 8;
    if (player.inventory[8] === undefined) {
      // if there is nothing in array index 8
      selectItem = player.inventory[0]; // select the empty box
    } else {
      selectItem = player.inventory[8];
      push();
      noFill();
      stroke(0);
      strokeWeight(4);
      rect(390, 475, 40, 40); // 8
      pop();
    }
  }
  if (keyCode === 57) {
    // 9
    selectItemNumber = 9;
    if (player.inventory[9] === undefined) {
      // if there is nothing in array index 9
      selectItem = player.inventory[0]; // select the empty box
    } else {
      selectItem = player.inventory[9];
      push();
      noFill();
      stroke(0);
      strokeWeight(4);
      rect(430, 475, 40, 40); // 9
      pop();
    }
  }

  // go through girdMap after everytime a key is pressed
  // to reassure which cell the player is in
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (gridMap[r][c] === `Pl`) {
        // save player's current position
        currentPlayerIndex = {
          playerRow: r,
          playerCollumn: c,
        };
      }
    }
  }
}

function dropPeach() {
  // randomly select a place near the peach tree to drop a peach
  let fallenPeachIndex = random(peachFallAreas);
  if (gridMap[fallenPeachIndex.row][fallenPeachIndex.collumn] === `Pl`) {
    // if peach tries to fall in a cell where the player is standing, select another cell and try again
    fallenPeachIndex = random(peachFallAreas);
    dropPeach();
  } else {
    // drop the peach
    gridMap[fallenPeachIndex.row][fallenPeachIndex.collumn] = `Pe`;
  }
}

// mouse used for debugging
function mouseClicked() {
  //console.log(gridMap);
  console.log(npcPeachEvent);
  console.log(player.inventory);
  console.log(selectItem.itemName);
  state = "simulation";
}
