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
  //0   `1`  `2`  `3`  `4`  `5`  `6`  `7`  `8`  `9` `10` `11` `12` `13` `14` `15` `16` `17` `18` `19` `20` `21` `22` `23` `24` `25` `26`
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [0]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [1]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, `St`, `S`, `S`, `S`, ` `, ` `, ` `, ` `, ` `], // [2]
  [` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, `S`, `S`, ` `, ` `, ` `], // [3]
  [` `, ` `, ` `, `S`, `S`, ` `, `S`, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, `S`, `S`, `HIK`, ` `, ` `, ` `, `S`, ` `, ` `], // [4]
  [` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, ` `, ` `, `S`, `S`, ` `, ` `, `S`, `S`, `S`, ` `, ` `], // [5]
  [` `, `S`, ` `, ` `, ` `, ` `, `S`, ` `, ` `, `S`, `S`, `S`, `S`, `S`, `S`, `Bh`, ` `, `S`, `S`, `S`, `S`, ` `, ` `, ` `, `St`, `S`, ` `], // [6]
  [` `, `S`, ` `, ` `, `S`, `S`, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `Bh`,` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `St`, `S`, ` `], // [7]
  [` `, ` `, `S`, ` `, `S`, `S`, `S`, `S`, ` `, ` `, `S`, `S`, ` `, ` `, ` `,` `, ` `, ` `, ` `, ` `, `Em`, ` `, ` `, ` `, `St`, `S`, ` `], // [8]
  [` `, `S`, ` `, `Bh`, `S`, `S`, `S`, `S`, ` `, ` `, `S`, `S`, `Bh`, ` `, ` `,` `, ` `, ` `, ` `, ` `, `St`, ` `, ` `, ` `, `S`, ` `, ` `], // [9]
  [` `, `S`, ` `, ` `, `DEP`, ` `, ` `, ` `, ` `, ` `, ` `, `Pl`, ` `, ` `, ` `,` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `], // [10]
  [` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `,` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `], // [11]
  [` `, ` `, `S`, ` `, `Bh`, ` `,`Bh`,`Bh`, ` `, ` `, ` `, ` `, ` `, ` `, ` `,` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `], // [12]
  [` `, ` `, ` `, `S`, `S`, ` `, `S`, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `,`Bh`, ` `, ` `, `St`, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `], // [13]
  [` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `,` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [14]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, `S`, ` `, ` `, ` `, ` `,` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [15]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `], // [16]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, `S`, `S`, ` `, ` `, ` `, ` `, `Bh`, `S`, ` `, ` `, ` `, ` `, ` `, ` `], // [17]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, `S`, `S`, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `], // [18]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`,`BOT`,` `, ` `, ` `, ` `, ` `,`PDL`, ` `, `S`, ` `, ` `, ` `, ` `, ` `], // [19]
  [` `, ` `, `S`, `S`, `S`, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `Bo`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `], // [20]
  [` `, `S`, ` `, ` `, ` `, ` `, `S`, `S`, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `], // [21]
  [` `, `S`, ` `, `S`, `S`, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [22]
  [` `, `S`, ` `, `S`, `S`, `IDL`, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, `S`, `S`, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [23]
  [` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [24]
  [` `, `S`, ` `, `S`, `S`, `S`, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [25]
  [` `, `S`, ` `, `S`, `S`, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [26]
  [` `, `S`, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [27]
  [` `, `S`, ` `, ` `, `S`, ` `, `Pe`, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [28]
  [` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [29]
  [` `, ` `, ` `, `S`, `S`, `S`, `S`, `S`, `S`, `S`, `S`, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [30]
  [` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `, ` `], // [31]
];
// these next three variables are not used by the grid, but are used for convenience sake in for loops to check the grid
let rows = 32;
let columns = 27;
let gridUnit;

let nextCol, nextRow, nextCell;

let SCENE_H = 1066.56;
let SCENE_W = 899.91;

// create player object with inventory array inside
let player = {
  // x: 496.66,
  // y: 433.33,
  x: 380.66,
  y: 340.33,
  // inventory array holds (item) objects with name, qty, and image name
  inventory: [{ itemName: "empty", itemImageName: "no image" }],
};

let currentPlayerIndex; // indexed grid cell where Player currently is
let playerPaused = false; // status whether player is paused or not, starts unpaused

// initializes selectItem to empty
let selectItem = { itemName: "empty", itemImageName: "no image" };
let selectItemNumber = 0; // to manage inventory using digit keys
let selectItemHeldOut = true; // status whether select item is held out or not, starts item "empty" hidden

let invItemToDisplay; // item that will be displayed, in each box from the inventory

let currentRelationToPlayer;

let stopTextBubble = true; // status whether text bubble is displayed or not, starts true so textbox is stopped

let adjacentNPC;
let playerAdjacentCells = [];
//let npcText = `How fantastic to meet you!`; // npc's first utterance
let npcText = undefined;

let npcPeachEvent = 0; // peach event npc state handler, starts at zero and increases with every gifted peach
let npcPeachEventOngoing = true; // this maintains the peach event npc state, starts true
let npcFriendEvent = 0; // friend event npc state handler
let npcFriendEventOngoing = false; // this maintains the friend event npc state, is turned true once peach event is completed

let currentDigitPressed = 0;

let imageBank = {};

// image names
let peachImage, peachTreeImage, sliceOPieImage;
let bushImage, stoneImage;
let cherryImage, coinImage, diamondImage, emeraldImage, fireworkImage;

let riverRocks = [`emerald`, `diamond`, `petRock`];

// let pieFallAreas = [
//   { row: 11, collumn: 1 },
//   { row: 12, collumn: 2 },
// ];

let state = "title"; // can be title, simulation

let triggerOnce = 0;

let data = undefined;

let depMate;

let peachItem;

let currentItemImage;

/**
preload peach, peach tree, sliceOPie png files
*/
function preload() {
  // image assets
  imageBank.peachImage = loadImage(`assets/images/peach.png`);
  imageBank.sliceOPieImage = loadImage(`assets/images/slice-of-pie.png`);
  imageBank.diamondImage = loadImage(`assets/images/diamond.png`);
  imageBank.emeraldImage = loadImage(`assets/images/emerald.png`);
  imageBank.cherryImage = loadImage(`assets/images/cherry.png`);
  imageBank.fireworkImage = loadImage(`assets/images/fireworks.png`);
  imageBank.coinImage = loadImage(`assets/images/coin.png`);
  imageBank.petRockImage = loadImage(`assets/images/petRock.png`);

  bushImage = loadImage(`assets/images/bush.png`);
  stoneImage = loadImage(`assets/images/boulder.png`);

  boatImage = loadImage(`assets/images/boat.png`);

  map = loadImage(`assets/images/mishmashmap.png`);

  data = loadJSON(`assets/data/game-objects.json`);
}

/**
setup is used to save the player's initial position in currentPlayerIndex and calculate the gridUnit
both variables are needed to permit the player to move around the grid
*/
function setup() {
  createCanvas(450, 380);
  // move throughout the gridMap, save the player's initial position in currentPlayerIndex
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (gridMap[r][c] === `Pl`) {
        // save player's current position in an object so an index can be appropriately called up and manipulated in the grid
        currentPlayerIndex = {
          playerRow: r,
          playerCollumn: c,
        };
        nextCol = currentPlayerIndex.playerCollum;
        nextRow = currentPlayerIndex.playerRow;
        // player.x = c * gridUnit;
        // player.y = r * gridUnit;
      }
    }
  }
  // calculate the size of the gridUnit by dividing canvas height by gridMap array length i.e., number of rows
  gridUnit = SCENE_H / gridMap.length;

  // CREATE npcs
  depMate = new NPC(data.npcs.depanneur);
  boatMate = new NPC(data.npcs.boater);
  hikeMate = new NPC(data.npcs.hiker);
  peddleMate = new NPC(data.npcs.peddler);
  idleMate = new NPC(data.npcs.idler);

  // CREATE items
  peachItem = new Item(data.items.peach);
  pieItem = new Item(data.items.sliceOPie);
  diamondItem = new Item(data.items.diamond);
  emeraldItem = new Item(data.items.emerald);
  petRockItem = new Item(data.items.petRock);

  // fireworkItem = new Item(data.items.)
  // coinItem = new Item(data.items.)

  // add labels?
//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < columns; c++) {
//   playerAdjacentCells = [
//     gridMap[r - 1][c - 1],
//     gridMap[r - 1][c],
//     gridMap[r - 1][c + 1],
//     gridMap[r][c - 1],
//     gridMap[r][c + 1],
//     gridMap[r + 1][c - 1],
//     gridMap[r + 1][c],
//     gridMap[r + 1][c + 1],
//   ];
// }}

}

/**
draw the background with a blue sky, green grass, and a peach tree
then display text (whenever textBox is not stopped),
display the grid (this displays everything that is on the grid, npcs, items, and the player),
and display inventory, which displays the ui boxes where item pngs appear when items are picked up off the grid
*/
function draw() {
  nextRow = currentPlayerIndex.playerRow;
  nextCol = currentPlayerIndex.playerCollum;

  cameraSetup();
  noStroke();
  // BACKGROUND //
  background(93, 149, 252);
  titleState();
  simulationState();
  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at
  //the absolute 0,0 (try to see what happens if you don't turn it off
}

function cameraSetup() {
  //a camera is created automatically at the beginning
  //.5 zoom is zooming out (50% of the normal size)
  if (mouseIsPressed) camera.zoom = 0.65;
  else camera.zoom = 1;
  //set the camera position to the player position
  camera.position.x = player.x;
  camera.position.y = player.y;
}

function titleState() {
  if (state === "title") {
    camera.off();
    playerPaused = true;
    push();
    fill(50, 10, 100);
    textAlign(CENTER);
    textSize(54);
    text("MISH MASH", 225, 150);
    textSize(20);
    text(
      `» use arrow keys to move
» use spacebar to talk or give item
» use digit keys to select item in inventory
`,
      225,
      200
    );
    fill("red");
    text("click to start!", 225, 300);
    pop();
  }
}

function simulationState() {
  if (state === "simulation") {
    // draw grass
    push();
    imageMode(CENTER);
    image(map, SCENE_W / 2, SCENE_H / 2, SCENE_W, SCENE_H);
    // fill(`green`);
    // rectMode(CENTER);
    // rect(SCENE_W / 2, 432, SCENE_W, SCENE_H / 1.5);
    pop();
    // display the tree!
    // push();
    // imageMode(CENTER);
    // image(peachTreeImage, 355, 270, 200, 200); // hard numbers
    // pop();
    // END OF BACKGROUND //

    displayGrid();
    displayText();
    displayInventory();

checkForAdjacentNPC();



  }
}

function displayText() {
  if (stopTextBubble === false) {
    // when text bubble is not stopped
    // white text bubble box
    push();
    fill(255);
    rectMode(CENTER);
    rect(player.x, player.y - 100, 320, 75);
    pop();
    //
    push();
    // npc name
    stroke(0);
    fill(`yellow`);
    textAlign(CENTER, CENTER);
    textSize(15);
    text("NPC", player.x - 115, player.y - 120);
    // npc text
    noStroke();
    fill(0);
    textSize(12);
    text(npcText, player.x, player.y - 100);
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

      //  /* Comment out if you want to see the grid //
      // push();
      // noFill();
      // stroke(0);
      // rect(x * gridUnit, y * gridUnit, gridUnit, gridUnit);
      // pop();

      let cell = gridMap[y][x]; // cell = index
      // check each cell for a key
      if (cell === `Pl`) {
        // Pl for Player
        drawCharacter(x, y, `chartreuse`);
        // display selected item over player's avatar's head
        //if (selectItemHeldOut === true) {
        if (selectItem.itemName === "empty") {
          // if item selected by player is the empty box
          //display nothing
        } else if (selectItem.name === "peach") {
          //console.log ("how did you come in here?");
          drawSmolItem(`peach`, x, y);
          //drawSmolPeach(x, y);
        } else if (selectItem.name === "pie") {
          drawSmolItem(`pie`, x, y);
          //drawSmolPie(x, y);
        } else if (selectItem.name === "emerald") {
          drawSmolItem(`emerald`, x, y);
          //drawSmolPie(x, y);
        } else if (selectItem.name === "diamond") {
          drawSmolItem(`diamond`, x, y);
          //drawSmolPie(x, y);
        } else if (selectItem.name === "petRock") {
          drawSmolItem(`petRock`, x, y);
          //drawSmolPie(x, y);
        }
      }
      //  }
      if (cell === `Pe`) {
        // Pe for Peach
        //console.log(peachItem);
        //console.log(`in peach cell ${peachItem} + ${peachItem.name}`);
        drawItem(peachItem.name, x, y);
        //drawPeach(x, y);
      }

      if (cell === `Pi`) {
        // Pi for Pie
        //drawPie(x, y);
        drawItem(pieItem.name, x, y);
      }

      if (cell === `Em`) {
        drawItem(emeraldItem.name, x, y);
      }

      if (cell === `Di`) {
        // Pi for Pie
        //drawPie(x, y);
        drawItem(diamondItem.name, x, y);
      }

      if (cell === `Pr`) {
        // Pi for Pie
        //drawPie(x, y);
        drawItem(petRockItem.name, x, y);
      }

      if (cell === `NPC`) {
        // NPC
        drawCharacter(x, y, `yellow`);
      }
      if (cell === `DEP`) {
        // dep npc
        drawCharacter(x, y, depMate.color);
      }
      if (cell === `HIK`) {
        // dep npc
        drawCharacter(x, y, hikeMate.color);
      }
      if (cell === `PDL`) {
        // dep npc
        drawCharacter(x, y, peddleMate.color);
      }
      if (cell === `BOT`) {
        // dep npc
        drawCharacter(x, y, boatMate.color);
      }
      if (cell === `IDL`) {
        // dep npc
        drawCharacter(x, y, idleMate.color);
      }

      if (cell === `S`) {
        // S for Solid
        playerBarrier();
      }

      if (cell === `Bh`) {
        //@@@
        // Pe for Peach
        image(bushImage, x * gridUnit, y * gridUnit, 34, 35);
        //  drawItem(bushImage, x, y);
        //drawPeach(x, y);
      }
      if (cell === `St`) {
        // Pe for Peach
        image(stoneImage, x * gridUnit, y * gridUnit, 34, 35);
        //  drawItem(stoneImage, x, y);
        //drawPeach(x, y);
      }

      if (cell === `Bo`){
        image(boatImage, x * gridUnit, y * gridUnit, 40, 35);

      }

    }
  }
}

function displayInventory() {
  camera.off();
  // displays UI 10 inventory boxes at the bottom of canvas
  // long rectangle at the bottom of canvas
  push();
  fill(220, 200, 100); // beige
  rectMode(CENTER);
  rect(225, 350, 400, 40);
  // digits, 0 is always empty
  fill(0);
  textAlign(LEFT);
  text(
    "0          1          2          3          4          5          6          7          8          9",
    55,
    341
  );
  // the 10 boxes
  noFill();
  stroke(0);
  /// turn to for loop
  rect(45, 350, 40, 40); // 0
  textAlign(CENTER);
  textSize(20);
  text(`X`, 45, 358);
  rect(85, 350, 40, 40); // 1
  rect(125, 350, 40, 40); // 2
  rect(165, 350, 40, 40); // 3
  rect(205, 350, 40, 40); // 4
  rect(245, 350, 40, 40); // 5
  rect(285, 350, 40, 40); // 6
  rect(325, 350, 40, 40); // 7
  rect(365, 350, 40, 40); // 8
  rect(405, 350, 40, 40); // 9
  pop();

  // go through the player's inventory array and display each item in the array in the corresponding UI inventory box
  for (let i = 0; i < player.inventory.length; i++) {
    if (i === 0) {
      // if user pressed 0, current digit pressed is 0
      if (currentDigitPressed === 0) {
        push();
        noFill();
        stroke(0);
        strokeWeight(3.5);
        rectMode(CENTER);
        rect(45 + i * 40, 350, 40, 40); // 0
        pop();
      }
      // in box 0
      //display nothing
    } else {
      // in box 1
      if (player.inventory[i].imageName === `peachImage`) {
        //console.log("PE?");
        invItemToDisplay = imageBank[peachItem.imageName]; // find itemImageName in the item object at index 1 in inventory
      } else if (player.inventory[i].imageName === `sliceOPieImage`) {
        invItemToDisplay = imageBank[pieItem.imageName]; // find itemImageName in the item object at index 1 in inventory
      } else if (player.inventory[i].imageName === `emeraldImage`) {
        invItemToDisplay = imageBank[emeraldItem.imageName];
      } else if (player.inventory[i].imageName === `diamondImage`) {
        invItemToDisplay = imageBank[diamondItem.imageName];
      } else if (player.inventory[i].imageName === `petRockImage`) {
        //console.log("???");
        invItemToDisplay = imageBank[petRockItem.imageName];
      }

      push();
      imageMode(CENTER);
      image(invItemToDisplay, 45 + i * 40, 350, 34, 35); // display image of item at index 1 in inventory
      pop();
      // BOX
      if (currentDigitPressed === i) {
        push();
        noFill();
        stroke(0);
        strokeWeight(3.5);
        rectMode(CENTER);
        rect(45 + i * 40, 350, 40, 40); // 1
        pop();
      }
    }
  }
}

function checkForAdjacentNPC(){
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
  if (gridMap[r][c] === `Pl`)
  playerAdjacentCells = [
    gridMap[r - 1][c - 1],
    gridMap[r - 1][c],
    gridMap[r - 1][c + 1],
    gridMap[r][c - 1],
    gridMap[r][c + 1],
    gridMap[r + 1][c - 1],
    gridMap[r + 1][c],
    gridMap[r + 1][c + 1],
  ];
}
}
}


function drawItem(itemName, x, y) {
  // draws item png at row x, collumn y
  //console.log(`in draw item ${itemName}`);
  if (itemName === `peach`) {
    //  console.log("in draw peach 1");

    currentItemImage = imageBank[peachItem.imageName];

    //    console.log(`draw peach 2 ${currentItemImage}`);
    //
  }
  if (itemName === `pie`) {
    currentItemImage = imageBank[pieItem.imageName];
  }
  if (itemName === `emerald`) {
    currentItemImage = imageBank[emeraldItem.imageName];
  }
  if (itemName === `diamond`) {
    currentItemImage = imageBank[diamondItem.imageName];
  }
  if (itemName === `petRock`) {
    currentItemImage = imageBank[petRockItem.imageName];
  }

  push();
  imageMode(LEFT);
  image(currentItemImage, x * gridUnit, y * gridUnit, 34, 35);
  pop();
}

function drawSmolItem(itemName, x, y) {
  // draws small item over player's head
  if (itemName === `peach`) {
    currentItemImage = imageBank[peachItem.imageName];
  }
  if (itemName === `pie`) {
    currentItemImage = imageBank[pieItem.imageName]; // ### wont show up??
  }
  if (itemName === `emerald`) {
    currentItemImage = imageBank[emeraldItem.imageName]; // ### wont show up??
  }
  if (itemName === `diamond`) {
    currentItemImage = imageBank[diamondItem.imageName]; // ### wont show up??
  }
  if (itemName === `petRock`) {
    currentItemImage = imageBank[petRockItem.imageName]; // ### wont show up??
  }
  push();
  imageMode(CENTER);
  image(currentItemImage, x * gridUnit + 17, y * gridUnit, 25, 26);
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
    // and use digits
    // pressing the digit keys to select an item in the inventory //
    if (keyCode === 48) {
      // 0
      currentDigitPressed = 0;
      // empty box, player can talk to npc without giving item
      selectItemNumber = 0;
      selectItem = player.inventory[0];
    }
    if (keyCode === 49) {
      // 1
      selectItemNumber = 1;
      if (player.inventory[1] === undefined) {
        // if there is nothing in array index 1
        // currentDigitPressed = 0;
        // selectItem = player.inventory[0]; // select the empty box
      } else {
        currentDigitPressed = 1;

        selectItem = player.inventory[1];
      }
    }
    if (keyCode === 50) {
      // 2
      selectItemNumber = 2;
      if (player.inventory[2] === undefined) {
        // if there is nothing in array index 2
        // currentDigitPressed = 0;
        // selectItem = player.inventory[0]; // select the empty box
      } else {
        currentDigitPressed = 2;

        selectItem = player.inventory[2];
      }
    }
    if (keyCode === 51) {
      // 3
      selectItemNumber = 3;
      if (player.inventory[3] === undefined) {
        // if there is nothing in array index 3
        // currentDigitPressed = 0;
        // selectItem = player.inventory[0]; // select the empty box
      } else {
        currentDigitPressed = 3;

        selectItem = player.inventory[3];
      }
    }
    if (keyCode === 52) {
      // 4
      selectItemNumber = 4;
      if (player.inventory[4] === undefined) {
        // if there is nothing in array index 4
        // currentDigitPressed = 0;
        // selectItem = player.inventory[0]; // select the empty box
      } else {
        currentDigitPressed = 4;

        selectItem = player.inventory[4];
      }
    }
    if (keyCode === 53) {
      // 5
      selectItemNumber = 5;
      if (player.inventory[5] === undefined) {
        // if there is nothing in array index 5
        // currentDigitPressed = 0;
        // selectItem = player.inventory[0]; // select the empty box
      } else {
        currentDigitPressed = 5;

        selectItem = player.inventory[5];
      }
    }
    if (keyCode === 54) {
      // 6
      selectItemNumber = 6;
      if (player.inventory[6] === undefined) {
        // if there is nothing in array index 6
        //currentDigitPressed = ;
        //selectItem = player.inventory[0]; // select the empty box
      } else {
        currentDigitPressed = 6;
        selectItem = player.inventory[6];
      }
    }
    if (keyCode === 55) {
      // 7
      selectItemNumber = 7;
      if (player.inventory[7] === undefined) {
        // if there is nothing in array index 7
        // currentDigitPressed = 0;
        // selectItem = player.inventory[0]; // select the empty box
      } else {
        currentDigitPressed = 7;

        selectItem = player.inventory[7];
      }
    }
    if (keyCode === 56) {
      // 8
      selectItemNumber = 8;
      if (player.inventory[8] === undefined) {
        // if there is nothing in array index 8
        // currentDigitPressed = 0;
        // selectItem = player.inventory[0]; // select the empty box
      } else {
        currentDigitPressed = 8;

        selectItem = player.inventory[8];
      }
    }
    if (keyCode === 57) {
      // 9
      selectItemNumber = 9;
      if (player.inventory[9] === undefined) {
        // if there is nothing in array index 9
        // currentDigitPressed = 0;
        // selectItem = player.inventory[0]; // select the empty box
      } else {
        currentDigitPressed = 9;

        selectItem = player.inventory[9];
      }
    }

    if (keyCode === LEFT_ARROW) {
      nextCol = currentPlayerIndex.playerCollumn - 1;
      //console.log(nextCell);
      nextCell = gridMap[nextRow][nextCol];
      //console.log(nextCell);
      // if there is a solid element
      if (
        nextCell === `S` ||
        nextCell === `DEP` ||
        nextCell === `BOT` ||
        nextCell === `HIK` ||
        nextCell === `PDL` ||
        nextCell === `IDL` ||
        nextCell === `Bh` ||
        nextCell === `St` ||
        nextCell === undefined
      ) {
        solidBlock();
      }
      // else move player, and pick up item if there is
      else if (
        nextCell === `Pe` ||
        nextCell === `Pi` ||
        nextCell === `Em` ||
        nextCell === `Di` ||
        nextCell === `Pr`
      ) {
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
          // do nothing
        } else {
          // ##### //
          //let currentItem = undefined
          //let currentItemName = undefined //## need to create ITEMS with class!
          // if there is a peach
          // ## manage all picked up items here! ## //
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn
          ] = ` `; // where the player used to be is now an empty space
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn - 1
          ] = `Pl`; // where the peach used to be, now is the player
          // change player.x for camera
          // move camera left!
          player.x = player.x - gridUnit;
          //console.log(player.x);
          // if there is still room in the inventory
          // pick up peach and add it to inventory
          pickItemUp();
        }
      } else {
        //console.log("hi");
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn - 1
        ] = `Pl`; // and the player will now be one cell left
        // move camera left!
        player.x = player.x - gridUnit;
      //   for (let r = 0; r < rows; r++) {
      //     for (let c = 0; c < columns; c++) {
      //   playerAdjacentCells = [
      //     gridMap[r - 1][c - 1],
      //     gridMap[r - 1][c],
      //     gridMap[r - 1][c + 1],
      //     gridMap[r][c - 1],
      //     gridMap[r][c + 1],
      //     gridMap[r + 1][c - 1],
      //     gridMap[r + 1][c],
      //     gridMap[r + 1][c + 1],
      //   ];
      // }}
      }
    }

    if (keyCode === RIGHT_ARROW) {
      nextRow = currentPlayerIndex.playerRow;
      nextCol = currentPlayerIndex.playerCollumn + 1;

      //console.log(nextCol);
      nextCell = gridMap[nextRow][nextCol];
      //  console.log(nextCell);
      // if there is a solid element
      if (
        nextCell === `S` ||
        nextCell === `DEP` ||
        nextCell === `BOT` ||
        nextCell === `HIK` ||
        nextCell === `PDL` ||
        nextCell === `IDL` ||
        nextCell === `Bh` ||
        nextCell === `St` ||
        nextCell === undefined
      ) {
        //  console.log("WHYYY");
        solidBlock();
      }
      // else move player, and pick up item if there is
      else if (
        nextCell === `Pe` ||
        nextCell === `Pi` ||
        nextCell === `Em` ||
        nextCell === `Di` ||
        nextCell === `Pr`
      ) {
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
          // do nothing
        } else {
          // if there is a peach
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn
          ] = ` `; // where the player used to be is now an empty space
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn + 1
          ] = `Pl`; // where the peach used to be, now is the player
          // move camera right!
          player.x = player.x + gridUnit;
          // if there is still room in the inventory
          // pick up peach and add it to inventory
          pickItemUp();
        }
      } else {
        //console.log("helloooooo");
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn + 1
        ] = `Pl`; // and the player will now be one cell left
        // move camera right!
        player.x = player.x + gridUnit;
      //   for (let r = 0; r < rows; r++) {
      //     for (let c = 0; c < columns; c++) {
      //   playerAdjacentCells = [
      //     gridMap[r - 1][c - 1],
      //     gridMap[r - 1][c],
      //     gridMap[r - 1][c + 1],
      //     gridMap[r][c - 1],
      //     gridMap[r][c + 1],
      //     gridMap[r + 1][c - 1],
      //     gridMap[r + 1][c],
      //     gridMap[r + 1][c + 1],
      //   ];
      // }}
      }
    }

    if (keyCode === UP_ARROW) {
      nextRow = currentPlayerIndex.playerRow;
      nextCol = currentPlayerIndex.playerCollumn;
      nextRow = currentPlayerIndex.playerRow - 1;
      nextCell = gridMap[nextRow][nextCol];

      // if there is a solid element
      if (
        nextCell === `S` ||
        nextCell === `DEP` ||
        nextCell === `BOT` ||
        nextCell === `HIK` ||
        nextCell === `PDL` ||
        nextCell === `IDL` ||
        nextCell === `Bh` ||
        nextCell === `St` ||
        nextCell === undefined
      ) {
        solidBlock();
      }
      // else move player, and pick up item if there is
      else if (
        nextCell === `Pe` ||
        nextCell === `Pi` ||
        nextCell === `Em` ||
        nextCell === `Di` ||
        nextCell === `Pr`
      ) {
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
          // do nothing
        } else {
          // if there is a peach
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn
          ] = ` `; // where the player used to be is now an empty space
          gridMap[currentPlayerIndex.playerRow - 1][
            currentPlayerIndex.playerCollumn
          ] = `Pl`; // where the peach used to be, now is the player
          // move camera up!
          player.y = player.y - gridUnit;
          // if there is still room in the inventory
          // pick up peach and add it to inventory
          pickItemUp();
        }
      } else {
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow - 1][
          currentPlayerIndex.playerCollumn
        ] = `Pl`; // and the player will now be one cell up
        // move camera up!
        player.y = player.y - gridUnit;
      //   for (let r = 0; r < rows; r++) {
      //     for (let c = 0; c < columns; c++) {
      //   playerAdjacentCells = [
      //     gridMap[r - 1][c - 1],
      //     gridMap[r - 1][c],
      //     gridMap[r - 1][c + 1],
      //     gridMap[r][c - 1],
      //     gridMap[r][c + 1],
      //     gridMap[r + 1][c - 1],
      //     gridMap[r + 1][c],
      //     gridMap[r + 1][c + 1],
      //   ];
      // }}
      }
    }

    if (keyCode === DOWN_ARROW) {
      nextRow = currentPlayerIndex.playerRow;
      nextCol = currentPlayerIndex.playerCollumn;
      nextRow = currentPlayerIndex.playerRow + 1;
      nextCell = gridMap[nextRow][nextCol];

      // if there is a solid element
      if (
        nextCell === `S` ||
        nextCell === `DEP` ||
        nextCell === `BOT` ||
        nextCell === `HIK` ||
        nextCell === `PDL` ||
        nextCell === `IDL` ||
        nextCell === `Bh` ||
        nextCell === `St` ||
        nextCell === undefined
      ) {
        solidBlock();
      }
      // else move player, and pick up item if there is
      else if (
        nextCell === `Pe` ||
        nextCell === `Pi` ||
        nextCell === `Em` ||
        nextCell === `Di` ||
        nextCell === `Pr`
      ) {
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
          // do nothing
        } else {
          // if there is a peach
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn
          ] = ` `; // where the player used to be is now an empty space
          gridMap[currentPlayerIndex.playerRow + 1][
            currentPlayerIndex.playerCollumn
          ] = `Pl`; // where the peach used to be, now is the player
          // move camera down!
          player.y = player.y + gridUnit;
          // if there is still room in the inventory
          // pick up peach and add it to inventory
          pickItemUp();
        }
      } else {
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow + 1][
          currentPlayerIndex.playerCollumn
        ] = `Pl`; // and the player will now be one cell left
        // move camera down!
        player.y = player.y + gridUnit;
      //   for (let r = 0; r < rows; r++) {
      //     for (let c = 0; c < columns; c++) {
      //   playerAdjacentCells = [
      //     gridMap[r - 1][c - 1],
      //     gridMap[r - 1][c],
      //     gridMap[r - 1][c + 1],
      //     gridMap[r][c - 1],
      //     gridMap[r][c + 1],
      //     gridMap[r + 1][c - 1],
      //     gridMap[r + 1][c],
      //     gridMap[r + 1][c + 1],
      //   ];
      // }}
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
  // press spacebar
  if (keyCode === 32) {
    // if player is adjacent to NPC, dialog box is toggled, and give any items held out
    // when space is pressed go through the gridMap
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (
          // for each cell adjacent to the NPC in which the player stands
          (gridMap[r][c] === `DEP` && gridMap[r - 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `DEP` && gridMap[r - 1][c] === `Pl`) ||
          (gridMap[r][c] === `DEP` && gridMap[r - 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `DEP` && gridMap[r][c - 1] === `Pl`) ||
          (gridMap[r][c] === `DEP` && gridMap[r][c + 1] === `Pl`) ||
          (gridMap[r][c] === `DEP` && gridMap[r + 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `DEP` && gridMap[r + 1][c] === `Pl`) ||
          (gridMap[r][c] === `DEP` && gridMap[r + 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `BOT` && gridMap[r - 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `BOT` && gridMap[r - 1][c] === `Pl`) ||
          (gridMap[r][c] === `BOT` && gridMap[r - 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `BOT` && gridMap[r][c - 1] === `Pl`) ||
          (gridMap[r][c] === `BOT` && gridMap[r][c + 1] === `Pl`) ||
          (gridMap[r][c] === `BOT` && gridMap[r + 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `BOT` && gridMap[r + 1][c] === `Pl`) ||
          (gridMap[r][c] === `BOT` && gridMap[r + 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `HIK` && gridMap[r - 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `HIK` && gridMap[r - 1][c] === `Pl`) ||
          (gridMap[r][c] === `HIK` && gridMap[r - 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `HIK` && gridMap[r][c - 1] === `Pl`) ||
          (gridMap[r][c] === `HIK` && gridMap[r][c + 1] === `Pl`) ||
          (gridMap[r][c] === `HIK` && gridMap[r + 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `HIK` && gridMap[r + 1][c] === `Pl`) ||
          (gridMap[r][c] === `HIK` && gridMap[r + 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `PDL` && gridMap[r - 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `PDL` && gridMap[r - 1][c] === `Pl`) ||
          (gridMap[r][c] === `PDL` && gridMap[r - 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `PDL` && gridMap[r][c - 1] === `Pl`) ||
          (gridMap[r][c] === `PDL` && gridMap[r][c + 1] === `Pl`) ||
          (gridMap[r][c] === `PDL` && gridMap[r + 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `PDL` && gridMap[r + 1][c] === `Pl`) ||
          (gridMap[r][c] === `PDL` && gridMap[r + 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `IDL` && gridMap[r - 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `IDL` && gridMap[r - 1][c] === `Pl`) ||
          (gridMap[r][c] === `IDL` && gridMap[r - 1][c + 1] === `Pl`) ||
          (gridMap[r][c] === `IDL` && gridMap[r][c - 1] === `Pl`) ||
          (gridMap[r][c] === `IDL` && gridMap[r][c + 1] === `Pl`) ||
          (gridMap[r][c] === `IDL` && gridMap[r + 1][c - 1] === `Pl`) ||
          (gridMap[r][c] === `IDL` && gridMap[r + 1][c] === `Pl`) ||
          (gridMap[r][c] === `IDL` && gridMap[r + 1][c + 1] === `Pl`)
        ) {
          //if (npcFriendEvent === 0) {

          for (let i = 0; i < 8; i++) {
            if (playerAdjacentCells[i] === `DEP`) {
              adjacentNPC = depMate;
              //dep mate gives gold coins for fruit edibles types
              // otherwise he receives items as gifts which improve rel2pl
              if (selectItem !== { itemName: "empty", itemImageName: "no image" }){
                // if player is holding out item
                let npcReceivingItemName = selectItem.itemName
                if (adjacentNPC.relationship2items.npcReceivingItemName === 0){
                  // no effect on rel2pl
                  // receiving item = true
                }
                else if (adjacentNPC.relationship2items.npcReceivingItemName === 1){
                    // +.2 on rel2pl
                    // receiving item = true
                  }
                  else if (adjacentNPC.relationship2items.npcReceivingItemName === -1){
                      // -.2 on rel2pl
                      //receiving item = true
                    }
              } else {
                // npc receives no gift, no effect on rel2pl
              }
              console.log("YESSSIRRRR");
              //check for given item
              //select a dialog
              // check relationship to player
              currentRelationToPlayer = adjacentNPC.relationship2player;
              if (currentRelationToPlayer === 0){
                // neutral dialog
                //is item being received? if yes display received item dialog, else just chitchat
                currentNPC = npcText = adjacentNPC.currentText; // use player coordinates
                if (stopTextBubble === true) {
                  // when space is pressed beside npc, text bubble is displayed
                  playerPaused = true; // player is paused
                  stopTextBubble = false; //  text bubble is not stopped anymore
                }
                else if (stopTextBubble === false) {
                  stopTextBubble = true;
                  playerPaused = false;
                }
              }
              if (currentRelationToPlayer === 1){
                // friendly dialog
                //is item being received? if yes display received item dialog, else just chitchat
                currentNPC = npcText = adjacentNPC.currentText; // use player coordinates
                if (stopTextBubble === true) {
                  // when space is pressed beside npc, text bubble is displayed
                  playerPaused = true; // player is paused
                  stopTextBubble = false; //  text bubble is not stopped anymore
                }
                else if (stopTextBubble === false) {
                  stopTextBubble = true;
                  playerPaused = false;
                }
              }
              if (currentRelationToPlayer === -1){
                // unhappy dialog
                //is item being received? if yes display received item dialog, else just chitchat
                currentNPC = npcText = adjacentNPC.currentText; // use player coordinates
                if (stopTextBubble === true) {
                  // when space is pressed beside npc, text bubble is displayed
                  playerPaused = true; // player is paused
                  stopTextBubble = false; //  text bubble is not stopped anymore
                }
                else if (stopTextBubble === false) {
                  stopTextBubble = true;
                  playerPaused = false;
                }
              }


            } else if (playerAdjacentCells[i] === `BOT`) {
              adjacentNPC = boatMate;
              //boat mate gives boat keys for 3 gold coins. boat key cannot be given.
              // otherwise he receives items as gifts which improve rel2pl

            } else if (playerAdjacentCells[i] === `HIK`) {
              adjacentNPC = hikeMate;
              //hiker receives items as gifts
            } else if (playerAdjacentCells[i] === `PDL`) {
              adjacentNPC = peddleMate;
              //pedler exchanges items for equal value item
              // does not receive gifts
            } else if (playerAdjacentCells[i] === `IDL`) {
              adjacentNPC = idleMate;
              //idle mate wants 5 peaches in exchange for pie, infinite
              // anything else is received as a gift
              currentNPC = npcText = depMate.currentText; // use player coordinates
              //}

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

                givenItem = selectItem.name;

                if (selectItem.name === "peach" && selectItemHeldOut === true) {
                  player.inventory.splice(selectItemNumber, 1); // remove selectItem from the array
                  selectItem = player.inventory[0]; // select item is reset to 0
                  currentDigitPressed = 0;
                  // npcPeachEvent //
                  if (npcPeachEventOngoing === true) {
                    // while npcPeachEvent is ongoing
                    npcPeachEvent++; // every time player gives npc a peach, event adds 1 to its status
                    npcText = "Thanks for that peach, can you bring me 5 total?";
                    if (npcPeachEvent === 5) {
                      // when npcPeachEvent reaches status 5
                      if (triggerOnce === 0) {
                        dropItem(`pie`);
                        //dropPie();
                        triggerOnce = 1;
                      }
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
                } else if (
                  (selectItem.name === "emerald" && selectItemHeldOut === true) ||
                  (selectItem.name === "diamond" && selectItemHeldOut === true) ||
                  (selectItem.name === "petRock" && selectItemHeldOut === true) ||
                  (selectItem.name === "pie" && selectItemHeldOut === true)
                ) {
                  player.inventory.splice(selectItemNumber, 1); // remove selectItem from the array
                  selectItem = player.inventory[0]; // select item is reset to 0
                  currentDigitPressed = 0;
                }
              } else if (stopTextBubble === false) {
                stopTextBubble = true;
                playerPaused = false;
              }

            }
          }


        }
      }
    }
  }
}

function solidBlock() {
  //console.log("yessir");
  if (
    nextCell === `S` ||
    nextCell === `DEP` ||
    nextCell === `Bh` ||
    nextCell === `St` ||
    nextCell === undefined
  ) {
    //console.log("nosir");
    // do nothing
  }
}

function pickItemUp() {
  if (nextCell === `Pe`) {
    itemPickup(`peach`); // ## generalize this with a variable ##
    // when a peach is picked up, another peach will be dropped in 1.5-3.5 seconds
    let treeDropTime = random(1500, 3500);
    setTimeout(dropItem.bind(this, `peach`), treeDropTime); //## CAREFUL move this back, when peach picked was dropped by map, yes redrop
    // but if peach is dropped by npc do not redrop ###
  }
  if (nextCell === `Pi`) {
    itemPickup(`sliceOPie`);
  }

  if (nextCell === `Di`) {
    //console.log("huh?")
    itemPickup(`diamond`);
    let rockDropTime = random(1000, 5000); // extend timing!! ##
    rockDropSelection = random(riverRocks);
    setTimeout(dropItem.bind(this, rockDropSelection), rockDropTime);
  }
  if (nextCell === `Pr`) {
    //console.log("huh?")
    itemPickup(`petRock`);
    let rockDropTime = random(1000, 5000); // extend timing!! ##
    rockDropSelection = random(riverRocks);
    setTimeout(dropItem.bind(this, rockDropSelection), rockDropTime);
  }

  if (nextCell === `Em`) {
    itemPickup(`emerald`);
    let rockDropTime = random(1000, 5000); // extend timing!! ##
    rockDropSelection = random(riverRocks);
    setTimeout(dropItem.bind(this, rockDropSelection), rockDropTime);
  }
}

function itemPickup(item) {
  if (item === `peach`) {
    player.inventory.push(peachItem);
  }
  if (item === `sliceOPie`) {
    player.inventory.push(pieItem);
  }
  if (item === `emerald`) {
    player.inventory.push(emeraldItem);
  }
  if (item === `diamond`) {
    //console.log(`hey...`)
    player.inventory.push(diamondItem);
  }
  if (item === `petRock`) {
    //console.log(`hey...`)
    player.inventory.push(petRockItem);
  }
}

function dropItem(item) {
  //
  if (item === `peach`) {
    //console.log("this is no pie");
    let fallenPeachIndex = random(peachItem.dropZone);
    if (gridMap[fallenPeachIndex.row][fallenPeachIndex.collumn] === `Pl`) {
      // if peach tries to fall in a cell where the player is standing, select another cell and try again
      fallenPeachIndex = random(peachItem.dropZone);
      dropItem(`peach`); //dropPeach();
    } else {
      // drop the peach
      gridMap[fallenPeachIndex.row][fallenPeachIndex.collumn] = `Pe`;
    }
  }
  if (item === `pie`) {
    //console.log("yes, this is a pie, not a peach");
    let fallenPieIndex = random(idleMate.itemDropZone);
    if (gridMap[fallenPieIndex.row][fallenPieIndex.collumn] === `Pl`) {
      // if peach tries to fall in a cell where the player is standing, select another cell and try again
      fallenPieIndex = random(idleMate.itemDropZone);
      dropItem(`pie`); //dropPie();
    } else {
      // drop the slice of pie
      gridMap[fallenPieIndex.row][fallenPieIndex.collumn] = `Pi`;
    }
  }
  if (item === `emerald` || item === `diamond` || item === `petRock`) {
    // HAVE ALL river stones here##
    //console.log("this is no pie");
    let currentRiverRock = item;
    let fallenEmeraldIndex = random(emeraldItem.dropZone);
    if (gridMap[fallenEmeraldIndex.row][fallenEmeraldIndex.collumn] === `Pl`) {
      // if peach tries to fall in a cell where the player is standing, select another cell and try again
      fallenEmeraldIndex = random(emeraldItem.dropZone);
      dropItem(currentRiverRock); //dropPeach(); ### HAVE random stones!
    } else {
      // drop the peach
      if (currentRiverRock === `emerald`) {
        gridMap[fallenEmeraldIndex.row][fallenEmeraldIndex.collumn] = `Em`;
      } else if (currentRiverRock === `diamond`) {
        gridMap[fallenEmeraldIndex.row][fallenEmeraldIndex.collumn] = `Di`;
      } else if (currentRiverRock === `petRock`) {
        gridMap[fallenEmeraldIndex.row][fallenEmeraldIndex.collumn] = `Pr`;
      }
    }
  }
}

// function dropPeach() {
//   // randomly select a place near the peach tree to drop a peach
// }

// function dropPie() {
//   // drop pie in 1 of 2 places, depending on where player is standing
// }

// mouse used for debugging
function mouseClicked() {
  console.log(adjacentNPC);
  console.log(currentRelationToPlayer);
  console.log(selectItem);
  //console.log(pieItem.name);
  //console.log(gridMap);
  //console.log(currentDigitPressed);
  //console.log(npcPeachEvent);
  //console.log(player.inventory);
  console.log(selectItem.name);
  //console.log(gridMap[nextRow][nextCol]);
  if (state === `title`) {
    state = "simulation";
    playerPaused = false;
  }
}
