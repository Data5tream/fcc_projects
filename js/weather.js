var bgcol = 0;
var bgchanger;
var canvas;

var bgcolors = [
  '#039be5', //sunny
  '#0288d1', //cloudy
  '#01579b', //rainy
  '#37474f', //night
  '#bdbdbd', //snowy
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
  $('.info').css('display', 'inherit').addClass('animated fadeInDownBig');
  $('#loading').css('display', 'none');

  var bgcolor = '#e65100'
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var ico = 'clear-day.svg';
    switch(json.icon) {
      case 'clear-day':
        bgcolor = bgcolors[0];
        break;
      case 'clear-night':
        bgcolor = bgcolors[3];
        ico = 'clear-night.svg';
        break;
      case 'rain':
        bgcolor = bgcolors[2];
        ico = 'rain.svg'
        // TODO add rain
        break;
      case 'snow':
        bgcolor = bgcolors[3];
        ico = 'snow.svg';
        break;
      case 'sleet':
        ico = 'sleet.svg';
        break;
      case 'wind':
        ico = 'wind.svg';
        break;
      case 'fog':
        ico = 'fog.svg';
        break;
      case 'cloudy':
        bgcolor = bgcolors[1];
        ico = 'cloudy.svg';
        break;
      case 'partly-cloudy-day':
        bgcolor = bgcolors[0];
        ico = 'partly-cloudy-day.svg';
        break;
      case 'partly-cloudy-night':
        bgcolor = bgcolors[3];
        ico = 'partly-cloudy-night.svg';
        break;
    }
    $('body').css('background-color', bgcolor);
    $('#icon').attr('src', 'svg/'+ico);
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

function drawMoon(ctx) {
  ctx.beginPath();
  ctx.arc(canvas.width/4, canvas.height/10, 50, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#fafafa';
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#eeeeee';
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
