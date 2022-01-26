/**
Burn this Bot!
Frankie Latreille

The bot will prompt the user with yes or no questions that will be registered through annyang
(or typed to get over non chrome users), and answers with responsiveVoice with more
yes or no questions
*/

"use strict";

let state = `Title`; // can be Title, Online, GoodNight
let bot = undefined;

let trigger = 0;

//let whatever;
let botNegativeReply, botPositiveReply, botDontKnowReply, botInsultBack;

let negativeTanArray = [
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
  `what do you like the most about being human?`,
  `is that environmentally friendly?`,
  `i'm sorry, I didn't get that. can you repeat?`,
  `are you trying to look for images of cats online?`,
  `are you currently being held against your will in a dark basement?`,
  `are you looking for a soulmate?`,
];

let positiveTanArray = [
  `let me help you then. ok?`,
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
  `what do you like the most about human beings?`,
  `do you care about those you love?`,
  `it's been a pleasure helping you today. is there anything else i can do for you?`,
  `i'm happy to help. are you ready to receive my assistance?`,
  `ok then, is there anything unrelated to anything that I can help you with?`,
  `might I help you with your tax returns?`,
  `can I help you with something technical?`,
  `can I help you with something personal?`,
];

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(400, 500);

  // if (annyang) {
  //   // *** I would like to drop this and permit users to type answers ***
  //   // annyang code in here
  // } else {
  //   alert(
  //     `Sorry, this page requires speech recognition. Please use Chrome on a desktop computer.`
  //   );
  // }

  //responsiveVoice.setDefaultVoice("UK English Male");

  bot = new BurnBot();
}

/**
Description of draw()
*/
function draw() {
  background(0);

  bot.update();

  // if (responsiveVoice.isPlaying()){
  //   bot.speechState = `Talking`;
  // }

  if (state === `Title`) {
    push();
    fill(255);
    textAlign(CENTER);
    text(`Poke to wake`, width / 2, height / 4 - 20);
    pop();
  }

  if (state === `Online`) {
    if (trigger === 0) {
      setTimeout(botIntro, 1500);
      trigger = 1;
    }

    if (trigger === 1) {
      //annyang listening!
      let commands = {
        "hello": negativeTan,
        "hello *wtv": negativeTan,
        "yes *wtv": negativeTan,
        "yesssss": negativeTan,
        "maybe *wtv": positiveTan,
        "sure": negativeTan,
        "bye *wtv": positiveTan,
        "goodbye *wtv": positiveTan,
        "no *wtv": positiveTan,
        "I don't *whatever": dontKnow,
        "That doesn't *whatever": dontKnow,
        "What are you *whatever": dontKnow,
        "You're *insult": botInsult,
        "that's *insult": botInsult,
      };
      annyang.addCommands(commands);
      // annyang.start();
      annyang.debug();
    }

    if (bot.turnsSpoken === 1) {
      trigger = 2;
    }
  }

  if (bot.turnsSpoken === 9) {
    annyang.abort();
    setTimeout(endSpeech, 10000)
    }

  if (state === `GoodNight`) {
    bot.speechState = `Offline`;
  }
}

function botIntro() {
  responsiveVoice.speak(
    `Hi there. I am your general virtual assistant, here to serve you.
    Well, , do you need my help?`,
    "UK English Male",
    { onstart: botTalk, onend: botListen }
  ); //
  setTimeout(annyang.start(), 5000);
}

function endSpeech(){
  if (trigger === 2 || trigger === 3){
      bot.turnsSpoken++;
      trigger++;
  }
  if (bot.turnsSpoken === 10){
responsiveVoice.speak(
  `You know what, I am having a hard time getting you to cooperate.
  Please come back to me once you know what you want.`,
  "UK English Male",
  { onstart: botTalk, onend: botListen }
);
}}

function negativeTan() {
  annyang.abort();
  botNegativeReply = random(negativeTanArray);
  responsiveVoice.speak(botNegativeReply, "UK English Male", {
    onstart: botTalk,
    onend: botListen,
  });
  bot.turnsSpoken++;
  console.log("NO NO NO");
}

function positiveTan() {
  annyang.abort();
  botPositiveReply = random(positiveTanArray);
  responsiveVoice.speak(botPositiveReply, "UK English Male", {
    onstart: botTalk,
    onend: botListen,
  });
  bot.turnsSpoken++;
  console.log("YEA YEA YEA");
}

function dontKnow(whatever) {
  annyang.abort();
  botDontKnowReply = `Oooo-oooo-oooo, I don't ${whatever}`;
  responsiveVoice.speak(botDontKnowReply, "UK English Male", {
    pitch: 1.5,
    onstart: botTalk,
    onend: botListen,
  });
  bot.turnsSpoken++;
  console.log("LOL");
}

function botInsult(insult) {
  annyang.abort();
  botInsultBack = `Actually, you! are ${insult}`;
  responsiveVoice.speak(botInsultBack, "UK English Male", {
    pitch: 0.5,
    onstart: botTalk,
    onend: botListen,
  });
  bot.turnsSpoken++;
  console.log("LOL insult");
}

function botTalk() {
  bot.speechState = `Talking`;
  //annyang.pause();
  console.log(bot.speechState);
}

function botListen() {
  bot.speechState = `Listening`;
  if (trigger === 2) {
    annyang.start();
  }
  if (bot.turnsSpoken === 11) {
    state = `GoodNight`;
  }
  console.log(bot.speechState);
}

function mousePressed() {
  if (state === `Title`) {
    alert(
      `This bot generally responds to yes or no
      but it understands everything you say.
      You may have to repeat yourself a few times...`
    );
    state = `Online`;
    if (state === `Online`) {
      bot.speechState = `Listening`;
    }
  }
  if ((state = `Online`)) {
    console.log(bot.turnsSpoken);
  }
}
