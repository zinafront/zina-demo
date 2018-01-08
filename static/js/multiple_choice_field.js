// Select all for multiple choice fields lib

$.extend($.expr[':'], {
  'like': function(elem, i, match, array)
  {
      var search_terms = (match[3] || "").toLowerCase().split(' ');
      var string_to_search = (elem.textContent || elem.innerText || '').toLowerCase();
      for (var i in search_terms) {
          if (string_to_search.indexOf(search_terms[i]) === -1) {
              return false;
          }
      }
      return true;
  }
});

(function( $ ){
    $.fn.select_all = function(select, checkboxes, search) {
        this.each(function () {
            var select_all = $(this).find(select),
                checkbox_list = $(this).find(checkboxes),
                search_box = $(this).find(search);

            //select_all.change(function (event) {
            //    select_all.css('opacity', 1);
            //    if ($(this).attr('checked')) {
            //        checkbox_list.parent().find(':visible').attr('checked', true);
            //    }
            //    else {
            //        checkbox_list.parent().find(':visible').attr('checked', false);
            //    }
            //});

            checkbox_list.change(function () {
                if (checkbox_list.not(':checked').length === 0) {
                    select_all.attr('checked', true);
                    select_all.css('opacity', 1);
                }
                else if (!checkbox_list.is(':checked')) {
                    select_all.attr('checked', false);
                    select_all.css('opacity', 1);
                }
                else {
                    select_all.attr('checked', true);
                    select_all.css('opacity', 0.5);
                }
            });

            $(search_box).keyup(function (e) {
                if ($(this).val() !== '') {
                    checkbox_list.parent().hide();
                    checkbox_list.parent().find('span:like(' + $(this).val() + ')').parent().show();
                }
                else {
                    checkbox_list.parent().show();
                }
            });
        });
    };
})( jQuery );

$(document).ready(function () {
    // Apply the select_all plugin to all CheckboxSelectMultiple widgets.
    $('.select-all-scroll').select_all('input[type=checkbox]:first', 'input[type=checkbox]:not(:first)', '.search');
    //$(".select-all-scroll .select-all-header input[type='checkbox']").change(function () {
    //    input_selcet_all = $(this)
    //    $(this).parent().parent().find(".select-all-body input[type='checkbox']").each(function () {
    //        if (input_selcet_all.is(':checked')) {
    //            $(this).prop('checked', true);
    //        } else {
    //            $(this).prop('checked', false);
    //        }
    //    });
    //});

});
