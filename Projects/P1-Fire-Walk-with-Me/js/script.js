/**
"Monkey Business" / a program based on David Lynch's Fire Walk with Me //
Frankie Latreille

Reimagined scenes of David Lynch's Fire Walk with Me. Laura meets a man on a business trip
who wants to pay her for sex work, she is sent into her subconscious where a woman tries to
warn her, and then continues her descent into Hell
*/

"use strict";

// states // ### settings ###
let state = `Title`; // states are: Title, introAnimation, parkingLot,
// transitionAnimation, semiconscious, redRoom, parkingLotReprise

// The current scene
let currentScene = `scene0`;
// The current line in the current scene (going through an array of blocking, so starts at 0)
let currentLine = 0;
// The height of our dialog box
let dialogHeight = 85;

// visual cue variables //
let currentVisualCue;
// sound cue variables //
let currentSoundCue;
// current Voice Cues for ResponsiveVoice //
let currentVoice;
let dontTakeTheRingVoiceToggle;
let bobHasYouVoiceToggle;
// current Listener for annyang events //
let currentListener;

// snowTransition visual cues //
// 0- start of program
let snowTransition0Toggle;
// Transition 1- between sc1 and sc2
let snowTransition1Toggle;
// Transition 2- between sc2 and sc3
let snowTransition2Toggle;
// Transition 3- between sc3 and sc4
let snowTransition3Toggle;
// Transition 4- between sc3 and sc2
//let snowTransition4Toggle; // ###

// snow Cover visual cues //
// cover 1- during intro Listen askName
let snowCover1Toggle;
// cover 2- during sc1 for Listen sayAllTheWay + sc1/sc2 transition
let snowCover2Toggle;
// cover 3- sc1 transition/open sc2 + for Listen sayBOBIsReal
let snowCover3Toggle;
// cover 4- sc2 transition/open sc3 + for Listen callForHelp
let snowCover4Toggle;
// cover 5- sc3 transition/open sc4 #####
let snowCover5Toggle;

// variables to animate snow Img
let snowDirectionsArray = [1, 2, 3, 4]; // up, down, left, right
let snowDirection = 1;

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
// other images
let monkeyFaceImg, redRoomEntryImg, transitionSnowImg;

// Image toggles //
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
let barBgImgToggle = true; // starts true, appears when state/setting changed
// from intro to scene1

// Sounds
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

// if true, mouse can be clicked. if false, mouse is paused
let mouseToggle = false;

// Switches //
// switch0-
let switch0 = 0;
// switch1- intro monkey face
let switch1 = 0;
// switch2- intro accent sound
let switch2 = 0;
// switch3- transition from sc1 to sc2
let switch3 = 0;
// switch4- transition from sc2 to sc3
let switch4 = 0;
// switch5- sc2/sc3 bob laughs
let switch5 = 0;
// switch6- intro snowCover1
let switchA = 0;
// switch7- sc1 snowCover2
let switchB = 0;
// switch8- sc2 snowCover3
let switchC = 0;
// switch9- sc3 snowCover4
let switchD = 0;

// // switch10-
// let switchE = 0; ###

// switch11- sc5 Laura screams image
let switchF = 0;
// switch12- sc5 Laura screams sound
let switchG = 0;

// switch13- sc4 no snow
let switchX = 0;

// ring properties so that image can be clicked
let ringX = 410;
let ringY = 50;
let ringSize = 100;

// toggle for if ring is touched or not
let touchingRingToggle;
let ringIsClicked = false;

// variable to load annyang response to askName
let userName;

// To store the loaded data
let data = undefined;

/**
Loads the JSON data to use the blocking to manipulate audio visuals
load sounds and images
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
  snowSound = loadSound("assets/sounds/snowbit.mp3");
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
Creates the canvas, sets commands for annyang, intervals set for tv snow animation
*/
function setup() {
  createCanvas(600, 400);

  let commands = {
    //intro listen
    "my name is *userName": listenNextLine1,
    //sc1 listen
    "I'm going to go all the way": listenNextLine,
    "I'm going to go all of the way": listenNextLine,
    //sc2 listen
    "BOB is real": listenNextLine,
    //sc3 listen
    help: listenNextLine3,
    "help me": listenNextLine3,
    "somebody help me": listenNextLine3,
    "someone help": listenNextLine3,
    "I need help": listenNextLine3,
    "can somebody help me?": listenNextLine3,
    "can anybody help me?": listenNextLine3,
  };
  //console.log(commands);
  annyang.addCommands(commands);
  //annyang.debug();

  // toggle snow transition0 true for starting visuals
  snowTransition0Toggle = true;
  // snowDirection changes every second
  setInterval(snowTransitionAnimate, 100);
}

// this function selects random directions for the snow img which animates it
function snowTransitionAnimate() {
  let currentSnowDirection = snowDirection;
  snowDirection = random(snowDirectionsArray); // have snow change direction randomly for visual effect
  if (currentSnowDirection === snowDirection) {
    snowDirection = random(snowDirectionsArray); // have snow change direction randomly for visual effect
  }
}

/**
Draw displays the current line in the blockingData
depending on what "type" the block line is different effects

dialog - changes dialog, is displayed at the bottom of screen
visual cue - changes images
sound cue - plays a sound
spoken cue (responsivevoice) - speaks a line of dialog
listen cue (annyang) - listens for user input
*/
function draw() {
  background(0);

  // intial display of snow
  displaySnow(255, 255);

  // when state is Title
  if (state === `Title`) {
    // display opening text
    push();
    textSize(24);
    fill(230, 220, 220);
    textAlign(CENTER, CENTER);
    text(
      `Based on Fire Walk with Me
      Press space for simulation`,
      250,
      200
    );
    pop();
  }

  // when state is introAnimation
  if (state === `introAnimation`) {
    // intro CUES //
    // snowSound sound cue
    if (currentSoundCue === "snowSound") {
      // display title text
      push();
      textSize(24);
      fill(230, 220, 220);
      textAlign(CENTER, CENTER);
      text(
        `Monkey Business
        Click forward`,
        250,
        200
      );
      pop();
      // play snow sound
      push();
      snowSound.playMode("untilDone");
      snowSound.play();
      pop();
      currentSoundCue = undefined; // play snow sound once
      mouseToggle = true; // mouse is on!
    }
    // Sky background visual cue
    if (currentVisualCue === "introSkyImg") {
      snowTransition0Toggle = false; // turn snow off
      introSkyToggle = true;
    }
    // highway sound cue
    if (currentSoundCue === "highwaySound") {
      push();
      highwaySound.playMode("untilDone");
      highwaySound.play();
      pop();
      currentSoundCue = undefined; // play highway sound only once
    }
    // road background visual cue
    if (currentVisualCue === "roadBG") {
      // Road background
      lauraIntroToggle = false; // hide laura intro when coming back to road
      roadBGToggle = true;
    }
    // Thumb close up visual cue
    if (currentVisualCue === "thumbUp") {
      lauraIntroToggle = false; // hide laura's intro image
      thumbUpToggle = true;
    }
    // lauraIntro visual cue
    if (currentVisualCue === "lauraIntro") {
      // Laura close up
      thumbUpToggle = false; // hide thumb up
      lauraIntroToggle = true;
    }
    // snowCover1 visual cue
    if (currentVisualCue === "snowCover1") {
      snowCover1Toggle = true;
      if (switchA === 0) {
        // automatically changes line because mouse is paused
        setTimeout(nextLine, 500);
        switchA = 1;
      }
    }
    // monkey face visual cue
    if (currentVisualCue === "monkeyFace") {
      // flash monkey when prompt player for name
      monkeyFaceToggle = true;
    }
    // intro accent sound cue
    if (currentSoundCue === "accentSound") {
      push();
      accentSound.playMode("untilDone");
      accentSound.play();
      pop();
      if (switch2 === 0) {
        // automatically changes line
        setTimeout(nextLine, 1000);
        switch2 = 1;
      }
      currentSoundCue = undefined; // plays sound only once
    }
    // intro no snow visual cue
    if (currentVisualCue === "noSnow") {
      monkeyFaceToggle = false; // turn off monkey face
      snowCover1Toggle = false; // turn off snow cover 1
      mouseToggle = true; // mouse back on!
    }
    // intro spoken cue RESPONSIVE VOICE
    if (currentVoice === "dontTakeTheRing") {
      dontTakeTheRingVoiceToggle = true;
    }
    // intro fadeout visual cue
    if (currentVisualCue === "fadeout") {
      roadBGToggle = false; // hide road background
      fadeoutToggle = true;
    }

    // TOGGLED blocked cues - in correct layers for accurate display //
    // Sky background toggle TRUE
    if (introSkyToggle === true) {
      image(introSkyImg, 0, 0, canvas.width - 600, canvas.height - 350, 0, 50);
    }
    // road background toggle TRUE
    if (roadBGToggle === true) {
      image(introRoadBgImg, 0, 0, canvas.width - 500, canvas.height - 375);
    }
    // thumb img toggle TRUE
    if (thumbUpToggle === true) {
      image(introThumbImg, 0, 0, canvas.width - 500, canvas.height - 375);
    }
    // laura intro img toggle TRUE
    if (lauraIntroToggle === true) {
      image(introLauraImg, 0, 0, canvas.width - 570, canvas.height - 400);
    }

    // ANNYANG ask user for their name
    // display ask in white font in red bar seen below snowCover1
    if (currentListener === "askName") {
      mouseToggle = false;
      push();
      fill(255, 0, 0);
      rectMode(CENTER);
      rect(canvas.width / 4, 330, canvas.width / 2, 80);
      fill(255);
      textAlign(CENTER, CENTER);
      text("SPEAK: My name is _________.", canvas.width / 4, 330);
      pop();
      //ANNYANG
      annyang.start();
    }

    // snow cover1 toggle TRUE
    if (snowCover1Toggle === true) {
      mouseToggle = false; // mouse is paused
      displaySnow(255, 100); // have it be transparent
    }
    // monkey face toggle TRUE
    if (monkeyFaceToggle === true) {
      push();
      imageMode(CENTER);
      tint(255, 195);
      image(monkeyFaceImg, width / 2 + 15, height / 2 - 20, 600, 500);
      pop();
    }
    // dual monkeyFaceToggle to achieve monkey visibility for a bit longer
    if (monkeyFaceToggle === true && switch1 === 0) {
      setTimeout(nextLine, 500); // automatically change lines
      switch1 = 1;
    }

    // RESPONSIVEVOICE Warning!
    if (dontTakeTheRingVoiceToggle === true) {
      dontTakeTheRingVoiceToggle = false; // so this only happens once
      responsiveVoice.speak(
        "Don't take the ring Laura. Don't take the ring",
        "Hindi Male",
        {
          pitch: 1.1,
          rate: 0.55,
          volume: 1,
        }
      );
      currentVoice = undefined; // fail safe?
      nextLine();
    }

    // fadeout toggle TRUE
    if (fadeoutToggle === true) {
      // display a black rectangle
      push();
      rectMode(CENTER);
      fill(0);
      rect(width / 2, height / 2, width, height);
      pop();
      setTimeout(switchStateToSc1, 2000); // after 2 seconds change setting to parking lot
    }

    // each frame figure out what the currentLine and its type
    // display dialog, images, activate sounds etc...
    manipBlockingData();
  }

  if (state === `parkingLot`) {
    // show background image
    if (barBgImgToggle === true) {
      // Bar parking background
      image(barBgImg, 0, 0, canvas.width - 600, canvas.height - 400);
    }

    // CUES //
    // car door sound cue
    if (currentSoundCue === "carDoorSound") {
      push();
      carDoorSound.playMode("untilDone");
      carDoorSound.play();
      pop();
      currentSoundCue = undefined;
    }
    // noSnow visual toggle
    if (currentVisualCue === "noSnow") {
      // snowTransition0Toggle = false;
      fadeoutToggle = false; // hide fadeout
      roadBGToggle = false; // hide road background
    }
    // laura lights up visual cue
    if (currentVisualCue === "lauraLight") {
      //fadeoutToggle = false; ###
      // Laura lights up
      lauraLightToggle = true;
    }
    // Laura smoker visual cue
    if (currentVisualCue === "lauraCig") {
      // Laura smokes
      lauraLightToggle = false; // hide laura lights up
      lauraCigToggle = true;
    }
    // brett leering visual cue
    if (currentVisualCue === "brettLeer") {
      // Leering businessman approaches
      brettLeerToggle = true;
    }
    // laura out of the picture visual cue
    if (currentVisualCue === "noLaura") {
      brettLeerToggle = false; // hide brett leer
      brettSmirkToggle = true;
      lauraCigToggle = false; // hide laura smokes
    }
    //  brett snides visual cue
    if (currentVisualCue === "brettSnide") {
      // Businessman sniding (? in another 4th scene?)
      // snowCover2Toggle = false;  ###
      brettSmirkToggle = false; // hide brett smirk
      brettSnideToggle = true;
    }
    // scene 1 accent sound cue
    if (currentSoundCue === "accentSound") {
      push();
      accentSound.playMode("untilDone");
      accentSound.play();
      pop();
      currentSoundCue = undefined;
    }
    // brett smirking visual cue
    if (currentVisualCue === "brettSmirk") {
      // Businessman smirks
      brettSnideToggle = false; // hide brett snide
      //lauraCigToggle = false; // hide laura smokes ##
      //brettLeerToggle = false; // hide brett leer ##
      brettSmirkToggle = true;
    }

    // scene 1 snowCover2 cue
    if (currentVisualCue === "snowCover2") {
      snowCover2Toggle = true;
      if (switchB === 0) {
        // automatically changes line because mouse is paused
        setTimeout(nextLine, 500);
        switchB = 1;
      }
    }
    // scene 1 snowTransition to scene 2 sound cue+
    if (currentSoundCue === "sc1TransitionAccent" && switch3 === 0) {
      setTimeout(nextLine, 1000);
      switch3 = 1;
    }
    // // scene1 to scene2 sound cue
    // if (currentSoundCue === "sc1TransitionAccent") {
    //   // push();
    //   // sc1TransitionAccent.playMode("untilDone");
    //   // sc1TransitionAccent.play();
    //   // pop();
    //   currentSoundCue = undefined;
    // }

    // scene 1 snowTransition1 cue
    if (currentVisualCue === "snowTransition1") {
      snowTransition1Toggle = true;
      snowCover3Toggle = true; // turn on snow cover for semiconscious setting to create overlap
      brettSmirkToggle = false; // hide brett smirk
      barBgImgToggle = false; // hide parking background
      setTimeout(switchStateToSc2, 1500); // change setting to semiconscious aver 1.5 seconds
    }

    // if (currentVisualCue === "endFadeout") {
    //   // roadBGToggle = false;
    //   fadeoutToggle = true;
    // } #### TO SCENE 4

    // if (currentVisualCue === "mouse toggle") {
    //   snowTransition3Toggle = false;
    //   mouseToggle = true;
    // }

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
    if (currentListener === "sayAllTheWay") {
      mouseToggle = false;
      push();
      fill(255, 0, 0);
      rectMode(CENTER);
      rect(canvas.width / 4, 330, canvas.width / 2, 80);
      fill(255);
      textAlign(CENTER, CENTER);
      text("SPEAK: I'm going to go all of the way.", canvas.width / 4, 330);
      pop();
      //ANNYANG
      annyang.resume();
      // commands = {
      //   //sc1 listen
      //   "I'm going to go all the way": listenNextLine,
      //   "I'm going to go all of the way": listenNextLine,
      // };
      // annyang.addCommands(commands);
      // annyang.debug();
    }
    if (snowCover2Toggle === true) {
      mouseToggle = false;

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
      mouseToggle = true;
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

      if (switch4 === 0) {
        // automatically changes line
        setTimeout(nextLine, 1000);
        switch4 = 1;
      }
      currentSoundCue = undefined;
    } else if (currentVisualCue === "snowCover3") {
      snowCover3Toggle = true; // transparency
      if (switchC === 0) {
        // automatically changes line because mouse is paused
        setTimeout(nextLine, 500);
        switchC = 1;
      }
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

    if (currentListener === "sayBOBIsReal") {
      mouseToggle = false;
      push();
      fill(255, 0, 0);
      rectMode(CENTER);
      rect(canvas.width / 4, 330, canvas.width / 2, 80);
      fill(255);
      textAlign(CENTER, CENTER);
      text("SPEAK: BOB is real.", canvas.width / 4, 330);
      pop();
      //ANNYANG
      annyang.resume();
      //   commands = {
      //     //sc1 listen
      //     "BOB is real": listenNextLine,
      //   };
      //   annyang.addCommands(commands);
      //   annyang.debug();
    }

    if (snowCover3Toggle === true) {
      mouseToggle = false;
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
      mouseToggle = true;
    } else if (currentSoundCue === "bobLaughsSound") {
      push();
      bobLaughsSound.playMode("untilDone");
      bobLaughsSound.play();
      pop();

      if (currentSoundCue === "bobLaughsSound" && switch5 === 0) {
        setTimeout(nextLine, 2750);
        switch5 = 1;
      }
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
    }

    if (currentSoundCue === "accentSound") {
      push();
      accentSound.playMode("untilDone");
      accentSound.play();
      pop();
      currentSoundCue = undefined;
    }

    if (currentListener === "callForHelp") {
      mouseToggle = false;
      push();
      fill(255, 0, 0);
      rectMode(CENTER);
      rect(canvas.width / 4, 330, canvas.width / 2, 80);
      // fill(255);
      // textAlign(CENTER, CENTER);
      // text("SPEAK: HELP.", canvas.width / 4, 330);
      // pop();
      //ANNYANG
      annyang.resume();
      // commands = {
      //   //sc3 listen
      //   "help!": null,
      //   "help me": null,
      //   "somebody help me": null,
      //   "I need help": null,
      //   "can somebody help me?": null,
      // };
      // annyang.addCommands(commands);
      // annyang.debug();
    }
    if (ringIsClicked === true) {
      annyang.pause();
      switchStateToSc5();
      ringIsClicked = false;
      //return;
    }

    let d = dist(mouseX, mouseY, ringX + 45, ringY + 45); // check distance between tip of Hermes staff and spirit
    if (theRingToggle === true && d < ringSize / 2) {
      //console.log("yes, you're in");
      // you are touching ring
      touchingRingToggle = true;
      // change scene to
    } else {
      touchingRingToggle = false;
    }

    if (currentVisualCue === "snowTransition3") {
      snowTransition3Toggle = true;
      snowCover5Toggle = true;
      setTimeout(switchStateToSc4, 1000);
    } else if (currentVisualCue === "snowCover4") {
      snowCover4Toggle = true;
      if (switchD === 0) {
        // automatically changes line because mouse is paused
        setTimeout(nextLine, 500);
        switchD = 1;
      }
      //snowTransitionToggle = true;
    }

    if (currentSoundCue === "bobGrowlSound") {
      theRingToggle = false;
      push();
      bobAttacksSound.playMode("untilDone");
      bobAttacksSound.play();
      pop();
      nextLine();
    } else if (currentSoundCue === "lauraScreamsSound") {
      theRingToggle = false;
      push();
      lauraScreamsSound.playMode("untilDone");
      lauraScreamsSound.play();
      pop();
      currentSoundCue = undefined;
      if (switchF === 0) {
        // automatically changes line
        setTimeout(nextLine, 500);
        switchF = 1;
      }
    } else if (currentVisualCue === "lauraScreams") {
      theRingToggle = false;
      lauraScreamsToggle = true;
      if (switchG === 0) {
        // automatically changes line
        setTimeout(nextLine, 500);
        switchG = 1;
      }
    } else if (currentVisualCue === "endFadeout") {
      fadeoutToggle = true;
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
      // console.log(
      //   `canvasW - 1100 ${canvas.width - 1100} canvasH - 700 ${
      //     canvas.height - 700
      //   }`
      // );
    } else {
    }

    if (snowCover4Toggle === true) {
      mouseToggle = false;

      displaySnow(255, 100);
    } else {
    }
    if (snowTransition3Toggle === true) {
      displaySnow(255, 255);
    } else {
    }
    if (lauraScreamsToggle === true) {
      image(sc3LauraScreams, 20, -20, canvas.width - 600, canvas.height - 400);
    } else {
    }

    // The angel (?)

    if (bobHasYouVoiceToggle === true) {
      console.log(`what color is ${currentVoice}`);
      bobHasYouVoiceToggle = false;
      responsiveVoice.speak(
        `The thread will be torn ${userName}`,
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

    if (currentVoice === "bobHasYou") {
      //RESPONSIVE VOICE
      bobHasYouVoiceToggle = true;
    }
    if (fadeoutToggle === true) {
      push();
      rectMode(CENTER);
      fill(0);
      rect(width / 2, height / 2, width, height);
      pop();
      mouseToggle = true;
    }
    // show dialog
    manipBlockingData();
  }
}

if (state === "parkingLotReprise") {
  if (barBgImgToggle === true) {
    // Bar parking background
    image(barBgImg, 0, 0, canvas.width - 600, canvas.height - 400);
  }

  if (currentVisualCue === "noSnow") {
    //snowCover4Toggle = false;
    snowTransition3Toggle = false;
    //snowTransition2Toggle = false;
    //roadBGToggle = false;
    mouseToggle = true;
    if (switchX === 0) {
      // automatically changes line because mouse is paused
      nextLine();
      switchX = 1;
    }
  }
  //snowTransition3Toggle = false;

  if (currentVisualCue === "brettSmirk") {
    // Businessman smirks
    brettSnideToggle = false;
    lauraCigToggle = false;
    brettLeerToggle = false;
    brettSmirkToggle = true;
  } else if (currentVisualCue === "brettSnide") {
    // Businessman sniding (? in another 4th scene?)
    snowCover2Toggle = false;
    brettSmirkToggle = false;
    brettSnideToggle = true;
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

  manipBlockingData();
}

function switchStateToSc1() {
  if (state === `introAnimation`) {
    fadeoutToggle = false;
    state = `parkingLot`;
  }
}
function switchStateToSc2() {
  if (state === `parkingLot`) {
    state = `semiconscious`;
    setTimeout(nextLine, 1000);
    mouseToggle = true;
  }
}
function switchStateToSc3() {
  if (state === `semiconscious`) {
    state = `redRoom`;
    nextLine();
    mouseToggle = true;
  }
}
function switchStateToSc4() {
  if (state === `redRoom`) {
    barBgImgToggle = true;
    setTimeout(nextLine, 1000);
    state = `parkingLotReprise`;
    mouseToggle = true;
  }
}
function switchStateToSc5() {
  console.log(currentScene);
  console.log(state);
  if (currentScene === "scene3" && state === `redRoom`) {
    snowCover4Toggle = false;
    theRingToggle = false;
    currentScene = "scene5";
    currentLine = 0;
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
    //snowTransition4Toggle === true ||
    snowCover1Toggle === true ||
    snowCover2Toggle === true ||
    snowCover3Toggle === true
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
    //snowTransition4Toggle === false ||
    snowCover1Toggle === false ||
    snowCover2Toggle === false ||
    snowCover3Toggle === false ||
    snowCover4Toggle === false
  ) {
    //do nothing
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
  } else if (lineData.type === "visual cue") {
    // so visual cue thing
    //imageCueToggle = true;
    currentVisualCue = lineData.image;
    console.log(`what is currentVisualCue ? ${currentVisualCue}`);
  }
  if (lineData.type === "listen") {
    currentListener = lineData.image;
    console.log(`what is currentVLISTENCue ? ${currentListener}`);
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
  if (mouseToggle === false) {
    // click does nothing
  } else if (mouseToggle === true) {
    nextLine();
  }
  if (touchingRingToggle === true) {
    //switch to scene 5
    ringIsClicked = true;
    theRingToggle = false;
    touchingRingToggle = false;
    //    console.log("so what?");
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

function listenNextLine1(userName0) {
  currentListener = undefined;
  userName = userName0;
  annyang.pause();
  nextLine();
}

function listenNextLine() {
  currentListener = undefined;
  annyang.pause();
  nextLine();
}

function listenNextLine3() {
  mouseToggle = true;
  annyang.pause();
  nextLine();
}

function nextLine() {
  if (currentScene === "scene4" && currentLine === 0) {
    currentLine++;
  }
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
    } else if (currentScene === "scene5") {
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
    if ((state = `Title`)) state = `introAnimation`;
  } else {
    // nothing
  }
  if (keyCode === 81) {
    console.log(state);
    console.log(currentScene);
    console.log(currentLine);
    console.log(`in displaySnow snowTransition0Toggle = ${snowTransition0Toggle}
      snowTransition1Toggle = ${snowTransition1Toggle}
      snowTransition2Toggle = ${snowTransition2Toggle}
      snowTransition3Toggle = ${snowTransition3Toggle}`);
    console.log(`
        snowCover1Toggle = ${snowCover1Toggle}
        snowCover2Toggle = ${snowCover2Toggle}
        snowCover3Toggle = ${snowCover3Toggle}
        snowCover4Toggle = ${snowCover4Toggle}`);
  }
}
