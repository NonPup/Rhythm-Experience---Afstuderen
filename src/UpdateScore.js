import Phaser from 'phaser';

export default class UpdateScore extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        this.registry.events.on('changedata', this.updateData, this);
        
        this.circle.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            if (this.r3.radius <= 42) {
                this.score++;
            }
            console.log(`${this.score} ive been clicked!`)

            // turn circle image and outline circle off


        }, this);
        
    }

    GetScore(){
        return this.score
    }
}
