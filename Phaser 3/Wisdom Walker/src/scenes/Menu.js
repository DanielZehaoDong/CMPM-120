class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.image('gameMenu', './assets/gameMenu.png');
        this.load.image('bob', './assets/bob.png');
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
        this.add.sprite(0,0,"gameMenu").setOrigin(0,0);
        this.bgmMenu = this.sound.add("bgmMenu", { loop: true });
        this.bgmMenu.play();
        this.add.text(game.config.width/2,game.config.height/5+15+25+35, 'Press (A) for Acknowledgement', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/5+15+25+35+45, 'Press (T) for Tutorial', menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/5+15+25+35+45+55, 'Press (Space) to Play', menuConfig).setOrigin(0.5,0.5);
       
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.add.sprite(game.config.width/2,game.config.height-50,"bob");
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
            this.scene.start('overworldScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.scene.start('tutorialScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            this.bgmMenu.stop();
            this.scene.start('acknowledgeScene'); 
        }
    }
}
