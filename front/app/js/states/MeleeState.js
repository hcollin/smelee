

export default class MeleeState extends Phaser.State {

    preload() {

        this.game.load.image('bg', '/images/stars.jpeg');

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

        this.game.localPlayer.followMe();
    }

    update() {
        this.game.players.forEach(player => {
            player.update();
        });
    }

    render() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteInfo(this.player1, 32, 600);

    }

}