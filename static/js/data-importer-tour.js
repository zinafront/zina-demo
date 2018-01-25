$(function(){
  var ride = new Tour({
    steps: [{
      element: "#template-file-link",
      title: "Template file",
      content: "At any importer, you will find in the right side the template accepted by the file uploader. Click on the link below to download the template example.",
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
      element: "#data-importer-upload",
      title: "Upload the file with the information",
      content: "After completing the information on the downloaded template, upload the file here. Click on browse to play the example.",
      placement: "top"
    },
    {
      element: "#data-importer-customer-team",
      title: "Select additional options",
      content: "Select customer teams, and activate/deactivate other options before continuing.",
      placement: "right"
    },
    {
      element: "#data-importer-proceed",
      title: "Upload the file",
      content: "When done, click on Import File button to upload the file. Please, click such button to continue.",
      placement: "top",
      template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation'>"+
            "<button class='btn btn-default' data-role='prev'>« Prev</button>"+
          "</div>"+
        "</div>",
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

  ride.init();
  ride.start();
});