//Based on https://djangosnippets.org/snippets/1389/ to make dynamic formsets
$(document).ready(function () {
    var material_id = null;
    var selected_smr_item = null;
    $('.add-smr-item').click(function (evt) {
        var button = evt.target;
        material_id = $(button).data('material_id');
        selected_smr_item = $(button).closest('tr');
        $('.add-row').click();
    });

    // Fill wbs
    $('select[id$="-model_site"]').on('change', function (ev) {
        var model_site_name = $("#" + ev.target.id + " option:selected").text();
        var wbs = $.getJSON(window.wbs_url,
            {
                model_site_name: model_site_name
            },
            function (data) {
                var options = $("#" + ev.target.id.replace('model_site', 'work_breakdown_structure'));
                // id_form-0-work_breakdown_structure
                $(options).prop("disabled", false);
                $(options)
                    .find('option')
                    .remove()
                    .end()

                $.each(data, function (item) {
                    var option = data[item]
                    options.append($("<option />").val(option.id).text(option.name));
                });
            });
    });


    // Set formset animation.
    $('.smr_item_form').formset({
        addText: '',
        deleteText: '',
        added: function (row) {
            $(row).find('input[name$=-material_item]').val(material_id);
            $(row).find('tr').attr('material_id', 2);

            // Render values for fields
            $(row).find('.customer-purchase-order').html($(selected_smr_item).find('.customer-purchase-order').html()).attr('href', '#');
            $(row).find('.cpo-item').html($(selected_smr_item).find('.cpo-item').html());
            $(row).find('.cpo-item-quantity').html($(selected_smr_item).find('.cpo-item-quantity').html());
            $(row).find('.smr-item-quantity').html($(selected_smr_item).find('.smr-item-quantity').html());
            $(row).find('.cpo-item-status').html($(selected_smr_item).find('.cpo-item-status').html());
            $(row).find('.price-list-item-id').html($(selected_smr_item).find('.price-list-item-id').html());
            $(row).find('.price-list-item-description').html($(selected_smr_item).find('.price-list-item-description').html());
            $(row).find('.model-site').find('select').find('option').remove().end().append($(selected_smr_item).find('.model-site').find('select').find('option').clone()).val('');
            $(row).find('.pci_cell').find('select').find('option').remove().end().append($(selected_smr_item).find('.pci_cell').find('select').find('option').clone()).val('');
            $(row).find('.add-smr-item').remove();

            var _row = $(row);
            $(row).remove();
            $("tr[material_id='"+ material_id + "']").last().after(_row);

            /*// Add inline validations
            $(row).find('input[type=text]').each(function (idx, element) {
                $(element).rules('add', {
                    required: true
                });
            });

            $('.academic_period_form').find('.delete-row').empty().addClass('button color').append('<span class="icon restart_block"></span>');

            // Set timepicker
            $(row).find('.class_ini_date, .class_end_date').each(function (idx, element) {
                $(element).datepicker({
                    changeYear: true,
                    changeMonth: true,
                    yearRange: '-1:+6',
                    dateFormat: 'yy-mm-dd',
                    monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ]
                });
                $(element).rules('add', {
                    dateISO: true
                });
            });*/

        }
    });

    /*
    $('.add-row').click(function(event) {
        event.preventDefault();
        var prefix = $(this).data('prefix');
        addForm(this, prefix);
    });
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
    };
    function updateElementIndex(el, prefix, ndx) {
        var id_regex = new RegExp('(' + prefix + '-\\d+)');
        var replacement = prefix + '-' + ndx;
        if ($(el).attr("for")) $(el).attr("for", $(el).attr("for").replace(id_regex, replacement));
        if (el.id) el.id = el.id.replace(id_regex, replacement);
        if (el.name) el.name = el.name.replace(id_regex, replacement);
    };
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
    };
    */
});
