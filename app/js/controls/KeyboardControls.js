

export default class KeyboardControls {

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

        this.keyCharBinds = {
            up: 38,
            down: 40,
            left: 37,
            right: 39,

            fire1: 17,
            fire2: 16,
            special: 13,

            pause: 27,
            confirm: 13
        };

        this.keys = Object.keys(this.keyCharBinds);

    }

    preload() {

    }

    create() {
        this.game.input.keyboard.addKeyCapture(Object.values(this.keyCharBinds));
    }

    update() {
        this.keys.forEach(key => {

           this.status[key] = this.game.input.keyboard.isDown(this.keyCharBinds[key]);
        });
        return this.status;
    }


}