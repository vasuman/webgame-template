define(['config', 'ent', 'spatial'], function(config, ent, _) {
  var ctx;
  var drawable = new ent.Component('drawable', ['spatial']);

  function registerCtx(context) {
    ctx = context;
  }
  drawable.registerCtx = registerCtx;

  drawable.update = function(e) {
    if(e._draw.type == 'fillrect') {
      ctx.setFillColor(e._draw.color);
      ctx.fillRect(e.x, e.y, e.w, e.h);
    } else if(e._draw.type == 'custom') {
      e._drawFunc(ctx);
    }
  }

  drawable.init = function(e) {
    e._draw = {};
  }

  function clearScreen() {
    ctx.clearRect(0, 0, config.width, config.height);
  }
  drawable.clearScreen = clearScreen;

  return drawable;
});
