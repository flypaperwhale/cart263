/**
Find Sausage Game
Frankie Latreille

This is an adaptation of the "Where is Sausage Dog Game". It remains a Where's Waldo
type of game except instead of needing to find the Sausage Dog, the player must find
the 3 animals that are looking left.

*/

/*
What needs to be done:
- change sausage dog file name to generic animal name
- change sausage dog class to leftist class
- have a setTimeout that changes the background color as well as changes
  the random positions of the animals
- make it so that when a leftist animal is clicked they spin in place
  and do not change random positions anymore.
*/

"use strict";

const NUM_ANIMAL_IMAGES = 11; // every animal, including sausage dog
const NUM_ANIMALS = 10; // ### CHANGE TO VARIABLE
const NUM_LEFTISTS = 3; // will remain at 3 even as NUM_ANIMALS goes up

let backgroundColor = `yellow`; // background starts off yellow

let state = `Title`; // can be Title, Game, End

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

let trigger = 0;

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`assets/images/animal10.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create the animals
  for (let i = 0; i < NUM_ANIMALS; i++){
    let x = random (0,width);
    let y = random (0,height);
    let animalImage = random(animalImages);
    let animal = new Animal(x,y,animalImage);
    animals.push(animal);
  }

  // Create the leftward animals
  let x = random (0,width);
  let y = random (0,height);
  sausageDog = new Leftist (x,y,sausageDogImage);
}


function draw() {

// Background changes color throughout the program, every second
  if (backgroundColor === `yellow`){
    background(255,255,0);
    setTimeout(changeBGtoGreen, 1000); // from yellow to green
  }
  else if (backgroundColor === `green`){
    background(0,255,0);
    setTimeout(changeBGtoYellow, 1000); // from green to yellow
  }

  if (state === `Title`){ // during title state
    push();
    textAlign(CENTER,CENTER);
    textSize(40);
    if (backgroundColor === `yellow`){ // if background is yellow
      fill(0,255,0); // text is green
    }
    else if (backgroundColor === `green`){ // if background is green
      fill(255,255,0); // text is yellow
    }
    text(`  Welcome to
    "Pick out the Leftists"`, width/2, height/2)
    pop();

  }

if (state === `Game`){
if (backgroundColor === `yellow`) {
  //trigger = 0;
  if (trigger === 0) {
    for (let i = 0; i < animals.length; i++) {
      animals[i].changePosition();
      if (i === animals.length - 1) {
        trigger = 1;
      }
    }
  }
  if (trigger === 1) {
    for (let i = 0; i < animals.length; i++) {
      animals[i].update();
      if (i === animals.length - 1) {
        trigger = 0;
      }
    }
  }
}

if (backgroundColor === `green`) {
  //trigger = 0;
  if (trigger === 0) {
    for (let i = 0; i < animals.length; i++) {
      animals[i].changePosition();
      if (i === animals.length - 1) {
        trigger = 1;
      }
    }
  }
  if (trigger === 1) {
    for (let i = 0; i < animals.length; i++) {
      animals[i].update();
      if (i === animals.length - 1) {
        trigger = 0;
      }
    }
  }
}

  sausageDog.update();
}
}


function changeBGtoYellow(){
  // gotta get it to trigger only once, going to use a trigger
  if (backgroundColor === `green`){
      backgroundColor = `yellow`;
    }
  }

function changeBGtoGreen(){
  // gotta get it to trigger only once, going to use a trigger
  if (backgroundColor === `yellow`){
      backgroundColor = `green`;
    }
  }



function mousePressed(){
  if (state === `Title`){
    state = `Game`;
  }
  sausageDog.mousePressed();
}
