// import { SCENE_KEYS } from "./scene-keys.js";
import {
  
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
    // Load the background image
    this.load.image('overthinkingBg', 'assets/bg/overthink_bg01.jpg'); // Replace path

    // Load the tilemap and tilesheet
    this.load.tilemapTiledJSON('overthinkingMap', 'assets/Tiles/overthinking02.json');
    this.load.image('tiles', 'assets/Tiles/platformPack_tilesheet.png');

    // Load the character walking sprite sheet
    this.load.spritesheet('player-walk', 'assets/characters/characterwalk.png', {
        frameWidth: 64, // Width of each frame
        frameHeight: 64, // Height of each frame


    });
}

create() {
    // Add the background image and scale it to fit the canvas
    const bg = this.add.image(0, 0, 'overthinkingBg').setOrigin(0, 0);
    //bg.setDisplaySize(1280, 1280); // Stretch to fit the canvas

    // Create the tilemap
    const map = this.make.tilemap({ key: 'overthinkingMap',tileWidth: 32, tileHeight:32 });

    // Add the tileset image to the map (must match the name in Tiled)
    const tileset = map.addTilesetImage('overthink_L1', 'tiles');

    // Create layers from the tilemap
    const groundLayer = map.createLayer('ground', tileset, 0, 0); // Main ground layer
    const wallLayer = map.createLayer('walls', tileset, 0, 0); // Walls for collisions
    const ladderLayer = map.createLayer ('stairs', tileset, 0, 0) //stairs 
    const heartsLayer =  map.createLayer('hearts', tileset, 0, 0 )  // hearts 

    // Enable collisions on the wall layer
    wallLayer.setCollisionByProperty({ collides: true }); 

    // Debug collisions (optional, remove for production)
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    wallLayer.renderDebug(debugGraphics, {
        tileColor: null, // Non-colliding tiles are transparent
        // collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255), // Red for colliding tiles
        // faceColor: new Phaser.Display.Color(0, 255, 0, 255), // Green for collision edges
    });

    // Create the walking animation for the player
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player-walk', { start: 0, end: 3 }),
        frameRate: 10, // Adjust for smoother animation
        repeat: -1, // Loop the animation
    });

    // Add the player sprite
    this.player = this.physics.add.sprite(100, 100, 'player-walk');
    this.player.setCollideWorldBounds(true); // Keep the player inside the game world

    // Enable collision between the player and wall layer
    this.physics.add.collider(this.player, wallLayer);

    // Set the camera to follow the player.
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    console.log( map.widthInPixels, map.heightInPixels);
}

update() {
    // Get keyboard input for controlling the player
    const cursors = this.input.keyboard.createCursorKeys();

    // movement and animations
    if (cursors.left.isDown) {
        this.player.setVelocityX(-200); // Move left
        this.player.anims.play('walk', true); // walking animation
        this.player.setFlipX(true); // Flip sprite to face left
    } else if (cursors.right.isDown) {
        this.player.setVelocityX(200); // Move right
        this.player.anims.play('walk', true); // walking animation
        this.player.setFlipX(false); // Face right
    } else {
        this.player.setVelocityX(0); // Stop moving
        this.player.anims.stop(); // Stop animation when idle
    }

    // Handle jumping
    if (cursors.space.isDown && this.player.body.blocked.down) {
        this.player.setVelocityY(-300); // Jump
    }
}
}
  

  

