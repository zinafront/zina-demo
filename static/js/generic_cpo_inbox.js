/**
 * Created by akedion on 6/5/17.
 */
$(function() {
    // Don't show children div until is validated
    $('#opportunity_modal_bl_children').hide();
    //get the url
    var url = window.location.href;
    if(url.indexOf('?')!=-1){
        filter = url.substr(0, url.indexOf('?'));
    }
    else {
        filter = url;
    }
    //make the filter url
    function has_interrogative_sign(url){
        if(url.indexOf('?')==-1){
           return true
        }else{
            return false
        }
    }
    $('#filter_button').click(function(){
        if ($('#search_cpo_number').val()) {
            var part = has_interrogative_sign(filter) ? "?cpo_number=" : "&cpo_number="
            filter += part + $('#search_cpo_number').val()
        }
        if($('#select_customer_team').val()) {
            var part = has_interrogative_sign(filter) ? "?customer_team=" : "&customer_team="
            filter += part + $('#select_customer_team').val()
        }
        if($('#min').val()) {
            var part = has_interrogative_sign(filter) ? "?min_date=" : "&min_date="
            filter += part + $('#min').val()
        }
        if($('#max').val()) {
            var part = has_interrogative_sign(filter) ? "?max_date=" : "&max_date="
            filter += part + $('#max').val()
        }
        window.location.href=filter
    });
    // Reset filter function
    $('#reset_filter').click(function(){
        $('.filter').val('');
        window.location.href = filter
    });
    // DatePicker functions
    var min_date;
    var max_date;

    $('#min,#max').datepicker().on('changeDate', function(e) {
        min_date = parseInt( $('#min').datepicker().val().replace(/-/g ,''))
        max_date = parseInt( $('#max').datepicker().val().replace(/-/g ,''))

        if(($('#min').val().length > 0) && ($('#max').val().length  > 0)){
            if(min_date >= max_date){
                $('#max').datepicker().val('')
            }
        }
    });
    // Select all checkbox
    $('#select_all_cpos_take').change(function() {
        var checkboxes = $(this).closest('table').find("input[name*='cpos_for_taken']");
        if($(this).is(':checked')) {
            checkboxes.prop('checked', true);
        } else {
            checkboxes.prop('checked', false);
        }
    });
    $('#select_all_cpos_for_unlink').change(function() {
        var checkboxes = $(this).closest('table').find("input[name*='cpos_for_unlink']");
        if($(this).is(':checked')) {
            checkboxes.prop('checked', true);
        } else {
            checkboxes.prop('checked', false);
        }
    });
    $('#select_all_bl').change(function() {
        var checkboxes = $(this).closest('form').find("input[name$='-selected']");
        if($(this).is(':checked')) {
            checkboxes.prop('checked', true);
            $('tr[name^="form-"]').removeClass("hidden");
        } else {
            checkboxes.prop('checked', false);
            $('tr[name^="form-"]').addClass("hidden");
        }
    });

    // Raise Modal to set up links
    $('#assign_cpo_to_owner').click(function(evt){
        evt.preventDefault();
        var number_cpos_taken = $("input[name*='cpos_for_taken']:checked").length;
        var last_date = "The Customer Purchase Orders selected wasn't updated before";
        if (number_cpos_taken == 0) {
            $('#id_error_cpos_taken').text('Please select at least one CPO to be taken');
            $('#id_error_cpos_taken').show();
            return;
        }
        else{
            var form = $('<form action="'+ window.cpo_items_search_url +'" method="GET"/>')
            $('#not_taken_cpo_table input:checked').each(function() {
                form.append($('<input type="hidden" name="selected_cpos[]" value="' + $(this).attr('value') + '">'))
            });
            form.appendTo($(document.body)).submit();
        }
    });

    $('#opportunity_modal').on('click', 'input[name$="-selected"]', function(evt){
        name = $(this).attr("name");
        notes = name.replace("-selected", "");
        flag = $(this).is(':checked');
        if(flag==true){
            $('[name="'+notes+'"]').removeClass("hidden");
        }else {
            $('[name="'+notes+'"]').addClass("hidden");
        }

    });

    if ($('#cpo_table').data('show_opportunity_link_form') == 'True') {
        $('#opportunity_modal').modal();
    }

    if ($('#cpo_item_table').data('show_opportunity_link_form') == 'True') {
        $('#opportunity_modal').modal();
    }

    // Clean modal
    $('#opportunity_modal').on('hidden.bs.modal', function () {
        $('#opportunity_table tbody').html('');
        $('#id_customer_purchase_order_item').find('option').remove().end();
        $('#id_business_line').find('option').remove().end();
        $('#id_business_group').find('option').remove().end();
        $('#id_business_unit').find('option').remove().end();
        $('#id_po_plan_receipt').find('option').remove().end();
        $('#id_oif_value').find('option').remove().end();
        $('#id_value').find('option').remove().end();
        $('#opportunity_cpo_value').text('');
        $('#opportunity_modal_success').text('').removeClass('alert');
        $('#opportunity_modal_error').text('').removeClass('alert');
        $("#id_opportunity_number").val( '' );
        $("#id_opportunity_number_on_deck").children().remove();
    });
    // Clean Unlink Modal
    $('#unlink_bl_modal').on('hidden.bs.modal', function () {
        $('#unlink_opportunity_modal_error').html('');
        $('#unlink_opportunity_modal_success').html('');
    });
    $('#unlink_cpo_item_to_opportunity_inbox').on('click', function(evt){
        evt.preventDefault();
        $('#unlink_opportunity_modal_error').html('');
        $('#unlink_opportunity_modal_success').html('');
        cpo_selected = $("input[name*='cpos_for_unlink']:checked").length;
        errors = '';
        if(cpo_selected == 0){
            errors += '<li>Please select at least one CPO to Unlink</li>';
        }
        if(errors != ''){
            $('#unlink_opportunity_modal_error').html('<ul>'+errors+'</ul>');
        }
        else{
            cpo_to_unlink = [];
            $('#taken_cpo_table input:checked').each(function() {
                cpo_to_unlink.push($(this).attr('value'));
            });
            $.post(window.unlink_url, {cpo_to_unlink:cpo_to_unlink}, function (data) {
                if(data.status == 200){
                    $('#unlink_opportunity_modal_success').html(data.message);
                    setTimeout(function(){ location.reload(); }, 800);
                }
                else{
                    $('#unlink_opportunity_modal_error').html(data.message);
                }
            });
        }
    });
    $('#id_acknowledge_bl_value').closest('label').hide();

     $('#create_bl_modal').on("hidden.bs.modal", function () {
         $('#new_bl_errors').html('');
         $('#new_bl_success').html('');
         $('#new_bl_errors').hide();
         $('#new_bl_success').hide();

     });

    $('#add_new_bl').click(function(ev){
        ev.preventDefault();
        $('#new_bl_errors').html('');
         $('#new_bl_success').html('');
         $('#new_bl_errors').hide();
         $('#new_bl_success').hide();
        var bl_id = $('#new_select_business_line').find(":selected").val();
        var po_plan = $('#new_po_plan_receipt').val();
        var oif_value = $('#new_oif_value').val();
        var notes = $('#new_notes').val();
        var opportunity_id = $('#id_opportunity_number').val();
        var add_bl_url = $('#add_bl_url').val();

        json_info = {
           'bl_id': bl_id,
           'po_plan': po_plan,
           'oif_value': oif_value,
           'notes': notes,
           'opportunity_id': opportunity_id
        };

        $.post(add_bl_url, {bl_info: json_info}, function(data){
            if(data['status'] == 200){
                $('#new_bl_success').html(data['message']);
                $('#new_bl_success').show();
                setTimeout(function(){
                    $('#create_bl_modal').modal('toggle');
                    $('#opportunity_table tbody').html('');
                    $('#opportunity_table tbody').html(data['html']);
                }, 3000);


            }
            if(data['status'] == 500){
                $('#new_bl_errors').html(data['message']);
                $('#new_bl_errors').show();
            }
        });

    });

});

$(document).ready(function(){
    //show notes if check are selected
    $("input[name$='-selected']").each(function() {
        name = $(this).attr("name");
        notes = name.replace("-selected", "");
        if($(this).is(':checked')){
             $('[name="'+notes+'"]').removeClass("hidden");
        }else{
             $('[name="'+notes+'"]').addClass("hidden");
        }
    });
});