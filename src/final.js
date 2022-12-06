import Phaser from 'phaser';
import FinalBg from './assets/FinalScreen.png';
import PlayAgain from './assets/playagain.png';
import Loading from './loading.js';
import MyGame from './Game.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';

let timedEvent;
let percentagescore;

export default class Final extends Phaser.Scene {
    constructor() {
        super('Final');
    }

    // load in assets
    preload() {
        this.load.image('finalbg', FinalBg);
        this.load.image('playagain', PlayAgain);
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    }

    NextScene() {
        this.scene.start("GetReady");
    }

    FadeOut() {
        this.cameras.main.fadeOut(500, 0, 0, 0);
    }

    create() {
        percentagescore = this.scene.get('MyGame');
        this.score = percentagescore.FinalScore();

        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.finalbg = this.add.image(187, 356, 'finalbg');
        this.playagain = this.add.image(187, 400, 'playagain');

        this.playagain.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            this.scene.start("Loading");

        }, this);

        this.welldone = this.add.text(24, 96, 'Well done! you hit', { font: '40px Bebas Neue', fill: '#FFFFFF' });
        this.welldone = this.add.text(24, 136, 'of all the notes!', { font: '40px Bebas Neue', fill: '#FFFFFF' });
        this.welldone = this.add.text(160, 300, `${Math.ceil(this.score / 48 * 100)} %`, { font: '40px Bebas Neue', fill: '#E85A95' });

        console.log(this.score);



    }


    update() {


    }
}

