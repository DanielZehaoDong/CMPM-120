// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
  
        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 10;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }
    update() {
        if(keyLEFT.isDown && this.x>=borderUISize+this.width){
            this.x-=this.moveSpeed;
        }else if(keyRIGHT.isDown && this.x<=game.config.width-borderUISize-this.width){
            this.x+=this.moveSpeed;
        }

        if(Phaser.Input.Keyboard.JustDown(keyF)&& !this.isFiring){
            this.isFiring=true;
            this.sfxRocket.play();  // play sfx
        }
        if(this.isFiring&&this.y>=borderUISize*3+borderPadding){
            this.y -=this.moveSpeed;
        }
        if(this.y<=borderUISize*3+borderPadding){
            this.reset();
        }
        if(game.input.mousePointer.x<=borderUISize && (game.input.mousePointer.y>=(borderPadding+borderUISize)) && (game.input.mousePointer.y<=(game.config.height-borderPadding))){
            this.x=borderUISize;
        }
        else if(game.input.mousePointer.x>=game.config.width-borderUISize && (game.input.mousePointer.y>=(borderPadding+borderUISize)) && (game.input.mousePointer.y<=(game.config.height-borderPadding))){
            this.x=game.config.width-borderUISize;
        }
        else if((game.input.mousePointer.y>=(borderPadding+borderUISize)) && (game.input.mousePointer.y<=(game.config.height-borderPadding-borderUISize))){
            this.x=game.input.mousePointer.x;
        }
    }
    // reset Rocket to "ground"
    mouseShoot() {
        if(!this.isFiring){
        this.isFiring=true;
        this.sfxRocket.play();  // play sfx
        }
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}