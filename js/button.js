define(['ent', 'input',  'spatial', 'drawable'], 
function(ent, input, _, _) {
  var button = new ent.Component('button', ['spatial', 'drawable']);
  button.init = function(e) {
    e._draw.type = 'fillrect';
    e._draw.color = 'blue';
  }
  button.update = function(e) {
    var click = input.getClick();
    if(click && e.contains(click)) {
      e.onClick();
    }
  }
  return button;
});
