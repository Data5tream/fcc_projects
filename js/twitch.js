function getData() {
  var baseurl = "https://wind-bow.gomix.me/twitch-api/streams/";
  $.ajax( {
    url: baseurl+"ESL_SC2",
    dataType: 'jsonp',
    crossDomain: true,
    success: function( data ) {
      console.log(data);
      var card = $("#eslcard");
      var cardtxt = card.children().eq(1);
      if (data.stream == null) {
        cardtxt.text("Offline");
      } else {
        cardtxt.text("Streaming "+data.stream.game+" - "+data.stream.channel.status);
        card.addClass("card-outline-success animated flash");
        card.children().eq(0).addClass("card-success").css("color", "#fff");
      }
    }
  } );
  $.ajax( {
    url: baseurl+"freecodecamp",
    dataType: 'jsonp',
    crossDomain: true,
    success: function( data ) {
      var card = $("#fcccard").children().eq(1);
      if (data.stream == null) {
        card.text("Offline");
      } else {
        card.text("Streaming "+data.stream.game+" - "+data.stream.channel.status);
      }
    }
  } );
  $.ajax( {
    url: baseurl+"noobs2ninjas",
    dataType: 'jsonp',
    crossDomain: true,
    success: function( data ) {
      var card = $("#noobscard").children().eq(1);
      if (data.stream == null) {
        card.text("Offline");
      } else {
        card.text("Streaming "+data.stream.game+" - "+data.stream.channel.status);
      }
    }
  } );
}

$(function() {
  getData();
});
