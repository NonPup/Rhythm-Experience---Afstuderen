import Phaser from 'phaser';

export default class CircleMaker extends Phaser.GameObjects.Container
{
    constructor (scene, x, y, children)
    {
        super(scene, x, y, children);
        
        this.scene.add.existing(this)
        this.score = 0;
        let r3;
        // making gameobjects const onaanpasbaar, let of var wel
        const circle = this.scene.add.image(100, 200, 'circle');
        let RadiusCircle = 80;
        

        r3 = this.scene.add.circle(100, 200, RadiusCircle);

        r3.setStrokeStyle(3, 0xE85A95);

        // add image to container
        this.add([circle, r3])

        // set container position (also move image)
        this.setPosition(Phaser.Math.Between(window.innerWidth), Phaser.Math.Between(window.innerHeight))

        circle.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            if (r3.radius <= 42){
                this.score++;
            }

            console.log(`${this.score} ive been clicked!`)

            r3.setVisible(false);
            r3.setActive(false);
            circle.setVisible(false);
            circle.setActive(false);

        },this);


        const CircleTween = this.scene.tweens.add({
            targets: r3,
            radius: 34,
            repeat: 0,
            ease: 'Sine.easeInOut'
            
        });

        CircleTween.on('complete',() => {
            r3.setVisible(false);
            r3.setActive(false);
            circle.setVisible(false);
            circle.setActive(false);
        }, this)

    }
    
    GetScore(){
        return this.score
    }
}