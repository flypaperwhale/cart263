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

const NUM_ANIMAL_IMAGES = 11;
const NUM_ANIMALS = 10;

let state = `Title`; // can be Title, Game, End

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

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
  sausageDog = new SausageDog(x,y,sausageDogImage);
}


function draw() {
  background(255,255,0);

  for (let i = 0; i < animals.length; i++){
    animals[i].update();
  }

  sausageDog.update();
}

function mousePressed(){
  sausageDog.mousePressed();
}
