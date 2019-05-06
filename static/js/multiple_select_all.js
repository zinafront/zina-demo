// Select all plugin lib
(function( $ ){
    $.fn.select_all = function(select, checkboxes) {
        this.each(function () {
            var select_all = $(this).find(select), checkbox_list = $(this).find(checkboxes);

            select_all.change(function (event) {
                select_all.css('opacity', 1);
                if ($(this).attr('checked') === true) {
                    checkbox_list.attr('checked', true);
                }
                else {
                    checkbox_list.attr('checked', false);
                }
            });

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
        });
    };
})( jQuery );

$(document).ready(function () {
    // Apply the select_all plugin to all CheckboxSelectMultiple widgets.
    //$('.select-all').select_all('input:first', 'input:not(:first)');
    $(".select-all .select-all-header input[type='checkbox']").change(function(){
         input_selcet_all = $(this);
         $(this).parent().parent().find( ".select-all-body input[type='checkbox']" ).each(function() {
             if ($(this).parent().attr('style')){
                 console.log('none')
             }else {
                 if( input_selcet_all.is(':checked')){
                   $(this).prop('checked', true);
                 }else{
                   $(this).prop('checked', false);
                 }
             }
             if ($(this).parent().attr('style') == 'display: inline-block;'){

                 if( input_selcet_all.is(':checked')){
                   $(this).prop('checked', true);
                 }else{
                   $(this).prop('checked', false);
                 }
             }

           });
     });
});