import Phaser from 'phaser';
import Loading from './loading.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import Scaling from './Scaling.js';

export default class Spotify extends Phaser.Scene {
    constructor() {
        super('Spotify');
    }

    // load in assets
    preload() {
        this.load.image('spotifybg', Scaling.imagePath("spotify", "png"));
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    }

    create() {
        this.spotifybg = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(356), 'spotifybg');

        this.spotifybg.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            this.scene.start("Loading");

        }, this);

    }

    update() {


    }
}

