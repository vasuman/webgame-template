define(['config', 'ent', 'screen', 'drawable', 'res', 'menu'], 
function(config, ent, screen, drawable, res, menu) {
  /* HARDCODE */
  const BASE_RADIUS = 300;
  const T_FACTOR = 1000;
  /* END HARDCODE */
  function Loading() {};

  Object.setPrototypeOf(Loading.prototype, screen);

  Loading.prototype.init = function() {
    ent.clearAll();
    var bouncyCircle = new ent.Entity;
    bouncyCircle.addComponent(drawable);
    bouncyCircle._drawFunc = function(ctx) {
      var _radius = Math.abs(Math.sin(Date.now() / T_FACTOR)) * BASE_RADIUS;
      ctx.beginPath();
      ctx.arc(config.width / 2, config.height / 2, _radius, 0, Math.PI * 2, true);
      ctx.fill();
      ctx.closePath();
    }
    bouncyCircle._draw.type = 'custom';
    var self = this;
    function resourcesLoaded() {
      self.transit(menu);
    }
    res.load(resourcesLoaded);
  }

  Loading.prototype.update = function() {
    drawable.clearScreen();
    ent.updateAll();
  }

  return new Loading;
});
