/**
Bubble Popper
Frankie Latreille

Pop bubbles with your finger as a pin. (building off Pippin's code)
*/

"use strict";

// user's webcam
let video = undefined;
// the handpose model
let handpose = undefined;

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(640, 480);

  // access user's webcam
  video = createCapture(VIDEO);
  video.hide();

  // load handpose model
  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    console.log(`model loaded`);
  });
}

/**
Description of draw()
*/
function draw() {}
