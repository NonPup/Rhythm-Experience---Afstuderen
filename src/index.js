import Phaser from 'phaser';
import Background from './assets/intro.png';
import Button from './assets/button start.png';
import Spotify from './spotify.js';
import Loading from './loading.js';
import MyGame from './Game.js';
import GetReady from './getready.js';
import Final from './final.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';

class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    // load in assets
    preload() {
        this.load.image('bg', Background);
        this.load.image('button', Button);
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    }

    create() {
        this.bg = this.add.image(187, 306, 'bg');
        this.button = this.add.image(187, 550, 'button');

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
    width: 374,
    height: 680,
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
