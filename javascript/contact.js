;(function($) {
  $(document).ready(function() {
    var $contactForm = $('#contact form');

    $contactForm.validation('setOptions', {
      presence: { allowEmpty: false }
    });

    $contactForm.on('blur', '[data-validation]', function() {
      $contactForm.validation('run', this);
    });

    $contactForm.find('[data-validation]').on('validation.start', function() {
      $(this).removeClass('is-valid is-invalid');
      $(this).parent().find('.invalid-feedback').remove();
    });

    $contactForm.find('[data-validation]').on('validation.failure', function(_, result) {
      var $input = $(this);

      $input.addClass('is-invalid');

      $.each(result, function(_, error) {
        $('<div>', {
          class: 'invalid-feedback',
          text: error
        }).insertAfter($input);
      });
    });

    $contactForm.find('[data-validation]').on('validation.success', function() {
      $(this).addClass('is-valid');
    });

    $contactForm.on('submit', function(e) {
      $('.alert-wrapper').remove();

      $contactForm.find('[data-submit-control]').prop('disabled', true);

      $contactForm.validation('run').then(function() {
        var url = $contactForm.prop('action');
        var data = {};

        $.each($contactForm.serializeArray(), function(_, item) {
          data[item.name] = item.value;
        });

        $.ajax({
          url: url,
          type: 'POST',
          data: data,
          dataType: 'json',
          success: function(response) {
            $contactForm.parent().find('.completed').removeClass('d-none');
            $contactForm.hide();
          },
          error: function() {
            $contactForm.prepend(
              $('<div>', {
                class: 'row restricted alert-wrapper'
              }).append(
                $('<div>', {
                  class: 'col'
                }).append(
                  $('<div>', {
                    class: 'alert alert-danger',
                    html: 'Sorry, there was an error processing your enquiry, please try again or '
                  }).append(
                    $('<a>', {
                      href: 'mailto:mmfabrications@outlook.com',
                      text: 'email us'
                    })
                  )
                )
              )
            );
          },
          complete: function() {
            $contactForm.find('[data-submit-control]').prop('disabled', false);
          }
        });
      }).fail(function() {
        $contactForm.find('[data-submit-control]').prop('disabled', false);
      });

      e.preventDefault();
    });
  });
})(jQuery);
