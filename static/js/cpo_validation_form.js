//Based on https://djangosnippets.org/snippets/1389/ to make dynamic formsets
$(function() {
    var dynamic_data = $('#cpo_validation_form').data('dynamic_fields_data');
    // If come with value relaunch selectors with the value
    $('body').find('select.dynamic_autocomplete_selector').each(function () {
        value_in_select = $(this).find(":selected").val();
        if(value_in_select){
            var field_name = $(this).attr('name');
            var row_index = field_name.match(/\w+\-(\d+)\-/)[1];
            var is_cpo_item = field_name.search('cpo_model');
            var field_value = $(this).val();
            var update = true;
            return setUpAutoComplete(row_index, is_cpo_item, field_value, dynamic_data, update);
        }
    });
    $('.add-row').click(function(event) {
        event.preventDefault();
        var prefix = $(this).data('prefix');
        addForm(this, prefix);
    });
    $('.dynamic_autocomplete_selector').on('change', function() {
      var field_name = $(this).attr('name');
      var row_index = field_name.match(/\w+\-(\d+)\-/)[1];
      var is_cpo_item = field_name.search('cpo_model');
      var field_value = $(this).val();
      var update = false;
      setUpAutoComplete(row_index, is_cpo_item, field_value, dynamic_data, update);
    });
});
function setUpAutoComplete(index, is_cpo_item, field_value, form_data, update){
    var autocomplete_info = form_data[field_value];
    var autocomplete_field = 'id_form-'+index+'-';
    var autocomplete_field_name = 'form-'+index+'-';
    var autocomplete_value = null;
    if(parseInt(is_cpo_item) == -1){
        autocomplete_field += 'price_list_field';
        autocomplete_field_name += 'price_list_field';
    }
    else{
        autocomplete_field += 'cpo_field';
        autocomplete_field_name += 'cpo_field';
    }
    if(field_value){
        var parent = $('#'+autocomplete_field).parent();
        autocomplete_value = $('#'+autocomplete_field).val();
        $(parent).empty();
        var select = $('<select/>', {
             'class':"form-control input-sm",
             'id': autocomplete_field,
             'name': autocomplete_field_name
        });
        $(select).append($('<option>', {
            value: null,
            text : '---------'
        }));
        $.each(autocomplete_info, function (i, item) {
            $(select).append($('<option>', {
                value: item.id,
                text : item.label
            }));
        });
        if(update == true){
            $(select).val(autocomplete_value);
        }
        select.appendTo(parent);
    }
}
function addForm(btn, prefix) {
    var formCount = parseInt($('#id_' + prefix + '-TOTAL_FORMS').val());
    var row = $('.dynamic-form:first').clone(true);
    var cpo_item_id = 'id_' + prefix + '-' + formCount + '-cpo_field';
    var cpo_item_name = prefix + '-' + formCount + '-cpo_field';
    var price_list_item_id = 'id_' + prefix + '-' + formCount + '-price_list_field';
    var price_list_item_name = prefix + '-' + formCount + '-price_list_field';
    $(row).removeAttr('id').insertAfter($('.dynamic-form:last'));
    $(row).children().not(':last').children().each(function() {
        updateElementIndex(this, prefix, formCount);
        $(this).val('');
    });
    $(row).find('.delete-row').click(function() {
        deleteForm(this, prefix);
    });
    $('body').find('select#'+cpo_item_id).each(function () {
        $(this)
            .parent()
            .empty()
            .append('<input id="'+cpo_item_id+'" type="hidden" name="'+cpo_item_name+'" class="form-control input-sm">');
    });
    $('body').find('select#'+price_list_item_id).each(function () {
        $(this)
            .parent()
            .empty()
            .append('<input id="'+price_list_item_id+'" type="hidden" name="'+price_list_item_name+'" class="form-control input-sm">');
    });
    $('#id_' + prefix + '-TOTAL_FORMS').val(formCount + 1);
}
function updateElementIndex(el, prefix, ndx) {
    var id_regex = new RegExp('(' + prefix + '-\\d+)');
    var replacement = prefix + '-' + ndx;
    if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex, replacement));
    if (el.id) el.id = el.id.replace(id_regex, replacement);
    if (el.name) el.name = el.name.replace(id_regex, replacement);
}
function deleteForm(btn, prefix) {
    $(btn).parents('.dynamic-form').remove();
    var forms = $('.dynamic-form');
    $('#id_' + prefix + '-TOTAL_FORMS').val(forms.length);
    for (var i=0, formCount=forms.length; i<formCount; i++) {
        $(forms.get(i)).children().not(':last').children().each(function() {
            updateElementIndex(this, prefix, i);
        });
    }
    return false;
}
