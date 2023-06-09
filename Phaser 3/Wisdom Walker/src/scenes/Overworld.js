class Overworld extends Phaser.Scene {
    constructor(){
        super({key: 'overworldScene'})
        this.VEL = 100;
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('bob', 'bob.png');
        this.load.image('tilesetImage', 'gameTileset.png');
        this.load.tilemapTiledJSON('gameMapJSON', 'gameMap.json');
        this.load.spritesheet('portal','portal.png', {
            frameWidth: 48,
            frameHeight: 48,
        });
        this.load.image('book1', 'book1.png');
        this.load.audio('bgmPlay', 'bgmPlay.wav')
    }

    create(){
        const map = this.add.tilemap('gameMapJSON');
        const tileset = map.addTilesetImage('gameTileset', 'tilesetImage');

        //add background music
        this.bgmPlay = this.sound.add("bgmPlay", { loop: true });
        this.bgmPlay.play();

        // add layer
        const bgLayer = map.createLayer('Background', tileset, 0,0);
        const terrainLayer = map.createLayer('Terrain', tileset, 0,0);
        const treeLayer = map.createLayer('Tree', tileset, 0,0).setDepth(10);


         // add portal
         this.portal = this.physics.add.sprite(80, 752, 'portal');
         this.anims.create({
            key: "rotate",
            frameRate: 8,
            frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 1 }),
            repeat: -1
        });
         this.portal.play('rotate');

          // add bob
          this.bob = this.physics.add.sprite(32, 272, 'bob');
          this.bob.body.setCollideWorldBounds(true);

         // add book
         this.book1 = this.physics.add.sprite(752, 48, 'book1', 0);
         this.book1.destroyed = false;

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

        this.physics.world.collide(this.bob, this.book1, this.book1Collect, null, this);
        this.physics.world.collide(this.bob, this.portal, this.portalTrigger, null, this);
    }

    book1Collect(){
        this.book1.destroyed = true;
    }
    portalTrigger(){
        this.scene.start('colorScene')
        this.bgmPlay.stop();
    }
}