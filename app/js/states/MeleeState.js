
export default class MeleeState extends Phaser.State {

    preload() {
        this.game.load.image('bg', '/stars.jpeg');

    }

    create() {

        this.game.world.setBounds(0, 0, 3000, 2361);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        let bg = this.game.add.image(0, 0, 'bg');


        // this.bullets = this.game.add.group();
        // this.bullets.enableBody = true;
        // this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        //
        // this.bullets.createMultiple(40, 'bullet');
        // this.bullets.setAll('anchor.x', 0.5);
        // this.bullets.setAll('anchor.y', 0.5);


        // this.player1 = this.game.add.sprite(200, 200, 'ship');
        // this.game.physics.arcade.enable(this.player1);
        // this.player1.anchor.set(0.5, 0.5);
        // this.player1.body.maxVelocity.set(300);
        //
        // this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON);
        // this.player1.body.drag.set(100);
        //
        // this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
        //
        // this.bulletTime = 0;
    }

    update() {

        // let cursors = this.game.input.keyboard.createCursorKeys();
        //
        // this.player1.body.angularVelocity = 0;
        // //this.player1.body.velocity.x = 0;
        // //this.player1.body.velocity.y = 0;
        //
        // if(cursors.left.isDown) {
        //     //this.player1.body.velocity.x = -200;
        //     this.player1.body.angularVelocity = -200;
        // }
        //
        // if(cursors.right.isDown) {
        //     //this.player1.body.velocity.x = 200;
        //     this.player1.body.angularVelocity = 200;
        // }
        //
        // if(cursors.up.isDown) {
        //
        //     let nvel = this.game.physics.arcade.velocityFromAngle(this.player1.angle, 10);
        //     this.player1.body.velocity.x += nvel.x;
        //     this.player1.body.velocity.y += nvel.y;
        //
        //     console.log(this.player1.body.velocity);
        // }
        //
        // if(cursors.down.isDown) {
        //     this.player1.body.velocity.x = 0;
        //     this.player1.body.velocity.y = 0;
        // }
        //
        // if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        // {
        //     this.fire();
        // }

    }


    fire() {
        if (this.game.time.now > this.bulletTime)
        {
            let bullet = this.bullets.getFirstExists(false);

            if (bullet)
            {
                bullet.reset(this.player1.body.x + 60, this.player1.body.y + 60);
                bullet.lifespan = 2000;
                bullet.rotation = this.player1.rotation;
                this.game.physics.arcade.velocityFromRotation(this.player1.rotation, 800, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 70;
            }
        }
    }

    render() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteInfo(this.player1, 32, 600);

    }

}