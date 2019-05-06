$(function () {
    var $modal = $('#modal_workflow_step');
    $('.btn-next-step').on('click', function () {
        var id_next_step = $(this).data('next-step');
        var id_current_step = $(this).data('current-step');
        var btn_label = $(this).data('btn-label');
        var btn_class = $(this).attr('class');
        var modal_title = 'Continue to step: ' + $(this).data('next-step-name');
        $modal.find('#next_step').val(id_next_step);
        $modal.find('#current_step').val(id_current_step);
        $modal.find('#btn_next_step').html(btn_label);
        $modal.find('#btn_next_step').attr('class', btn_class);
        $modal.find('#modal_approve_label').html(modal_title);
        $form.find('.alert').remove();
        $modal.modal('show');
    });

    var $form = $modal.find('form');

    $('#btn_next_step').on('click', function () {
        console.log($form);
        console.log($form.serializeObject());
        $.post(
            $form.attr('action'),
            $form.serializeObject(),
            function (data) {
                $form.find('.alert').remove();
                var alert_class;
                if (!data.success)
                {
                    alert_class = 'alert-warning';

                }else{
                    alert_class = 'alert-success';
                }

                $form.prepend('<div class="alert '+ alert_class +' alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+ data.message +' </div>');
                // $form.
                if (data.success) {
                    window.location.reload();
                }
            }
        )
    });

    $form.on('submit', function (evt) {
        evt.preventDefault();
        return 0;
    })
});

function confirm_form() {

    if (document.getElementById("confirm-aprobbal").checked == false){
        $('#confirm-aprobbal').val(0);
    }else {
        $('#confirm-aprobbal').val(1);
    }
}