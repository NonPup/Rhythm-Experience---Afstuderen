import Phaser from 'phaser';
import Loadingbg from './assets/loadingbg.png';
import Colorbg from './assets/colorbg.png';
import MyGame from './Game.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';

let timedEvent;

export default class GetReady extends Phaser.Scene {
    constructor() {
        super('GetReady');
    }

    // load in assets
    preload() {
        this.load.image('colorbg', Colorbg);
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    }

    NextScene() {
        this.scene.start("MyGame");
    }


    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.counting = 3;
        this.colorbg = this.add.image(187, 350, 'colorbg');

        this.countdown = this.add.text(160, 300, this.counting, { font: '72px Bebas Neue', fill: '#FFFFFF' });

        timedEvent = this.time.addEvent({
            delay: 1000, callback: () => {
                this.counting = this.counting - 1;
                this.countdown.setText(this.counting)
                console.log('beep')
                if (this.counting == 1){
                    this.cameras.main.fadeOut(1000, 0, 0, 0);}
            }, callbackScope: this, repeat: 3, repeatCount: 0
        });
        //timedEvent = this.time.delayedCall(3000, this.NextScene, [], this);


    }


    update() {

        if (this.counting == 0) {
            this.NextScene();
        }
    }
}

