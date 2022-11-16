/**
Chit Mash
Frankie Latreille

This game simulates a little island town with different characters the player can interact with
The player also has an array of items they can collect, exchange, and gift
When the player gifts items, the npc dialogs change, expressing neutrality, friendliness and dislike

The npcs offer different item exchanges: the player can gain access to a boat, and can also happen upon a unique piece of art.
*/

("use strict");

let data = undefined; // no data yet, will be the JSON file with npcs and items
// the playable area of the canvas is seperated in a 27 by 32 cell grid
// labels in these indexed cells represent NPCs, items, the player, and barriers (Solid `S` or semi-solid `Sh`)
let gridMap = [
  //0   `1`  `2`  `3`  `4`  `5`  `6`  `7`  `8`  `9` `10` `11` `12` `13` `14` `15` `16` `17` `18` `19` `20` `21` `22` `23` `24` `25` `26`
  [
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
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [0]
  [
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
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [1]
  [
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
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    `St`,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [2]
  [
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
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
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
  ], // [3]
  [
    ` `,
    ` `,
    ` `,
    `S`,
    `S`,
    ` `,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    ` `,
    `S`,
    `S`,
    `HIK`,
    ` `,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
  ], // [4]
  [
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    `S`,
    `S`,
    ` `,
    ` `,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
  ], // [5]
  [
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    `Bh`,
    ` `,
    `S`,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    `St`,
    `S`,
    ` `,
  ], // [6]
  [
    ` `,
    `S`,
    ` `,
    `Mu`,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Bh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `St`,
    `S`,
    ` `,
  ], // [7]
  [
    ` `,
    ` `,
    `S`,
    ` `,
    `S`,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `EmG`,
    ` `,
    ` `,
    ` `,
    `St`,
    `S`,
    ` `,
  ], // [8]
  [
    ` `,
    `S`,
    ` `,
    `Bh`,
    `S`,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    `S`,
    `S`,
    `Bh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `St`,
    ` `,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
  ], // [9]
  [
    ` `,
    `S`,
    ` `,
    ` `,
    `DEP`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Pl`,
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
    `S`,
    ` `,
    ` `,
    ` `,
  ], // [10]
  [
    ` `,
    `S`,
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
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [11]
  [
    `S`,
    `S`,
    `Sh`,
    ` `,
    `Bh`,
    ` `,
    `Bh`,
    `Bh`,
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
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [12]
  [
    ` `,
    `S`,
    ` `,
    `Sh`,
    `Sh`,
    ` `,
    `Sh`,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Bh`,
    ` `,
    ` `,
    `St`,
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [13]
  [
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    `Sh`,
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
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [14]
  [
    ` `,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
  ], // [15]
  [
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    `S`,
    `S`,
    ` `,
    ` `,
  ], // [16]
  [
    ` `,
    ` `,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    `Bh`,
    `Sh`,
    ` `,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
  ], // [17]
  [
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
  ], // [18]
  [
    ` `,
    `S`,
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
    `BoT`,
    `BOT`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `PDL`,
    ` `,
    `Sh`,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
  ], // [19]
  [
    ` `,
    `S`,
    `Sh`,
    `Sh`,
    `Sh`,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Bo`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
  ], // [20]
  [
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
  ], // [21]
  [
    ` `,
    `S`,
    ` `,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    ``,
    ` `,
  ], // [22]
  [
    ` `,
    `S`,
    ` `,
    `S`,
    `S`,
    `IDL`,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    `Sh`,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
  ], // [23]
  [
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
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
    ` `,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
  ], // [24]
  [
    ` `,
    `S`,
    ` `,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
  ], // [25]
  [
    ` `,
    `S`,
    ` `,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [26]
  [
    ` `,
    `S`,
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    ` `,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [27]
  [
    ` `,
    `S`,
    ` `,
    ` `,
    `S`,
    ` `,
    `PeG`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `Sh`,
    ` `,
    `S`,
    `S`,
    `S`,
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
  ], // [28]
  [
    ` `,
    ` `,
    `S`,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
    `S`,
    `S`,
    `S`,
    `S`,
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
    ` `,
  ], // [29]
  [
    ` `,
    ` `,
    ` `,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
    `S`,
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
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [30]
  [
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
    ` `,
    ` `,
    ` `,
    ` `,
    ` `,
  ], // [31]
];
// these next three variables are not used by the grid, but are used for convenience sake in for loops to check the grid
let rows = 32;
let columns = 27;
let gridUnit;

let nextCol, nextRow, nextCell; // used in player movement

// whole playing area
let SCENE_H = 1066.56;
let SCENE_W = 899.91;

// create player object with inventory array inside
let player = {
  x: 380.66,
  y: 340.33,
  // inventory array holds items, it is initialized with an empty slot and a cherry
  inventory: [
    { itemName: "empty", itemImageName: "no image" },
    {
      name: `cherry`,
      cellLabel: `Ch`,
      type: `edible fruit`,
      value: 2,
      imageName: `cherryImage`,
    },
  ],
};

let currentPlayerIndex; // indexed grid cell where Player currently is
let playerPaused = false; // status whether player is paused or not, starts unpaused

// initializes selectItem to empty
let currentDigitPressed = 0; // initialize the first digit pressed to 0 (for inventory)
let selectItem = { itemName: "empty", itemImageName: "no image" };
let selectItemNumber = 0; // to manage inventory using digit keys
let selectItemHeldOut = false; // status whether select item is held out or not, starts item "empty" hidden
let invItemToDisplay; // item that will be displayed, in each box from the inventory

let adjacentNPC; // npc standing next to player
let playerAdjacentCells = []; // array to check cells surrounding player

let npcText = undefined; // text to be displayed when player interacts with npcs
let stopTextBubble = true; // status whether text bubble is displayed or not, starts true so textbox is stopped

// peachEvent variable //
let npcPeachEvent = 0; // peach event npc state handler, starts at zero and increases with every given peach
// goldEvent variable //
let npcGoldcoinEvent = 0; // goldcoin event npc state handler, starts at zero and increases with every given goldcoin
// manages the peddler to give valsPainting only once as a unique item
let firstValue5GiveBack = true;

let itemNameList = [
  // all the items that can be given
  "peach",
  "emerald",
  "diamond",
  "cherry",
  "valsPainting",
  "petRock",
  "pie",
  "firework",
  "mushroom",
  "goldcoin",
  "fish",
];

// all the image names
// decoration
let bushImage, stoneImage, boatImage;
// items
let peachImage,
  pieImage,
  cherryImage,
  goldcoinImage,
  diamondImage,
  emeraldImage,
  fireworkImage,
  mushroomImage,
  valsPaintingImage,
  petRockImage,
  boatKeyImage,
  fishImage;
let imageBank = {}; // imageBank is an obect used to manage the item images
let currentItemImage;
// array to select a random river rock to be dropped
let riverRocks = [`emerald`, `diamond`, `petRock`];
let itemToDrop; // item that will be dropped

let state = "title"; // can be title or simulation

/**
preload images
item images in imageBank
set decoration Images
map image
NPC and item data
and background music
*/
function preload() {
  // image assets
  // items
  imageBank.peachImage = loadImage(`assets/images/peach.png`);
  imageBank.pieImage = loadImage(`assets/images/slice-of-pie.png`);
  imageBank.diamondImage = loadImage(`assets/images/diamond.png`);
  imageBank.emeraldImage = loadImage(`assets/images/emerald.png`);
  imageBank.cherryImage = loadImage(`assets/images/cherry.png`);
  imageBank.fireworkImage = loadImage(`assets/images/fireworks.png`);
  imageBank.goldcoinImage = loadImage(`assets/images/coin.png`);
  imageBank.petRockImage = loadImage(`assets/images/petRock.png`);
  imageBank.mushroomImage = loadImage(`assets/images/mushroom.png`);
  imageBank.valsPaintingImage = loadImage(`assets/images/valsPainting.png`);
  imageBank.cherryImage = loadImage(`assets/images/cherry.png`);
  imageBank.boatKeyImage = loadImage(`assets/images/boatKey.png`);
  imageBank.fishImage = loadImage(`assets/images/fish.png`);
  // decorations
  bushImage = loadImage(`assets/images/bush.png`);
  stoneImage = loadImage(`assets/images/boulder.png`);
  boatImage = loadImage(`assets/images/boat.png`);
  // the background/map
  map = loadImage(`assets/images/mishmashmap.png`);
  // the JSON file with npcs and items
  data = loadJSON(`assets/data/game-objects.json`);
  // background music
  bgmusic1 = loadSound("assets/sounds/Guitar-Gentle.mp3");
}

/**
setup is used to save the player's initial position in currentPlayerIndex and calculate the gridUnit
both variables are needed to permit the player to move around the grid
gridUnit is also used to display images in the grid cells correctly
This is also where NPC and item data is taken from the JSON file and passed through classes to be added to the script
*/
function setup() {
  createCanvas(450, 380);
  // check each cell in the grid
  for (let r = 0; r < rows; r++) {
    // go through each row
    for (let c = 0; c < columns; c++) {
      // in each row, go through each collumn
      if (gridMap[r][c] === `Pl`) {
        // save player's current position in an object so an index can be appropriately called up and manipulated in the grid
        // to be able to move throughout the gridMap, save the player's initial position in currentPlayerIndex
        currentPlayerIndex = {
          playerRow: r,
          playerCollumn: c,
        };
        // load current player index into nextRow and nextCollumn to be able to check what label player moves onto when arrows keys are pressed
        nextCol = currentPlayerIndex.playerCollum;
        nextRow = currentPlayerIndex.playerRow;
      }
    }
  }

  // calculate the size of the gridUnit by dividing scene height by gridMap array length i.e., number of rows
  gridUnit = SCENE_H / gridMap.length;

  // CREATE npcs using JSON NPC data
  depMate = new NPC(data.npcs.depanneur);
  boatMate = new NPC(data.npcs.boater);
  hikeMate = new NPC(data.npcs.hiker);
  peddleMate = new NPC(data.npcs.peddler);
  idleMate = new NPC(data.npcs.idler);
  // CREATE items using JSON items data
  peachItem = new Item(data.items.peach);
  pieItem = new Item(data.items.pie);
  diamondItem = new Item(data.items.diamond);
  emeraldItem = new Item(data.items.emerald);
  petRockItem = new Item(data.items.petRock);
  peachNPCItem = new Item(data.items.npcPeach);
  diamondNPCItem = new Item(data.items.npcDiamond);
  emeraldNPCItem = new Item(data.items.npcEmerald);
  petRockNPCItem = new Item(data.items.npcPetRock);
  cherryItem = new Item(data.items.cherry);
  mushroomItem = new Item(data.items.mushroom);
  fireworkItem = new Item(data.items.firework);
  goldcoinItem = new Item(data.items.goldcoin);
  valsPaintingItem = new Item(data.items.valsPainting);
  fishItem = new Item(data.items.fish);
  boatKeyItem = new Item(data.items.boatKey);
}

/**
draw the background with the same blue as the deep waters on map image
manage title state and simulation state
set up camera
**/

function draw() {
  cameraSetup();
  // BACKGROUND //
  noStroke();
  background(54, 99, 182);
  // states
  titleState();
  simulationState();
  // every frame, load current player index into nextRow and nextCollumn to be able to check what label player moves onto in the keypressed functions
  nextRow = currentPlayerIndex.playerRow;
  nextCol = currentPlayerIndex.playerCollum;
}

function cameraSetup() {
  //a camera is created automatically at the beginning
  //.5 zoom is zooming out (50% of the normal size)
  if (mouseIsPressed) camera.zoom = 0.65;
  else camera.zoom = 1;
  //set the camera position to the player position
  camera.x = player.x; // used to be camera.position.xyz
  camera.y = player.y;
}

function titleState() {
  // simulation begins on title state, directions are given, click to play
  if (state === "title") {
    camera.off(); // only UI at this point
    playerPaused = true; // cannot move player, which is invisible at this point
    push();
    fill(50, 10, 100);
    textAlign(CENTER);
    textSize(54);
    text("MISH CHAT", 225, 125);
    text("CHIT MASH", 225, 165);
    textSize(20);
    textAlign(LEFT);
    fill("lemonchiffon");
    text(
      `
» use arrow keys to move
» use spacebar to talk or give item
» use digit keys to select item in inventory
`,
      40,
      192
    );
    fill("salmon");
    textAlign(CENTER);
    text("click to start!", 225, 310);
    pop();
    // display item images to make it cute
    push();
    imageMode(CENTER);
    image(imageBank.peachImage, 50, 50, 25, 26);
    pop();
    push();
    imageMode(CENTER);
    image(imageBank.diamondImage, 150, 50, 25, 26);
    pop();
    push();
    imageMode(CENTER);
    image(imageBank.valsPaintingImage, 270, 50, 25, 26);
    pop();
    push();
    imageMode(CENTER);
    image(imageBank.cherryImage, 380, 50, 25, 26);
    pop();
  }
}

function simulationState() {
  /*
  display the grid (this displays everything that is on the grid, npcs, items, and the player),
  display text (whenever textBox is not stopped),
  and display inventory, which displays the ui boxes where item pngs appear when items are picked up off the grid
  */
  if (state === "simulation") {
    camera.on();
    //console.log(camera.on);
    //playBGMusic();
    // display the background/map
    push();
    imageMode(CENTER);
    image(map, SCENE_W / 2, SCENE_H / 2, SCENE_W, SCENE_H);
    pop();

    displayGrid();
    // display grid goes through the grid and detects cell labels, labels appear as item images, ellipses for NPCs,
    // this is also one place where barriers are implemented
    displayText();
    // text bubble is displayed when it isn't stopped. player is paused when text bubble is displayed
    displayInventory();
    // inventory is UI, it is always showing
    checkForAdjacentNPC();
    // this function verifies for an NPC next to the player to permit its specific interactions
  }
}

function playBGMusic() {
  // plays bg music
  push();
  bgmusic1.playMode(`untilDone`); // bg music mode loops forever
  bgmusic1.setVolume(0.2); // not too loud
  bgmusic1.rate(0.7); // not too quick
  bgmusic1.play(); // play bg music
  pop();
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
    fill(adjacentNPC.color); // display adjacent NPC's name in their color
    textAlign(CENTER, CENTER);
    textSize(15);
    text(adjacentNPC.name, player.x - 115, player.y - 120); // diplay NPCs name
    // npc text
    noStroke();
    fill(0);
    textSize(12);
    text(npcText, player.x, player.y - 100);
    pop();
  } else if (stopTextBubble === true) {
    // if the text bubble is stopped
    // do nothing
  }
}

function displayGrid() {
  // go through the gridMap
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
      // check each cell for a label
      if (cell === `Pl`) {
        // Pl for Player
        drawCharacter(x, y, `chartreuse`);
        // display selected item over player's avatar's head
        if (selectItem.itemName === "empty") {
          // if item selected by player is the empty box
          //display nothing
        } else if (selectItem.name === "peach") {
          drawSmolItem(`peach`, x, y);
        } else if (selectItem.name === "pie") {
          drawSmolItem(`pie`, x, y);
        } else if (selectItem.name === "emerald") {
          drawSmolItem(`emerald`, x, y);
        } else if (selectItem.name === "diamond") {
          drawSmolItem(`diamond`, x, y);
        } else if (selectItem.name === "petRock") {
          drawSmolItem(`petRock`, x, y);
        } else if (selectItem.name === "cherry") {
          drawSmolItem(`cherry`, x, y);
        } else if (selectItem.name === "mushroom") {
          drawSmolItem(`mushroom`, x, y);
        } else if (selectItem.name === "firework") {
          drawSmolItem(`firework`, x, y);
        } else if (selectItem.name === "valsPainting") {
          drawSmolItem(`valsPainting`, x, y);
        } else if (selectItem.name === "goldcoin") {
          drawSmolItem(`goldcoin`, x, y);
        } else if (selectItem.name === "boatKey") {
          drawSmolItem(`boatKey`, x, y);
        } else if (selectItem.name === "fish") {
          drawSmolItem(`fish`, x, y);
        }
      }
      // Item cell labels
      if (cell === `PeG` || cell === `PeN`) {
        // Pe for Peach, G from map drop, N for NPC drop (to avoid launching automatic map drop when item picked up from NPC drop)
        drawItem(peachItem.name, x, y);
      }
      if (cell === `Pi`) {
        // Pi for Pie
        drawItem(pieItem.name, x, y);
      }
      if (cell === `EmG` || cell === `EmN`) {
        // Em for Emerald, G from map drop, N for NPC drop (to avoid launching automatic map drop when item picked up from NPC drop)
        drawItem(emeraldItem.name, x, y);
      }
      if (cell === `DiG` || cell === `DiN`) {
        // Di for Diamond, G from map drop, N for NPC drop (to avoid launching automatic map drop when item picked up from NPC drop)
        drawItem(diamondItem.name, x, y);
      }
      if (cell === `PrG` || cell === `PrN`) {
        // Pr for petRock, G from map drop, N for NPC drop (to avoid launching automatic map drop when item picked up from NPC drop)
        drawItem(petRockItem.name, x, y);
      }
      if (cell === `Mu`) {
        // Mu for Mushroom
        drawItem(mushroomItem.name, x, y);
      }
      if (cell === `Ch`) {
        // Ch for Cherry
        drawItem(cherryItem.name, x, y);
      }
      if (cell === `Fw`) {
        // Fw for firework
        drawItem(fireworkItem.name, x, y);
      }
      if (cell === `Pa`) {
        // Pa for Painting
        drawItem(valsPaintingItem.name, x, y);
      }
      if (cell === `Gc`) {
        // Gc for goldcoin
        drawItem(goldcoinItem.name, x, y);
      }
      if (cell === `Bk`) {
        // Bk for boatKey
        drawItem(boatKeyItem.name, x, y);
      }
      if (cell === `Fs`) {
        // Fs for Fish
        drawItem(fishItem.name, x, y);
      }
      // NPC cell labels
      if (cell === `DEP`) {
        // dep npc
        drawCharacter(x, y, depMate.color);
      }
      if (cell === `HIK`) {
        // hiker npc
        drawCharacter(x, y, hikeMate.color);
      }
      if (cell === `PDL`) {
        // peddler npc
        drawCharacter(x, y, peddleMate.color);
      }
      if (cell === `BOT`) {
        // boater npc
        drawCharacter(x, y, boatMate.color);
      }
      if (cell === `IDL`) {
        // idler npc
        drawCharacter(x, y, idleMate.color);
      }
      // Barriers and set pieces
      if (cell === `S`) {
        // S for Solid (barrier)
        // draw nothing
      }

      if (cell === `Bh`) {
        // Bh for bush
        image(bushImage, x * gridUnit, y * gridUnit, 34, 35);
      }
      if (cell === `St`) {
        // St for boulder
        image(stoneImage, x * gridUnit, y * gridUnit, 34, 35);
      }
      if (cell === `Bo` || cell === `BoT`) {
        // Bo and BoT for boat (one can be stepped over when the player has the boatKey, the other remains solid)
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
      // in each inventory box, find the item and its image bank name to display its image
      if (player.inventory[i].imageName === `peachImage`) {
        invItemToDisplay = imageBank[peachItem.imageName];
      } else if (player.inventory[i].imageName === `pieImage`) {
        invItemToDisplay = imageBank[pieItem.imageName];
      } else if (player.inventory[i].imageName === `emeraldImage`) {
        invItemToDisplay = imageBank[emeraldItem.imageName];
      } else if (player.inventory[i].imageName === `diamondImage`) {
        invItemToDisplay = imageBank[diamondItem.imageName];
      } else if (player.inventory[i].imageName === `petRockImage`) {
        invItemToDisplay = imageBank[petRockItem.imageName];
      } else if (player.inventory[i].imageName === `cherryImage`) {
        invItemToDisplay = imageBank[cherryItem.imageName];
      } else if (player.inventory[i].imageName === `mushroomImage`) {
        invItemToDisplay = imageBank[mushroomItem.imageName];
      } else if (player.inventory[i].imageName === `fireworkImage`) {
        invItemToDisplay = imageBank[fireworkItem.imageName];
      } else if (player.inventory[i].imageName === `valsPaintingImage`) {
        invItemToDisplay = imageBank[valsPaintingItem.imageName];
      } else if (player.inventory[i].imageName === `goldcoinImage`) {
        invItemToDisplay = imageBank[goldcoinItem.imageName];
      } else if (player.inventory[i].imageName === `boatKeyImage`) {
        invItemToDisplay = imageBank[boatKeyItem.imageName];
      } else if (player.inventory[i].imageName === `fishImage`) {
        invItemToDisplay = imageBank[fishItem.imageName];
      }
      push();
      imageMode(CENTER);
      image(invItemToDisplay, 45 + i * 40, 350, 34, 35); // display image of item at index i in inventory
      pop();
      // bounded BOX, to show which item player is selecting
      if (currentDigitPressed === i) {
        push();
        noFill();
        stroke(0);
        strokeWeight(3.5);
        rectMode(CENTER);
        rect(45 + i * 40, 350, 40, 40);
        pop();
      }
    }
  }
}

function checkForAdjacentNPC() {
  // go through cells adjacent the player, and look for NPC cell label
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
  if (itemName === `peach`) {
    currentItemImage = imageBank[peachItem.imageName];
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
  if (itemName === `mushroom`) {
    currentItemImage = imageBank[mushroomItem.imageName];
  }
  if (itemName === `firework`) {
    currentItemImage = imageBank[fireworkItem.imageName];
  }
  if (itemName === `valsPainting`) {
    currentItemImage = imageBank[valsPaintingItem.imageName];
  }
  if (itemName === `goldcoin`) {
    currentItemImage = imageBank[goldcoinItem.imageName];
  }
  if (itemName === `cherry`) {
    currentItemImage = imageBank[cherryItem.imageName];
  }
  if (itemName === `boatKey`) {
    currentItemImage = imageBank[boatKeyItem.imageName];
  }
  if (itemName === `fish`) {
    currentItemImage = imageBank[fishItem.imageName];
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
  if (itemName === `cherry`) {
    currentItemImage = imageBank[cherryItem.imageName];
  }
  if (itemName === `mushroom`) {
    currentItemImage = imageBank[mushroomItem.imageName];
  }
  if (itemName === `firework`) {
    currentItemImage = imageBank[fireworkItem.imageName];
  }
  if (itemName === `valsPainting`) {
    currentItemImage = imageBank[valsPaintingItem.imageName];
  }
  if (itemName === `goldcoin`) {
    currentItemImage = imageBank[goldcoinItem.imageName];
  }
  if (itemName === `boatKey`) {
    currentItemImage = imageBank[boatKeyItem.imageName];
  }
  if (itemName === `fish`) {
    currentItemImage = imageBank[fishItem.imageName];
  }
  push();
  imageMode(CENTER);
  image(currentItemImage, x * gridUnit + 17, y * gridUnit, 25, 26);
  pop();
}

function drawCharacter(x, y, color) {
  // draws circle character (NPC or player) at row x, collumn y on the grid, with a specified color
  push();
  noStroke();
  fill(color);
  ellipseMode(CORNER);
  ellipse(x * gridUnit, y * gridUnit, gridUnit);
  pop();
}

// keyPressed functions left, up, down, right, spacebar, and 0,1,2,3,4,5,6,7,8,9
function keyPressed() {
  // manage pause
  if (playerPaused === true) {
    // when player is paused
    // do not move
    // do not enter inventory
  } else if (playerPaused === false) {
    // when player isn't paused
    // manage directions left, up, down, right, checking cell labels where player moves
    // and use digits to select an item in the inventory
    if (keyCode === 48) {
      // 0
      currentDigitPressed = 0;
      // empty box, player can talk to npc without giving item
      selectItemNumber = 0;
      selectItem = player.inventory[0];
      selectItemHeldOut = false;
    }
    if (keyCode === 49) {
      // 1
      selectItemNumber = 1;
      if (player.inventory[1] === undefined) {
      } else {
        currentDigitPressed = 1;
        selectItem = player.inventory[1];
        selectItemHeldOut = true;
      }
    }
    if (keyCode === 50) {
      // 2
      selectItemNumber = 2;
      if (player.inventory[2] === undefined) {
      } else {
        currentDigitPressed = 2;
        selectItem = player.inventory[2];
        selectItemHeldOut = true;
      }
    }
    if (keyCode === 51) {
      // 3
      selectItemNumber = 3;
      if (player.inventory[3] === undefined) {
      } else {
        currentDigitPressed = 3;
        selectItem = player.inventory[3];
        selectItemHeldOut = true;
      }
    }
    if (keyCode === 52) {
      // 4
      selectItemNumber = 4;
      if (player.inventory[4] === undefined) {
      } else {
        currentDigitPressed = 4;
        selectItem = player.inventory[4];
        selectItemHeldOut = true;
      }
    }
    if (keyCode === 53) {
      // 5
      selectItemNumber = 5;
      if (player.inventory[5] === undefined) {
      } else {
        currentDigitPressed = 5;
        selectItem = player.inventory[5];
        selectItemHeldOut = true;
      }
    }
    if (keyCode === 54) {
      // 6
      selectItemNumber = 6;
      if (player.inventory[6] === undefined) {
      } else {
        currentDigitPressed = 6;
        selectItem = player.inventory[6];
        selectItemHeldOut = true;
      }
    }
    if (keyCode === 55) {
      // 7
      selectItemNumber = 7;
      if (player.inventory[7] === undefined) {
      } else {
        currentDigitPressed = 7;
        selectItem = player.inventory[7];
        selectItemHeldOut = true;
      }
    }
    if (keyCode === 56) {
      // 8
      selectItemNumber = 8;
      if (player.inventory[8] === undefined) {
      } else {
        currentDigitPressed = 8;
        selectItem = player.inventory[8];
        selectItemHeldOut = true;
      }
    }
    if (keyCode === 57) {
      // 9
      selectItemNumber = 9;
      if (player.inventory[9] === undefined) {
      } else {
        currentDigitPressed = 9;
        selectItem = player.inventory[9];
        selectItemHeldOut = true;
      }
    }

    if (keyCode === LEFT_ARROW) {
      // check next cell being on collumn to the left
      nextCol = currentPlayerIndex.playerCollumn - 1;
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
        nextCell === `Sh` ||
        nextCell === `BoT` ||
        nextCell === undefined
      ) {
        solidBlock();
      }
      // else move player, and pick up item if there is
      else if (
        nextCell === `PeG` ||
        nextCell === `Pi` ||
        nextCell === `EmG` ||
        nextCell === `DiG` ||
        nextCell === `PeN` ||
        nextCell === `EmN` ||
        nextCell === `DiN` ||
        nextCell === `PrN` ||
        nextCell === `PrG` ||
        nextCell === `Mu` ||
        nextCell === `Fw` ||
        nextCell === `Pa` ||
        nextCell === `Gc` ||
        nextCell === `Ch` ||
        nextCell === `Bk` ||
        nextCell === `Fs`
      ) {
        if (player.inventory.length === 10) {
          // if player has 9 items and tries to pick up another...
          alert("inventory is full, item not picked up");
          // do nothing
        } else {
          // ## manage all picked up items here! ## //
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn
          ] = ` `; // where the player used to be is now an empty space
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn - 1
          ] = `Pl`; // where the item used to be, now is the player
          // change player.x for the camera
          // move camera left!
          player.x = player.x - gridUnit;
          // if there is still room in the inventory
          // pick up item and add it to inventory
          pickItemUp();
        }
      } else if (nextCell === `Bo`) {
        // if player wants to step on the boat
        for (i = 0; i < player.inventory.length; i++) {
          // verify if player has the boatKey
          if (player.inventory[i].name === "boatKey") {
            // if they do
            shallowPass(); // turn "Sh" barrier cells into " "
            gridMap[currentPlayerIndex.playerRow][
              currentPlayerIndex.playerCollumn
            ] = ` `; // where the player was will now be empty
            gridMap[currentPlayerIndex.playerRow][
              currentPlayerIndex.playerCollumn - 1
            ] = `Pl`; // and the player will now be one cell left
            // change player.x for the camera
            // move camera left!
            player.x = player.x - gridUnit;
          } else {
            //if the player does not have the boat key, Boat is a barrier
            solidBlock();
          }
        }
      } else {
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn - 1
        ] = `Pl`; // and the player will now be one cell left
        // change player.x for the camera
        // move camera left!
        player.x = player.x - gridUnit;
      }
    }

    if (keyCode === RIGHT_ARROW) {
      // check next cell being on collumn to the right
      nextCol = currentPlayerIndex.playerCollumn + 1;
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
        nextCell === `Sh` ||
        nextCell === `BoT` ||
        nextCell === undefined
      ) {
        solidBlock();
      }
      // else move player, and pick up item if there is
      else if (
        nextCell === `PeG` ||
        nextCell === `Pi` ||
        nextCell === `EmG` ||
        nextCell === `DiG` ||
        nextCell === `PeN` ||
        nextCell === `EmN` ||
        nextCell === `DiN` ||
        nextCell === `PrN` ||
        nextCell === `PrG` ||
        nextCell === `Mu` ||
        nextCell === `Fw` ||
        nextCell === `Pa` ||
        nextCell === `Gc` ||
        nextCell === `Ch` ||
        nextCell === `Bk` ||
        nextCell === `Fs`
      ) {
        if (player.inventory.length === 10) {
          // if player has 9 items and tries to pick up another...
          alert("inventory is full, item not picked up");
          // do nothing
        } else {
          // ## manage all picked up items here! ## //
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn
          ] = ` `; // where the player used to be is now an empty space
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn + 1
          ] = `Pl`; // where the item used to be, now is the player
          // change player.x for the camera
          // move camera right!
          player.x = player.x + gridUnit;
          // if there is still room in the inventory
          // pick up peach and add it to inventory
          pickItemUp();
        }
      } else {
        // and if the player steps into an empty cell
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn
        ] = ` `; // where the player was will now be empty
        gridMap[currentPlayerIndex.playerRow][
          currentPlayerIndex.playerCollumn + 1
        ] = `Pl`; // and the player will now be one cell right
        // change player.x for the camera
        // move camera right!
        player.x = player.x + gridUnit;
      }
    }

    if (keyCode === UP_ARROW) {
      // check next cell being one row up
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
        nextCell === `Sh` ||
        nextCell === `BoT` ||
        nextCell === undefined
      ) {
        solidBlock();
      }
      // else move player, and pick up item if there is
      else if (
        nextCell === `PeG` ||
        nextCell === `Pi` ||
        nextCell === `EmG` ||
        nextCell === `DiG` ||
        nextCell === `PeN` ||
        nextCell === `EmN` ||
        nextCell === `DiN` ||
        nextCell === `PrN` ||
        nextCell === `PrG` ||
        nextCell === `Mu` ||
        nextCell === `Fw` ||
        nextCell === `Pa` ||
        nextCell === `Gc` ||
        nextCell === `Ch` ||
        nextCell === `Bk` ||
        nextCell === `Fs`
      ) {
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
          // do nothing
        } else {
          // ## manage all picked up items here! ## //
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn
          ] = ` `; // where the player used to be is now an empty space
          gridMap[currentPlayerIndex.playerRow - 1][
            currentPlayerIndex.playerCollumn
          ] = `Pl`; // where the item used to be, now is the player
          // change player.x for the camera
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
        // change player.x for the camera
        // move camera up!
        player.y = player.y - gridUnit;
      }
    }

    if (keyCode === DOWN_ARROW) {
      // check next cell being one row down

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
        nextCell === `Sh` ||
        nextCell === `BoT` ||
        nextCell === undefined
      ) {
        solidBlock();
      }
      // else move player, and pick up item if there is
      else if (
        nextCell === `PeG` ||
        nextCell === `Pi` ||
        nextCell === `EmG` ||
        nextCell === `DiG` ||
        nextCell === `PeN` ||
        nextCell === `EmN` ||
        nextCell === `DiN` ||
        nextCell === `PrN` ||
        nextCell === `PrG` ||
        nextCell === `Mu` ||
        nextCell === `Fw` ||
        nextCell === `Pa` ||
        nextCell === `Gc` ||
        nextCell === `Ch` ||
        nextCell === `Bk` ||
        nextCell === `Fs`
      ) {
        if (player.inventory.length === 10) {
          alert("inventory is full, item not picked up");
          // do nothing
        } else {
          // ## manage all picked up items here! ## //
          gridMap[currentPlayerIndex.playerRow][
            currentPlayerIndex.playerCollumn
          ] = ` `; // where the player used to be is now an empty space
          gridMap[currentPlayerIndex.playerRow + 1][
            currentPlayerIndex.playerCollumn
          ] = `Pl`; // where the item used to be, now is the player
          // change player.x for the camera
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
        ] = `Pl`; // and the player will now be one cell down
        // change player.x for the camera

        // move camera down!
        player.y = player.y + gridUnit;
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
          if (playerPaused === true) {
            // if player is paused (in the middle of an interaction)
            stopTextBubble = true; // bubble off
            playerPaused = false; // un-pause
          } else {
            // if player is not in the middle of interaction, start one
            for (let i = 0; i < 8; i++) {
              // go through cells around player
              if (playerAdjacentCells[i] === `DEP`) {
                // if DEP is adjacent to player
                adjacentNPC = depMate;
                //dep mate gives gold coins for fruit edibles types
                // otherwise he receives items as gifts which improve rel2pl

                // FIRST UTTERANCE
                if (adjacentNPC.firstTalk === "true") {
                  // if this is the first time talking to npc
                  npcText = adjacentNPC.initialDialog; // display npc initial dialog
                  adjacentNPC.firstTalk = "false"; // then turn off first talk to initiate neutral dialog
                  playerPaused = true; // player is paused
                  stopTextBubble = false; //  text bubble is not stopped anymore
                  return;
                }

                npcDialog(); // normal dialog is generic, called upon unless NPC is receiving an item

                // NPC events
                if (selectItemHeldOut === true) {
                  //dep mate gives gold coins for fruit edibles types
                  // otherwise he receives items as gifts which improve rel2pl
                  if (
                    selectItem !==
                    { itemName: "empty", itemImageName: "no image" }
                  ) {
                    // if player is holding out item
                    // go through item name list
                    for (let i = 0; i < itemNameList.length; i++) {
                      if (itemNameList[i] === selectItem.name) {
                        console.log(`you've given a ${selectItem.name}`);
                        //determine how much relationship manipulated
                        receivedItem = selectItem.name;
                        removeItemFromInv(); // splice item from inventory

                        if (
                          // if DEP receives 'produce'
                          receivedItem === `peach` ||
                          receivedItem === `cherry` ||
                          receivedItem === `mushroom` ||
                          receivedItem === `fish`
                        ) {
                          //dropItem goldcoin
                          npcText = `Thanks for the produce! Here's a goldcoin!`;
                          dropItem(goldcoinItem, depMate.itemDropZone);
                          playerPaused = true; // player is paused
                          stopTextBubble = false; //  text bubble is not stopped anymore
                          return;
                        } else if (receivedItem === `goldcoin`) {
                          // if DEP receives goldcoin
                          let depMateItems = [
                            // select random item to drop
                            peachNPCItem,
                            cherryItem,
                            fireworkItem,
                          ];
                          depMateItemToDrop = random(depMateItems);
                          npcText = `Here's a ${depMateItemToDrop.name}`; // npc text stating item dropped
                          dropItem(depMateItemToDrop, depMate.itemDropZone);
                          playerPaused = true; // player is paused
                          stopTextBubble = false; //  text bubble is not stopped anymore
                          return;
                        } else {
                          if (depMate.relationship2items[receivedItem] === -1) {
                            // if npc receives any other item, it is counted as a gift
                            npcText = `A ${receivedItem}. no thanks.`; // npc text stating received item
                            let relationshipManipulator = // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                              // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                              adjacentNPC.relationship2items[receivedItem];
                            adjacentNPC.relationship2player =
                              adjacentNPC.relationship2player +
                              relationshipManipulator;
                            console.log(adjacentNPC.relationship2player);
                            removeItemFromInv(); // splice given item from inventory
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (depMate.relationship2items[receivedItem] === 0) {
                            // if npc receives any other item, it is counted as a gift
                            npcText = `Thanks for the ${receivedItem}`; // npc text stating received item
                            let relationshipManipulator = // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                              // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                              adjacentNPC.relationship2items[receivedItem];
                            adjacentNPC.relationship2player =
                              adjacentNPC.relationship2player +
                              relationshipManipulator;
                            console.log(adjacentNPC.relationship2player);
                            removeItemFromInv(); // splice given item from inventory
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (depMate.relationship2items[receivedItem] === 1) {
                            // if npc receives any other item, it is counted as a gift
                            npcText = `I love a ${receivedItem}!`; // npc text stating received item
                            let relationshipManipulator = // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                              // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                              adjacentNPC.relationship2items[receivedItem];
                            adjacentNPC.relationship2player =
                              adjacentNPC.relationship2player +
                              relationshipManipulator;
                            console.log(adjacentNPC.relationship2player);
                            removeItemFromInv(); // splice given item from inventory
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                        }
                      }
                    }
                  }
                }
              }
              // END DEP
              else if (playerAdjacentCells[i] === `BOT`) {
                adjacentNPC = boatMate;
                //boat mate gives boat keys for 3 gold coins. boat key cannot be given.
                // otherwise he receives items as gifts which improve rel2pl

                //FIRST UTTERANCE
                if (adjacentNPC.firstTalk === "true") {
                  // if this is the first time talking to npc
                  npcText = adjacentNPC.initialDialog; // display npc initial dialog
                  adjacentNPC.firstTalk = "false"; // then turn off first talk to initiate neutral dialog
                  playerPaused = true; // player is paused
                  stopTextBubble = false; //  text bubble is not stopped anymore
                  return;
                }

                npcDialog(); // normal dialog is generic, called upon unless NPC is receiving an item

                // NPC events
                if (selectItemHeldOut === true) {
                  //dep mate gives gold coins for fruit edibles types
                  // otherwise he receives items as gifts which improve rel2pl
                  if (
                    selectItem !==
                      { itemName: "empty", itemImageName: "no image" } ||
                    selectItem !== boatKeyItem
                  ) {
                    // if player is holding out item
                    // go through item name list
                    for (let i = 0; i < itemNameList.length; i++) {
                      if (itemNameList[i] === selectItem.name) {
                        console.log(`you've given a ${selectItem.name}`);
                        //determine how much relationship manipulated
                        receivedItem = selectItem.name;

                        if (receivedItem === `goldcoin`) {
                          // if npc receives gold coin, add 1 to goldcoin event, at 3 BOT drops boatKey
                          console.log(npcGoldcoinEvent);
                          npcGoldcoinEvent++;
                          removeItemFromInv(); // splice goldcoin from inventory
                          console.log(npcGoldcoinEvent);
                          if (npcGoldcoinEvent === 1) {
                            npcText = "That's it. Three coins to rent a boat.";
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (npcGoldcoinEvent === 2) {
                            npcText =
                              "One more coin and I'll hand you these keys.";
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }

                          if (npcGoldcoinEvent === 3) {
                            //dropItem boatKey after receiving 3 gold coins
                            npcText = `Be sure to stay in the shallow waters!`;
                            dropItem(boatKeyItem, boatMate.itemDropZone);
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (npcGoldcoinEvent > 3) {
                            // any additional gold coins received will make BOT drop a fish
                            npcText = `Enjoy the catch of the day!`;
                            dropItem(fishItem, boatMate.itemDropZone);
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                        } else {
                          if (
                            boatMate.relationship2items[receivedItem] === -1
                          ) {
                            // any other items given are received as gifts
                            npcText = `I don't want no ${receivedItem}!`; // npc text stating received item
                            let relationshipManipulator = // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                              // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                              adjacentNPC.relationship2items[receivedItem];

                            adjacentNPC.relationship2player =
                              adjacentNPC.relationship2player +
                              relationshipManipulator;

                            console.log(adjacentNPC.relationship2player);
                            removeItemFromInv(); // splice item from inventory
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (boatMate.relationship2items[receivedItem] === 0) {
                            // any other items given are received as gifts
                            npcText = `Thanks for the ${receivedItem}`; // npc text stating received item
                            let relationshipManipulator = // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                              // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                              adjacentNPC.relationship2items[receivedItem];

                            adjacentNPC.relationship2player =
                              adjacentNPC.relationship2player +
                              relationshipManipulator;

                            console.log(adjacentNPC.relationship2player);
                            removeItemFromInv(); // splice item from inventory
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (boatMate.relationship2items[receivedItem] === 1) {
                            // any other items given are received as gifts
                            npcText = `He he he, a ${receivedItem}, for me?`; // npc text stating received item
                            let relationshipManipulator = // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                              // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                              adjacentNPC.relationship2items[receivedItem];

                            adjacentNPC.relationship2player =
                              adjacentNPC.relationship2player +
                              relationshipManipulator;

                            console.log(adjacentNPC.relationship2player);
                            removeItemFromInv(); // splice item from inventory
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                        }
                      }
                    }
                  }
                }
              }
              // END BOT
              else if (playerAdjacentCells[i] === `HIK`) {
                adjacentNPC = hikeMate;
                //hiker receives items as gifts

                // FIRST utterance

                if (adjacentNPC.firstTalk === "true") {
                  // if this is the first time talking to npc
                  npcText = adjacentNPC.initialDialog; // display npc initial dialog
                  adjacentNPC.firstTalk = "false"; // then turn off first talk to initiate neutral dialog
                  playerPaused = true; // player is paused
                  stopTextBubble = false; //  text bubble is not stopped anymore
                  return;
                }

                npcDialog(); // normal dialog is generic, called upon unless NPC is receiving an item

                // NPC events
                if (selectItemHeldOut === true) {
                  //hiker receives items as gifts

                  if (
                    selectItem !==
                      { itemName: "empty", itemImageName: "no image" } ||
                    selectItem !== boatKeyItem
                  ) {
                    // if player is holding out item
                    // go through item name list
                    for (let i = 0; i < itemNameList.length; i++) {
                      if (itemNameList[i] === selectItem.name) {
                        console.log(`you've given a ${selectItem.name}`);
                        //determine how much relationship manipulated
                        receivedItem = selectItem.name;

                        if (hikeMate.relationship2items[receivedItem] === -1) {
                          npcText = `Oh ho, huhum... a ${receivedItem}.`; // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                          // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                          let relationshipManipulator =
                            adjacentNPC.relationship2items[receivedItem];

                          adjacentNPC.relationship2player =
                            adjacentNPC.relationship2player +
                            relationshipManipulator;

                          console.log(adjacentNPC.relationship2player);
                          removeItemFromInv(); // splice item from inventory
                          playerPaused = true; // player is paused
                          stopTextBubble = false; //  text bubble is not stopped anymore
                          return;
                        }
                        if (hikeMate.relationship2items[receivedItem] === 0) {
                          npcText = `Thanks for the ${receivedItem}`; // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                          // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                          let relationshipManipulator =
                            adjacentNPC.relationship2items[receivedItem];

                          adjacentNPC.relationship2player =
                            adjacentNPC.relationship2player +
                            relationshipManipulator;

                          console.log(adjacentNPC.relationship2player);
                          removeItemFromInv(); // splice item from inventory
                          playerPaused = true; // player is paused
                          stopTextBubble = false; //  text bubble is not stopped anymore
                          return;
                        }
                        if (hikeMate.relationship2items[receivedItem] === 1) {
                          npcText = `Is this ${receivedItem} for me? Ah, I appreciate it!`; // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                          // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                          let relationshipManipulator =
                            adjacentNPC.relationship2items[receivedItem];

                          adjacentNPC.relationship2player =
                            adjacentNPC.relationship2player +
                            relationshipManipulator;

                          console.log(adjacentNPC.relationship2player);
                          removeItemFromInv(); // splice item from inventory
                          playerPaused = true; // player is paused
                          stopTextBubble = false; //  text bubble is not stopped anymore
                          return;
                        }
                      }
                    }
                  }
                }
              }
              // END HIK
              else if (playerAdjacentCells[i] === `PDL`) {
                adjacentNPC = peddleMate;
                //pedler exchanges items for equal value item
                // does not receive gifts

                //FIRST UTTERANCE
                if (adjacentNPC.firstTalk === "true") {
                  // if this is the first time talking to npc
                  npcText = adjacentNPC.initialDialog; // display npc initial dialog
                  adjacentNPC.firstTalk = "false"; // then turn off first talk to initiate neutral dialog
                  playerPaused = true; // player is paused
                  stopTextBubble = false; //  text bubble is not stopped anymore
                  return;
                }

                npcDialog(); // normal dialog is generic, called upon unless NPC is receiving an item

                //NPC events
                if (selectItemHeldOut === true) {
                  //PDL exchanges items of equal item values
                  // they do not receive items as gifts
                  //
                  if (
                    selectItem !==
                      { itemName: "empty", itemImageName: "no image" } ||
                    selectItem !== boatKeyItem
                  ) {
                    // if player is holding out item
                    // go through item name list
                    for (let i = 0; i < itemNameList.length; i++) {
                      if (itemNameList[i] === selectItem.name) {
                        receivedItem = selectItem; // save item info in variable
                        removeItemFromInv(); // splice item from inventory
                        let value1Items = [
                          petRockNPCItem,
                          peachNPCItem,
                          cherryItem,
                        ];
                        let value2Items = [
                          fishItem,
                          cherryItem,
                          fireworkItem,
                          mushroomItem,
                        ];
                        let value3Items = [emeraldNPCItem, mushroomItem];
                        let value4Items = [goldcoinItem, diamondNPCItem];
                        let value5Items = [diamondNPCItem];

                        giveBackItemValue = receivedItem.value; // check received item value to determine value of item to drop

                        if (giveBackItemValue === 1) {
                          let giveBackItem = random(value1Items);
                          if (giveBackItem === receivedItem) {
                            let giveBackItem = random(value1Items);
                          }
                          dropItem(giveBackItem, peddleMate.itemDropZone);
                        } else if (giveBackItemValue === 2) {
                          let giveBackItem = random(value2Items);
                          if (giveBackItem === receivedItem) {
                            let giveBackItem = random(value2Items);
                          }
                          dropItem(giveBackItem, peddleMate.itemDropZone);
                        } else if (giveBackItemValue === 3) {
                          let giveBackItem = random(value3Items);
                          if (giveBackItem === receivedItem) {
                            let giveBackItem = random(value3Items);
                          }
                          dropItem(giveBackItem, peddleMate.itemDropZone);
                        } else if (giveBackItemValue === 4) {
                          let giveBackItem = random(value4Items);
                          if (giveBackItem === receivedItem) {
                            let giveBackItem = random(value4Items);
                          }
                          dropItem(giveBackItem, peddleMate.itemDropZone);
                        } else if (giveBackItemValue === 5) {
                          if (firstValue5GiveBack === true) {
                            // there is a unique item, a pixel art "painting" by an online friend of mine. It can only be received by trading a piece of pie.
                            dropItem(valsPaintingItem, peddleMate.itemDropZone);
                            firstValue5GiveBack = false; // this only happens once
                            return;
                          }
                          let giveBackItem = random(value5Items);
                          if (giveBackItem === receivedItem) {
                            let giveBackItem = random(value5Items);
                          }
                          dropItem(giveBackItem, peddleMate.itemDropZone);
                        }
                      }
                    }
                  }
                }
              }
              //END PDL
              else if (playerAdjacentCells[i] === `IDL`) {
                adjacentNPC = idleMate;
                //idle mate wants 5 peaches in exchange for pie, infinite
                // anything else is received as a gift

                // FIRST UTTERANCE
                if (adjacentNPC.firstTalk === "true") {
                  // if this is the first time talking to npc
                  npcText = adjacentNPC.initialDialog; // display npc initial dialog
                  adjacentNPC.firstTalk = "false"; // then turn off first talk to initiate neutral dialog
                  playerPaused = true; // player is paused
                  stopTextBubble = false; //  text bubble is not stopped anymore
                  return;
                }

                npcDialog(); // normal dialog is generic, called upon unless NPC is receiving an item

                // NPC events
                if (selectItemHeldOut === true) {
                  //idle mate wants 5 peaches in exchange for pie, infinite
                  // anything else is received as a gift
                  if (
                    selectItem !==
                      { itemName: "empty", itemImageName: "no image" } ||
                    selectItem !== boatKeyItem
                  ) {
                    // if player is holding out item

                    // go through item name list
                    for (let i = 0; i < itemNameList.length; i++) {
                      if (itemNameList[i] === selectItem.name) {
                        console.log(`you've given a ${selectItem.name}`);
                        receivedItem = selectItem.name;

                        if (receivedItem === `peach`) {
                          // peaches received impact peach event
                          npcPeachEvent++; // each peach adds 1 to peach event, at 5 IDL drops pie
                          removeItemFromInv(); // splice peach from inventory
                          if (npcPeachEvent === 1) {
                            npcText =
                              "Thanks for that peach, can you bring me 5 total?";
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (npcPeachEvent === 2) {
                            npcText = "That makes two!";
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (npcPeachEvent === 3) {
                            npcText = "I only need two more peaches now!";
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (npcPeachEvent === 4) {
                            npcText =
                              "Bring me one more and I'll share you something special";
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }

                          if (npcPeachEvent === 5) {
                            // 5th peach, IDL drops pie
                            //dropItem
                            npcText = `You are the bomb! I love you!`;

                            dropItem(pieItem, adjacentNPC.itemDropZone);
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            npcPeachEvent = 0; // the event is repeated forever, useful to start a peach economy
                            return;
                          }
                        } else {
                          if (
                            idleMate.relationship2items[receivedItem] === -1
                          ) {
                            // any other item is received as gift
                            npcText = `Oh, I'm sorry... I don't like ${receivedItem}s`; // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                            // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                            let relationshipManipulator =
                              adjacentNPC.relationship2items[receivedItem];

                            adjacentNPC.relationship2player =
                              adjacentNPC.relationship2player +
                              relationshipManipulator;

                            console.log(adjacentNPC.relationship2player);
                            removeItemFromInv(); // remove gifted item from inventory
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (idleMate.relationship2items[receivedItem] === 0) {
                            // any other item is received as gift
                            npcText = `Thanks for the ${receivedItem}`; // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                            // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                            let relationshipManipulator =
                              adjacentNPC.relationship2items[receivedItem];

                            adjacentNPC.relationship2player =
                              adjacentNPC.relationship2player +
                              relationshipManipulator;

                            console.log(adjacentNPC.relationship2player);
                            removeItemFromInv(); // remove gifted item from inventory
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                          if (idleMate.relationship2items[receivedItem] === 1) {
                            // any other item is received as gift
                            npcText = `A ${receivedItem} is the greatest gift anyone can give`; // npc relationship to player is manipulated, going up or down according to npc relationship to received item
                            // -10 = a bad relationship to player, -9 - 9 is neutral, 10+ is a friendship
                            let relationshipManipulator =
                              adjacentNPC.relationship2items[receivedItem];

                            adjacentNPC.relationship2player =
                              adjacentNPC.relationship2player +
                              relationshipManipulator;

                            console.log(adjacentNPC.relationship2player);
                            removeItemFromInv(); // remove gifted item from inventory
                            playerPaused = true; // player is paused
                            stopTextBubble = false; //  text bubble is not stopped anymore
                            return;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        // END IDL
        // end npc interactions
      }
    }
  }
}

function shallowPass() {
  // when player has the boatKey and steps on "Bo" cell, "Sh" barrier becomes passable "BSh"
  for (let y = 0; y < gridMap.length; y++) {
    // rows
    for (let x = 0; x < gridMap[y].length; x++) {
      // collumns
      let cell = gridMap[y][x]; // cell = index
      // check each cell for a key
      if (cell === `Sh`) {
        gridMap[y][x] = `BSh`;
      }
    }
  }
}

function npcDialog() {
  if (selectItemHeldOut === false) {
    // now that rel2ply has been manipulated
    if (
      adjacentNPC.relationship2player >= -9 &&
      adjacentNPC.relationship2player <= 9
    ) {
      let dialogSelection = adjacentNPC.neutralDialog;
      let lastNPCText = npcText;
      npcText = random(dialogSelection); // use player coordinates
      if (npcText === lastNPCText) {
        npcText = random(dialogSelection); // use player coordinates
      }
      playerPaused = true; // player is paused
      stopTextBubble = false; //  text bubble is not stopped anymore
    } else if (adjacentNPC.relationship2player >= 10) {
      let dialogSelection = adjacentNPC.friendlyDialog;
      let lastNPCText = npcText;
      npcText = random(dialogSelection); // use player coordinates
      if (npcText === lastNPCText) {
        npcText = random(dialogSelection); // use player coordinates
      }
      playerPaused = true; // player is paused
      stopTextBubble = false; //  text bubble is not stopped anymore
    } else if (adjacentNPC.relationship2player <= -10) {
      let dialogSelection = adjacentNPC.dislikeDialog;
      let lastNPCText = npcText;
      npcText = random(dialogSelection); // use player coordinates
      if (npcText === lastNPCText) {
        npcText = random(dialogSelection); // use player coordinates
      }
      playerPaused = true; // player is paused
      stopTextBubble = false; //  text bubble is not stopped anymore
    } else {
      // npc receives no gift, no effect on rel2pl
    }
  }
}

function removeItemFromInv() {
  // splicing items from inventory
  if (
    (selectItem.name === "peach" && selectItemHeldOut === true) ||
    (selectItem.name === "emerald" && selectItemHeldOut === true) ||
    (selectItem.name === "diamond" && selectItemHeldOut === true) ||
    (selectItem.name === "petRock" && selectItemHeldOut === true) ||
    (selectItem.name === "pie" && selectItemHeldOut === true) ||
    (selectItem.name === "cherry" && selectItemHeldOut === true) ||
    (selectItem.name === "mushroom" && selectItemHeldOut === true) ||
    (selectItem.name === "firework" && selectItemHeldOut === true) ||
    (selectItem.name === "valsPainting" && selectItemHeldOut === true) ||
    (selectItem.name === "goldcoin" && selectItemHeldOut === true) ||
    (selectItem.name === "fish" && selectItemHeldOut === true)
  ) {
    player.inventory.splice(selectItemNumber, 1); // remove selectItem from the array
    selectItem = player.inventory[0]; // select item is reset to 0
    selectItemHeldOut = false;
    currentDigitPressed = 0;
  }
}

function solidBlock() {
  // do nothing
}

function pickItemUp() {
  // map automatic drops have a G in their label, when picked up they automatically redrop another
  if (nextCell === `PeG`) {
    itemPickup(`peach`);
    // when a peach is picked up, another peach will be dropped in 1.5-3.5 seconds
    let treeDropTime = random(1500, 3500);
    setTimeout(
      dropItem.bind(this, peachItem, peachItem.dropZone),
      treeDropTime
    );
  }
  if (nextCell === `DiG`) {
    itemPickup(`diamond`);
    // when a diamond is picked up, another river rock will be dropped in 11-25 seconds
    let rockDropTime = random(11000, 25000);
    rockDropSelection = random(riverRocks);
    if (rockDropSelection === `diamond`) {
      itemToDrop = diamondItem;
    }
    if (rockDropSelection === `emerald`) {
      itemToDrop = emeraldItem;
    }
    if (rockDropSelection === `petRock`) {
      itemToDrop = petRockItem;
    }
    setTimeout(
      dropItem.bind(this, itemToDrop, itemToDrop.dropZone),
      rockDropTime
    );
  }
  if (nextCell === `PrG`) {
    itemPickup(`petRock`);
    // when a petRock is picked up, another river rock will be dropped in 11-25 seconds
    let rockDropTime = random(11000, 25000);
    rockDropSelection = random(riverRocks);
    if (rockDropSelection === `diamond`) {
      itemToDrop = diamondItem;
    }
    if (rockDropSelection === `emerald`) {
      itemToDrop = emeraldItem;
    }
    if (rockDropSelection === `petRock`) {
      itemToDrop = petRockItem;
    }
    setTimeout(
      dropItem.bind(this, itemToDrop, itemToDrop.dropZone),
      rockDropTime
    );
  }
  if (nextCell === `EmG`) {
    itemPickup(`emerald`);
    // when a emerald is picked up, another river rock will be dropped in 11-25 seconds
    let rockDropTime = random(11000, 25000);
    rockDropSelection = random(riverRocks);
    if (rockDropSelection === `diamond`) {
      itemToDrop = diamondItem;
    }
    if (rockDropSelection === `emerald`) {
      itemToDrop = emeraldItem;
    }
    if (rockDropSelection === `petRock`) {
      itemToDrop = petRockItem;
    }
    setTimeout(
      dropItem.bind(this, itemToDrop, itemToDrop.dropZone),
      rockDropTime
    );
  }
  if (nextCell === `EmN`) {
    itemPickup(`emerald`);
  }
  if (nextCell === `PeN`) {
    itemPickup(`peach`);
  }
  if (nextCell === `PrN`) {
    itemPickup(`petRock`);
  }
  if (nextCell === `DiN`) {
    itemPickup(`diamond`);
  }
  if (nextCell === `Pi`) {
    itemPickup(`pie`);
  }
  if (nextCell === `Mu`) {
    itemPickup(`mushroom`);
  }
  if (nextCell === `Fw`) {
    itemPickup(`firework`);
  }
  if (nextCell === `Pa`) {
    itemPickup(`valsPainting`);
  }
  if (nextCell === `Gc`) {
    itemPickup(`goldcoin`);
  }
  if (nextCell === `Ch`) {
    itemPickup(`cherry`);
  }
  if (nextCell === `Bk`) {
    itemPickup(`boatKey`);
  }
  if (nextCell === `Fs`) {
    itemPickup(`fish`);
  }
}

function itemPickup(item) {
  if (item === `peach`) {
    player.inventory.push(peachItem);
  }
  if (item === `pie`) {
    player.inventory.push(pieItem);
  }
  if (item === `emerald`) {
    player.inventory.push(emeraldItem);
  }
  if (item === `diamond`) {
    player.inventory.push(diamondItem);
  }
  if (item === `petRock`) {
    player.inventory.push(petRockItem);
  }
  if (item === `mushroom`) {
    player.inventory.push(mushroomItem);
  }
  if (item === `firework`) {
    player.inventory.push(fireworkItem);
  }
  if (item === `valsPainting`) {
    player.inventory.push(valsPaintingItem);
  }
  if (item === `goldcoin`) {
    player.inventory.push(goldcoinItem);
  }
  if (item === `cherry`) {
    player.inventory.push(cherryItem);
  }
  if (item === `boatKey`) {
    player.inventory.push(boatKeyItem);
  }
  if (item === `fish`) {
    player.inventory.push(fishItem);
  }
}

function dropItem(item, dropZone) {
  // place item label in the grid
  if (dropZone === item.dropZone) {
    // if the item is automatically dropped on map, use the drop zone in the item class/JSON
    // drop peach around peach tree
    if (item.name === `peach`) {
      let fallenPeachIndex = random(dropZone);
      if (gridMap[fallenPeachIndex.row][fallenPeachIndex.collumn] === `Pl`) {
        // if peach tries to fall in a cell where the player is standing, select another cell and try again
        dropItem(item, dropZone);
      } else {
        // drop the peach
        gridMap[fallenPeachIndex.row][fallenPeachIndex.collumn] = `PeG`;
      }
    }
    // drop rive rocks by the mountain river
    if (
      item.name === `emerald` ||
      item.name === `diamond` ||
      item.name === `petRock`
    ) {
      // HAVE ALL river stones here##
      let currentRiverRock = item;
      let fallenEmeraldIndex = random(emeraldItem.dropZone);
      if (
        gridMap[fallenEmeraldIndex.row][fallenEmeraldIndex.collumn] === `Pl`
      ) {
        // if river rock tries to fall in a cell where the player is standing, select another cell and try again
        fallenEmeraldIndex = random(emeraldItem.dropZone);
        dropItem(currentRiverRock, item.dropZone); //
      } else {
        // drop the river rock
        if (currentRiverRock.name === `emerald`) {
          gridMap[fallenEmeraldIndex.row][fallenEmeraldIndex.collumn] = `EmG`;
        } else if (currentRiverRock.name === `diamond`) {
          gridMap[fallenEmeraldIndex.row][fallenEmeraldIndex.collumn] = `DiG`;
        } else if (currentRiverRock.name === `petRock`) {
          gridMap[fallenEmeraldIndex.row][fallenEmeraldIndex.collumn] = `PrG`;
        }
      }
    }
  } else if (dropZone !== item.dropZone) {
    // if the drop zone is NPC's, generic commands!
    let npcItemDropIndex = random(adjacentNPC.itemDropZone); // load adjacent NPC's drop zone into generic drop zone variable
    if (gridMap[npcItemDropIndex.row][npcItemDropIndex.collumn] === `Pl`) {
      // if item tries to fall in a cell where the player is standing, select another cell and try again
      dropItem(item, adjacentNPC.itemDropZone);
    } else {
      // drop the item
      gridMap[npcItemDropIndex.row][npcItemDropIndex.collumn] = item.cellLabel;
    }
  }
}

// click mouse to start the game
function mouseClicked() {
  if (state === `title`) {
    state = "simulation";
    playerPaused = false;
  }
}
