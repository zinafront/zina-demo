$(function(){
  var cookieLang = Cookies.get('tourLang');
  if (cookieLang == 'en' || !cookieLang) {
      var ride = new Tour({
      steps: [{
        element: "#summary-title",
        title: "Overview of the validations",
        content: "These boxes will work as a basic dashboard which will let you know the number of transactions uploaded in the template file, how many of them are valid and how many aren't.",
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
            "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
            "<div class='popover-content'></div>"+
            "<div class='popover-navigation pull-right'>"+
            "<button class='btn btn-demo' data-toggle='tooltip' title='Previous' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
              "<button class='btn btn-demo disabled' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
          "</div>"+
          "</div>",
      },
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
  else if (cookieLang == 'sp') {
      var ride = new Tour({
    steps: [{
      element: "#summary-title",
      title: "Resumen de las validaciones",
      content: "Estos páneles conforman un tablero básico de resumen que te permitirá conocer el número de transacciones incluídas en la plantilla, cuántas de ellas han sido correctamente validadas y cuántas no.",
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
      element: "#accordion_success",
      title: "Detalles de las validaciones",
      content: "Esta área muestra el resultado detallado de las validaciones, sean correctas o no. Cada sección puede ser expandida o colapsada para ver más detalles. Haz click en cualquier grupo para ver esto.",
      placement: "top"
    },
    {
      element: "#validation_process_top",
      title: "Procesamieto rápido",
      content: "En la parte superior de los detalles de validación hay un botón de procesamiento (<strong><em>Process</em></strong>), para permitirte avanzar en el proceso luego de una revisión rápida de los detalles o si decides omitir cualquier revisión.",
      placement: "left"
    },
    {
      element: "#back-to-data-importer",
      title: "Cargar un nuevo archivo",
      content: "En el caso de que necesites corregir cualquier información en el archivo y volverlo a cargar, este botón te llevará nuevamente al importador para hacerlo.",
      placement: "left"
    },
    {
      element: "#validation_process_bottom",
      title: "Procesamiento de la carga",
      content: "Cuando las validaciones se han completado y estés de acuerdo con los resultados mostrados, y teniendo en cuenta que solo los ítems validados serán procesados, puedes enviar esta transacción para su ejecución por parte de los robots de software de ZINA, haciendo clic en el botón de procesamiento (<strong><em>Process</em></strong>). Adelante, haz click en dicho botón para avanzar al siguiente paso.",
      placement: "left",
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
    },
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
      element: "#summary-title",
      title: "Resumo de validações",
      content: "Essas caixas funcionarão como um painel básico que permitirá que você conheça o número de transações carregadas no arquivo de modelo, quantos deles são válidos e quantos não são.",
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
      element: "#accordion_success",
      title: "Detalhes da validação",
      content: "Esta área mostrará o resultado das validações em detalhes, independentemente de serem válidas ou não. Cada seção de validação pode ser expandida ou colapsada para ver mais detalhes. Você pode clicar em qualquer grupo para ver seus detalhes.",
      placement: "top"
    },
    {
      element: "#validation_process_top",
      title: "Processamento rápido",
      content: "No topo dos detalhes de validação, há um botão de processo (<strong><em>Process</em></strong>), para ajudar o usuário a avançar no processo após uma rápida revisão dos detalhes ou o salto total dele.",
      placement: "left"
    },
    {
      element: "#back-to-data-importer",
      title: "Carregar um novo arquivo",
      content: "No caso de o usuário precisar corrigir qualquer informação no arquivo e reenviá-lo, esse botão os levará novamente ao importador.",
      placement: "left"
    },
    {
      element: "#validation_process_bottom",
      title: "Processando o arquivo",
      content: "Quando as validações são concluídas e o usuário está bem com os resultados mostrados, levando em consideração que somente os itens validados serão processados, eles podem enviar esta transação para ser executada pelos robôs de software da ZINA clicando no botão de processamento (<strong><em>Process</em></strong>). Por favor, vá em frente e clique para mostrar o próximo passo.",
      placement: "left",
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
    },
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