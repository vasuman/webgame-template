require(['shims', 'config', 'ent', 'drawable', 'game', 'screen', 
	 'input', 'loading', 'res'],
function(_, config, ent, drawable, game, screen, 
	 input, loading, res) {
  var nextLoop = window.requestAnimationFrame;
  var canvas, ctx, curScreen = null, nextScreen = null;

  function setScreen(screen_) {
    nextScreen = screen_;
  }

  function transit() {
    if(nextScreen != null) {
      if(curScreen != null) {
	curScreen.destroy();
      }
      curScreen = nextScreen;
      curScreen.init();
      nextScreen = null;
    }
  }

  function update() {
    transit();
    if(curScreen) {
      curScreen.update();
    }
    nextLoop(update);
  }

  function init() {
    canvas = document.getElementById('game-canvas');
    canvas.width = config.width;
    canvas.height = config.height;
    ctx = canvas.getContext('2d');
    drawable.registerCtx(ctx);
    update();
    input.listenEv(canvas);
    screen.setTrFunc(setScreen);
    screen.transit(loading);
  }

  init();

});
