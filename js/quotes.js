var bgchanger;
var curColor;
var bgcolors = [
  "#d32f2f",
  "#c2185b",
  "#7b1fa2",
  "#512da8",
  "#303f9f",
  "#1976d2",
  "#0288d1",
  "#0097a7",
  "#00796b",
  "#388e3c",
  "#689f38",
  "#afb42b",
  "#fbc02d",
  "#ffa000",
  "#f57c00",
  "#e64a19",
  "#5d4037"];

function getRandomColor() {
  curColor = Math.floor(Math.random()*bgcolors.length);
  return bgcolors[curColor];
}

function changeBgColor() {
  if (curColor < bgcolors.length) {
    curColor++;
  } else {
    curColor = 0;
  }
  $('.content').css('background-color', bgcolors[curColor]);
}

function getNewQuote() {
  $.getJSON("https://crossorigin.me/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
    $("#quote").text(a[0].content);
    $("#author").text(a[0].title);
  });
}

$('document').ready(function() {
  $('#quote').html("test");
  $('.content').css('background-color', getRandomColor());
  $('.content').css('transition', 'all 2.5s linear');

  bgchanger = setInterval(changeBgColor, 2500);

});
