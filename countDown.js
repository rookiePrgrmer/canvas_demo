var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var endTime = new Date(2017, 11, 31, 23, 59, 59);
var curShowTimeSeconds = 0;

var balls = [];
const COLORS = [
    '#33B5E5', '#0099CC', '#AA66CC',
    '#9933CC', '#99CC00', '#669900',
    '#FFBB33', '#FF8800', '#FF4444',
    '#CC0000'
];

window.onload = function() {
  var ctx = getContext();

  curShowTimeSeconds = getCurrentShowTimeSeconds();

  setInterval(function() {
    render(ctx);
    update();
  }, 50);

  function render(ctx) {
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    var current = secondsToHMS(curShowTimeSeconds);
    var hours = current.hours,
        minutes = current.minutes,
        seconds = current.seconds;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);

    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);

    var ball;
    for (var i = 0, len = balls.length;i < len; i++) {
      ball = balls[i];

      ctx.fillStyle = ball.color;

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, RADIUS, 0, 2 * Math.PI, true);
      ctx.closePath();

      ctx.fill();
    }
  }

  function renderDigit(x, y, num, ctx) {
    ctx.fillStyle = 'rgb(0, 102, 153)';

    for(var i = 0; i < digit[num].length; i++) {
      for (var j = 0; j < digit[num][i].length; j++) {
        if (digit[num][i][j] === 1) {
          ctx.beginPath();
          ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
        }
      }
    }
  }
};

function getCurrentShowTimeSeconds() {
  var curTime = new Date();
  var ret = endTime.getTime() - curTime.getTime();
  ret = Math.round(ret / 1000);

  return ret >= 0 ? ret : 0;
}

function update() {
  var nextShowTimeSeconds = getCurrentShowTimeSeconds();

  var next = secondsToHMS(nextShowTimeSeconds);
  var nextHours = next.hours;
  var nextMinutes = next.minutes;
  var nextSeconds = next.seconds;
  
  var current = secondsToHMS(curShowTimeSeconds);
  var curHours = current.hours;
  var curMinutes = current.minutes;
  var curSeconds = current.seconds;

  if (nextSeconds !== curSeconds) {
    if (parseInt(curHours/10) !== parseInt(nextHours/10)) {
      addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours/10));
    }
    if (parseInt(curHours%10) !== parseInt(nextHours%10)) {
      addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours%10));
    }
    if (parseInt(curMinutes/10) !== parseInt(nextMinutes/10)) {
      addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes/10));
    }
    if (parseInt(curMinutes%10) !== parseInt(nextMinutes%10)) {
      addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes%10));
    }
    if (parseInt(curSeconds/10) !== parseInt(nextSeconds/10)) {
      addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds/10));
    }
    if (parseInt(curSeconds%10) !== parseInt(nextSeconds%10)) {
      addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds%10));
    }

    curShowTimeSeconds = nextShowTimeSeconds;
  }

  updateBalls();
}

function updateBalls() {
  var ball;
  for (var i = 0, len = balls.length; i < len; i++) {
    ball = balls[i];

    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += ball.g;

    if (ball.y >= WINDOW_HEIGHT - RADIUS) {
      ball.y = WINDOW_HEIGHT - RADIUS;
      ball.vy = -ball.vy * 0.75;
    }
  }
}

function addBalls(x, y, num) {
  for (var i = 0, len = digit[num].length; i < len; i++) {
    for (var j = 0, size = digit[num][i].length; j < size; j++) {
      if (digit[num][i][j] === 1) {
        var aBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          color: COLORS[random(COLORS.length - 1)]
        };
        balls.push(aBall);
      }
    }
  }
}

function secondsToHMS(totalSeconds) {
  var hours = parseInt(totalSeconds / 3600);
  var minutes = parseInt((totalSeconds - hours * 3600) / 60);
  var seconds = totalSeconds % 60;

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}