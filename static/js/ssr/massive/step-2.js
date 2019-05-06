$(function(){
    hide_services_selected(null);
    $('.service-step-2').on('change', function(){
        var $this = $(this);
        var work_package = $(this).parent().data('work-package');

        var service_id = $(this).val();

        if (service_id == '') {
            $this.parent().parent().find('.with-spo-checkbox').removeAttr('checked');
            return false;
        }

        if(service_id) {
            var data = {
                service: service_id,
                work_package: work_package
            };

            $.getJSON(window.external_service_url, data, function (response) {

                if(response.with_spo){
                    $this.parent().parent().find('.with-spo-checkbox').prop('checked', true);
                }else{
                    $this.parent().parent().find('.with-spo-checkbox').removeAttr('checked');
                }
            });
        }
        hide_services_selected(work_package);
    });
});