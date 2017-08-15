$(function() {
  var bgchanger;
  var timer;
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
  var waitingColor = "#c2185b";
  var runningColor = "#512da8";
  var canvas = document.getElementById('clockcanvas');
  var ctx = canvas.getContext('2d');
  var waiting = true;
  var pomtime = 0;
  var working = true;

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

  // ANIMATIONS

  var pos = 270; // Starting position
  var len = 10; // Length in º
  var spd = 0.1; // 1 RPM

  // requestAnim shim layer by Paul Irish
  window.requestAnimFrame = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */ callback, /* DOMElement */ element) {
          window.setTimeout(callback, 1000 / 60);
      };
  })();

  function circleBackdrop() {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(200,200,100,0,2*Math.PI);
    ctx.stroke();
  }
  function waitAnimation() {
    if (pos == 360) {
      pos = 0;
    }
    if (waiting) {
      ctx.strokeStyle = waitingColor;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.arc(200,200,100,(pos-len-10)*(Math.PI/180),pos*(Math.PI/180));
      ctx.stroke();

      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(200,200,100,(pos-len-10)*(Math.PI/180),pos*(Math.PI/180));
      ctx.stroke();

      pos += spd;
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.arc(200,200,100,(pos-len)*(Math.PI/180),pos*(Math.PI/180));
      ctx.stroke();

      requestAnimFrame(waitAnimation);
    }
  }

  function fullBackdrop() {
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(200,200,100,0,2*Math.PI);
    ctx.stroke();
  }

  function toggleAnim() {
    if (waiting) {
      // Start countdown

      pomtime = Date.parse(new Date()) + $('#hor').text()*60*60*1000 + $('#min').text()*60*1000 + $('#sec').text()*1000;

      waiting = false;
      pos = 270;
      ctx.strokeStyle = runningColor;
      fullBackdrop();

      timer = setInterval(countdown, 1000);

    } else {
      // Stop countdown

      waiting = true;
      pos = 270;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clearInterval(timer);
      waitAnimation();
      circleBackdrop();
    }
  }

  function countdown() {
    var t = pomtime - Date.parse(new Date());
    if (t < 0) {
      clearInterval(timer);
      $('#contcard').addClass("animated infinite shake");
      $('#contcard').on('click', function() {
        $(this).removeClass("animated infinite shake");
      });
      if (working) {
        updateTime(parseInt($('#breakmins').val()));
        $('#title').text('Break');
      } else {
        updateTime(parseInt($('#mainmins').val()));
        $('#title').text('Work');
      }
      working = !working;
      waiting = true;
    } else {
      var secs = Math.floor( (t/1000) % 60 );
      var mins = Math.floor( (t/1000/60) % 60 );
      var hors = Math.floor( (t/(1000*60*60)) % 24 );
      $('#hor').text(tailC(hors));
      $('#min').text(tailC(mins));
      $('#sec').text(tailC(secs));
    }
  }

  function tailC(num) {
    if (num < 10 && num >= 0) {
      return "0"+num;
    } else {
      return num;
    }
  }

  function updateTime(t) {
    $('#hor').text(tailC(Math.floor(t/60)));
    $('#min').text(tailC(Math.floor(t%60)));
  }

  $('#toggler').click(function() {
    toggleAnim();
  });

  $('.chngbtn').click(function() {
    switch ($(this).val()) {
      case 'mm':
        $('#mainmins').val(parseInt($('#mainmins').val())-1);
        break;
      case 'mp':
        $('#mainmins').val(parseInt($('#mainmins').val())+1);
        break;
      case 'bm':
        $('#breakmins').val(parseInt($('#breakmins').val())-1);
        break;
      case 'bp':
        $('#breakmins').val(parseInt($('#breakmins').val())+1);
        break;
    }
    if (waiting) {
      if (working) {
        var t = parseInt($('#mainmins').val());
      } else {
        var t = parseInt($('#breakmins').val());
      }
      updateTime(t);
    }
  });

  $('#mainmins').on('change', function() {
    if (waiting) {
      updateTime(parseInt($('#mainmins').val()));
    }
  });

  // Start color gradients
  $('.content').css('background-color', getRandomColor());
  $('.content').css('transition', 'all 2.5s linear');
  bgchanger = setInterval(changeBgColor, 2500);

  // Start waiting animation
  waitAnimation();
  circleBackdrop();
});
