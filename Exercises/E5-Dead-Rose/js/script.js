// Gothic Poem Blender //

// fill variables according to png clicked
// replace variables in poem with random from particular categories
// change html "body" with the poem, revealing one verse at a time?
// let poulpeImg = document.getElementById(`poulpe-img-button`);
document.querySelector(`poulpe-img-button`).addEventListener(‘click’, function(event){
  console.log("we're in heaven");
});

// do whatever you want here
// select words for madlibs
// dissapear the pictures and
// display the poem


console.log(document);

poulpeImg.addEventListener(`click`, function (event) {
  console.log("sup fuckass poulpy");
});

let glassImg = document.getElementById(`glass-img-button`);

glassImg.addEventListener(`click`, function (event) {
  console.log("sup fuckass tombolombo");
});

let tombImg = document.getElementById(`tomb-img-button`);

tombImg.addEventListener(`click`, function (event) {
  console.log("sup fuckass ave maria");
});

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
