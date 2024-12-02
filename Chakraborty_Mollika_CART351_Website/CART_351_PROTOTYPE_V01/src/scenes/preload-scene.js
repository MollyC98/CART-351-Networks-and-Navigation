
import { GAMEPLAY_ASSET_KEYS, GAMEPLAY_BACKGROUND_ASSET_KEYS, PLAYERS_ASSET_KEYS, STRESSORS_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
//import { SCENE_KEYS } from './scene-keys.js';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    init(answers){
    console.log('inside preload')
    console.log(answers)
    if(answers["1"] == 'Deadlines'){
        this.chosenScene = 'DeadlineScene'
    }

    else if (answers["1"] == 'Overthinking'){
        this.chosenScene = 'OverthinkingScene'
    }
   

    }

    preload() {
    }

    create() {
       
        this.scene.start(this.chosenScene); // Start the GameScene after preload
    }
}


    
