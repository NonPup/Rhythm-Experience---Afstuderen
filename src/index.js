import Phaser from 'phaser';
import Spotify from './spotify.js';
import Loading from './loading.js';
import MyGame from './Game.js';
import GetReady from './getready.js';
import Final from './final.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import Scaling from './Scaling.js';

class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    // load in assets
    preload() {
        this.load.image('bg', Scaling.imagePath("intro", "png"));
        this.load.image('button', Scaling.imagePath("button start", "png"));
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    }

    create() {
        this.bg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg');
        this.button = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(550), 'button');

        this.button.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            this.scene.start("Spotify");

        }, this);

    }

    update() {


    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: Scaling.GAME_WIDTH,
    height: Scaling.GAME_HEIGHT, 
    scale: {
        parent: "phaser-example",
        zoom: 1 / Scaling.DPR,
        width: Scaling.GAME_WIDTH * Scaling.DPR,
        height: Scaling.GAME_HEIGHT * Scaling.DPR,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Start, Spotify, Loading, GetReady, MyGame, Final],
    // webfont plugin
    plugins: {
        global: [{
            key: 'WebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        }]
    }
};

const game = new Phaser.Game(config);
