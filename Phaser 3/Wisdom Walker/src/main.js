let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    zoom: 2,
    scene: [ Knowledge, Menu, Acknowledgement, Overworld, Tutorial ]
}

const game = new Phaser.Game(config)
let centerX = game.config.width/2;
let centerY = game.config.height/2;
// reserve keyboard vars
let keySPACE, keyENTER, keyLeft, keyRight, keyUp, keyDown, keyR, keyT, keyA;