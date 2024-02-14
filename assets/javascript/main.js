var today = dayjs();
$("#currentDay").text(today.format("dddd, MMMM D YYYY, h:mm:ss a"));

var exchangeContainer = document.getElementById("exchangeData");
var fromCu = document.getElementById("fromCu");

// wrapping all code that interacts with the dom within this function:
$(function () {
  var burgerIcon = document.querySelector("#burger");
  var navBarMenu = document.querySelector("#navbar-links");
  burgerIcon.addEventListener("click", () => {
    navBarMenu.classList.toggle("is-active");
  });

  // function to update time, date, and currency values in real time
  function updateTime() {
    var now = dayjs();
    $("#today").text(now.format("dddd, MMMM DD, YYYY")); //! date
    $("#hour").text(now.format("h:mm:ss A")); //! time
    var apiUrl =
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
    // Fetch data for 1 USD to MXN conversion
    fetch(apiUrl + "mxn/usd.json")
      .then((response) => response.json())
      .then((data) => {
        var exchangeRate = data.usd;
        document.getElementById(
          "mxnToday"
        ).textContent = `🇲🇽 1 MXN = $${exchangeRate.toFixed(2)} USD`;
      })
      .catch((error) => {
        console.error("Error fetching currency rates:", error);
      });
    // Fetch data for 1 MXN to USD conversion
    fetch(apiUrl + "usd/mxn.json")
      .then((response) => response.json())
      .then((data) => {
        var exchangeRate = data.mxn;
        document.getElementById(
          "usdToday"
        ).textContent = `🇺🇸 1 USD  = $${exchangeRate.toFixed(2)} MXN`;
      });
  }
  // Update date and time immediately
  updateTime();
  // Update date and time every second
  setInterval(updateTime, 1000);
  // inputted text saved in local storage
  var lastUsedValue = document.getElementById("valueOfLS");
  var inputtedValue = document.getElementById("amount");
  var conversionTypeSelect = document.getElementById("ConversionType");
  var convertBtn = document.getElementById("convert");

  convertBtn.addEventListener("click", function () {
    saveToLS();
  });

  window.addEventListener("load", function () {
    var savedData = localStorage.getItem("savedText");
    if (savedData) {
      var data = JSON.parse(savedData);
      lastUsedValue.classList.remove("hide");
      lastUsedValue.innerHTML = `Last inputted value in previous session: ${
        data.text
      } ${data.conversionType === "usdToMxn" ? "USD" : "MXN"}`;
    }
  });

  function saveToLS() {
    var inputTextLS = inputtedValue.value.trim();
    var conversionType = conversionTypeSelect.value;
    if (/^\d*\.?\d+$/.test(inputTextLS)) {
      var data = {
        text: inputTextLS,
        conversionType: conversionType,
      };
      var dataString = JSON.stringify(data);
      localStorage.setItem("savedText", dataString);
      console.log(localStorage);
    } 
  }

  //var apiUrl = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=FOREX:USD&time_from=20220410T0130&limit=5&apikey=210UWE1WJU146YH8';

  var getNews = function () {
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        displayNews(data.feed);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var displayNews = function (data) {
    var tilesContainer = document.getElementById("tiles-container");

    for (var i = 0; i < 5; i++) {
      var tileData = data[i];

      var tileElement = document.createElement("div");
      tileElement.classList.add("tile", "is-parent");

      var tileContent = `
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

  document.getElementById("convert").addEventListener("click", function () {
    var amountInput = document.getElementById("amount");
    var amountValue = amountInput.value.trim();
    var amount = parseFloat(amountValue);

    if (
      amountValue === "" ||
      isNaN(amount) ||
      amount <= 0 ||
      amountValue.match(/[^\d.]/)
    ) {
      showModal();
      return;
    }

    var ConversionType = document.getElementById("ConversionType").value;
    let urlApi =
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
    if (ConversionType === "usdToMxn") {
      urlApi += "usd/mxn.json";
    } else if (ConversionType === "mxnToUsd") {
      urlApi += "mxn/usd.json";
    }
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {
        var exchangeRate =
          ConversionType === "usdToMxn" ? data.mxn : data.usd;
        var result = amount * exchangeRate;
        var message =
          ConversionType === "usdToMxn"
            ? `${result.toFixed(2)} MXN`
            : `${result.toFixed(2)} USD`;
        document.getElementById("result").innerHTML = message;
      });
  });

  function showModal() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  getNews();
});
