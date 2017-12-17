
import MeleeState from './states/MeleeState.js';

import Player from './Player.js';

export default class Game extends Phaser.Game {

    constructor() {
        // super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);
        super(window.innerWidth, window.innerHeight, Phaser.AUTO);
        console.log(window.devicePixelRatio, window.innerWidth, window.innerHeight);

        this.players = [];

        this.players.push(new Player(this));


        this.state.add('Melee', MeleeState, false);
        this.state.start('Melee');
    }
}