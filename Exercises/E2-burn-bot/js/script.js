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

let state = `Title`; // can be Title, Online, GoodNight
let bot = undefined;

let trigger = 0;

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

  //responsiveVoice.setDefaultVoice(`US English Male`);

  bot = new BurnBot();

}


/**
Description of draw()
*/
function draw() {
  background (0);

  bot.update();

  // if (responsiveVoice.isPlaying()){
  //   bot.speechState = `Talking`;
  // }

  if (state === `Title`){
    push();
    fill(255);
    textAlign(CENTER);
    text(`Poke me`, width/2, height/4);
    pop();
  }

  if (state === `Online`){
    bot.speechState = `Listening`;

if (trigger === 0){
  setTimeout(botIntro, 3000);
  trigger = 1;
}

//annyang listening!

  }

}

function botIntro(){
  responsiveVoice.speak(`Hello stranger, I am Service Bot, here to serve you.
    Well, , do you need my help?`,
    "UK English Male" ); // {onstart: botTalk, onend: botListen}
}

function botTalk(){
  bot.speechState = `Talking`;
}

function botListen(){
  bot.speechState = `Listening`;
}

function mousePressed(){
  if (state === `Title`){
    state = `Online`;
  }
}
