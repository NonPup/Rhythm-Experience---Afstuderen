import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import Circle from './assets/circle.png';
import CircleMaker from './CircleMaker.js';
import { WebFontLoaderPlugin } from 'phaser3-webfont-loader';

let cirkelspawn;

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
        this.load.webfont('Bebas Neue', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    }
      
    create ()
    {
        // creates circle for game through different class
        cirkelspawn = new CircleMaker(this, 10, 10);

        // shows score on screen
        this.ScoreGame = this.add.text(24, 32, cirkelspawn.GetScore(), { font: '28px Bebas Neue', fill: '#FFFFFF' });
        this.PercentageGame = this.add.text(24, 65, cirkelspawn.GetScore()/200*100 + '%', { font: '24px Bebas Neue', fill: '#E85A95' });
    }

    update(){
        console.log(cirkelspawn.GetScore());

        //updates the score to show the right amount on screen from class CircleMaker
        this.ScoreGame.setText(cirkelspawn.GetScore())
        this.PercentageGame.setText(cirkelspawn.GetScore()/50*100 + '%')
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
