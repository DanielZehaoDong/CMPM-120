// Zehao Dong
// Endless Runner
// 20 Hours
// I create this game for a endless running game. The character should avoid different obstructions to survive.
// But you dont have ability to fight back. So keep suvive and good luck!


let config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 1000,
    scene: [ Menu, Play, Tutorial],
    physics: {
        default:"arcade",
        arcade:{
            //debug: True
        }
    }
}
let game = new Phaser.Game(config);
let centerX = game.config.width/2;
let centerY = game.config.height/2;
// reserve keyboard vars
let keySPACE, keyLeft, keyRight, keyT, keyR;