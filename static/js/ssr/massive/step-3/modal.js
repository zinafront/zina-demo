/**
 * Modal handler
 */
var zi_partner_and_wbs_modal_handler = {
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

    init_buttons_edit_zi: function(mode, work_package) {
        var $modal_work_package_edit = $('#zi-partner-edit-modal-'+work_package);
        $("#zi-partner-edit-modal-close-button").show();

        switch (mode) {
            case 'info':

                $modal_work_package_edit.find('.modal-back-button').hide();
                $modal_work_package_edit.find('.modal-save-edit-button').hide();
                $modal_work_package_edit.find('.modal-edit-button').show();

                break;

            case 'edit':
                $modal_work_package_edit.find('.modal-back-button').show();
                $modal_work_package_edit.find('.modal-save-edit-button').show();
                $modal_work_package_edit.find('.modal-edit-button').hide();
                break
        }
    },

    /**
     * Show event handler
     */
    show_event_handler: function() {
        var _this = this;

        $("body").on("shown.bs.modal", "#zi-partner-add-modal", function (e) {

            _this.clean_errors(zi_partner_handler.forms_selector.zi_add_form_selector);
            zi_partner_handler.clean_add_form_fields();
            if(!window.is_generic) {
                $(zi_partner_handler.forms_selector.zi_add_form_selector).find('select').attr('disabled', 'disabled');
            }
            if(!window.is_generic){
                angular.element(document).ready(function() {
                    angular.bootstrap(document, ["zipIdPartnerModule"]);
                });
            }

        });

        $("body").on("shown.bs.modal", ".zi-partner-edit-modal", function (e) {
            var work_package = $(this).data('work-package');
            var form_selector = zi_partner_handler.forms_selector.zi_edit_form_selector.replace('{work_package}', work_package);
            _this.clean_errors(form_selector);
            _this.set_modal_title("#zi-partner-edit-modal-"+work_package, "ZI partner information");
            _this.init_buttons_edit_zi('info', work_package);
            zi_partner_handler.change_form_edit('info', work_package);

        });

        $("body").on("show.bs.modal", ".wbs-modal-add", function (e) {
            var form_selector = '#' + $(this).attr('id') + ' ' + wbs_handler.forms_selector.add;
            _this.clean_errors(form_selector);
            $(form_selector).find('select').val('');
        });
    },

    /**
     * Edit button handler
     */
    edit_button_handler: function() {
        var _this = this;

        $("body").on("click", ".modal-edit-button", function() {
            var work_package = $(this).closest('.modal').data('work-package');
            _this.set_modal_title("#zi-partner-edit-modal-" + work_package, "Edit ZI partner information");
            _this.init_buttons_edit_zi('edit', work_package);
            zi_partner_handler.change_form_edit('edit', work_package);
        });
    },

    /**
     * Save modify button handler
     */
    save_modify_button_handler: function() {
        var _this = this;

        $("body").on("click", ".modal-save-edit-button", function() {
            var work_package = $(this).closest('.modal').data('work-package');
            zi_partner_handler.send_update_form(work_package);
        });
    },

    /**
     * Back button handler
     */
    back_button_handler: function() {
        var _this = this;

        $("body").on("click", ".modal-back-button", function() {
            var work_package = $(this).closest('.modal').data('work-package');

            var title = _this.set_modal_title('#zi-partner-edit-modal-'+work_package ,"ZI partner information"); // Get title
            _this.init_buttons_edit_zi('info', work_package);
            zi_partner_handler.change_form_edit('info', work_package);

        });
    },

    /**
     * Initialize
     */
    init: function() {
        this.show_event_handler();
        this.edit_button_handler();
        this.back_button_handler();
        this.save_modify_button_handler();
    }
};

/**
 * Init
 */
zi_partner_and_wbs_modal_handler.init();