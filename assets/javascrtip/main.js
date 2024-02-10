var today = dayjs();
$('#today').text(today.format('MMM D, YYYY'));

var exchangeContainer = document.getElementById('exchangeData');
var fromCu = document.getElementById('fromCu');

const options = {
  method: "GET",
  headers: {
		'X-RapidAPI-Key': '4d5a27013fmshb24446b95c71a58p1e6be4jsn42011879c0a9',
		'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
	}
};

var apiUrl = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=USD-MXN&region=US';

var getNews = function() {
  fetch(apiUrl, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
      console.log(data.news);
      displayNews(data.news);
  })
  .catch(function (error) {
    console.log(error);
  });
};

var displayNews = function (data) {

    for (var i = 0; i < data.length; i++) {
        var newsItem = data[i];

        // Crear la estructura de la tarjeta
        var cardEl = document.createElement('div');
        cardEl.className = 'card';

        var titleEl = document.createElement('h2');
        var publisherEl = document.createElement('p');
        var linkEl = document.createElement('a');

        // Asignar contenido
        titleEl.textContent = newsItem.title;
        publisherEl.textContent = newsItem.publisher;
        linkEl.setAttribute('href', newsItem.link);
        linkEl.setAttribute('target', '_blank'); // Abre en una nueva pestaña
        linkEl.textContent = "Leer más";

        // Construir la tarjeta
        cardEl.appendChild(titleEl);
        cardEl.appendChild(publisherEl);
        cardEl.appendChild(linkEl);

        // Añadir la tarjeta al contenedor
        exchangeContainer.appendChild(cardEl);
  }
};


document.getElementById('convert').addEventListener('click', function() {
  const amount = document.getElementById('amount').value;
  const ConversionType = document.getElementById('ConversionType').value;
  let urlApi = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';
  if (ConversionType === 'usdToMxn') {
      urlApi += 'usd/mxn.json';
  } else if (ConversionType === 'mxnToUsd') {
      urlApi += 'mxn/usd.json';
  }

  fetch(urlApi)
  .then(response => response.json())
  .then(data => {
      const exchangeRate = ConversionType === 'usdToMxn' ? data.mxn : data.usd;
      const result = amount * exchangeRate;
      const message = ConversionType === 'usdToMxn' 
          ? `${amount} USD to ${result.toFixed(2)} MXN`
          : `${amount} MXN to ${result.toFixed(2)} USD`;
      document.getElementById('result').innerHTML = message;
  })
});

getNews();
