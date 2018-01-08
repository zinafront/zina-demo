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

        $("body").on("shown.bs.modal", "#zi-partner-add-modal", function (e) {
            var zi_add_form = '#id_zip_id_partner_form';

            _this.clean_errors(zi_partner_handler.forms_selector.zi_add_form_selector);
            zi_partner_handler.clean_add_form_fields();
            if(!window.is_generic) {
                $(zi_partner_handler.forms_selector.zi_add_form_selector).find('select').attr('disabled', 'disabled');
                angular.element(document).ready(function () {
                    angular.bootstrap(document, ["zipIdPartnerModule"]);
                });
            }
        });

        $("body").on("shown.bs.modal", "#zi-partner-edit-modal", function (e) {
            _this.clean_errors(zi_partner_handler.forms_selector.zi_edit_form_selector);
            _this.set_modal_title("#zi-partner-edit-modal", "ZI partner information");
            _this.init_buttons_edit_zi('info');
            zi_partner_handler.change_form_edit('info');

        });

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
    edit_button_handler: function() {
        var _this = this;

        $("body").on("click", "#zi-partner-edit-modal-edit-button", function() {
            _this.set_modal_title("#zi-partner-edit-modal", "Edit ZI partner information");
            _this.init_buttons_edit_zi('edit');
            zi_partner_handler.change_form_edit('edit');
        });
    },

    /**
     * Save modify button handler
     */
    save_modify_button_handler: function() {
        var _this = this;

        $("body").on("click", "#zi-partner-edit-modal-save-edit-button", function() {
            zi_partner_handler.send_update_form();
        });

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
            zi_partner_handler.change_form_edit('info');

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