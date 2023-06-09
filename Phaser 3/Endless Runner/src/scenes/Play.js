class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    preload() {
        this.load.image('background', './assets/img/background.png');
        this.load.image('tiger', './assets/img/tiger.png');
        this.load.image('missile', './assets/img/missile.png');
        this.load.spritesheet('death', './assets/img/death.png', {frameWidth: 48, frameHeight: 24, startFrame: 0, endFrame: 9});
        this.load.audio('bgmPlay', ['./assets/audio/bgmPlay.wav']);
        this.load.audio('bgmMenu', './assets/audio/bgmMenu.wav');
        this.load.audio('deathAudio', './assets/audio/deathAudio.wav');
        this.load.audio('gameOver', './assets/audio/gameOver.wav');
    }
    create() {
        this.bgmPlay = this.sound.add("bgmPlay", { loop: true });
        this.gameOver = this.sound.add("gameOver", { loop: true });
        this.bgmPlay.play();
        this.backgroundTracker=0;
        let menuConfig = {
            fontFamily: 'cursive',
            fontSize: '24px',
            color: '#ffa500',
            align: 'right',
        fixedWidth: 0
        }
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.background = this.add.tileSprite(0, 0, 1000, 1000, 'background').setOrigin(0, 0);
        this.tiger = this.physics.add.sprite(game.config.width/2,game.config.height-50, 'tiger').setOrigin(0.5);
        this.tiger.setCollideWorldBounds(true);
        this.tiger.destroyed = false;
        this.totalScore=0;
        
        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('death', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        /*if (this.textures.exists('titlesnapshot')) {
            let titleSnapLeft = this.add.image(centerX, centerY, 'titlesnapshot').setOrigin(0.5);
            titleSnapLeft.setCrop(0,0,350,700);
            this.tweens.add({
                targets: titleSnapLeft,
                duration: 4500,
                alpha: { from: 1, to: 0 },
                scale: { from: 1, to: 0 },
                repeat: 0,
                x: { from: centerX, to: 0 }
            });
            let titleSnapRight = this.add.image(centerX, centerY, 'titlesnapshot').setOrigin(0.5);
            titleSnapRight.setCrop(350,0,350,700);
            this.tweens.add({
                targets: titleSnapRight,
                duration: 4500,
                alpha: { from: 1, to: 0 },
                scale: { from: 1, to: 0 },
                repeat: 0,
                x: { from: centerX, to: game.config.width },
                gameFinish: this.gameFinish.bind(this)
            });
        }
        */

        this.missile1 = new Obstruction(this, Math.floor(Math.random() * 1000), 0, 'missile', 0, 5, false).setOrigin(0, 0);
        this.missile2 = new Obstruction(this, Math.floor(Math.random() * 1000), 0, 'missile', 0, 5, false).setOrigin(0, 0);
        this.missile3 = new Obstruction(this, Math.floor(Math.random() * 1000), 0, 'missile', 0, 5, false).setOrigin(0, 0);
        this.missile4 = new Obstruction(this, Math.floor(Math.random() * 1000), 0, 'missile', 0, 5, false).setOrigin(0, 0);
        this.missile5 = new Obstruction(this, Math.floor(Math.random() * 1000), 0, 'missile', 0, 5, false).setOrigin(0, 0);
        let gameOverConfig = {
            fontFamily: 'Cursive',
            fontSize: '24px',
            backgroundColor: '#007FFF',
            color: '#8F8FBD',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        fixedWidth: 100
        };
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.totalTime=0;
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.changeTime, callbackScope: this, loop: true });
        
        let scoreConfig = {
            fontFamily: 'Cursive',
            fontSize: '36px',
            color: '#8F8FBD',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            }
        };
        this.scoreTracker = this.add.text(game.config.width/2, this.totalScore, scoreConfig).setOrigin(0.5);
    }
    
    update() { 
        if(!this.tiger.destroyed){
            this.background.tilePositionY -= 4;
            this.background.tilePositionY -= this.backgroundTracker;
            if(keyLeft.isDown){
                this.tiger.x-=5;
            }
            if(keyRight.isDown){
                this.tiger.x+=5;
            }
            this.missile1.update();
            this.missile2.update();
            this.missile3.update();
            this.missile4.update();
            this.missile5.update();
            this.physics.world.collide(this.tiger, this.missile1, this.gotHit, null, this);
            this.physics.world.collide(this.tiger, this.missile2, this.gotHit, null, this);
            this.physics.world.collide(this.tiger, this.missile3, this.gotHit, null, this);
            this.physics.world.collide(this.tiger, this.missile4, this.gotHit, null, this);
            this.physics.world.collide(this.tiger, this.missile5, this.gotHit, null, this);
        }
        if(this.tiger.destroyed){
            this.tigerDeath(this.tiger); 
            this.sound.play('deathAudio')
        }
    
        if (this.tiger.destroyed && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.bgmPlay.stop();
            this.scene.restart();

        }
        if (this.tiger.destroyed && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.bgmPlay.stop();
            this.scene.start("menuScene");
        }
    }

    tigerDeath() {
        this.tiger.alpha = 0;
            let boom = this.add.sprite(tiger.x, tiger.y, 'death').setOrigin(0, 0);
            boom.anims.play('death');
            boom.on('animationcomplete', () => {
            boom.destroy();
            });
    }

    gotHit() {
        
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+64, 'You survived for:    seconds and earned    points!', this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2-55, game.config.height/2+64, this.totalTime, this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2+155, game.config.height/2+64, this.totalScore, this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64+25, 'Press (R) to Restart or (SPACE) for Menu', this.gameOverConfig).setOrigin(0.5);
        this.tiger.destroyed = true;
        this.sound.play('gameOver');
    }
    changeTime() {
        if((this.totalTime%5==0)&&(!this.tiger.destroyed)&&(this.totalTime!=0)){
            this.missile1.setSpeed(this.missile1.moveSpeed+1);
            this.missile2.setSpeed(this.missile2.moveSpeed+1);
            this.missile3.setSpeed(this.missile3.moveSpeed+1);
            this.missile4.setSpeed(this.missile4.moveSpeed+1);
            this.missile5.setSpeed(this.missile5.moveSpeed+1);
            this.backgroundTracker++;
        }
        this.totalTime++;
        if(!this.tiger.destroyed){
            this.totalScore+=5;
        }
    }

    gameFinish() {
        this.textures.remove('titlesnapshot');
    }
}