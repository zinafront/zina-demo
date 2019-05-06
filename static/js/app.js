$(document).ready(function () {

    /******************************************************************************
     Top nav bar
     *******************************************************************************/
    /*Fixed navbar */
    var num = 115; //pixels to fix navbar
    $(window).scroll(function () {
        if ($(window).width() > 480) {
            if ($(window).scrollTop() > num) {
                $(".demo-logo").hide();
                $("#navbar .nav-bar-logo").fadeIn("fast");
                $("#navbar").addClass("fixed", 300);
                $("#global-search .input-group").detach().appendTo('#global-search-top');
                $('.top-icons-container').removeClass('col-xs-5').addClass('col-xs-4');
                $("#global-search-top").removeClass('hide');
                $("#message-center").addClass('hide');
                $("#navbar").removeClass('fwc');
            } else {
                $(".demo-logo").show();
                $("#navbar .nav-bar-logo").hide();
                $("#navbar").removeClass("fixed");
                $("#global-search-top .input-group").detach().appendTo('#global-search');
                $("#global-search-top").addClass('hide');
                $("#message-center").removeClass('hide');
                $("#navbar").addClass('fwc');
            }
        }
    });

    /******************************************************************************
     Popup onload
     *******************************************************************************/
    $(window).load(function () {
        $("#pop-up-news").modal("show");
        $("body").removeAttr("style");
        // Set count down to hide popup
        function c() {
            var n = $('.c').attr('id');
            var c = n;
            $('.c').text(c);
            setInterval(function () {
                c--;
                if (c >= 0) {
                    $('.c').text(c);
                }
                if (c == 0) {
                    $("#pop-up-news").fadeOut();
                    $("body").removeClass("modal-open").removeAttr("style");
                    $('.c').hide();
                }
            }, 1000);
        }

        // Start function
        c();

    });

    /******************************************************************************
     Change color of See news tab if user scroll up to the bottom
     *******************************************************************************/
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $(".show-pop-up").addClass("show-pop-up-invert");
        }
        else {
            $(".show-pop-up").removeClass("show-pop-up-invert");
        }
    });


    /******************************************************************************
     smooth scroll
     *******************************************************************************/
    // This section was commented because is generating conflicts with some bootstrap widgets like accordions and tabs
    // $(function () {
    //     $('a[href*=#]:not([href=#])').click(function () {
    //         if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    //             var target = $(this.hash);
    //             target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //             if (target.length) {
    //                 $('html,body').animate({scrollTop: target.offset().top}, 1000);
    //                 return false;
    //             }
    //         }
    //     });
    // });

    $('.filter-btn').click(function () {
        if ($('button span').hasClass('glyphicon-chevron-down')) {
            $('.filter-btn').html('<span class="glyphicon glyphicon-chevron-up"></span> Hide filter');
        }
        else {
            $('.filter-btn').html('<span class="glyphicon glyphicon-chevron-down"></span> Display filter');
        }
    });

    /******************************************************************************
     Date Picker
     *******************************************************************************/
    /*Date picker loader*/
    try {
        $('.datepicker:not([readonly="readonly"])').datepicker({
            format: 'yyyy/mm/dd'
        });
    } catch (err) {

    }
    /******************************************************************************
     END of date Picker
     *******************************************************************************/

    /******************************************************************************
     Date plugin (Calendar)
     *******************************************************************************/

    /*Date Range*/
    load_date_ranges();

    /******************************************************************************
     END Date plugin
     *******************************************************************************/


    /******************************************************************************
     Uploader file input box
     *******************************************************************************/
    /*Upload files*/
    $("input[type='file']").fileinput({
        overwriteInitial: false,
        maxFileSize: 0,
        maxFilesNum: 10,
        showUpload: false,
        showPreview: 0,
        slugCallback: function (filename) {
            filename = filename.replace('C:\\fakepath\\','');
            return filename.replace('(', '_').replace(']', '_');
        }
    });

    /******************************************************************************
     END Uploader file input box
     *******************************************************************************/


    /******************************************************************************
     multi select plugin
     *******************************************************************************/
    /*Multi select plugin*/
    $('.multiSelect').multiselect({
        maxHeight: 200,
        includeSelectAllOption: true,
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        filterPlaceholder: 'Type text to search',
        numberDisplayed: 7,
        nonSelectedText: 'Select a option',

    });

    /******************************************************************************
     END OF multiselect
     *******************************************************************************/


    /******************************************************************************
     Multi select 2 cols, different plugin that multiselect described above
     *******************************************************************************/

    //Demand plan and logistic demand plan Price list configuration
//    $('#select-2-cols-price-list').multiSelect({
//		selectableHeader: "<div class='custom-header'><div>Available price lists</div><div class='input-group'><span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span><input class='form-control search-input' autocomplete='off' type='text' placeholder='Type text to search'</div></div>",
//		selectionHeader: "<div class='custom-header'><div>Chosen price lists</div><div class='input-group'><span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span><input class='form-control search-input' autocomplete='off' type='text' placeholder='Type text to search'</div></div>",
//		selectableFooter: "<div class='custom-footer'><a href='#' id='select-all-price-list'><i class='fa fa-check-square-o'></i> Click here to select all</a></div>",
//		selectionFooter: "<div class='custom-footer'><a href='#' id='deselect-all-price-list'><i class='fa fa-square-o'></i> Click here to deselect all</a></div>"

    // afterInit: function(ms){
    // 	var that = this,
    // 				$selectableSearch = that.$selectableUl.prev(),
    // 				$selectionSearch = that.$selectionUl.prev(),
    // 				selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
    // 				selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

    // 	that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
    // 	.on('keydown', function(e){
    // 		if (e.which === 40){
    // 			that.$selectableUl.focus();
    // 			return false;
    // 		}
    // 	});

    // 	that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
    // 	.on('keydown', function(e){
    // 		if (e.which == 40){
    // 			that.$selectionUl.focus();
    // 			return false;
    // 		}
    // 	});
    // },
    // afterSelect: function(){
    // 	this.qs1.cache();
    // 	this.qs2.cache();
    // },
    // afterDeselect: function(){
    // 	this.qs1.cache();
    // 	this.qs2.cache();
    // }
    //});

    //Select and Deselect all items on the list
//	$('#select-all-price-list').click(function(){
//		$('#select-2-cols-price-list').multiSelect('select_all');
//		return false;
//	});
//	$('#deselect-all-price-list').click(function(){
//		$('#select-2-cols-price-list').multiSelect('deselect_all');
//		return false;
//	});


    //Demand plan States configuration
//    $('#select-2-cols-states').multiSelect({
//		selectableHeader: "<div class='custom-header'><div>Available UFS</div><div class='input-group'><span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span><input class='form-control search-input' autocomplete='off' type='text' placeholder='Type text to search'</div></div>",
//		selectionHeader: "<div class='custom-header'><div>Chosen UFS</div><div class='input-group'><span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span><input class='form-control search-input' autocomplete='off' type='text' placeholder='Type text to search'</div></div>",
//		selectableFooter: "<div class='custom-footer'><a href='#' id='select-all-states'><i class='fa fa-check-square-o'></i> Click here to select all</a></div>",
//		selectionFooter: "<div class='custom-footer'><a href='#' id='deselect-all-states'><i class='fa fa-square-o'></i> Click here to deselect all</a></div>"

    // afterInit: function(ms){
    // 	var that = this,
    // 				$selectableSearch = that.$selectableUl.prev(),
    // 				$selectionSearch = that.$selectionUl.prev(),
    // 				selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
    // 				selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

    // 	that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
    // 	.on('keydown', function(e){
    // 		if (e.which === 40){
    // 			that.$selectableUl.focus();
    // 			return false;
    // 		}
    // 	});

    // 	that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
    // 	.on('keydown', function(e){
    // 		if (e.which == 40){
    // 			that.$selectionUl.focus();
    // 			return false;
    // 		}
    // 	});
    // },
    // afterSelect: function(){
    // 	this.qs1.cache();
    // 	this.qs2.cache();
    // },
    // afterDeselect: function(){
    // 	this.qs1.cache();
    // 	this.qs2.cache();
    // }
    //});

    //Select and Deselect all items on the list
//	$('#select-all-states').click(function(){
//		$('#select-2-cols-states').multiSelect('select_all');
//		return false;
//	});
//	$('#deselect-all-states').click(function(){
//		$('#select-2-cols-states').multiSelect('deselect_all');
//		return false;
//	});

    //Logictic demand plan IPM Zone configuration
//    $('#select-2-cols-ipm').multiSelect({
//		selectableHeader: "<div class='custom-header'><div>Available Zone</div><div class='input-group'><span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span><input class='form-control search-input' autocomplete='off' type='text' placeholder='Type text to search'</div></div>",
//		selectionHeader: "<div class='custom-header'><div>Chosen Zone</div><div class='input-group'><span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span><input class='form-control search-input' autocomplete='off' type='text' placeholder='Type text to search'</div></div>",
//		selectableFooter: "<div class='custom-footer'><a href='#' id='select-all-ipm'><i class='fa fa-check-square-o'></i> Click here to select all</a></div>",
//		selectionFooter: "<div class='custom-footer'><a href='#' id='deselect-all-ipm'><i class='fa fa-square-o'></i> Click here to deselect all</a></div>"

    // afterInit: function(ms){
    // 	var that = this,
    // 				$selectableSearch = that.$selectableUl.prev(),
    // 				$selectionSearch = that.$selectionUl.prev(),
    // 				selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
    // 				selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

    // 	that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
    // 	.on('keydown', function(e){
    // 		if (e.which === 40){
    // 			that.$selectableUl.focus();
    // 			return false;
    // 		}
    // 	});

    // 	that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
    // 	.on('keydown', function(e){
    // 		if (e.which == 40){
    // 			that.$selectionUl.focus();
    // 			return false;
    // 		}
    // 	});
    // },
    // afterSelect: function(){
    // 	this.qs1.cache();
    // 	this.qs2.cache();
    // },
    // afterDeselect: function(){
    // 	this.qs1.cache();
    // 	this.qs2.cache();
    // }
    //});

    //Select and Deselect all items on the list
//	$('#select-all-ipm').click(function(){
//		$('#select-2-cols-ipm').multiSelect('select_all');
//		return false;
//	});
//	$('#deselect-all-ipm').click(function(){
//		$('#select-2-cols-ipm').multiSelect('deselect_all');
//		return false;
//	});

    /******************************************************************************
     END of Multi select 2 cols
     *******************************************************************************/

    /******************************************************************************
     Accordion icon changes
     *******************************************************************************/
    $('.panel-group > .panel').on('show.bs.collapse', function (evt) {
        $(evt.currentTarget).find("h4 > i").removeClass("fa-chevron-right").addClass("fa-chevron-down");
    }).on('hide.bs.collapse', function (evt) {
        $(evt.currentTarget).find("h4 > i").removeClass("fa-chevron-down").addClass("fa-chevron-right");
    });

    /******************************************************************************
     End Accordion icon changes
     *******************************************************************************/

    /******************************************************************************
     Folder tree emulator
     *******************************************************************************/
    $(function () {
        $(".submenu").hide();
        // Open list
        $(".list-wrapper").click(function () {
            $(this).find(".submenu").slideToggle("slow");
        });

        // Check checkbox in the category
        $(".list-wrapper input[type='checkbox']").change(function () {
            $(this).closest('li')
                .find("input[type='checkbox']")
                .prop("checked", $(this).is(":checked"));
        });


    });

    /******************************************************************************
     END Folder tree emulator
     *******************************************************************************/


    /******************************************************************************
     Formats input files
     *******************************************************************************/
    /*Format input field*/
    $('#id_cnpj').inputmask("99.999.999/9999-99");  //static mask

    /******************************************************************************
     END Formats input files
     *******************************************************************************/


    /******************************************************************************
     Hide or show filters on forms
     *******************************************************************************/
    /*Change stage on filter buttons*/
    $('.filter-btn').click(function () {
        if ($('button span').hasClass('glyphicon-chevron-down')) {
            $('.filter-btn').html('<span class="glyphicon glyphicon-chevron-up"></span> Hide filter');
        }
        else {
            $('.filter-btn').html('<span class="glyphicon glyphicon-chevron-down"></span> Display filter');
        }
    });

    /******************************************************************************
     END Hide or show filters on forms
     *******************************************************************************/


    /******************************************************************************
     Filter at Ordenig brasil
     *******************************************************************************/
    /*Ordening Brasil > CEP SEARCH*/
    $("#rangeCEP").hide();
    $("#addressCEP").hide();
    $("#show-btn-search").hide();
    $("#cep_id_search_type").change(function () {
        $("#cep_id_search_type option:selected").each(function () {
            if ($(this).attr("value") == "") {
                $("#rangeCEP").fadeOut('fast');
                $("#addressCEP").fadeOut('fast');
                $("#show-btn-search").fadeOut('fast');
            }
            if ($(this).attr("value") == "cep_range") {
                $("#addressCEP").fadeOut('fast');
                $("#rangeCEP").fadeIn('slow');
                $("#show-btn-search").fadeIn('slow');
            }
            if ($(this).attr("value") == "address") {
                $("#rangeCEP").fadeIn('slow');
                $("#addressCEP").fadeIn('slow');
                $("#show-btn-search").fadeIn('slow');
            }
        });
    }).change();

    /******************************************************************************
     END Filter at Ordenig brasil
     *******************************************************************************/


    /******************************************************************************
     Invoice - Search
     *******************************************************************************/
    $(".invoice-search-result, .invoice-pager").hide();
    $("#invoice-search").submit(function (event) {
        if ($('#name').val() == '' || $('#invoice').val() == '') {
            $('#error-modal').modal('show');
        } else {
            $(".invoice-search-result, .invoice-pager").fadeIn('slow');
        }
        event.preventDefault();
    });


    //Auto index form DOM
    $(function () {
        var tabindex = 1;
        $('input,select').each(function () {
            if (this.type != "hidden") {
                var $input = $(this);
                $input.attr("tabindex", tabindex);
                tabindex++;
            }
        });
    });
});

/******************************************************************************
 Accordion icon changes
 *******************************************************************************/

$(document.body).on('click', '.panel-group .glyphicon', function () {
    $(this).toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
});

/******************************************************************************
 End Accordion icon changes
 *******************************************************************************/

function load_date_ranges() {
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    try {
        var checkin = $('.startDate').datepicker({
            format: 'yyyy/mm/dd',
            onRender: function (date) {
                // Disable the date before present.
                // return date.valueOf() < now.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                var newDate = new Date(ev.date);
                newDate.setDate(newDate.getDate());
            }
            checkout.update(newDate);
            checkin.hide();
            $('.endDate')[0].focus();
        }).data('datepicker');

        var checkout = $('.endDate').datepicker({
            format: 'yyyy/mm/dd',
            onRender: function (date) {
                return date.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            checkout.hide();
        }).data('datepicker');
    } catch (err) {

    }
}

$('.ini_date').each(function (idx, ele) {
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    try {
        var checkin = $(ele).datepicker({
            format: 'yyyy/mm/dd'
        }).on('changeDate', function (ev) {
            if (ev.date.valueOf() > checkout.date.valueOf()) {
                var newDate = new Date(ev.date);
                newDate.setDate(newDate.getDate());
            }
            checkout.update(newDate.getDate());
            checkin.hide();
            $($(ele).data('end_date')).focus();
        }).data('datepicker');
        var checkout = $($(ele).data('end_date')).datepicker({
            format: 'yyyy/mm/dd',
            onRender: function (date) {
                return date.valueOf() < checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            checkout.hide();
        }).data('datepicker');
    } catch (err) {

    }
});
