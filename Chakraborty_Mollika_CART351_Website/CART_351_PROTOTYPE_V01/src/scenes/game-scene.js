import { SCENE_KEYS } from './scene-keys.js';
import { GAMEPLAY_BACKGROUND_ASSET_KEYS, GAMEPLAY_ASSET_KEYS, STRESSORS_ASSET_KEYS, PLAYERS_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.GAME_SCENE,
        });
    }

    preload() {
        // Load assets 
        this.load.image(GAMEPLAY_BACKGROUND_ASSET_KEYS.CLOUDY, 'assets/bg/placeholder.jpeg');
        this.load.image(GAMEPLAY_ASSET_KEYS.CARROT, 'assets/characters/kenney_jumper-pack/PNG/Items/carrot.png');
        this.load.image(STRESSORS_ASSET_KEYS.WINGMAN, 'assets/characters/kenney_jumper-pack/PNG/Enemies/wingman1.png');
        this.load.image(PLAYERS_ASSET_KEYS.BUNNY, 'assets/characters/kenney_jumper-pack/PNG/Players/bunny1_ready.png');
    }

    create() {
        // Create background
        this.add.image(4000, 2075, GAMEPLAY_BACKGROUND_ASSET_KEYS.CLOUDY).setDisplaySize(8000, 4150);

        // Create the bunny
        this.bunny = this.physics.add.sprite(4000, 2075, PLAYERS_ASSET_KEYS.BUNNY).setOrigin(0.5, 0.5);
        this.bunny.setCollideWorldBounds(true); // Prevent bunny from going out of bounds

        //  group for carrots
        this.carrots = this.physics.add.group({
            key: GAMEPLAY_ASSET_KEYS.CARROT,
            repeat: 5, // Number of carrots
            setXY: { x: 100, y: 0, stepX: 200 } // Positioning
        });

        // group for stressors
        this.stressors = this.physics.add.group({
            key: STRESSORS_ASSET_KEYS.WINGMAN,
            repeat: 3, // Number of stressors
            setXY: { x: 600, y: 100, stepX: 300 } // Positioning
        });

        // collision between bunny and carrots
        this.physics.add.overlap(this.bunny, this.carrots, this.collectCarrot, null, this);

        // collision between bunny and stressors
        this.physics.add.overlap(this.bunny, this.stressors, this.hitStressor, null, this);
    }

    update() {
        // Update bunny movement based on user input
        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            this.bunny.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            this.bunny.setVelocityX(160);
        } else {
            this.bunny.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            this.bunny.setVelocityY(-160);
        } else if (cursors.down.isDown) {
            this.bunny.setVelocityY(160);
        } else {
            this.bunny.setVelocityY(0);
        }
    }

    collectCarrot(bunny, carrot) {
        carrot.destroy(); // Remove the carrot from the scene
        // Optionally, increment a score here
        console.log('Carrot collected!');
    }

    hitStressor(bunny, stressor) {
        // Handle collision with stressor
        console.log('Hit by stressor!');
       
    }
}
