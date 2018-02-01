$(function(){
  var ride = new Tour({
    steps: [
    {
      element: "#transaction_results",
      title: "File processing results",
      content: "This area will show the result of the processing of the file, namely, the upload and sending of the file to SAP.",
      placement: "top",
      template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation'>"+
            "<button class='btn btn-default' data-role='next'>Next »</button>"+
            "<button class='btn btn-default' data-role='end'>End tour</button>"+
          "</div>"+
        "</div>",
    },
    {
      element: "#results-tracking-summary",
      title: "Overview of the creation",
      content: "These tiles will work as a basic dashboard which will let you know the number of transactions sent to SAP, how many of them have been correctly created and how many have been rejected.",
      placement: "top"
    },
    {
      element: "#progress-bar-container",
      title: "Progress bar",
      content: "This bar will graphically show the completion of the creation process as well as the respective percentage. Keep in mind that in actual process, this bar will refresh every 30 seconds.",
      placement: "top",

    },
    {
      element: "#accordion",
      title: "Validation details",
      content: "This area will show the result of the transactions in detail, whether they are created or not. Each transaction tile can be expanded or collapsed to see more details. You can click on any Group to see its details.",
      placement: "top"
    },
    {
      element: "#back-to-data-importer",
      title: "Upload a new file",
      content: "After finishing, the user will be able to import a new file and start the process for a new set of transactions.",
      placement: "left",
      template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation'>"+
            "<button class='btn btn-default' data-role='prev'>« Prev</button>"+
            "<button class='btn btn-default' data-role='end'>End tour</button>"+
          "</div>"+
        "</div>",
    },
    ],
    template: "<div class='popover tour'>"+
    "<div class='arrow'></div>"+
    "<h3 class='popover-title'></h3>"+
    "<div class='popover-content'></div>"+
    "<div class='popover-navigation'>"+
      "<button class='btn btn-default' data-role='prev'>« Prev</button>"+
      "<button class='btn btn-default' data-role='next'>Next »</button>"+
      "<button class='btn btn-default' data-role='end'>End tour</button>"+
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