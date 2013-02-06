(function(window, document, $, undefined){
    
  $.fn.checkbox = function(){
    $(this).each(function(){
      var self = $(this);
      var $cb = $('<span class="checkbox dynamic-input">&nbsp;</span>');
      
      var toggleCheckbox = function(){
        $cb.toggleClass('active');

        if (self.attr('data-radio')) {
          $('input[name="'+self.attr('name')+'"]:checked').not(self).each(function(){
            $(this).next('.dynamic-input').removeClass('active');
            $(this).trigger('click');
            $(this).trigger('change');
          });
        }

        if ($(this).is('label')) return;
        
        if ($cb.is('.active')) {
          //self.attr('checked', 'checked');
          //self.attr('value', 'on');
        } else {
          //self.removeAttr('checked');
          //self.removeAttr('value');
        }
        
        self.trigger('click');
        self.trigger('change');
      };
      
      self.css({display: 'none', visibility: 'hidden'});
      $cb.insertAfter(self);
      
      if (self.is(':checked')) $cb.addClass('active');
      
      $cb.click(toggleCheckbox);
      
      if (self.attr('id') && self.attr('id').toString().length > 1) {
        $('label[for="'+self.attr('id')+'"]').click(toggleCheckbox);
      }
      
      return this;
    });
    
    return this;
  };
  
})(window, window.document, jQuery);