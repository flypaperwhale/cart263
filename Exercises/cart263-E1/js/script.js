/**
Find Sausage Game
Frankie Latreille

This is a game where Sausage must be found.
*/

"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
}


function setup() {

}


function draw() {

}
