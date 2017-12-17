import {getRandomInt} from "../Utils";


export default class AbstractShip {

    constructor(game,sx,sy) {
        this.game = game;
        console.log("AbstractShip constructor ", sx, sy);
        this.sx = sx ? sx : ((this.game.world.width / 10) * getRandomInt(1, 10));
        this.sy = sy ? sy : ((this.game.world.height / 10) * getRandomInt(1, 10));
        this.shipType = "UNKNOWN";
    }


    getData() {
        //console.log("\nDATA!");
        if(this.sprite) {
            const data = {
                x: this.sprite.body.x,
                y: this.sprite.body.y,
                rotation: this.sprite.body.rotation,
                velocity: this.sprite.body.velocity,
                shipType: this.shipType
            };
            console.log(data);
            return data;
        } else {
            console.log("No sprite yet!");
        }

    }

    setData() {
        //this.sprite.body.
    }

}