

export default class SocketConnection {

    constructor(game, id=null) {


        this.game = game;
        this.queue = [];
        this.pinger = false;

        this.openConnection();
    }

    openConnection() {
        console.log("Open Connection...");
        if(this.pinger) {
            clearInterval(this.pinger);
        }

        this.socket = new WebSocket("ws://localhost:8080");

        this.socket.onopen = () => {

            console.log("\nConnection Open!");

            this.runQueue();


        };

        this.socket.onclose = () => {
            console.log("Connection closed!");
        };

        this.socket.onmessage = msg => {
            this.message(msg);
        };

        this.pinger = setInterval(() => {
            this.ping();
        }, 3000);


    }

    send(action, dataObject) {
        //console.log("Player : ", playerid, "\nControls", dataObject);
        const msg = JSON.stringify({pid: this.game.localPlayerId, action: action, data: dataObject});
        this.queue.push(msg);
        this.runQueue();
    }

    runQueue() {
        if(this.socket.readyState === WebSocket.OPEN) {
            while(this.queue.length > 0) {
                const msg = this.queue.shift();
                //console.log("Queue: ", this.queue.length, msg );
                this.socket.send(msg);
            }
        }
    }

    ping() {
        //console.log("Ping?" , this.socket.readyState === WebSocket.OPEN);
        if(this.socket.readyState === WebSocket.CLOSED) {
            this.openConnection();
            return;
        }
        this.send("Ping", {});
    }

    message(msg) {
        if(msg.data) {
            const msgObj = JSON.parse(msg.data);
            let player = false;
            if(msgObj.pid) {
                player = this.game.getPlayerById(msgObj.pid);
            }

            switch(msgObj.action) {
                case "Pong":
                    //console.log("Pong!");
                    break;
                case "JoinGame":
                    console.log("Remote player joined!", msgObj);
                    this.game.addRemotePlayer(msgObj.data);
                    break;
                case "ControlUpdate":
                    //console.log("ControlUpdate", player, msgObj);
                    if(player && msgObj.pid !== this.game.localPlayerId ) {
                        player.controls.setStatus(msgObj.data);
                    }
                    break;
                case "Calibrate":
                    if(player && msgObj.pid !== this.game.localPlayerId ) {
                        player.calibrate(msgObj.data.data);
                    }
                    break;
                case "Respawn":
                    console.log("Respawn remote", player, msgObj.pid);
                    if(player && msgObj.pid !== this.game.localPlayerId ) {
                        player.respawn();
                        player.calibrate(msgObj.data.data);
                    }
                    break;
                default:
                    console.log("Unknown message!", msgObj);
                    break;
            }

        }

    }




}