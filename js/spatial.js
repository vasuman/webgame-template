define(['ent', 'Point'], function(ent, Point) {
  const delT = 1.0 / 60;
  var spatial = new ent.Component('spatial', []);
  function contains(p) {
    return this.x <= p.x && p.x <= this.x + this.w &&
      this.y <= p.y && p.y <= this.y + this.h;
  }
  spatial.init = function(e) {
    e.contains = contains;
    e.x = e.y = e.w = e.h = 0;
  }
  return spatial;
})
