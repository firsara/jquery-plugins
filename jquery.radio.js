(function(window, document, $, undefined){
    
  $.fn.radio = function(){
    $(this).each(function(){
      var self = $(this);
      var $radio = $('<span class="radio" data-name="'+self.attr('name')+'">&nbsp;</span>');
      
      var toggleRadio = function(){
        var name = $(this).attr('data-name');
        
        $('.radio[data-name="'+name+'"]').removeClass('active');
        $('input[type="radio"][name="'+name+'"]').removeAttr('checked');
        
        self.attr('checked', 'checked');
        $radio.addClass('active');
        
        self.trigger('change');
      };
      
      var toggleRadioLabel = function(){
        $(this).siblings('.radio').trigger('click');
      };
      
      self.css({display: 'none', visibility: 'hidden'});
      $radio.insertAfter(self);
      
      if (self.is(':checked')) $radio.addClass('active');
      
      $radio.click(toggleRadio);
      
      if (self.attr('id') && self.attr('id').toString().length > 1) {
        $('label[for="'+self.attr('id')+'"]').click(toggleRadioLabel);
      }
      
      return this;
    });
    
    return this;
  };
  
})(window, window.document, jQuery);