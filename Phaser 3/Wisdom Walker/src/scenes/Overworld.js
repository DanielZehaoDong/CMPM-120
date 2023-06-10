class Overworld extends Phaser.Scenes {
    constructor() {
        super({key: 'overworldScene'})

        this.VEL = 100;
    }

    preload() {
        this.load.path = './assets/';
        this.load.spritesheet('bob', 'bob.png', {
            framewidth: 32,
            frameheight: 48
        });
        this.load.image('tilesetImage', 'gameTileset.png');
        this.load.tilemapTiledJSON('gamemapJSON', 'gameMap.json');
    }

    create() {
        const map = this.add.tilemap('gamemapJSON');
        const tileset = map.addTilesetimage('tileset', 'tilesetImage');

        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0);
        const treeLayer = map.createLayer('Trees', tileset, 0, 0).setDepth(10);

        this.bob = this.physics.add.sprite(32, 48, 'bob', 0);
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

        terrainLayer.setCollisionByProperty({ collides: true });
        treeLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.bob, terrainLayer);
        this.physics.add.collider(this.bob, treeLayer);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.bob, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        this.direction = new Phaser.Math.Vector2(0);
        if(this.cursors.left.isDown){
            this.direction.x = -1;
        }
        else if(this.cursors.right.isDown){
            this.direction.x = 1;
        }
        else if(this.cursors.up.isDown){
            this.direction.y = -1;
        }
        else if(this.cursors.down.isDown){
            this.direction.y = 1;
        }
        this.direction.normalize();
        this.bob.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y);


    }
}