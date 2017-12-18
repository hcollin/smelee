
import Game from 'js/Game.js';

document.addEventListener('DOMContentLoaded', () => {

  const configuration = {
      resolution: {
        width: 1024,
        height: 576
      },
      renderer: Phaser.AUTO,   // AUTO, CANVAS, WEBGL
      fullScreen: false,
      scale: true,
      audio: {
          on: true,
          master: 1,
          fx: 1,
          music: 1
      }
  };


  let game = new Game(configuration);

});
