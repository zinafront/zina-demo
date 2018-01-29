$(function(){
  var ride = new Tour({
    steps: [
      {
        element: "#CPOBasicInfo",
        title: "CPO Basic Details",
        content: "Here you will find the most basic details of the chosen CPO",
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
        element: "#CPOActions",
        title: "CPO Actions",
        content: "Several actions you may take on each CPO. We will take a look to each.",
        placement: "top"
      },
      {
        element: "#CPOUpload",
        title: "Proposal File Upload",
        content: "By clicking this button you will be allowed to upload a Proposal File to be linked to this CPO.",
        placement: "left"
      },
      {
        element: "#CPODownload",
        title: "CPO Download",
        content: "By clicking this button you will download the original CPO File in PDF format. Go ahead and press the button to get an example.",
        placement: "left"
      },
      {
        element: "#CPORevalidate",
        title: "CPO Revalidate",
        content: "This button will allow you to validate again the content of the current CPO.",
        placement: "left"
      },
      {
        element: "#CPOReparse",
        title: "CPO Reparse",
        content: "By clicking this button the current CPO will be reparsed or reread from the original file.",
        placement: "left"
      },
      {
        element: "#CPOAccept",
        title: "CPO Actions: Accept or Reject",
        content: "Use these buttons to proceed either to accept or reject the current CPO.",
        placement: "left"
      },
      {
        element: "#CPOHistory",
        title: "CPO History",
        content: "The CPO History will show you any change that the CPO may have had since it's initial load into ZINA.",
        placement: "left"
      },
      {
        element: "#CPOContract",
        title: "CPO Contract Information",
        content: "Information and actions related to the linked contract, if exists.",
        placement: "top"
      },
      {
        element: "#id_contract_information",
        title: "CPO Contract Information",
        content: "This droplist will show each of the types of contracts that the CPO may take",
        placement: "top"
      },
      {
        element: "#CPOContractUpdate",
        title: "CPO Contract Information Update",
        content: "If any changes were made in the previous selection list, pressing this button will save those changes.",
        placement: "left"
      },
      {
        element: "#CPOItems",
        title: "CPO Items",
        content: "Each of the items that make part of the CPO.",
        placement: "top"
      },
      {
        element: "#CPONetVAl",
        title: "CPO NET Value",
        content: "This tag will show the total net value of the current CPO.",
        placement: "left"
      },
      {
        element: "#assign_cpo_items_to_owner",
        title: "Link Opportunity",
        content: "This button will link the selected CPO Items to an existing CRM Opportunity.",
        placement: "top"
      },
      {
        element: "#CPOUnlink",
        title: "Unlink Opportunity",
        content: "This button will unlink the selected CPO Items from any existing CRM Opportunity.",
        placement: "top"
      },
      {
        element: "#CPOSave",
        title: "Save Changes for this CPO",
        content: "After linking or unlinking CPO Items and opportunities, this button must be clicked to save all changes.",
        placement: "top",
        template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation'>"+
            "<button class='btn btn-default' data-role='prev'>« Prev</button>"+
            "<button class='btn btn-default' data-role='end'>Finish Tour</button>"+
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

  $viewport = $(window).width();
  if ($viewport > 500) {
    ride.init();
    ride.start();
  }
});