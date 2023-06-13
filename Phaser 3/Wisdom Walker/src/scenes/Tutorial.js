class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    preload() {
        this.load.image('ackBackground', './assets/ackbackground.png');
        this.load.image('portal', './assets/portal.png');
        this.load.audio('bgmMenu', './assets/bgmMenu.wav');        
    }
    create() {
        let menuConfig = {
            fontFamily: 'cursive',
            fontSize: '24px',
            color: '#ffa500',
            align: 'left',
        fixedWidth: 0
        }
        this.bgmMenu = this.sound.add("bgmMenu", { loop: true });
        this.bgmMenu.play();
        this.add.text(game.config.width/2+100,game.config.height/5+60, 'Find the red book and send it to the portal', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/5+60+100, 'Use ← → ↑ ↓ to move', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/5+60+100+100, 'You will earn points after transport the book', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2+100,game.config.height/5+60+100+100+50, 'Be the most Wisdom Walker in the world!', menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize=40;
        this.add.text(game.config.width/2,game.config.height*9/10, "Press Space to start or Enter back to menu!", menuConfig).setOrigin(0.5,0.5);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.sprite(game.config.width/2,game.config.height-50,"portal");
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('menuScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.bgmMenu.stop();
            this.scene.start('overworldScene');    
        }
    }
}