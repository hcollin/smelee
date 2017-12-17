
import AbstractControls from './AbstractControls';

export default class KeyboardControls extends AbstractControls {

    constructor(game) {

        super(game);

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

    create() {
        this.game.input.keyboard.addKeyCapture(Object.values(this.keyCharBinds));
    }

    update() {
        this.changed = false;
        this.keys.forEach(key => {
            const nowDown = this.game.input.keyboard.isDown(this.keyCharBinds[key]);
            if(this.status[key] !== nowDown) this.changed = true;
            this.status[key] = nowDown;
        });
        return this.status;
    }


}