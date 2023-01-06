import Phaser from 'phaser';
import MyGame from './Game.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import Scaling from './Scaling.js';

let timedEvent;

export default class GetReady extends Phaser.Scene {
    constructor() {
        super('GetReady');
    }

    // load in assets
    preload() {
        this.load.image('colorbg', Scaling.imagePath("colorbg", "png"));
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    }

    NextScene() {
        this.scene.start("MyGame");
    }


    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.counting = 3;
        this.colorbg = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(350), 'colorbg');

        this.countdown = this.add.text(Scaling.getPixelbyDPR(160), Scaling.getPixelbyDPR(300), this.counting, { font: `${Scaling.getPixelbyDPR(72)}px Bebas Neue`, fill: '#FFFFFF' });

        timedEvent = this.time.addEvent({
            delay: 1000, callback: () => {
                this.counting = this.counting - 1;
                this.countdown.setText(this.counting)
                if (this.counting == 1) {
                    this.cameras.main.fadeOut(500, 0, 0, 0);
                }
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

