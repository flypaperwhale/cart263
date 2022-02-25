/**
Fire Walk with Me // "Monkey Business"
Frankie Latreille

Reimagined scenes of David Lynch's Fire Walk with Me. Laura meets a trucker who wants
to pay her for sex work, she is sent into her subconscious where a woman tries to warn
her, and then continues her decent into Hell
*/

"use strict";

// scene intro images
let introLauraImg, introRoadBgImg, introThumbImg, introSkyImg;

// scene 1 images
let barBgImg,
  sc1LauraLightsUp,
  sc1LauraSmokes,
  sc1BusinessmanAcosts,
  sc1BusinessmanChats,
  sc1BusinessmanSmirks,
  sc1BusinessmanSnark;
// scene 2 images
let semiconsciousBgImg,
  sc2LauraImg,
  sc2LogLadyFrontImg,
  sc2LogLadySideImg,
  sc2LauraXLogLady,
  sc2LogLadyTouch1,
  sc2LogLadyTouch2;

// scene 3 images
let redRoomBgImg,
  sc3BobImg1,
  sc3BobImg2,
  sc3LauraHands,
  sc3LauraScreams,
  sc3RingImg;

let ringX = 410;
let ringY = 50;
let ringSize = 100;

// other images
let monkeyFaceImg, redRoomEntryImg, transitionSnowImg;

let snowDirectionsArray = [1, 2, 3, 4]; // up, down, left, right
let snowDirection = 1;

let currentVisualCue;
let snowTransition0Toggle;
let snowTransition1Toggle;
let snowTransition2Toggle;
let snowTransition3Toggle;
let snowTransition4Toggle;

let snowCover1Toggle;
let snowCover2Toggle;
let snowCover3Toggle;
let snowCover4Toggle;

let introSkyToggle;
let roadBGToggle;
let lauraIntroToggle;
let thumbUpToggle;
let monkeyFaceToggle;
let lauraLightToggle;
let lauraCigToggle;
let brettLeerToggle;
let brettSmirkToggle;
let brettSnideToggle;
let frontLogLadyToggle;
let lauraLookRToggle;
let logLadyLookLToggle;
let logXLauraToggle;
let sc2CloseUp1Toggle;
let sc2CloseUp2Toggle;
let bobChatToggle;
let bobRageToggle;
let lauraHandsToggle;
let theRingToggle;
let lauraScreamsToggle;
let noSnowToggle;
let noLauraToggle;
let noBobToggle;
let fadeoutToggle;
let noneToggle;
let barBgImgToggle = true;

let currentSoundCue;

let introMelody;
let highwaySound;
let rideStopsSound;
let sc1TransitionAccent;
let carDoorSound;
let accentSound;
let weirdAccent;
let redRoomTransitionTheme;
let bobLaughsSound;
let bobAttacksSound;

let lauraScreamsSound;
let snowSound;

let touchingRingToggle;

let currentVoice;
//let dontTakeTheRing;
let dontTakeTheRingVoiceToggle;

// states
let state = `Title`; // states are: Title, introAnimation, parkingLot,
// transitionAnimation, semiconscious, redRoom

// To store the loaded data
let data = undefined;
// The current scene (there's only one in the data, but this would be how you display different scenes)
let currentScene = `scene0`;
// The current line in the current scene (going through an array of dialog, so starts at 0)
let currentLine = 0;
// The height of our dialog box
let dialogHeight = 85;

/**
Loads the JSON data for our little play
*/
function preload() {
  data = loadJSON(`assets/data/dialog.json`);

  // load sounds
  introMelody = loadSound("assets/sounds/indianflute.mp3");
  sc1TransitionAccent = loadSound("assets/sounds/boom-intro.mp3");
  highwaySound = loadSound("assets/sounds/bythehighway.wav");
  rideStopsSound = loadSound("assets/sounds/hitchcarstops2.mp3");
  carDoorSound = loadSound("assets/sounds/stepoutcar2.mp3");
  accentSound = loadSound("assets/sounds/monkey-business-accent.mp3");
  weirdAccent = loadSound("assets/sounds/weirdaccent.wav");
  redRoomTransitionTheme = loadSound("assets/sounds/transition2RedRoom.wav");
  bobLaughsSound = loadSound("assets/sounds/bobLaugh.wav");
  bobAttacksSound = loadSound("assets/sounds/bobattacks.wav");
  lauraScreamsSound = loadSound("assets/sounds/lauraScream.mp3");
  snowSound = loadSound("assets/sounds/snow.wav");

  // introduction images
  introLauraImg = loadImage("assets/images/intro-scene/intro-laura.png");
  introRoadBgImg = loadImage("assets/images/intro-scene/intro-road.png");
  introThumbImg = loadImage("assets/images/intro-scene/intro-thumb.png");
  introSkyImg = loadImage("assets/images/intro-scene/intro-sky.png");
  // scene 1 images
  barBgImg = loadImage("assets/images/scene-1/bar-bg1.png");
  sc1LauraLightsUp = loadImage("assets/images/scene-1/lauralights.png");
  sc1LauraSmokes = loadImage("assets/images/scene-1/lauracig.png");
  sc1BusinessmanAcosts = loadImage("assets/images/scene-1/licksbrett.png");
  sc1BusinessmanChats = loadImage("assets/images/scene-1/neutbrett.png");
  sc1BusinessmanSmirks = loadImage("assets/images/scene-1/brettsmirk.png");
  sc1BusinessmanSnark = loadImage("assets/images/scene-1/brettsnark.png");
  // scene 2 images
  semiconsciousBgImg = loadImage("assets/images/scene-2/semiconscious-bg.png");
  sc2LauraImg = loadImage("assets/images/scene-2/laurastand.png");
  sc2LogLadyFrontImg = loadImage("assets/images/scene-2/loglady.png");
  sc2LogLadySideImg = loadImage("assets/images/scene-2/logladystand.png");
  sc2LauraXLogLady = loadImage("assets/images/scene-2/logladytouchlaura.png");
  sc2LogLadyTouch2 = loadImage("assets/images/scene-2/sc2-laura1.png");
  sc2LogLadyTouch1 = loadImage("assets/images/scene-2/sc2-laura2.png");
  // scene 3 images
  redRoomBgImg = loadImage("assets/images/scene-3/redroom-bg.png");
  sc3BobImg2 = loadImage("assets/images/scene-3/bob1.png");
  sc3BobImg1 = loadImage("assets/images/scene-3/bob2.png");
  sc3LauraHands = loadImage("assets/images/scene-3/laurahands.png");
  sc3LauraScreams = loadImage("assets/images/scene-3/laurascreams.png");
  sc3RingImg = loadImage("assets/images/scene-3/ringpixed.png");
  // other images
  monkeyFaceImg = loadImage("assets/images/intro-scene/monkeyface.png");
  redRoomEntryImg = loadImage("assets/images/scene-3/redroom-entry.png");
  transitionSnowImg = loadImage("assets/images/transitionSnow.png");
}

/**
Creates the canvas
*/
function setup() {
  createCanvas(600, 400);

  snowTransition0Toggle = true;
  setInterval(snowTransition, 100);
}

/**
Displays the current line
*/
function draw() {
  background(0);
  //console.log(snowTransitionToggle);

  displaySnow(255, 255);

  if (state === `Title`) {
    push();
    textSize(24);
    fill(230, 220, 220);
    textAlign(CENTER, CENTER);
    text(
      `Fire Walk with Me
      Press space for simulation`,
      250,
      200
    );
    pop();
  }

  if (state === `introAnimation`) {
    // show background image

    if (currentSoundCue === "introMelody") {
      //play monkey intro song once
      // push();
      // introMelody.playMode("untilDone");
      // introMelody.play();
      // pop();
      currentSoundCue = undefined;
      push();
      textSize(24);
      fill(230, 220, 220);
      textAlign(CENTER, CENTER);
      text(
        `Fire Walk with Me
        Click forward`,
        250,
        200
      );
      pop();
    }
    if (currentVisualCue === "introSkyImg") {
      // turn snow off
      snowTransition0Toggle = false;
      introSkyToggle = true;
      // Sky background

      if (currentSoundCue === "highwaySound") {
        //  play monkey intro song once
        push();
        highwaySound.playMode("untilDone");
        highwaySound.play();
        pop();
        currentSoundCue = undefined;
      }
    } else if (currentVisualCue === "roadBG") {
      // Road background
      lauraIntroToggle = false;
      roadBGToggle = true;
    } else if (currentVisualCue === "lauraIntro") {
      // Laura close up
      thumbUpToggle = false;
      lauraIntroToggle = true;
    } else if (currentSoundCue === "snowSound") {
      //play monkey intro song once
      // push();
      // snowSound.duration(1);
      // snowSound.playMode("untilDone");
      // snowSound.play();
      // pop();
    } else if (currentVisualCue === "snowCover1") {
      snowCover1Toggle = true;
    } else if (currentVisualCue === "thumbUp") {
      // Thumb close up
      lauraIntroToggle = false;
      thumbUpToggle = true;
    } else if (currentSoundCue === "accentSound") {
      push();
      accentSound.playMode("untilDone");
      accentSound.play();
      pop();
      currentSoundCue = undefined;
    } else if (currentVisualCue === "monkeyFace") {
      // prompt player for name and flash monkey
      monkeyFaceToggle = true;
    } else if (currentVisualCue === "noSnow") {
      monkeyFaceToggle = false;
      snowCover1Toggle = false;
    } else if (currentVisualCue === "fadeout") {
      roadBGToggle = false;
      fadeoutToggle = true;
    }

    // let userName = "jane";
    if (currentVoice === "dontTakeTheRing") {
      //RESPONSIVE VOICE
      dontTakeTheRingVoiceToggle = true;
    }

    if (currentSoundCue === "rideStopsSound") {
      console.log("so come here!");
      // push();
      // rideStopsSound.playMode("untilDone");
      // rideStopsSound.play();
      // pop();
      // currentSoundCue = undefined;
    }
    // overlay redroom and read player name backwards

    // Sky background
    if (introSkyToggle === true) {
      image(introSkyImg, 0, 0, canvas.width - 600, canvas.height - 350, 0, 50);
    } else {
    }

    if (roadBGToggle === true) {
      image(introRoadBgImg, 0, 0, canvas.width - 500, canvas.height - 375);
    } else {
    }
    if (lauraIntroToggle === true) {
      image(introLauraImg, 0, 0, canvas.width - 570, canvas.height - 400);
    } else {
    }
    if (thumbUpToggle === true) {
      image(introThumbImg, 0, 0, canvas.width - 500, canvas.height - 375);
    } else {
    }
    if (snowCover1Toggle === true) {
      displaySnow(255, 100);
    } else {
    }
    if (monkeyFaceToggle === true) {
      push();
      imageMode(CENTER);
      tint(255, 195);
      image(monkeyFaceImg, width / 2 + 15, height / 2 - 20, 600, 500);
      pop();
    } else {
    }
    if (fadeoutToggle === true) {
      push();
      rectMode(CENTER);
      fill(0);
      rect(width / 2, height / 2, width, height);
      pop();
      setTimeout(switchStateToSc1, 2000);
    } else {
    }

    if (dontTakeTheRingVoiceToggle === true) {
      console.log(`what color is ${currentVoice}`);
      dontTakeTheRingVoiceToggle = false;
      responsiveVoice.speak(
        "Don't take the ring Anna. Don't take the ring",
        "Hindi Male",
        {
          pitch: 1.1,
          rate: 0.55,
          volume: 1,
        }
      );
      currentVoice = undefined;
      nextLine();
    }

    // show dialog
    manipBlockingData();
  }

  if (state === `parkingLot`) {
    // show background image
    if (barBgImgToggle === true) {
      // Bar parking background
      image(barBgImg, 0, 0, canvas.width - 600, canvas.height - 400);
    }
    if (currentSoundCue === "carDoorSound") {
      push();
      carDoorSound.playMode("untilDone");
      carDoorSound.play();
      pop();
      currentSoundCue = undefined;
    }
    // if (visualCueToggle === true) {
    if (currentVisualCue === "noSnow") {
      // snowTransition0Toggle = false;
      fadeoutToggle = false;
      roadBGToggle = false;
    }
    if (currentVisualCue === "lauraLight") {
      fadeoutToggle = false;
      // Laura lights up
      lauraLightToggle = true;
    } else if (currentVisualCue === "lauraCig") {
      // Laura smokes
      lauraLightToggle = false;
      lauraCigToggle = true;
    } else if (currentVisualCue === "brettLeer") {
      // Leering businessman approaches
      brettLeerToggle = true;
      console.log(brettLeerToggle);
    } else if (currentVisualCue === "noLaura") {
      brettLeerToggle = false;
      brettSmirkToggle = true;
      lauraCigToggle = false;
    } else if (currentVisualCue === "brettSmirk") {
      // Businessman smirks
      brettSnideToggle = false;
      lauraCigToggle = false;
      brettLeerToggle = false;
      brettSmirkToggle = true;
    } else if (currentSoundCue === "accentSound") {
      push();
      accentSound.playMode("untilDone");
      accentSound.play();
      pop();
      currentSoundCue = undefined;
    } else if (currentVisualCue === "brettSnide") {
      // Businessman sniding (? in another 4th scene?)
      snowCover2Toggle = false;
      brettSmirkToggle = false;
      brettSnideToggle = true;
    }
    //}
    if (currentVisualCue === "snowCover2") {
      snowCover2Toggle = true;
    } else if (currentSoundCue === "sc1TransitionAccent") {
      push();
      sc1TransitionAccent.playMode("untilDone");
      sc1TransitionAccent.play();
      pop();
      currentSoundCue = undefined;
    } else if (currentVisualCue === "snowTransition1") {
      snowTransition1Toggle = true;
      snowCover3Toggle = true;
      //snowTransition2Toggle = true;
      brettSmirkToggle = false;
      barBgImgToggle = false;
      setTimeout(switchStateToSc2, 1500);
    } else if (currentVisualCue === "endFadeout") {
      // roadBGToggle = false;
      fadeoutToggle = true;
    }

    if (lauraLightToggle === true) {
      image(
        sc1LauraLightsUp,
        50,
        101,
        canvas.width - 1000,
        canvas.height - 500
      );
    } else {
    }
    if (lauraCigToggle === true) {
      image(sc1LauraSmokes, 50, 100, canvas.width - 1000, canvas.height - 500);
    } else {
    }
    if (brettLeerToggle === true) {
      image(
        sc1BusinessmanAcosts,
        320,
        115,
        canvas.width - 910,
        canvas.height - 600
      );
    } else {
    }
    if (brettSmirkToggle === true) {
      image(
        sc1BusinessmanSmirks,
        320,
        115,
        canvas.width - 950,
        canvas.height - 600
      );
    } else {
    }
    if (brettSnideToggle === true) {
      image(
        sc1BusinessmanSnark,
        310,
        115,
        canvas.width - 880,
        canvas.height - 580
      );
    } else {
    }
    if (snowCover2Toggle === true) {
      displaySnow(255, 100);
    } else {
    }
    if (snowTransition1Toggle === true) {
      displaySnow(255, 255);
    } else {
    }
    if (fadeoutToggle === true) {
      push();
      rectMode(CENTER);
      fill(0);
      rect(width / 2, height / 2, width, height);
      pop();
      setTimeout(switchStateToSc1, 2000);
    } else {
    }

    // show dialog
    manipBlockingData();
  }

  if (state === `semiconscious`) {
    // show background image
    // Bar parking background
    //image(barBgImg, 0, 0, canvas.width - 600, canvas.height - 400);
    // Semicounscious eerie background
    image(semiconsciousBgImg, 0, 0, canvas.width - 600, canvas.height - 400);

    if (currentVisualCue === "noSnow") {
      snowCover2Toggle = false;
      snowCover3Toggle = false;
      snowTransition1Toggle = false;
      //snowTransition2Toggle = false;
      roadBGToggle = false;
    }
    if (currentVisualCue === "frontLogLady") {
      // Loglady stands alone
      frontLogLadyToggle = true;
    } else if (currentVisualCue === "lauraLookR") {
      // Laura facing right
      frontLogLadyToggle = false;
      lauraLookRToggle = true;
    } else if (currentVisualCue === "logLadyLookL") {
      // Loglady facing left
      logLadyLookLToggle = true;
    } else if (currentVisualCue === "logXLaura") {
      lauraLookRToggle = false;
      logLadyLookLToggle = false;
      logXLauraToggle = true;
      // Loglady touching Laura
    } else if (currentVisualCue === "sc2CloseUp1") {
      sc2CloseUp1Toggle = true;
      // Laura touched closeup 1
    } else if (currentVisualCue === "sc2CloseUp2") {
      sc2CloseUp2Toggle = true;
      // Laura touched closeup 2
    } else if (currentVisualCue === "snowTransition2") {
      snowTransition2Toggle = true;
      snowCover4Toggle = true;
      bobChatToggle = true;
      setTimeout(switchStateToSc3, 1000);
    } else if (currentSoundCue === "redRoomTransitionTheme") {
      push();
      redRoomTransitionTheme.playMode("untilDone");
      redRoomTransitionTheme.play();
      pop();
      currentSoundCue = undefined;
    } else if (currentVisualCue === "snowCover3") {
      snowCover3Toggle = true; // transparency
    }

    if (frontLogLadyToggle === true) {
      image(
        sc2LogLadyFrontImg,
        130,
        130,
        canvas.width - 780,
        canvas.height - 530
      );
    }
    if (lauraLookRToggle === true) {
      image(sc2LauraImg, 50, 101, canvas.width - 1020, canvas.height - 520);
    } else {
    }
    if (logLadyLookLToggle === true) {
      image(
        sc2LogLadySideImg,
        350,
        101,
        canvas.width - 1020,
        canvas.height - 520
      );
    } else {
    }
    if (logXLauraToggle === true) {
      image(
        sc2LauraXLogLady,
        130,
        120,
        canvas.width - 830,
        canvas.height - 520
      );
    } else {
    }
    if (sc2CloseUp1Toggle === true) {
      image(sc2LogLadyTouch1, 0, 0, canvas.width - 600, canvas.height - 400);
    } else {
    }
    if (sc2CloseUp2Toggle) {
      image(sc2LogLadyTouch2, 0, 0, canvas.width - 600, canvas.height - 400);
    } else {
    }
    if (snowCover3Toggle === true) {
      displaySnow(255, 100);
    } else {
    }
    if (snowTransition2Toggle === true) {
      displaySnow(255, 255);
    } else {
    }
    // show dialog
    manipBlockingData();
  }

  if (state === `redRoom`) {
    // show background image
    // redroom entryway
    //image(redRoomEntryImg, 0, 0, canvas.width - 600, canvas.height - 450);

    // redroom background
    image(redRoomBgImg, 0, 0, canvas.width - 550, canvas.height - 400);

    // if (currentVisualCue === "noSnow") {
    //   snowTransition2Toggle = false;
    //   sc2CloseUp2Toggle = false;
    // }
    if (currentVisualCue === "noSnow") {
      snowCover3Toggle = false;
      snowCover4Toggle = false;
      snowTransition2Toggle = false;
      //snowTransition2Toggle = false;
      //roadBGToggle = false;
    } else if (currentSoundCue === "bobLaughsSound") {
      push();
      bobLaughsSound.playMode("untilDone");
      bobLaughsSound.play();
      pop();
      currentSoundCue = undefined;
    } else if (currentVisualCue === "noLaura") {
      lauraHandsToggle = false;
    } else if (currentVisualCue === "bobChat") {
      // Bob chat
      bobChatToggle = true;
    } else if (currentVisualCue === "bobRage") {
      // Bob excited rage
      bobChatToggle = false;
      bobRageToggle = true;
    } else if (currentVisualCue === "lauraHands") {
      // Laura looks at hand
      bobRageToggle = false;
      lauraHandsToggle = true;
    } else if (currentVisualCue === "theRing") {
      // The ring
      lauraHandsToggle = false;
      theRingToggle = true;
    } else if (currentVisualCue === "lauraScreams") {
      // Laura screaming
      theRingToggle = false;
      lauraScreamsToggle = true;
    }

    if (currentSoundCue === "accentSound") {
      push();
      accentSound.playMode("untilDone");
      accentSound.play();
      pop();
      currentSoundCue = undefined;
    }

    let d = dist(mouseX, mouseY, ringX + 45, ringY + 45); // check distance between tip of Hermes staff and spirit
    if (theRingToggle === true && d < ringSize / 2) {
      console.log("yes, you're in");
      // you are touching ring
      touchingRingToggle = true;
      // change scene to
    } else {
      touchingRingToggle = false;
    }

    if (currentVisualCue === "monkeyFace") {
      push();
      imageMode(CENTER);
      tint(255, 150);
      //image(monkeyFaceImg, width / 2 + 15, height / 2 - 20, 600, 500);
      pop();
    } else if (currentVisualCue === "snowTransition3") {
      snowTransition3Toggle = true;
      snowCover2Toggle = true;
      setTimeout(switchStateToSc4, 1000);
    } else if (currentVisualCue === "snowCover4") {
      snowCover4Toggle = true;
      //snowTransitionToggle = true;
    }

    if (bobChatToggle === true) {
      image(sc3BobImg1, 130, 65, canvas.width - 850, canvas.height - 550);
    } else {
    }
    if (bobRageToggle === true) {
      image(sc3BobImg2, 297, 65, canvas.width - 900, canvas.height - 550);
    } else {
    }
    if (lauraHandsToggle === true) {
      image(sc3LauraHands, 100, 10, canvas.width - 800, canvas.height - 450);
    } else {
    }
    if (theRingToggle === true) {
      image(sc3RingImg, ringX, ringY, canvas.width - 1100, canvas.height - 700);
      console.log(
        `canvasW - 1100 ${canvas.width - 1100} canvasH - 700 ${
          canvas.height - 700
        }`
      );
    } else {
    }
    if (lauraScreamsToggle === true) {
      image(sc3LauraScreams, 20, -20, canvas.width - 600, canvas.height - 400);
    } else {
    }

    if (snowCover4Toggle === true) {
      displaySnow(255, 100);
    } else {
    }
    if (snowTransition3Toggle === true) {
      displaySnow(255, 255);
    } else {
    }
    // The angel (?)

    // show dialog
    manipBlockingData();
  }
}

function switchStateToSc1() {
  if (state === `introAnimation`) {
    state = `parkingLot`;
  }
}
function switchStateToSc2() {
  if (state === `parkingLot`) {
    state = `semiconscious`;
  }
}
function switchStateToSc3() {
  if (state === `semiconscious`) {
    state = `redRoom`;
  }
}
function switchStateToSc4() {
  if (state === `redRoom`) {
    barBgImgToggle = true;
    state = `parkingLot`;
  }
}

function displaySnow(gray, alpha) {
  // display snow //
  //console.log(`in displaySnow gray = ${gray} and alpha = ${alpha}`);

  if (
    snowTransition0Toggle === true ||
    snowTransition1Toggle === true ||
    snowTransition2Toggle === true ||
    snowTransition3Toggle === true ||
    snowTransition4Toggle === true ||
    snowCover1Toggle === true ||
    snowCover2Toggle === true ||
    snowCover3Toggle === true ||
    snowCover4Toggle === true
  ) {
    push();
    imageMode(CENTER);
    if (snowDirection === 1) {
      scale(1, 1);
    } else if (snowDirection === 2) {
      scale(1, -1);
    } else if (snowDirection === 3) {
      scale(-1, 1);
    } else if (snowDirection === 4) {
      scale(-1, -1);
    }
    tint(gray, alpha);
    image(transitionSnowImg, 0, 0, canvas.width, canvas.height);
    pop();
  } else if (
    snowTransition0Toggle === false ||
    snowTransition1Toggle === false ||
    snowTransition2Toggle === false ||
    snowTransition3Toggle === false ||
    snowTransition4Toggle === false ||
    snowCover1Toggle === false ||
    snowCover2Toggle === false ||
    snowCover3Toggle === false ||
    snowCover4Toggle === false
  ) {
    //do nothing
  }
}

function snowTransition() {
  let currentSnowDirection = snowDirection;
  snowDirection = random(snowDirectionsArray); // have snow change direction randomly for visual effect
  if (currentSnowDirection === snowDirection) {
    snowDirection = random(snowDirectionsArray); // have snow change direction randomly for visual effect
  }
}

/**
Uses the dialog and character data to display a dialog box
colored and labelled by character and with the current line
displayed in it.
*/
function manipBlockingData() {
  // ### CHANGE NAME BLOCKING ###
  // Get the current scene and line data object
  // NOTE: Notice how we can use *variables* to choose
  // a property in an object like data.dialog! This gives
  // us a lot of flexibility because we can store the property
  // name we want in a variable and change it (like the current
  // scene name!)
  let lineData = data.blocking[currentScene][currentLine];
  // Get the data for the character who is speaking, note
  // we're using the same trick of a variable containing the
  // property name corresponding to our character

  // based on type, manipulat line differently
  if (lineData.type === "dialog") {
    currentVisualCue = lineData.image;
    let characterData = data.characters[lineData.character];

    // DIALOG //
    /* Laura's dialog should appear from the left (POV)
whereas dialog from interlocutors should arrive from the right side
*/
    // Draw the dialog background
    push();
    noStroke();
    //fill(characterData.backgroundColor);
    fill(230, 220, 220);
    rect(0, height - dialogHeight, width, dialogHeight);
    pop();

    // Display the character name
    push();
    textSize(24);
    fill(255, 0, 0);
    //fill(230, 220, 220);
    textAlign(LEFT, BOTTOM);
    text(
      characterData.name,
      characterData.nameXPosition,
      height - dialogHeight
    );
    pop();

    // Display the character's line
    push();
    textSize(16);
    fill(0);
    textAlign(LEFT, TOP);
    // characterData.dialogXposition?
    text(lineData.dialog, 10, height - dialogHeight + 5, width, dialogHeight);
    pop();
  } else if (lineData.type === "sound cue") {
    // do sound cue thing
    currentSoundCue = lineData.sound;

    //manipulate current sound right away
    console.log(`what is currentSoundCue ? ${currentSoundCue}`);
  } else if (lineData.type === "visual cue" || lineData.type === "listen") {
    // so visual cue thing
    //imageCueToggle = true;
    currentVisualCue = lineData.image;
    console.log(`what is currentVisualCue ? ${currentVisualCue}`);
  }
  if (lineData.type === "spoken") {
    //user cannot click to advance anymore
    currentVoice = lineData.image;
    console.log(`what is currentVoice ? ${currentVoice}`);
  }
  if (lineData.type === "listen") {
    //user cannot click to advance anymore
  }
}

/**
Goes to the next line in the "play"
*/
/* may want to have user press the dialog box to move to next piece,
or a NEXT button... have user feel they are responding as Laura...
*/

function mousePressed() {
  //else {
  if (touchingRingToggle === true) {
    //switch to scene 5
    console.log("so what?");
  } else {
    nextLine();
  }
}

/**
Iterates through the array, returns to 0 at the end, but you
would probably want to change to the next scene etc.
*/
/* I don't want to have the dialog repeat when the data.dialog[currentScene].length
reaches last object in the array...
I would rather when the last object in the array is reached
-> for a symbol to prompt the user to speak
depending on what the user says,
either what they've been told to say
or something they've been hinted into saying
they will enter a new scene!
*/
function nextLine() {
  currentLine++;
  if (currentLine >= data.blocking[currentScene].length) {
    if (currentScene === "scene0") {
      currentScene = "scene1";
    } else if (currentScene === "scene1") {
      // currentLine = 0;
      currentScene = "scene2";
    } else if (currentScene === "scene2") {
      // currentLine = 0;
      currentScene = "scene3";
    } else if (currentScene === "scene3") {
      // currentLine = 0;
      currentScene = "scene4";
    } else if (currentScene === "scene4") {
      alert("the end");
      currentScene = undefined;
    }
    currentLine = 0;
  }
}

/**
Switch to scene two on a keypress, just to show the very
beginnings of multiple scenes.
*/
/* ##### Scenes are going to change after the user speaks a response (annyang)
when the last dialog piece has been said...
currentScene = `scene2`;
currentLine = 0;
*/
function keyPressed() {
  if (keyCode === 32) {
    state = `introAnimation`;
  }
  if (keyCode === 81) {
    console.log(`in displaySnow snowTransition0Toggle = ${snowTransition0Toggle}
      snowTransition1Toggle = ${snowTransition1Toggle}
      snowTransition2Toggle = ${snowTransition2Toggle}
      snowTransition3Toggle = ${snowTransition3Toggle}
      snowTransition0Toggle = ${snowTransition4Toggle}`);
    console.log(`
        snowCover1Toggle = ${snowCover1Toggle}
        snowCover2Toggle = ${snowCover2Toggle}
        snowCover3Toggle = ${snowCover3Toggle}
        snowCover4Toggle = ${snowCover4Toggle}`);
  }
}
