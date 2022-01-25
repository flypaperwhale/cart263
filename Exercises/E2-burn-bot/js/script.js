/**
Burn this Bot!
Frankie Latreille

The bot will prompt the user with yes or no questions that will be registered through annyang
(or typed to get over non chrome users), and answers with responsiveVoice with more
yes or no questions
*/

/**
to do:
√ make bot class with 3 faces (offline, listening, talking)
- setup aanyang to receive "yes" "no" or "I don't" ('get it' or 'know' or 'understand')
- setup responsiveVoice arrays for yesTangents and noTangents (SCRIPTING)
- have start state, middle state, after 3 responses (goodbye state?)
- have "I don't *" particular response higher pitch, red screen "Ooo I don't *whatever user said"
*/

"use strict";

let state = `Title`; // can be Title, Online, GoodNight
let bot = undefined;

let trigger = 0;

let botNegativeReply, botPositiveReply, botDontKnowReply;

let negativeTanArray = [`Cool story`];
let positiveTanArray = [`OK let me help you then`];

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

  if (annyang) { // *** I would like to drop this and permit users to type answers ***
    // annyang code in here
  }
  else {
    alert(`Sorry, this page requires speech recognition. Please use Chrome on a desktop computer.`);
  }

  responsiveVoice.setDefaultVoice("UK English Male");

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
  setTimeout(botIntro, 1500);
  trigger = 1;
}

if (trigger === 1){
  //annyang listening!
    let commands = {
      "yes *yeswtv": negativeTan,
      "no *nowtv": positiveTan,
      "I don't *wtv": dontKnow,};
    annyang.addCommands(commands);
    // annyang.start();
}

  }

}

function botIntro(){
  responsiveVoice.speak(`Hello, I am your general virtual assistant, here to serve you.
    Well, , do you need my help?`,
     ); // {onstart: botTalk, onend: botListen}
    setTimeout(annyang.start(), 5000);
}


function negativeTan(){
  botNegativeReply = random(negativeTanArray);
  responsiveVoice.speak(botNegativeReply);

console.log("NO NO NO");
}

function positiveTan(){
  botPositiveReply = random(positiveTanArray);
  responsiveVoice.speak(botPositiveReply);

console.log("YEA YEA YEA");
}

function dontKnow(){
  botDontKnowReply = `Oooo-oooo-oooo, I don't ${wtv}`;
  responsiveVoice.speak(botDontKnowReply, {pitch:2});

console.log("LOL");
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
