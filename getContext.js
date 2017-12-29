getContext = function(id) {
  if (!id) {
    id = 'canvas';
  }

  var canvas = document.getElementById(id), context;
  if (canvas) {
    context = canvas.getContext('2d');
    if (context) {
      return context;
    } else {
      throw new TypeError('当前浏览器不支持Canvas');
    }
  } else {
    throw new TypeError('请传递正确的id');
  }
};