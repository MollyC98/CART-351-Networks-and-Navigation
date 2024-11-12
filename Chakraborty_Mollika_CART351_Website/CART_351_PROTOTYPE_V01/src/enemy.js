import Phaser from "./lib/phaser.js";
export default class Enemy extends Phaser.Physics.Arcade.Sprite{ 
    constructor(scene,x,y,texture,player) {
        super(scene,x,y,texture)
        
        this.player = player //bunny
        this.x = x;
        this.y = y;

        scene.physics.world.enable(this);
        this.setScale(0.5);
        this.setCollideWorldBounds(true);
        scene.add.existing(this);


        //this.magnitude = 0;
        this.speedX = 1;
        this.speedY =1;
       // this.calcSpeed();
        //this.magnitude = Math.sqrt((this.speed*this.speed)+(this.speedY*this.speedY));
       // console.log(this.magnitude)


    }

    calcSpeed(){
        this.speedY =((this.player.y - this.y));

    }
    checkBounds(){
        if (this.x > 450 || this.x< 50)
         {
            this.speedX = -this.speedX;
        }
          
            
    
    }
}