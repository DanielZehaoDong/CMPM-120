class Acknowledgement extends Phaser.Scene {
    constructor() {
        super("acknowledgementScene");
    }
    preload() {
        this.load.image('ackBackground', './assets/ackbackground.png');
        this.load.image('book','./assets/book.png')
        this.load.audio('bgmAck', './assets/bgmAck.wav')
    }
    create() {
    let menuConfig = {
        fontFamily: 'Cursive',
        fontSize: '24px',
        color: '#00FFFF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
      }
        this.add.sprite(0,0,"ackBackground").setOrigin(0,0);
        this.bgmAck = this.sound.add("bgmAck", { loop: true });
        this.bgmAck.play();
        this.add.text(game.config.width/2,game.config.height/10, "Tileset are not created by us,", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/10+50, "the credit goes to all the assets from the LPC contest.", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/10+50+50, "Image of Bob, Book, and Gate created by Noctis Wang", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/10+50+50+50, "Tileset Map and background image created by Zehao Dong", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/10+50+50+50+50, "Audio and sound effect created by 'https://sfx.productioncrate.com'/", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/10+50+50+50+50+50, "Programmed by Zehao Dong", menuConfig).setOrigin(0.5,0.5);
        menuConfig.fontSize='32px';
        this.add.text(game.config.width/2,game.config.height/10+50+50+50+50+50, "Thank you for supporting Wisdom Walker", menuConfig).setOrigin(0.5,0.5);
        this.add.text(game.config.width/2,game.config.height/10+50+50+50+50+50+50, "Press Enter to go back to menu", menuConfig).setOrigin(0.5,0.5);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.sprite(game.config.width/2,game.config.height-50,"book");
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.bgmAck.stop();
            this.scene.start('menuScene');    
        }
    }
}