var hot;
var red_cell_composed_by_render = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.color = 'red';
};

var green_cell_composed_by_render = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.color = 'green';
};

$(function () {

    $(".quantity").inputmask(
        "numeric",
        {
            rightAlign: false,
            allowPlus: false,
            allowMinus: false
        }
    );

    if(!hot) {
        container1 = document.getElementById('work-packages-hot');

        hot = new Handsontable(container1, {
            startRows: 8,
            startCols: 2,
            minSpareRows: 10,
            rowHeaders: true,
            contextMenu: true,
            columnSorting: true,
            colWidths: [
                100,
                50,
                50
            ],
            height: 305,
            stretchH: 'all',
            colHeaders: [
                'Work packages',
                'Site',
                'Results',
            ],
            //colWidths: [120, 360],
            columns: [
                {
                    type: 'numeric'
                },
                {
                    readOnly: true
                },
                {
                    readOnly: true
                }
            ],
            cells: function (row, col, prop) {
                var cellProperties = {};

                if (col == 2) {
                    if (this.instance.getDataAtRow(row)[2] === "Success") {
                        cellProperties.renderer = green_cell_composed_by_render;
                    }
                    else {
                        cellProperties.renderer = red_cell_composed_by_render;
                    }
                }

                return cellProperties;
            },
            afterChange: function (changes, source) {
                if(changes == null){
                    return
                }
                if(source == 'javascript_full_fill'){
                    return
                }

                var $this = this;
                var work_package_changes = [];
                changes.forEach(function (element) {
                    if(element[1] == 0){
                        var oldVal = element[2];
                        var newVal = element[3];

                        if (oldVal != newVal){
                            work_package_changes.push(
                                {
                                    'work_package_id': newVal,
                                    'row': element[0]
                                }
                            );
                        }
                    }
                });
                if(work_package_changes.length > 0){
                    var json_text = JSON.stringify(
                        {'work_packages': work_package_changes}
                    );
                    $.getJSON(window.url_get_work_package_cria_ssr, {'json_text': json_text}, function (data) {
                        var work_packages = data['work_packages'];
                        work_packages.forEach(function (work_package) {
                            if(work_package['site'] != null){
                                $this.setDataAtCell(work_package['row'], 1, work_package['site'], 'javascript_full_fill');
                                $this.setDataAtCell(work_package['row'], 2, 'Success', 'javascript_full_fill');
                            }else{
                                $this.setDataAtCell(work_package['row'], 1, '', 'javascript_full_fill');
                                if(work_package['work_package_id'] != ''){
                                    $this.setDataAtCell(work_package['row'], 2, 'Error', 'javascript_full_fill');
                                }else{
                                    $this.setDataAtCell(work_package['row'], 2, '', 'javascript_full_fill');
                                }

                            }

                        });

                    });
                }
            },
        });

        // if (window.wp_list.length > 0) {
        //     hot.loadData(window.wp_list);
        // }
    }

    $('.quantity').on('input', function () {
        var quantity = parseInt($(this).val());
        var $tr = $(this).parent().parent();
        var price = parseFloat($tr.find('.td-unit-price').find('input').val());
        var total_price = quantity * price;

        if(isNaN(total_price)){
            total_price = 0;
        }

        total_price = total_price.toFixed(2)
        $tr.find('.td-total-price').find('input').val(total_price);
        $tr.find('.td-total-price').find('.total-price').html(total_price);

        // calculate total cost
        var ssr_total_price = 0.0;
        $('.td-total-price').each(function () {
            ssr_total_price += parseFloat($(this).find('input').val());
        });

        var stimate_cost = parseFloat($('.cr_stimate_cost').html());
        ssr_total_price = ssr_total_price.toFixed(2);
        $('#id_cr_total_cost').val(ssr_total_price);
        if(ssr_total_price > stimate_cost){
            $('.alert-cost').removeClass('hidden');
            $('.btn-save').attr('disabled', 'disabled')
        }else{
            $('.alert-cost').addClass('hidden');
            $('.btn-save').removeAttr('disabled')
        }
    });

    // $('#id_vendor_outline_agreement').on('change', function () {
    //     $('.sales-item-configuration').find('.table').addClass('hidden');
    // });

    $('.btn-save').on('click', function () {
        var data = hot.getData();
        var work_package_list = [];
        data.forEach(function (element) {

            if (element[0] != '' && element[2] != null && element[2].toLowerCase() == 'success'){
                work_package_list.push(element[0]);
            }
        });

        $('.work-package-text').val(work_package_list.join(';'));
        $('#form_ssr').submit();
    });

    // load work packages
    var work_package_list = $('.work-package-text').val().split(';')
    var data_hot = [];

    work_package_list.forEach(function (element, index) {
        data_hot.push([index, 0, element]);
    });
    hot.setDataAtCell(data_hot);
});

// wbs

zi_partner_and_wbs_modal_handler = {
    /**
     * Get source of call: zi_partner, wbs
     */
    get_source: function(button) {
        if (button.hasClass("zi-partner-add-button") || button.hasClass("zi-partner-info-button"))
            return "zi_partner";

        if (button.hasClass("wbs-add-button") || button.hasClass("wbs-info-button"))
            return "wbs";
    },

    /**
     * Get mode of call: info, add, edit
     */
    get_mode: function(button) {
        if (button.hasClass("zi-partner-add-button") || button.hasClass("wbs-add-button"))
            return "add";

        if (button.hasClass("zi-partner-info-button") || button.hasClass("wbs-info-button"))
            return "info";

        return "edit";
    },

    /**
     * Generate title
     */
    generate_title: function(source, mode) {
        var title;

        switch (mode) {
            case 'add':
                if (source == "zi_partner") {
                    title = "New ZI partner";
                }
                else if (source == "wbs") {
                    title = "New WBS";
                }
                break;

            case 'info':
                if (source == "zi_partner") {
                    title = "ZI partner information";
                }
                else if (source == "wbs") {
                    title = "WBS information";
                }
                break;

            case 'edit':
                if (source == "zi_partner") {
                    title = "Edit ZI partner information";
                }
                else if (source == "wbs") {
                    title = "Edit WBS information";
                }
                break;
        }

        return title;
    },

    /**
     * Set title
     */
    set_title: function(title) {
        $("#zi-partner-and-wbs-modal-title").html(title);
    },

    /*
    *  Set title in custom modal
    * */
    set_modal_title: function(selector, title) {
        $(selector).find('.modal-title').html(title);
    },

    /**
     * Set body
     */
    set_body: function(content) {
        $("#zi-partner-and-wbs-modal-body").html(content);
    },

    /*
    * show message in modal
    *
    * message_type: success, danger, warning, info
    * */
    show_message: function (selector_form, message, message_type) {
        var alert_success = '<div class="alert alert-'+ message_type + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
        alert_success += message + '</div>';

        $(selector_form).find('.__all__').html(alert_success);
    },

    clear_message: function(selector_form){
        $(selector_form).find('.__all__').html('');
    },

    clean_form_fields: function(selector_form, selector_not_clean){
        $(selector_form).find('input,select,textarea').not(selector_not_clean).val('');
    },

    /*
    * Clean errorlist
    * */
    clean_errors: function(selector_form){
        $(selector_form).find('.errorlist').remove();
        $(selector_form).find('.__all__').html('');
    },

    /*
    *  Show error in modal forms
    * */
    show_errors: function(selector_form, success, message, errors){

        this.clean_errors(selector_form);
        if(success){
            this.show_message(selector_form, message, 'success')
        }else{
            for(var i=0; i < errors.length; i++){
                var field_selector = '';

                if(errors[i][0] == '__all__'){
                    field_selector = '.' + errors[i][0];
                }else{
                    field_selector = '[name=' + errors[i][0] + ']';
                }

                var field_errors = errors[i][1];
                var html = '<ul class="errorlist">';

                for(var j = 0; j < field_errors.length; j++){
                    html += '<li>' + field_errors[j] + '</li>';
                }
                html += '</ul>';

                $(selector_form).find(field_selector).after(html);

            }
        }
    },

    /**
     * Set body in custom modal
     */
    set_modal_body: function(selector, content) {
        $(selector).find('.modal-body>div').html(content);
    },

    /**
     * Prepare modal for loading data
     */
    prepare: function(title) {
        this.set_title(title);
        this.set_body("Loading...");

        $("#zi-partner-and-wbs-modal-close-button").show();
        $("#zi-partner-and-wbs-modal-back-button").hide();
        $("#zi-partner-and-wbs-modal-save-new-button").hide();
        $("#zi-partner-and-wbs-modal-save-edit-button").hide();
        $("#zi-partner-and-wbs-modal-edit-button").hide();
    },

    /**
     * Prepare modal for loading data
     */
    prepare_modal: function($modal, title) {
        this.set_title(title);
        this.set_body("Loading...");

        $modal.find(".modal-close-button").show();
        $modal.find(".modal-back-button").hide();
        $modal.find(".modal-save-new-button").hide();
        $modal.find(".modal-save-edit-button").hide();
        $modal.find(".modal-edit-button").hide();
    },

    init_buttons_edit_zi: function(mode) {

        $("#zi-partner-edit-modal-close-button").show();

        switch (mode) {
            case 'info':
                $("#zi-partner-edit-modal-back-button").hide();
                $("#zi-partner-edit-modal-save-edit-button").hide();
                $("#zi-partner-edit-modal-edit-button").show();
                break;

            case 'edit':
                $("#zi-partner-edit-modal-back-button").show();
                $("#zi-partner-edit-modal-save-edit-button").show();
                $("#zi-partner-edit-modal-edit-button").hide();
                break
        }
    },

    /**
     * Show event handler
     */
    show_event_handler: function() {
        var _this = this;

        $("body").on("show.bs.modal", "#zi-partner-and-wbs-modal", function (e) {
            var button = $(e.relatedTarget); // Button who called the modal
            var source = _this.get_source(button); // Gets source: zi_partner, wbs
            var mode = _this.get_mode(button); // Get mode: info, add
            var title = _this.generate_title(source, mode); // Get title
            var id;
            var select;

            _this.prepare(title);

            if (source == "zi_partner") {
                //zi_partner_handler.load_form(mode);
            }
            else if (source == "wbs") {
                id = button.attr("id").split("-");
                id = "id_form-" + id[id.length - 1] + "-work_breakdown_structure";
                select = $("#" + id);
                wbs_handler.load_form(mode, select);
            }
        });

        // $("body").on("shown.bs.modal", "#zi-partner-add-modal", function (e) {
        //     var zi_add_form = '#id_zip_id_partner_form';
        //
        //     _this.clean_errors(zi_partner_handler.forms_selector.zi_add_form_selector);
        //     zi_partner_handler.clean_add_form_fields();
        //     if(!window.is_generic) {
        //         $(zi_partner_handler.forms_selector.zi_add_form_selector).find('select').attr('disabled', 'disabled');
        //         angular.element(document).ready(function () {
        //             angular.bootstrap(document, ["zipIdPartnerModule"]);
        //         });
        //     }
        // });

        // $("body").on("shown.bs.modal", "#zi-partner-edit-modal", function (e) {
        //     _this.clean_errors(zi_partner_handler.forms_selector.zi_edit_form_selector);
        //     _this.set_modal_title("#zi-partner-edit-modal", "ZI partner information");
        //     _this.init_buttons_edit_zi('info');
        //     zi_partner_handler.change_form_edit('info');
        //
        // });

        $("body").on("show.bs.modal", ".wbs-modal-add", function (e) {
            var form_selector = '#' + $(this).attr('id') + ' ' + wbs_handler.forms_selector.add;
            _this.clean_errors(form_selector);
            $(form_selector).find('select').val('');
        });

        $("body").on("show.bs.modal", "#modal-comment-service", function (e) {
            var form_selector = '#form_comment_service';

            var $proposal = get_proposal($(e.relatedTarget));

            var material_id = $proposal.attr('data-id');
            var service_name = $proposal.find('.cs_title').find('.panel-title').clone().children().remove().end().text();

            _this.clean_errors(form_selector);
            _this.set_modal_title('#modal-comment-service', 'Add comment for ' + service_name);
            $(form_selector).find('textarea').val('');
            $(form_selector).find('#id_material_item_id').val(material_id);
        });

        $('.show-more-comments').on('click', function () {
            $('#modal-show-more-comments').modal('show');
            var $proposal = get_proposal($(this));
            var service_name = $proposal.find('.cs_title').find('.panel-title').clone().children().remove().end().text();
             var params = {
                "material_item": $proposal.data('id'),
                'ct_slug': window.ct_slug
            };

            var url = window.get_all_comments_url + "?" + $.param(params);
            _this.set_modal_title('#modal-show-more-comments', 'Comments for '+ service_name);
            _this.set_modal_body('#modal-show-more-comments', '');
            $.getJSON(
                url,
                {},
                function (data) {
                    _this.set_modal_body('#modal-show-more-comments', data.html)
                }
            );
        });
    },

    /**
     * Edit button handler
     */
    // edit_button_handler: function() {
    //     var _this = this;
    //
    //     $("body").on("click", "#zi-partner-edit-modal-edit-button", function() {
    //         _this.set_modal_title("#zi-partner-edit-modal", "Edit ZI partner information");
    //         _this.init_buttons_edit_zi('edit');
    //         zi_partner_handler.change_form_edit('edit');
    //     });
    // },

    /**
     * Save modify button handler
     */
    save_modify_button_handler: function() {
        var _this = this;

        // $("body").on("click", "#zi-partner-edit-modal-save-edit-button", function() {
        //     zi_partner_handler.send_update_form();
        // });

        $('#save_comment').on('click', function () {
            var form_selector = '#form_comment_service';
            var $form = $(form_selector);
            var form = $form.serialize();
            var params = {
                // "zip_id_partner_id": _this.get_value(),
                'ct_slug': window.ct_slug
            };

            var url = $form.attr('action') + "?" + $.param(params);

            $.post(
                url,
                form,
                function (data) {
                    _this.show_errors(form_selector, data.success, data.message, data.errors);
                    if(data.success){
                        $form.find('textarea').val('');

                        var $proposal = $('.cs_wrapper[data-id='+ $form.find('#id_material_item_id').val() +']');
                        $proposal.find('.comments').find('ul').prepend(data.comment);
                        $proposal.find('.no-comment-yet').addClass('hidden');
                        $proposal.find('.comments').removeClass('hidden');


                    }
                }
            );
        });
    },

    /**
     * Back button handler
     */
    back_button_handler: function() {
        var _this = this;

        $("body").on("click", "#zi-partner-edit-modal-back-button", function() {

            var title = _this.set_modal_title("ZI partner information"); // Get title
            _this.init_buttons_edit_zi('info');
            // zi_partner_handler.change_form_edit('info');

        });
    },

    /**
     * Initialize
     */
    init: function() {
        this.show_event_handler();
        // this.edit_button_handler();
        this.back_button_handler();
        this.save_modify_button_handler();
    }
};

/**
 * Init
 */
zi_partner_and_wbs_modal_handler.init();

    /**
 * WBS handler
 */
var wbs_handler = {

    urls: {
        info: window.wbs_info_url,
        add: window.wbs_add_url,
    },

    modal_selector: {
        info: ".wbs-modal-info",
        add: ".wbs-modal-add",
    },

    forms_selector: {
        add: ".json_add_zi_partner",
    },

    /**
     * Get value
     */
    get_value: function(select) {
      return select.val();
    },

    /**
     * Hide info button
     */
    hide_info_button: function(select) {
        var button = select.next().find(".wbs-info-button");

        button.hide();
    },

    /**
     * Show info button
     */
    show_info_button: function(select) {
        var button = select.next().find(".wbs-info-button");

        button.show();
    },

    /**
     * Hide add button
     */
    hide_add_button: function(select) {
        var button = select.next().find(".wbs-add-button");

        button.hide();
    },

    /**
     * Show add button
     */
    show_add_button: function(select) {
        var button = select.next().find(".wbs-add-button");

        button.show();
    },

    /**
     * Init buttons
     */
    init_buttons: function() {
        var _this = this;

        // .each(function (idx) {
        var select = $(".wbs-select");
        var value = _this.get_value(select);

        if (value == "") {
            _this.hide_info_button(select);
        }else{
            _this.load_info_form(select);
        }
        // });
    },

    get_proposal_selector: function($proposal){
        var data_id = $proposal.attr('data-id');
        var proposal_selector = '.cs_wrapper[data-id='+ data_id  +']';
        return proposal_selector;
    },

    /**
     * Select handler
     */
    select_handler: function() {
        var _this = this;

        $("body").on("change keyup", ".wbs-select", function() {
            var select = $(this);
            var value = _this.get_value(select);
            var $proposal = select.closest('.cs_wrapper');
            var prefix = $proposal.attr('data-prefix');

            if (value == "") {
                _this.hide_info_button(select);
            }
            else {
                _this.show_info_button(select);
                _this.load_info_form(select)
            }
        });
    },

    /**
     * Add empty option
     */
    add_empty_option: function(select) {
        select.append('<option selected="selected" value="">---------</option>');
    },

    /**
     * Reset select
     */
    reset_select: function(select) {
        select.empty();
        this.add_empty_option(select);
    },

    /**
     * Reset selects
     */
    reset: function() {
        var _this = this;

        $(".wbs-select").each(function (idx) {
            var select = $(this);

            _this.reset_select(select);
            _this.hide_info_button(select);
            _this.hide_add_button(select);
        });
    },

    /**
     * Load options
     */
    load: function(zi_partner_value) {
        var params;
        var url;
        var _this = this;

        params = {
            "zi_partner_id": zi_partner_value
        };

        url = window.wbs_search_url;

        $.getJSON(
            url,
            params,
            function (data) {
                var options = "";
                var i;
                var option;
                var value;
                var text;
                var has_data = data.length > 0;

                if (has_data) {
                    for (i = 0; i < data.length; i++) {
                        value = data[i].value;
                        text = data[i].text;
                        option = "<option value='" + value + "'>" + text + "</option>";
                        options += option;
                    }
                }

                $(".wbs-select").each(function (idx) {
                    var select = $(this);
                    var selected_option = select.val();
                    _this.reset_select(select);

                    _this.show_add_button(select);

                    if (has_data) {
                        select.append(options);
                        select.val(selected_option);
                    }
                });

            }
        );
    },

    load_info_form: function(select) {
        var _this = this;

        var url = _this.urls.info;

        var params = {
            "wbs_id": _this.get_value(select)
        };

        var selector_modal_info = _this.modal_selector.info;
        zi_partner_and_wbs_modal_handler.set_modal_title(selector_modal_info, 'WBS info');
        $.getJSON(
            url,
            params,
            function (data) {
                zi_partner_and_wbs_modal_handler.set_modal_body(selector_modal_info, data.html);
            }
        );
    },

    load_add_form: function() {
        var _this = this;

        var url = _this.urls.add;

        var params = {
            'change_request_id': window.change_request_id,
            // "proposal_material_id": proposal_material_id
        };

        var selector_modal_add = _this.modal_selector.add;

        $.getJSON(
            url,
            params,
            function (data) {
                zi_partner_and_wbs_modal_handler.set_modal_body(selector_modal_add, data.html);
                zi_partner_and_wbs_modal_handler.set_modal_title(selector_modal_add, 'WBS info')
            }
        );
    },



    /**
     * Notification of ZI partner change
     */
    // zi_partner_change_notification: function() {
    //     var _this = this;
    //     var zi_partner_value = zi_partner_handler.get_value();
    //
    //     if (zi_partner_value != "") {
    //         this.load(zi_partner_value);
    //
    //         $.each($('.wbs-modal-add'), function(){
    //             var prefix = $(this).attr('data-prefix');
    //             var $proposal = $('.cs_wrapper[data-prefix='+ prefix + ']');
    //             var proposal_selector = _this.get_proposal_selector($proposal);
    //             var proposal_material_id = $proposal.data('id')
    //             _this.load_add_form(prefix, proposal_material_id);
    //         });
    //
    //     }else{
    //         this.reset();
    //     }
    // },

    send_add_form: function($modal){
        var _this = this;
        var $form = $modal.find('.json_add_zi_partner');

        var wbs_form_selector = '#' + $modal.attr('id') + ' ' + '.json_add_zi_partner';

        var params = {
            "change_request_id": window.change_request_id
        };

        var url = _this.urls.add + "?" + $.param(params);

        // var post_data = $form.serialize() + '?' + $.param(params);
        $.post(url, $form.serialize(), function(data){
            zi_partner_and_wbs_modal_handler.show_errors(wbs_form_selector, data.success, data.message, data.errors);
            if(data.success){
                $form.find('select').val('');
                $('.wbs-select').append('<option value="'+ data.wbs.id +'">'+ data.wbs.name +'</option>');
                $('.wbs-select').val(data.wbs.id);
            }
        });
    },

    /**
     * Initialize
     */
    init: function() {
        var _this = this;
        this.init_buttons();
        this.select_handler();
        //
        // if (zi_partner_handler.get_value() == "")
        //     this.reset();
        //
        // $.each($('.cs_wrapper'), function(){
        //     $(this).find('.wbs-select').trigger('change');
        //     if(zi_partner_handler.get_value() != ''){
        //         var $proposal = get_proposal($(this));
        //         _this.load_add_form($proposal.data('prefix'), $proposal.data('id'));
        //     }
        // });
        _this.load_add_form()
        $('body').on('click', '.modal-save-new-button', function(){
            var $modal = $(this).closest('.wbs-modal-add');

            _this.send_add_form($modal)
        });
    }
};

/**
 * Init
 */
wbs_handler.init();

/**
 * -----------------------------------------------------------
 */

$(function () {
    $zip_partner = $('#id_zip_id_partner');

    if ($zip_partner.val() != "") {
        $('#zip_code').attr('value', $zip_partner.val());
    }

    disable_bts = function () {
        $('button.primaryAction').attr('disabled', 'disabled');
        $('button.primaryAction').addClass('gray_btn');
    };

    enable_bts = function () {
        $('button.primaryAction').removeAttr('disabled');
        $('button.primaryAction').removeClass('gray_btn');
    };

    close_ajax_box = function () {
        $("#dialog-form").modal('hide');
    };

    close_box = function (seconds) {
        setTimeout('close_ajax_box()', parseInt(seconds) * 1000);
    };

    $('body').on('click', '#add_zi_partner', function (e) {
        $('#errorMsg').removeClass();
        $('#errorMsg').empty();
        $('#json_add_zi_partner').each(function () {
            this.reset()
        });
        $("#dialog-form").modal('show');
    });


    $('body').on('change keyup', '.ajax_update', function () {
        var _target = $(this).attr('rel').split(' ');
        var target = '.' + $(this).attr('rel');

        if ($(this).val()) {

            if (_target.length > 1) {

                for (i in _target) {
                    target = '.' + _target[i];
                    $(target).empty();
                    $(target).append($('<option></option>').val('').html('---------'));
                }

            }

            $(target).empty();
            $(target).append($('<option></option>').val('').html('loading ...'));

            $.get(window.wbs_get_info_url + $(this).val() + '/', function (data) {
                $(target).empty();
                $(target).append($('<option></option>').val('').html('---------'));

                for (i in data) {
                    if (!data[i].errors) {
                        $(target).append($('<option></option>').val(data[i].attr.pk).html(data[i].attr.wbs_element +
                                ' (' + data[i].data.title + ')'));
                    }
                }

                if (data[i].wbs_qty) {
                    $('#id_wbs_quantity').html("<div class='higlighted-value'>" + data[i].wbs_qty + "</div>" );
                }

            }, 'json');
        }
    });

    function get_description_type_region(row, id_wbs) {
        update_row_table_description_type_region(row,
                '-',
                '-',
                '-'
        );
        if (row == 'project') {
            update_row_table_description_type_region('region',
                    '-',
                    '-',
                    '-'
            );
            update_row_table_description_type_region('zone',
                    '-',
                    '-',
                    '-'
            );
        }

        if (row == 'region') {
            update_row_table_description_type_region('zone',
                    '-',
                    '-',
                    '-'
            );
        }
        if(id_wbs){

            wbs_get_info_url_oi='/wbs/get_wbs_by_region/';
            if (window.ct_slug=='oi' && row=='region'){
                var params = {
                    "work_package": $('#id_work_package_text').val()
                };
                $.get(wbs_get_info_url_oi + id_wbs + '/', params, function (data) {
                    if(!data[0].errors){
                        description = data[0].attr._description;
                        type = data[0].attr._type;
                        region = data[0].attr._region;

                        update_row_table_description_type_region(row,
                            description,
                            type,
                            region
                        );
                    }

                }).fail(function(){

                });
            }
            else{
                $.get(window.wbs_get_info_url + id_wbs + '/', function (data) {
                    if(!data[0].errors){
                        description = data[0].attr._description;
                        type = data[0].attr._type;
                        region = data[0].attr._region;

                        update_row_table_description_type_region(row,
                            description,
                            type,
                            region
                        );
                    }

                }).fail(function(){

                });
            }

        }
    }

    function update_row_table_description_type_region(row, description, type, region) {
        $('#id_' + row + '_description').text(description);
        $('#id_' + row + '_type').text(type);
        $('#id_' + row + '_region').text(region);
    }

    $('body').on('change keyup', '.project', function () {
        $.get(window.wbs_get_company_url + $(this).val() + '/', function (data) {
            if (data.company_code) {
                if (data.company_code == 'BR11') {
                    $('.br81').hide();
                    $('.br81 input').removeAttr('checked');
                    $('.br11').show();
                }
                if (data.company_code == 'BR81') {
                    $('.br11').hide();
                    $('.br11 input').removeAttr('checked');
                    $('.br81').show();
                }
            }
        });

        get_description_type_region('project', $('.project').find(":selected").val());
    });

    $('body').on('change keyup','.region',function () {
        get_description_type_region('region', $('.region').find(":selected").val());
    });

    $('body').on('change keyup', '.zone', function () {
        get_description_type_region('zone', $('.zone').find(":selected").val());
    });


    $('.ajax_autocomplete').autocomplete(
            {
                source: function (request, response) {
                    var suggest = [];
                    $.get('/ajax_select/ajax_lookup/wbs_zip_id_partner',
                            {'q': request.term},
                            function (data) {
                                var re = /(\d+)\|(\d+)\|((?:\d+) - Site: (?:[0-9A-Za-z ]+\s|\t))/g;
                                var m = [];
                                data+='\t';
                                while ((m = re.exec(data)) !== null) {
                                    resp = {
                                        value: m[2],
                                        label: m[3]
                                    };
                                    suggest.push(resp);
                                }
                                return response(suggest);
                            }
                    );

                }

            });


    add_content_on_zi_table = function (response) {
        // Add one new line
        table = $('#selected_zi_partner');
        $('.empty').remove();
        new_line = new Object();
        content = response.content;

        tr = table.find('tr:last');
        tr.append($('<td class="check_wbs" id="wbs_' + content.wbs.join('-') + '"/>').append(content.zip_id_partner)); // zip_id_partner
        tr.append($('<td/>').append(content.plant.join(','))); // plants
        tr.append($('<td id="status_' + content.zip_id_partner + '"/>').append('waiting for response'));

        table.append($('<tr/>').append(''));

    };

    check_wbs_by_id = function () {
        wbs_list = new Array();
        $('.check_wbs').filter(function (i) {
            wbs_list.push($(this).attr('id'))
        });
        $.ajax({
            type: 'post',
            data: {'wbs': wbs_list,},
            cache: false,
            url: window.wbs_get_job_detail,
            success: function (response) {
                for (i in response) {
                    updated_status = response[i];
                    $('#status_' + updated_status).html('created');
                }
            }
        });
    };

}); // end document.ready
