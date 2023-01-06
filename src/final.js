import Phaser from 'phaser';
import Loading from './loading.js';
import MyGame from './Game.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import Scaling from './Scaling.js';

let timedEvent;
let percentagescore;

export default class Final extends Phaser.Scene {
    constructor() {
        super('Final');
    }

    // load in assets
    preload() {
        this.load.image('finalbg', Scaling.imagePath("FinalScreen", "png"));
        this.load.image('playagain', Scaling.imagePath("playagain", "png"));
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
        this.finalbg = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(356), 'finalbg');
        this.playagain = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(400), 'playagain');

        this.playagain.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            this.scene.start("Loading");

        }, this);

        this.welldone = this.add.text(Scaling.getPixelbyDPR(24), Scaling.getPixelbyDPR(96), 'Well done! you hit', { font: `${Scaling.getPixelbyDPR(40)}px Bebas Neue`, fill: '#FFFFFF' });
        this.welldone2 = this.add.text(Scaling.getPixelbyDPR(24), Scaling.getPixelbyDPR(136), 'of all the notes!', { font: `${Scaling.getPixelbyDPR(40)}px Bebas Neue`, fill: '#FFFFFF' });
        this.welldone3 = this.add.text(Scaling.getPixelbyDPR(272), Scaling.getPixelbyDPR(96), `${Math.ceil(this.score / 48 * 100)}%`, { font: `${Scaling.getPixelbyDPR(40)}px Bebas Neue`, fill: '#E85A95' });

        console.log(this.score);



    }


    update() {


    }
}

