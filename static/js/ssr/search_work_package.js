$(function () {
    // $('#id_work_package_text').on('input', function () {
    //     var work_package = $(this).val();
    //     if(work_package) {
    //         $.getJSON(window.url_api_work_package_info, {'work_package': work_package}, function (data) {
    //             $('#id_site').val(data.site);
    //             $('#id_candidate').val(data.candidate);
    //         }).fail(function () {
    //             $('#id_site').val('');
    //             $('#id_candidate').val('');
    //         });
    //     }else{
    //         $('#id_site').val('');
    //         $('#id_candidate').val('');
    //     }
    // });

    $('#id_work_package_text').autocomplete({
        source: window.url_api_get_work_packages,
        minLength: 2,
        select: function( event, ui ) {
            $('#id_work_package_text').attr('readonly', 'readonly');
            $.getJSON(window.url_api_work_package_info, {'work_package': ui.item.value}, function (data) {
                $('#id_site').val(data.site);
                $('#id_candidate').val(data.candidate);
                $('#id_work_package_text').attr('readonly', 'readonly');
                window.location.href = window.url_change_ssr + ui.item.value;
            }).fail(function () {
                $('#id_site').val('');
                $('#id_candidate').val('');
                $('#id_work_package_text').removeAttr('readonly');
            });
        }
    });


});