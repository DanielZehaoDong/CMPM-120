class Gameover extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }
    preload() {
        this.load.image('gameOver', './assets/gameOver.png');
        this.load.image('bob', './assets/bob.png');
        this.load.audio('bgmMenu', './assets/bgmMenu.wav');
    }
    create() {
        let menuConfig = {
            fontFamily: 'cursive',
            fontSize: '50px',
            color: '#9400D3',
            align: 'right',
        fixedWidth: 0
        }
        this.add.sprite(0,0,"gameOver").setOrigin(0,0);
        this.bgmMenu = this.sound.add("bgmMenu", { loop: true });
        this.bgmMenu.play();
        this.add.text(game.config.width/2,game.config.height/5+40+50+60+70, 'Press (Enter) for Menu', menuConfig).setOrigin(0.5,0.5);
       
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.sprite(game.config.width/2,game.config.height-50,"bob");
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('menuScene'); 
        }
    }
}