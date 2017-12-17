const WebSocket = require('ws');


/**
 * This is the actual game server class that handles a single instance of a game.
 */
class GameServer {

    constructor(id=null) {

        this.id = id ? id : "AAA";
        this.players = [];

        this.socket = new WebSocket.Server({ port: 8080 });

        console.log("\nServer started");

        this.socket.on('connection', ws => {
            this.newPlayerConnection(ws);
        });

        this.debugger = setInterval(() => {
            console.log("\nDEBUG\n\tPlayers:" + this.players.length);
        },2000);

    }

    newPlayerConnection(ws) {
        console.log("New connection!");
        const player = new PlayerConnection(ws, this);
        this.players.push(player);
    }

    broadcast(msg, ignorePlayerId=false) {
        this.players.forEach( conn => {
            if(ignorePlayerId !== conn.pid) {
                conn.sendUpdate(msg);
            }
        });
    }

    removePlayerConnection(pid) {
        this.players = this.players.filter(pl => {
            return pl.pid !== pid;
        });
    }
}

/**
 * Handles and contains a single player connection.
 */
class PlayerConnection {

    constructor(socket, server) {
        this.socket = socket;
        this.server = server;
        this.pid = null;

        this.ctrlStatus = {};

        this.socket.on('message', message => {
            this.messageHandler(message);
        });

        this.socket.on('error', err => {
           if(err.code !== 'ECONNRESET') {
               throw err;
           }

            this.closeConnection();
        });

        this.socket.on('close', err => {
           this.closeConnection();
        });
    }

    messageHandler(msg) {
        const msgObj = JSON.parse(msg);
        switch(msgObj.action) {
            case "JoinGame":
                this.joinGame(msgObj);
                break;
            case "ControlUpdate":
                this.controlUpdate(msgObj);
                break;
            case "Ping":
                this.sendUpdate({action: "Pong"});
                break;
            case "Calibrate":
                this.calibrate(msgObj);
                break;
            case "Respawn":
                this.respawn(msgObj);
                break;
            default:
                console.log("Unknown action!");
                break;
        }
    }

    joinGame(msgObj) {
        this.pid = msgObj.data.pid;
        const msg = {
            action: "JoinGame",
            data: msgObj.data,
            pid: this.pid
        };
        console.log("Joined Game!", this.pid, msgObj);
        this.server.broadcast(msg, this.pid);


    }

    controlUpdate(msgObj) {
        if(!this.pid) {
            return;
        }
        this.ctrlStatus = msgObj.data;
        const msg = {
            action: "ControlUpdate",
            data: this.ctrlStatus,
            pid: this.pid
        };
        console.log("ControlUpdate", this.pid);
        this.server.broadcast(msg, this.pid);
    }

    calibrate(msgObj) {
        const msg = {
            action: "Calibrate",
            pid: this.pid,
            data: msgObj
        };
        this.server.broadcast(msg, this.pid);

    }

    respawn(msgObj) {
        const msg = {
            action: "Respawn",
            pid: this.pid,
            data: msgObj
        };
        this.server.broadcast(msg, this.pid);

    }

    sendUpdate(msg) {
        if(this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(msg), e => {
                if(e) {
                    console.log("Error in sending message", msg, this.pid, e);
                }
            });
        } else {
            console.log("ERROR: Connection is closed!");
            this.closeConnection();
        }

    }

    closeConnection() {
        const pid = this.pid;
        if(this.socket.readyState !== WebSocket.CLOSED) {
            this.socket.close();
        }
        this.server.removePlayerConnection(pid);
    }
}


let server = new GameServer();