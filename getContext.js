(function() {

  var canvas, context;

  getContext = function(id) {
    if (!id) {
      id = 'canvas';
    }

    if (canvas) {
      context = canvas.getContext('2d');
      if (context) {
        return context;
      } else {
        throw new TypeError('当前浏览器不支持Canvas');
      }
    } else {
      canvas = getCanvas(id);
      context = canvas.getContext('2d');
      return context;
    }
  };

  getCanvas = function(id) {
    if (!id) {
      id = 'canvas';
    }

    if (!canvas) {
      canvas = document.getElementById(id);
    }

    return canvas;
  };

})();