/**
"Monkey Business" / a program based on David Lynch's Fire Walk with Me //
Frankie Latreille

Reimagined scenes of David Lynch's Fire Walk with Me. Laura meets a man on a business trip
who wants to pay her for sex work, she is sent into her subconscious where a woman tries to
warn her, and then continues her descent into Hell
*/

"use strict";
let n = 0;
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
// cover 6- sc4 overlap
let snowCover6Toggle;

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
let redRoomEntryImgToggle;
let lauraLightToggle;
let lauraCigToggle;
let brettLeerToggle;
let brettSmirkToggle;
let brettSnideToggle;
let brettSmirkToggle2;
let brettSnideToggle2;
let barBgImgToggle2;
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
let noSnowToggle2;
let noLauraToggle;
let noBobToggle;
let fadeoutToggle;
let fadeoutToggle2;
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
let lauraRunningSound;

// if true, mouse can be clicked. if false, mouse is paused
let mouseToggle = false;

// Switches //
// switch6- intro snowCover1
let switch1 = 0;
// switch0-
let switch2 = 0;
// switch2- intro accent sound
let switch3 = 0;
// switch1- intro monkey face
let switch4 = 0;
// switch7- sc1 snowCover2
let switch5 = 0;
// switch3- transition from sc1 to sc2
let switch6 = 0;
// switch4- transition from sc2 to sc3
let switch7 = 0;
// switch8- sc2 snowCover3
let switch8 = 0;
// switch5- sc2/sc3 bob laughs
let switch9 = 0;
// switch9- sc3 snowCover4
let switch10 = 0;
// switch11- sc5 Laura screams image
let switch11 = 0;
// switch12- sc5 Laura screams sound
let switch12 = 0;
// switch13- sc4 no snow
let switch13 = 0;
// switch #
let switch14 = 0;
// switch14- sc4 snow cover
let switch15 = 0;
// // switch10- ##
// let switchE = 0; ###
let switchZ = 0;

// ring properties so that image can be clicked
let ringX = 410;
let ringY = 50;
let ringSize = 100;

// toggle for if ring is touched or not
let touchingRingToggle;
let ringIsClicked = false;

// variable to save annyang response to askName
let userName;

// red box when annyang is on
let scene3ListenTextToggle = false;

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
  lauraRunningSound = loadSound("assets/sounds/laurarunning.mp3");
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

    responsiveVoice.setDefaultRate(0.88);
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

  // + // when state is Title // + //
  titleState();
  // + // when state is introAnimation // + //
  introAnimationState();
  // + // state is ParkingLot // + //
  parkingLotState();
  // + // state is Semiconscious // + //
  semiconsciousState();
  // + // when state is redRoom // + //
  redRoomState();
  // + // when state is parking lot reprise scene4 // + //
  parkingLotRepriseState();
}

// + // when state is Title // + //
function titleState() {
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
}

// + // when state is introAnimation // + //
function introAnimationState() {
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
      snowSound.setVolume(0.25);
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
      if (switch1 === 0) {
        // automatically changes line because mouse is paused
        setTimeout(nextLine, 500);
        switch1 = 1;
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
      if (switch3 === 0) {
        // automatically changes line
        setTimeout(nextLine, 1000);
        switch3 = 1;
      }
      currentSoundCue = undefined; // plays sound only once
    }
    // intro no snow visual cue
    if (currentVisualCue === "noSnow") {
      monkeyFaceToggle = false; // turn off monkey face
      snowCover1Toggle = false; // turn off snow cover 1
      mouseToggle = true; // mouse back on!
    }
    // if (currentVisualCue === "redRoomEntry") {
    //   redRoomEntryImgToggle = true;
    // }
    // intro spoken cue RESPONSIVE VOICE
    if (currentVoice === "dontTakeTheRing") {
      dontTakeTheRingVoiceToggle = true;
    }
    // intro fadeout visual cue
    if (currentVisualCue === "fadeout") {
      roadBGToggle = false; // hide road background
      fadeoutToggle = true;
    }

    // intro TOGGLED blocked cues - in correct layers for accurate display //
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
    if (monkeyFaceToggle === true && switch4 === 0) {
      setTimeout(nextLine, 500); // automatically change lines
      switch4 = 1;
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
          onstart: toggleRedRoomEntryOn,
          onend: toggleRedRoomEntryOff,
        }
      );
      currentVoice = undefined; // fail safe?
      nextLine();
    }

    function toggleRedRoomEntryOn() {
      redRoomEntryImgToggle = true;
    }
    function toggleRedRoomEntryOff() {
      redRoomEntryImgToggle = false;
    }

    // redRoom Entry img toggle TRUE
    if (redRoomEntryImgToggle === true) {
      push();
      tint(255, 100);
      image(redRoomEntryImg, 0, 0, canvas.width - 600, canvas.height - 400);
      pop();
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
}

// + // state is ParkingLot // + //
function parkingLotState() {
  if (state === `parkingLot`) {
    snowTransition3Toggle = false;
    // show background image
    if (barBgImgToggle === true) {
      // Bar parking background
      image(barBgImg, 0, 0, canvas.width - 600, canvas.height - 400);
    }

    // scene1 CUES //
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
      // Businessman sniding
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
      if (switch5 === 0) {
        // automatically changes line because mouse is paused
        setTimeout(nextLine, 500);
        switch5 = 1;
      }
    }
    // scene 1 snowTransition1 cue
    if (currentVisualCue === "snowTransition1") {
      snowTransition1Toggle = true;
      snowCover3Toggle = true; // turn on snow cover for semiconscious setting to create overlap
      brettSmirkToggle = false; // hide brett smirk
      barBgImgToggle = false; // hide parking background
      setTimeout(switchStateToSc2, 1500); // change setting to semiconscious aver 1.5 seconds
    }

    // scene 1 TOGGLED Blocked cues //
    // laura lighting up toggled TRUE
    if (lauraLightToggle === true) {
      image(
        sc1LauraLightsUp,
        50,
        101,
        canvas.width - 1000,
        canvas.height - 500
      );
    }
    // laura smoking toggled TRUE
    if (lauraCigToggle === true) {
      image(sc1LauraSmokes, 50, 100, canvas.width - 1000, canvas.height - 500);
    }
    // brett leering toggled TRUE
    if (brettLeerToggle === true) {
      image(
        sc1BusinessmanAcosts,
        320,
        115,
        canvas.width - 910,
        canvas.height - 600
      );
    }
    // brett smirking toggled TRUE
    if (brettSmirkToggle === true) {
      image(
        sc1BusinessmanSmirks,
        320,
        115,
        canvas.width - 950,
        canvas.height - 600
      );
    }
    // brett snides toggled TRUE
    if (brettSnideToggle === true) {
      image(
        sc1BusinessmanSnark,
        310,
        115,
        canvas.width - 880,
        canvas.height - 580
      );
    }

    // ANNYANG user must say All the way
    // display ask in white font in red bar seen below snowCover2
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
      annyang.resume();
    }

    // snowCover2 Toggled TRUE
    if (snowCover2Toggle === true) {
      mouseToggle = false; // pause mouse
      displaySnow(255, 100);
    }
    // snowTransition1 toggled TRUE
    if (snowTransition1Toggle === true) {
      displaySnow(255, 255);
    }

    // each frame figure out what the currentLine and its type
    // display dialog, images, activate sounds etc...
    manipBlockingData();
  }
}

// + // state is Semiconscious // + //
function semiconsciousState() {
  if (state === `semiconscious`) {
    // show background image
    // Semicounscious eerie background
    image(semiconsciousBgImg, 0, 0, canvas.width - 600, canvas.height - 400);

    // scene 2 CUES //
    // scene 1 snowTransition to scene 2 sound cue+
    // scene 2 noSnow visual cue
    if (currentVisualCue === "noSnow") {
      snowCover2Toggle = false; // hide snowCover 2
      snowCover3Toggle = false; // hide snowCover 3
      snowTransition1Toggle = false; // hide snowTransition1
      mouseToggle = true; // turn mouse on!
    }
    if (currentSoundCue === "sc1TransitionAccent" && switch6 === 0) {
      push();
      weirdAccent.rate(0.5);
      weirdAccent.playMode("untilDone");
      weirdAccent.play();
      pop();
      setTimeout(nextLine, 1000);
      switch6 = 1;
    }
    // lon lady frontal img visual cue
    if (currentVisualCue === "frontLogLady") {
      // Loglady stands alone
      frontLogLadyToggle = true;
    }
    // laura looks rightwards visual cue
    if (currentVisualCue === "lauraLookR") {
      // Laura facing right
      frontLogLadyToggle = false; // hide frontal log lady img
      lauraLookRToggle = true;
    }
    // log lady looks leftwards visual cue
    if (currentVisualCue === "logLadyLookL") {
      // Loglady facing left
      logLadyLookLToggle = true;
    }
    // log lady touches laura visual cue
    if (currentVisualCue === "logXLaura") {
      lauraLookRToggle = false; // hide laura rightwards
      logLadyLookLToggle = false; // hide log lady leftwards
      logXLauraToggle = true;
      // Loglady touching Laura
    }
    // scene 2 close up 1 visual cue
    if (currentVisualCue === "sc2CloseUp1") {
      sc2CloseUp1Toggle = true;
      // Laura touched closeup 1
    }
    // scene 2 close up 2 visual cue
    if (currentVisualCue === "sc2CloseUp2") {
      sc2CloseUp2Toggle = true;
      // Laura touched closeup 2
    }
    // scene 2 snowTransition2 to scene 3 visual cue
    if (currentVisualCue === "snowTransition2") {
      snowTransition2Toggle = true;
      snowCover4Toggle = true; // toggle snowCover4 for overlap on scene3
      bobChatToggle = true;
      setTimeout(switchStateToSc3, 1000);
    }
    // redRoom transition sound cue
    if (currentSoundCue === "redRoomTransitionTheme") {
      push();
      redRoomTransitionTheme.playMode("untilDone");
      redRoomTransitionTheme.play();
      pop();
      if (switch7 === 0) {
        // automatically changes line
        setTimeout(nextLine, 1000);
        switch7 = 1;
      }
      currentSoundCue = undefined;
    }
    // scene 2 snowCover3 visual cue
    if (currentVisualCue === "snowCover3") {
      snowCover3Toggle = true; // transparency
      if (switch8 === 0) {
        // automatically changes line because mouse is paused
        setTimeout(nextLine, 500);
        switch8 = 1;
      }
    }

    // scene2 TOGGLED blocked cues //
    // front log lady img toggled TRUE
    if (frontLogLadyToggle === true) {
      image(
        sc2LogLadyFrontImg,
        130,
        130,
        canvas.width - 780,
        canvas.height - 530
      );
    }
    // laura rightwards img toggled TRUE
    if (lauraLookRToggle === true) {
      image(sc2LauraImg, 50, 101, canvas.width - 1020, canvas.height - 520);
    }
    // loglady leftwards img toggled TRUE
    if (logLadyLookLToggle === true) {
      image(
        sc2LogLadySideImg,
        350,
        101,
        canvas.width - 1020,
        canvas.height - 520
      );
    }
    // loglady touches laura img toggled TRUE
    if (logXLauraToggle === true) {
      image(
        sc2LauraXLogLady,
        130,
        120,
        canvas.width - 830,
        canvas.height - 520
      );
    }
    // scene2 close up 1 toggled TRUE
    if (sc2CloseUp1Toggle === true) {
      image(sc2LogLadyTouch1, 0, 0, canvas.width - 600, canvas.height - 400);
    }
    // scene2 close up 2 toggled TRUE
    if (sc2CloseUp2Toggle) {
      image(sc2LogLadyTouch2, 0, 0, canvas.width - 600, canvas.height - 400);
    }

    // ANNYANG make user say Bob is real
    // display ask in white font in red bar seen below snowCover3
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
    }

    // scene 2 snowCover3 toggled TRUE
    if (snowCover3Toggle === true) {
      mouseToggle = false; // pause mouse
      displaySnow(255, 100);
    }
    // scene 2 snowTransition2 toggled TRUE
    if (snowTransition2Toggle === true) {
      displaySnow(255, 255);
    }

    // each frame figure out what the currentLine and its type
    // display dialog, images, activate sounds etc...
    manipBlockingData();
  }
}

// + // when state is redRoom // + //
function redRoomState() {
  if (state === `redRoom`) {
    // show background image
    // redroom background
    image(redRoomBgImg, 0, 0, canvas.width - 550, canvas.height - 400);
    // scene3 CUEs //
    // BOB laughs sound cue
    if (currentSoundCue === "bobLaughsSound") {
      push();
      bobLaughsSound.playMode("untilDone");
      bobLaughsSound.play(); // the laughing sound is called right away
      pop();
      if (currentSoundCue === "bobLaughsSound" && switch9 === 0) {
        setTimeout(nextLine, 2550); // next line function
        // happens only once after 2.75 seconds
        switch9 = 1;
      }
      currentSoundCue = undefined;
    }
    // scene3 no snow visual cue
    if (currentVisualCue === "noSnow") {
      snowCover3Toggle = false; // turn off snowCover3
      snowCover4Toggle = false; // turn off snowCover4
      snowTransition2Toggle = false; // turn off sc2's snowtransition2 to sc3
      mouseToggle = true; // turn mouse on
    }

    // BOB neutral talking visual cue
    if (currentVisualCue === "bobChat") {
      // Bob chat
      bobChatToggle = true;
    }
    // BOB excited visual cue
    if (currentVisualCue === "bobRage") {
      // Bob excited rage
      bobChatToggle = false; // turn neutral BOB off
      bobRageToggle = true;
    }
    // laura looking at hands visual cue
    if (currentVisualCue === "lauraHands") {
      // Laura looks at hand
      bobRageToggle = false; // hide excited BOB
      lauraHandsToggle = true;
    }
    // scene3 accent sound cue
    if (currentSoundCue === "accentSound") {
      push();
      accentSound.playMode("untilDone");
      accentSound.play();
      pop();
      currentSoundCue = undefined;
    }
    // no Laura visual cue
    if (currentVisualCue === "noLaura") {
      lauraHandsToggle = false; // laura hands img is off
    }
    // RESPONSIVEVOICE mysterious voice cue
    if (currentVoice === "bobHasYou") {
      //RESPONSIVE VOICE
      bobHasYouVoiceToggle = true;
    }
    // the Ring visual cue
    if (currentVisualCue === "theRing") {
      // The ring
      lauraHandsToggle = false;
      theRingToggle = true;
    }

    // scene 3 snowCover4 early for overlap and later when listening for help
    if (currentVisualCue === "snowCover5") {
      snowCover5Toggle = true;
      if (switch10 === 0) {
        // automatically changes line because mouse is paused
        setTimeout(nextLine, 500);
        switch10 = 1;
      }
    }

    // ANNYANG have Laura call for help and go to scene 4
    if (currentListener === "callForHelp") {
      scene3ListenTextToggle = true;
      //snowCover5Toggle = true;
      console.log(snowCover5Toggle);
      mouseToggle = false; // pause mouse
      // except to click on the ring
      if (scene3ListenTextToggle === true) {
        push();
        fill(255, 0, 0);
        rectMode(CENTER);
        rect(canvas.width / 4, 330, canvas.width / 2, 80); // display the red bar, with no words on it
        pop();
      } else {
      }
      //ANNYANG
      annyang.resume();
      currentListener = undefined;
    }

    // scene3 snowTransition3 to scene 4 ###
    if (currentVisualCue === "snowTransition3") {
      scene3ListenTextToggle = false;
      snowTransition3Toggle = true;
      snowCover5Toggle = true;
      snowCover6Toggle = true; // activate scene 4 snowCover5 for overlap animation
      setTimeout(switchStateToSc4, 1000); // switch setting to parking lot reprise
    }

    // TAKE RING CLICK //
    // collision check between mouse and ring img
    let d = dist(mouseX, mouseY, ringX + 45, ringY + 45); // check distance between cursor and ring
    if (theRingToggle === true && d < ringSize / 2) {
      // you are touching ring
      touchingRingToggle = true;
    } else {
      // you are not touching ring
      touchingRingToggle = false;
    }

    // if user clicks on the ring
    if (ringIsClicked === true) {
      annyang.pause(); // stop ANNYANG
      switchStateToSc5(); // stay in red room go to scene 5
      ringIsClicked = false; // ring is no more clicked as it disappears
    }

    // SCENE 5 cues //
    // BOB growling sound cue
    if (currentSoundCue === "bobGrowlSound") {
      theRingToggle = false; // mouse is off
      scene3ListenTextToggle = false;
      snowCover5Toggle = false;
      snowCover6Toggle = false;
      push();
      bobAttacksSound.playMode("untilDone");
      bobAttacksSound.play();
      pop();
      nextLine();
    }
    // laura screaming sound cue
    if (currentSoundCue === "lauraScreamsSound") {
      theRingToggle = false; // mouse is off
      snowCover5Toggle = false;
      snowCover6Toggle = false;
      push();
      lauraScreamsSound.playMode("untilDone");
      lauraScreamsSound.play();
      pop();
      currentSoundCue = undefined;
      if (switch11 === 0) {
        // automatically changes line
        setTimeout(nextLine, 500);
        switch11 = 1;
      }
    }
    // laura screams visual cue
    if (currentVisualCue === "lauraScreams") {
      snowCover4Toggle = false; // turn off snowCover4 to end scene 5
      theRingToggle = false; // turn off ring img
      snowCover5Toggle = false;
      snowCover6Toggle = false;
      lauraScreamsToggle = true;
      if (switch12 === 0) {
        // automatically changes line
        setTimeout(nextLine, 500);
        switch12 = 1;
      }
    }
    // end scene 5 fadeout visual cue
    if (currentVisualCue === "endFadeout") {
      snowCover5Toggle = false;
      snowCover6Toggle = false;
      fadeoutToggle = true;
    }

    // scene 3 & 5 blocked toggled TRUE //
    // BOB neutral chat img toggled TRUE
    if (bobChatToggle === true) {
      image(sc3BobImg1, 130, 65, canvas.width - 850, canvas.height - 550);
    }
    // BOB enraged img toggled TRUE
    if (bobRageToggle === true) {
      image(sc3BobImg2, 297, 65, canvas.width - 900, canvas.height - 550);
    }
    // laura and hands toggled TRUE
    if (lauraHandsToggle === true) {
      image(sc3LauraHands, 100, 10, canvas.width - 800, canvas.height - 450);
    }
    // RESPONSIVE VOICE mysterious voice
    if (bobHasYouVoiceToggle === true) {
      bobHasYouVoiceToggle = false; // only happens once
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
    // the ring img toggled TRUE
    if (theRingToggle === true) {
      image(sc3RingImg, ringX, ringY, canvas.width - 1100, canvas.height - 700);
    }

    // The angel (?)

    //  scene 5 laura screaming img toggled TRUE (while snowCover4 is turned off)
    if (lauraScreamsToggle === true) {
      image(sc3LauraScreams, 20, -20, canvas.width - 600, canvas.height - 400);
    }
    // scene 5 end fadeout toggled TRUE
    if (fadeoutToggle === true) {
      push();
      rectMode(CENTER);
      fill(0);
      rect(width / 2, height / 2, width, height);
      pop();
      mouseToggle = true; // mouse is on, to click the end
    }
    // scene 3 snowCover4 LISTEN for help and listen to the ring
    if (snowCover4Toggle === true) {
      mouseToggle = false; // mouse is off
      displaySnow(255, 100);
    }
    // scene 3 snowCover4 LISTEN for help and listen to the ring
    if (snowCover5Toggle === true) {
      mouseToggle = false; // mouse is off
      displaySnow(255, 100);
    }
    // scene 3 snowTransition3 to scene 4 toggled TRUE
    if (snowTransition3Toggle === true) {
      displaySnow(255, 255);
    }
    // each frame figure out what the currentLine and its type
    // display dialog, images, activate sounds etc...
    manipBlockingData();
  }
}

// + // when state is parking lot reprise scene4 // + //
function parkingLotRepriseState() {
  if (state === `parkingLotReprise`) {
    //display bg img
    if (barBgImgToggle2 === true) {
      // Bar parking background
      image(barBgImg, 0, 0, canvas.width - 600, canvas.height - 400);
    }
    // scene4 CUES //
    // scene4 nosnow visual cue
    if (currentVisualCue === "noSnow2") {
      snowCover5Toggle = false;
      snowCover6Toggle = false;
      snowTransition3Toggle = false;
      theRingToggle = false;
      mouseToggle = true;
      if (switch13 === 0) {
        // automatically changes line because mouse is paused
        nextLine();
        switch13 = 1;
      }
    }
    //brett snide visual cue
    if (currentVisualCue === "brettSnide2") {
      // Businessman sniding
      snowCover5Toggle = false;
      brettSmirkToggle2 = false; // turn off brett smirking
      brettSnideToggle2 = true;
    }
    // highway sound cue
    if (currentSoundCue === "lauraRunning") {
      push();
      lauraRunningSound.playMode("untilDone");
      lauraRunningSound.play();
      pop();
      if (switch14 === 0) {
        // automatically changes line because mouse is paused
        nextLine();
        switch14 = 1;
      }
      currentSoundCue = undefined; // play highway sound only once
    }
    // brett smirking img visual cue
    if (currentVisualCue === "brettSmirk2") {
      // Businessman smirks
      brettSnideToggle2 = false;
      brettSmirkToggle2 = true;
    }
    // scene 4 snowCover5 for overlap
    if (snowCover5Toggle === true) {
      mouseToggle = false; // mouse is off
      displaySnow(255, 100);
    }
    // end fadeout visual cue
    if (currentVisualCue === "endFadeout2") {
      fadeoutToggle2 = true;
    }

    // scene4 blocks toggled TRUE //
    // brett smirking visual cue
    if (brettSmirkToggle2 === true) {
      image(
        sc1BusinessmanSmirks,
        320,
        115,
        canvas.width - 950,
        canvas.height - 600
      );
    }
    // brett snides visual cue
    if (brettSnideToggle2 === true) {
      image(
        sc1BusinessmanSnark,
        310,
        115,
        canvas.width - 880,
        canvas.height - 580
      );
    }
    // scene 4 fadeout toggled TRUE
    if (fadeoutToggle2 === true) {
      push();
      rectMode(CENTER);
      fill(0);
      rect(width / 2, height / 2, width, height);
      pop();
    }
    // snowCover
    if (snowCover6Toggle === true) {
      displaySnow(255, 100);
      if (switch15 === 0) {
        // automatically changes line because mouse is paused
        setTimeout(nextLine, 500);
        switch15 = 1;
      }
    }
    // each frame figure out what the currentLine and its type
    // display dialog, images, activate sounds etc...
    manipBlockingData();
  }
}

// functions to switch settings //
function switchStateToSc1() {
  // from intro to scene 1 (parking lot)
  if (state === `introAnimation`) {
    fadeoutToggle = false;
    state = `parkingLot`;
  }
}
function switchStateToSc2() {
  // from scene1 to scene 2 (semiconscious)
  if (state === `parkingLot`) {
    state = `semiconscious`;
    setTimeout(nextLine, 1000);
    mouseToggle = true;
  }
}
function switchStateToSc3() {
  // from scene 2 to scene 3 (red room)
  if (state === `semiconscious`) {
    state = `redRoom`;
    nextLine();
    mouseToggle = true;
  }
}
function switchStateToSc4() {
  // from scene 3 to scene 4 (parking lot reprise)
  if (state === `redRoom`) {
    mouseToggle = true;
    snowTransition3Toggle = false;
    snowCover3Toggle = false;
    barBgImgToggle2 = true;
    setTimeout(nextLine, 1000);
    state = `parkingLotReprise`;
    manipBlockingData();
  }
}
function switchStateToSc5() {
  // directly from scene 3 to scene 5 when the ring is clicked
  if (currentScene === "scene3" && state === `redRoom`) {
    snowCover4Toggle = false; // hide snowCover4
    theRingToggle = false; // hide the ring
    currentScene = "scene5"; // set scene to scene5
    currentLine = 0; // reinitialize currentLine
  }
}

function displaySnow(gray, alpha) {
  // display snow //
  // the alpha property serves to make snowCover transparent
  if (
    // if either one of the snowCovers or snowTransitions is true
    snowTransition0Toggle === true ||
    snowTransition1Toggle === true ||
    snowTransition2Toggle === true ||
    snowTransition3Toggle === true ||
    //snowTransition4Toggle === true ||
    snowCover1Toggle === true ||
    snowCover2Toggle === true ||
    snowCover3Toggle === true ||
    snowCover4Toggle === true ||
    snowCover5Toggle === true ||
    snowCover6Toggle === true
  ) {
    push();
    imageMode(CENTER);
    // depending on snowDirection 1,2,3,4 which is randomly selected each second
    if (snowDirection === 1) {
      scale(1, 1);
    } else if (snowDirection === 2) {
      scale(1, -1);
    } else if (snowDirection === 3) {
      scale(-1, 1);
    } else if (snowDirection === 4) {
      scale(-1, -1);
    }
    tint(gray, alpha); // transparency
    image(transitionSnowImg, 0, 0, canvas.width, canvas.height);
    pop();
  } else if (
    // if no snowtransition img toggled on...
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
    // ...do nothing
  }
}

/**
this function reads the data in the blocked script in dialog.JSON
there are 5 types of blocks that this function manipulates
visual CUES
sound CUES
listening cues (ANNYANG)
spoken cues (RESPONSIVE VOICE)
dialog

based on type, manipulate line differently
*/
function manipBlockingData() {
  // Get the current scene and line data object
  let lineData = data.blocking[currentScene][currentLine];
  // Get the data for the character who is speaking, an image or sound cue, etc.

  // DIALOG //
  /* Laura's dialog should appear from the left (POV)
whereas dialog from interlocutors should arrive from the right side
this is solved directly in the JSON file
*/
  if (lineData.type === "dialog") {
    currentVisualCue = lineData.image;
    let characterData = data.characters[lineData.character];
    // Uses the dialog and character data to display a dialog box
    // with the current line displayed in it.

    // Draw the dialog background
    push();
    noStroke();
    fill(230, 220, 220);
    rect(0, height - dialogHeight, width, dialogHeight);
    pop();
    // Display the character name
    push();
    textSize(24);
    fill(255, 0, 0);
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
    text(lineData.dialog, 10, height - dialogHeight + 5, width, dialogHeight);
    pop();
  }
  // SOUND CUE //
  if (lineData.type === "sound cue") {
    // do sound cue thing
    currentSoundCue = lineData.sound;
    //manipulate current sound right away
    console.log(`what is currentSoundCue ? ${currentSoundCue}`);
  }
  // VISUAL CUE //
  if (lineData.type === "visual cue") {
    // do visual cue thing
    currentVisualCue = lineData.image;
    console.log(`what is currentVisualCue ? ${currentVisualCue}`);
  }
  // LISTEN CUE //
  if (lineData.type === "listen") {
    currentListener = lineData.image;
    console.log(`what is currentVLISTENCue ? ${currentListener}`);
  }
  // SPOKEN CUE //
  if (lineData.type === "spoken") {
    //user cannot click to advance anymore
    currentVoice = lineData.image;
    console.log(`what is currentVoice ? ${currentVoice}`);
  }
}

/**
Mouse pressed pushes us to the next line
unless mouse is paused when a response to annyang is required
*/

function mousePressed() {
  if (mouseToggle === false) {
    // if mouseToggle is off, mouse is paused
    // click does nothing
  } else if (mouseToggle === true) {
    // if mouseToggle is on, clicking goes to the next line
    nextLine();
  }
  if (touchingRingToggle === true) {
    // if mouse is over ring img, clicking pushes us straight to scene5 line0
    //switch to scene 5
    ringIsClicked = true; // ringIsClicked activates ###
    theRingToggle = false; // this only happens once
    touchingRingToggle = false; // ring disappears and user cannot click it again
  }
}

/**
nextLineFunctions
Iterates through the JSON script array, returns to line 0 at the end of a scene
*/

// first listenNextLine captures player's name to use at the end of the game
function listenNextLine1(userName0) {
  currentListener = undefined;
  userName = userName0;
  annyang.pause(); // annyang is off
  nextLine();
}
// listenNextLine called after user speaks an annyang command
function listenNextLine() {
  currentListener = undefined;
  annyang.pause(); // annyang is off
  nextLine();
}
// listenNextLine3 called after answering help me
function listenNextLine3() {
  mouseToggle = true; // turns mouse off for transition
  annyang.pause(); // annyang is off
  nextLine();
}

// OG next line
function nextLine() {
  n++;
  console.log(n);
  currentLine++; // add 1 to currentLine everytime nextLine is called
  if (currentLine >= data.blocking[currentScene].length) {
    // if currentLine is last in a scene, next click goes back to 0
    // at the beginning of the next scene
    if (currentScene === "scene0") {
      currentScene = "scene1";
    } else if (currentScene === "scene1") {
      currentScene = "scene2";
    } else if (currentScene === "scene2") {
      currentScene = "scene3";
    } else if (currentScene === "scene3") {
      currentScene = "scene4";
    } else if (currentScene === "scene4") {
      // "good" ending
      alert("the end");
      currentScene = undefined; // it's over, no more scenes
    } else if (currentScene === "scene5") {
      // "bad" ending
      alert("the end"); // it's over, no more scenes
      currentScene = undefined;
    }
    currentLine = 0;
  }
}

function keyPressed() {
  if (keyCode === 32) {
    // press space at the opening screen to go to title and toggle mouse on to click from scene to scene
    if ((state = `Title`)) state = `introAnimation`;
  } else {
    // nothing
  }
  // if (keyCode === 81) {
  //   // debug button Q
  //   console.log(state);
  //   console.log(currentScene);
  //   console.log(currentLine);
  //   console.log(`in displaySnow snowTransition0Toggle = ${snowTransition0Toggle}
  //     snowTransition1Toggle = ${snowTransition1Toggle}
  //     snowTransition2Toggle = ${snowTransition2Toggle}
  //     snowTransition3Toggle = ${snowTransition3Toggle}`);
  //   console.log(`
  //       snowCover1Toggle = ${snowCover1Toggle}
  //       snowCover2Toggle = ${snowCover2Toggle}
  //       snowCover3Toggle = ${snowCover3Toggle}
  //       snowCover4Toggle = ${snowCover4Toggle}`);
}
