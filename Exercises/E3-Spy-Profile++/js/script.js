"use strict";
/*****************
Spy Profile Generator ++
by Frankie Latreille (built off of Pippin Barr's Spy Profile Generator)
Asks the user for their name and generates a spy profile for them! Uses
JSON data to create the profile. Generates a password and requires name and
password to view the profile when the program is loaded again. It is possible
to delete saved data by pressing Q
Uses:
Darius Kazemi's corpora project:
https://github.com/dariusk/corpora/
******************/

// URLs to JSON data
const ERGATIVE_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/words/ergative_verbs.json`;
const RHYMELESS_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/words/rhymeless_words.json`;
const CLUE_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/games/cluedo.json`;
const ZELDACHARS_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/games/zelda.json`;
// The key used to save and load the data for this program
const PROFILE_DATA_KEY = `spy-profile-data`;
// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
};
// Variables to store JSON data for generating the profile
let ergativeData;
let rhymelessData;
let weaponsData;
let zeldaData;
/**
Loads the JSON data used to generate the profile
*/
function preload() {
  ergativeData = loadJSON(ERGATIVE_DATA_URL);
  rhymelessData = loadJSON(RHYMELESS_DATA_URL);
  weaponsData = loadJSON(CLUE_DATA_URL);
  zeldaData = loadJSON(ZELDACHARS_DATA_URL);
}
/**
Creates a canvas then handles loading profile data, checking name and password,
and generating a profile as necessary.
*/
function setup() {
  // Create the canvas
  createCanvas(windowWidth, windowHeight);
  // Try to load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
  // Check if there was data to load
  if (data !== null) {
    // If so, ask for name and password
    let name = prompt(`Enter your name`);
    let password = prompt(`Enter your password`);
    // Check if the password is correct
    if (name === data.name && password === data.password) {
      // If is is, then setup the spy profile with the data
      setupSpyProfile(data);
    }
  } else {
    // If there is no data, generate a spy profile for the user
    generateSpyProfile();
  }
}
/**
Assigns across the profile properties from the data to the current profile
*/
function setupSpyProfile(data) {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
}
/**
Generates a spy profile from JSON data
*/
function generateSpyProfile() {
  // Ask for the user's name and store it
  spyProfile.name = prompt(`Enter your name`);
  // Generate an alias from a random character name in the Legend of Zelda: Link's Awakening
  let zeldaGame = zeldaData.games["Link's Awakening"];
  let potentialAlias = `${random(zeldaGame.characters)}`; // temporarily save alias to remove less interesting names
  console.log(potentialAlias);
  while (
    potentialAlias === `Sale` ||
    potentialAlias === `Photographer` ||
    potentialAlias === `Fishermen`
  ) {
    // loop random Alias to exclude these two names
    potentialAlias = `${random(zeldaGame.characters)}`;
  }
  spyProfile.alias = potentialAlias;
  // Generate a secret weapon from a random weapon from Clue
  spyProfile.secretWeapon = random(weaponsData.weapons.Clue);
  // Generate a password by concatenating an ergative verb with a rhymeless word
  let passwordFirst = random(ergativeData.ergative_verbs);
  let passwordSecond = random(rhymelessData.words);
  spyProfile.password = passwordFirst + passwordSecond;
  // Save the resulting profile to local storage
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile));
}
/**
Displays the current spy profile.
*/
function draw() {
  background(255);
  // Generate the profile as a string using the data
  let spyText = `** TOP SECRET SPY PROFILE **

 Name: ${spyProfile.name}
 Alias: ${spyProfile.alias}
 With the ${spyProfile.secretWeapon}
 Password: ${spyProfile.password}`;

  // Display the profile
  push();
  textSize(32);
  textAlign(LEFT, TOP);
  textFont(`Courier, monospace`);
  fill(0);
  text(spyText, 50, 50);
  pop();
}
// Remove the data currently locally saved by pressing Q
function keyPressed() {
  if (keyCode === 81)
    // press Q
    // Remove the data
    localStorage.removeItem(PROFILE_DATA_KEY);
}
