

export default class MeleeState extends Phaser.State {

    preload() {

        this.game.stage.disableVisibilityChange = true;
        this.game.load.image('bg', '/images/stars.jpeg');

        this.game.players.forEach(player => {
            player.preload();
        });

    }

    create() {

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        console.log("Scale Factor:", this.game.scale.scaleFactor);
        this.game.world.setBounds(0, 0, 3000, 2361);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        let bg = this.game.add.image(0, 0, 'bg');

        this.game.players.forEach(player => {
            player.create();
        });


        this.tick = 0;

        this.game.localPlayer.followMe();


        //this.text = this.game.add.text(10, 10, "Testing", {font: "24px Arial", fill: "white"});


    }

    update() {

        // Update locations first
        this.game.players.forEach(player => {
            player.update();
        });

        // Check for weapon hits.
        const playerCount = this.game.players.length;
        for(let i = 0; i < playerCount; i++) {
            const playerA = this.game.players[i];
            for(let j = 0; j < playerCount; j++) {
                const playerB = this.game.players[j];
                if(playerA.id !== playerB.id) {
                    playerA.hitDetectionAgainst(playerB);
                }
            }
        }



        if(!this.game.localPlayer.flags.alive && !this.game.localPlayer.flags.respawning) {
            console.log("Respawning...");
            this.game.localPlayer.flags.respawning = true;

            this.respawnCounter = 0;
            let counter = 6;

            this.respawnText = this.game.add.text(200, 0, "RESPAWN IN 6", { font: "48px Arial", fill: "#ffcc88", align: "center"});
            this.respawnText.fixedToCamera = true;
            this.respawnText.cameraOffset.setTo(this.game.camera.width / 2,this.game.camera.height / 2);
            let inter = setInterval(() => {
                counter--;
                this.respawnText.setText("RESPAWN IN " + counter);
                this.respawnCounter = counter;
                if(counter <=0) {
                    clearInterval(inter);
                    this.respawnText.destroy();
                    this.game.localPlayer.respawn();
                    this.game.localPlayer.followMe();
                    this.game.localPlayer.flags.respawning = false;
                    this.game.connection.send("Respawn", this.game.localPlayer.getData());

                } else {
                    console.log(counter);
                }
            }, 1000);
        }
    }

    render() {


        this.tick++;

        // this.game.players.forEach(pl => {
        //     const y = i * 30;
        //     if(pl.flags.alive && pl.ship.sprite) {
        //         const sx = Math.round(pl.ship.sprite.x);
        //         const sy = Math.round(pl.ship.sprite.y);
        //         const rot = Math.round(pl.ship.sprite.rotation);
        //         //this.game.debug.text("P" + i +" x:" + sx +" y:" + sy + " r:"+rot + " H:" + pl.ship.health, 30, y);
        //     }
        //     i++;
        // });

        if( (this.tick % 10) === 0) {
            console.log("FPS: ", this.game.time.fps, this.game.time.fpsMin, this.game.time.fpsMax);
        }

        //this.game.debug.text(this.game.time.fps + ", "+ this.game.time.fpsMin + ", "+ this.game.time.fpsMax + " " + this.game.time.advancedTiming , 30, 400);
        //this.game.debug.cameraInfo(this.game.camera, 32, 32);
        //this.game.debug.spriteInfo(this.player1, 32, 600);
    }

}