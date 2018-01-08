function get_proposal($element){
    return $element.closest('.cs_wrapper');
}

function get_used_cost_packages($proposal) {
    var list_cost_packages_used = [];
    var proposal_id = $proposal.attr('data-id');
    var cost_packages = window.proposals_cost_packages[proposal_id]['cost_packages'];
    $.each($proposal.find('.cp-parent:not(.delete-cp-parent)').find('.cost-packages'), function () {
        if ($(this).val()) {
            var selected_cost_package_id = parseInt($(this).val());
            list_cost_packages_used.push(selected_cost_package_id);

            // get cost package group
            var cost_package_group;
            for (var i = 0; i < cost_packages.length; i++) {
                if (cost_packages[i]['id'] == selected_cost_package_id) {
                    cost_package_group = cost_packages[i]['group'];
                }
            }
            // search cost packages with same group
            for (var i = 0; i < cost_packages.length; i++) {
                if (cost_packages[i]['group'] == cost_package_group && cost_packages[i]['id'] != selected_cost_package_id) {
                    list_cost_packages_used.push(cost_packages[i]['id']);
                }
            }
        }
    });
    return list_cost_packages_used;
}

/**
 * Notify changes on form, display alert with the state complete/incomplete
 * 1. ZI partner
 * 2. Service - Work Item
 * 3. Service - WBS
 * 4. Service - VOA
 * 5. Cost package
 */
function make_step3_notifications() {
    var make_notifications = function(root, postfix) {
        var label = root.find(".form-notification-label" + postfix);
        var icon = label.find(".form-notification-icon" + postfix);
        var text = label.find(".form-notification-text" + postfix);
        var with_spo = root.find(".with_spo");
        var incomplete = false;
        var proposal;
        var used_cost_packages;

        if (!incomplete) {
            var service_fof = false;
            if (window.is_generic) {
                console.log(postfix);
                if (postfix == '-service') {
                    var service_type = root.find('.service-type').val();
                    console.log(service_type)
                    service_type = service_type.toLowerCase();
                    if (service_type.search('erp|scratch|free of charge') != -1){
                        service_fof = true;
                    }
                }
            }
            console.log(service_fof);
            root.find("select").each(function () {
                if ($(this).val() == "") {
                    if ($(this).hasClass("voa") && !with_spo.prop("checked")) {
                    }
                    else if ($(this).hasClass("work-item") && !with_spo.prop("checked") && (window.ct_slug == 'algar' || window.ct_slug == 'claro' || window.ct_slug == 'tim')){
                    }
                    else if (window.is_generic && service_fof && ($(this).hasClass("contract-number") || $(this).hasClass("contract-line"))){

                    }
                    else {
                        incomplete = true;
                        return false;
                    }
                }
            });
            
            root.find('input.form-control').each(function () {
                if ($(this).val() == "") {
                    incomplete = true;
                    return false;
                }
            });
        }

        // validate cost packages
        if (!incomplete) {
            proposal = get_proposal(root);
            used_cost_packages = get_used_cost_packages(proposal);

            if (used_cost_packages.length == 0)
                incomplete = true;
        }

        if (incomplete) {
            label.removeClass("label-success").addClass("label-danger");
            icon.removeClass("fa-check-circle").addClass("fa-times");
            text.html("Incomplete");
        }
        else {
            label.removeClass("label-danger").addClass("label-success");
            icon.removeClass("fa-times").addClass("fa-check-circle");
            text.html("All fields filled");
        }
    };

    $(".workpackage-tab-form-service").each(function () {
        make_notifications(
            $(this),
            "-service"
        );
    });

    $(".workpackage-tab-form").each(function () {
        var root = $(this);
        var postfix = "";
        var label = root.find(".form-notification-label" + postfix);
        var icon = label.find(".form-notification-icon" + postfix);
        var text = label.find(".form-notification-text" + postfix);
        var with_spo = root.find(".with_spo");
        var incomplete = root.find(".form-notification-label-service.label-danger").length > 0;

        if (incomplete) {
            label.removeClass("label-success").addClass("label-danger");
            icon.removeClass("fa-check-circle").addClass("fa-times");
            text.html("Incomplete");
        }
        else {
            label.removeClass("label-danger").addClass("label-success");
            icon.removeClass("fa-times").addClass("fa-check-circle");
            text.html("All fields filled");
        }
    });
}

$(function () {

    if(window.sent_ssr){
        $('#saved-ssr').modal('show');
    }

    function show_loading(proposal_material_id) {
        voa_select = $('#voa_for_proposal_material_' + proposal_material_id);
        span_with_img = $('#span_for_voa_for_proposal_material_' + proposal_material_id);

        voa_select.addClass('invisible');
        span_with_img.removeClass('invisible');
    }


    function active_add_cost_package($proposal) {
        var list_cost_packages_used = get_used_cost_packages($proposal);
        var proposal_id = $proposal.attr('data-id');
        if ($proposal.find('.cp-parent:not(.delete-cp-parent)').find('.cost-packages').length >= window.proposals_cost_packages[proposal_id]['max_cost_packages']) {
            $proposal.find('.add-cost-package-area').addClass('add-disabled');
        } else {
            $proposal.find('.add-cost-package-area').removeClass('add-disabled');
        }
    }

    function show_not_available_cost_packages_messages($proposal){
        var proposal_id = $proposal.attr('data-id');
        var max_cost_packages = window.proposals_cost_packages[proposal_id]['max_cost_packages'];
        var error_message  = window.proposals_cost_packages[proposal_id]['message_error'];
        if(!$proposal.hasClass('internal')){
            // only show message for external services
            $proposal.find('.not-cost-package-available').find('.cost-package-error-extra-message').html('');
            if(max_cost_packages <= 0) {
                if(error_message){
                    $proposal.find('.not-cost-package-available').find('.cost-package-error-extra-message').html(error_message);
                }
                $proposal.find('.not-cost-package-available').show();
                $proposal.find('table.cp_confi').hide();
                $proposal.find('.btn-cost-package-properties').hide();
            }
        }
    }

    function hide_selected_cost_package($proposal) {
        var proposal_id = $proposal.attr('data-id');

        // show all options for all cost packages
        $proposal.find('.cost-packages').find('option').show();
        // get used cost packages
        var list_cost_packages_used = get_used_cost_packages($proposal);

        // hide used cost package except selected cost package
        $.each($proposal.find('.cost-packages'), function () {

            var selected_cost_package_id = parseInt($(this).val());

            for (var i = 0; i < list_cost_packages_used.length; i++) {
                if (list_cost_packages_used[i] != selected_cost_package_id) {
                    $(this).find('option[value=' + list_cost_packages_used[i] + ']').hide();
                }
            }
        });
    }

    function get_cost_packages_ids($proposal) {
        var cost_packages_ids = [];
        $.each($proposal.find('.cp-parent:not(.delete-cp-parent)').find('.cost-packages'), function () {
            if ($(this).val()) {
                cost_packages_ids.push($(this).val());
            }
        });

        return cost_packages_ids;
    }

    function hide_work_item_selected(work_package) {
        // hide work item selecteds
        var $work_items = $('.collapse-work-package[data-work-package='+ work_package +']').find('.work-item');

        $work_items.find('option').show();
        $.each($work_items, function () {
            var id_selected = $(this).val();
            if (id_selected) {
                $work_items.not('#' + $(this).attr('id')).find('option[value=' + id_selected + ']').hide();
            }

        });
    }

    function change_prefix(text, level, position, new_prefix) {
        /*
         * replace prefix in selected position
         *
         * */
        var re;
        if (level <= 1) {
            return text.replace(/(\d+)/, new_prefix);
        } else {
            if (position == 2) {
                position = 3;
            } else if (position == 3) {
                position = 5;
            }
            var list_items = text.split('-');

            if (list_items.length > position) {
                list_items[position] = new_prefix;

                var new_list_items = '';
                for (var j = 0; j < list_items.length; j++) {
                    new_list_items += list_items[j];
                    if (list_items.length - 1 != j) {
                        new_list_items += '-'
                    }
                }
                return new_list_items;
            }
            throw 'Error with position to replace in string'
        }
    }

    function get_work_package($element){
        return $element.closest('.collapse-work-package');
    }

    function reorder_cost_packages($proposal) {
        var work_package_prefix = get_work_package($proposal).data('prefix');
        var proposal_prefix = $proposal.attr('data-prefix');

        var i = $proposal.find('#id_form-'+ work_package_prefix + '-' + proposal_prefix + '-'+window.nested_form_prefix +'-INITIAL_FORMS').val();
        i = parseInt(i);
        $.each($proposal.find('.cp-parent-new'), function (index, element) {
            var $cost_package = $(this);
            var aux_prefix_ssr = $cost_package.attr('data-ssr');

            // change for sales items
            $cost_package.parent().find('.cp-child[data-ssr=' + aux_prefix_ssr + ']').attr('data-ssr', i);

            $.each($cost_package.find('label'), function (index, element) {
                var $label = $(this).parent().find('label');
                var attr_for = String($label.attr('for'));
                attr_for = change_prefix(attr_for, 3, 3, i);
                $label.attr('for', attr_for);
            });
            $.each($cost_package.find('input'), function (index, element) {
                var $element = $(this);
                var attr_id = $element.attr('id');
                var attr_name = $element.attr('name');

                attr_id = change_prefix(attr_id, 3, 3, i);
                attr_name = change_prefix(attr_name, 3, 3, i);

                $element.attr('id', attr_id);
                $element.attr('name', attr_name);

            });
            $.each($(this).find('select'), function (index, element) {
                var $element = $(this);
                var attr_id = $element.attr('id');
                var attr_name = $element.attr('name');
                attr_id = change_prefix(attr_id, 3, 3, i);
                attr_name = change_prefix(attr_name, 3, 3, i);
                $element.attr('id', attr_id);
                $element.attr('name', attr_name);
            });

            // change prefix for cp parent
            $cost_package.attr('data-ssr', i);
            //});
            i += 1;
        });
    }

    $.each($('.cs_wrapper:not(.cs_wrapper_done)'), function () {
        var material_item_id = $(this).attr('data-id');
        var $proposal = $(this);
        var cost_packages_ids = get_cost_packages_ids($(this));

        var $with_spo = $proposal.find('.with_spo');
        var $voa = $proposal.find('.cs_info_config').find('.voa');
        if(!$with_spo.is(':checked')){
            $with_spo.attr('data-selected-voa', $voa.val());
            $voa.attr('disabled', 'disabled');

        }else{
            $voa.removeAttr('disabled');

        }

        hide_selected_cost_package($proposal);
        active_add_cost_package($proposal);
        show_not_available_cost_packages_messages($proposal);
    });

    //$('.submit-reject-form').on('click', function(){
    //    var id_ssr = $(this).attr('data-id');
    //    var comment = $('#id_rejected_comment_'+id_ssr).val();
    //    $('#id_rejected_comment').val(comment);
    //    $('#reject_form').attr('action', $(this).attr('data-href'));
    //    $('#reject_form').submit();
    //});


    // add html to chosen to search voa
    $('.voa').chosen();
    $('.chosen-container').find('.chosen-search').append('<span class="search-button"></span>');
    $('.zi-partner-select[readonly]').removeClass('zi-partner-select');
    $.each($('.zi-partner-select'), function(){
        hide_work_item_selected(get_work_package($(this)).data('work-package'));
        $(this).trigger('change');
    });

    $('.search-button').on('click', function(){

        var $proposal = get_proposal($(this));
        var voa_code = $proposal.find('.form-group-voa').find('.chosen-search').find('input').val().trim();
        var work_package = $(this).closest('.collapse-work-package').data('work-package')
        if(voa_code){
            var $modal_voa = $('#voa-information');
            $modal_voa.modal('show');
            $modal_voa.find('.modal-title').html('VOA # '+ voa_code);
            $modal_voa.find('.modal-body').html('');
            $modal_voa.find('.loading-icon').show();

            var data = {
                cost_packages_ids: get_cost_packages_ids($proposal),
                voa_code: voa_code,
                work_package: work_package,
            };
            $.getJSON(window.get_voa_items_url, data, function(response){
                $modal_voa.find('.modal-body').html(response.html);
                $modal_voa.find('.loading-icon').hide();
            });
        }
    });

    $('.btn-cost-package-properties').on('click', function(){
        var $proposal = get_proposal($(this));
        var service_name = $proposal.find('.cs_title').find('.panel-title').clone().children().remove().end().text();
        
        var $modal = $('#modal-cost-package-properties');
        $modal.modal('show');
        $modal.find('.modal-title').html('Cost packages for ' + service_name);
        //$modal.find('.modal-title').find('>div').remove();
        //$modal.find('.modal-title').find('>i').remove();
        $modal.find('.modal-body').html('');
        $modal.find('.loading-icon').show();

        var data = {
            material_id: $(this).attr('data-material-id')
        };
        $.getJSON(window.cost_package_info_url, data, function(response){
            $modal.find('.modal-body').html(response.html);
            $modal.find('.loading-icon').hide();
        });
    });

    $('.with_spo').on('change', function(){
        var $voa = $(this).closest('.cs_info_config').find('.voa');
        var with_spo = $(this).is(':checked');
        if(!with_spo){
            $(this).attr('data-selected-voa', $voa.val());
            $voa.val('');
            $voa.attr('disabled', 'disabled');

        }else{
            $voa.removeAttr('disabled');
            $voa.val($(this).attr('data-selected-voa'));

        }

        var $proposal = get_proposal($(this));
        if(window.ct_slug == 'oi' || window.ct_slug == 'tim'){
            var $work_item = $proposal.find('.work_item');
            var work_item_selected = $work_item.val();
            $work_item.find('option').remove();
            $work_item.append('<option value="">---------</option>');
            var workpackage = get_work_package($proposal).data('work-package')
            $.getJSON(window.url_get_work_items, {'work_package': workpackage, 'material_id': $proposal.data('id'), 'with_spo': with_spo}, function (data) {
                var work_item_list = data.work_item_list;

                work_item_list.forEach(function (item, index) {
                    $work_item.append('<option value="'+ item.id +'">'+ item.short_unicode +'</option>');
                    if(item.id == work_item_selected){
                        $work_item.val(work_item_selected);
                    }
                });

                hide_work_item_selected(workpackage);

            });
        }

        $voa.trigger("chosen:updated");
        make_step3_notifications();
    });

    $('body').on('click', '.sync_work_package', function () {
        var $this = $(this);
        $this.html('<i class="fa fa-refresh fa-spin"></i>');
        var work_package = $(this).closest('.collapse-work-package').data('work-package');
        $.get("/ipm/sync_workpackage/" + work_package + "/",
            function (data) {
                swal({
                    title: "ipm sync",
                    text: data.message,
                    type: data.status,
                    showCancelButton: false,
                    //confirmButtonClass: "btn-danger",
                    confirmButtonText: "Close",
                    closeOnConfirm: true
                });
                $this.html('<i class="fa fa-refresh"></i>');

            });
    });
    $('body').on('change', '.cost-packages', function () {
        var cost_package_id = $(this).val();
        var $proposal = $(this).closest('.cs_wrapper');
        var material_item_id = $proposal.attr('data-id');
        var $cost_package = $(this).closest('.cp-parent');
        var ssr_counter = $cost_package.attr('data-ssr');
        $proposal.find('.cp-child[data-ssr=' + ssr_counter + ']').remove();
        var cost_packages_ids = get_cost_packages_ids($proposal);
        Dajaxice.delivery_request.reload_voa_options_cost_packages(Dajax.process, {
            'customer_team_slug': window.ct_slug,
            'material_item_id': material_item_id,
            'cost_packages_ids': cost_packages_ids
        });

        hide_selected_cost_package($proposal);
        active_add_cost_package($proposal);

        var $cost_package_quantity = $cost_package.find('.cost-package-quantity');
        $cost_package.find('.cost_package_code').html('');
        $cost_package_quantity.html('');

        if(cost_package_id){
            $.getJSON(window.cost_package_sales_item_url, {
                'cost_package_id': cost_package_id,
                material_item_id: material_item_id,
                ssr_counter: ssr_counter,
                ct_slug: window.ct_slug
            }, function (data) {
                $cost_package.after(data.html);

                $cost_package.find('.cost_package_code').html(data.pci_code);
                // create max options quantity for cost package

                for (var i = 1; i <= data.max_quantity_cost_package; i++) {
                    $cost_package_quantity.append('<option value="' + i + '">' + i + '</option>')
                }
                $cost_package_quantity.trigger('change');

            });
        }


    });

    $('body').on('change', '.work-item', function () {
        var work_package = get_work_package($(this)).data('work-package')
        hide_work_item_selected(work_package);
    });

    $('body').on('change', '.cost-package-quantity', function () {
        var quantity = $(this).val();
        var data_ssr = $(this).parent().parent().attr('data-ssr');

        $.each($(this).parent().parent().parent().find('.cp-child[data-ssr=' + data_ssr + ']'), function () {
            var sales_item_quantity = $(this).find('.sales-item-quantity').html();
            sales_item_quantity = parseInt(sales_item_quantity);
            var total_quantity = quantity * sales_item_quantity;
            $(this).find('.sales-item-total-quantity').html(total_quantity);
        });
    });

    $('body').on('click', '.remove_cost_package', function () {
        var $cost_package = $(this).closest('.cp-parent');
        swal(
            {
                title: "Are you sure?",
                text: "Your will not be able to recover this cost package!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
            },
            function () {
                var $proposal = $cost_package.closest('.cs_wrapper');

                if (!$cost_package.hasClass('cp-parent-new')) {
                    $cost_package.find('.delete-cost-package').attr('checked', 'checked');
                    var ssr_index = $cost_package.attr('data-ssr');
                    $cost_package.parent().find('.cp-child[data-ssr=' + ssr_index + ']').hide();
                    $cost_package.addClass('delete-cp-parent');
                    $cost_package.hide();
                } else {
                    var work_package_prefix = get_work_package($proposal).data('prefix');
                    var prefix = $proposal.attr('data-prefix');
                    var $total_form = $proposal.find('#id_form-' + work_package_prefix + '-' + prefix + '-'+window.nested_form_prefix +'-TOTAL_FORMS');

                    var ssr_prefix = $total_form.val();

                    var ssr_index = $cost_package.attr('data-ssr');
                    $cost_package.parent().find('.cp-child[data-ssr=' + ssr_index + ']').remove();
                    $cost_package.remove();

                    ssr_prefix = parseInt(ssr_prefix);
                    ssr_prefix--;
                    $total_form.val(ssr_prefix);


                    reorder_cost_packages($proposal);

                }
                var material_item_id = $proposal.attr('data-id');
                var cost_packages_ids = get_cost_packages_ids($proposal);

                Dajaxice.delivery_request.reload_voa_options_cost_packages(Dajax.process, {
                    'customer_team_slug': window.ct_slug,
                    'material_item_id': material_item_id,
                    'cost_packages_ids': cost_packages_ids
                });
                hide_selected_cost_package($proposal);
                active_add_cost_package($proposal);
                make_step3_notifications();
            }
        );

    });

    $('body').on('click', '.add-cost-package-area', function () {
        if (!$(this).hasClass('add-disabled')) {
            var id_proposal = $(this).attr('data-id');

            var $proposal = $('body .cs_wrapper[data-id=' + id_proposal + ']');
            var work_package_prefix = get_work_package($proposal).data('prefix');
            var proposal_prefix = $proposal.attr('data-prefix');

            var $total_form = $proposal.find('#id_form-'+ work_package_prefix + '-' + proposal_prefix + '-'+ window.nested_form_prefix +'-TOTAL_FORMS');
            var ssr_prefix = $total_form.val();
            ssr_prefix = parseInt(ssr_prefix);

            var str_form = $proposal.find('.empty_form').html();

            str_form = str_form.replace(/__prefix__/g, ssr_prefix);
            var $forms_ssr = $proposal.find('.cp-container');
            $forms_ssr.append(str_form);

            ssr_prefix++;
            $total_form.val(ssr_prefix);
            hide_selected_cost_package($proposal);
            active_add_cost_package($proposal);
        }

        make_step3_notifications();
    });

    $('.btn-cp-remove').click(function () {
        // get number of cost packages
        var cp_number = $(this).closest('.cs_wrapper').find(".cp_wrapper").length;
        var $button = $(this);
        swal({
                    title: "Are you sure you want to delete this cost package?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        if (cp_number > 1) {
                            $button.closest(".cp_wrapper").remove();
                            swal("Deleted!", "Your cost package has been deleted.", "success");
                        } else {
                            $button.closest(".cs_wrapper").remove();
                            swal("Deleted!", "Your cost package has been deleted.", "success");
                        }
                    }
                });
    });

    $(".ssr-next-button").on("click", function(evt) {
    //$('#step_3_submit').on('click', function(evt){
        evt.preventDefault();
        if($(".form-notification-label-service.label-success").length == 0) {
            sweetAlert(
                "Warning",
                "You have to fill at least one service completely",
                "warning"
            );
        }
        else {
            $('#massive-ssr-step-3-form').submit();
        }
    });

    $('.contract-number').on('change', function () {
        var $contract_number = $(this);
        var $proposal = get_proposal($contract_number);
        $.getJSON(window.url_get_contract_lines, {'ct_slug': window.ct_slug, 'contract_number': $contract_number.val()}, function (data) {
            var $contract_line = $proposal.find('.contract-line');
            $contract_line.html('<option value="" selected="selected">-------</option>');
            var contract_lines = data.contract_lines;
            contract_lines.forEach(function(item, index){
                $contract_line.append('<option value="'+ item +'">'+ item +'</option>');
            });
        });
    });

    /**
     * Notify changes on form, display alert with the state complete/incomplete
     */
    $("body").on("change keyup", ".massive-ssr-form select", function(evt) {
        make_step3_notifications();
    });
    $("body").on("change keyup", ".massive-ssr-form input.form-control", function(evt) {
        make_step3_notifications();
    });
    make_step3_notifications();
});
