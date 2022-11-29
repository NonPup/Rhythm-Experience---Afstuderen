import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import Circle from './assets/circle.png';
import CircleMaker from './CircleMaker.js';

let cirkelspawn;

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('circle', Circle);
    }
      
    create ()
    {
        cirkelspawn = new CircleMaker(this, 10, 10);
        this.ScoreGame = this.add.text(10, 10, cirkelspawn.GetScore(), { font: '30px Courier', fill: '#00ff00' });
    }

    update(){
        console.log(cirkelspawn.GetScore());
        this.ScoreGame.setText(cirkelspawn.GetScore())
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 375,
    height: 629,
    scene: MyGame
};

const game = new Phaser.Game(config);
