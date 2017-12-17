

export default class AbstractControls {

    constructor(game) {
        this.game = game;

        this.status = {
            up: false,
            down: false,
            left: false,
            right: false,

            fire1: false,
            fire2: false,
            special: false,

            pause: false,
            confirm: false
        };

        this.changed = false;
    }


    preload() {

    }

    create() {

    }

    update() {
        return this.status;
    }

    triggerChange() {

    }



}