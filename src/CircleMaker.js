import Phaser from 'phaser';

export default class CircleMaker extends Phaser.GameObjects.Container
{
    constructor (scene, x, y, children)
    {
        super(scene, x, y, children);
        
        this.scene.add.existing(this)
        this.score = 0;
        let r3;
        // making gameobjects, const onaanpasbaar, let of var wel
        const circle = this.scene.add.image(100, 200, 'circle');
        let RadiusCircle = 80;
        
        //add circle
        r3 = this.scene.add.circle(100, 200, RadiusCircle);
        //give circle line look
        r3.setStrokeStyle(3, 0xE85A95);

        // add image and circle to container
        this.add([circle, r3])

        // set container position (also move image)
        this.setPosition(Phaser.Math.Between(0, 215), Phaser.Math.Between(0, 429))

        // on click event of circle image
        circle.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            if (r3.radius <= 42){
                this.score++;
            }

            console.log(`${this.score} ive been clicked!`)

            // turn circle image and outline circle off
            r3.setVisible(false);
            r3.setActive(false);
            circle.setVisible(false);
            circle.setActive(false);

        },this);

        // movement of outline circle
        const CircleTween = this.scene.tweens.add({
            targets: r3,
            radius: 34,
            repeat: 0,
            ease: 'Sine.easeInOut'
            
        });

        // turn circle image and outline circle off on complete animation
        CircleTween.on('complete',() => {
            r3.setVisible(false);
            r3.setActive(false);
            circle.setVisible(false);
            circle.setActive(false);
        }, this)

    }
    
    // function to get the score
    GetScore(){
        return this.score
    }
}