class Overworld extends Phaser.Scene {
    constructor(){
        super({key: 'overworldScene'})
        this.VEL = 100;
    }
    preload(){
        this.load.path = './assets/';
        this.load.spritesheet('bob', 'bob.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.image('tilesetImage', 'gameTileset.png');
        this.load.tilemapTiledJSON('gameMapJSON', 'gameMap.json');
        this.load.spritesheet('portal','portal.png', {
            frameWidth: 48,
            frameHeight: 48,
        });
        this.load.image('book', 'book.png');
        this.load.audio('bgmPlay', 'bgmPlay.wav')
    }

    create(){
        const map = this.add.tilemap('gameMapJSON');
        const tileset = map.addTilesetImage('gameTileset', 'tilesetImage');

        // add layer
        const bgLayer = map.createLayer('Background', tileset, 0,0);
        const terrainLayer = map.createLayer('Terrain', tileset, 0,0);
        const treeLayer = map.createLayer('Tree', tileset, 0,0).setDepth(10);

         // add bob
         this.bob = this.physics.add.sprite(32, 32, 'bob', 0);
         this.anims.create({
             key: 'walk',
             frameRate: 8,
             repeat: -1,
             frames: this.anims.generateFrameNumbers('bob', {
                 start: 0,
                 end: 1
             })
         });
         this.bob.play('walk');
         this.bob.body.setCollideWorldBounds(true);

         // add portal
         this.portal = this.physics.add.sprite(48, 48, 'portal', 0);
         this.anims.create({
             key: 'rotate',
             frameRate: 4,
             repeat: -1,
             frames: this.anims.generateFrameNumbers('portal', {
                 start: 0,
                 end: 1
             })
         });
         this.portal.play('rotate');

         // add book
         this.book = this.physics.add.sprite(48, 48, 'book', 0);
         this.book.destroyed = false;

         //add background music
         this.bgmPlay = this.sound.add("bgmPlay", { loop: true });
         this.bgmPlay.play();

         

         // enable collision
        terrainLayer.setCollisionByProperty({collides: true});
        treeLayer.setCollisionByProperty({collides: true});
        
        this.physics.add.collider(this.bob, terrainLayer);
        this.physics.add.collider(this.bob, treeLayer);

         // cameras
         this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
         this.cameras.main.startFollow(this.slime, true, 0.25, 0.25);
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

        this.physics.world.collide(this.bob, this.book, this.bookCollect, null, this);
    }

    bookCollect(){
        this.book.destroyed = true;
        this.physics.world.collide(this.bob, this.portal, this.portalTrigger, null, this);
    }
    portalTrigger(){
        this.scene.start('colorScene')
    }
}