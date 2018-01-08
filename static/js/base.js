"use strict";

/*global $, window, document, alert, location */

var ZC = {
    activateAccordion: function (header) {
        // Accordion
        $(".accordion").accordion({
            collapsible: true,
            clearStyle: true,
            header: header,
            navigation: true
        });

    }
};

var IN = {
    open: false,
    toogle: function () {
        var that;
        that = this;
        $('#inbox-ear').bind('click',
            function () {
                var mult = 0;
                if (IN.open) {
                    mult = -1;
                }
                $('#inbox-tasks').animate({
                    "margin-right": ($('#inbox-tasks').outerWidth() + 4) * mult
                });
                $('#inbox-tasks-placeholder').load("/zinbox/infobox_results/");
                IN.open = !IN.open;
            });
    }
};

var FILTER = {
    activate: function () {
        // Auto submits the form when it changes.
        $('#filter-form').change(function () {
            $('#filter-form').submit();
        });
    }
};

var ACTION = {
    activate: function () {
        ACTION.update();
        $('#id_action').change(function () {
            ACTION.update();
        });
    },

    update: function () {
        $('#id_action option:selected').each(function () {
            if ($(this).val() === 'change') {
                $('#action-form .process-date').fadeIn('slow');
            }
            else {
                $('#action-form .process-date').hide();
            }

            if ($(this).val() !== 'none') {
                $('#action-form .submit').fadeIn('slow');
            }
            else {
                $('#action-form .submit').hide();
            }
        });
    }
};

/* TODO this funcion was commented by problems with bootstrap datepicker
   If not result problems with this function please delete
var DATEPICKER = {
    // Setups the date pickers
    activate: function () {
        $('input.dateinput').datepicker({
            dateFormat: 'yy-mm-dd'
        });
    }
};
*/

var POPUP = {
    // Setups the pop-ups links
    activate: function () {
        $('.popup-buttom').click(function () {
            var win = window.open($(this).attr('href'), 'Zina', 'height=700,width=800,scrollbars=1');
            win.focus();
            return false;
        });
    }
};

var FORM = {
    lock: function () {
        $('#dialog-formsubmit').dialog({
            modal: true,
            dialogClass: 'dialog-lock',
            draggable: false,
            resizable: false
        });
    },

    unlock: function () {
        $('#dialog-formsubmit').dialog('close');
    },

    activate_jstree: function () {

    },

    flat_attrs: function (attrs) {
        // Converts an object into HTML tag properties, attributes with the value
        // equals to null are ignored
        var key, html;

        html = '';
        for (key in attrs) {
            if (attrs.hasOwnProperty(key) && attrs[key] !== null) {
                html += key + '="' + attrs[key] + '" ';
            }
        }
        return html;
    },

    render_field: function (field) {
        // TODO: This needs some DRY...
        var html, i;

        html = '';
        if (field.type === 'TextInput') {
            html += '<label for="' + field.name + '">' + field.label + '</label>';
            html += '<input type="text" ';

            // Add extra attributes
            field.attrs.id = field.id;
            field.attrs.name = field.name;
            field.attrs.value = field.value;

            html += this.flat_attrs(field.attrs);
            html += '/>';
        }
        else if (field.type === 'HiddenInput') {
            html += '<input type="hidden" ';

            // Add extra attributes
            field.attrs.id = field.id;
            field.attrs.name = field.name;
            field.attrs.value = field.value;

            html += this.flat_attrs(field.attrs);
            html += '/>';
        }
        else if (field.type === 'Select') {
            html += '<label for="' + field.name + '">' + field.label + '</label>';
            html += '<select ';

            // Add extra attributes
            field.attrs.id = field.id;
            field.attrs.name = field.name;

            html += this.flat_attrs(field.attrs);
            html += '>';

            // Render the select options
            for (i = 0; i < field.options.length; i++) {
                html += '<option value="' + field.options[i].value + '" ';
                if (field.options[i].selected === true) {
                    html += 'selected="selected" ';
                }
                html += '>' +
                field.options[i].label +
                '</option>';
            }

            html += '</select>';
        }
        else if (field.type === 'AutoCompleteWidget') {
            html += '<label for="' + field.name + '">' + field.label + '</label>';
            html += field.widget;
        }
        else if (field.type === 'AutoCompleteSelectWidget') {
            html += '<label for="' + field.name + '">' + field.label + '</label>';
            html += field.widget;
        }
        else {
            console.error('Invalid type: ' + field.type);
        }

        if (field.errors.length !== 0) {
            html += '<div class="ui-state-error ui-corner-all">';
            for (i = 0; i < field.errors.length; i++) {
                html += '<p>' +
                '<span class="ui-icon ui-icon-alert" style="float:left; margin:2px 2px 0px 3px"></span>' +
                field.errors[i] + '</p>';
            }
            html += '</div>';
        }

        return html;
    },

    prepare_submit: function (form) {
        var field, fields, i, tag_name, submit;

        submit = {
            name: $("#form-holder").attr('pk'),
            fields: {}
        };

        fields = form.find('fieldset input').add('fieldset select');
        for (i = 0; i < fields.length; i++) {
            submit.fields[$(fields[i]).attr('name')] = $(fields[i]).attr('value');
        }

        return submit;
    },

    show_form: function (form, on_submit) {
        var i, html, that = this;

        html = '';

        if (form.errors && (form.errors.length !== 0)) {
            html += '<div class="ui-state-error ui-corner-all" style="margin:13px 0px -10px 0px;">';
            for (i = 0; i < form.errors.length; i++) {
                html += '<p>' +
                '<span class="ui-icon ui-icon-alert" style="float:left; margin:2px 2px 0px 3px"></span>' +
                form.errors[i] + '</p>';
            }
            html += '</div>';
        }

        for (i = 0; i < form.fields.length; i++) {
            html += '<p class="form-field">' + this.render_field(form.fields[i]) + '</p>';
        }

        $("#form-holder").attr('title', form.title); // Updates the form title
        $("#form-holder").attr('pk', form.name);     // Stores the name in a custom attribute
        $("#form-holder fieldset").html(html);

        $("#form-holder")
            .dialog({
                //resizable: false,
                height: 400,
                width: 'auto',
                modal: true,
                closeOnEscape: true,
                beforeClose: function (event, ui) {
                    FORM.unlock();
                },
                buttons: {
                    Submit: function () {
                        var submit_data = that.prepare_submit($(this));
                        on_submit(submit_data, $(this));
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                },
                open: function () {
                    $(this).parents('.ui-dialog-buttonpane button:eq(0)').focus();
                }
            });

        $('#form-holder').height($('.ui-dialog fieldset').height() + 70);
    },

    is_number: function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },

    is_integer: function (n) {
        return !isNaN(parseInt(n)) && (parseFloat(n) == parseInt(n));
    }
};

var MASK = {
    load: function () {
        $.mask.definitions['1'] = '[0-1]';
        $.mask.definitions['2'] = '[0-2]';
        $.mask.definitions['3'] = '[0-3]';
    }
};

if (typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function () {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

if (typeof String.prototype.startswith != 'function') {
    String.prototype.startswith = function (str) {
        return this.indexOf(str) == 0;
    };
}

var base = {
    loadPanels: function () {
        return panels.init();
    }
};

$(document).ready(function () {
    // Activate the inbox
    IN.toogle();

    // Activates the accordion
    //extras.getScriptSafe(window.__MEDIA_URL__ + "js/panels.js", base.loadPanels);

    // Activate the Filter Form auto-submit
    FILTER.activate();
    ACTION.activate();

    /* TODO this funcion was commented by problems with bootstrap datepicker
    * If not result problems with this function please delete
    * */
    // Active the date pickers
    //DATEPICKER.activate();

    POPUP.activate();

    // $.jstree._themes = window.__MEDIA_URL__ + 'jstree/themes/';

    // Enable the JSTree fields
    // FORM.activate_jstree();

    // Locks the form when the user click on submit
    $('.buttonHolder input').click(function () {
        if (window.disable_waiting_panel == true) {
            return
        }
        FORM.lock();
    });

    // if ($.browser.msie) {
    //     $('tbody tr:odd td').addClass('td_even');
    // }

    // Sets document title based on h1
    var h1 = $('#container h1');
    if (h1) {
        var title = h1.text().trim();
        if (title) {
            document.title = 'Zina - ' + title + ' - Workflow management';
        }
    }

    if ($('#twitter').length) {
        $('#twitter').tipsy({html: true, gravity: 'e', fallback: "Connection time out", delayIn: 500, delayOut: 1000});

    }

    if ($("#id_zip_code").length) {
        $("#id_zip_code").onlyNumber();
    }

    if ($(".only_number").length) {
        only_numbers($(".only_number"));
    }

    if ($(".only_percent").length) {
        $(".only_percent").onlyPercent();
    }

    function only_numbers(ele){
        /*
         *  This function validate for fields only receive numbers
         */
        $(ele).keypress(function (evt) {
            //if the letter is not digit then display error and don't type anything
            if (evt.which != 8 && evt.which != 0 && (evt.which < 48 || evt.which > 57)) {
                return false;
            }
        });
    }

    //add new combobox
    //$('select#id_application').selectmenu({
    //    change: function(e) {
    //       if ($(this).val()){
    //           $('#tiptip_holder').hide();
    //       }else{
    //           $('#tiptip_holder').css('display','inline-block');
    //       }
    //    }
    //});
});


