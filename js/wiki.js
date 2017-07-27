function searchWiki() {
  var qtxt = $('#searchfield').val();
  if (qtxt.length > 0) {
    $.ajax( {
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&&search="+qtxt,
      dataType: 'jsonp',
      crossDomain: true,
      headers: { 'Api-User-Agent': 'Data5tream.Wikisearcher/1.0' },
      success: function( data ) {
        $("#res").text(data);
      }
    } );
  }
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
