define(['Point'], function(Point) {
  var input = {};
  var el = {}
  var mPos = new Point;
  var clicked = false;
  var clickPos = new Point;

  function setPos(pos, ev) {
    pos.x = ev.clientX - el.offsetLeft;
    pos.y = ev.clientY - el.offsetTop;
  }

  function listenEv(el_) {
    el = el_;
    el.addEventListener('mousemove', function(ev) {
      setPos(mPos, ev);
    });
    el.addEventListener('click', function(ev) {
      setPos(clickPos, ev);
      clicked = true;
    });
  }
  input.listenEv = listenEv;

  function getClick() {
    return clicked && clickPos;
  }
  input.getClick = getClick;

  function update() {
    clicked = false;
  }
  input.update = update;

  function getMousePos() {
    return mPos;
  }
  input.getMousePos = getMousePos;

  return input;

});
