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
      return response.text();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

var getExchangeRate = function () {
    var apiUrl =
  "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=MXN&apikey=FY31FW4DXC7KAPXA";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();  
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
getExchangeRate();
getNews();
