
import Phaser from './lib/phaser.js';
import { SCENE_KEYS } from './scenes/scene-keys.js';
import { PreloadScene } from './scenes/preload-scene.js';
import { GameScene } from './scenes/game-scene.js'; // Import GameScene

const game = new Phaser.Game({
    type: Phaser.CANVAS,
    pixelArt: false,
    physics: {
        default: 'arcade', // Enable arcade physics
        arcade: {
            gravity: {
                y: 0,
                x: 0
            }, // No gravity
            debug: false // 
        }
    },
    scale: {
        parent: 'game-container',
        width: 8000,
        height: 4150,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#ffffff'
});

game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.add(SCENE_KEYS.GAME_SCENE, GameScene); // Add GameScene
game.scene.start(SCENE_KEYS.PRELOAD_SCENE);

