$(function(){
    hide_services_selected(null);
    $('.service-step-2').on('change', function(){
        var work_package = $(this).parent().data('work-package');

        hide_services_selected(work_package);
    });
});