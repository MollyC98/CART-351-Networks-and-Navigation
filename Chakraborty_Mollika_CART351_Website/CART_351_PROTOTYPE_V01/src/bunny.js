import Phaser from "./lib/phaser.js";
export default class Bunny extends Phaser.Physics.Arcade.Sprite{ 
    constructor(scene,x,y,texture) {
        super(scene,x,y,texture)
        
        this.x = x;
        this.y = y;

        scene.physics.world.enable(this);
        this.setScale(0.3);
        this.setCollideWorldBounds(true);
        scene.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.setPosition(200,200)

    }

   
}