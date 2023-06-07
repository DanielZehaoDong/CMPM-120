class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('egg', './assets/egg.png');
        this.load.image('bird', './assets/bird.png');
        this.load.image('farm', './assets/farm.jpeg');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 960, 720, 'farm').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'egg').setOrigin(0.5, 0);
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'bird', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'bird', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'bird', 0, 10).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //set up mouse control
        this.input.on('pointerdown', function (pointer){
            if (pointer.leftButtonDown()){
                this.p1Rocket.shootOnClick()
            }
        }, this);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // display time
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
        fixedWidth: 100
        }
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.updateTime, callbackScope: this, loop: true });
        this.currTime = game.settings.gameTimer/1000;
        this.timeLeft = this.add.text(game.config.width/2-borderUISize - borderPadding*2, borderUISize + borderPadding*2, this.currTime, timeConfig);
        scoreConfig.fixedWidth = 0;
        // GAME OVER flag
        this.gameOver = false;
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // implement the 'FIRE' UI
        this.fireText = this.add.text(game.config.width - 6*borderPadding-2*borderUISize, borderUISize + borderPadding*2, "", scoreConfig);
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    update() {
        if (this.p1Rocket.isFiring==true){
            this.fireText.text="FIRE";
        }
        else {
            this.fireText.text="";
        }
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {               
            this.p1Rocket.update(); // update rocket sprite
            this.ship01.update(); // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 
        
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        // implement timing/scoring mechanism
        if(this.currTime==0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        // power ups
        for (var i = 0; i < this.powerupListOne.length; i++) {
            if(game.settings.mode == 'hard'){
                this.powerupListOne[i].y+=3;
            }else{
                this.powerupListOne[i].y+=1;
            }
            if((this.powerupListOne[i].y>(game.config.height-borderPadding-borderUISize))){
                this.powerupListOne[i].destroy();
            }
            if(this.checkCollision(this.p1Rocket, this.powerupListOne[i])){
                this.powerupListOne[i].destroy();
                if(this.p1Rocket.powerup==2){
                    this.p1Rocket.setTexture('rocket');
                }
                this.p1Rocket.powerup=1;
                this.p1Score += 5;
                this.scoreLeft.text = this.p1Score;
            }
        }
        for (var i = 0; i < this.powerupListTwo.length; i++) {
            if(game.settings.mode == 'hard'){
                this.powerupListTwo[i].y+=3;
            }else{
                this.powerupListTwo[i].y+=1;
            }
            if((this.powerupListTwo[i].y>(game.config.height-borderPadding-borderUISize))){
                this.powerupListTwo[i].destroy();
            }
            if(this.checkCollision(this.p1Rocket, this.powerupListTwo[i])){
                this.powerupListTwo[i].destroy();
                this.p1Rocket.powerup=2;
                this.p1Rocket.setTexture('bigshot');
            }
        }
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
      }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // explosion sound effects
        switch (Math.floor(Math.random() * 5)){
            case 0:
                this.sound.play('sfx_explosion');
                break;
            case 1:
                this.sound.play('sfx_explosion1');
                break;
            case 2:
                this.sound.play('sfx_explosion2');
                break;
            case 3:
                this.sound.play('sfx_explosion3');
                break;
            case 4:
                this.sound.play('sfx_explosion4');
                break;
        }       
    }
    generatePowerUp(){
        var chance=Math.floor(Math.random() * 20);
        if(chance == 0){
            this.powerupListOne.push(this.add.sprite(this.p1Rocket.x+32,this.p1Rocket.y+16,"powerup1"));
        }else if(chance == 1){
            this.powerupListTwo.push(this.add.sprite(this.p1Rocket.x+32,this.p1Rocket.y+16,"powerup2"));
        }
    }
    updateTime (){
        if(this.currTime>0&&(!this.gameOver)){
            this.currTime -= 1; // One second
            this.timeLeft.text = this.currTime;
        }
    }
}