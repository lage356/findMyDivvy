var exchangeContainer = document.querySelector(".exchangeData");
var fromCu = document.getElementById('fromCu');
var exchangeData = document.getElementById('amountToExchange');
var exchangeButton = document.querySelector(".exchangeBtn");
var exData = exchangeData.value;


var getExchangeRate = function () {
    var currenciesApiUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json";


  fetch(currenciesApiUrl)
    .then(function (response) {
      return response.json();  
    })
    .then(function (data) { 
      console.log(data)

        for (i in data ){
      
            const option1  = new Option (data[i],i)
            if(data[i] === "US Dollar"){
              fromCu.add(option1)
            }else if (data[i]== "Mexican Peso"){
              fromCu.add(option1)
            }
            
          
        }

    })
    .catch(function (error) {
      console.log(error);
    });
};

var getUSDval = function (input) {
  var getBaseUsd = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json"

  var receivedValue = input ;

fetch(getBaseUsd)
  .then(function (response) {
    return response.json();  
  })
  .then(function (data) { 
    
    let tipoCambio = data.usd.mxn
    let dolarToPesos = receivedValue / tipoCambio; 
    let pesosToDolar = tipoCambio * receivedValue; 

    renderXchangePesos(pesosToDolar);

    renderXchange(dolarToPesos);

  })
  .catch(function (error) {
    console.log(error);
  });
};



var renderXchange = function (data) {

  var displayDOM = document.getElementById('convertedValue');
 

  var valueToDisplay =data ;

  displayDOM.textContent = valueToDisplay;
 

}

var renderXchangePesos = function(data){
  var displayPesos = document.getElementById('convertedValue2')
  var valueToPesos = data;

    displayPesos.textContent = valueToPesos;

}

exchangeButton.addEventListener("click", function(event){
event.preventDefault();
exData = exchangeData.value;

var dataToConvert =parseFloat(exData);
// console.log(dataToConvert)
// getExchangeRate();
getUSDval(dataToConvert);


});



