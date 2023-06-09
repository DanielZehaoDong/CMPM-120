class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('bob', './assets/bob.png');
        this.load.image('book', './assets/book.png');
        this.load.image('portal', './assets/portal.png');
        this.load.audio('bgmPlay', './assets/audio/bgmPlay.wav');
    }
    
    create() {

    }

    update() {

    }
}