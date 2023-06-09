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
    scene: [ Play, Menu, Acknowledgement ]
}

const game = new Phaser.Game(config)