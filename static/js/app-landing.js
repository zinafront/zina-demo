$( document ).ready(function() {

	/******************************************************************************
    Common use
    *******************************************************************************/

	// Instance the tour
	var tour = new Tour({
		steps: [
			{
				element: "#get_access",
				title: "Get access to ZINA WORKFLOW",
				placement: "bottom",
				backdrop: true,
				animation: true,
				content: "Click here and fill out the form to get access to ZINA Workflow. You will get an email with you user and password soon.",

			},
			{
				element: "#go-to-flow",
				title: "Go to ZINA WORKFLOW",
				placement: "bottom",
				backdrop: true,
				animation: true,
				content: "Click here to access all ZINA Workflow tools.",

			},
			{
				element: "#twitter_conteiner",
				title: "ZINA tweets",
				placement: "top",
				backdrop: true,
				animation: true,
				content: "Check lastest tweets from ZINA team."
			},
			{
				element: ".show-pop-up",
				title: "Monthly information",
				placement: "top",
				backdrop: true,
				animation: true,
				content: "Click here to display the monthly infornation."
			}
		],
		template:"<div class='popover' role='tooltip'>\
			<div class='arrow'></div>\
				<h3 class='popover-title'></h3>\
				<div class='popover-content'></div>\
				<div class='popover-navigation'>\
					<div class='btn-group'>\
						<button class='btn btn-sm btn-primary' data-role='prev'>&laquo; Prev</button>\
						<button class='btn btn-sm btn-primary' data-role='next'>Next &raquo;</button>\
						<button class='btn btn-sm btn-primary' data-role='pause-resume' data-pause-text='Pause' data-resume-text='Resume'>Pause</button>\
					</div>\
					<button class='btn btn-sm btn-danger' data-role='end'>End tour</button>\
				</div>\
			</div>"
	});



	/******************************************************************************
    Top nav bar
    *******************************************************************************/
    /*Fixed navbar */
    var num = 130; //pixels to fix navbar
    $(window).scroll(function(){
        if ($(window).scrollTop() > num) {
            $("#navbar .nav-bar-logo").fadeIn("slow");
            $("#navbar").addClass("fixed", 1000);
            $("#global-search .input-group").detach().appendTo('#global-search-top')
        } else {
            $("#navbar").removeClass("fixed", 1000);
            $("#global-search-top .input-group").detach().appendTo('#global-search');
            $("#navbar .nav-bar-logo").hide();
        }
    });

	//show guided tour after close popup
    $(".close").click(function(){
    	if (!$(this).hasClass("no_tour")) {

			/* Initialize the tour*/
			tour.init();
			/* Start the tour */

 			tour.start();

			/* Uncomment if you want to show everytime.*/
			// tour.restart();

			/*Add class to modal*/
    		$(this).addClass("no_tour");
    	}
    });

    /******************************************************************************
    Change color of See news tab if user scroll up to the bottom
    *******************************************************************************/
    $(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
			$(".show-pop-up").addClass("show-pop-up-invert");
		}
		else{
			$(".show-pop-up").removeClass("show-pop-up-invert");
		}
	});

	/******************************************************************************
    Guided tour
    *******************************************************************************/
    $("#help").click(function(event){
    	event.preventDefault();
		// Initialize the tour
		tour.init();
		// Start the tour
		tour.start();
		tour.restart();
    });


	/******************************************************************************
    Testimonial slider
    *******************************************************************************/
    $(function(){
    	$("#slides-test").superslides({
    		pagination: true,
    		play: 10000,
        	animation_speed: 1500,
        	inherit_width_from: '#testimonial',
      		inherit_height_from: '#testimonial'
    	})
    })






    /******************************************************************************
    smooth scroll
    *******************************************************************************/
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({scrollTop: target.offset().top}, 1000);
					return false;
				}
			}
		});
	});

	/******************************************************************************
    Go top
    *******************************************************************************/

	// hide go top icon
    $("a[href='#top']").hide();
    // show/hide go top icon
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 400) {
                $("a[href='#top']").fadeIn();
            } else {
                $("a[href='#top']").fadeOut();
            }
        });
    });
    setTimeout("display()",1000);


});
