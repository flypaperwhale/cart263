/**
Fire Walk with Me // "Monkey Business"
Frankie Latreille

Reimagined scenes of David Lynch's Fire Walk with Me. Laura meets a trucker who wants
to pay her for sex work, she is sent into her subconscious where a woman tries to warn
her, and then continues her decent into Hell
*/

"use strict";

// /**
// Description of preload
// */
// function preload() {}
//
// /**
// Description of setup
// */
// function setup() {}
//
// /**
// Description of draw()
// */
// function draw() {}

// scene intro images
let introLauraImg, introRoadBgImg, introThumbImg, introSkyImg;

// scene 1 images
let barBgImg,
  sc1LauraLightsUp,
  sc1LauraSmokes,
  sc1BusinessmanAcosts,
  sc1BusinessmanChats,
  sc1BusinessmanSmirks,
  sc1BusinessmanSnark;
// scene 2 images
let semiconsciousBgImg,
  sc2LauraImg,
  sc2LogLadyFrontImg,
  sc2LogLadySideImg,
  sc2LauraXLogLady,
  sc2LogLadyTouch1,
  sc2LogLadyTouch2;

// scene 3 images
let redRoomBgImg,
  sc3BobImg1,
  sc3BobImg2,
  sc3LauraHands,
  sc3LauraScreams,
  sc3RingImg;

// other images
let monkeyFaceImg, redRoomEntryImg, transitionSnowImg;

// states
let state = `Title`; // states are: Title, introAnimation, parkingLot,
// transitionAnimation, semiconscious, redRoom

// To store the loaded data
let data = undefined;
// The current scene (there's only one in the data, but this would be how you display different scenes)
let currentScene = `scene1`;
// The current line in the current scene (going through an array of dialog, so starts at 0)
let currentLine = 0;
// The height of our dialog box
let dialogHeight = 50;

/**
Loads the JSON data for our little play
*/
function preload() {
  data = loadJSON(`assets/data/dialog.json`);

  // introduction images
  introLauraImg = loadImage("assets/images/intro-scene/intro-laura.png");
  introRoadBgImg = loadImage("assets/images/intro-scene/intro-road.png");
  introThumbImg = loadImage("assets/images/intro-scene/intro-thumb.png");
  introSkyImg = loadImage("assets/images/intro-scene/intro-sky.png");
  // scene 1 images
  barBgImg = loadImage("assets/images/bar-bg1.png");
  sc1LauraLightsUp = loadImage("assets/images/scene-1/lauralights.png");
  sc1LauraSmokes = loadImage("assets/images/scene-1/lauracig.png");
  sc1BusinessmanAcosts = loadImage("assets/images/scene-1/licksbrett.png");
  sc1BusinessmanChats = loadImage("assets/images/scene-1/neutbrett.png");
  sc1BusinessmanSmirks = loadImage("assets/images/scene-1/brettsmirk.png");
  sc1BusinessmanSnark = loadImage("assets/images/scene-1/brettsnark.png");
  // scene 2 images
  semiconsciousBgImg = loadImage("assets/images/scene-2/semiconscious-bg.png");
  sc2LauraImg = loadImage("assets/images/scene-2/laurastand.png");
  sc2LogLadyFrontImg = loadImage("assets/images/scene-2/loglady.png");
  sc2LogLadySideImg = loadImage("assets/images/scene-2/logladystand.png");
  sc2LauraXLogLady = loadImage("assets/images/scene-2/logladytouchlaura.png");
  sc2LogLadyTouch1 = loadImage("assets/images/scene-2/sc2-laura1.png");
  sc2LogLadyTouch2 = loadImage("assets/images/scene-2/sc2-laura2.png");
  // scene 3 images
  redRoomBgImg = loadImage("assets/images/scene-3/redroom-bg.png");
  sc3BobImg1 = loadImage("assets/images/scene-3/bob1.png");
  sc3BobImg2 = loadImage("assets/images/scene-3/bob2.png");
  sc3LauraHands = loadImage("assets/images/scene-3/laurahands.png");
  sc3LauraScreams = loadImage("assets/images/scene-3/laurascreams.png");
  sc3RingImg = loadImage("assets/images/scene-3/ringpixed.png");
  // other images
  monkeyFaceImg = loadImage("assets/images/intro-scene/monkeyface.png");
  redRoomEntryImg = loadImage("assets/images/scene-3/redroom-entry.png");
  transitionSnowImg = loadImage("assets/images/transitionSnow.png");
}

/**
Creates the canvas
*/
function setup() {
  createCanvas(600, 400);
}

/**
Displays the current line
*/
function draw() {
  background(0);

  if (state === `Title`) {
    push();
    textSize(24);
    fill(230, 220, 220);
    textAlign(CENTER, CENTER);
    text(
      `Fire Walk with Me
      Press space for simulation`,
      250,
      200
    );
    pop();
  }

  if (state === `parkingLot`) {
    // show background image

    // show dialog
    displayCurrentLine();
  }

  if (state === `semiconscious`) {
    // show background image

    // show dialog
    displayCurrentLine();
  }

  if (state === `redRoom`) {
    // show background image

    // show dialog
    displayCurrentLine();
  }
}

/**
Uses the dialog and character data to display a dialog box
colored and labelled by character and with the current line
displayed in it.
*/
function displayCurrentLine() {
  // Get the current scene and line data object
  // NOTE: Notice how we can use *variables* to choose
  // a property in an object like data.dialog! This gives
  // us a lot of flexibility because we can store the property
  // name we want in a variable and change it (like the current
  // scene name!)
  let lineData = data.dialog[currentScene][currentLine];
  // Get the data for the character who is speaking, note
  // we're using the same trick of a variable containing the
  // property name corresponding to our character
  let characterData = data.characters[lineData.character];

  // DIALOG //
  /* Laura's dialog should appear from the left (POV)
whereas dialog from interlocutors should arrive from the right side
*/
  // Draw the dialog background
  push();
  noStroke();
  //fill(characterData.backgroundColor);
  fill(230, 220, 220);
  rect(0, height - dialogHeight, width, dialogHeight);
  pop();

  // Display the character name
  push();
  textSize(24);
  fill(230, 220, 220);
  textAlign(LEFT, BOTTOM);
  text(characterData.name, characterData.nameXPosition, height - dialogHeight);
  pop();

  // Display the character's line
  push();
  textSize(16);
  fill(0);
  textAlign(LEFT, TOP);
  // characterData.dialogXposition?
  text(lineData.speech, 10, height - dialogHeight + 5, width, dialogHeight);
  pop();
}

/**
Goes to the next line in the "play"
*/
/* may want to have user press the dialog box to move to next piece,
or a NEXT button... have user feel they are responding as Laura...
*/

function mousePressed() {
  nextLine();
}

/**
Iterates through the array, returns to 0 at the end, but you
would probably want to change to the next scene etc.
*/
/* I don't want to have the dialog repeat when the data.dialog[currentScene].length
reaches last object in the array...
I would rather when the last object in the array is reached
-> for a symbol to prompt the user to speak
depending on what the user says,
either what they've been told to say
or something they've been hinted into saying
they will enter a new scene!
*/
function nextLine() {
  currentLine++;
  if (currentLine === data.dialog[currentScene].length) {
    currentLine = 0;
  }
}

/**
Switch to scene two on a keypress, just to show the very
beginnings of multiple scenes.
*/
/* ##### Scenes are going to change after the user speaks a response (annyang)
when the last dialog piece has been said...
currentScene = `scene2`;
currentLine = 0;
*/
function keyPressed() {
  if (keyCode === 32) {
    state = `parkingLot`;
  }
}
