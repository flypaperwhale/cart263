/**
Pick Out the Leftists
Frankie Latreille

This is an adaptation of the "Where is Sausage Dog Game". It remains a Where's Waldo
type of game except instead of needing to find the Sausage Dog, the player must find
the 3 animals that are looking left. The challenge is to catch the leftward animals
before they shuffle away amongst the masses.

*/


"use strict";

const NUM_ANIMAL_IMAGES = 11; // every animal, including sausage dog
let numAnimals = 10; // numAnimals increases by 15 with each playthrough
const NUM_LEFTISTS = 3; // will always remain at 3

let backgroundColor = `yellow`; // background starts off yellow

let state = `Title`; // can be Title, Game, End

let animalImages = [];
let animals = [];

let leftists = []; // replaces sausage dog

let leftistsFound = 0; // increases by 1 for each leftists[].foundCounter tabbed

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
}

function setup() {
  createCanvas(windowWidth -250, windowHeight -50); // reduced playing zone
  // the whole window was hard to play with

  // Create the animals
  for (let i = 0; i < numAnimals; i++){
    let x = random (0,width);
    let y = random (0,height);
    let animalImage = random(animalImages);
    let animal = new Animal(x,y,animalImage);
    animals.push(animal);
  }

  // Create the leftward animals
  for (let i = 0; i < NUM_LEFTISTS; i++){
    let x = random (0,width);
    let y = random (0,height);
    let animalImage = random(animalImages);
    let animal = new Leftist(x,y,animalImage);
    leftists.push(animal);
  }

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
    // introductory text
    text(`  Welcome to
    "Pick out the Leftists"

    3 backwards beasts hide...
    Will they evade you?`, width/2, height/2)
    pop();

  }

if (state === `Game`){ // during the game state
if (backgroundColor === `yellow`) { // when background is yellow
  // animals are static in their newly shuffled position
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();} // display the animals
  for (let i = 0; i < leftists.length; i++) {
    leftists[i].update(); // display the leftists
  }}

if (backgroundColor === `green`) { // animals shuffle when background is green
  shuffleAnimals(); // the shuffle
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();} // display animals shuffling
    for (let i = 0; i < leftists.length; i++) {
      leftists[i].update(); // display leftists shuffling
    }
}

for (let i = 0; i < leftists.length; i++){ // look through the leftists array
  if (leftists[i].foundCounter === true){ // if a leftist has been found
      leftistsFound++; // add 1 to the leftistsFound counter
      leftists[i].foundCounter = false; // then turn off counter in leftist class
      // so that they are only counted once
  }
}

if (leftistsFound === 3){ // if the three leftists are found
  state = `End`; // game is over, well done!
}
}

if (state === `End`){ // during end state
  push();
  textAlign(CENTER,CENTER);
  textSize(40);
  if (backgroundColor === `yellow`){ // if background is yellow
    fill(0,255,0); // text is green
  }
  else if (backgroundColor === `green`){ // if background is green
    fill(255,255,0); // text is yellow
  }
  // end state text, prompting player to play through again
  text(`  Those pesky leftists
    were no match for you!

    Click to play again!`, width/2, height/2)
  pop();
}
}

function changeBGtoYellow(){ // change background color from green to yellow
  if (backgroundColor === `green`){
      backgroundColor = `yellow`;
    }
  }

function changeBGtoGreen(){ // change background color from yellow to green
  if (backgroundColor === `yellow`){
      backgroundColor = `green`;
    }
  }

function shuffleAnimals() { // changes ALL animal positions
    for (let i = 0; i < animals.length; i++) {
      animals[i].changePosition(); // change animal positions during shuffle
      }
      for (let i = 0; i < leftists.length; i++){
        if (leftists[i].found){ // if the leftist is found and spinning
          // do nothing
        }
        else { // otherwise change leftist position during shuffle
          leftists[i].changePosition();
        }
      }
    }

function mousePressed(){
  if (state === `Title`){ // mouse pressed during title
    state = `Game`; // starts the game
  }
  // during the game
  for (let i = 0; i < leftists.length; i++){ // look through leftists
    leftists[i].mousePressed(); // if mouse is overlapping with the leftist
    // leftist class methods are triggered
  }
  if (state === `End`){ // mouse pressed during end refreshes a more challenging game

    animals.splice(0,numAnimals); // cleanout the animals array
    for (let i = 0; i < numAnimals+15; i++){ // increase number of animals by 15
      // each playthrough
      // create the new animals for the next playthrough
      let x = random (0,width);
      let y = random (0,height);
      let animalImage = random(animalImages);
      let animal = new Animal(x,y,animalImage);
      animals.push(animal);
    }

    leftistsFound = 0; // refresh leftistsFound counter
      leftists.splice(0,3); // cleanout the leftists array
      // create the new leftists for the next playthrough
    for (let i = 0; i < NUM_LEFTISTS; i++){
      let x = random (0,width);
      let y = random (0,height);
      let animalImage = random(animalImages);
      let animal = new Leftist(x,y,animalImage);
      leftists.push(animal);
    }
    state = `Game`; // state becomes game again
  }
}
