
import StartState from './states/StartState';
import MeleeState from './states/MeleeState.js';
import Player from './Player.js';
import SocketConnection from './SocketConnection.js';

export default class Game extends Phaser.Game {

    constructor(configuration) {
        // Phaser.CANVAS, Phaser.AUTO
        //super(window.innerWidth, window.innerHeight, Phaser.AUTO);
        super(configuration.resolution.width, configuration.resolution.height, configuration.renderer);

        this.configuration = configuration;



        this.players = [];
        this.localPlayerId = null; //this.addPlayer();
        this.localPlayer = null; //this.getLocalPlayer();

        this.connection = new SocketConnection(this);

        this.gameStarted = false;

        this.state.add('Start', StartState, false);
        this.state.add('Melee', MeleeState, false);
        this.state.start('Start');
    }

    startGame() {
        this.time.advancedTiming = true;
        console.log(this.scale.scaleMode, Phaser.ScaleManager.RESIZE);
        //this.scale.startFullScreen();
        this.state.start('Melee');
        this.gameStarted = true;
    }

    addLocalPlayer() {
        const player = new Player(this);
        this.localPlayerId = player.pid;
        this.localPlayer = player;
        this.players.push(player);
        player.joinGame();
        return player.id;
    }

    addRemotePlayer(data) {
        const player = Player.createRemotePlayer(this, data);
        player.id = data.pid;
        if(this.gameStarted) {
            player.preload();
            player.create();
        }
        this.players.push(player);
    }

    getLocalPlayer() {
        return this.players.find(pla => {
            return this.localPlayerId === pla.id;
        });
    }

    getPlayerById(id) {
        //console.log("Get Player by id", id, this.players.length);
        return this.players.find(pla => {
            return id === pla.id;
        });
    }

}