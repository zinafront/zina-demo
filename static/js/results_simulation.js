var resultsSimulation = function(){
    current = $('.current-panel');
    seconds = 0;
    percentage = $('.progress-bar span');
    $items = $('.panel-info').length;
    setInterval(function(){
        if($('.panel-info').length > 0){
            currTitle = $('.current-panel .panel-title');
            current.removeClass('panel-info');
            current.addClass('panel-success');
            $swap = currTitle.html().replace('Waiting to be executed', 'Created on SAP');
            currTitle.html($swap);
            $swap = currTitle.html().replace('fa-clock-o', 'fa-check');
            currTitle.html($swap);
            current.removeClass('current-panel');
            current = current.next();
            current.addClass('current-panel');
            seconds++;
            percentual = Math.floor((seconds/$items) * 100);
            //console.log('items ' + $items + ' seconds ' + seconds + ' percentual ' + percentual);
            $('.progress-bar').css('width', percentual + '%');
            percentage.text(percentual + "% Completed");
            $('#total_waiting').text($items - seconds);
            $('#total_created').text(seconds);
            if(percentual >= 100) {
                $('.progress-bar').removeClass('progress-bar-info');
                $('.progress-bar').addClass('progress-bar-success');
                percentage.css('color','white');
            }
        }
    },1000);
}