function searchWiki() {
  var qtxt = $('#searchfield').val();
  var rdiv = $("#res");
  if (qtxt.length > 0) {
    $.ajax( {
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&&search="+qtxt,
      dataType: 'jsonp',
      crossDomain: true,
      headers: { 'Api-User-Agent': 'Data5tream.Wikisearcher/1.0' },
      success: function( data ) {
        animateWin();
        rdiv.empty();
        rdiv.append("<h4>Results for: \""+data[0]+"\"</h4>");
        for (var i=0; i < data[1].length; i++) {
          rdiv.append("<div><a href=\""+data[3][i]+"\"><h5>"+data[1][i]+"</h5></a>"+data[2][i]+"</div><hr>")
        }
      }
    } );
  }
}

function animateWin() {
  var con = $("#content");
  con.animate({
    "top": "10%"
  }, 250);
  var v = $(window).width()*0.6+"px";
  con.animate({
    "left": "20%",
    "width": v
  }, 250);
  con.animate({
    "left": "20%",
    "width": "60%"
  }, 0); // Changing directly over % doesn't work
}

$(function () {
  $("#searchfield").keyup(function(event){
      if(event.keyCode == 13){
          $("#searchbtn").click();
      }
  });
  $("#searchbtn").click(function(event) {
    searchWiki();
    event.preventDefault();
  });
});
