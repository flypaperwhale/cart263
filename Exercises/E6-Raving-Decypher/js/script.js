/**
Raving Decypher
Frankie Latreille
based on Pippin Barr's Raving Redactionist

A pillar of symbols to be clicked and "decyphered"
*/

("use strict");

// A place to store the jQuery selection of all secrets
let $secrets;

setup();

/**
Sets the click handler
*/
function setup() {
  // Save the selection of all secret glyphs
  $secrets = $(`.secret`);
  // Set a click handler on the secrets (so we know when they`re clicked)
  $secrets.on(`click`, decypher);
}

/**
When a secret is clicked we remove its revealed class and add the decyphered class
thus blacking it out
*/
function decypher() {
  let translation = $(this).attr(`translation`);
  $(this).text(translation);
  $(this).removeClass(`revealed`);
  $(this).addClass(`decyphered`);
  setTimeout(revert, 1500);
}

function revert() {
  let hieroglyphic = $(this).attr(`hieroglyphic`);
  $(this).text(hieroglyphic);
  $(`.decyphered`).removeClass(`decyphered`);
  $(`.decyphered`).addClass(`revealed`);
}
