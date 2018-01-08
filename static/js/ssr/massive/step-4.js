$(function(){
    $('.delete-cost-package').each(function(idx){
        if($(this).is(':checked')){
            var $cost_package = $(this).closest('.cp-parent');

            var data_ssr = $cost_package.data('ssr');

            var $sales_items = $cost_package.parent().find('.cp-child[data-ssr='+ data_ssr +']');
            $cost_package.remove();
            $sales_items.remove();
        }
    });

    $('.collapse-work-package').each(function (idx) {
        var $work_package = $(this);
        var flag = false;

        $(this).find('.cs_wrapper').each(function(jdx){
            if($(this).find('.ser_wp_summary').find('.rtp').length > 0){
                $work_package.find('.services-list').prepend($(this));
                //$(this).remove();

            }
        });

        $(this).find('.cs_wrapper').each(function(jdx){

            if(flag){
                flag = false;
                $(this).find('.ser_wp_summary').addClass('bg-gray-dark');
                $(this).find('.cs_info_config_summary').addClass('bg-gray-dark');
                $(this).find('.cp_wrapper').addClass('bg-gray-dark');
            }else{
                flag = true;
            }
            if($(this).find('.cp-parent').length <= 0){
                $(this).find('.cp_confi').remove();
            }
        });
        $work_package.find('.services-list').show();
    });

    $('#success-counter').html($('.ser_wp_summary').find('>.rtp').length);
    $('#error-counter').html($('.ser_wp_summary').find('>.error').length);

});