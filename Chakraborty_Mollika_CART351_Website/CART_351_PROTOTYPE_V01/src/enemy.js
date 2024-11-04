
class Enemy {
    constructor(player,x,y) {
        this.player = player
        this.x = x;
        this.y = y;
        this.magnitude = 0;
         this.speed = 100;
         this.calcSpeed();
        this.magnitude = Math.sqrt((this.speed*this.speed)+(this.speedY*this.speedY));
        console.log(this.magnitude)


    }
    calcSpeed(){
        if (this.x > this.player.x)
            {
                this.speedX = -this.speed
            }
            else {
                this.speedX = this.speed
            }
            this.speedY =((this.player.y - this.y)/(this.player.x - this.x)*this.speed);
    
    }
}