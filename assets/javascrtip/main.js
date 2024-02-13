///// TODO date and time updates in real time
///// TODO Current exchange rate
///// TODO Alert
///// TODO Local Storage

// wrapping all code that interacts with the dom within this function:
$(function () {
    // function to update time, date, and currency values in real time
  function updateTime() {
    var now = dayjs();
    $('#today').text(now.format('dddd, MMMM DD, YYYY')); //! date
    $('#hour').text(now.format('h:mm:ss A')); //! time
    
    var apiUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';
    
    // Fetch data for 1 USD to MXN conversion
    fetch(apiUrl + 'usd/mxn.json')
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.mxn;
            document.getElementById('mxnToday').textContent = `🇺🇲 1 USD = $${(exchangeRate).toFixed(2)} MXN`;
        })
        .catch(error => {
            console.error('Error fetching currency rates:', error);
        });

    // Fetch data for 1 MXN to USD conversion
    fetch(apiUrl + 'mxn/usd.json')
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.usd;
      document.getElementById('usdToday').textContent = `🇲🇽 1 MXN  = $${(exchangeRate).  toFixed(2)} USD`;
    })
  }
  // Update date and time immediately
  updateTime();
  // Update date and time every second
  setInterval(updateTime, 1000);

  
  // inputted text saved in local storage
  var lastUsedValue = document.getElementById('valueOfLS');
  var inputtedValue = document.getElementById('amount');
  var convertBtn = document.getElementById('convert');
  convertBtn.addEventListener('click', saveToLS);

  window.addEventListener('load', function() {
    var savedText= localStorage.getItem('savedText');

    if (savedText) {
      var data = JSON.parse(savedText);
      lastUsedValue.classList.remove('hide')
      lastUsedValue.innerHTML = "Last inputted value in previous session: " + data.text;
    }
  });
  
  function saveToLS() {
    var inputTextLS = inputtedValue.value;
    var data = {
      text: inputTextLS
    };
    var dataString =JSON.stringify(data);
    localStorage.setItem('savedText', dataString);
    console.log(localStorage);
    displayText();
  }
});


//! Poncho's
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
  const amount = document.getElementById('amount').value.trim(); // Remove leading and trailing spaces
  const ConversionType = document.getElementById('ConversionType').value;
  let urlApi = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';

  //* Added contional statements to display alerts
  if (amount === '') {
    alert("You need to input a value");
    return; // Exit the function early
  } else if (isNaN(amount)) {
    alert('Type only numbers, please\nWe exclude letters and numbers with spaces');
    return;
  } else {

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
            ? `${amount} USD = ${result.toFixed(2)} MXN`
            : `${amount} MXN = ${result.toFixed(2)} USD`;
        document.getElementById('result').innerHTML = message;
    });
  }
});

getNews();
