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
  $('#unit').click(function() {
    if ($('#unit').text() == 'ºC') {
      $('#temp').text(Math.round(json.temp*9/5+32));
      $('#unit').text('ºF');
    } else {
      $('#temp').text(Math.round(json.temp));
      $('#unit').text('ºC');
    }
  });
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

$(function () {
  bgchanger = setInterval(pulseBackground, 4000);
  canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    setupCanvas();
  }
  getWeatherData();
});
