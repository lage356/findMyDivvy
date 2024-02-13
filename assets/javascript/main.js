var today = dayjs();
$('#today').text(today.format('MMM D, YYYY'));

var exchangeContainer = document.getElementById('exchangeData');
var fromCu = document.getElementById('fromCu');

// const options = {
//   method: "GET",
//   headers: {
// 		'X-RapidAPI-Key': '03b2b11eabmshc11bc0e309c3ac9p1431cajsn49e731b9c888',
// 		'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
// 	}
// };

var apiUrl = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=FOREX:USD,FOREX:MXN&time_from=20220410T0130&limit=5&apikey=OU5F7U44A3TPPFCX';


var getNews = function() {
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
      displayNews(data.feed);
  })
  .catch(function (error) {
    console.log(error);
  });
};

var displayNews = function (data) {

    
    const tilesContainer =document.getElementById('tiles-container')  ;

    for (var i = 0; i < 5; i++) {
        var tileData = data[i];
        
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile', 'is-parent');
      

        const tileContent = `
        <article class="tile is-child box has-background-info">
          <p class="title has-text-light custom-font">${tileData.title}</p>
          <p class="subtitle is-3 custom-font">${tileData.source}</p>
          <div class= "box is-bordered">
          <a class="subtitle is-4  is-bordered custom-font" href="${tileData.url}" target="_blank">Read More</a>
          </div>
        </article>
      `;

      tileElement.innerHTML = tileContent;

        tilesContainer.appendChild(tileElement);
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
