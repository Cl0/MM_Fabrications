;(function($) {
  $(document).ready(function() {
    $(document).on('slide.bs.carousel', '.carousel:visible', function (event) {
      $('.carousel:hidden').carousel(event.to);
    })
  });
})(jQuery);
