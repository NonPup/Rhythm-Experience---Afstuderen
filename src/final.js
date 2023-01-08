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
        //goes to get ready scene
        this.scene.start("GetReady");
    }

    FadeOut() {
        //fade out the screen
        this.cameras.main.fadeOut(500, 0, 0, 0);
    }

    create() {
        //gets the score
        percentagescore = this.scene.get('MyGame');
        //sets score as the finalscore
        this.score = percentagescore.FinalScore();

        //fades in the screen
        this.cameras.main.fadeIn(500, 0, 0, 0);
        //adds bg
        this.finalbg = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(356), 'finalbg');
        //adds button
        this.playagain = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(400), 'playagain');

        //on button play again it will start the get ready scene to play the game again
        this.playagain.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            this.scene.start("Loading");

        }, this);

        //text with numbers from the score you just got in the game
        this.welldone = this.add.text(Scaling.getPixelbyDPR(24), Scaling.getPixelbyDPR(96), 'Well done! you hit', { font: `${Scaling.getPixelbyDPR(40)}px Bebas Neue`, fill: '#FFFFFF' });
        this.welldone2 = this.add.text(Scaling.getPixelbyDPR(24), Scaling.getPixelbyDPR(136), 'of all the notes!', { font: `${Scaling.getPixelbyDPR(40)}px Bebas Neue`, fill: '#FFFFFF' });
        this.welldone3 = this.add.text(Scaling.getPixelbyDPR(272), Scaling.getPixelbyDPR(96), `${Math.ceil(this.score / 48 * 100)}%`, { font: `${Scaling.getPixelbyDPR(40)}px Bebas Neue`, fill: '#E85A95' });



    }


    update() {


    }
}

