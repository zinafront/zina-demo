function empty_sub_component() {
    $('.sub-component').empty();
    $('.sub-component').append('<option value="">---------</option>');
}

$(function () {
    $('.cost-component').on('change', function () {
        var cost_component_id = $(this).val();

        if(cost_component_id) {
            $.getJSON(window.url_get_sub_components, {'cost_component_id': cost_component_id}, function (data) {
                empty_sub_component();
                data['sub_components'].forEach(function (element, index) {
                    $('.sub-component').append('<option value="' + element['id'] + '">' + element['description'] + '</option>');
                });
            });
        }else{
            empty_sub_component();
        }
    });
});