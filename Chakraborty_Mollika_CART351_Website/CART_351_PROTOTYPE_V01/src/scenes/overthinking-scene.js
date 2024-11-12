// import { SCENE_KEYS } from "./scene-keys.js";
import {
  GAMEPLAY_BACKGROUND_ASSET_KEYS,
  GAMEPLAY_ASSET_KEYS,
  STRESSORS_ASSET_KEYS,
  PLAYERS_ASSET_KEYS,
} from "../assets/asset-keys.js";
import Phaser from "../lib/phaser.js";
import Enemy from '../enemy.js'
import Bunny from '../bunny.js'

let toggle = false;


export class OverthinkingScene extends Phaser.Scene {
  constructor() {
    super('OverthinkingScene');
  }

  preload() {
    // Load assets
    this.load.image(
      GAMEPLAY_BACKGROUND_ASSET_KEYS.CLOUDY,
      "assets/bg/placeholder.jpeg"
    );
    this.load.image(
      GAMEPLAY_ASSET_KEYS.CARROT,
      "assets/characters/kenney_jumper-pack/PNG/Items/carrot.png"
    );
    this.load.image(
      STRESSORS_ASSET_KEYS.WINGMAN,
      "assets/characters/kenney_jumper-pack/PNG/Enemies/wingman1.png"
    );
    this.load.image(
      PLAYERS_ASSET_KEYS.BUNNY,
      "assets/characters/kenney_jumper-pack/PNG/Players/bunny1_ready.png"
    );
  }

  create() {

    // Create background
    this.add
      .image(250, 125, GAMEPLAY_BACKGROUND_ASSET_KEYS.CLOUDY)
      .setDisplaySize(1280, 720);

    // Create the bunny

    this.bunny = new Bunny(this,50,50,PLAYERS_ASSET_KEYS.BUNNY)
    
  



    //  group for carrots
    this.carrots = this.physics.add.staticGroup({
      key: GAMEPLAY_ASSET_KEYS.CARROT,
      repeat: 5, // Number of carrots
      setXY: { x: 100, y: 0, stepX: 200 }, // Positioning
    });

    // group for stressors

    this.stressorsArray = [];
    this.stressorInfoArray = [];
    this.speedX = 0;
    this.speedY = 0;

    this.stressorsArray.push(
        new Enemy(this,50,50,STRESSORS_ASSET_KEYS.WINGMAN,this.bunny)
      )
      this.stressorsArray.push(
        new Enemy(this,50,50,STRESSORS_ASSET_KEYS.WINGMAN,this.bunny)
      )
        
        
    




    // collision between bunny and carrots
    // this.physics.add.overlap(
    //   this.bunny,
    //   this.carrots,
    //   this.collectCarrot,
    //   null,
    //   this
    // );

   // collision between bunny and stressors
    this.physics.add.overlap(
      this.bunny,
      this.stressorsArray[0],
      this.hitStressor,
      null,
      this
    );



    let testTimer = setInterval(()=>{toggle = false
      
    },1000)


   // this.speedOriginalX = this.stressorInfoArray[0].speedX
    //this.speedOriginalY = this.stressorInfoArray[0].speedY

    this.breathe = this.add.text(this.sys.game.canvas.width/2-900, 1000, 'breathe in\nbreathe out', { font: '20px Arial', align: "center" });    
    this.breathe.setVisible(false)


    this.gameOverText = this.add.text(1500, 1500, 'GAME OVER\n(REFRESH)', { font: '20px CustomFont', align: "center" });    
    this.gameOverText.setVisible(false)

    this.controlsText = this.add.text(0, 0, 'UP ARROW: Move Up\nDOWN ARROW: Move Down\nSPACE: Calm Down (Slow Down TIme)', { font: '20px Arial' });    
    this.controlsText.setVisible(true)


  }

  update() {

    this.stressorsArray[0].checkBounds()
   // console.log(this.stressorsArray[0].x)
    
    this.stressorsArray[0].x += this.stressorsArray[0].speedX;
   this.stressorsArray[0].y += this.stressorsArray[0].speedY;

    // this.stressorsArray[0].setVelocityX(
    //   this.bunny.x - this.stressorsArray[0].x
    // );
    // this.stressorsArray[0].setVelocityY(
    //   this.bunny.y - this.stressorsArray[0].y
    // );
    // Update bunny movement based on user input
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.bunny.setVelocityX(-100);
    } else if (cursors.right.isDown) {
      this.bunny.setVelocityX(100);
    }
    // else {
    //   //this.bunny.setVelocityX(0);
    // }
    // if (cursors.space.isDown && toggle == false) {
    //     this.stressorInfoArray[0].speedX/=5;
    //     this.stressorInfoArray[0].speedY/=5;
    //     toggle = true;
    //     this.breathe.setVisible(true)

    // }

    if (cursors.up.isDown) {
      this.bunny.setVelocityY(-100);
    } else if (cursors.down.isDown) {
      this.bunny.setVelocityY(100);
     } 
    //else {
    //   //this.bunny.setVelocityY(0);
    // }
    /*if (toggle == false)
        {
            this.stressorInfoArray[0].speedX = this.speedOriginalX
            this.stressorInfoArray[0].speedY = this.speedOriginalY
            this.breathe.setVisible(false)
        }*/


// if (this.stressorsArray[0].x > 6000)
// {
//     this.stressorsArray[0].x = 200
//     this.stressorsArray[0].y = Math.random() *4000
//     this.stressorsArray[0].calcSpeed
//     this.speedOriginalX = this.stressorInfoArray[0].speedX
//     this.speedOriginalY = this.stressorInfoArray[0].speedY

// }


}

  

  collectCarrot(bunny, carrot) {
    carrot.destroy(); // Remove the carrot from the scene
    // Optionally, increment a score here
    
  }

  hitStressor(bunny, stressor) {
    // Handle collision with stressor
   
    this.stressorsArray[0].setVisible(false)
    this.bunny.setVisible(false)

    this.gameOverText.setVisible(true)
  }
}
