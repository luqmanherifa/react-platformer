import { GAME_SETTINGS } from "./constants";

export const createGameConfig = (scene) => ({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: GAME_SETTINGS.GRAVITY },
      debug: false,
    },
  },
  scene: scene,
});
