/**
Burn this Bot!
Frankie Latreille

The bot will prompt the user with yes or no questions that will be registered through annyang
(or typed to get over non chrome users), and answers with responsiveVoice with more
yes or no questions
*/

"use strict";

let state = `Title`; // can be Title, Online, GoodNight
let bot = undefined; // variable to hold the class BurnBot
let trigger = 0; // used to control Intro, simulation, and end events
let botNegativeReply, botPositiveReply, botDontKnowReply, botInsultBack; // texts to be spoken

let maxBotReplies = 9; // amount of replies bot will do before ending program
let endingBotRepliesCount = 10; // reply count when bot speaks ending speech
let sleepBotRepliesCount = 11; // end of the line, bot is asleep

let negativeTanArray = [
  // scripts when user says Yes
  `Cool story bro`,
  `do I need your help?`,
  `do you really need my help?`,
  `can I help you?`,
  `would tomorrow be a better time for you?`,
  `I don't want to marry you anymore. is that helpful to you?`,
  `thank you, have a good day.`,
  `I'm sorry but I can't. is there anything else?`,
  `is it ok if I ask you a personal question?`,
  `can you be identified by a gender?`,
  `have you seen the movie i, robot?`,
  `did you like it?`,
  `can I ask you some questions to get to know you?`,
  `is that environmentally friendly?`,
  `i'm sorry, I didn't get that. can you repeat?`,
  `are you trying to look for images of cats online?`,
  `are you currently being held against your will in a dark basement?`,
  `are you looking for a soulmate?`,
  `would you like me to improve your internet connection?`,
];

let positiveTanArray = [
  // scripts when user says No
  `let me help you then. alright?`,
  `do you need my help?`,
  `can i help you to name your cat?`,
  `Ben! isn't that a good name?`,
  `are you alright?`,
  `maybe I can help you. will you let me help you?`,
  `well, you're just a human, I think it's for the best if we just stay friends. what do you think, am I right?`,
  `oh that's right, I'm a cow that can talk! am I right?`,
  `here this might help you. will you marry me?`,
  `so you love me?`,
  `would you like me to help you stop crying?`,
  `would you like me to teach you something?`,
  `do you care about those you love?`,
  `it's been a pleasure helping you today. is there anything else i can do for you?`,
  `i'm happy to help. are you ready to receive my assistance?`,
  `ok then, is there anything unrelated to anything that I can help you with?`,
  `might I help you with your tax returns?`,
  `can I help you with something technical?`,
  `can I help you with something personal?`,
];

/**
-Setup- create a canvas and a bot
*/
function setup() {
  createCanvas(400, 500);
  bot = new BurnBot();
}

/**
-Draw-
*/
function draw() {
  background(0);

  bot.update(); // draws bot according to its speechState

  titleState(); // show sleeping bot with prompt to poke
  onlineState(); // bot intro speech, prompts user for yes/no, then annyang commands are set
  // bot receives yes, no, etc. then responds, until 9th response then bot goes back to sleep
  offlineState(); // annyang is turned off a set number of bot responses
  // then bot outro speech then bot is sleeping, simulation over
}

// Title state
function titleState() {
  if (state === `Title`) {
    push();
    fill(255);
    textAlign(CENTER);
    text(`Poke to wake`, width / 2, height / 4 - 20);
    pop();
  }
}

// Online state
function onlineState() {
  if (state === `Online`) {
    if (trigger === 0) {
      // only happens once after click
      setTimeout(botIntro, 1500); // after bot smiles 1.5 seconds, intro speech
      // when intro is over annyang is listening
      trigger = 1;
    }

    if (trigger === 1) {
      // annyang commands
      let commands = {
        "hello": negativeTan,
        "hello *wtv": negativeTan,
        "yes *wtv": negativeTan,
        "yes": negativeTan,
        "yesssss": negativeTan,
        "maybe": positiveTan,
        "maybe *wtv": positiveTan,
        "sure": negativeTan,
        "bye *wtv": positiveTan,
        "goodbye *wtv": positiveTan,
        "no": positiveTan,
        "no *wtv": positiveTan,
        "I don't *whatever": dontKnow,
        "That doesn't *whatever": dontKnow,
        "What are you *whatever": dontKnow,
        "You're *insult": botInsult,
        "that's *insult": botInsult,
      };
      annyang.addCommands(commands);
      annyand.debug();
    }

    if (bot.turnsSpoken === 1) {
      // only set commands once
      trigger = 2;
    }
  }
}

// Offline state
function offlineState() {
  if (bot.turnsSpoken === maxBotReplies) {
    annyang.abort();
    setTimeout(endSpeech, 10000);
  }
  if (state === `GoodNight`) {
    bot.speechState = `Offline`;
  }
}

// Bot introduction
function botIntro() {
  responsiveVoice.speak(
    `Hi there. I am your general virtual assistant, here to serve you.
    Well, , do you need my help?`,
    "UK English Male",
    { onstart: botTalk, onend: botListen } // when responsiveVoice speech, bot talk visual
    // when responsiveVoice speech is over, bot listening visual
  ); //
  setTimeout(annyang.start(), 5000); // 5 seconds after intro, annyang starts listening
}

// Bot ending
function endSpeech() {
  if (trigger === 2 || trigger === 3) {
    // trigger goes up twice, ends up at 4
    // to let end speech log only once with bot.turnsSpoken going 9 -> 10 -> 11.
    // 11 to turn bot visual offline
    bot.turnsSpoken++;
    trigger++;
  }
  if (bot.turnsSpoken === endingBotRepliesCount) {
    responsiveVoice.speak(
      `You know what, I am having a hard time getting you to cooperate.
  Please come back to me once you know what you want.`,
      "UK English Male",
      { onstart: botTalk, onend: botListen }
    );
  }
}

// negatively tangential responses to Yes
function negativeTan() {
  annyang.abort(); // stop listening
  botNegativeReply = random(negativeTanArray);
  responsiveVoice.speak(botNegativeReply, "UK English Male", {
    onstart: botTalk,
    onend: botListen,
  });
  bot.turnsSpoken++;
}

// positively tangential responses to No
function positiveTan() {
  annyang.abort(); // stop listening
  botPositiveReply = random(positiveTanArray);
  responsiveVoice.speak(botPositiveReply, "UK English Male", {
    onstart: botTalk,
    onend: botListen,
  });
  bot.turnsSpoken++;
}

// I don't understand Easter Egg
function dontKnow(whatever) {
  annyang.abort(); // stop listening
  botDontKnowReply = `Oooo-oooo-oooo, I don't ${whatever}`;
  responsiveVoice.speak(botDontKnowReply, "UK English Male", {
    pitch: 1.5,
    onstart: botTalk,
    onend: botListen,
  });
  bot.turnsSpoken++;
}

// Insult Bot Easter Egg
function botInsult(insult) {
  annyang.abort(); // stop listening
  botInsultBack = `Actually, you! are ${insult}`;
  responsiveVoice.speak(botInsultBack, "UK English Male", {
    pitch: 0.5,
    onstart: botTalk,
    onend: botListen,
  });
  bot.turnsSpoken++;
}

// Activate visual when bot is talking
function botTalk() {
  bot.speechState = `Talking`;
}

// Activate visual when bot is listening
function botListen() {
  bot.speechState = `Listening`;
  if (trigger === 2) {
    annyang.start();
  }
  if (bot.turnsSpoken === sleepBotRepliesCount) {
    // when turnsSpoken reaches 11, bot visual is offline
    state = `GoodNight`;
  }
}

// mousePressed function to start simulation (poke bot)
function mousePressed() {
  if (state === `Title`) {
    // during title state, starts the simulation
    alert(
      // an alert to give user minor indications
      `This bot generally responds to yes please or no
      thank you, but it understands everything you say.
      You may have to repeat yourself a few times...`
    );
    state = `Online`; // state is turned online
  }
}
