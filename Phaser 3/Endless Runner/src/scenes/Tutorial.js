class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    preload() {
        this.load.image('background', './assets/img/background.png');
        this.load.image('tiger', './assets/img/tiger.png');
        this.load.audio('bgmMenu', './assets/audio/bgmMenu.wav');
        
    }
    create() {
        let menuConfig = {
            fontFamily: 'cursive',
            fontSize: '24px',
            color: '#ffa500',
            align: 'left',
        fixedWidth: 0
        }
        this.add.text(game.config.width/2+100,game.config.height/5+60, 'Try to avoid the obstructions', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/5+60+100, 'Use <- and -> to move', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/5+60+100+100, 'Keep alive!', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/5+60+100+100+50, 'Good luck bro!', menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize=30;
        this.add.text(game.config.width/2,game.config.height*9/10, "Press Enter to back to menu!", menuConfig).setOrigin(0.5,0.5);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('menuScene');    
        }
    }
}