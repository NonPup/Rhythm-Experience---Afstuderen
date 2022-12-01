import Phaser from 'phaser';

export default class CircleMaker extends Phaser.GameObjects.Container
{
    constructor (scene, x, y, children)
    {
        super(scene, x, y, children);
        this.scene.add.existing(this)

        this.r3;
        this.checkradius = false;

        // making gameobjects
        this.circle = this.scene.add.image(100, 200, 'circle');
        let RadiusCircle = 80;
        
        //add circle
        this.r3 = this.scene.add.circle(100, 200, RadiusCircle);
        //give circle line look
        this.r3.setStrokeStyle(3, 0xE85A95);

        // add image and circle to container
        this.add([this.circle, this.r3])

        // set container position (also move it)
        this.setPosition(Phaser.Math.Between(0, 215), Phaser.Math.Between(0, 359))

        // on click event of circle image
        this.circle.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            //checks if radius is less or equal to the radius of the other circle and makes the check true or false according to the answer
            if (this.r3.radius <= 42){
                this.checkradius = true;
            }else {
                this.checkradius = false;
                 }

            // turn circle image and outline circle off
            this.DeleteCircle();

        },this);


        // movement of outline circle
        const CircleTween = this.scene.tweens.add({
            targets: this.r3,
            radius: 34,
            repeat: 0,
            ease: 'Sine.easeInOut'
            
        });

        // turn circle image and outline circle off on complete animation
        CircleTween.on('complete',() => {
            this.DeleteCircle();
        }, this)

    }
    
    // function to get the score
    GetScore(){
        return this.score
    }

    ReturnRadius(){
        return this.checkradius
    }

    // UpdateScore(){
    //     if (this.r3.radius <= 42){
    //         this.score++;
    //     }
    // }

    // hides circle
    DeleteCircle(){
        this.r3.setVisible(false);
        this.r3.setActive(false);
        this.circle.setVisible(false);
        this.circle.setActive(false);
    }

    // puts the check of the radius to false again
    DisableRadius(){
        this.checkradius = false;
    }
}