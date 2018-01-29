$(function(){
  var ride = new Tour({
    steps: [{
      element: "#filtersCPO",
      title: "Inbox Filters",
      content: "You can refine here the results shown in the chart above by chosing among CPO number, Customer Team and a range of dates.",
      placement: "top",
      template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation'>"+
            "<button class='btn btn-default' data-role='next'>Next »</button>"+
          "</div>"+
        "</div>",
    },
    {
      element: "#resetFilterCPO",
      title: "Resetting your search",
      content: "Reset your filter search by clicking this button",
      placement: "left"
    },
    {
      element: "#applyFilterCPO",
      title: "Applying your filters",
      content: "Apply your filter refination by clicking this button",
      placement: "left"
    },
    {
      element: "#tab-history",
      title: "CPOs without an opportunity attached",
      content: "The list in this table includes all CPOs that don't have an opportunity attached yet.",
      placement: "top",
      onNext: function(ride){
        $('#li_tab_not_taken, #cont-tab-not-taken').removeClass('active');
        $('#li_tab_taken, #cont-tab-taken').addClass('active');
      }
    },
    {
      element: "#tab-errors",
      title: "CPOs with an opportunity attached",
      content: "The list in this table includes all CPOs that have an opportunity attached to them.",
      placement: "top",
      onPrev: function(ride){
        $('#li_tab_not_taken, #cont-tab-not-taken').addClass('active');
        $('#li_tab_taken, #cont-tab-taken').removeClass('active');
      },
      onNext: function(ride){
        $('#li_tab_not_taken, #cont-tab-not-taken').addClass('active');
        $('#li_tab_taken, #cont-tab-taken').removeClass('active');
      }
    },
    {
      element: "#cpoNumExample",
      title: "CPO Number and CPO Details",
      content: "In any tab you can go to the CPO Number column and click on it to see its details. Go ahead and click on the first CPO number or click on Next in this dialog.",
      placement:"right",
      onPrev: function(ride){
        $('#li_tab_not_taken, #cont-tab-not-taken').removeClass('active');
        $('#li_tab_taken, #cont-tab-taken').addClass('active');
      }
    },
    {
      element: "body",
      path: "cpo-detail.html"
    }
    ],
    template: "<div class='popover tour'>"+
  "<div class='arrow'></div>"+
  "<h3 class='popover-title'></h3>"+
  "<div class='popover-content'></div>"+
  "<div class='popover-navigation'>"+
    "<button class='btn btn-default' data-role='prev'>« Prev</button>"+
    "<button class='btn btn-default' data-role='next'>Next »</button>"+
  "</div>"+
"</div>",
    storage: false,
  });

  $viewport = $(window).width();
  if ($viewport > 500) {
    ride.init();
    ride.start();
  }
});