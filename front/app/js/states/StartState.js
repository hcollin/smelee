import Player from '../Player';

export default class StartState extends Phaser.State {

    preload() {
        this.game.stage.disableVisibilityChange = true;
        this.game.load.image('bg', '/images/stars.jpeg');
        this.game.load.image('join', '/images/buttonJoin.png');
        this.game.load.image('start', '/images/buttonStart.png');
    }

    create() {

        if(this.game.configuration.scale) {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        let bg = this.game.add.image(0, 0, 'bg');


        // button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
        this.joinButton = this.game.add.button(this.game.world.centerX - 125, this.game.world.centerY, 'join', this.joinGame, this);

    }

    update() {

    }


    joinGame() {
        this.game.addLocalPlayer();
        this.game.startGame();

    }

    startGame() {

    }
}
