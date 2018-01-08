  var ride = new Tour({
  steps: [
  {
    element: "#get-access",
    title: "Title of my step",
    content: "Content of my step",
    smartPlacement: true,
    storage: window.localStorage
  }
]});

// Initialize the tour
ride.init();

// Start the tour
ride.start();
