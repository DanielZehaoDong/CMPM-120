class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }
    preload() {
        this.load.image('background', './assets/img/background.png');
        this.load.image('character', './assets/img/character.png');
        this.load.image('obstruction', './assets/img/obstruction.png');
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
        this.background = this.add.tileSprite(0, 0, 1000, 800, 'background').setOrigin(0, 0);
        this.character = this.physics.add.sprite(game.config.width/2,game.config.height-50, 'character').setOrigin(0.5);
        this.character.setCollideWorldBounds(true);
        this.character.destroyed = false;
        this.totalScore=0;

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

        this.obstruction1 = new Obstruction(this, Math.floor(Math.random() * 400), 0, 'obstruction', 0, 5, false).setOrigin(0, 0);
        this.obstruction2 = new Obstruction(this, Math.floor(Math.random() * 400), 0, 'obstruction', 0, 5, false).setOrigin(0, 0);
        this.obstruction3 = new Obstruction(this, Math.floor(Math.random() * 400), 0, 'obstruction', 0, 5, false).setOrigin(0, 0);
        this.obstruction4 = new Obstruction(this, Math.floor(Math.random() * 400), 0, 'obstruction', 0, 5, false).setOrigin(0, 0);
        this.obstruction5 = new Obstruction(this, Math.floor(Math.random() * 400), 0, 'obstruction', 0, 5, false).setOrigin(0, 0);
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
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.updateTime, callbackScope: this, loop: true });
        
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
        if(!this.character.destroyed){
            this.background.tilePositionY -= 4;
            this.background.tilePositionY -= this.backgroundTracker;
            if(keyLeft.isDown){
                this.character.x-=5;
            }
            if(keyRight.isDown){
                this.character.x+=5;
            }
            this.obstruction1.update();
            this.obstruction2.update();
            this.obstruction3.update();
            this.obstruction4.update();
            this.obstruction5.update();
            this.physics.world.collide(this.character, this.obstruction1, this.gotHit, null, this);
            this.physics.world.collide(this.character, this.obstruction2, this.gotHit, null, this);
            this.physics.world.collide(this.character, this.obstruction3, this.gotHit, null, this);
            this.physics.world.collide(this.character, this.obstruction4, this.gotHit, null, this);
            this.physics.world.collide(this.character, this.obstruction5, this.gotHit, null, this);
        }
        if(this.character.destroyed){
            this.sound.play('deathAudio')
            this.character.setTexture('death')
        }
        if (this.character.destroyed && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.bgmPlay.stop();
            this.scene.restart();

        }
        if (this.character.destroyed && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.bgmPlay.stop();
            this.scene.start("menuScene");
        }
    }
    gotHit(){
        
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+64, 'You survived for:    seconds and earned    points!', this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2-55, game.config.height/2+64, this.totalTime, this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2+155, game.config.height/2+64, this.totalScore, this.gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64+25, 'Press (R) to Restart or (T) for Menu', this.gameOverConfig).setOrigin(0.5);
        this.ninja.destroyed = true;
        this.sound.play('gameOver');
    }
    changeTime (){
        if((this.totalTime%5==0)&&(!this.ninja.destroyed)&&(this.totalTime!=0)){
            this.obstruction1.setSpeed(this.obstruction1.moveSpeed+1);
            this.obstruction2.setSpeed(this.obstruction2.moveSpeed+1);
            this.obstruction3.setSpeed(this.obstruction3.moveSpeed+1);
            this.obstruction4.setSpeed(this.obstruction4.moveSpeed+1);
            this.obstruction5.setSpeed(this.obstruction5.moveSpeed+1);
            this.backgroundTracker++;
        }
        this.totalTime++;
        if(!this.character.destroyed){
            this.totalScore+=5;
        }
    }

    gameFinish(){
        this.textures.remove('titlesnapshot');
    }
}