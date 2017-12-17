

export default class MeleeState extends Phaser.State {

    preload() {

        this.game.load.image('bg', '/stars.jpeg');

        this.game.players.forEach(player => {
            player.preload();
        });

    }

    create() {

        this.game.world.setBounds(0, 0, 3000, 2361);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        let bg = this.game.add.image(0, 0, 'bg');

        this.game.players.forEach(player => {
            player.create();
        });

        // Change this to checking active local player.
        this.game.players[0].followMe();
    }

    update() {

        this.game.players.forEach(player => {
            player.update();
        });
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