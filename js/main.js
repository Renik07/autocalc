$(document).ready(function() {

  // конфигуратор цены
  let modelPrice = 0;
  let modelPriceHolder = $('#modelPrice');
  let modelPriceUSDHolder = $('#modelPriceUSD');


  // после переключения радио кнопок
$('#autoForm input').on('change', function() {
    calculatePrice();
    calculateUSD();
  });

  // при старте страницы
  calculatePrice();

  // выбор цвета
  $('#colorsSelector .colorItem').on('click', function() {
    let imgPath = $(this).attr('data-img-path');
    let $carImg = $('#imgHolder img');

    $carImg.fadeOut(250, function() {
      $carImg.attr('src', imgPath).fadeIn(250);
    });
  });

  // функция для подсчета цены авто

  function calculatePrice() {

    let modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
    let modelPriceTrans = $('input[name=transmission]:checked', '#autoForm').val();
    let modelPriceOptionOne = $('input[name=optionOne]:checked', '#autoForm').val();
    let modelPriceOptionTwo = $('input[name=optionTwo]:checked', '#autoForm').val();
    let modelPriceOptionThree = $('input[name=optionThree]:checked', '#autoForm').val();

    modelPriceOptionOne = modelPriceOptionOne ? modelPriceOptionOne : 0;
    modelPriceOptionTwo = modelPriceOptionTwo ? modelPriceOptionTwo : 0;
    modelPriceOptionThree = modelPriceOptionThree ? modelPriceOptionThree : 0;

    modelPriceEngine = parseInt(modelPriceEngine);
    modelPriceTrans = parseInt(modelPriceTrans);
    modelPriceOptionOne = parseInt(modelPriceOptionOne);
    modelPriceOptionTwo = parseInt(modelPriceOptionTwo);
    modelPriceOptionThree = parseInt(modelPriceOptionThree);

    modelPrice = modelPriceEngine + modelPriceTrans + modelPriceOptionOne + modelPriceOptionTwo + modelPriceOptionThree;

    // помещаем итоговую стоимость в заголовок (итоговый блок)
    modelPriceHolder.text(`${addSpace(modelPrice)} руб.`);
    
  };

  // функция добавления пробелов в итоговую стоимость
  function addSpace(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
  }

  // получаем курс валют
  let currencyUrl = "https://www.cbr-xml-daily.ru/daily_json.js";
  let rurUsdRate = 0;

  $.getJSON({
    url: currencyUrl,
    cache: false,
    success: function(data) {
      rurUsdRate = data.Valute.USD.Value;
      calculateUSD();
    }
  });

  function calculateUSD() {
    let modelPriceUSD = modelPrice / rurUsdRate;

    modelPriceUSDHolder.text( `($ ${addSpace( modelPriceUSD.toFixed(0) )})` );
  };

});

