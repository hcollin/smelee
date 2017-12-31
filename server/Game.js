
const uuid = require('uuid');

const Game = function(openGameId=false) {

    const id = openGameId ? openGameId : uuid.v4();

    let status = 0;
    let players = [];
    let gameEngine = null;

    function gameLoop(sinceLastFrame) {
        console.log("Game loop!", sinceLastFrame);
    }

    function create() {
        players = [];
        status = 0;
        gameEngine = new Engine(gameLoop);
    }

    function start() {
        gameEngine.start();
    }

    function pause() {
        gameEngine.pause();
    }

    function stop() {
        gameEngine.stop();
    }

    function join() {

    }

    function leave() {

    }

    return {
        newGame: create,
        start: start,
        pause: pause,
        stop: stop,
        playerJoin: join,
        playerLeave: leave
    };


};


const Player = function() {

    let id = uuid.v4();
    let ship = null;

    let controls = {
        up: false,
        down: false,
        left: false,
        right: false,
        fire1: false
    };

    let connection = null;

    function connect(socket) {
        connection = socket;
    }

    function disconnect() {
        if(connecction) {
            connection.close();
            connection = null;
        }

    }

    function join() {

    }

    function leave() {

    }

    return {
        connect: connect,
        disconnect: disconnect,
        joinGame: join,
        leaveGame: leave
    };
};


const Ship = function() {

    const id = uuid.v4();

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let rotation = 0;

    let gun1 = null;

    function calculatePositionBasedOnControls(controls) {

    }

    function getPositionObject() {
        return {
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            rotation: rotation
        };
    }


    return {
        update: calculatePositionBasedOnControls,
        position: getPositionObject
    }

};

/*
 * Contains the actual game loop engine with diffs etc.
 */
const Engine = function(loopCallBack=false) {


    let runThisEveryLoop = loopCallBack ? loopCallBack : function (msSinceLastFrame) {};
    let status = 0;
    let frameCounter = 0;
    let lastFrameAt = 0;
    let startStamp = 0;
    let lastCorrection = 0;

    let loopHandler = null;

    const loopsPerSecond = 30;
    const fixFrames = 10;

    function loop() {
        if(status === 1) {
            const sinceLastFrame = Date.now() - lastFrameAt;
            lastFrameAt = Date.now();
            let correction = 0;

            // Correction
            if(frameCounter === fixFrames) {

                const shouldBe = lastCorrection + ((1000/loopsPerSecond) * frameCounter);
                const nowIs = Date.now();
                correction = shouldBe - nowIs;
                //console.log("Check", lastCorrection, shouldBe, nowIs, correction, 1000/loopsPerSecond, frameCounter);

                lastCorrection = nowIs;
                frameCounter=0;
            }

            frameCounter++;

            // Do Stuff
            if(status === 1) {
                //console.log(frameCounter + " / " + loopsPerSecond);
                runThisEveryLoop(sinceLastFrame);
            }



            const diff = ((1000/loopsPerSecond) - (Date.now() - lastFrameAt)) + correction;
            loopHandler = setTimeout(() => {
                loop();
            }, diff);
        }
    }


    function start() {
        status = 1;
        startStamp = Date.now();
        lastFrameAt = startStamp;
        lastCorrection = startStamp;
        loop();
    }

    function pause() {
        if(status === 1) {
            status = 2;
            return true;
        } else if(status === 2) {
            status = 1;
            return false;
        }
    }

    function stop() {
        status = 3;
        clearTimeout(loopHandler);
    }

    function reset() {
        status = 0;
    }


    return {
        start: start,
        pause: pause,
        stop: stop,
        reset: reset
    };

};


module.exports = {
    Game: Game,
    Player: Player
};

