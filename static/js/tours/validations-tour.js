$(function(){
  var ride = new Tour({
    steps: [{
      element: "#summary-title",
      title: "Overview of the validations",
      content: "These tiles will work as a basic dashboard which will let you know the number of transactions uploaded in the template file, how many of them are valid and how many aren't.",
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
      element: "#accordion_success",
      title: "Validation details",
      content: "This area will show the result of the validations in detail, whether they are valid or not. Each validation tile can be expanded or collapsed to see more details. You can click on any Group to see its details.",
      placement: "top"
    },
    {
      element: "#validation_process_top",
      title: "Quick processing",
      content: "At the top of the validation details there is a process button, to help the user to advance in the process after a quick review of the details or the total skip of it.",
      placement: "left"
    },
    {
      element: "#back-to-data-importer",
      title: "Upload a new file",
      content: "In the case that the user needs to correct any information in the file and reupload it, this button will lead them to the importer again.",
      placement: "left"
    },
    {
      element: "#validation_process_bottom",
      title: "Processing the file",
      content: "When the validations are complete and user is ok with the results shown, taking into account that only validated items will be processed, they can send this transaction to be executed by ZINA's software robots by clicking Process button. Please, go ahead and click it to show the next step.",
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