/**
 * Created by minrock on 12/2/16.
 */

console.log('Loading new SMR controller...');
window.contact_url = '';
window.validate_version_items = '';
window.smr_items_length = 0;
window.is_edit_smr = false;
var error_rows = [];
var error_code_linker_rows = [];
var valid_rows = 0;
var hot = {};
var codes_map = {};

function update_mobile_number(id_html, $input) {
    var selected_value = $input.val();
    var $mobile_html = $(id_html);
    if (selected_value != "") {
        $.get(window.contact_url.replace(0, selected_value), function (data) {
            $mobile_html.html(data.number)
        })
    } else {
        $mobile_html.html('--------------')
    }
}

function update_mobile_numbers() {
    update_mobile_number('#id_field_manager_mobile', $('#id_field_manager'));
    update_mobile_number('#id_logistic_contact_mobile', $('#id_logistic_contact'));
    update_mobile_number('#id_contact_partner_mobile', $('#id_contact_partner'));
    update_mobile_number('#id_contact_supervisor_mobile', $('#id_contact_supervisor'));
}

$(function () {

    update_mobile_numbers();
    
    $('#id_field_manager').on('change', function (evt) {
        update_mobile_number('#id_field_manager_mobile', $(this));
    });

    $('#id_logistic_contact').on('change', function (evt) {
        update_mobile_number('#id_logistic_contact_mobile', $(this));
    });

    $('#id_contact_partner').on('change', function (evt) {
        update_mobile_number('#id_contact_partner_mobile', $(this));
    });

    $('#id_contact_supervisor').on('change', function (evt) {
        update_mobile_number('#id_contact_supervisor_mobile', $(this));
    });

    dropdownBlankValidator = function(value, callback) {
        callback(true)
    };

    hot = new Handsontable(document.getElementById('hot'), {
        columns: [
            {
                type: 'text'
            },
            {
                type : 'text'
                //readOnly: true
            },
            {
                type : 'numeric'
            },
            {
                type : 'text'
            },
            {
                type : 'numeric',
                format : '0,00'
            },
            {
                type : 'dropdown',
                source: [],
                validator: dropdownBlankValidator
            }
        ],
        allowRemoveRow: false,
        allowRemoveColumn : false,
        rowHeaders: true,
        stretchH: 'all',
        contextMenu: true,
        copyPaste: true,
        allowInsertColumn: false,
        allowInsertRows: true,
        colHeaders : ['Nokia code', 'Description', 'Client code', 'Description', 'Qty', 'Stage'],
        afterChange: function(changes, source){
            codes = [];
            hot = this;
            if(source == 'edit' || source=='paste') {
                $.each(changes, function (index, array) {
                    column = array[1];
                    if (column == 0) {
                        data = array[3];
                        if(data != ''){
                            codes.push(data);
                        }else{
                            hot.setDataAtCell(array[0], 1, '')
                        }
                        codes_map[data] = array[0];
                    }
                });

                $.post(window.validate_version_items, {
                    'items': codes
                }, function(data){
                    valid_codes = [];
                    $.each(data, function(value, index){
                        row = codes_map[value];
                        valid_codes.push(value);
                        hot.setDataAtCell(row, 1, index.description);
                        hot.setDataAtCell(row, 2, index.client_code);
                        hot.setDataAtCell(row, 3, index.client_description);
                        hot.setCellMeta(row, 5, 'source', ['Pre staging', 'Delivery']);
                        if(_.lastIndexOf(error_rows, row) != -1){
                            error_rows.splice(_.lastIndexOf(error_rows, row), 1);
                            $(hot.getCell(row, 0)).removeClass('htInvalid')
                        }
                        valid_rows += 1;
                    });
                    invalid_codes = _.difference(codes, valid_codes);

                    if(invalid_codes.length > 0){
                        $.each(invalid_codes, function(value, index){
                            row = codes_map[index];
                            hot.setDataAtCell(row, 1, 'Version item was not found on ZINA database.');
                            error_rows.push(row)
                        });
                        valid_rows -= 1 ;
                    }
                    format_invalid_version_cells(hot);
                    //format_invalid_codes_linker_cells(hot);
                });
            }
        }
    });

    $('#save_smr').on('click', function(evt){
        evt.preventDefault();
        if(window.is_edit_smr && window.smr_items_length > 0){
            save_smr();
        }
        else {
            if (valid_rows > 0) {
                if (error_rows.length > 0) {
                    swal({
                        title: 'Warning!',
                        text: 'There are some items rows with errors. You can save but these lines will be ignored. Are you sure?',
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-warning",
                        cancelButtonClass: "btn-danger",
                        confirmButtonText: "Yes, save SMR!"
                    }, function (isConfirm) {

                    })
                } else {
                    save_smr();
                }
            } else {
                swal({
                    title: 'Warning!',
                    text: 'You should add at least one valid version items to the SMR to create it',
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: "Ok"
                })
            }
        }
        return false;
    });

    $('#id_delivery_type').on('change', function () {
        show_primary_smr($(this).val());
    });
    show_primary_smr($('#id_delivery_type').val());

    $('#item_validation_button').on('click', function(evt){
        evt.preventDefault();
        for(var index=0; index < hot.countRows(); index++){
            var first_cell_info = hot.getDataAtCell(index,0);
            if((first_cell_info != '') && (!$(hot.getCell(index, 0)).hasClass('htInvalid')) && (first_cell_info != null)){
                quantity = hot.getDataAtCell(index,4);
                stage = hot.getDataAtCell(index,5);
                // Validate quantity
                if(quantity == null || stage == null || !$.isNumeric(quantity)){
                    hot.setDataAtCell(index, 1, 'Quantity and Stage are required. Please try again');
                    hot.setDataAtCell(index, 2, null);
                    hot.setDataAtCell(index, 3, null);
                    hot.setDataAtCell(index, 4, null);
                    hot.setDataAtCell(index, 5, null);
                    error_rows.push(index);
                }
            }
        }
    });
});

function format_invalid_version_cells(hot){
    _.each(error_rows, function(element){
       $(hot.getCell(element, 0)).addClass('htInvalid');
    });
}

function format_invalid_codes_linker_cells(hot){
    _.each(error_code_linker_rows, function(element){
       $(hot.getCell(element, 2)).addClass('htInvalid');
       $(hot.getCell(element, 3)).addClass('htInvalid');
    });
}

function save_smr(){
    var work_package = $('#save_smr').attr("work_package");
    var delivery_request = $('#save_smr').attr("delivery_request");
    var myDate = new Date();
    var current_hour = myDate.getHours();
    var hour_alert = 15;
    smr_items_json = JSON.stringify(hot.getData());
    $('#smr_form').find("#id_smr_items").val(smr_items_json);
    if (current_hour > hour_alert){
        swal({title : 'Warning Time!',
        text : 'This SRM will be processed tomorrow because of the time you are sending it.',
        type: "warning",
        showCancelButton: false,
        confirmButtonClass: "btn-warning",
        confirmButtonText: "Ok"},
        function(isConfirm){
            $('#smr_form').submit();
        })
    }
    else{
        $('#smr_form').submit();
    }

}

function show_primary_smr(delivery_type){
    if(delivery_type=="SMR complementary"){
        $('#primary_smr_container').removeClass('hidden');
        $('#id_primary_smr').trigger( "focus" );
    }else{
        $('#primary_smr_container').addClass('hidden');
         $('#id_primary_smr').val("");
    }
}