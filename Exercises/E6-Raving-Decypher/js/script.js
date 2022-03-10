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
When a secret is clicked we remove its unknown class and add the decyphered class
thus highlighting and displaying the translation
*/

// when glyphs are clicked, decypher
function decypher(event) {
  $(event.target).removeClass(`unknown`); // remove unknown css
  $(event.target).addClass(`decyphered`); // change css to highlighted translation
  let translation = $(event.target).attr(`translation`); // store target translation
  $(event.target).text(translation); // display target translation
  setTimeout(revert, 1500, $(event.target)); // display for 1.5 seconds then revert
}
// when translations revert after setTimeout
function revert(target) {
  $(target).removeClass(`decyphered`); // remove decyphered css
  $(target).addClass(`unknown`); // change css back to unknown
  let hieroglyphic = $(target).attr(`hieroglyphic`); // store target hieroglyphs
  $(target).text(hieroglyphic); // display target hierpglyphs
}
