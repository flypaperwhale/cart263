"use strict";

/*****************
Spy Profile Generator ++
by Frankie Latreille (built off of Pippin Barr's Spy Profile Generator)

Asks the user for their name and generates a spy profile for them! Uses
JSON data to create the profile. Generates a password and requires that
password to view the profile when the program is loaded again.

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

let newProfileAsk;
let newSpy;

// The spy profile data while the program is running
let spyData = {
  //key: "PROFILE_DATA_KEY",
  spyProfiles: [{
      name: `**REDACTED**`,
      alias: `**REDACTED**`,
      secretWeapon: `**REDACTED**`,
      password: `**REDACTED**`
    }
  ]
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
Creates a canvas then handles loading profile data, checking password,
and generating a profile as necessary.
*/
function setup() {
  // Create the canvas
  createCanvas(windowWidth, windowHeight);
  // Try to load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
  // Check if there was data to load
  if (data !== null) {
    newProfileAsk = prompt(`Are you a returning agent? y/n`);
    if (newProfileAsk === `y`) {
      // If so, ask for name and password
      let name = prompt(`Enter your name`);
      let password = prompt(`Enter your password`);
      // Check if the password is correct
      for (let i = 0; i < data.spyProfiles.length; i++) {
        if (
          name === data.spyProfiles[i].name &&
          password === data.spyProfiles[i].password
        ) {
          // If is is, then setup the spy profile with the data
          setupSpyProfileWithData(data.spyProfiles[i]);
        }
      }
    } else if (newProfileAsk === `n`) {
      generateSpyProfile();
      setupSpyProfileWOData(newSpy);
    }
  } else {
    // If there is no data, generate a spy profile for the user
    generateSpyProfile();
    console.log(`newspy before setup is ${newSpy}`);
    setupSpyProfileWOData(newSpy);
  }
}

/**
Assigns across the profile properties from the data to the current profile
*/
function setupSpyProfileWithData(data) {
  console.log(
    `in func setupspypro data is ${data} and spypro is ${spyData}`
  );
  spyData.spyProfiles.name = data.name;
  spyData.spyProfiles.alias = data.alias;
  spyData.spyProfiles.secretWeapon = data.secretWeapon;
  spyData.spyProfiles.password = data.password;
}

function setupSpyProfileWOData(newSpy) {
  spyData.spyProfiles.name = newSpy.name;
  spyData.spyProfiles.alias = newSpy.alias;
  spyData.spyProfiles.secretWeapon = newSpy.secretWeapon;
  spyData.spyProfiles.password = newSpy.password;
}

/**
Generates a spy profile from JSON data
*/
function generateSpyProfile() { // should return a spy object ###

  // Generate an alias from a random instrument
  let zeldaGame = zeldaData.games["Link's Awakening"];
  let potentialAlias = `${random(zeldaGame.characters)}`;
  while (
    potentialAlias === `Sale` ||
    potentialAlias === `Photographer` ||
    potentialAlias === `Fishermen`
  ) {
    // loop random Alias to exclude these two names
    potentialAlias = `${random(zeldaGame.characters)}`;
  }

  // Generate a password from a random keyword for a random tarot card
  let passwordFirst = random(ergativeData.ergative_verbs);
  let passwordSecond = random(rhymelessData.words);

  console.log(passwordFirst + passwordSecond);

  let newSpy = {
    // Ask for the user's name and store it
    name: prompt(`Enter your name`),
    alias: potentialAlias,
    // Generate a secret weapon from a random object
    secretWeapon: random(weaponsData.weapons.Clue),
    password: passwordFirst + passwordSecond,
  }

console.log(newProfileAsk);
console.log(newSpy.alias);

  if (newProfileAsk === undefined || newProfileAsk === `n`){
    console.log(`i do see you`);
    return newSpy;
  };

//return newSpy;

// Push the generated profile to the array of profiles
spyData.spyProfiles.push(newSpy);
console.log(`Spy pro ${spyData.spyProfiles}`);
// Save resulting profiles data into local storage
localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyData));



}

/**
Displays the current spy profile.
*/
function draw() {
  background(255);

  //for (let i = 0; i < spyData.spyProfiles.length; i++) {
  // Generate the profile as a string using the data
  let spyText = `** TOP SECRET SPY PROFILE **

Name: ${spyData.spyProfiles.name}
Alias: ${spyData.spyProfiles.alias}
With the ${spyData.spyProfiles.secretWeapon}
Password: ${spyData.spyProfiles.password}`;

  // Display the profile
  push();
  textSize(32);
  textAlign(LEFT, TOP);
  textFont(`Courier, monospace`);
  fill(0);
  text(spyText, 50, 50);
  pop();
}
//}
// Remove the data currently locally saved
function keyPressed() {
  if (keyCode === 81)
    // press Q
    // Remove the data
    localStorage.removeItem(PROFILE_DATA_KEY); // Delete the data!
}

function mousePressed() {
  console.log(spyData);
}
