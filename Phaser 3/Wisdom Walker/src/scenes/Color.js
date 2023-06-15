class Color extends Phaser.Scene {
    constructor(){
        super({key: 'colorScene'})
        this.VEL = 100;
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('bob', 'bob.png');
        this.load.image('tilesetImage', 'gameTileset.png');
        this.load.tilemapTiledJSON('gameMap2JSON', 'gameMap2.json');
        this.load.spritesheet('portal','portal.png', {
            frameWidth: 48,
            frameHeight: 48,
        });
        this.load.image('book2', 'book2.png');
        this.load.audio('bgmPlay', 'bgmPlay.wav')
    }

    create(){
        const map = this.add.tilemap('gameMap2JSON');
        const tileset = map.addTilesetImage('gameTileset', 'tilesetImage');

        //add background music
        this.bgmPlay = this.sound.add("bgmPlay", { loop: true });
        this.bgmPlay.play();

        // add layer
        const bgLayer = map.createLayer('Background', tileset, 0,0);
        const terrainLayer = map.createLayer('Terrain', tileset, 0,0);
        const treeLayer = map.createLayer('Tree', tileset, 0,0).setDepth(10);


         // add portal
         this.portal = this.physics.add.sprite(736, 704, 'portal');
         this.anims.create({
            key: "rotate",
            frameRate: 8,
            frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 1 }),
            repeat: -1
        });
         this.portal.play('rotate');

          // add bob
          this.bob = this.physics.add.sprite(752, 32, 'bob');
          this.bob.body.setCollideWorldBounds(true);

         // add book
         this.book2 = this.physics.add.sprite(608, 336, 'book2', 0);
         this.book2.destroyed = false;

         // enable collision
        terrainLayer.setCollisionByProperty({collides: true});
        treeLayer.setCollisionByProperty({collides: true});
        
        this.physics.add.collider(this.bob, terrainLayer);
        this.physics.add.collider(this.bob, treeLayer);

         // cameras
         this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
         this.cameras.main.startFollow(this.bob, true, 0.25, 0.25);
         this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

         // input
        this.cursors = this.input.keyboard.createCursorKeys();
 
    }

    update(){
        this.direction = new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
            this.direction.x = -1;
        }else if(this.cursors.right.isDown){
            this.direction.x = 1;
        }
        if(this.cursors.up.isDown){
            this.direction.y = -1;
        }else if(this.cursors.down.isDown){
            this.direction.y = 1;
        }
        this.direction.normalize();
        this.bob.setVelocity(this.VEL * this.direction.x , this.VEL * this.direction.y);

        this.physics.world.collide(this.bob, this.book2, this.book2Collect, null, this);
        this.physics.world.collide(this.bob, this.portal, this.portalTrigger, null, this);
    }

    book2Collect(){
        this.book2.destroyed = true;
    }
    portalTrigger(){
        this.scene.start('gameoverScene')
    }
}