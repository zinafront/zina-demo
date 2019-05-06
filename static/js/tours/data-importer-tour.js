$(function(){
  var cookieLang = Cookies.get('tourLang');
  if (cookieLang == 'en' || !cookieLang) {
    var ride = new Tour({
    steps: [{
      element: "#template-file-link",
      title: "Template file",
      content: "Inside any importer, you will find in the right side the template accepted by the file uploader. Click on the link below to download the template example.",
      placement: "top",
      template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation pull-right'>"+
           "<button class='btn btn-demo disabled' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
              "<button class='btn btn-demo' data-toggle='tooltip' title='Next' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
          "</div>"+
        "</div>",
    },
    {
      element: "#data-importer-upload",
      title: "Upload the file with the information",
      content: "After completing the information on the downloaded template, upload the file here. Click on <strong><em>Browse</em></strong> to play the example.",
      placement: "top"
    },
    {
      element: "#data-importer-customer-team",
      title: "Select additional options",
      content: "Select customer team, and activate/deactivate other options before continuing.",
      placement: "right"
    },
    {
      element: "#data-importer-proceed",
      title: "Upload the file",
      content: "When done, click on <strong><em>Import File</em></strong> button to upload the file. Please, click such button to continue.",
      placement: "top",
      template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation pull-right'>"+
            "<button class='btn btn-demo' data-toggle='tooltip' title='Previous' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
              "<button class='btn btn-demo disabled' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
          "</div>"+
        "</div>",
    }
    ],
    template: "<div class='popover tour'>"+
  "<div class='arrow'></div>"+
  "<h3 class='popover-title'></h3>"+
  "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
  "<div class='popover-content'></div>"+
  "<div class='popover-navigation pull-right'>"+
    "<button class='btn btn-demo' data-toggle='tooltip' title='Previous' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
      "<button class='btn btn-demo' data-toggle='tooltip' title='Next' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
  "</div>"+
"</div>",
    storage: false,
  });
  }  
  if (cookieLang == 'sp') {
    var ride = new Tour({
    steps: [{
      element: "#template-file-link",
      title: "Archivo de plantilla",
      content: "Dentro de todo importador, encontrarás en la parte derecha la plantilla que es aceptada por el importador. Haz clic en el vínculo que está abajo para descargar un ejemplo de la plantilla.",
      placement: "top",
      template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Cerrar Tour' data-role='end'><i class='fa fa-times'></i></button>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation pull-right'>"+
            "<button class='btn btn-demo disabled' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
              "<button class='btn btn-demo' data-toggle='tooltip' title='Siguiente' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
          "</div>"+
        "</div>",
    },
    {
      element: "#data-importer-upload",
      title: "Cargar el archivo con la información",
      content: "Luego de llenar la plantilla con la información requerida, carga aquí dicho archivo. Haz click en el botón <strong><em>Browse</em></strong> para ver el ejemplo.",
      placement: "top"
    },
    {
      element: "#data-importer-customer-team",
      title: "Seleccionar opciones adicionales",
      content: "Selecciona el CT y activa o desactiva otras opciones antes de continuar.",
      placement: "right"
    },
    {
      element: "#data-importer-proceed",
      title: "Importar el archivo",
      content: "Una vez hecho lo anterior, haz click en el botón <strong><em>Import File</em></strong> para continuar.",
      placement: "top",
      template: "<div class='popover tour'>"+
          "<div class='arrow'></div>"+
          "<h3 class='popover-title'></h3>"+
          "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Cerrar Tour' data-role='end'><i class='fa fa-times'></i></button>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation pull-right'>"+
            "<button class='btn btn-demo' data-toggle='tooltip' title='Anterior' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
              "<button class='btn btn-demo disabled' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
          "</div>"+
        "</div>",
    }
    ],
    template: "<div class='popover tour'>"+
  "<div class='arrow'></div>"+
  "<h3 class='popover-title'></h3>"+
  "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Cerrar Tour' data-role='end'><i class='fa fa-times'></i></button>"+
  "<div class='popover-content'></div>"+
  "<div class='popover-navigation pull-right'>"+
    "<button class='btn btn-demo' data-toggle='tooltip' title='Anterior' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
    "<button class='btn btn-demo' data-toggle='tooltip' title='Siguiente' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
  "</div>"+
"</div>",
    storage: false,
  });
  }
  else if (cookieLang == 'pt') {
    var ride = new Tour({
      steps: [{
        element: "#template-file-link",
        title: "Arquivo de modelo",
        content: "Aqui, você encontrará, à direita, o arquivo de modelo aceito pelo importador. Clique no link abaixo para baixar um exemplo do arquivo.",
        placement: "top",
        template: "<div class='popover tour'>"+
            "<div class='arrow'></div>"+
            "<h3 class='popover-title'></h3>"+
            "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Terminar Tour' data-role='end'><i class='fa fa-times'></i></button>"+
            "<div class='popover-content'></div>"+
            "<div class='popover-navigation pull-right'>"+
             "<button class='btn btn-demo disabled' data-toggle='tooltip' title='Anterior' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
            "<button class='btn btn-demo' data-toggle='tooltip' title='Seguinte' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
            "</div>"+
          "</div>",
      },
      {
        element: "#data-importer-upload",
        title: "Carregar arquivo com informações",
        content: "Depois de completar o arquivo de modelo com as informações necessárias, carregue esse arquivo aqui. Clique no botão <strong><em>Browse</em></strong> para ver o exemplo.",
        placement: "top"
      },
      {
        element: "#data-importer-customer-team",
        title: "Selecionar opções adicionaiss",
        content: "Selecione CT e ative / desative outras opções antes de continuar.",
        placement: "right"
      },
      {
        element: "#data-importer-proceed",
        title: "Carregar o arquivo",
        content: "Quando terminar, clique no botão <strong><em> Import File </em></strong> para carregar o arquivo. Por favor, clique nesse botão para continuar o tour.",
        placement: "top",
        template: "<div class='popover tour'>"+
            "<div class='arrow'></div>"+
            "<h3 class='popover-title'></h3>"+
            "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Terminar Tour' data-role='end'><i class='fa fa-times'></i></button>"+
            "<div class='popover-content'></div>"+
            "<div class='popover-navigation pull-right'>"+
              "<button class='btn btn-demo' data-toggle='tooltip' title='Anterior' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
            "<button class='btn btn-demo disabled' data-toggle='tooltip' title='Seguinte' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
            "</div>"+
          "</div>",
      }
      ],
      template: "<div class='popover tour'>"+
    "<div class='arrow'></div>"+
    "<h3 class='popover-title'></h3>"+
    "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Terminar Tour' data-role='end'><i class='fa fa-times'></i></button>"+
    "<div class='popover-content'></div>"+
    "<div class='popover-navigation pull-right'>"+
      "<button class='btn btn-demo' data-toggle='tooltip' title='Anterior' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
    "<button class='btn btn-demo' data-toggle='tooltip' title='Seguinte' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
    "</div>"+
  "</div>",
      storage: false,
    });
  }

  $viewport = $(window).width();
  if ($viewport > 500) {
    ride.init();
    ride.start();
  }
});