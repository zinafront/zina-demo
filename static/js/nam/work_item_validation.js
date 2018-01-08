$(function () {
    $('.work-item-check').on('change', function () {
        if($('.work-item-check:checked').length > 0){
            $('#process_items').removeAttr('disabled')
        }else{
            $('#process_items').attr('disabled', 'disabled')
        }
    });
    
    $('.work-item-check-all').on('change', function () {
        console.log($('.work-item-check-all:checked').length)
        if($('.work-item-check-all:checked').length > 0) {
            console.log('checked')
            $('.work-item-check').prop('checked', true)
            $('#process_items').removeAttr('disabled')
        }else{
            console.log('unchecked')
            $('.work-item-check').prop('checked', false)
            $('#process_items').attr('disabled', 'disabled')
        }
        
    });
});