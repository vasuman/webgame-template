define([], function() {
  var tF;

  function Screen() {}
  Screen.prototype.setTrFunc = function(tF_) {
    tF = tF_;
  }
  Screen.prototype.init = function() {}
  Screen.prototype.update = function() {}
  Screen.prototype.destroy = function() {}
  Screen.prototype.transit = function(next) {
    tF(next);
  }

  return new Screen;
});
