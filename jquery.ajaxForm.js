(function(window, document, $, undefined){

    $.fn.ajaxForm = function(callback){
      $(this).each(function(){
        var form = $(this);

        var validateEmail = function(email){
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        };

        var validateForm = function(e){
          var form = $(this);

          form.find('.error').removeClass('error');
          form.find('.errorbox').remove();

          form.find('.required').each(function(){
            var valid = true;
            var val = $(this).val();

            var type = $(this).attr('type');
            if ($(this).is('textarea')) type = 'textarea';
            if ($(this).is('select')) type = 'select';

            if ($(this).val() === $(this).attr('placeholder')) valid = false;

            if (val === '') valid = false;

            switch(type){
              case 'email':
                valid = validateEmail(val);
              break;
              case 'textarea':
                if (val.length < 10) valid = false;
              break;
              case 'select':
                if (val.length < 1) valid = false;
              break;
              case 'text':
              default:
                if (val.length < 3) valid = false;
              break;
            };

            if (! valid) {
              form.find('label[for="' + $(this).attr('id') + '"]').addClass('error');
              $(this).addClass('error');

              var position = $(this).offset();

              var errorbox = $('<div class="errorbox"></div>');
              errorbox.click(function(){
                $(this).animate({opacity: 0, top: $(this).position().top - 5}, 300, 'linear', function(){ $(this).remove(); });
              });

              var css = {
                width: Math.round( $(this).width() ),
                left: Math.round( position.left - form.offset().left ),
                top: Math.round( position.top - form.offset().top + 5 )
              };

              errorbox.append($('<div class="text">'+$(this).attr('data-error')+'</div>'));
              errorbox.append($('<div class="arrow"></div>'));
              errorbox.css(css);

              errorbox.css('opacity', 0).animate({
                opacity: 1,
                top: css.top - 5
              }, 500, 'linear');

              form.prepend(errorbox);
            }

          });

          if (form.find('.error').size() > 0){
            e.preventDefault();
            return false;
          } else {
            e.preventDefault();
            
            form.find('input[type="submit"]').css('display', 'none');

            var opts = {
              type: form.attr('method'),
              url: form.attr('action'),
              data: form.serialize()
            };

            opts.success = function(){
              if (callback) callback.call(this);
            };

            opts.error = function(){
              form.find('input[type="submit"]').css('display', '');
            };

            $.ajax(opts);

            return false;
          }
        };

        form.attr('novalidate', 'novalidate');
        form.submit(validateForm);

        return this;
      });

      return this;
    };

})(window, window.document, jQuery);