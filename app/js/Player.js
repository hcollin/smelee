
import BasicShip from './ships/BasicShip';
import KeyboardControls from './controls/KeyboardControls';

export default class Player {

    constructor(game) {

        this.game = game;

        this.controls = new KeyboardControls(game);
        this.ship = new BasicShip(game);
        this.connection = null;

        this.score = null;

    }

    preload() {
        this.controls.preload();
        this.ship.preload();
    }

    create() {
        this.controls.create();
        this.ship.create();

    }

    followMe() {
        this.game.camera.follow(this.ship.sprite, Phaser.Camera.FOLLOW_LOCKON);
    }

    update() {
        this.controls.update();
        this.ship.update(this.controls.status);

    }

    render() {

    }









}