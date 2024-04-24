var cards = [];
var stockTickers = [
  { id: "notapplicable/inidicesindia/in%3BNSX", displayName: "Nifty 50", name:  "in%3BNSX"},
  { id: "TEL", displayName: "Tata Motors", name:  "TATAMOTORS" },
  { id: "IT", displayName: "Infosys", name:  "INFY" },
  { id: "NCC01", displayName: "NCC Ltd", name:  "NCC" },
  { id: "HAL", displayName: "HAL", name:  "HAL" },
  { id: "ICI15", displayName: "ICICIB22", name:  "ICICIB22" },
  { id: "ONG", displayName: "ONGC", name:  "ONGC" },
  { id: "CES", displayName: "CESC", name:  "CESC" },
  { id: "OI13", displayName: "Oil India", name:  "OIL" },
  { id: "GBE", displayName: "Goldbees", name:  "GOLDBEES" },
];
var analyzeStart = false;

function createCard(cardData) {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", cardData.id);
  card.innerHTML = `
      <div class="card-title">
        <span class="stock-name">${cardData.name}</span>
        <span class="current-price">${cardData.currentprice}</span>
      </div>
      <div class="details">
        <span class="percent-change">Chg: ${cardData.change} (${cardData.percentchange}%)</span>
        <span class="open-price">O: ${cardData.open}</span>
      </div>
      <div class="graph"><canvas id="stockChart"></canvas></div>
      <div class="bar">
        <div class="bar-container" data-name="details-days-range">
          <div class="header">
            <span class="price" id="low-price">0</span>
            <span class="title">Day's Range</span>
            <span class="price" id="high-price">0</span>
          </div>
          <div class="range">
            <div class="range-bar" id="priceBar"></div>
            <div class="arrowContainer">
              <div class="arrow" id="arrow">
                <img src="./icons/arrow.svg" alt="^"/><span id="arrowText"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-container">
      <ul class="card-list bid-list">
        <li><strong>Bid List:</strong></li>
        ${cardData.bidlist
          .map((bid) => `<li>${bid.price} x ${bid.quantity}</li>`)
          .join("")}
      </ul>
      <ul class="card-list ask-list">
        <li><strong>Ask List:</strong></li>
        ${cardData.asklist
          .map((ask) => `<li>${ask.price} x ${ask.quantity}</li>`)
          .join("")}
      </ul>
    </div>
      <div class="volume">Volume: ${cardData.volume}</div>
      <div class="sell-buy">B: ${cardData.totBuyQty} S: ${
    cardData.totSellQty
  } D: ${cardData.buySellDiff}</div>
    `;
  return card;
}

function populateCards() {
  generateCardsArray();

  const container = document.getElementById("analyze-details-tab");
  container.innerHTML = "";

  cards.forEach((cardData) => {
    container.appendChild(createCard(cardData));
  });
}

function updateCard(cardElement, cardData) {
  const askbid = convertAskBid(cardData.best_5_set);

  // Update the card element with the new data
  cardElement.querySelector(".current-price").textContent = parseFloat(cardData.pricecurrent).toFixed(2);
  cardElement.querySelector(".current-price").style.color = (cardData.pricecurrent < cardData.OPEN | cardData.pricecurrent < cardData.OPN)? "red": "green" 

  const details = cardElement.querySelector(".details");
  
  if(cardData.pricechange > 0) {
    details.innerHTML = `<span>Chg: +${parseFloat(cardData.pricechange).toFixed(2)} (+${parseFloat(cardData.pricepercentchange).toFixed(2)}%)</span><span>O: ${cardData.OPN ? cardData.OPN : cardData.OPEN}</span>`;
    details.style.color = "green";
  } else {
    details.innerHTML = `<span>Chg: ${parseFloat(cardData.pricechange).toFixed(2)} (${parseFloat(cardData.pricepercentchange).toFixed(2)}%)</span><span>O: ${cardData.OPN ? cardData.OPN : cardData.OPEN}</span>`;
    details.style.color = "red";
  }
  
  cardElement.querySelector(".bid-list").innerHTML = `<li><strong>Bid List:</strong></li>
    ${askbid.bidlist
      .map((bid) => `<li>${bid.price} x ${bid.quantity}</li>`)
      .join("")}`;
  cardElement.querySelector(
    ".ask-list"
  ).innerHTML = `<li><strong>Ask List:</strong></li>
    ${askbid.asklist
      .map((ask) => `<li>${ask.price} x ${ask.quantity}</li>`)
      .join("")}`;
  var volData =
    "<span>vol: " + (cardData.VOL / 100000).toFixed(2) + " Lakh  </span>";

  if (cardData && cardData.DVolAvg30 && cardData.DVolAvg30 > 0) {
    volData =
      volData +
      "<span>, monthly avg: " +
      (cardData.DVolAvg30 / 100000).toFixed(2) +
      "L</span>";
  }

  cardElement.querySelector(".volume").innerHTML = volData;
  cardElement.querySelector(".sell-buy").innerHTML = `B: ${(
    cardData.tot_buy_qty / 100000
  ).toFixed(2)} L | S: ${(cardData.tot_sell_qty / 100000).toFixed(2)} L | D: ${(
    (cardData.tot_buy_qty - cardData.tot_sell_qty) /
    100000
  ).toFixed(3)} L`;
  //update bar
  var openPrice = 0;
  if (cardData.OPN) {
    openPrice = cardData.OPN;
  } else {
    openPrice = cardData.OPEN;
  }

  const currentPrice = cardData.pricecurrent;
  var highPrice = 0;
  var lowPrice = 0;
  if (cardData.HP && cardData.LP) {
    highPrice = cardData.HP;
    lowPrice = cardData.LP;
  } else {
    highPrice = cardData.HIGH;
    lowPrice = cardData.LOW;
  }
  updateBar(cardElement, openPrice, currentPrice, highPrice, lowPrice);
}

function updateBar(cardElement, openPrice, currentPrice, highPrice, lowPrice) {
  cardElement.querySelector("#low-price").innerHTML = lowPrice;
  cardElement.querySelector("#low-price").style.fontWeight = "500";
  cardElement.querySelector("#high-price").innerHTML = highPrice;
  cardElement.querySelector("#high-price").style.fontWeight = "500";

  const currentPercentage =
    ((currentPrice - lowPrice) / (highPrice - lowPrice)) * 100;
  const openPercent = ((openPrice - lowPrice) / (highPrice - lowPrice)) * 100;

  const barElement = cardElement.querySelector("#priceBar");
  const arrowElement = cardElement.querySelector("#arrow");
  const arrowText = cardElement.querySelector("#arrowText");

  barElement.style.backgroundColor =
    currentPrice >= openPrice ? "#95d899" : "#ff8181";
  barElement.style.left = `${openPercent}%`;

  arrowElement.style.left = `${currentPercentage}%`;
  arrowText.innerHTML = currentPrice;

  if (currentPrice >= openPrice) {
    barElement.style.left = `${openPercent}%`;
    barElement.style.width = `${currentPercentage - openPercent}%`;
  } else {
    barElement.style.left = `${currentPercentage}%`;
    barElement.style.width = `${openPercent - currentPercentage}%`;
  }

  if (openPrice === highPrice || currentPrice === highPrice) {
    barElement.style.borderBottomRightRadius = "10px";
    barElement.style.borderTopRightRadius = "10px";
  } else {
    barElement.style.borderBottomRightRadius = "0";
    barElement.style.borderTopRightRadius = "0";
  }

  if (openPrice === lowPrice || currentPrice === lowPrice) {
    barElement.style.borderBottomLeftRadius = "10px";
    barElement.style.borderTopLeftRadius = "10px";
  } else {
    barElement.style.borderBottomLeftRadius = "0";
    barElement.style.borderTopLeftRadius = "0";
  }
}

function refreshCardData(newCardData, id) {
  const cardElement = document.querySelector(`.card[data-id="${id}"]`);
  if (cardElement) {
    updateCard(cardElement, newCardData);
  }
}

function convertAskBid(data) {
  const buylist = [];
  const selllist = [];

  // Iterate over the data object
  for (const key in data) {
    const item = data[key];

    var rate = parseFloat(item.buyrate); // Convert rate to a floating-point number
    var qty = parseFloat(item.buyqty); // Convert qty to a floating-point number
    // Add to buylist
    buylist.push({ price: rate, quantity: qty });

    rate = parseFloat(item.sellrate); // Convert rate to a floating-point number
    qty = parseFloat(item.sellqty);
    // Add to selllist
    selllist.push({ price: rate, quantity: qty });
  }

  const convertedData = { bidlist: selllist, asklist: buylist };

  return convertedData;
}

function showModal() {
  document.getElementById("modal-overlay").style.display = "block";
  populateForm(); // Populate form when showing the modal
}

// Function to close the modal
function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
}

// Event listener for the edit button
document.getElementById("edit-tickers").addEventListener("click", showModal);

// Event listener for the close button
document
  .getElementById("close-modal")
  .addEventListener("click", function (event) {
    event.preventDefault();
    closeModal();
  });

// Function to populate the form with the current stock tickers
function populateForm() {
  var form = document.getElementById("ticker-form");
  form.innerHTML = ""; // Clear existing form content

  stockTickers.forEach(function (ticker, index) {
    var inputGroup = document.createElement("div");
    inputGroup.setAttribute("class", "input-group");
    inputGroup.innerHTML = `
        <label>ID:</label>
        <input type="text" name="id-${index}" value="${ticker.id}" />
        <label>Display Name:</label>
        <input type="text" name="displayName-${index}" value="${ticker.displayName}" />
      `;
    form.appendChild(inputGroup);
  });
}

// Function to add a new ticker input group
function addNewTicker() {
  var form = document.getElementById("ticker-form");
  var index = form.children.length;
  var inputGroup = document.createElement("div");
  inputGroup.setAttribute("class", "input-group");
  inputGroup.innerHTML = `
      <label>ID:</label>
      <input type="text" name="id-${index}" value="" />
      <label>Display Name:</label>
      <input type="text" name="displayName-${index}" value="" />
    `;
  form.appendChild(inputGroup);
}

// Event listener for the add button
document.getElementById("add-ticker").addEventListener("click", addNewTicker);

// Function to save the changes
function saveChanges() {
  var form = document.getElementById("ticker-form");
  var newStockTickers = [];
  for (var i = 0; i < form.children.length; i++) {
    var idInput = form.querySelector(`[name="id-${i}"]`);
    var displayNameInput = form.querySelector(`[name="displayName-${i}"]`);
    if (idInput.value && displayNameInput.value) {
      newStockTickers.push({
        id: idInput.value,
        displayName: displayNameInput.value,
      });
    }
  }

  if (stockTickers === newStockTickers) {
    closeModal();
    return;
  }
  stockTickers.length = 0;

  newStockTickers.forEach((item) => {
    stockTickers.push(item);
  });
  fetchTickerData();
  closeModal();
  populateCards();
}

// Event listener for the save button
document
  .getElementById("save-tickers")
  .addEventListener("click", function (event) {
    event.preventDefault();
    saveChanges();
  });

function generateCardsArray() {
  cards.length = 0;
  stockTickers.forEach((ticker) => {
    cards.push({
      id: ticker.id,
      name: ticker.displayName,
      currentprice: 0,
      percentchange: 0,
      change: 0,
      dayhigh: 0,
      daylow: 0,
      open: 0,
      volume: 0,
      totBuyQty: 0,
      totSellQty: 0,
      buySellDiff: 0,
      bidlist: [
        {
          price: 0,
          quantity: 0,
        },
        {
          price: 0,
          quantity: 0,
        },
        {
          price: 0,
          quantity: 0,
        },
        {
          price: 0,
          quantity: 0,
        },
        {
          price: 0,
          quantity: 0,
        },
      ],
      asklist: [
        {
          price: 0,
          quantity: 0,
        },
        {
          price: 0,
          quantity: 0,
        },
        {
          price: 0,
          quantity: 0,
        },
        {
          price: 0,
          quantity: 0,
        },
        {
          price: 0,
          quantity: 0,
        },
      ],
    });
  });
}

async function fetchTickerData() {
  var res;
  for (let index = 0; index < stockTickers.length; index++) {
    if (stockTickers[index].displayName === "Nifty 50") {
      res = await axios.get(urlNifty + stockTickers[index].id);
      //console.log(res.data);
      refreshCardData(res.data.data, stockTickers[index].id);
    } else {
      res = await axios.get(moneycontrolUrl + stockTickers[index].id);
      //console.log(res.data);
      refreshCardData(res.data.data, stockTickers[index].id);
    }
  }

  //update time
  document.getElementById("time-stamp").innerHTML =
    '<p style="color: #373737;font-weight: 600;">Last update time: <span style="color:green">' +
    res.data.data.lastupd.split(" ")[1] +
    "</span></p>";
}

populateCards();

var analyzeToggle = document.getElementById("analyzeToggle");
var onOffText = document.getElementById("onOffText");
var slider = document.querySelector(".slider");
var icon = document.querySelector(".icon");

analyzeToggle.addEventListener("change", function () {
  var isChecked = analyzeToggle.checked;

  slider.style.backgroundColor = isChecked ? "#7cd380" : "#ff8181";
  onOffText.textContent = isChecked ? "On" : "Off";
  onOffText.style.left = isChecked ? "25%" : "70%";
  icon.style.left = isChecked ? "33px" : "6.7px";
  icon.style.color = isChecked ? "#333" : "#e6e3e3";
  if (isChecked) {
    analyzeStart = true;
    startAnalyze();
  } else {
    stopAnalyze();
  }
});

async function loadGraphData() {


  var graphData;

  // for (let index = 0; index < stockTickers.length; index++) {
  //   if (stockTickers[index].displayName === "Nifty 50") {
  //     continue;
  //     // res = await axios.get(`https://api.moneycontrol.com/mcapi/v1/stock/estimates/price-forecast?scId=${ stockTickers[index].id }&ex=N&deviceType=W`);
  //     // console.log(res.data);
  //     //refreshCardData(res.data.data, stockTickers[index].id);
  //   } else {
  //     res = await axios.get(`https://api.moneycontrol.com/mcapi/v1/stock/estimates/price-forecast?scId=${ stockTickers[index].id }&ex=N&deviceType=W`);
  //     if(res && res.data && res.data.data && res.data.data.graphData) {
  //       graphData = res.data.data.graphData;
  //     } else {
  //       continue;
  //     }

  //     const cardElement = document.querySelector(`.card[data-id="${stockTickers[index].id}"]`);
  //     createGraph(graphData, cardElement);
  //     graphData = null;
  //   }
  // }

  const toTimestamp = Math.floor(Date.now() / 1000);
  const fromTimestamp = new Date();
  fromTimestamp.setHours(5, 0, 0, 0); // Set time to 5:00 AM
  const fromTimestampInSeconds = Math.floor(fromTimestamp / 1000);

  for (let index = 0; index < stockTickers.length; index++) {
    const apiUrl = `https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol=${ stockTickers[index].name }&resolution=1&from=${fromTimestampInSeconds}&to=${toTimestamp}&countback=500&currencyCode=INR`;
    res = await axios.get(apiUrl);
    if(res && res.data && res.data.t) {
      graphData = res.data;
    } else {
      continue;
    }

    const cardElement = document.querySelector(`.card[data-id="${stockTickers[index].id}"]`);
    createGraph(graphData, cardElement);
    graphData = null;

  }

}

function createGraph(graphData, cardElement) {
  const labels = graphData.t.map(timestamp => new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).slice(0, -3))
  const prices = graphData.c

  const ctx = cardElement.querySelector("#stockChart").getContext("2d");
  new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Stock Price",
                data: prices,
                borderColor: "black",
                borderWidth: 0.5,
                fill: true,
                pointRadius: 0,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                  type: "time",
                  unit: "minute",
                  displayFormats: {
                  minute: 'HH:mm' // Display time in HH:MM format
                  },
                },
                y: {
                  title: {
                    display: false,
                  },
                  ticks: {
                    fontSize: 10, // Set the desired font size
                  },
              },
              plugins: {
                legend: {
                display: false // Hide legend
              } 
    }
          },
      },
  });
}

async function startAnalyze() {
  loadGraphData();
  while (analyzeStart) {
    fetchTickerData();
    try {
      await new Promise((r) => setTimeout(r, 2000));
    } catch (error) {
      console.log(error);
    }
  }
}

function stopAnalyze() {
  analyzeStart = false;
}

// Event listener for the search button
document.getElementById("search-button").addEventListener("click", function (event) {
  event.preventDefault();
  var searchQuery = document.getElementById("search-input").value;
  axios
    .post(
      `https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=${searchQuery}&type=1&format=json`
    )
    .then(function (response) {
      var results = response.data;
      var resultsContainer = document.getElementById(
        "search-results-container"
      );
      resultsContainer.style.display = "block";
      resultsContainer.innerHTML = "";
      results.forEach(function (item) {
        var resultItem = document.createElement("span");
        resultItem.textContent = `${item.stock_name}(id: ${item.sc_id})`;
        resultItem.addEventListener("click", function () {
          addTickerToForm(item.sc_id, item.stock_name);
          saveChanges();
          document.getElementById("search-input").value = "";
          resultsContainer.innerHTML = "";
          resultsContainer.style.display = "none";
        });
        resultsContainer.appendChild(resultItem);
      });
    })
    .catch(function (error) {
      console.error(error);
    });
}); // Function to add the selected ticker to the form

function addTickerToForm(id, displayName) {
  var form = document.getElementById("ticker-form");
  var inputGroup = document.createElement("div");
  inputGroup.setAttribute("class", "input-group");
  inputGroup.innerHTML = `
<label>ID:</label>
 <input type="text" name="id-${form.children.length}" value="${id}" />
 <label>Display Name:</label>
<input type="text" name="displayName-${form.children.length}" value="${displayName}" />
`;
  form.appendChild(inputGroup);
}

document.getElementById("clear-button").addEventListener("click", function (event) {
  event.preventDefault();
  var resultsContainer = document.getElementById("search-results-container");

  resultsContainer.innerHTML = "";
  resultsContainer.style.display = "none";
  document.getElementById("search-input").value = "";
});

function goToDetails(element) {
  var cardElement = element.closest(".card");
  var dataId = cardElement.getAttribute("data-id");
  var stockSymbol;
  cont data = stockTickers.find(tickers => tickers.id === dataId)
  
  if (data) {
    stockSymbol = data.symbol;
  }
  
  window.location.href = `./candle/advChart.html?stockSymbol=${ stockSymbol }`;
}

analyzeToggle.dispatchEvent(new Event("change"));
