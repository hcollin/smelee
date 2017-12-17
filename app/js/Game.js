
import MeleeState from 'js/MeleeState.js';


export default class Game extends Phaser.Game {

    constructor() {
        // super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);
        super(window.innerWidth, window.innerHeight, Phaser.AUTO);
        console.log(window.devicePixelRatio, window.innerWidth, window.innerHeight);

        this.state.add('Main', MeleeState, false);
        this.state.start('Main');
    }
}