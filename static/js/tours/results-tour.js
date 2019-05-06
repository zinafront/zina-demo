$(function(){
  var cookieLang = Cookies.get('tourLang');
  if (cookieLang == 'en' || !cookieLang) {
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
          "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation'>"+
             "<button class='btn btn-demo disabled' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
              "<button class='btn btn-demo' data-toggle='tooltip' title='Next' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
              "<button class='btn btn-demo' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
          "</div>"+
        "</div>",
    },
    {
      element: "#results-tracking-summary",
      title: "Overview of transactions",
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
      title: "Transaction details",
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
          "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
          "<div class='popover-content'></div>"+
          "<div class='popover-navigation'>"+
            "<button class='btn btn-demo' data-toggle='tooltip' title='Previous' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
              "<button class='btn btn-demo disabled' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
              "<button class='btn btn-demo' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
          "</div>"+
        "</div>",
    },
    ],
      template: "<div class='popover tour'>"+
      "<div class='arrow'></div>"+
      "<h3 class='popover-title'></h3>"+
      "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
      "<div class='popover-content'></div>"+
      "<div class='popover-navigation'>"+
        "<button class='btn btn-demo' data-toggle='tooltip' title='Previous' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
      "<button class='btn btn-demo' data-toggle='tooltip' title='Next' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
      "<button class='btn btn-demo' data-toggle='tooltip' title='Close Tour' data-role='end'><i class='fa fa-times'></i></button>"+
      "</div>"+
    "</div>",
      storage: false,
    });
  }
  else if (cookieLang == 'sp'){
     var ride = new Tour({
      steps: [
      {
        element: "#transaction_results",
        title: "Resultados del procesamiento",
        content: "Esta área mostrará el resultado del procesamiento del archivo, es decir, la carga y envío del archivo a SAP.",
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
        element: "#results-tracking-summary",
        title: "Resumen de las transacciones",
        content: "Estos páneles conforman un tablero básico de resumen que te permitirá conocer el número de transacciones enviadas a SAP, cuántas de ellas han sido correctamente creadas y cuántas no.",
        placement: "top"
      },
      {
        element: "#progress-bar-container",
        title: "Barra de progreso",
        content: "Esta barra mostrará gráficamente el progreso de las transacciones así como su respectivo porcentaje. Ten en cuenta que en el proceso real, esta barra se actualizará automáticamente cada 30 segundos.",
        placement: "top",

      },
      {
        element: "#accordion",
        title: "Detalles de cada transacción",
        content: "Esta área muestra el resultado detallado de las transacciones, sea que hayan sido creadas o no. Cada sección puede ser expandida o colapsada para ver más detalles. Haz click en cualquier grupo para ver esto.",
        placement: "top"
      },
      {
        element: "#back-to-data-importer",
        title: "Cargar un nuevo archivo",
        content: "Después de finalizar, podrás iportar un nuevo archivo e iniciar el proceso para un nuevo conjunto de transacciones.",
        placement: "left",
        template: "<div class='popover tour'>"+
            "<div class='arrow'></div>"+
            "<h3 class='popover-title'></h3>"+
            "<button class='btn btn-demo demo-close' data-toggle='tooltip' title='Cerrar Tour' data-role='end'><i class='fa fa-times'></i></button>"+
            "<div class='popover-content'></div>"+
            "<div class='popover-navigation pull-right'>"+
    "<button class='btn btn-demo' data-toggle='tooltip' title='Anterior' data-role='prev'><i class='fa fa-arrow-left'></i></button>&nbsp;"+
    "<button class='btn btn-demo disabled' data-toggle='tooltip' title='Siguiente' data-role='next'><i class='fa fa-arrow-right'></i></button>"+
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
      steps: [
      {
        element: "#transaction_results",
        title: "Resultados do processamento",
        content: "Esta área mostrará o resultado do processamento do arquivo, ou seja, o upload e envio do arquivo para o SAP.",
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
        element: "#results-tracking-summary",
        title: "Visão geral das transações",
        content: "Essas caixas funcionarão como um painel básico que permitirá que você conheça o número de transações carregadas no arquivo de modelo, quantos deles são válidos e quantos não são.",
        placement: "top"
      },
      {
        element: "#progress-bar-container",
        title: "Barra de progresso",
        content: "Esta barra mostrará graficamente a conclusão do processo de criação, bem como a respectiva porcentagem. Tenha em mente que, em processo real, esta barra será atualizada a cada 30 segundos.",
        placement: "top",

      },
      {
        element: "#accordion",
        title: "Detalhes da transação",
        content: "Esta área mostrará o resultado das transações em detalhes, sejam elas criadas ou não. Cada seção pode ser expandida ou colapsada para ver mais detalhes. Você pode clicar em qualquer grupo para ver seus detalhes.",
        placement: "top"
      },
      {
        element: "#back-to-data-importer",
        title: "Cargar un nuevo archivo",
        content: "Após o término, o usuário poderá importar um novo arquivo e iniciar o processo para um novo conjunto de transações.",
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
  };
  $viewport = $(window).width();
  if ($viewport > 500) {
    ride.init();
    ride.start();
  }
});