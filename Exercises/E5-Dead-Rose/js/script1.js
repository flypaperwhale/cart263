("use strict");

let squidImg = document.getElementById(`squidImg`);
// console.log(poulpeImg);

squidImg.addEventListener(`click`, function (event) {
  console.log("your image has been clicked");
});
let glassImg = document.getElementById(`glass-img-button`);

let tombImg = document.getElementById(`tomb-img-button`);

// URLs to JSON data
const GREAT_OLD_ONES_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/mythology/lovecraft.json`;
const ARCHSETTINGS_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/archetypes/setting.json`;
const ARCHCHARACTER_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/archetypes/character.json`;
const ARCHARTEFACT_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/archetypes/artifact.json`;
const VERBS_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/words/verbs.json`;
const CORRIDORS_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/architecture/rooms.json`;
const CEPHALOPOD_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/animals/cephalopod_anatomy.json`;
const PLANTS_DATA_URL = `https://github.com/dariusk/corpora/blob/master/data/plants/plants.json`;

function preload() {
  greatOldOnesData = loadJSON(GREAT_OLD_ONES_DATA_URL);
  archSettingsData = loadJSON(ARCHSETTINGS_DATA_URL);
  archCharacterData = loadJSON(ARCHCHARACTER_DATA_URL);
  archArtefactData = loadJSON(ARCHARTEFACT_DATA_URL);
  verbsData = loadJSON(VERBS_DATA_URL);
  corridorsData = loadJSON(CORRIDORS_DATA_URL);
  cephalopodData = loadJSON(CEPHALOPOD_DATA_URL);
  plantsData = loadJSON(PLANTS_DATA_URL);
}

let god, adj1, verb1, corridor, object;

function setup() {
  console.log(document);

  // Set up the starting lines
  //setupLines();
  // Listen for clicks on each element and respond by changing them
  addListeners();
}

// Gothic Poem Blender //

// fill variables according to png clicked
// replace variables in poem with random from particular categories
// change html "body" with the poem, revealing one verse at a time?
// let poulpeImg = document.getElementById(`poulpe-img-button`);
// document.querySelector(`poulpe-img-button`).addEventListener(‘click’, function(event){
//   console.log("we're in heaven");
// });

// do whatever you want here
// select words for madlibs
// dissapear the pictures and
// display the poem

// function setupLine() {
//   poulpeImg.addEventListener(`click`, function (event) {
//     console.log("sup fuckass poulpy");
//   });
//
//   glassImg.addEventListener(`click`, function (event) {
//     console.log("sup fuckass tombolombo");
//   });
//
//   tombImg.addEventListener(`click`, function (event) {
//     console.log("sup fuckass ave maria");
//   });
// }

/**
Adds event listeners for changing each line of the poem
*/
function addListeners() {
  console.log("hello?");
  squidImg.addEventListener(`click`, changeLine);
  glassImg.addEventListener(`click`, changeLine);
  tombImg.addEventListener(`click`, changeLine);
}

/**
Triggers a fade out when a line is clicked
*/
function changeLine(event) {
  // turn image to a poem
  fadeOut(event.target, 1); // event.target should be <p>image
  // other <p>images turned off.
}

/**
Reduces the opacity of the provided element until it reaches zero
then changes its line and triggers a fade in
*/
function fadeOut(element, opacity) {
  // ### should fadeout image, then fade in poem, line by line
  // Change the opacity of the line
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  // Check if the opacity is greater than 0...
  if (opacity > 0) {
    // If so, keep fading on the next frame
    // Note the use of an anonymous function here so we can pass
    // arguments to fadeOut()
    requestAnimationFrame(function () {
      fadeOut(element, opacity);
    });
  } else {
    // If not, we can switch lines and fade in...
    // Set a new line of poem for the element
    setNewLine(element);
    // Trigger a fade in
    fadeIn(element, 0);
  }
}

/**
Sets the text of the element to a randomly chosen haiku line, accounting for
syllables
*/
function setNewLine(element) {
  if (element === poulpeImg) {
    // If the element is poulpe
    console.log("in poulpe mode!");
  } else if (element === tombImg) {
    // If the element is tomb
    console.log("in tomb mode!");
  } else if (element === glassImg) {
    // If the element is stain glass
    console.log("in stain glass mode!");
  }
}

/**
Increases the opacity of the provided element until it reaches
1 and then stops.
*/
function fadeIn(element, opacity) {
  // Increase the opacity
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  // Check if opacity is still less than 1
  if (opacity < 1) {
    // Keep fading. Note the use of an anonymous function here so we
    // can pass arguments to fadeIn()
    requestAnimationFrame(function () {
      fadeIn(element, opacity);
    });
  } else {
    // Do nothing - we're done!
  }
}

//if poulpe is clicked, madlibs get filled here
/*
god: greatOldOnesData.
adj1: archSettingsData.
verb1: verbsData.
corridor: corridorsData.
object: cephalopodData.
*/
//if tomb is clicked, madlibs get filled here
/*
god: greatOldOnesData.
adj1: archCharacterData.
verb1: verbsData.
corridor: corridorsData.
object: archArtefactData.
*/
//if glass is clicked, madlibs get filled here
/*
god: greatOldOnesData.
adj1: archArtefactData.
verb1: verbsData.
corridor: corridorsData.
object: plantsData.
*/

let thePoemDisplayed = `
O ${god} thou art ${adj1}.
The invisible worm,
That ${verb1} in the night
In the howling storm:

Has found out thy ${corridor}
Of crimson joy:
And his dark secret ${object}
Does thy life destroy.`;

/*`
O Rose thou art sick.
The invisible worm,
That flies in the night
In the howling storm:

Has found out thy bed
Of crimson joy:
And his dark secret love
Does thy life destroy.`*/
