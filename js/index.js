function shiftTo(tar) {
  $("html, body").animate({
      'scrollTop':   $('#'+tar).offset().top
  }, 1000);
}
