import Phaser from './lib/phaser.js';
// import { SCENE_KEYS } from './scenes/scene-keys.js';
import { PreloadScene } from './scenes/preload-scene.js';
import { DeadlineScene } from './scenes/deadline-scene.js'; // Import GameScene
import { OverthinkingScene } from './scenes/overthinking-scene.js'; //overthinking scene
import showSurvey from './survey.js';

window.onload = function(){

    document.querySelector("#play").addEventListener("click", function(e){
        e.preventDefault();
        //showLogin
        // go to survey
        showSurvey(startGame);
    })
   

function startGame(answers)  {
    // Hide the survey and start the game
    document.getElementById('survey').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';  // Show game container


        const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1280,
        height: 736,

        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            //zoom: 4
        },

        dom: {
            createContainer: true
        },
        parent: "game-container",
    
        // scale: {
        //     parent: 'game-container',
            
        
        //     // mode: Phaser.Scale.FIT,
        //     // autoCenter: Phaser.Scale.CENTER_BOTH
        // },
        scene: [PreloadScene,DeadlineScene, OverthinkingScene], // Only include scenes needed for gameplay
    
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200, x: 0 },
                debug: false
            }
        },
       
    });


    // Add Phaser game scenes
    //game.scene.add('Preload', PreloadScene);

    // Start the Preload scene
    game.scene.start('PreloadScene', answers);
}
}
