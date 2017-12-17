

export default class BasicShip {

    constructor(game) {
        this.game = game;

        this.turnSpeed = 200;
        this.speed = 15;
    }


    preload() {
        this.game.load.image('BasicShip', '/ship.png');
        this.game.load.image('BasicShipBullet', '/bullet.png');
    }

    create() {

        this.sprite = this.game.add.sprite(200, 200, 'BasicShip');
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.body.maxVelocity.set(300);

        this.sprite.body.drag.set(100);
    }

    update(controlsState=false) {
        this.sprite.body.angularVelocity = 0;
        if(controlsState) {
            if(controlsState.up) this.up();
            if(controlsState.down) this.down();
            if(controlsState.left) this.left();
            if(controlsState.right) this.right();
        }
    }

    up() {
        let nvel = this.game.physics.arcade.velocityFromAngle(this.sprite.angle, this.speed);
        this.sprite.body.velocity.x += nvel.x;
        this.sprite.body.velocity.y += nvel.y;
    }

    down() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
    }

    left() {
        this.sprite.body.angularVelocity = this.turnSpeed * -1;
    }

    right() {
        this.sprite.body.angularVelocity = this.turnSpeed;
    }

    fire1() {

    }

    fire2() {

    }

    special() {

    }


}