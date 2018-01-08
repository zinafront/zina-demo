// Zina's panels specific lib.

var panels = {

    collapsible_elements : "fieldset, div",

    init : function(){
//        trace("panel.init");
        panels.decorate();
        panels.show_forms_with_errors();
    },
    
    decorate : function(){
//        trace("panels.decorate");
    
        // Apply CSS classes
        $("h4").addClass("panel-header");
    
        $.each($('h4'), function(i, item){

	     	if (!$(item).hasClass("avoid_expand_in_all_h4")){
	            $(item).bind('click', panels.accordion);
	        }

            // Attaches an extra <div> and decorate it.
            // Bind a delegated function to it so we can have both accordion and 
            // show/hide effects for panels.
                        
                        if ($(item).children("div").length == 0 ){
                    $(item).append(
                        $('<div id="panel_expand_' + i + '"/>').addClass("toggle").click(
                            extras.delegate($(item), panels.toggle)
                        )
                    );
            }
        });
    },
    
    show_forms_with_errors : function(){
//        trace("panels.show_forms_with_errors");
        
        // First, collapse every panel that is not marked with errors.
        $.each($("h4:not(error)"), function(i, item){
                panels.close($(item).children(panels.collapsible_elements));
            }
        );
        
        // Show panels marked with errors so user can see and correct them.
        $.each($("h4.error"), function(i, item){
                    $(item).children("div").removeClass("toggle").addClass("toggle-error");
                panels.open($(item).children(panels.collapsible_elements));
            }
        );
    },
    
    accordion : function(e){
//        trace("panels.accordion");
        var focus = $(e.currentTarget);
//        trace(focus);

        $.each($("h4"), function(i, item){
            panels.close($(item).children(panels.collapsible_elements));
            }
        );
        
        panels.open(focus.children(panels.collapsible_elements));
        return false;
    },
    
    toggle: function(){
//        trace("panels.toggle");
        var focus = $(this).children(panels.collapsible_elements);
        var is_visible = focus.parent().parent().children(panels.collapsible_elements + ':visible').length;
        
        if (is_visible) {
                panels.close(focus);
        }
        else {
                return panels.open(focus);
        }
        return false;
    },

    open : function(item){
//        trace("panels.open");
//        trace(item);
        $(item).removeClass("toggle").addClass("toggle-opened");
        $(item).parent().parent().children(panels.collapsible_elements).show();
        return false;
    },
 
    close : function(item){
//        trace("panels.close");
//        trace(item);
                $(item).removeClass("toggle-opened").addClass("toggle");
        $(item).parent().parent().children(panels.collapsible_elements).hide();
        return false;
    }
}