// Zina basic slider 1.0 by JuanParido
$(function(){
    var slp = $('#prev');
    var sln = $('#next');
    var slcounter = $('.landing-slide-counter span');
    var totalslides = $('.landing-slide').length;
    var slindex = 1;
    slcounter.html(slindex+'/'+totalslides);
    sln.on('click',function(e){
        var slactive = $('.landing-slide.active');
        console.log(slactive.next().length);
        if(slactive.next().length == 0) {
            next = $('.landing-slide').first();
            slindex = '1';
        }
        else {
            next = slactive.next();
            slindex++;
        }
        slactive.fadeOut(300, function() {
            slactive.addClass('hide').removeClass('active');
        });
        next.fadeIn(300, function(){
            next.addClass('active').removeClass('hide');
        });
        slcounter.html(slindex+'/'+totalslides);
    });
    slp.on('click',function(e){
        var slactive = $('.landing-slide.active');
        if(slactive.prevAll().length == 3) {
            prev = $('.landing-slide').last();
            slindex = $('.landing-slide').length;
        }
        else {
            prev = slactive.prev();
            slindex--;
        }
        slactive.fadeOut(300, function() {
            slactive.addClass('hide').removeClass('active');
        });
        prev.fadeIn(300, function(){
            prev.addClass('active').removeClass('hide');
        });

        slcounter.html(slindex+'/'+totalslides);
    });
});