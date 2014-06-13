define(['screen', 'ent', 'drawable', 'button', 'input', 'layout'], 
function(screen, ent, drawable, button, input, layout) {
  function Menu() {}
  Object.setPrototypeOf(Menu.prototype, screen);
  Menu.prototype.init = function() {
    ent.clearAll();    
  }
  Menu.prototype.update = function() {
    drawable.clearScreen();
    ent.updateAll();
    input.update();
  }
  return new Menu;
});
