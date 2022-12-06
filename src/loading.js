import Phaser from 'phaser';
import Loadingbg from './assets/loadingbg.png';
import GetReady from './getready.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';

let timedEvent;

export default class Loading extends Phaser.Scene {
    constructor() {
        super('Loading');
    }

    // load in assets
    preload() {
        this.load.image('loadingbg', Loadingbg);
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        this.load.spritesheet('logoload', './src/assets/logosprite.png', { frameWidth: 100, frameHeight: 100 });
    }

    NextScene() {
        this.scene.start("GetReady");
    }

    FadeOut() {
        this.cameras.main.fadeOut(500, 0, 0, 0);
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.loadingbg = this.add.image(187, 350, 'loadingbg');
        const logoanimation = this.anims.create({
            key: 'logo',
            frames: this.anims.generateFrameNumbers('logoload'),
            frameRate: 10
        });

        const sprite = this.add.sprite(187, 300, 'logoload').setScale(1);

        sprite.play({ key: 'logo', repeat: 10 });

        timedEvent = this.time.delayedCall(2000, this.FadeOut, [], this);
        timedEvent = this.time.delayedCall(3000, this.NextScene, [], this);


    }


    update() {


    }
}

