function searchWiki() {
  var qtxt = $('#searchfield').val();
  if (qtxt.length > 0) {
    $.ajax( {
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&&search="+qtxt,
      dataType: 'json',
      headers: { 'Api-User-Agent': 'Data5tream.Wikisearcher/1.0' },
      success: function( data ) {
        console.log( data );
      }
    } );
  }
}

function callback(json) {
  alert("JEp");
}

$(function () {
  $("#searchfield").keyup(function(event){
      if(event.keyCode == 13){
          $("#searchbtn").click();
      }
  });
});
