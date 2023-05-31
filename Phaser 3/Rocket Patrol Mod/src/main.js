// Zehao Dong
// Running Chicken
// 10h
// Track a high score that persists across scenes and display it in the UI (5)
// Implement the 'FIRE' UI text from the original game (5)
// Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
// Implement the speed increase that happens after 30 seconds in the original game (5)
// Randomize each spaceship's movement direction at the start of each play (5)
// Create a new scrolling tile sprite for the background (5)

let config = {
    type: Phaser.CANVAS,
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
