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

function getLocation() {
  $.getJSON("https://ipinfo.io/?token=9ee4278e4a0574", function(res) {
    $('#location').text(res.city);
    getWeatherData(res.loc);
  });
}

function getWeatherData(loc) {
  $.getJSON("https://api.darksky.net/forecast/ea59acfcf5d6d30a2dd77b24c7c35bff/"+loc, function(res) {
    $('#condition').text(res.currently.summary);
  });
}

$('document').ready(function() {
  bgchanger = setInterval(pulseBackground, 4000);
});
