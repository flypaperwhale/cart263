/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let transitionSnowImg;
let snowDirectionsArray = [1, 2, 3, 4]; // up, down, left, right
let snowDirection = 1;

/**
Description of preload
*/
function preload() {
  transitionSnowImg = loadImage("assets/images/transitionSnow.png");
}

/**
Description of setup
*/
function setup() {
  createCanvas(600, 400);

  setInterval(snowTransition, 100);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  //snowTransition();

  push();
  imageMode(CENTER);
  if (snowDirection === 1) {
    scale(1, 1);
  } else if (snowDirection === 2) {
    scale(1, -1);
  } else if (snowDirection === 3) {
    scale(-1, 1);
  } else if (snowDirection === 4) {
    scale(-1, -1);
  }
  image(transitionSnowImg, 0, 0, canvas.width, canvas.height);
  pop();
}

function snowTransition() {
  let currentSnowDirection = snowDirection;
  snowDirection = random(snowDirectionsArray); // have snow change direction randomly for visual effect
  if (currentSnowDirection === snowDirection) {
    snowDirection = random(snowDirectionsArray); // have snow change direction randomly for visual effect
  }
}
