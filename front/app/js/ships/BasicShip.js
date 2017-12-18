
import AbstractShip from './AbstractShip';

export default class BasicShip extends AbstractShip {

    constructor(game,sx=false, sy=false) {
        super(game,sx,sy);

        this.turnSpeed = 200;
        this.speed = 15;

        this.fire1LastShot = 0;

        this.shipType = "BASICSHIP";

        this.health = 100;

    }

    preload() {
        this.game.load.image('BasicShip', '/images/ship.png');
        this.game.load.image('BasicShipBullet', '/images/bullet.png');
    }

    create() {
        console.log("Create to ", this.sx, this.sy);
        this.sprite = this.game.add.sprite(this.sx, this.sy, 'BasicShip');
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.body.maxVelocity.set(300);

        this.sprite.body.drag.set(100);

        this.fire1group = this.game.add.group();
        this.fire1group.enableBody = true;
        this.fire1group.physicsBodyType = Phaser.Physics.ARCADE;

        this.fire1group.createMultiple(40, 'BasicShipBullet');
        this.fire1group.setAll('anchor.x', 0.5);
        this.fire1group.setAll('anchor.y', 0.5);

    }

    update(controlsState=false) {
        if(this.sprite === undefined) {
            return;
        }
        this.sprite.body.angularVelocity = 0;
        if(controlsState) {
            if(controlsState.up) this.up();
            if(controlsState.down) this.down();
            if(controlsState.left) this.left();
            if(controlsState.right) this.right();
            if(controlsState.fire1) this.fire1();
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
        if (this.game.time.now > this.fire1LastShot)
        {
            let bullet = this.fire1group.getFirstExists(false);

            if (bullet)
            {
                bullet.reset(this.sprite.body.x + 30, this.sprite.body.y + 30);
                bullet.lifespan = 2000;
                bullet.rotation = this.sprite.rotation;
                this.game.physics.arcade.velocityFromRotation(this.sprite.rotation, 800, bullet.body.velocity);
                this.fire1LastShot = this.game.time.now + 70;
            }
        }
    }

    fire2() {

    }

    special() {

    }

    hits(targetPlayer) {
        this.game.physics.arcade.overlap(targetPlayer.ship.sprite, this.fire1group, (ship, shot) => {
            console.log("HIT", targetPlayer.health);
            targetPlayer.ship.damage(5);
            this.fire1group.remove(shot);
        });
    }

    damage(damage) {
        this.health -= damage;
        if(this.health < 0) {
            this.health = 0;
        }
    }

    isAlive() {
        return this.health > 0;
    }

    destroy() {
        this.sprite.destroy();
    }


}