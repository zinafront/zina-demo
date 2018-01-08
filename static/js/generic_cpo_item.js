/**
 * Created by akedion on 7/24/17.
 */
$(function() {
    // Handler for .ready() called.
    $('.unlink_item_bl').on('click', function(evt){
        evt.preventDefault();
        $('#linked_bl_id').val($(this).data('link_id'));
        $('#unlink_bl_modal').modal('show');
    });
    // Clean modal linker field
    $('#unlink_bl_modal').on('hidden.bs.modal', function () {
        $('#linked_bl_id').val('');
        $('#opportunity_modal_success').html('');
        $('#opportunity_modal_error').html('');
    });
    $('#unlink_cpo_item_to_opportunity').on('click', function(evt){
        evt.preventDefault();
        var unlink_id = $('#linked_bl_id').val();
        $('#opportunity_modal_success').html('');
        $('#opportunity_modal_error').html('');
        $.post(window.unlink_url, {unlink_id:unlink_id}, function (data) {
            if(data.status == 200){
                $('#opportunity_modal_success').html(data.message);
                setTimeout(function(){ location.reload(); }, 800);
            }
            else{
                $('#opportunity_modal_error').html(data.message);
            }
        });
    });
});