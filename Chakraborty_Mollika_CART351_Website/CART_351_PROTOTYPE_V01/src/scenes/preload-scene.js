import { GAMEPLAY_ASSET_KEYS, GAMEPLAY_BACKGROUND_ASSET_KEYS, PLAYERS_ASSET_KEYS, STRESSORS_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js'
import { SCENE_KEYS } from './scene-keys.js';


export class PreloadScene extends Phaser.Scene{
    constructor (){
        super({

            key: SCENE_KEYS.PRELOAD_SCENE,

        });

        console.log(SCENE_KEYS.PRELOAD_SCENE);
    }


    preload(){

        //bg
        this.load.image( GAMEPLAY_BACKGROUND_ASSET_KEYS.CLOUDY
            , 'assets/bg/placeholder.jpeg')

        //stressors/enemies

        this.load.image( STRESSORS_ASSET_KEYS.WINGMAN
            , 'assets/characters/kenney_jumper-pack/PNG/Enemies/wingman1.png')

        this.load.image( PLAYERS_ASSET_KEYS.BUNNY
            , 'assets/characters/kenney_jumper-pack/PNG/Players/bunny1_ready.png')

        //item 

        this.load.image( GAMEPLAY_ASSET_KEYS.CARROT
            , 'assets/characters/kenney_jumper-pack/PNG/Items/carrot.png')
    
        
    };


    create(){
        console.log('create');
       console.log( this.textures.get('background'));
       this.add.image(0,0,GAMEPLAY_BACKGROUND_ASSET_KEYS.CLOUDY).setOrigin(0)
       
};
    }

    
