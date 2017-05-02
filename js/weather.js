var bgcol = 0;
var bgchanger;
var canvas;

var bgcolors = [
  '#039be5', //sunny
  '#01579b', //rainy
  '#37474f', //night
]

function pulseBackground() {
  var bgcs = ['#212121' , '#313131'];
  if (bgcol === 0) {
    $('body').css('background-color', bgcs[1]);
    bgcol = 1;
  } else {
    $('body').css('background-color', bgcs[0]);
    bgcol = 0;
  }
}

function setupCanvas() {
  $('#canvas').attr('height', $(window).height());
  $('#canvas').attr('width', $(window).width());
  $('footer').css('bottom', 'inherit');
}

function getWeatherData() {
  $.ajax({
     url:"https://api.7base.net/getWeather.py",
     jsonp: 'callback',
     dataType: 'jsonp',
   });
}

function callback(json) {
  clearInterval(bgchanger);
  $('#cond').text(json.cond);
  $('#temp').text(Math.round(json.temp));
  $('#city').text(json.city);
  $('.info').css('visibility', 'visible').addClass('animated fadeInDownBig');
  $('#loading').css('display', 'none');

  var bgcolor = '#e65100'
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    switch(json.icon) {
      case 'clear-day':
        bgcolor = bgcolors[0];
        drawSun(ctx);
        break;
      case 'clear-night':
        bgcolor = bgcolors[2];
        break;
      case 'rain':
        bgcolor = bgcolors[1];
        drawClouds(ctx);
        // TODO add rain
        break;
      case 'snow':
        break;
      case 'sleet':
        break;
      case 'wind':
        break;
      case 'fog':
        break;
      case 'cloudy':
        drawClouds(ctx, 2);
        // TODO add more clouds here
        break;
      case 'partly-cloudy-day':
        bgcolor = bgcolors[0];
        drawSun(ctx);
        drawClouds(ctx, 1);
        break;
      case 'partly-cloudy-night':
        bgcolor = bgcolors[2];
        break;
    }
    $('body').css('background-color', bgcolor);
  }
}

function drawSun(ctx) {
  ctx.beginPath();
  ctx.arc(canvas.width/4, canvas.height/10, 50, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#ffeb3b';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#ffff00';
  ctx.stroke();
  ctx.closePath();
}

function drawClouds(ctx, num) {
  //TODO add outline to clouds
  switch (num) {
    case 4:
    case 3:
    case 2:
      // Cloud #2
      var x = canvas.width/4-50;
      var y = canvas.height/10+10;
      ctx.fillStyle = '#e0e0e0';

      ctx.beginPath();
      ctx.arc(x, y+30, 50, 0, 2*Math.PI, true);
      ctx.arc(x-120, y+20, 60, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(x-55, y+5, 70, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
      ctx.fillRect(x-120, y+20, 120, 60);
    case 1:
      // Cloud #1
      var x = canvas.width/4+20;
      var y = canvas.height/10+40;
      ctx.fillStyle = '#fff';

      ctx.beginPath();
      ctx.arc(x, y+30, 50, 0, 2*Math.PI, true);
      ctx.arc(x-120, y+20, 60, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(x-55, y+5, 70, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.closePath();
      ctx.fillRect(x-120, y+20, 120, 60);
  }
}

$(function () {
  bgchanger = setInterval(pulseBackground, 4000);
  canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    setupCanvas();
  }
  getWeatherData();
});
