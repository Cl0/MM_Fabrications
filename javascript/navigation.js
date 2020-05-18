;(function($) {
  $(document).ready(function() {
    var navHeight = $('.navbar').innerHeight() - 4;

    $('[data-scroller]').on('click', function(e) {
      var target = $(this).data('target');
      var $scrollTo = $(target);

      $('.navbar-collapse').collapse('hide');

      $('html').stop(true).animate({
        scrollTop: $scrollTo.offset().top - navHeight
      }, 1000);

      e.preventDefault();
    });

    $('.navbar-collapse').on('show.bs.collapse', function() {
      $('.logo').fadeOut(50);
    });

    $('.navbar-collapse').on('hidden.bs.collapse', function() {
      $('.logo').fadeIn('fast');
    });
  });
})(jQuery);
