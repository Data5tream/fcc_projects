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

function callback(json) {
  var content = json[0].content.substr(3, json[0].content.length-8);
  content = unescapeHTML(content)
  var author = "- "+json[0].title;
  if ((content.length + author.length + 12) > 140) {
    getNewQuote()
  } else {
    $('#quote').text(content);
    $('#quote-author').text(author);
    var tweetstring = "%22"+encodeURIComponent(content)+"%22"+encodeURIComponent(author);
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='+tweetstring);
  }
}

function getNewQuote() {
  $.ajax({
     url:"https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=callback",
     jsonp: 'callback',
     dataType: 'jsonp',
   });
}

$('document').ready(function() {
  $('.content').css('background-color', getRandomColor());
  $('.content').css('transition', 'all 2.5s linear');
  getNewQuote()

  bgchanger = setInterval(changeBgColor, 2500);

});

function unescapeHTML(str) {//modified from underscore.string and string.js
  var escapeChars = { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' };
  return str.replace(/\&([^;]+);/g, function(entity, entityCode) {
      var match;

      if ( entityCode in escapeChars) {
          return escapeChars[entityCode];
      } else if ( match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
      } else if ( match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
      } else {
          return entity;
      }
  });
}
