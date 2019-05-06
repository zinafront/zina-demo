$( document ).ready(function() {
    $('#download_btn').hide();
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var minimalDate = new Date(now.getTime() - 5184000000);    // 5184000000 = 60 days

    $('#id_search_date').datepicker({
        format: 'yyyy/mm/dd',
        onRender: function (date) {
            // Disable the date before present.
            return date.valueOf() > now.valueOf() ? 'disabled' : '';
        }
    });

    var init_date = $('#id_search_date_initial').datepicker({
        format: 'yyyy/mm/dd',
        onRender: function (date) {
            // Disable the date before present.
            return (date.valueOf() < minimalDate.valueOf()) || (date.valueOf() > now.valueOf()) ? 'disabled' : '';
        }
    }).on('changeDate', function (ev) {
        if (ev.date.valueOf() > end_date.date.valueOf()) {
            var newDate = new Date(ev.date);
            newDate.setDate(newDate.getDate());
        }
        end_date.update(newDate);
        init_date.hide();
        $('#id_search_date_final')[0].focus();
    }).data('datepicker');

    var end_date = $('#id_search_date_final').datepicker({
        format: 'yyyy/mm/dd',
        startDate: '-30d',
        onRender: function (date) {
            return (date.valueOf() < init_date.date.valueOf()) || (date.valueOf() > now.valueOf()) ? 'disabled' : '';
        }
    }).on('changeDate', function (ev) {
        end_date.hide();
    }).data('datepicker');

    $('#clean_filters').on('click', function () {
        clear_fields('');
        $('#form_tim_filter').submit();
    });

});

$('#select_all').click(function () {
    var checked = this.checked;
    $(':checkbox').prop('checked', checked);
});

$('.chk').change(function () {
    if (($('#checkbox:checked').length) == 0) {
        $('#download_btn').hide()
    } else {
        $('#download_btn').show()
    }
});

$('#form_tim_filter').find('input').on('focus', function () {
    var selector = '';
    var inputs = $(this).parent().parent().find('input');
    $.each(inputs, function (index, item) {
        selector += '#' + $(this).attr('id');
        if (index < (inputs.length - 1)) {
            selector += ','
        }
    });
    clear_fields(selector);
});

function clear_fields(except_fields) {
    var $form_filter = $('#form_tim_filter');
    $form_filter.find('input:not(' + except_fields + ')').val('');
}

$('.invoice').on('keydown', function (event) {
    if (only_numbers(event)) {

    } else {
        event.preventDefault();
    }
});

function only_numbers(e) {
    key_press = (document.all) ? e.keyCode : e.which;
    console.log(e.keyCode);
    if (key_press == 13 || (key_press >= 37 && key_press <= 40) || key_press == 8 || key_press == 9) {
        return true;
    }
    pattern = /[0-9]/;
    final_key = String.fromCharCode(key_press);
    return pattern.test(final_key);
}
