define([], function() {
  var ent = {};
  var globalEntIdx = 0;

  var components = [];
  var entities = [];

  function Entity() {
    this.idx = globalEntIdx++;
    this._c = {};
    this._dead = false;
    entities.push(this);
  }
  Entity.prototype.addComponent = function(comp) {
    var self = this;
    this._c[comp.id] = true;
    comp._reqs.forEach(function(depComp) {
      if(!self.hasComponent(depComp)) {
	self.addComponent(depComp);
      }
    });
    comp.init(this);
    return this;
  }
  Entity.prototype.removeComponent = function(comp) {
    this._c[comp.id] = false;
    return this;
  }
  Entity.prototype.hasComponent = function(comp) {
    return this._c[comp.id] || false;
  }
  ent.Entity = Entity;

  function callOnComponents(ent, fk) {
    var k;
    for(k in ent._c) {
      if(ent._c.hasOwnProperty(k) && ent._c[k]) {
	components[k][fk](ent);
      }
    }
  }

  function findCompByName(name) {
    var i;
    for(i = 0; i < components.length; i++) {
      if(components[i].name == name) {
	break;
      }
    }
    if(i == components.length) {
      throw Exception('Component not found!');
    }
    return components[i];
  }
  ent.findCompByName = findCompByName;

  function Component(name, reqs) {
    var self = this;
    this.id = components.length;
    this.name = name;
    this._reqs = [];
    reqs.forEach(function(req) {
      self._reqs.push(findCompByName(req));
    })
    this._props = [];
    components.push(this);
  }
  Component.prototype.update = function(e) {};
  Component.prototype.init = function(e) {};
  Component.prototype.destroy = function(e) {};
  Component.prototype.tick = function() {};
  ent.Component = Component;

  function clearAll() {
    entities.forEach(function(e) {
      callOnComponents(e, 'destroy');
    });
    entities = [];
  }
  ent.clearAll = clearAll;

  function updateAll() {
    entities.forEach(function(e) {
	if(!e._dead) {
	    callOnComponents(e, 'update');
	}
    });
    var i;
    for(i = entities.length - 1; i >= 0; i--) {
      if(entities[i]._dead) {
	callOnComponents(entities[i], 'destroy');
	entities.splice(i, 1);
      }
    }
  }
  ent.updateAll = updateAll;

  function tick() {
    components.forEach(function(c) {
      c.tick();
    });
  }
  ent.tick = tick;

  return ent;
});
