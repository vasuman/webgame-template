define([], function() {
  /* RESOURCES */
  const JSON_LIST = ['layout/menu.json'];
  const IMG_LIST = [];
  /* END RESOURCES */
  var resources = {
    json: {},
    img: {}
  };

  var jsonComplete = false, imgComplete = false;

  function setPath(obj, path, val) {
    var dotIdx = path.indexOf('.');
    path = path.substr(0, dotIdx);
    var parts = path.split('/');
    var i;
    for(i = 0; i < parts.length - 1; i++) {
      if(!obj[parts[i]]) {
        obj[parts[i]] ={};
      }
      obj = obj[parts[i]];
    }
    obj[parts[i]] = val;
  }

  function load(completionCback) {
    if(jsonComplete && imgComplete) {
      completionCback();
      return;
    }
    function complete() {
      if(jsonComplete && imgComplete) {
        completionCback();
      }
    }
    var imgCount = 0;
    function imgCback() {
      if(++imgCount == IMG_LIST.length) {
        imgComplete = true;
        complete();
      }
    }
    var jsonCount = 0;
    function jsonCback(path, req) {
      return function() {
        setPath(resources.json, path, JSON.parse(req.responseText));
        if(++jsonCount == JSON_LIST.length) {
          jsonComplete = true;
          complete();
        }
      }
    }
    if(IMG_LIST.length == 0) {
      imgComplete = true;
    }
    IMG_LIST.forEach(function(imgPath) {
      var img = new Image;
      setPath(resources.img, imgPath, img);
      img.onload = imgCback;
      img.src = imgPath;
    });
    if(JSON_LIST.length == 0) {
      jsonComplete = true;
    }
    JSON_LIST.forEach(function(jsonPath) {
      var xhr = new XMLHttpRequest;
      xhr.onload = jsonCback(jsonPath, xhr);
      xhr.open('GET', jsonPath, true);
      xhr.send();
    });
  }
  resources.load = load;

  return resources;
});
