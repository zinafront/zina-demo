$(function(){
  var ride = new Tour({
    steps: [{
      element: "#results-title",
      title: "Transaction live results",
      content: "The following video is an example of what the robot does in SAP.",
      placement: "top",
      template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation'>"+
            "<button class='btn btn-default' data-role='next'>Next »</button>"+
          "</div>"+
        "</div>",
      onNext: function(ride){
        $('#SapModal').modal();
        $yt_iframe= '<iframe width="1200" height="675" src="https://www.youtube.com/embed/wRUUsTzVuHY?start=2&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        $('#sap-modal-video').html($yt_iframe);

      }
    },
    {
      element: "#transaction_results",
      title: "File processing results",
      content: "This area will show the result of the processing of the file, namely, the upload and sending of the file to SAP.",
      placement: "top"
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
      content: "This bar will graphically show the completion of the creation process as well as the respective percentage.",
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
  "</div>"+
"</div>",
    storage: false,
  });

  ride.init();
  ride.start();
});