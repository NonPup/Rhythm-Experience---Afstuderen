import Phaser from 'phaser';
import CircleMaker from './CircleMaker.js';
import Final from './final.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
import Scaling from './Scaling.js';

let cirkelspawn;
let timedEvent;

export default class MyGame extends Phaser.Scene {
    constructor() {
        super('MyGame');
    }

    // load in assets
    preload() {
        this.load.image('circle', Scaling.imagePath("circle", "png"));
        this.load.image('bottom', Scaling.imagePath("bottom", "png"));
        this.load.image('top', Scaling.imagePath("top", "png"));
        this.load.image('overlay', Scaling.imagePath("overlay", "png"));
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        this.load.video('crackerisland', Scaling.imagePath("crackerisland-edit", "mp4"), 'loadeddata', false, false);
        this.load.audio('beat', './src/assets/beat.mp3');
    }

    create() {
        this.cameras.main.fadeIn(500, 0, 0, 0)
        //creates video
        let vid = this.video = this.add.video(Scaling.getPixelbyDPR(180), Scaling.getPixelbyDPR(360), 'crackerisland');

        //plays video
        this.video.play();

        //prevents video from pause when tab out
        vid.setPaused(false);

        //score keeper
        this.score = 0;

        //add audio
        this.beat = this.sound.add('beat', {loop: false})

        //on click drum sound
        this.input.on('pointerdown', function(){
            this.beat.play();
        },this);


        //bit of a fade top and bottom
        this.bottom = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(600), 'bottom');
        this.top = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(100), 'top');

        // seethrough overlay
        this.overlay = this.add.image(Scaling.getPixelbyDPR(187), Scaling.getPixelbyDPR(310), 'overlay');

        // creates circle for game through different class
        cirkelspawn = new CircleMaker(this, Scaling.getPixelbyDPR(10), Scaling.getPixelbyDPR(10));
        //spawns the circles every delay, repeats certain amount of times
        timedEvent = this.time.addEvent({
            delay: 1000, callback: () => {
                cirkelspawn = new CircleMaker(this, Scaling.getPixelbyDPR(10), Scaling.getPixelbyDPR(10));
            }, callbackScope: this, repeat: 48, repeatCount: 0
        });

        // shows score on screen
        this.ScoreGame = this.add.text(Scaling.getPixelbyDPR(24), Scaling.getPixelbyDPR(32), this.score, { font: `${Scaling.getPixelbyDPR(28)}px Bebas Neue`, fill: '#FFFFFF' });
        //show percentage of how many you hit
        this.PercentageGame = this.add.text(Scaling.getPixelbyDPR(24), Scaling.getPixelbyDPR(65), this.score / 48 * 100 + '%', { font: `${Scaling.getPixelbyDPR(24)}px Bebas Neue`, fill: '#E85A95' });

        this.video.on('complete', function(video){
            this.scene.start("Final");
        }, this);

    }

    update() {
        //looks if the circle is clicked and under the radius, then adds score and disables the check to false again
        if (cirkelspawn.ReturnRadius() == true) {
            this.score++;
            cirkelspawn.DisableRadius();
        }

        //updates the score to show the right amount on screen from class CircleMaker
        this.ScoreGame.setText(this.score)
        this.PercentageGame.setText(Math.ceil(this.score / 48 * 100) + '%')
        


    }

    FinalScore(){
        return this.score;
    }
}
