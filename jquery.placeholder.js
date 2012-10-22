(function(window, document, $, undefined){

$.fn.placeholder = function(){
  $(this).each(function(){

    $(this).find('[placeholder]').each(function(){

      var val = $(this).attr('placeholder');
      
      if ($(this).val() == ''){
        if ($(this).is('textarea')) {
          $(this).html(val);
        } else {
          $(this).attr('value', val);
        }
      }

      $(this).focus(function(){
        if ( $(this).val() === this.defaultValue ) {
          $(this).val('');
        }
      }).blur(function(){
        if ( $(this).val() === this.defaultValue || $(this).val() === '' ) {
          $(this).val(this.defaultValue);
        }
      });

    });

  });

  return this;
};

})(window, window.document, jQuery);