import Phaser from 'phaser';
import Scaling from './Scaling.js';

export default class CircleMaker extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        this.scene.add.existing(this)

        //makes circleout variable to spawn cirkle and radiuscheck boolean
        this.circleout;
        this.checkradius = false;

        // making gameobjects
        this.circle = this.scene.add.image(Scaling.getPixelbyDPR(100), Scaling.getPixelbyDPR(200), 'circle');
        let RadiusCircle = Scaling.getPixelbyDPR(80);

        //add circle
        this.circleout = this.scene.add.circle(Scaling.getPixelbyDPR(100), Scaling.getPixelbyDPR(200), RadiusCircle);
        //give circle line look
        this.circleout.setStrokeStyle(Scaling.getPixelbyDPR(3), 0xE85A95);

        // add image and circle to container
        this.add([this.circle, this.circleout])

        // set container position (also move it)
        this.setPosition(Phaser.Math.Between(0, Scaling.getPixelbyDPR(215)), Phaser.Math.Between(0, Scaling.getPixelbyDPR(359)))

        // on click event of circle image
        this.circle.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            //checks if radius is less or equal to the radius of the other circle and makes the check true or false according to the answer
            if (this.circleout.radius <= Scaling.getPixelbyDPR(42)) {
                this.checkradius = true;
            } else {
                this.checkradius = false;
            }

            // turn circle image and outline circle off
            this.DeleteCircle();

        }, this);


        // movement of outline circle
        const CircleTween = this.scene.tweens.add({
            targets: this.circleout,
            radius: Scaling.getPixelbyDPR(34),
            repeat: 0,
            ease: 'Sine.easeInOut'

        });

        // turn circle image and outline circle off on complete animation
        CircleTween.on('complete', () => {
            this.DeleteCircle();
        }, this)

    }

    // function to get the score
    GetScore() {
        return this.score
    }

    ReturnRadius() {
        return this.checkradius
    }

    // UpdateScore(){
    //     if (this.circleout.radius <= 42){
    //         this.score++;
    //     }
    // }

    // hides circle
    DeleteCircle() {
        this.circleout.setVisible(false);
        this.circleout.setActive(false);
        this.circle.setVisible(false);
        this.circle.setActive(false);
    }

    // puts the check of the radius to false again
    DisableRadius() {
        this.checkradius = false;
    }
}