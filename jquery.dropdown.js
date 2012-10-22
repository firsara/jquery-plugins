(function(window, document, $, undefined){
    
  $.fn.dropdown = function(){
    $(this).each(function(){
      var self = $(this);
      var $dd = $('<span class="dropdown"></span>');
      var $selected = $('<span class="selected"></span>');
      var $options = $('<span class="options"></span>');
      
      $dd.append($selected);
      $dd.append($options);
      
      self.find('option').each(function(id, el){
        var opt = $('<span class="option" data-value="'+$(this).attr('value')+'" data-id="'+id+'">'+$(this).html()+'</span>');
        $(this).attr('data-id', id);
        $options.append(opt);
      });
      
      var toggleDropdown = function(){
        if ($options.is(':animated')) return;
        
        $options.slideToggle(500);
        $dd.toggleClass('open');
      };
      
      var setDropdownValue = function(){
        var val = $(this).attr('data-value');
        var id = $(this).attr('data-id');
        
        self.find('option').removeAttr('selected');
        self.find('option[data-id="'+id+'"]').attr('selected', 'selected');
        $dd.find('.option').removeClass('active');
        $dd.find('.option[data-id="'+id+'"]').addClass('active');
        $selected.html($(this).html());
        
        $options.stop(true, true).slideUp(500);
        $dd.removeClass('open');
      };
      
      var getValue = function(){
        var val = self.val();
        return self.find('option[value="'+val+'"]').html();
      };
      
      self.css({display: 'none', visibility: 'hidden'});
      $dd.insertAfter(self);
      
      $selected.html(getValue());
      
      $selected.click(toggleDropdown);
      $options.find('.option').click(setDropdownValue);
      
      if (self.attr('id') && self.attr('id').toString().length > 1) {
        $('label[for="'+self.attr('id')+'"]').click(toggleDropdown);
      }
      
      var id = self.find('option').index( self.find('option[selected]') );
      if (!id || id == -1) id = 0;
      $dd.find('.option[data-id="'+id+'"]').addClass('active');
      
      return this;
    });
    
    return this;
  };
  
})(window, window.document, jQuery);