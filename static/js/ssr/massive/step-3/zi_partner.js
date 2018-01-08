/**
 * ZI partner handler
 */
var zi_partner_handler = {
    /**
     * Get value
     */
    urls: {
        add: window.zi_add_url,
        info: window.zi_info_url
    },

    forms_selector: {
        zi_add_form_selector: "#id_zip_id_partner_form",
        zi_edit_form_selector: "#zi-partner-edit-modal-{work_package} form"
    },

    get_value: function() {
      return $("#id_zi_partner").val();
    },

    /**
     * Hide info button
     */
    hide_info_button: function(select) {
        var button = $("#zi-partner-info-button");

        button.hide();
    },

    /**
     * Show info button
     */
    show_info_button: function(select) {
        var button = $("#zi-partner-info-button");

        button.show();
    },

    /**
     * Hide add button
     */
    hide_add_button: function(select) {
        var button = $("#zi-partner-add-button");

        button.hide();
    },

    /**
     * Show add button
     */
    show_add_button: function(select) {
        var button = $("#zi-partner-add-button");

        button.show();
    },

    /**
     * Init buttons
     */
    init_buttons: function() {
        $.each($('.zi-partner-select'), function(){
            var value = $(this).val();

            if (value == "") {
                $(this).parent().find('.zi-partner-info-button').hide();
            }
        });

    },

    /**
     * Select handler
     */
    events_handler: function() {
        var _this = this;

        $("body").on("change", ".zi-partner-select", function() {
            var value = $(this).val();
            var work_package = $(this).closest('.collapse-work-package').data('work-package');

            if (value == "") {
                $(this).parent().find('.zi-partner-info-button').hide()
            }
            else {
                $(this).parent().find('.zi-partner-info-button').show();
                _this.load_info_form(work_package, value);
            }

            wbs_handler.zi_partner_change_notification(work_package, value);

        });

        $('body').on('click', '.zi-partner-add-button', function(){
            var $work_package = $(this).closest('.collapse-work-package');

            var modal_content = $('.zip-id-modal-body-content[data-work-package='+ $work_package.data('work-package') +']').html();
            zi_partner_and_wbs_modal_handler.set_modal_body('#zi-partner-add-modal', modal_content);
            $('#zi-partner-add-modal').attr('data-work-package', $work_package.data('work-package'));
        });


        $('body').on('click', '.zi-partner-add-modal-save-new-button', function(){
            var work_package = $(this).closest('.modal').data('work-package');
             _this.send_add_form(work_package);
        });
    },

    /**
     * Load form
     */

    load_info_form: function(work_package, zip_id_partner){
        var _this = this;
        var url = _this.urls.info;

        var params = {
            "zip_id_partner_id": zip_id_partner,
            "work_package": work_package,
        };
        var modal_selector = '#zi-partner-edit-modal-'+work_package;
        zi_partner_and_wbs_modal_handler.set_modal_title(modal_selector, 'Edit ZI');
        zi_partner_and_wbs_modal_handler.set_modal_body(modal_selector, 'loading...');

        $.getJSON(
            url,
            params,
            function (data) {
                zi_partner_and_wbs_modal_handler.set_modal_body(modal_selector, data.html);
            }
        );
    },

    /**
     * Load add form
     */
    load_add_form: function(work_package) {
        var mode = 'add';

        var url = this.urls.add;

        var site = $('#collapse_work_package_'+work_package).find('.site-code').val();

        var params = {
            "site_name": site,
            work_package: work_package
        };

        $.getJSON(
            url,
            params,
            function (data) {
                $('.zip-id-modal-body-content[data-work-package='+ work_package +']').html(data.html);

                $('.collapse-work-package[data-work-package='+ work_package +']').find('.zi-partner-select').next('.input-group-btn').find('.zi-partner-add-button').show();
                //var zi_selector = '#zi-partner-add-modal-'+work_package;
                //zi_partner_and_wbs_modal_handler.set_modal_body(zi_selector, data.html);
                //zi_partner_and_wbs_modal_handler.set_modal_title(zi_selector, "New ZI partner");
                //zi_partner_and_wbs_modal_handler.init_buttons("zi_partner", data.mode);

                //if ($("#zi-partner-add-modal-save-new-button").is(":visible")) {
                    // Activate angular code
                //}
                //angular.element(document).ready(function() {
                //    angular.bootstrap(document, ["zipIdPartnerModule"]);
                //});
            }
        ).fail(function(data){
        });
    },

    change_form_edit: function(mode, work_package){
        var form_selector = this.forms_selector.zi_edit_form_selector.replace('{work_package}', work_package);
        var $edit_form = $(form_selector);

        if(mode == 'edit'){
            if(window.is_generic){
                $edit_form.find('#id_zip_code').removeAttr('readonly');
                $edit_form.find('#id_state').removeAttr('readonly');
                $edit_form.find('#id_state').removeAttr('disabled');
                $edit_form.find('#id_city').removeAttr('readonly');
                $edit_form.find('#id_city').removeAttr('disabled');
                $edit_form.find('#id_neighborhood').removeAttr('readonly');
                $edit_form.find('#id_number').removeAttr('readonly');
                $edit_form.find('#id_street').removeAttr('readonly');
                $edit_form.find('#id_complement').removeAttr('readonly');
            }else {
                $edit_form.find('#id_complement').removeAttr('readonly');
                $edit_form.find('#id_number').removeAttr('readonly');
                if (!$edit_form.find('#id_street').val()) {
                    $edit_form.find('#id_street').removeAttr('readonly');
                }
                if (!$edit_form.find('#id_neighborhood').val()) {
                    $edit_form.find('#id_neighborhood').removeAttr('readonly');
                }
            }
        }else{
            if(window.is_generic){
                $edit_form.find('#id_zip_code').attr('readonly', 'readonly');
                $edit_form.find('#id_state').attr('readonly', 'readonly');
                $edit_form.find('#id_state').attr('disabled', 'disabled');
                $edit_form.find('#id_city').attr('readonly', 'readonly');
                $edit_form.find('#id_city').attr('disabled', 'disabled');
                $edit_form.find('#id_neighborhood').attr('readonly', 'readonly');
                $edit_form.find('#id_number').attr('readonly', 'readonly');
                $edit_form.find('#id_street').attr('readonly', 'readonly');
                $edit_form.find('#id_complement').attr('readonly', 'readonly');
            }else {

                $edit_form.find('#id_complement').attr('readonly', 'readonly');
                $edit_form.find('#id_number').attr('readonly', 'readonly');
                $edit_form.find('#id_street').attr('readonly', 'readonly');
                $edit_form.find('#id_neighborhood').attr('readonly', 'readonly');
            }
        }

    },

    /**
     * Send add form
     */
    send_add_form: function(work_package) {

        var _this = this;
        var url = _this.urls.add;
        var $work_package = $('.collapse-work-package[data-work-package='+ work_package +']');
        var site_name = $work_package.find('.site-code').val();

        $(zi_partner_handler.forms_selector.zi_add_form_selector).find('select').removeAttr('disabled');
        var form = $(_this.forms_selector.zi_add_form_selector).serialize();
        var params = {
            "site_name": site_name,
            'work_package': work_package
        };

        url = url + "?" + $.param(params);

        $.post(
            url,
            form,
            function (data) {
                if(!window.is_generic) {
                    $(zi_partner_handler.forms_selector.zi_add_form_selector).find('select').attr('disabled', 'disabled');
                }
                zi_partner_and_wbs_modal_handler.show_errors(_this.forms_selector.zi_add_form_selector, data.success, data.message, data.errors);
                if(data.success){
                    _this.clean_add_form_fields();
                    var $zi_field = $work_package.find('.zi-partner-select');
                    $zi_field.append('<option value="'+ data.zip_id_partner.id + '">'+ data.zip_id_partner.name +'</option>');
                    $zi_field.val(data.zip_id_partner.id);
                }
            }
        );
    },

    clean_add_form_fields: function(){
        zi_partner_and_wbs_modal_handler.clean_form_fields(this.forms_selector.zi_add_form_selector, '#id_site_name,#id_project,#id_addition_info');
    },

    /**
     * Send update form
     */
    send_update_form: function(work_package) {
        var _this = this;
        var url = _this.urls.info;
        var zi_form_selector = _this.forms_selector.zi_edit_form_selector.replace('{work_package}', work_package);
        var form = $(zi_form_selector).serialize();
        var $zi_field = $('.collapse-work-package[data-work-package='+ work_package +']').find('.zi-partner-select');
        var zi_value = $zi_field.val();
        var params = {
            "zip_id_partner_id": zi_value,
            'work_package': work_package
        };

        url = url + "?" + $.param(params);

        $.post(
            url,
            form,
            function (data) {
                zi_partner_and_wbs_modal_handler.show_errors(zi_form_selector, data.success, data.message, data.errors);
                if(data.success){
                    $zi_field.find('option[value='+ data.zip_id_partner.id +']').html(data.zip_id_partner.name);
                }
            }
        );
    },

    /**
     * Initialize
     */
    init: function() {
        var _this = this;
        this.init_buttons();
        this.events_handler();

        $.each($('.collapse-work-package'), function(){
            var work_package = $(this).data('work-package');
            _this.load_add_form(work_package);
        });

        // get selected zi forms
        $('body').on('change', '.state', function () {

            if(window.is_generic){
                var $form = $(this).closest('form');

                $.getJSON(window.url_get_cities, {state: $(this).val()}, function (data) {
                    var $city = $form.find('.city');
                    wbs_handler.reset_select($city);
                    var cities = data.towns;
                    console.log($city);
                    cities.forEach(function (value, index, array) {
                        $city.append('<option value="'+ value.id +'">'+ value.name +'</option>')
                    });

                });
            }
        });



    }
};

/**
 * Init
 */
zi_partner_handler.init();

/**
 * -----------------------------------------------------------
 * Angular code
 */

if(!window.is_generic) {

    $(function () {
        $("#dialog-form").dialog({
            autoOpen: false,
            draggable: false,
            //#dialogClass: 'dialog-lock',
            width: 600
        });

        $("body").on('click', '#add_zi_partner', function (e) {
            $("#dialog-form").dialog('open');
        });

        $("body").on('click', '#id_cancel_submit', function (e) {
            $("#dialog-form").dialog('close');
        });

        $("body").on('click', '#id_aware_of_risks', function (e) {
            $("#dialog-form").dialog('close');
            $("#id_zip_id_partner_form").submit();
        });

        $("body").on('input paste', '#id_zip_code', function (e) {
            $('#id_zip_code').val($('#id_zip_code').val().replace(/[^\d]/g, ""));
        });
    });

    var zipIdPartnerModule = angular.module('zipIdPartnerModule', [], function ($locationProvider) {
        $locationProvider.html5Mode(false);
    });

    /* To avoid conflict between Django template tags and AngularJS */
    zipIdPartnerModule.config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
    });

    zipIdPartnerModule.controller('ZipIdPartnerFormCtrl', function ($scope, $http, $location) {
        var ZIP_CODE_HINT = {
            'default': 'Put only numbers. If you don’t know the CEP <a target="_blank" href=' + window.zi_cep_search_url + '>click here to search it.</a>',
            'searching': 'Searching Zip Code. Please wait...',
            'zip_code_not_found': 'Zip Code not found. You have to fill all the fields.',
            'zip_code_found': 'Zip Code found! Fill the required fields.',
            'error': 'Something gone wrong during the search of Zip Code.'
        };

        var ADDITION_INFO = {
            'BY_THE_SYSTEM': 1,
            'BY_THE_USER_WITH_VALID_ZIP_CODE': 2,
            'BY_THE_USER_WITH_INVALID_ZIP_CODE': 3
        };

        $scope.zip_code = angular.element('#zi-partner-add-modal #id_zip_code').val();
        $scope.street = angular.element('#zi-partner-add-modal #id_street').val();
        $scope.number = angular.element('#zi-partner-add-modal #id_number').val();
        $scope.complement = angular.element('#zi-partner-add-modal #id_complement').val();
        $scope.neighborhood = angular.element('#zi-partner-add-modal #id_neighborhood').val();
        $scope.brazil_town = angular.element('#zi-partner-add-modal #id_brazil_town').val();
        $scope.addition_info = angular.element('#zi-partner-add-modal #id_addition_info').val();

        showAddressFields = function (show) {
            show = true;

            if (show) {
                angular.element('#div_id_street').show();
                angular.element('#div_id_number').show();
                angular.element('#div_id_complement').show();
                angular.element('#div_id_neighborhood').show();
                angular.element('#div_id_brazil_town').show();
            } else {
                angular.element('#div_id_street').hide();
                angular.element('#div_id_number').hide();
                angular.element('#div_id_complement').hide();
                angular.element('#div_id_neighborhood').hide();
                angular.element('#div_id_brazil_town').hide();

                $scope.streetReadOnly = false;
                $scope.neighborhoodReadOnly = false;
                $scope.brazilTownReadOnly = false;
                $scope.addition_info = ADDITION_INFO['BY_THE_SYSTEM'];
            }
        };

        updateBrazilTown = function (locality_name, state_abbreviation) {
            if ((state_abbreviation == '') && (locality_name == '')) {
                var parameters = '';
            } else {
                var parameters = '?state=' + state_abbreviation + '&name=' + encodeURIComponent(locality_name);
            }

            var promise = $http({
                method: 'GET',
                url: '/brazil/api/list/' + parameters
            }).error(function (data, status, headers, config) {
                alert('Error getting Brazil Town list. Try agian later.');
            });

            promise.then(function (data) {
                if (data.data.length == 1) {
                    town = data.data[0];
                    $scope.brazil_town = town.id;
                }
            });
        };

        clearAddressFields = function () {
            $scope.street = '';
            $scope.streetReadOnly = false;

            $scope.number = '';
            $scope.complement = '';
            $scope.neighborhood = '';
            $scope.neighborhoodReadOnly = false;

            $scope.brazil_town = '';
            $scope.brazilTownReadOnly = false;
        };

        $scope.validateForm = function () {
            if ($scope.addition_info == ADDITION_INFO['BY_THE_SYSTEM']) {
                angular.element("#id_zip_id_partner_form").submit();
            } else {
                angular.element("#dialog-form").dialog('open');
            }
        };

        $scope.validateZipCode = function () {
            if (($scope.zip_code.length == 8) && (!isNaN($scope.zip_code))) {
                angular.element("#hint_id_zip_code").text(ZIP_CODE_HINT['searching']);

                var promise = $http({
                    method: 'GET',
                    url: '/cep/' + $scope.zip_code
                }).error(function (data, status, headers, config) {
                    angular.element("#hint_id_zip_code").text(ZIP_CODE_HINT['zip_code_not_found']);
                    $scope.addition_info = ADDITION_INFO['BY_THE_USER_WITH_INVALID_ZIP_CODE'];
                    clearAddressFields();
                    showAddressFields(true);
                });

                promise.then(function (data) {
                    var http_status_code = data.status;

                    switch (http_status_code) {
                        case 200:
                            angular.element("#hint_id_zip_code").text(ZIP_CODE_HINT['zip_code_found']);
                            clearAddressFields();

                            var result = data.data;

                            var item_type = result['item_type'];
                            var state_abbreviation = result['state_abbreviation'];
                            var locality_name = result['locality_name'];

                            if (item_type != 'locality') {
                                if (result['address_type']) {
                                    $scope.street = result['address_type'] + ' ' + result['address'];
                                } else {
                                    $scope.street = result['address'];
                                }
                                $scope.neighborhood = result['neighborhood_name'];
                                $scope.addition_info = ADDITION_INFO['BY_THE_SYSTEM'];

                                $scope.streetReadOnly = true;

                                if ($scope.neighborhood == '' || $scope.neighborhood == undefined) {
                                    $scope.neighborhoodReadOnly = false;
                                } else {
                                    $scope.neighborhoodReadOnly = true;
                                }

                                $scope.brazilTownReadOnly = true;
                            } else {
                                $scope.brazilTownReadOnly = true;
                                $scope.addition_info = ADDITION_INFO['BY_THE_USER_WITH_VALID_ZIP_CODE'];
                            }

                            updateBrazilTown(result['locality_name'], result['state_abbreviation'])
                            showAddressFields(true);

                            break;
                        default:
                            angular.element("#hint_id_zip_code").text(ZIP_CODE_HINT['error']);
                            showAddressFields(false);
                            break;
                    }
                });

            } else {
                angular.element("#hint_id_zip_code").html(ZIP_CODE_HINT['default']);
                showAddressFields(false);
            }
        };

        if (location.search == "?posted=true") {
            if (($scope.zip_code.length == 8) && (!isNaN($scope.zip_code))) {
                showAddressFields(true);
            } else {
                showAddressFields(false);
            }
        } else {
            showAddressFields(false);
        }

        angular.element("#hint_id_zip_code").html(ZIP_CODE_HINT['default']);
    });
}