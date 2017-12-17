

import MeleeState from './states/MeleeState.js';
import Player from './Player.js';
import SocketConnection from './SocketConnection.js';

export default class Game extends Phaser.Game {

    constructor() {
        // super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);
        super(window.innerWidth, window.innerHeight, Phaser.AUTO);
        console.log(window.devicePixelRatio, window.innerWidth, window.innerHeight);

        this.players = [];
        this.localPlayerId = this.addPlayer();
        this.localPlayer = this.getLocalPlayer();

        this.connection = new SocketConnection();

        this.state.add('Melee', MeleeState, false);
        this.state.start('Melee');
    }


    addPlayer() {
        const player = new Player(this);
        this.players.push(player);
        return player.id;
    }

    getLocalPlayer() {
        return this.players.find(pla => {
            return this.localPlayerId === pla.id;
        });
    }
}