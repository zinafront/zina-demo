/**
 * Created by akedion on 9/7/17.
 */
$(function() {
    // Review if form was sended before to show the fields and errors
    if(window.was_form_sent == 'True'){
        selected_search_criteria = $('#id_order_backlog_criteria').val();
        setup_criteria_form_fields(selected_search_criteria, false);
    }
    // Setup form fields by order backlog criteria
    $('#id_order_backlog_criteria').on('change', function(){
        var selected_search_criteria = this.value;
        setup_criteria_form_fields(selected_search_criteria, true);
    });
});

function setup_criteria_form_fields(selector_value, erease_fields) {
        $('.initial_date').css('visibility', 'hidden');
        $('.final_date').css('visibility', 'hidden');
        $('.orders').css('visibility', 'hidden');
        $('.initial_date').css('position', 'absolute');
        $('.final_date').css('position', 'absolute');
        $('.orders').css('position', 'absolute');
        if(erease_fields == true){
            $('#id_initial_date').val(' ');
            $('#id_final_date').val(' ');
            $('#id_orders').val(' ');
        }
        if(selector_value != '' && selector_value != undefined){
            if(selector_value == 0){
                $('.initial_date').css('position', 'relative');
                $('.final_date').css('position', 'relative');
                $('.initial_date').css('visibility', 'visible');
                $('.final_date').css('visibility', 'visible');
            }
            else if(selector_value == 1 || selector_value == 2){
                $('.orders').css('position', 'relative');
                $('.orders').css('visibility', 'visible');
                $('#id_initial_date').val(null);
                $('#id_final_date').val(null);
            }
        }
}