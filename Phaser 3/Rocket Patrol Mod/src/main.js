// Zehao Dong
// Running Chicken
// 12h
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
// Create a new title screen (e.g., new artwork, typography, layout) (10)
// Display the time remaining (in seconds) on the screen (10)
// Create 4 new explosion sound effects and randomize which one plays on impact (10)
// Allow the player to control the Rocket after it's fired (5)
// Implement the 'FIRE' UI text from the original game (5)
// Implement mouse control for player movement and mouse click to fire (15)

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
