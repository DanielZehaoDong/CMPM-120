class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    preload() {
        this.load.image('background', './assets/img/background.png');
        this.load.audio('bgmMenu', './assets/audio/bgmMenu.wav');
    }
    create() {
        let menuConfig = {
            fontFamily: 'cursive',
            fontSize: '24px',
            color: '#ffa500',
            align: 'right',
        fixedWidth: 0
        }
        this.add.text(game.config.width/2+100,game.config.height/4+80, 'Try to avoid the obstructions', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+25, 'Use ← and → to move', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100-25, 'Keep alive!', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/4+80+100, 'Good luck bro!', menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize=24;
        this.add.text(game.config.width/2,game.config.height*9/10, "Press Spave to start!", menuConfig).setOrigin(0.5,0.5);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');    
        }
    }
}