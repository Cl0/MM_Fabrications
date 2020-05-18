;(function($, validate) {
  $.fn.validation = function() {
    var args = Array.prototype.slice.call(arguments);
    var method = args.shift();

    if (methods.hasOwnProperty(method)) {
      return methods[method].apply(this, args);
    } else {
      throw new Error('Unknown method validation.' + method);
    }
  };

  var methods = {
    getOptions: function() {
      return $(this).data('validation-options') || {};
    },
    setOptions: function(options) {
      var existingOptions = $(this).validation('getOptions');

      $(this).data(
        'validation-options',
        $.extend({}, existingOptions, options)
      );
    },
    run: function(elements) {
      var errors = [];
      var validationOptions = $(this).validation('getOptions');
      var deferred = $.Deferred();

      if (!elements) {
        elements = '[data-validation]';
      }

      $(this).find(elements).each(function() {
        var $input = $(this);
        var value = $(this).val();
        var validations = $input.data('validation').split(',');
        var contract = {};

        $.each(validations, function(_, validation) {
          contract[validation] = validationOptions[validation] || true;
        });

        $input.trigger('validation.start');

        var result = validate.single(value, contract);

        if ($.isEmptyObject(result)) {
          $input.trigger('validation.success');
          $input.trigger('validation.complete');
        } else {
          errors.push({
            el: this,
            errors: result
          });
          $input.trigger('validation.failure', [result]);
          $input.trigger('validation.complete', [result]);
        }
      });

      if ($.isEmptyObject(errors)) {
        deferred.resolve();
      } else {
        deferred.reject(errors);
      }

      return deferred;
    }
  };
})(jQuery, window.validate);
