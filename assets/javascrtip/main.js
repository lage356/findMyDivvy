var exchangeContainer = document.querySelector(".exchangeData");


const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "12c0e41f66msh0c4fef03798b3f5p1bc083jsn2622380dcb7a",
    "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  },
};

var apiUrl = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=USD-MXN&region=US';

var getNews = function() {

    fetch(apiUrl, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //   console.log(data.news);
      displayNews(data.news);
    })
    .catch(function (error) {
      console.log(error);
    });
}

var displayNews = function (data) {
    for (var i = 0; i < data.length; i++) {
        var linkEL = document.createElement('h2');

        linkEL.textContent =data[i].link;

        exchangeContainer.append(linkEL);
      
    }
  };

var getExchangeRate = function () {
    var apiUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json";

  

  fetch(apiUrl)
    .then(function (response) {
      return response.json();  
    })
    .then(function (data) {
      console.log(data)
    //   displayExchange(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
getExchangeRate();
getNews();
