import Phaser from 'phaser';
import GetReady from './getready.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import Scaling from './Scaling.js';

let timedEvent;

export default class Loading extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    // load in assets
    preload() {
        this.load.video('tutorial', Scaling.imagePath("tutorial", "mp4"), 'loadeddata', false, false);
    }
    //the next scene will start when this gets called
    NextScene() {
        this.scene.start("GetReady");
    }
    //the screen fades out to black
    FadeOut() {
        this.cameras.main.fadeOut(500, 0, 0, 0);
    }

    create() {
        //screen fades in from black
        this.cameras.main.fadeIn(500, 0, 0, 0)
        //creates video
        let vid = this.video = this.add.video(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(360), 'tutorial');

        //plays video
        this.video.play();

        //prevents video from pause when tab out
        vid.setPaused(false);

        //after a set time the screen will fade out
        timedEvent = this.time.delayedCall(5000, this.FadeOut, [], this);
        //after a set time the next scene will start
        timedEvent = this.time.delayedCall(6000, this.NextScene, [], this);


    }


    update() {


    }
}

