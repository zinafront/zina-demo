function get_proposal($element){
    return $element.closest('.cs_wrapper');
}

$(function () {

    var class_for_inputs_sap_documents = [
        '.supplier-purchase-order',
        '.sales-order',
        '.service-order',
        '.invoice-text-1',
        '.invoice-text-2',
        '.force-billing-block-release',
        '.document-number',
        '.rps',
        '.sap-customer-code',
    ];

    if(!window.is_generic){
        class_for_inputs_sap_documents.push('.contract-line');
        class_for_inputs_sap_documents.push('.contract-number');
        class_for_inputs_sap_documents.push('.request-delivery-date');
    }

    function filter_element_without_sap_inputs($element, extra_fields) {
        if(extra_fields == undefined){
            extra_fields = []
        }

        var $aux_element = $element;
        // Fields dont remove disabled
        var all_elements = class_for_inputs_sap_documents.concat(extra_fields);
        for(var i=0; i < all_elements.length; i++){
            $aux_element = $aux_element.not(all_elements[i]);
        }

        return $aux_element;
    }

    function set_service_readonly($proposal){

        $proposal.find(class_for_inputs_sap_documents.join(',')).attr('disabled', 'disabled');
        $proposal.find('.btn-reject-ssr').attr('disabled', 'disabled');
        $proposal.find('.btn-edit-ssr').attr('data-edit-contract', false);
        $proposal.find('.btn-edit-ssr').attr('disabled', 'disabled');
        $proposal.find('.service-readonly').val('yes');
        $proposal.find('.btn-service-readonly').parent().removeClass('hidden');
    }

    $('.btn-resend-flowbot').on('click', function () {
        var $this;
        var $proposal;
        $proposal = get_proposal($(this));
        if(window.is_generic){
            $proposal = $('.cs_wrapper[data-ssr='+ $proposal.data('ssr') +']');
            $this = $proposal.find('.btn-resend-flowbot');
        }else {
            $this = $(this);
        }
        $this.find('i').remove();
        $this.prepend('<i class="fa fa-refresh fa-spin"></i>');

        $this.attr('disabled', 'disabled');
        $.post(
            window.resend_to_flowbot_url,
            {
                work_package: $('#id_work_package_text').val(),
                material_id: $proposal.attr('data-id')
            },
            function (data) {
                if (data.success){
                    $this.html(data.message);
                    set_service_readonly($proposal);
                }else{
                    $this.removeAttr('disabled');
                    $this.find('i').remove();
                    $this.prepend('<i class="fa fa-paper-plane"></i> ');
                    swal({
                        title: "Process information",
                        text: data.message,
                        type: 'error',
                        showCancelButton: false,
                        //confirmButtonClass: "btn-danger",
                        confirmButtonText: "Close",
                        closeOnConfirm: true,
                        html: true,
                    });
                }
            }
        )

    });

    $('.btn-send-quality-check').on('click', function () {
        var $this = $(this);
        $(this).find('i').remove();
        $(this).prepend('<i class="fa fa-refresh fa-spin"></i>');
        var $proposal = get_proposal($(this));
        $this.attr('disabled', 'disabled');
        $.post(
            window.send_quality_check_flowbot,
            {
                work_package: $('#id_work_package_text').val(),
                material_id: $proposal.attr('data-id')
            },
            function (data) {
                if (data.success){
                    $this.html(data.message);
                    set_service_readonly($proposal);
                }else{
                    $this.removeAttr('disabled');
                    $this.find('i').remove();
                    $this.prepend('<i class="fa fa-paper-plane"></i> ');
                    swal({
                        title: "Quality check",
                        text: data.message,
                        type: 'error',
                        showCancelButton: false,
                        //confirmButtonClass: "btn-danger",
                        confirmButtonText: "Close",
                        closeOnConfirm: true,
                        html: true,
                    });
                }
            }
        )

    });

    $('.btn-send-group-billing').on('click', function () {
        var $this = $(this);
        $(this).find('i').remove();
        $(this).prepend('<i class="fa fa-refresh fa-spin"></i>');
        var $proposal = get_proposal($(this));
        $this.attr('disabled', 'disabled');
        $.post(
            window.send_group_billing_flowbot,
            {
                work_package: $('#id_work_package_text').val(),
                material_id: $proposal.attr('data-id'),
                invoice_text_1: $proposal.find('.invoice-text-1').val(),
                invoice_text_2: $proposal.find('.invoice-text-2').val(),
                force_billing_block_release: $proposal.find('.force-billing-block-release').val()
            },
            function (data) {
                if (data.success){
                    $this.html(data.message);
                    set_service_readonly($proposal);
                }else{
                    $this.removeAttr('disabled');
                    $this.find('i').remove();
                    $this.prepend('<i class="fa fa-paper-plane"></i> ');
                    swal({
                        title: "Group billing",
                        text: data.message,
                        type: 'error',
                        showCancelButton: false,
                        //confirmButtonClass: "btn-danger",
                        confirmButtonText: "Close",
                        closeOnConfirm: true,
                        html: true,
                    });
                }
            }
        )

    });

    $('.btn-edit-ssr').on('click', function () {
        var $proposal = get_proposal($(this));
        var service_type = $proposal.find('.service-type').val();
        service_type = service_type.toLowerCase();

        if($(this).attr('data-edit-spo') == 'true'){
            $proposal.find('.supplier-purchase-order').removeAttr('disabled');
            $(this).attr('disabled', 'disabled');
        }

        if(window.is_generic) {
            if (service_type.search('erp|scratch|free of charge') == -1) {
                $proposal.find('.contract-line').removeAttr('disabled');
                $proposal.find('.add-contract-line').removeAttr('disabled');
            }

        }else{
            if ($(this).attr('data-edit-contract') == 'true') {
                $proposal.find('.contract-line').removeAttr('disabled');
                $proposal.find('.contract-number').removeAttr('disabled');
                $proposal.find('.sap-customer-code').removeAttr('disabled');

            }
        }

        if($(this).attr('data-edit-sales-order') == 'true'){
            $proposal.find('.sales-order').removeAttr('disabled');
            $proposal.find('.service-order').removeAttr('disabled');

        }

        if($(this).attr('data-edit-invoice') == 'true'){
            $proposal.find('.invoice-text-1').removeAttr('disabled');
            $proposal.find('.invoice-text-2').removeAttr('disabled');
            $proposal.find('.rps').removeAttr('disabled');
            $proposal.find('.document-number').removeAttr('disabled');
            $proposal.find('.force-billing-block-release').removeAttr('disabled');
        }

        if($(this).attr('data-edit-ssr') == 'true'){

            var extra_fields = [];
            if(window.is_generic) {
                if (service_type.search('erp|scratch|free of charge') != -1) {
                    extra_fields.push('.contract-number');
                    extra_fields.push('.contract-line');
                    extra_fields.push('.add-contract-line');
                    extra_fields.push('.milestone');
                }
                extra_fields.push('.create-voa');
            }

            var $proposal_remove_disabled = filter_element_without_sap_inputs($proposal.find('[disabled=disabled]'), extra_fields);
            $proposal_remove_disabled.removeAttr('disabled');
            // $proposal.find('.with_spo').trigger('change');
            if(!$proposal.find('.with_spo').is(':checked')){
                $proposal.find('.voa').attr('disabled', 'disabled');
            }
            // if(window.is_generic) {
            //     var $create_voa = $proposal.find(".create-voa");
            //     if ($create_voa.val() == 'True') {
            //         $proposal.find('.voa').attr('disabled', 'disabled');
            //     }
            // }

            $proposal.find('.voa').trigger('chosen:updated');
            $proposal.find('.company').trigger('chosen:updated');
            $proposal.find('.sync_work_package').parent().removeClass('hidden');
            $proposal.find('.wbs-add-button').removeClass('hidden');
            $proposal.find('.add-cost-package-area').removeClass('hidden');
            $proposal.find('.remove_cost_package').removeClass('hidden');
            $(this).attr('disabled', 'disabled');
            active_add_cost_package($proposal);
            $proposal.data('editable', 'editable');


        }
    });
    
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
        // } else if (window.is_generic && (list_cost_packages_used.length >= window.proposals_cost_packages[proposal_id]['max_cost_packages'])){
        //     $proposal.find('.add-cost-package-area').addClass('add-disabled');
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
        if(window.is_generic) {
            var $company = $proposal.find('.company');
            for (var i = 0; i < cost_packages.length; i++) {
                if(cost_packages[i]['company'] != null) {
                    if ((cost_packages[i]['company'] != $company.val()) && !(cost_packages[i]['id'] in list_cost_packages_used)) {
                        list_cost_packages_used.push(cost_packages[i]['id']);
                    }
                }
            }
        }
        return list_cost_packages_used;
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

    function hide_work_item_selected() {
        // hide work item selecteds
        $('.work-item').find('option').show();
        if(!window.is_generic){
            $.each($('.work-item'), function () {
                var id_selected = $(this).val();
                if (id_selected) {
                    $('.work-item').not('#' + $(this).attr('id')).find('option[value=' + id_selected + ']').hide();
                }

            });
        }

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

    function reorder_cost_packages($proposal) {
        var prefix = $proposal.attr('data-prefix');
        var i = $proposal.find('#id_form-' + prefix + '-'+window.nested_form_prefix +'-INITIAL_FORMS').val();
        i = parseInt(i);
        $.each($proposal.find('.cp-parent-new'), function (index, element) {
            var $cost_package = $(this);
            var aux_prefix_ssr = $cost_package.attr('data-ssr');

            // change for sales items
            $cost_package.parent().find('.cp-child[data-ssr=' + aux_prefix_ssr + ']').attr('data-ssr', i);

            $.each($cost_package.find('label'), function (index, element) {
                var $label = $(this).parent().find('label');
                var attr_for = String($label.attr('for'));
                attr_for = change_prefix(attr_for, 2, 2, i);
                $label.attr('for', attr_for);
            });
            $.each($cost_package.find('input'), function (index, element) {
                var $element = $(this);
                var attr_id = $element.attr('id');
                var attr_name = $element.attr('name');

                attr_id = change_prefix(attr_id, 2, 2, i);
                attr_name = change_prefix(attr_name, 2, 2, i);

                $element.attr('id', attr_id);
                $element.attr('name', attr_name);

            });
            $.each($(this).find('select'), function (index, element) {
                var $element = $(this);
                var attr_id = $element.attr('id');
                var attr_name = $element.attr('name');
                attr_id = change_prefix(attr_id, 2, 2, i);
                attr_name = change_prefix(attr_name, 2, 2, i);
                $element.attr('id', attr_id);
                $element.attr('name', attr_name);
            });

            // change prefix for cp parent
            $cost_package.attr('data-ssr', i);
            //});
            i += 1;
        });
    }

    function make_step3_notifications() {
        var make_notifications = function(root, postfix) {
            var label = root.find(".form-notification-label" + postfix);
            var icon = label.find(".form-notification-icon" + postfix);
            var text = label.find(".form-notification-text" + postfix);
            var with_spo = root.find(".with_spo");
            var $create_voa = root.find(".create-voa");
            var incomplete = false;
            var proposal;
            var used_cost_packages;

            if (!incomplete) {
                var extra_fields = ['.sdr-responsible', '.cpo-number', '.cpo-item', '.ssr-responsible', '.ssr-author', '.request-delivery-date']
                if (window.is_generic) {
                    if (postfix == '-service') {
                        var service_type = root.find('.service-type').val();
                        service_type = service_type.toLowerCase();
                        if (service_type.search('erp|scratch|free of charge') != -1){
                            extra_fields.push('.milestone');
                            // extra_fields.push('.contract-line');
                            // extra_fields.push('.add-contract-line');
                        }
                    }
                }
                var $filter_select = root.find("select");
                $filter_select = filter_element_without_sap_inputs($filter_select, extra_fields);
                $filter_select.each(function () {
                    if ($(this).val() == "") {
                        if ($(this).hasClass("voa") && !with_spo.prop("checked")) {
                        }
                        else if (window.is_generic && $(this).hasClass("voa") && $create_voa.val() == 'True') {

                        }
                        else if (window.is_generic && $(this).hasClass("voa")) {
                            var $proposal = get_proposal($(this));
                            var sales_items = $proposal.find('.cp-container').find('.cp-child').length;
                            var internal_sales_items = $proposal.find('.cp-container').find('.cp-child').find('.internal-sales-item').length;

                            if(internal_sales_items != sales_items){
                                incomplete = true;
                                return false;
                            }

                        }
                        // validation for claro and algar
                        else if ($(this).hasClass("work-item") && !with_spo.prop("checked") && (window.ct_slug == 'algar' || window.ct_slug == 'claro' || window.ct_slug == 'tim')){
                        }
                        else {
                            incomplete = true;
                            return false;
                        }
                    }
                });

                var $element_to_filter = root.find('input.form-control');
                $element_to_filter = filter_element_without_sap_inputs($element_to_filter, extra_fields);
                $element_to_filter.each(function () {
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

        $(".cs_wrapper").each(function () {
            make_notifications(
                $(this),
                "-service"
            );
        });

        // $(".workpackage-tab-form").each(function () {
        //     var root = $(this);
        //     var postfix = "";
        //     var label = root.find(".form-notification-label" + postfix);
        //     var icon = label.find(".form-notification-icon" + postfix);
        //     var text = label.find(".form-notification-text" + postfix);
        //     var with_spo = root.find(".with_spo");
        //     var incomplete = root.find(".form-notification-label-service.label-danger").length > 0;
        //
        //     if (incomplete) {
        //         label.removeClass("label-success").addClass("label-danger");
        //         icon.removeClass("fa-check-circle").addClass("fa-times");
        //         text.html("Incomplete");
        //     }
        //     else {
        //         label.removeClass("label-danger").addClass("label-success");
        //         icon.removeClass("fa-times").addClass("fa-check-circle");
        //         text.html("All fields filled");
        //     }
        // });
    }

    $.each($('.cs_wrapper:not(.cs_wrapper_done)'), function () {
        var material_item_id = $(this).attr('data-id');
        var $proposal = $(this);
        var cost_packages_ids = get_cost_packages_ids($(this));

        var $with_spo = $proposal.find('.with_spo');
        var $create_voa = $proposal.find('.create-voa');
        var $voa = $proposal.find('.cs_info_config').find('.voa');

        if(window.is_generic){
            if($create_voa.val() == 'True'){
                $with_spo.attr('data-selected-voa', $voa.val());
                $voa.attr('disabled', 'disabled');

            }else{
                $voa.removeAttr('disabled');

            }
        }else{
            if(!$with_spo.is(':checked')){
                $with_spo.attr('data-selected-voa', $voa.val());
                $voa.attr('disabled', 'disabled');

            }else{
                $voa.removeAttr('disabled');

            }
        }

        hide_selected_cost_package($proposal);
        active_add_cost_package($proposal);
        show_not_available_cost_packages_messages($proposal);
    });

    $('.submit-reject-form').on('click', function(){
        var id_ssr = $(this).attr('data-id');
        var comment = $('#id_rejected_comment_'+id_ssr).val();
        $('#id_rejected_comment').val(comment);
        $('#reject_form').attr('action', $(this).attr('data-href'));
        $('#reject_form').submit();
    });


    // add html to chosen to search voa
    $('.voa').chosen();
    $('.company').chosen();
    $('.form-group-voa .chosen-container').find('.chosen-search').append('<span class="search-button"></span>');

    // get selected zi forms
    // $('#id_zi_partner').trigger('change');

    $('.search-button').on('click', function(){

        var $proposal = get_proposal($(this));
        var voa_code = $proposal.find('.form-group-voa').find('.chosen-search').find('input').val().trim();

        if(voa_code){
            var $modal_voa = $('#voa-information');
            $modal_voa.modal('show');
            $modal_voa.find('.modal-title').html('VOA # '+ voa_code);
            $modal_voa.find('.modal-body').html('');
            $modal_voa.find('.loading-icon').show();

            var data = {
                cost_packages_ids: get_cost_packages_ids($proposal),
                voa_code: voa_code,
                work_package: $('#id_work_package_text').val()
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
        if(window.ct_slug == 'oi' || window.ct_slug == 'tim' || window.ct_slug == 'algar'){
            var $work_item = $proposal.find('.work_item');
            var work_item_selected = $work_item.val();
            $work_item.find('option').remove();
            $work_item.append('<option value="">---------</option>');
            $.getJSON(window.url_get_work_items, {'work_package': $('#id_work_package_text').val(), 'material_id': $proposal.data('id'), 'with_spo': with_spo}, function (data) {
                var work_item_list = data.work_item_list;

                work_item_list.forEach(function (item, index) {
                    $work_item.append('<option value="'+ item.id +'">'+ item.short_unicode +'</option>');
                    if(item.id == work_item_selected){
                        $work_item.val(work_item_selected);
                    }
                });




                hide_work_item_selected();

            });
        }
        $voa.trigger("chosen:updated");
        make_step3_notifications();
    });

    $('.create-voa').on('change', function(){
        var $voa = $(this).closest('.cs_info_config').find('.voa');
        var create_voa = $(this).val() == 'True';
        if(create_voa){
            $(this).attr('data-selected-voa', $voa.val());
            $voa.val('');
            $voa.attr('disabled', 'disabled');

        }else{
            $voa.removeAttr('disabled');
            $voa.val($(this).attr('data-selected-voa'));
            $voa.trigger("chosen:updated");
            var $proposal = get_proposal($(this));
            var material_item_id = $proposal.attr('data-id');
            var $company = $proposal.find('.company');
            var cost_packages_ids = get_cost_packages_ids($proposal);
            Dajaxice.delivery_request.reload_voa_ptions_cost_packages(Dajax.process, {
                'customer_team_slug': window.ct_slug,
                'material_item_id': material_item_id,
                'cost_packages_ids': cost_packages_ids,
                'company': $company.val()
            });
        }


        $voa.trigger("chosen:updated");
        make_step3_notifications();
    });

    $('body').on('click', '.sync_work_package', function () {
        var $this = $(this);
        $this.html('<i class="fa fa-refresh fa-spin"></i>');

        var work_package = $('#id_work_package_text').val();
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

    $('body').on('change', '.company', function () {
        var $proposal = $(this).closest('.cs_wrapper');
        var cost_packages_ids = get_cost_packages_ids($proposal);
        var material_item_id = $proposal.attr('data-id');
        var $company = $proposal.find('.company');
        var $create_voa = $proposal.find('.create-voa');
        if($create_voa.val() != 'True'){
            Dajaxice.delivery_request.reload_voa_options_cost_packages(Dajax.process, {
                'customer_team_slug': window.ct_slug,
                'material_item_id': material_item_id,
                'cost_packages_ids': cost_packages_ids,
                'company': $company.val()
            });
        }

        hide_selected_cost_package($proposal);
        active_add_cost_package($proposal);
        make_step3_notifications();

    });

    $('body').on('change', '.cost-packages', function () {
        var cost_package_id = $(this).val();
        var $proposal = $(this).closest('.cs_wrapper');
        var material_item_id = $proposal.attr('data-id');
        var $cost_package = $(this).closest('.cp-parent');
        var $company = $proposal.find('.company');
        var ssr_counter = $cost_package.attr('data-ssr');
        $proposal.find('.cp-child[data-ssr=' + ssr_counter + ']').remove();
        var cost_packages_ids = get_cost_packages_ids($proposal);
        var $create_voa = $proposal.find('.create-voa');
        if($create_voa.val() != 'True') {
            Dajaxice.delivery_request.reload_voa_options_cost_packages(Dajax.process, {
                'customer_team_slug': window.ct_slug,
                'material_item_id': material_item_id,
                'cost_packages_ids': cost_packages_ids,
                'company': $company.val()
            });
        }

        hide_selected_cost_package($proposal);
        active_add_cost_package($proposal);

        var $cost_package_quantity = $cost_package.find('.cost-package-quantity');
        $cost_package.find('.cost_package_code').html('');
        $cost_package_quantity.html('');
        if(window.is_generic) {
            $cost_package.find('.total-price').html('');
        }
        if(cost_package_id){
            $.getJSON(window.cost_package_sales_item_url, {
                'cost_package_id': cost_package_id,
                material_item_id: material_item_id,
                ssr_counter: ssr_counter,
                ct_slug: window.ct_slug
            }, function (data) {
                $cost_package.after(data.html);

                $cost_package.find('.cost_package_code').html(data.pci_code);
                if(window.is_generic){
                    $cost_package.find('.total-price').html(data.total_price);
                }

                // create max options quantity for cost package

                for (var i = 1; i <= data.max_quantity_cost_package; i++) {
                    $cost_package_quantity.append('<option value="' + i + '">' + i + '</option>')
                }
                $cost_package_quantity.trigger('change');

            });
        }


    });

    $('body').on('change', '.work-item', function () {
        hide_work_item_selected();
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

                    var prefix = $proposal.attr('data-prefix');
                    var $total_form = $proposal.find('#id_form-' + prefix + '-'+window.nested_form_prefix +'-TOTAL_FORMS');
                    var ssr_prefix = $total_form.val();

                    var ssr_index = $cost_package.attr('data-ssr');
                    $cost_package.parent().find('.cp-child[data-ssr=' + ssr_index + ']').remove();
                    $cost_package.remove();

                    ssr_prefix = parseInt(ssr_prefix);
                    ssr_prefix--;
                    $total_form.val(ssr_prefix);


                    reorder_cost_packages($proposal);

                }
                hide_selected_cost_package($proposal);
                active_add_cost_package($proposal);

                var material_item_id = $proposal.attr('data-id');
                var cost_packages_ids = get_cost_packages_ids($proposal);
                var $company = $proposal.find('.company');
                var $create_voa = $proposal.find('.create-voa');
                if($create_voa.val() != 'True') {
                    Dajaxice.delivery_request.reload_voa_options_cost_packages(Dajax.process, {
                        'customer_team_slug': window.ct_slug,
                        'material_item_id': material_item_id,
                        'cost_packages_ids': cost_packages_ids,
                        'company': $company.val(),
                    });
                }
                make_step3_notifications();
            }
        );
    });

    $('body').on('click', '.add-cost-package-area', function () {
        if (!$(this).hasClass('add-disabled')) {
            var id_proposal = $(this).attr('data-id');

            var $proposal = $('body .cs_wrapper[data-id=' + id_proposal + ']');
            var prefix = $proposal.attr('data-prefix');

            var $total_form = $proposal.find('#id_form-' + prefix + '-'+window.nested_form_prefix +'-TOTAL_FORMS');
            var ssr_prefix = $total_form.val();
            ssr_prefix = parseInt(ssr_prefix);

            var str_form = $proposal.find('.empty_form').html();

            str_form = str_form.replace(/__prefix__/g, ssr_prefix);
            var $forms_ssr = $proposal.find('.cp-container');
            $forms_ssr.append(str_form);

            $proposal.find('.cp-parent[data-ssr='+ ssr_prefix +']').find('select').removeAttr('disabled');

            ssr_prefix++;
            $total_form.val(ssr_prefix);
            hide_selected_cost_package($proposal);
            active_add_cost_package($proposal);
            make_step3_notifications();
        }
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

                    closeOnConfirm: true,
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
    $("body").on("change keyup", "#accordion select", function(evt) {
        make_step3_notifications();
    });
    $("body").on("change keyup", "#accordion input.form-control", function(evt) {
        make_step3_notifications();
    });
    make_step3_notifications();

    $('.btn-save-changes').on('click', function (evt) {
        $('#form-single-ssr').find('[disabled=disabled]').removeAttr('disabled');
        if($(evt.currentTarget).attr('name') == 'sent_ssr'){
            $('#form-single-ssr').append('<input type="hidden" name="sent_ssr" value="true">');
        }

        $('#form-single-ssr').submit();
    });

    hide_work_item_selected();

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

    $('body').on('click', '.btn-delete-comment', function(){
        var id_comment = $(this).attr('data-id');
        swal({
            title: "Are you sure you want to delete this comment?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true,
        },
        function (isConfirm) {
            if (isConfirm) {
                $.getJSON(window.url_delete_comment, {'comment_id': id_comment, 'ct_slug': window.ct_slug}, function (data) {
                    $('.li-comment[data-id="'+ id_comment +'"]').remove();
                });
            }
        });

    });


    var autocomplet_opts_pl_items = {
        source: function (request, response) {
            var suggest = [];
            $.get(window.url_search_price_list_items,
                {'q': request.term, 'work_package': $('#id_work_package_text').val()},
                function (data) {
                    return response(data);
                }
            );

        },
        select: function (event, ui) {
            var $input = $(event.target);
            $input.attr('readonly', 'readonly');
            $input.parent().find('button').removeAttr('disabled');
            $input.parent().find('.value_pl_item').val(ui.item.id);
        },

    };

    var k = 0;
    $('#btn_create_service').on('click', function () {
        var new_input = '<div class="form-group"><div class="input-group"><input type="text" class="form-control" placeholder="search price list item." class="search_price_list_item"/><input type="hidden" class="value_pl_item"><div class="input-group-btn"><button type="button" id="" disabled class="btn btn-primary btn-input-group btn-accept-pl-item"><i class="fa fa-check"></i> </button> <button type="button" class="btn btn-danger btn-input-group btn-reject-pl-item" disabled><i class="fa fa-close"></i></button></div></div></div>';
        $('#form_select_price_list_items').append(
            new_input
        );
        $('#form_select_price_list_items').find('input[type=text]:last').autocomplete(autocomplet_opts_pl_items);
        k++;

    });

    function addService(obj_btn){
        var $accept_button = obj_btn;
        var price_list_item = obj_btn.parent().parent().find('input[type=hidden]').val();
        var work_package = $('#id_work_package_text').val();
        var template_loading_button = '<i class="fa fa-spinner fa-pulse fa-fw"></i>';
        var aux_accpet_button_html = obj_btn.html();
        obj_btn.html(template_loading_button);
        $accept_button.parent().find('button').attr('disabled', 'disabled');
        $.post(window.url_create_proposal_material, {'price_list_item': price_list_item, 'work_package': work_package}, function (data) {
            $accept_button.html(aux_accpet_button_html);
            if(data['success']){
                $('#btn_show_created_service').removeClass('hidden');
                swal({
                    title: data['message'],
                    type: "success",
                    // showCancelButton: true,
                    confirmButtonClass: "btn-success",
                    confirmButtonText: "OK!"
                    // closeOnConfirm: true,
                });
            }else{
                $accept_button.parent().find('button').removeAttr('disabled');
                swal({
                    title: data['message'],
                    type: "warning",
                    // showCancelButton: true,
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: "OK!"
                    // closeOnConfirm: true,
                });
            }

        }).fail(function () {

            $accept_button.html(aux_accpet_button_html);
            swal({
                title: "Error Creating service",
                type: "danger",
                // showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "OK!"
                // closeOnConfirm: true,
            });

        });
    }

    $('#form_select_price_list_items').on('click', '.btn-accept-pl-item', function () {
        var inputs = $(".pli_service_value");
        var price_list_items_added = [];
        for(var i = 0; i < inputs.length; i++){
            price_list_items_added.push($(inputs[i]).val());
        }
        var price_list_item = $(this).parent().parent().find('input[type=hidden]').val();
        var obj_btn = $(this);

        if (price_list_items_added.indexOf(price_list_item) > -1){
            swal({
                  title: "Are you sure?",
                  text: "You will add a service already exists in this SSR.",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "Continue",
                  cancelButtonText: "Cancel",
                  closeOnConfirm: false,
                  closeOnCancel: false
                },
                function(isConfirm){
                  if (isConfirm) {
                      addService(obj_btn);
                  }else{
                      swal("Service not created!");
                  }
            });
        }
        else {
            addService(obj_btn);
        }
    });

    $('#btn_show_created_service').on('click', function () {
        window.location.reload();
    });

    $('#form_select_price_list_items').on('click', '.btn-reject-pl-item', function () {
        $(this).parent().parent().find('input[type=text]').removeAttr('readonly');
        $(this).parent().parent().find('input').val('');
        $(this).parent().find('button').attr('disabled', 'disabled')
    });

    $('.create_link_cpo').on('click', function () {
        var tr_html = '<tr class="cpo-link-tr"><td><input type="text" class="link_cpo_number form-control"></td><td><input type="text" class="link_cpo_item_number form-control"></td><td><input type="text" class="link_cpo_description form-control" readonly></td><td><button type="button" title="Approve" data-toggle="tooltip" class="btn btn-success btn-link-cpo-item btn-cpos" disabled><i class="fa fa-check"></i></button> <button data-toggle="tooltip" disabled type="button" title="Reject" class="btn btn-primary btn-link-cpo-item-cancel btn-cpos"><i class="glyphicon glyphicon-erase"></i></button> <button data-toggle="tooltip" type="button" title="Remove" class="btn btn-cpos btn-danger btn-link-cpo-item-remove"><i class="fa fa-trash"></i></button></td></tr>'

        $(this).closest('.tr_create_link_cpo').before(tr_html);
    });

    function get_cpo_item_description($element) {
        var $link_tr = $element.closest('.cpo-link-tr');
        var $cpo = $link_tr.find('.link_cpo_number');
        var $cpo_item = $link_tr.find('.link_cpo_item_number');
        var $cpo_description = $link_tr.find('.link_cpo_description');

        if ($cpo.val()) {
            $.getJSON(window.url_get_cpo_item_description, {
                'cpo_number': $cpo.val(),
                'cpo_item': $cpo_item.val()
            }, function (data) {
                if (data['success']) {
                    $cpo_description.val(data['description']);
                    if(data['cpo']){
                        $cpo.attr('readonly', 'readonly');
                    }

                    if(data['cpo_item']){
                        $cpo_item.attr('readonly', 'readonly');
                    }

                    $link_tr.find('button').removeAttr('disabled');
                } else {
                    $cpo_description.val('');

                }

            });
        }
    }

    $('.table-links-cpos').on('input', '.link_cpo_number', function () {
        get_cpo_item_description($(this));
    });

    $('.table-links-cpos').on('input', '.link_cpo_item_number', function () {
        get_cpo_item_description($(this));
    });

    $('.table-links-cpos').on('click', '.btn-link-cpo-item', function () {
        var $btn_link = $(this);
        var $proposal = get_proposal($btn_link);
        var proposal_material_id = $proposal.data('id');
        var $link_tr = $btn_link.closest('.cpo-link-tr');

        var $cpo = $link_tr.find('.link_cpo_number');
        var $cpo_item = $link_tr.find('.link_cpo_item_number');

        $link_tr.find('button').attr('disabled', 'disabled');

        $.post(
            window.url_ssr_link_cpo_material,
            {'cpo': $cpo.val(), 'cpo_item': $cpo_item.val(), 'proposal_material_id': proposal_material_id},
            function (data) {
                if(data['success']){
                    $link_tr.find('input').attr('readonly', 'readonly');
                    swal({
                        title: data['message'],
                        type: "success",
                        // showCancelButton: true,
                        confirmButtonClass: "btn-success",
                        confirmButtonText: "OK!"
                        // closeOnConfirm: true,
                    });

                }else{
                    swal({
                        title: data['message'],
                        type: "warning",
                        // showCancelButton: true,
                        confirmButtonClass: "btn-warning",
                        confirmButtonText: "OK!"
                        // closeOnConfirm: true,
                    });
                    $link_tr.find('button').removeAttr('disabled');
                }
            }
        );

    });

    $('.table-links-cpos').on('click', '.btn-link-cpo-item-cancel', function () {
        var $btn_link = $(this);
        var $link_tr = $btn_link.closest('.cpo-link-tr');

        $link_tr.find('.link_cpo_number').removeAttr('readonly').val('');
        $link_tr.find('.link_cpo_item_number').removeAttr('readonly').val('');
        $link_tr.find('.link_cpo_description').val('');

        $link_tr.find('button').not('.btn-link-cpo-item-remove').attr('disabled', 'disabled');
    });

    $('.table-links-cpos').on('click', '.btn-link-cpo-item-remove', function () {
        var $btn_link = $(this);
        var $link_tr = $btn_link.closest('.cpo-link-tr');
        $link_tr.remove();
    });
    // $('.work-item').on('change', function () {
        // var $proposal = get_proposal($(this));
        // var work_package = $('#id_work_package_text').val();
        // var work_item_id = $(this).val();
        // var $with_spo = $proposal.find('.with_spo');

        // if(work_item_id && window.ct_slug == 'claro') {
        //     $.getJSON(window.url_get_work_item_info, {
        //         work_package: work_package,
        //         work_item_id: work_item_id
        //     }, function (work_item) {
        //         if (work_item.is_integration_type && work_item.completed_date_actual != null) {
        //             $with_spo.attr('disabled', 'disabled');
        //             $with_spo.removeAttr('checked');
        //             $with_spo.trigger('change');
        //         } else {
        //             $with_spo.removeAttr('disabled');
        //         }
        //
        //     }).fail(function () {
        //         swal("Error!", "Error get work item info.", "error");
        //         $with_spo.removeAttr('disabled');
        //     });
        // }else{
        //     $with_spo.removeAttr('disabled');
        // }


    // });

    $('#btn_collapse_all').on('click', function () {
        $('.collapse').collapse('hide');
    });

    $('#btn_expand_all').on('click', function () {
        $('.collapse').collapse('show');
    });

    $('.create-voa-resend').on('click', function () {
        var $proposal = get_proposal($(this));
        $proposal = $('.cs_wrapper[data-ssr='+ $proposal.data('ssr') +']');
        var $btn = $proposal.find('.create-voa-resend');
        var proposal_material_id = $proposal.data('id');
        $btn.attr('disabled', 'disabled');

        $.post(window.url_create_voa_resend, {proposal_material_id: proposal_material_id}, function (data) {
            var type_message = '';
            var btn = '';
            if(data.success){
                type_message = 'success';
                btn = 'btn-success';
            }else{
                type_message = 'error';
                btn = 'btn-danger';
                $btn.removeAttr('disabled');
            }

            swal({
                title: 'VOA',
                // title: data.message,
                // type: type_message,
                text: data.message,
                type: type_message,
                showCancelButton: false,
                closeOnConfirm: true,
                // showCancelButton: true,
                // confirmButtonClass: btn,
                confirmButtonClass: btn,
                confirmButtonText: "OK!"
                // closeOnConfirm: true,
            });
        });
    });

    if (window.is_generic){
        $('.sales-order').on('input', function (evt) {
            var sales_order = $(this).val();
            var $proposal = get_proposal($(this));
            var ssr = $proposal.data('ssr');

            $('.cs_wrapper[data-ssr='+ ssr +']').find('.sales-order').val(sales_order);

        });

        $('.service-order').on('input', function (evt) {
            var service_order = $(this).val();
            var $proposal = get_proposal($(this));
            var ssr = $proposal.data('ssr');

            $('.cs_wrapper[data-ssr='+ ssr +']').find('.service-order').val(service_order);

        });

        $('.supplier-purchase-order').on('input', function (evt) {
            var supplier_purchase_order = $(this).val();
            var $proposal = get_proposal($(this));
            var ssr = $proposal.data('ssr');

            $('.cs_wrapper[data-ssr='+ ssr +']').find('.supplier-purchase-order').val(supplier_purchase_order);

        });
    }

});


