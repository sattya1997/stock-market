var cards = [];
var stockTickers = [{ "id": "notapplicable/inidicesindia/in%3BNSX", "displayName": "Nifty 50" }, { "id": "TEL", "displayName": "Tata Motors" }, { "id": "IT", "displayName": "Infosys" }, { "id": "NCC01", "displayName": "NCC Ltd" }, { "id": "HAL", "displayName": "HAL" }, { "id": "ICI15", "displayName": "ICICIB22" }, { "id": "ONG", "displayName": "ONGC" }, { "id": "CES", "displayName": "CESC" },]
var analyzeStart = false;

function createCard(cardData) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', cardData.id);
    card.innerHTML = `
      <div class="stock-name">${cardData.name}</div>
      <div class="current-price">${cardData.currentprice}</div>
      <div class="details">
        Chg: ${cardData.change} (${cardData.percentchange}%) | 
        O: ${cardData.open} | H: ${cardData.dayhigh} | L: ${cardData.daylow}
      </div>
      <div class="list-container">
      <ul class="card-list bid-list">
        <li><strong>Bid List:</strong></li>
        ${cardData.bidlist.map(bid => `<li>${bid.price} x ${bid.quantity}</li>`).join('')}
      </ul>
      <ul class="card-list ask-list">
        <li><strong>Ask List:</strong></li>
        ${cardData.asklist.map(ask => `<li>${ask.price} x ${ask.quantity}</li>`).join('')}
      </ul>
    </div>
      <div class="volume">Volume: ${cardData.volume}</div>
    `;
    return card;
}

function populateCards() {
    generateCardsArray();

    const container = document.getElementById('analyze-details-tab');
    container.innerHTML = '';

    cards.forEach(cardData => {
        container.appendChild(createCard(cardData));
    });
}

function updateCard(cardElement, cardData) {
    const askbid = convertAskBid(cardData.best_5_set);
    // Update the card element with the new data
    cardElement.querySelector('.current-price').textContent = parseFloat(cardData.pricecurrent).toFixed(2);
    cardElement.querySelector('.details').innerHTML = `<p>Chg: ${parseFloat(cardData.pricechange).toFixed(2)} (${parseFloat(cardData.pricepercentchange).toFixed(2)}%) | 
    Open: ${cardData.OPN || 'NA'}</p><p>High: ${cardData.HP || 'NA'} | Low: ${cardData.LP || 'NA'}</p>`;
    cardElement.querySelector('.bid-list').innerHTML = `<li><strong>Bid List:</strong></li>
    ${askbid.bidlist.map(bid => `<li>${bid.price} x ${bid.quantity}</li>`).join('')}`;
    cardElement.querySelector('.ask-list').innerHTML = `<li><strong>Ask List:</strong></li>
    ${askbid.asklist.map(ask => `<li>${ask.price} x ${ask.quantity}</li>`).join('')}`;
    var volData = '<span>vol: '+(cardData.VOL / 100000).toFixed(2) + ' Lakh  </span>';

    if(cardData && cardData.DVolAvg30 && cardData.DVolAvg30 > 0) {
        volData = volData + '<span>, monthly avg: '+(cardData.DVolAvg30 / 100000).toFixed(2)+'L</span>';
    }

    cardElement.querySelector('.volume').innerHTML = volData;
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
        const rate = parseFloat(item.sellrate); // Convert rate to a floating-point number
        const qty = parseFloat(item.sellqty); // Convert qty to a floating-point number

        // Add to buylist
        buylist.push({ "price": rate, "quantity": qty });

        // Add to selllist
        selllist.push({ "price": rate, "quantity": qty });
    }

    const convertedData = { "bidlist": buylist, "asklist": selllist };

    return convertedData;
}

function showModal() {
    document.getElementById('modal-overlay').style.display = 'block';
    populateForm(); // Populate form when showing the modal
}

// Function to close the modal
function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

// Event listener for the edit button
document.getElementById('edit-tickers').addEventListener('click', showModal);

// Event listener for the close button
document.getElementById('close-modal').addEventListener('click', function (event) {
    event.preventDefault();
    closeModal();
});

// Function to populate the form with the current stock tickers
function populateForm() {
    var form = document.getElementById('ticker-form');
    form.innerHTML = ''; // Clear existing form content

    stockTickers.forEach(function (ticker, index) {
        var inputGroup = document.createElement('div');
        inputGroup.setAttribute('class', 'input-group');
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
    var form = document.getElementById('ticker-form');
    var index = form.children.length;
    var inputGroup = document.createElement('div');
    inputGroup.setAttribute('class', 'input-group');
    inputGroup.innerHTML = `
      <label>ID:</label>
      <input type="text" name="id-${index}" value="" />
      <label>Display Name:</label>
      <input type="text" name="displayName-${index}" value="" />
    `;
    form.appendChild(inputGroup);
}

// Event listener for the add button
document.getElementById('add-ticker').addEventListener('click', addNewTicker);

// Function to save the changes
function saveChanges() {
    var form = document.getElementById('ticker-form');
    var newStockTickers = [];
    for (var i = 0; i < form.children.length; i++) {
        var idInput = form.querySelector(`[name="id-${i}"]`);
        var displayNameInput = form.querySelector(`[name="displayName-${i}"]`);
        if (idInput.value && displayNameInput.value) {
            newStockTickers.push({
                id: idInput.value,
                displayName: displayNameInput.value
            });
        }
    }

    if (stockTickers === newStockTickers) {
        closeModal();
        return;
    }

    stockTickers = newStockTickers; // Update the stockTickers array
    fetchTickerData();
    closeModal();
    populateCards();
}

// Event listener for the save button
document.getElementById('save-tickers').addEventListener('click', function (event) {
    event.preventDefault();
    saveChanges();
});

function generateCardsArray() {
    stockTickers.forEach(ticker => {
        cards.push({
            "id": ticker.id,
            "name": ticker.displayName,
            "currentprice": 0,
            "percentchange": 0,
            "change": 0,
            "dayhigh": 0,
            "daylow": 0,
            "open": 0,
            "volume": 0,
            "bidlist": [
                {
                    "price": 0,
                    "quantity": 0
                },
                {
                    "price": 0,
                    "quantity": 0
                },
                {
                    "price": 0,
                    "quantity": 0
                },
                {
                    "price": 0,
                    "quantity": 0
                },
                {
                    "price": 0,
                    "quantity": 0
                }
            ],
            "asklist": [
                {
                    "price": 0,
                    "quantity": 0
                },
                {
                    "price": 0,
                    "quantity": 0
                },
                {
                    "price": 0,
                    "quantity": 0
                },
                {
                    "price": 0,
                    "quantity": 0
                },
                {
                    "price": 0,
                    "quantity": 0
                }
            ]
        })
    });
};

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
    document.getElementById('time-stamp').innerHTML = '<p style="color: #373737;font-weight: 600;">Last update time: <span style="color:green">' + res.data.data.lastupd.split(' ')[1] + '</span></p>';
}

populateCards();

async function startAnalyze() {
    analyzeStart = true;
    while (analyzeStart) {
        fetchTickerData();
        try {
            await new Promise(r => setTimeout(r, 2000));
        } catch (error) {
            console.log(error);
        }
    }
}

function stopAnalyze() {
    analyzeStart = false;
}
