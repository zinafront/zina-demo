$(function () {
    function change_prefix(text, new_prefix) {
        /*
         * replace prefix in selected position
         *
         * */
        var re;
        return text.replace(/(\d+)/, new_prefix);
    }

    function reorder_formset() {
        var $formset_container = $('#formset_forms');
        var i = $formset_container.find('#id_form-INITIAL_FORMS').val();
        i = parseInt(i);
        $.each($formset_container.find('.form_f-parent'), function (index, element) {
            var $form_row = $(this);

            $.each($form_row.find('label'), function (index, element) {
                var $label = $(this).parent().find('label');
                var attr_for = String($label.attr('for'));
                attr_for = change_prefix(attr_for, i);
                $label.attr('for', attr_for);
            });
            $.each($form_row.find('input,textarea'), function (index, element) {
                var $element = $(this);
                var attr_id = $element.attr('id');
                var attr_name = $element.attr('name');

                attr_id = change_prefix(attr_id, i);
                attr_name = change_prefix(attr_name, i);

                $element.attr('id', attr_id);
                $element.attr('name', attr_name);

            });
            $.each($(this).find('select'), function (index, element) {
                var $element = $(this);
                var attr_id = $element.attr('id');
                var attr_name = $element.attr('name');
                attr_id = change_prefix(attr_id, i);
                attr_name = change_prefix(attr_name, i);
                $element.attr('id', attr_id);
                $element.attr('name', attr_name);
            });

            // change prefix for cp parent
            $form_row.attr('data-prefix', i);
            //});
            i += 1;
        });
    }

    $('body').on('click', '.remove-formset-form', function () {
        var $this = $(this);
        swal(
            {
                title: "Are you sure?",
                text: "Your will not be able to recover this form!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
            },
            function () {
                var $formset_container = $('#formset_forms');
                var $form_row = $this.closest('.form_f-parent');

                var prefix = $form_row.attr('data-prefix');
                var $total_form = $formset_container.find('#id_form-TOTAL_FORMS');
                var importer_formset_prefix = $total_form.val();
                $form_row.remove();
                importer_formset_prefix = parseInt(importer_formset_prefix);
                importer_formset_prefix--;
                $total_form.val(importer_formset_prefix);
                reorder_formset();
            }
        );
    });

    $('body').on('click', '#add_formset_form', function () {

        var prefix = $(this).attr('data-prefix');
        var $formset_container = $('#formset_forms');
        var $total_form = $formset_container.find('#id_form-TOTAL_FORMS');
        var importer_formset_prefix = $total_form.val();
        importer_formset_prefix = parseInt(importer_formset_prefix);

        var str_form = $('#empty_form').html();

        str_form = str_form.replace(/__prefix__/g, importer_formset_prefix);
        $formset_container.append(str_form);

        importer_formset_prefix++;
        $total_form.val(importer_formset_prefix);
    });
});