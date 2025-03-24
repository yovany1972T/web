$(window).scroll(function() {

  var wScroll = $(this).scrollTop();

  $('.cog').css({
    'transform': 'rotate(' + wScroll / 2 + 'deg)'
  });

  $('.cog-opp').css({
    'transform': 'rotate(-' + wScroll / 2 + 'deg)'
  });

});