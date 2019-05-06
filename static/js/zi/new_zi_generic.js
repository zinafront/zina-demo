$(function () {
    $('#id_zip_id_partner_form').on('submit', function (evt) {

        $('#id_project').removeAttr('disabled');
    });

    $('body').on('change', '.state', function () {
        var $form = $(this).closest('form');
        var $select = $form.find('.city');
        $select.empty();
        $select.append('<option selected="selected" value="">---------</option>');
        if($(this).val()) {
            $.getJSON(window.url_get_cities, {state: $(this).val()}, function (data) {
                var cities = data.towns;
                cities.forEach(function (value, index, array) {
                    $select.append('<option value="' + value.id + '">' + value.name + '</option>')
                });

            });
        }
    });

    $('body').on('change', '.project', function () {
        var $form = $(this).closest('form');
        var $select_state = $form.find('.state');
        $select_state.empty();

        var $select_city = $form.find('.city');
        $select_city.empty();
        $select_state.append('<option selected="selected" value="">---------</option>');
        $select_city.append('<option selected="selected" value="">---------</option>');
        if($(this).val()) {
            $.getJSON(window.url_get_states_form_zi_project, {project: $(this).val()}, function (data) {
                var states = data.states;
                states.forEach(function (value, index, array) {
                    $select_state.append('<option value="' + value.id + '">' + value.name + '</option>')
                });

            });
        }
    });


});