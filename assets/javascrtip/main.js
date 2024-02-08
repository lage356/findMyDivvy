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
        publisherEl.textContent = "Publisher: " + newsItem.publisher;
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





var getExchangeRate = function () {
    var currenciesApiUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json";


  fetch(currenciesApiUrl)
    .then(function (response) {
      return response.json();  
    })
    .then(function (data) {
      
        for (i in data ){
            const option1  = new Option (data[i],i)
            fromCu.add(option1)
        }

    })
    .catch(function (error) {
      console.log(error);
    });
};
getExchangeRate();
getNews();
