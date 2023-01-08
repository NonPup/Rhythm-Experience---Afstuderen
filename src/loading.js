import Phaser from 'phaser';
import Tutorial from './tutorial.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import Scaling from './Scaling.js';

let timedEvent;

export default class Loading extends Phaser.Scene {
    constructor() {
        super('Loading');
    }

    // load in assets
    preload() {
        this.load.image('loadingbg', Scaling.imagePath("loadingbg", "png"));
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        this.load.spritesheet('logoload', Scaling.imagePath("logosprite", "png"), { frameWidth: Scaling.getPixelbyDPR(100), frameHeight: Scaling.getPixelbyDPR(100) });
        this.load.image('colorbg', Scaling.imagePath("colorbg", "png"));
    }
    //the next scene will start when this gets called
    NextScene() {
        this.scene.start("Tutorial");
    }
    //the screen fades out to black
    FadeOut() {
        this.cameras.main.fadeOut(500, 0, 0, 0);
    }

    create() {
        //screen fades in from black
        this.cameras.main.fadeIn(500, 0, 0, 0);
        //load bg image
        this.loadingbg = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(350), 'loadingbg');
        //animates the moving logo from spritesheet
        const logoanimation = this.anims.create({
            key: 'logo',
            frames: this.anims.generateFrameNumbers('logoload'),
            frameRate: 10
        });
        //puts in spritesheet
        const sprite = this.add.sprite(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(300), 'logoload').setScale(1);

        //plays the spritesheet 10 times
        sprite.play({ key: 'logo', repeat: 10 });

        //after a set time the screen will fade out
        timedEvent = this.time.delayedCall(2000, this.FadeOut, [], this);
        //after a set time the next scene will start
        timedEvent = this.time.delayedCall(3000, this.NextScene, [], this);


    }


    update() {


    }
}

