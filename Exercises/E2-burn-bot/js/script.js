/**
Burn this Bot!
Frankie Latreille

The bot will prompt the user with yes or no questions that will be registered through annyang
(or typed to get over non chrome users), and answers with responsiveVoice with more
yes or no questions
*/

/**
to do:
- make bot class with 3 faces (offline, listening, talking)
- setup aanyang to receive "yes" "no" or "I don't" ('get it' or 'know' or 'understand')
- setup responsiveVoice arrays for yesTangents and noTangents (SCRIPTING)
- have start state, middle state, after 3 responses (goodbye state?)
- have "I don't *" particular response higher pitch, red screen "Ooo I don't *whatever user said"
*/

"use strict";

let state = `Title`;
let bot = undefined;

/**
Description of preload
*/
function preload() {
}


/**
Description of setup
*/
function setup() {
  createCanvas(400,500);

  bot = new BurnBot();

}


/**
Description of draw()
*/
function draw() {
  background (0);

  bot.update();

}
