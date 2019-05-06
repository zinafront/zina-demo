/**
 * Created by akedion on 5/10/17.
 */
var cpo_crm_linker = {};
$(function () {
    cpo_crm_linker = new Handsontable(document.getElementById('cpo_crm_linker'), {
        columns: [
            {
                type: 'text'
            },
            {
                type : 'text'
            },
            {
                type : 'text'
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
        minRows: 1,
        colHeaders : ['Customer Purchase Order Number', 'Opportunity Number', 'Quarter'],
        afterChange: function(changes, source) {
            cpo_crm_linker = this;
            if(source == 'edit' || source=='paste') {
                var map_cpo = {};
                var codes = [];
                var changed_data = [[]];
                $.each(changes, function (index, array) {
                    column = array[1];
                    if(column == 0) {
                        data = array[3];
                        if (data != '') {
                            codes.push(data);
                        } else {
                            cpo_crm_linker.setDataAtCell(array[0], 1, '')
                        }
                        map_cpo[array[0]] = data;
                    }
                });
                if(codes.length > 0) {
                    $.post(window.verify_cpo_url,{'cpos':codes}, function (data) {
                        if(data.status === 200) {
                            response_data = data.data;
                            $.each(map_cpo, function(value, index){
                                changed_data[value] = [];
                                changed_data[value][0] = index;
                                var cpo_information = $.grep(response_data, function(e){ return e.id == index; });
                                if(cpo_information == 0){
                                    changed_data[value][1] = "CPO Number not found on ZINA database.";
                                    window.errors.push(value);
                                }
                                else{
                                    window.errors.pop(value);
                                    cpo_information = cpo_information[0];
                                    if(cpo_information.linked){
                                        changed_data[value][1] = cpo_information.opportunity;
                                        changed_data[value][2] = cpo_information.po_plan_receipt
                                    }
                                }
                            });
                            for(i=0; i< cpo_crm_linker.countRows(); i++){
                                if(cpo_crm_linker.getDataAtCell(i, 0) != codes[0]) {
                                    changed_data[i] = [];
                                    changed_data[i][0] = cpo_crm_linker.getDataAtCell(i, 0);
                                    changed_data[i][1] = cpo_crm_linker.getDataAtCell(i, 1);
                                    changed_data[i][2] = cpo_crm_linker.getDataAtCell(i, 2);
                                }
                            }
                            cpo_crm_linker.loadData(changed_data);
                            setUpErrors();
                        }
                        else{
                            swal({
                                title: 'Warning!',
                                text: data.message,
                                type: "warning",
                                showCancelButton: false,
                                confirmButtonClass: "btn-warning",
                                confirmButtonText: "Ok"
                            });
                        }
                    });
                }
            }
        }
    });

    $('#save_cpo_link').on('click', function(evt){
        var errors = 0;
        links_to_be_saved = [];
        evt.preventDefault();
        for(i=0; i< cpo_crm_linker.countRows(); i++){
            create_link = {};
            if(cpo_crm_linker.getDataAtCell(i, 0) != null ){
                if(cpo_crm_linker.getDataAtCell(i, 1) == null && cpo_crm_linker.getDataAtCell(i, 2) == null){
                   cpo_crm_linker.setDataAtCell(i, 1, 'The Opportunity Number and Quarter cell must have data');
                   window.errors.push(i);
                }
                else{
                    window.errors.pop(i);
                    create_link['cpo_id'] = cpo_crm_linker.getDataAtCell(i, 0);
                    create_link['opportunity_number'] = cpo_crm_linker.getDataAtCell(i, 1);
                    create_link['quarter'] = cpo_crm_linker.getDataAtCell(i, 2);
                    links_to_be_saved.push(create_link)
                }
            }
        }
        setUpErrors();
        if(window.errors.length > 0){
            swal({
                title: 'Warning!',
                text: 'There are some items rows with errors. You can save but these lines will be ignored. Are you sure?',
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-warning",
                cancelButtonClass: "btn-danger",
                confirmButtonText: "Yes link CPO's"
            }, function (isConfirm) {
                if(isConfirm) {
                    saveData(links_to_be_saved);
                }
            });
        }
        else{
            saveData(links_to_be_saved);
        }
    });
});

function saveData(data){
    if(data.length > 0){
        $.post(window.save_data_url,{'data':JSON.stringify(data)}, function (data) {
            if(data.status == 200){
                swal({
                    title: 'Success!',
                    text: "The links was created successfully",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn-success",
                    confirmButtonText: "Ok"
                });
            }
        });
    }
    else{
        swal({
            title: 'Warning!',
            text: "There is no data to save",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-warning",
            confirmButtonText: "Ok"
        });
    }
}

function setUpErrors(){
    if(errors.length > 0){
        for(index in errors){
            $(cpo_crm_linker.getCell(errors[index], 1)).addClass('htInvalid');
        }
    }
}