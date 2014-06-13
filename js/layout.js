define(['res'], function(res) {
  var layout = {};
  function setFromFile(e, fName, rId) {
    var o = res.json.layout[fName][rId];
    e.x = o.x;
    e.y = o.y;
    e.w = o.w;
    e.h = o.h;
  }
  layout.setFromFile = setFromFile;
  return layout;
});
