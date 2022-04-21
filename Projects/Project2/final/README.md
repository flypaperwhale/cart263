# Mish Chat Chit Mash Artist's Statement

CART 263 Project 2 Artist's statement

The aim of this coding project was to have an interactive world in which the user can find objects and give them around to the NPCs in the simulation. By taking and giving objects, this begins a process of shifting how the NPCs feel about the player and what they say to them. The data to build the NPCS and the items are found in a JSON file. For now the game is simple enough to be started over from scratch every time the page is reloaded, but a bigger more complex version of this game would require both a character creation state and the function of saving to save the player's version of the world and their relations with the NPCs ongoing.

The premise of the simulation is simple enough, but with the simple mechanics of this game in place, I can now take the game dynamics further, such as modulating the impact of giving items to NPCS and dialog generation based on increasing amounts of data and probabilities (for this program probabilities have been discarded but some examples could have been the passage of time and the changing moods of the NPCs, or the likelihood of certain objects to drop versus others). In the longer run, this data would be increasingly dynamically dependent to its different networked variables and form an ecosystem of simulated displacing of matter and affecting of sovereign characters.

For this project, I was able to implement a grid system to control where different elements appear on the canvas. The player, the NPCS, the items, and some set pieces are loaded into the grid map (either manually or through functions). The player can then explore the world, walk over items to pick them up, and press space when adjacent to NPCs to either talk to them or give them an item. Items are managed through a very simple inventory system.

What I have found through testing my program is that I have succeeded in creating a more dynamic (dare I see increasingly realistic) dialog system which is both fun and engaging. It gives the sense that this simulated world is a little more alive and autonomous. There are 5 NPCs in the game and each one reacts differently to being given certain items (such as the depanneur NPC trading coins for fresh produce).

I am also proud to have created some of my first pixel art assets for this game, populating the game with items that I have drawn. I added the music last minute to elevate this program from a tech-demo style prototype to a stand-alone program. I also put a little more effort into making the title screen pleasant to look at.

I did not work too hard on finding a title as this remains a prototype. The title evokes the mish mashed nature of having plenty of items to give around to to the different characters who will chit chat with the player. Ideally, players would feel there is value in their giving of items and could create scenarios in their minds that the character responses would give weight to.

I was able to accomplish certain parts of the code after following examples given to me by Pippin, namely how to implement the grid, and how to check the next cell label (where the player will step) in a generic fashion.
