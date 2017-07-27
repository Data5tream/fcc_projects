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
  var pomtime = 60;
  var remtime = pomtime;

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
  var spd = 0.5; // Speed in º/s

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
  function runAnimation() {
    if (pos-270 >= 360) {
      toggleAnim();
      //TODO Alert when time is finished
    }
    if (!waiting) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.arc(200,200,100,pos*(Math.PI/180),(pos+len+10)*(Math.PI/180));
      ctx.stroke();

      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(200,200,100,pos*(Math.PI/180),(pos+len+10)*(Math.PI/180));
      ctx.stroke();

      requestAnimFrame(runAnimation);
    }
  }

  function timecount() {
    pos = pos + 360/pomtime*(pomtime-remtime);
    remtime -= 1;
    console.log(pos);
  }

  function toggleAnim() {
    if (waiting) {
      waiting = false;
      pos = 270;
      len = 0;
      spd = 360/pomtime;
      ctx.strokeStyle = runningColor;
      fullBackdrop();
      runAnimation();
      timer = setInterval(timecount, 1000);
    } else {
      waiting = true;
      pos = 270;
      len = 10; // Length in º
      spd = 0.5; // Speed in º/s
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clearInterval(timer);
      waitAnimation();
      circleBackdrop();
    }
  }

  $('#toggler').click(function() {
    toggleAnim();
  });

  // Start color gradients
  $('.content').css('background-color', getRandomColor());
  $('.content').css('transition', 'all 2.5s linear');
  bgchanger = setInterval(changeBgColor, 2500);

  // Start waiting animation
  waitAnimation();
  circleBackdrop();
});
