/**
Fire Walk with Me
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

// To store the loaded data
let data = undefined;
// The current scene (there's only one in the data, but this would be how you display different scenes)
let currentScene = `scene1`;
// The current line in the current scene (going through an array of dialog, so starts at 0)
let currentLine = 0;
// The height of our dialog box
let dialogHeight = 100;

/**
Loads the JSON data for our little play
*/
function preload() {
  data = loadJSON(`assets/data/dialog.json`);
}

/**
Creates the canvas
*/
function setup() {
  createCanvas(320, 240);
}

/**
Displays the current line
*/
function draw() {
  background(0);

  displayCurrentLine();
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

  // Draw the dialog background
  push();
  noStroke();
  //fill(characterData.backgroundColor);
  fill(100, 50, 0);
  rect(0, height - dialogHeight, width, dialogHeight);
  pop();

  // Display the character name
  push();
  textSize(24);
  //fill(characterData.backgroundColor);
  fill(100, 50, 0);
  textAlign(LEFT, BOTTOM);
  text(characterData.name, 0, height - dialogHeight);
  pop();

  // Display the character's line
  push();
  textSize(16);
  fill(0);
  textAlign(LEFT, TOP);
  text(lineData.speech, 0, height - dialogHeight, width, dialogHeight);
  pop();
}

/**
Goes to the next line in the "play"
*/
function mousePressed() {
  nextLine();
}

/**
Iterates through the array, returns to 0 at the end, but you
would probably want to change to the next scene etc.
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
/* ##### Scenes are going to change after the user speaks a response
when the last dialog piece has been said*/
function keyPressed() {
  currentScene = `scene2`;
  currentLine = 0;
}
