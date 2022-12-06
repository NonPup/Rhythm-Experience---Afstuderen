import Phaser from 'phaser';
import Spotifybg from './assets/spotify.png';
import Loading from './loading.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';

export default class Spotify extends Phaser.Scene {
    constructor() {
        super('Spotify');
    }

    // load in assets
    preload() {
        this.load.image('spotifybg', Spotifybg);
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    }

    create() {
        this.spotifybg = this.add.image(187, 356, 'spotifybg');

        this.spotifybg.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            this.scene.start("Loading");

        }, this);

    }

    update() {


    }
}

