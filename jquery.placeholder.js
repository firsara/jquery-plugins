(function(window, document, $, undefined){

$.fn.placeholder = function(){
  $(this).each(function(){

    $(this).find('[placeholder]').each(function(){

      var val = $(this).attr('placeholder');
      
      if ($(this).val() == ''){
        if ($(this).is('textarea')) {
          $(this).html(val);
          $(this).attr('data-placeholder-value', val);
        } else {
          $(this).attr('value', val);
          $(this).attr('data-placeholder-value', val);
        }
      }

      $(this).focus(function(){
        if ( $(this).val() == $(this).attr('data-placeholder-value') ) {
          $(this).val('');

          if ($(this).is('textarea')) {
            $(this).html('');
          }
        }
      }).blur(function(){
        if ( $(this).val() == $(this).attr('data-placeholder-value') || $(this).val() == '' ) {
          $(this).val($(this).attr('data-placeholder-value'));

          if ($(this).is('textarea')) {
            $(this).html($(this).attr('data-placeholder-value'));
          }
        }
      });

    });

  });

  return this;
};

})(window, window.document, jQuery);