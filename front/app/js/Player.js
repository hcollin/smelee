
import uuid from 'uuid';

import { getRandomInt } from "./Utils";

import BasicShip from './ships/BasicShip';

import KeyboardControls from './controls/KeyboardControls';
import RemoteControls from './controls/RemoteControls';

export default class Player {

    constructor(game, ship=false, controls=false) {

        this.id = uuid.v4();

        this.game = game;


        this.controls = controls ? controls : new KeyboardControls(game);
        this.ship = ship ? ship : new BasicShip(game);

        if(ship) {
            this.origShip = ship;
        } else {
            this.origShip = new BasicShip(game);
        }

        this.isLocalPlayer = false;

        this.score = null;

        this.sinceUpdate = 0;

        this.flags = {
            alive: true
        };

        this.timeOfDeath = 0;

    }

    setData(data) {

    }

    getOrigData() {
        return {
            pid: this.id,
            shipType: this.ship.shipType,
            sx: this.ship.sx,
            sy: this.ship.sy,
            rotation: this.ship.sprite? this.ship.sprite.rotation : 0
        };
    }

    getData() {
        return {
            pid: this.id,
            shipType: this.ship.shipType,
            x: this.ship.sprite ? this.ship.sprite.x : this.ship.sx,
            y: this.ship.sprite ? this.ship.sprite.y : this.ship.sy,
            rotation: this.ship.sprite? this.ship.sprite.rotation : 0,
            health: this.ship.health
        };
    }



    calibrate(data) {

        if(this.ship.sprite) {
            this.ship.sprite.x = data.x;
            this.ship.sprite.y = data.y;
            this.ship.sprite.rotation = data.rotation;
        }

        this.health = data.health;
    }

    joinGame() {

        this.game.connection.send("JoinGame", this.getOrigData());
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
        if(!this.flags.alive) {
            return;
        }
        this.controls.update();
        this.ship.update(this.controls.status);
        if(this.controls.changed && this.isLocalPlayer) {
            this.game.connection.send("ControlUpdate", this.controls.status);
        }
        if(this.isLocalPlayer) {
            this.sinceUpdate++;
            if(this.sinceUpdate > 20) {
                //console.log("Calibrate data", this.getData());
                this.game.connection.send("Calibrate", this.getData());
                this.sinceUpdate = 0;
            }
        }
        if(!this.ship.isAlive()) {
            this.die();
        }
    }

    hitDetectionAgainst(targetPlayer) {
        if(!this.ship.isAlive) {
            return;
        }
        this.ship.hits(targetPlayer);
        this.game.physics.arcade.collide(targetPlayer.ship.sprite, this.ship.sprite);

    }


    render() {

    }

    die() {
        this.ship.health = 0;
        this.ship.destroy();
        this.flags.alive = false;
        this.timeOfDeath = this.game.time.now;
    }

    respawn() {
        console.log("RESPAWN!");
        this.flags.alive = true;
        this.ship = new BasicShip(this.game);
        this.ship.preload();
        this.ship.create();
        this.sinceUpdate = 0;
        this.timeOfDeath = 0;
    }


    static createRemotePlayer(game, data) {
        console.log("Create remote player", data);
        const controls = new RemoteControls(game);
        const ship = new BasicShip(game, data.sx, data.sy);
        const pl = new Player(game, ship, controls);
        return pl;
    }


}