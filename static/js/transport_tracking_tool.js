/**
 * Transport Tracking Tools JS
 */
function sdr_form_actions(sdr_form){
    sdr_form.find('input[name^="site_code"]').change(function(){
        if($(this).val().length > 1){
            jQuery.ajax({
                type: 'GET',
                dataType: 'json',
                url: site_information_url,
                data: {
                    site_code: sdr_form.find('input[name^="site_code"]').val()
                },
                beforeSend: function(){
                    sdr_form.find(
                        'input[name^="site_address"], input[name^="site_city"], input[name^="site_uf"], input[name^="zip_code"]'
                        ).attr('disabled', 'disabled');
                },
                success: function(data){
                    if (data){
                        sdr_form.find('input[name^="site_address"]').val(data.address);
                        sdr_form.find('input[name^="site_city"]').val(data.city);
                        sdr_form.find('select[name^="site_uf"]').val(data.uf);
                        sdr_form.find('input[name^="site_city["]').trigger('change')
                        sdr_form.find('input[name^="zip_code"]').val(data.zip_code);
                    }
                },
                complete: function(){
                    sdr_form.find(
                        'input[name^="site_address"], input[name^="site_city"], input[name^="site_uf"], input[name^="zip_code"]'
                        ).removeAttr('disabled');
                }
            });
        }
    });
    sdr_form.find('input[name^="mos_plan["]').datepicker({
        format: 'yyyy/mm/dd'
    });
}

function str_form_actions(str_form){
    str_form.find('input[name="origin_site"]').change(function(){
        if($(this).val().length > 1){
            jQuery.ajax({
                type: 'GET',
                dataType: 'json',
                url: origin_site_information_url,
                data: {
                    site_code: str_form.find('input[name="origin_site"]').val()
                },
                beforeSend: function(){
                    str_form.find(
                        'input[name="origin_address"], input[name="origin_city"], input[name="origin_uf"], input[name="name"]'
                        ).attr('disabled', 'disabled');
                },
                success: function(data){
                    if (data){
                         str_form.find('input[name="supplier_name"]').val(data.name);
                        str_form.find('input[name="origin_address"]').val(data.address);
                        str_form.find('input[name="origin_city"]').val(data.city);
                        str_form.find('select[name="origin_uf"]').val(data.uf);
                        str_form.find('input[name="origin_city"]').trigger('change');
                        str_form.find('input[name="name"]').val(data.name);
                    }
                },
                complete: function(){
                    str_form.find(
                        'input[name="origin_address"], input[name="origin_city"], input[name="origin_uf"], input[name="origin_name"]'
                        ).removeAttr('disabled');
                }
            });
        }
    });
}

function check_intramunicipal(str_form){

    str_form.find('input[name="origin_site"]').on('change input', function(){
        
        if($(this).val().length > 1){
            jQuery.ajax({
                type: 'GET',
                dataType: 'json',
                url: check_intramunicipal_information_url,
                data: {
                    origin_city: str_form.find('input[name="origin_city"]').val(),
                    origin_state: str_form.find('select[name="origin_uf"]').val(),
                    destination: str_form.find('select[name="destination"]').val()
                },
                success: function(data){
                    if (data){
                        $("#id_intramunicipal").prop("checked", true);
                        $("#id_intramunicipal_iss").val("5.0000")
                        $("#id_intramunicipal_iss").prop("disabled", true)
                    }
                    else{
                        $("#id_intramunicipal_iss").val("0.0000")
                        $("#id_intramunicipal").prop("checked", false);
                    }

                    if ($("#id_intramunicipal").prop("checked")) {
                        $("#id_intramunicipal_iss").parent().parent().parent().show();
                    }
                    else {
                        $("#id_intramunicipal_iss").parent().parent().parent().hide();
                    }
                }
            });
        }
    });
    str_form.find('input[name="origin_city"]').on('change paste input', function(){
        if($(this).val().length > 1){
            jQuery.ajax({
                type: 'GET',
                dataType: 'json',
                url: check_intramunicipal_information_url,
                data: {
                    origin_city: str_form.find('input[name="origin_city"]').val(),
                    origin_state: str_form.find('select[name="origin_uf"]').val(),
                    destination: str_form.find('select[name="destination"]').val()
                },
                success: function(data){
                    if (data){
                        $("#id_intramunicipal").prop("checked", true);
                        $("#id_intramunicipal_iss").val("5.0000")
                        $("#id_intramunicipal_iss").prop("disabled", true)
                    }
                    else{
                        $("#id_intramunicipal_iss").val("0.0000")
                        $("#id_intramunicipal").prop("checked", false);
                    }

                    if ($("#id_intramunicipal").prop("checked")) {
                        $("#id_intramunicipal_iss").parent().parent().parent().show();
                    }
                    else {
                        $("#id_intramunicipal_iss").parent().parent().parent().hide();
                    }
                }
            });
        }
    });
    str_form.find('select[name="destination"]').change(function(){
        if($(this).val().length > 1){
            jQuery.ajax({
                type: 'GET',
                dataType: 'json',
                url: check_intramunicipal_information_url,
                data: {
                    origin_city: str_form.find('input[name="origin_city"]').val(),
                    origin_state: str_form.find('select[name="origin_uf"]').val(),
                    destination: str_form.find('select[name="destination"]').val()
                },
                success: function(data){
                    if (data){
                        $("#id_intramunicipal").prop("checked", true);
                        $("#id_intramunicipal_iss").val("5.0000")
                        $("#id_intramunicipal_iss").prop("disabled", true)
                    }
                    else{
                        $("#id_intramunicipal_iss").val("0.0000");
                        $("#id_intramunicipal").prop("checked", false);
                    }

                    if ($("#id_intramunicipal").prop("checked")) {
                        $("#id_intramunicipal_iss").parent().parent().parent().show();
                    }
                    else {
                        $("#id_intramunicipal_iss").parent().parent().parent().hide();
                    }
                }
            });
        }
    });
    str_form.find('select[name="origin_uf"]').change(function(){
        if($(this).val().length > 1){
            jQuery.ajax({
                type: 'GET',
                dataType: 'json',
                url: check_intramunicipal_information_url,
                data: {
                    origin_city: str_form.find('input[name="origin_city"]').val(),
                    origin_state: str_form.find('select[name="origin_uf"]').val(),
                    destination: str_form.find('select[name="destination"]').val()
                },
                success: function(data){
                    if (data){
                        $("#id_intramunicipal").prop("checked", true);
                        $("#id_intramunicipal_iss").val("5.0000")
                        $("#id_intramunicipal_iss").prop("disabled", true)
                    }
                    else{
                        $("#id_intramunicipal_iss").val("0.0000");
                        $("#id_intramunicipal").prop("checked", false);
                    }

                    if ($("#id_intramunicipal").prop("checked")) {
                        $("#id_intramunicipal_iss").parent().parent().parent().show();
                    }
                    else {
                        $("#id_intramunicipal_iss").parent().parent().parent().hide();
                    }
                }
            });
        }
    });
}


function rename_field(field, index){
    var name = $(field).attr("name");

    name = name + "[" + index + "]";
    $(field).attr("name", name);
}

function clone_sdr_form(){
    var strForm = $('#sdrFormPopup').clone();

    strForm.removeAttr('id');
    strForm.appendTo($('#sdrContainer'));

    sdr_form_actions(strForm);

    var index = $('.sdr_form_popup').length - 2;

    strForm.find('input, select, textarea').each(
        function(){
            rename_field(this, index);
        });

    strForm.show();

    //strForm.find('select[name^="special_service"]').chosen();
    strForm.find('.add_special_service').click(function(){
        add_special_to_table(this);

        return false;
    });
    strForm.find('.remove_special_service').click(function(){
        remove_from_special(this);

        return false;
    });

    return strForm;
}

function generate_sdr_form_from_data(data){
    var strForm = clone_sdr_form();

    $.each(data, function(key, value){
        if(key == "special_services"){
            //strForm.find('select[name^="special_service"]').chosen();
            add_specials_to_table(strForm, this);
        }
        else{
            var input = strForm.find('[name^="' + key + '["]');
            if(input.length > 0){
                input.val(value);
            }
        }
    });

    strForm.find(".remove_not_set_str_from_request").click(function(){
        remove_not_set_str_from_request(this);
        return false
    });

    strForm.find('input[name^="mos_plan["]').datepicker({
        format: 'yyyy/mm/dd'
    });

    return strForm;
}

function convert_object_to_str(data){
    return JSONstring.make(data);
}

function convert_str_to_object(data){
    return JSONstring.toObject(data);
}

function remove_from_special(link){
    var special_id = $(link).parents('tr:first').attr('rel');
    var input = $(link).parents('table:first').find('input[name^="special_services"]');
    var special_services = convert_str_to_object(input.val());

    if(delete special_services[special_id]){
        $(input).val(convert_object_to_str(special_services));
        $(link).parents("tr:first").remove();
    }
}

function add_specials_to_table(strForm, data){
    var table = strForm.find('.special_services_table');
    var output = table.find("input[name^='special_services']");
    var output_val = {};

    $(data).each(function(){
        var current_special = this;
        var quantity = this.quantity;
        var quantity_val = parseInt(quantity);
        var row = $('<tr rel='+ this.id +'></tr>');
        var quantity_col = $('<td style="text-align: center" class="quantity"></td>').html(quantity_val);
        var text_col = $("<td></td>").html(this.name).attr("colspan", "2");
        var removal_col = $('<td style="text-align: center"></td>');
        var removal_link = $('<a href="#" class="remove">REMOVE</a>');

        removal_link.click(function(){
            remove_from_special(this);
            return false;
        });

        removal_link.appendTo(removal_col);
        $(text_col).appendTo(row);
        $(quantity_col).appendTo(row);
        $(removal_col).appendTo(row);
        $(row).appendTo(table);
        output_val[this.id] = this.quantity
    });

    $(output).val(convert_object_to_str(output_val));
}

function add_special_to_table(link){
    var table = $(link).parents('table:first');
    var output = table.find("input[name^='special_services']");
    var current_special = convert_str_to_object(output.val());
    var input = table.find(':selected');
    var quantity = table.find('input[name^="quantity"]').val();
    var special_services = current_special;

    if (current_special.hasOwnProperty(input.val())){
        var quantity_val = parseInt(quantity) + current_special[input.val()];
        var row = table.find('tr[rel="'+ input.val() +'"]');

        row.find('.quantity').html(quantity_val)
    }
    else{
        var quantity_val = parseInt(quantity);
        var row = $('<tr rel='+ input.val() +'></tr>');
        var quantity_col = $('<td style="text-align: center" class="quantity"></td>').html(quantity_val);
        var text_col = $("<td></td>").html(input.text()).attr("colspan", "2");
        var removal_col = $('<td style="text-align: center"></td>');
        var removal_link = $('<a href="#" class="remove">REMOVE</a>');

        removal_link.click(function(){
            remove_from_special(this);

            return false;
        });

        removal_link.appendTo(removal_col);

        $(text_col).appendTo(row);
        $(quantity_col).appendTo(row);
        $(removal_col).appendTo(row);
        $(row).appendTo(table);
    }

    special_services[input.val()] = quantity_val;
    $(output).val(convert_object_to_str(special_services));
}


function remove_sdr_from_str(link){
    jQuery.ajax({
        type: 'GET',
        url: $(link).attr('href'),

        success: function(data){
            if(data == '1'){
                $(link).parents('.sdr_data_output:first').remove();
            }
            else{
                alert(data);
            }
        },

        error: function(){
            alert('An error has accoured. Please, try again.')
        }
    });

    return false;
}

function remove_not_set_str_from_request(link){
    $(link).parents('.sdr_form_popup:first').remove();

    return false;
}

function use_sdr_button_actions(link, sdr_id){
    $(link).click(function(){
        if ($(".form-sdr-" + sdr_id).length) {
            alert("This form is already in edition mode");
            return false;
        }

        jQuery.ajax({
            type: 'GET',
            dataType: 'json',
            url: sdr_information_url,
            data: {
                'sdr': sdr_id
            },
            success: function(data){
                var sform = generate_sdr_form_from_data(data);

                sform.addClass("form-sdr-" + sdr_id);

                if($(link).parents('.sdr_form_popup').length > 0){
                    var html = '';

                    // Get current view (SC or STR)
                    if ($("#sc-edit-view-form").length > 0) {
                        html += '<a class="pull-right remove_sc_form btn btn-danger btn-xs" href="#">';
                        html += '<span class="glyphicon glyphicon-remove"></span>';
                        html += ' Remove';
                        html += '</a>';
                        $(link).parent().parent().append(html);
                    }

                    $(link).parent().parent().append($(sform));
                	//$(sform).appendTo($(link).parents('.sdr_form_popup:first').find('.container:first'));
                }
                else{
                    $(link).parents('tr:first').remove();
                }
                check_intramunicipal_str($("#strForm"), $('.sdr_form_popup').length - 2);
            },
            error: function(){
                alert('An error has ocurred. Please, try again.')
            }
        });
        return false;
    });
}

function submit_sdr_search(form){
    jQuery.ajax({
        type: 'GET',
        dataType: 'json',
        url: $(form).attr('action'),
        data: $(form).serialize(),

        beforeSend: function(){
            $('#sdrSearchResults').find('tr:not(#firstSDRListRow)').remove();
            $('#sdrSearchResults').append("<tr id='loadingRow'><td colspan=5>Loading...</td></tr>");
        },

        success: function(data){
            $(data).each(function(){
                var resultRow = $('#firstSDRListRow').clone();

                resultRow.removeAttr('id');
                resultRow.removeAttr('style');
                resultRow.appendTo('#sdrSearchResults');
                resultRow.find('td[rel="date"]').html(this.date);
                resultRow.find('td[rel="request_code"]').html(this.request_code);
                resultRow.find('td[rel="site_code"]').html(this.site_code);
                resultRow.find('td[rel="invoices"]').html(this.invoices);
                resultRow.find('td[rel="address"]').html(this.address);

                use_sdr_button_actions(resultRow.find('.use'), this.sdr);
            });
        },

        complete: function(){
            $('#loadingRow').remove();
        }
    });

    return false;
}

function edit_location_link(link){
	var form_field = $(link).parents("td:first").find("input");

	$(link).parents("td:first").find("span").addClass("hide");
	$(link).parents("td:first").find(".save_storage_data_link").removeClass("hide");
	$(link).addClass("hide");

	form_field.removeClass("hide");

	return false;
}


function save_location_link(link){
	var form_field = $(link).parents("td:first").find("input");
	var url = $(link).attr('href');
	var field_name = $(form_field).attr('name');
	var data = {};

	data[field_name] = $(form_field).val();

    jQuery.ajax({
        type: 'POST',
        url: url,
        data: data,
        beforeSend: function(){
        	$(link).parents("td:first").find(".error").remove();
            $(form_field).attr('disabled', 'disabled');
        },

        success: function(data) {
            if (data == "1") {
            	$(link).parents("td:first").find("span").removeClass("hide");
            	$(link).parents("td:first").find("span").html($(form_field).val())
            	$(link).parents("td:first").find(".edit_storage_data_link").removeClass("hide");
            	$(link).addClass("hide");
            	$(form_field).addClass("hide");
            }
            else {
            	error_message = $("<span></span>");
            	error_message.addClass("error");
            	error_message.html(data);
            	$(link).parents("td:first").append(error_message);
            }
        },

        complete: function(){
        	$(form_field).removeAttr('disabled');
        }
    });
	return false;
}

/**
 * Load special services
 */
function load_special_services(select, state) {
    select.empty();

    jQuery.ajax({
        type: 'GET',
        dataType: 'json',
        url: special_service_json_url,
        data: {
            uf_site: state
        },
        beforeSend: function(){
        },
        success: function(data){
            var object;
            var i;
            var id;
            var name;
            var option;

            if (data.result){
                for (i=0; i < data.objects.length; i++) {
                    object = data.objects[i];
                    id = object[0];
                    name =object[1];
                    option = "<option value='" + id + "'>" + name + "</option>";
                    select.append(option);
                }
            }
            else {
                alert(data.msg);
            }
        },
        complete: function(){
        }
    });
}


/**
 * Docment ready
 */
jQuery(document).ready(function(){

    if($('#sdrFormPopup').length > 0){
        

        $('#sdrFormPopup').find('input, select, textarea').removeAttr('id');

        $('.sdr_form_popup:not(#sdrFormPopup) .form_list').each(function(index) {

            $(this).find('input, select, textarea').each(
                function(){
                    rename_field(this, index);
                }
            );

            var special_services = $(this).parents('.sdr_form_popup:first').find('.special_services_json:first').html();
            add_specials_to_table($(this), convert_str_to_object(special_services));

            //$(this).find('select[name^="special_service"]').chosen();
            $(this).find('.add_special_service').click(function(){
                add_special_to_table(this);
                return false;
            });
        });

        /**
         * Add destination without PTR button
         */
        $('#addSite').click(function() {
            var sdrForm = clone_sdr_form();

            sdrForm.find(".remove_not_set_str_from_request").click(function(){
                remove_not_set_str_from_request(this);
                return false
            });

            sdr_form_actions(sdrForm);
            if (window.str) {
                check_intramunicipal_str($("#strForm"), $('.sdr_form_popup').length - 2);
            }
            return false;
        });
    }

    $("#searchSDRForm").submit(function(){
        submit_sdr_search(this);
        return false;
    });

    $(".remove_sdr_from_str").click(function(){
        remove_sdr_from_str(this);
        return false;
    });

    $(".edit_sdr").each(function(){
        use_sdr_button_actions(this, $(this).attr('rel'));
    });

    $(".sdr_form_popup").each(function(){
        sdr_form_actions($(this));
        if (window.str) {
            check_intramunicipal_str($("#strForm"), $('.sdr_form_popup').length - 2);
        }
    });

    str_form_actions($("#strForm"));

    $(".use_cmv_as_cte").click(function() {
        if ($(this).is(":checked")) {
            $(this).parents('td:first').find("input:first").attr("readonly", "readonly").val(
                $(this).parents("form:first").find("input[name='carrier_move']").val().match(/\d/g).join(""));
        }
        else{
            $(this).parents('td:first').find("input:first").removeAttr("readonly");
        }
    });

    $('input[type="checkbox"]').removeClass('form-control'); // Remove bootstrap from checkbox field

    $('.edit_storage_data_link').click(function(){
        return edit_location_link(this);
    });

    $('.save_storage_data_link').click(function(){
        return save_location_link(this);
    });

    $('body').on("click", ".remove_sc_form", function(evt){
        evt.preventDefault();
        $(this).blur();

        $(this).next().remove();
        $(this).remove();

    });

    $('body').on("change keyup", ".site-uf", function(evt){
        var state = $(this).val();
        var select = $(this).parent().parent().parent().find(
            ".special_service .special_services_table select.special-service"
        );

        $(this).blur();
        alert("Remember, if you change the state, probably you will have to change Special Services.");
        load_special_services(select, state);
    });
});
