
import uuid from 'uuid';

import BasicShip from './ships/BasicShip';
import KeyboardControls from './controls/KeyboardControls';

export default class Player {

    constructor(game,ship=false, controls=false) {

        this.id = uuid.v4();

        this.game = game;

        this.controls = controls ? controls : new KeyboardControls(game);
        this.ship = ship ? ship : new BasicShip(game);

        this.isLocalPlayer = false;

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
        this.isLocalPlayer = true;
    }

    update() {
        this.controls.update();
        this.ship.update(this.controls.status);
        if(this.controls.changed && this.isLocalPlayer) {
            this.game.connection.send(this.id, this.controls.status);
        }
    }

    render() {

    }









}