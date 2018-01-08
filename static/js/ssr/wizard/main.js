var original_form_hash = "";
var hot;
var container1;

var red_cell_composed_by_render = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.color = 'red';
};

var green_cell_composed_by_render = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.color = 'green';
};

// Init Hands on Table
function init_hot() {
    var i;

    if(!hot) {
        hot = new Handsontable(container1, {
            startRows: 8,
            startCols: 2,
            minSpareRows: 20,
            rowHeaders: true,
            contextMenu: true,
            columnSorting: true,
            colWidths: [
                50,
                200
            ],
            height: 305,
            stretchH: 'all',
            colHeaders: [
                'Work packages',
                'Results'
            ],
            //colWidths: [120, 360],
            columns: [
                {
                    type: 'numeric'
                },
                {
                    readOnly: true
                }
            ],
            cells: function (row, col, prop) {
                var cellProperties = {};

                if (col == 1) {
                    if (this.instance.getDataAtRow(row)[1] === "Success") {
                        cellProperties.renderer = green_cell_composed_by_render;
                    }
                    else {
                        cellProperties.renderer = red_cell_composed_by_render;
                    }
                }

                return cellProperties;
            }
        });

        if (window.wp_list.length > 0) {
            hot.loadData(window.wp_list);
        }
    }
}

function generate_form_hash() {
    original_form_hash = null;
    if ($(".massive-ssr-form").length) {
        original_form_hash = $(".massive-ssr-form").serializeHash();
    }
}

function fill_form_step_1() {
    var data;
    var work_packages_list;
    var i;

    if (!hot)
        return ;

    data = hot.getData();
    work_packages_list = [];
    for (i = 0; i < data.length; i++) {
        if (data[i][0] != "" && data[i][0] !== null && data[i][0] !== undefined)
            work_packages_list.push(data[i][0]);
    }

    $('#id_workpackage_text').val(work_packages_list.join(';'));
}

function check_form_hash(tab_id) {
    var is_equal;
    var s1;
    var s2;
    var new_form_hash;

    // if not hash
    if (original_form_hash === null) {
        return true;

    }

    if (current_tab == 1 && hot) {
        fill_form_step_1();
    }

    // get strings
    new_form_hash = $(".massive-ssr-form").serializeHash();
    s1 = JSON.stringify(original_form_hash);
    s2 = JSON.stringify(new_form_hash);

    // compare hashes
    is_equal = s1 == s2;

    // if not equal you can't go any tab, forcing to save first
    if (!is_equal) {
        return false;
    }

    // if moving to the right
    if (tab_id == current_tab + 1) {
        $(".ssr-next-button").trigger("click");
        return false;
    }

    if (tab_id <= max_visited_tab) {
        return true
    }

    return false;
}

function hide_services_selected(work_package) {
    // hide work item selecteds
    var $services;
    if (work_package){
        $services = $('td[data-work-package='+ work_package +']').find('.service-step-2');
    }else{
        $services = $('.service-step-2');
    }

    $services.find('option').show();
    $.each($services, function () {
        var id_selected = $(this).val();
        if (id_selected) {
            var work_package_id = $(this).parent().data('work-package');

            $('td[data-work-package='+ work_package_id +']').find('.service-step-2').not('#' + $(this).attr('id')).find('option[value=' + id_selected + ']').hide();
        }

    });
}

$(function () {

    $("#ssr_steps_tabs li a").on("click", function(evt) {
        var tab_id;

        $(this).blur();

        tab_id = $(this).attr("id").split("-")[1];

        if (tab_id > current_tab && !check_form_hash(tab_id)) {
            return false;
        }
    });

    // Calulate uploader percentage
    $(function () {
        var $ppc = $('.progress-pie-chart'),
            percent = parseInt($ppc.data('percent')),
            deg = 360 * percent / 100;
        if (percent > 50) {
            $ppc.addClass('gt-50');
        }
        $('.ppc-progress-fill').css('transform', 'rotate(' + deg + 'deg)');
        $('.ppc-percents span').html(percent + '%');
    });

    // Show/Hide importation tools
    $("#btn-importer").click(function () {
        $("#importer").slideToggle("slow");
        $('#table').fadeOut("fast");
    });

    container1 = document.getElementById('work-packages-hot');

    $('.upload-work-packages').on('click', function(){
        fill_form_step_1();
        $('#form_import_work_packages').submit();
    });

    $('#btn_next_step_2').on('click', function(){
        var $form = $('#form_import_work_packages');

        $form.attr('action', './?next_step=2');
        $form.find('.upload-work-packages').trigger('click');
    });

    $('#submit_step_2').on('click', function(evt){
        evt.preventDefault();
        $(this).blur();

        var empty_selects = 0;
        var nonempty_selects = 0;

        $.each($('#form_step_2 select.service-step-2'), function() {
            if ($(this).val() == '')
                empty_selects += 1;
            else
                nonempty_selects += 1;
        });

        if (nonempty_selects == 0) {
            sweetAlert(
                "Warning",
                "You have to select at least one service",
                "warning"
            );
        }
        else {
            $('#form_step_2').submit();
        }
    });

});