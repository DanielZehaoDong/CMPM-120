class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        this.load.image('background', './assets/img/background.png');
        this.load.image('tiger', './assets/img/tiger.png');
        this.load.audio('bgmMenu', './assets/audio/bgmMenu.wav');
    }
    create() {
        let menuConfig = {
            fontFamily: 'cursive',
            fontSize: '40px',
            color: '#ffa500',
            align: 'right',
        fixedWidth: 0
        }
        this.bgmMenu = this.sound.add("bgmMenu", { loop: true });
        this.bgmMenu.play();
        this.add.sprite(0,0,"background").setOrigin(0,0);
        this.add.text(game.config.width/2,game.config.height/2, 'Endless Runner', menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize=24;
        this.add.text(game.config.width/2,game.config.height/2+10+15, 'By Zehao Dong', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/2+10+15+35, 'Press T for Tutorials', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/2+10+15+35+60, 'Press Space to Play', menuConfig).setOrigin(0.5,0.5);
       
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.add.sprite(game.config.width/2,game.config.height-25,"tiger");
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            let textureManager = this.textures;
            this.game.renderer.snapshot((snapshotImage) => {
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                textureManager.addImage('titlesnapshot', snapshotImage);
            });
            this.bgmMenu.stop();
            this.scene.start('playScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.scene.start('tutorialScene'); 
        }
    }
}