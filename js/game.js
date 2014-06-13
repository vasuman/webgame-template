define(['ent', 'screen'], function(ent, screen) {
  function Game() {
  }
  Object.setPrototypeOf(Game.prototype, screen);
  return new Game;
});
