class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  preload() {
    // load audio
    this.load.audio('sfx_select', './assets/blip_select12.wav');
    this.load.audio('sfx_explosion', './assets/explosion38.wav');
    this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    this.load.audio('sfx_explosion1', './assets/explosion1.wav');
    this.load.audio('sfx_explosion2', './assets/explosion2.wav');
    this.load.audio('sfx_explosion3', './assets/explosion3.wav');
    this.load.audio('sfx_explosion4', './assets/explosion4.wav');

  }
  create() {
    // menu text configuration
    let menuConfig = {
      fontFamily: 'Cursive',
      fontSize: '36px',
      backgroundColor: '#00FFFF',
      color: '#000080',
      align: 'right',
      padding: {
          top: 5,
          bottom: 5,
      },
      fixedWidth: 0
    }
    // show menu text
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Running Chicken', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FFFF';
    menuConfig.color = '#000';
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000    
      }
      this.sound.play('sfx_select');
      this.scene.start('playScene');    
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000    
      }
      this.sound.play('sfx_select');
      this.scene.start('playScene');    
    }
  }
}