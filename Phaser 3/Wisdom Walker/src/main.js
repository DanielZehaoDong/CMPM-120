let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 800,
    height: 800,
    scene: [Menu, Acknowledgement, Overworld, Tutorial],
    zoom: 2,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    }
};

const game = new Phaser.Game(config);
let centerX = game.config.width/2;
let centerY = game.config.height/2;
// reserve keyboard vars
let keySPACE, keyENTER, keyLeft, keyRight, keyUp, keyDown, keyR, keyT, keyA;