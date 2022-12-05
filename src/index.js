import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import Circle from './assets/circle.png';
import Bottom from './assets/bottom.png';
import Top from './assets/top.png';
import Overlay from './assets/overlay.png';
import CircleMaker from './CircleMaker.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';
//import CrackerIsland from './assets/crackerisland.mp4';

let cirkelspawn;
let timedEvent;

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }
    
    // load in assets
    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('circle', Circle);
        this.load.image('bottom', Bottom);
        this.load.image('top', Top);
        this.load.image('overlay', Overlay);
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        this.load.video('wormhole', './src/assets/crackerisland-edit.mp4', 'loadeddata', false, false);
    }
      
    create ()
    {
        let vid = this.video = this.add.video(180, 310, 'wormhole');

        this.video.play();

        //prevents video from pause when tab out
        vid.setPaused(false);

        //score keeper
        this.score = 0;

        //bit of a fade top and bottom
        this.bottom = this.add.image(187, 550, 'bottom');
        this.top = this.add.image(187, 80, 'top');

        // creates circle for game through different class
        cirkelspawn = new CircleMaker(this, 10, 10);
        //spawns the circles every delay, repeats certain amount of times
        timedEvent = this.time.addEvent({ delay: 500, callback: () => {
            cirkelspawn = new CircleMaker(this, 10, 10);
        }, callbackScope: this, repeat: 20, repeatCount: 0});

        // seethrough overlay
        this.overlay = this.add.image(187, 310, 'overlay');

        // shows score on screen
        this.ScoreGame = this.add.text(24, 32, parseInt(this.score), { font: '28px Bebas Neue', fill: '#FFFFFF' });
        //show percentage of how many you hit
        this.PercentageGame = this.add.text(24, 65, (parseInt(this.score)/200*100).toFixed(0) + '%', { font: '24px Bebas Neue', fill: '#E85A95' });
    
    }

    update(){
        //looks if the circle is clicked and under the radius, then adds score and disables the check to false again
        if (cirkelspawn.ReturnRadius() == true){
            this.score++;
            cirkelspawn.DisableRadius();
        }
        
        //updates the score to show the right amount on screen from class CircleMaker
        this.ScoreGame.setText(this.score)
        this.PercentageGame.setText(this.score/50*100 + '%')

        
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 375,
    height: 629,
    scene: MyGame,
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
