var bgcol = 0;
var bgchanger;

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

function getWeatherData() {
  $.ajax({
     url:"http://proxy.7base.net/getWeather.py",
     jsonp: 'callback',
     dataType: 'jsonp',
   });
}

function callback(json) {
  console.log(json);
  $('#cond').text(json.cond);
  $('#temp').text(json.temp);
  $('#city').text(json.city);
}

$('document').ready(function() {
  bgchanger = setInterval(pulseBackground, 4000);
});
