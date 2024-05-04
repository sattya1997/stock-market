// Get the UL element where we'll populate the list
const tickerListElement = document.getElementById("ticker-list");

var socket;
const root = new protobuf.Root().add(PricingData);
var tickerNames = [];

// Function to fetch details
function fetchDetails(element) {
  if (element.checked) {
    startConnection(tickerNames);
  } else {
    stopConnection();
  }
}

function addDetails(element) {
  if (element.checked) {
    tickerNames.push(element.name);
    element.parentNode.parentNode.style.color = "black";
    element.parentNode.parentNode.style.fontWeight = "500";
  } else {
    tickerNames = tickerNames.filter((item) => item !== element.name);
    element.parentNode.parentNode.style.color = "#333";
    element.parentNode.parentNode.style.fontWeight = "400";
  }
}

//need to change
function stopConnection() {
  socket.close();
  socket = null;
}

//need to change
async function startConnection(tickerNames) {
  var recomendedTickerNames = "";
  tickerNames.forEach((ticker, index) => {
    if (index === 0) {
      recomendedTickerNames = `"${ticker}"`;
    } else {
      recomendedTickerNames = `${recomendedTickerNames},"${ticker}"`;
    }
  });
  socket = new WebSocket("wss://streamer.finance.yahoo.com");

  socket.onopen = () => {
    socket.send(`{"subscribe": [${recomendedTickerNames}]}`);
  };

  socket.onmessage = (event) => {
    var msg = event.data;
    msg = convertMessage(msg);
    const spans = document.querySelectorAll("#ticker-list li span.checkmark");
    var requiredList;
    var tickerValue = msg.id;
    var id = "";

    tickerDetailsNameList.forEach((tickerName) => {
      if (tickerName.name === tickerValue) {
        id = tickerName.data.id;
        tickerValue = tickerName.value;
        return;
      }
    });

    spans.forEach((span) => {
      if (span.textContent === tickerValue) {
        requiredList = span.parentNode;
      }
    });

    if (requiredList) {
      //update price
      const oldpriceSpan = requiredList.querySelector(`#price-${id}`);

      if (oldpriceSpan) {
        const oldPrice = oldpriceSpan.textContent;
        oldpriceSpan.innerHTML = msg.price.toFixed(3);

        if (oldPrice < msg.price.toFixed(3)) {
          oldpriceSpan.style.backgroundColor = "#b6ffb0";
        } else if (oldPrice > msg.price.toFixed(3)) {
          oldpriceSpan.style.backgroundColor = "#ff5757";
        } else {
          oldpriceSpan.style.backgroundColor = "#fff0f0";
        }
      } else {
        var newPriceSpan = document.createElement("span"); // Create a new span element
        newPriceSpan.id = "price-" + id;
        newPriceSpan.textContent = msg.price.toFixed(3);
        newPriceSpan.style.color = "black";
        newPriceSpan.style.backgroundColor = "white";
        requiredList.appendChild(newPriceSpan);
      }

      //update open price
      const oldOpenSpan = requiredList.querySelector(`#open-${id}`);

      if (oldOpenSpan) {
        oldOpenSpan.innerHTML = "O: " + (msg.price - msg.change).toFixed(2);
      } else {
        var newOpenSpan = document.createElement("span"); // Create a new span element
        newOpenSpan.id = "open-" + id;
        newOpenSpan.textContent = "O: " + (msg.price - msg.change).toFixed(2);
        newOpenSpan.style.color = "black";
        newOpenSpan.style.backgroundColor = "white";
        newOpenSpan.style.fontSize = "12px";
        requiredList.appendChild(newOpenSpan);
      }

      //update change and percentage
      const oldchangeSpan = requiredList.querySelector(`#change-${id}`);
      if (oldchangeSpan) {
        const oldChange = oldchangeSpan.textContent;

        if (msg.change_percent > 0) {
          oldchangeSpan.textContent =
            "+" +
            msg.change.toFixed(2) +
            `(+${msg.change_percent.toFixed(2)}%)`;
        } else {
          oldchangeSpan.textContent =
            msg.change.toFixed(2) + `(${msg.change_percent.toFixed(2)}%)`;
        }

        if (msg.change > 0) {
          oldchangeSpan.style.backgroundColor = "#b6ffb0";
        } else if (msg.change < 0) {
          oldchangeSpan.style.backgroundColor = "#ff5757";
        } else {
          oldchangeSpan.style.backgroundColor = "#fff0f0";
        }
      } else {
        var newChangeSpan = document.createElement("span"); // Create a new span element
        newChangeSpan.id = "change-" + id;
        if (msg.change_percent > 0) {
          newChangeSpan.innerHTML =
            "+" +
            msg.change.toFixed(2) +
            `(+${msg.change_percent.toFixed(2)}%)`;
        } else {
          newChangeSpan.innerHTML =
            msg.change.toFixed(2) + `(${msg.change_percent.toFixed(2)}%)`;
        }
        newChangeSpan.style.color = "black";
        newChangeSpan.style.backgroundColor = "white";
        newChangeSpan.style.fontSize = "12px";
        requiredList.appendChild(newChangeSpan);
      }

      //update volume
      const oldVolumeSpan = requiredList.querySelector(`#volume-${id}`);

      if (oldVolumeSpan) {
        oldVolumeSpan.innerHTML =
          "V: " + (msg.day_volume / 100000).toFixed(2) + " L";
      } else {
        var newVolumeSpan = document.createElement("span"); // Create a new span element
        newVolumeSpan.id = "volume-" + id;
        newVolumeSpan.textContent =
          "V: " + (msg.day_volume / 100000).toFixed(2) + " L";
        newVolumeSpan.style.color = "black";
        newVolumeSpan.style.backgroundColor = "white";
        newVolumeSpan.style.fontSize = "12px";
        requiredList.appendChild(newVolumeSpan);
      }
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = (event) => {};
}

function convertMessage(encodedData) {
  const data = buffer.Buffer.from(encodedData, "base64");
  const message = PricingData.decode(data);
  return message;
}

function createTickerList() {
  //clear the list items
  tickerListElement.innerHTML = "";
  // Loop through the array and create li elements
  tickerDetailsNameList.forEach((ticker) => {
    const listItem = document.createElement("li");
    //listItem.textContent = `${ticker.value}`;
    listItem.innerHTML = `<label class="checkbox"><input type="checkbox" name="${ticker.name}" value="${ticker.value}" onclick="addDetails(this)"></input></label><span class="checkmark">${ticker.value}</span>`;

    listItem.addEventListener("click", () => {
      //implement analize tab details
    });
    tickerListElement.appendChild(listItem);
  });
}

createTickerList();

function populateFormLive() {
  var form = document.getElementById("ticker-form-live");
  form.innerHTML = ""; // Clear existing form content

  tickerDetailsNameList.forEach(function (ticker, index) {
    var inputGroup = document.createElement("div");
    inputGroup.setAttribute("class", "input-group");
    inputGroup.innerHTML = `
      <div style="background-color: grey; padding: 5px 5px 5px 5px; border-radius:10px; margin-bottom:10px">
      <label>Ticker name:</label>
      <input type="text" name="tickerName-${index}" value="${ticker.name}" />
      <label>Display Name:</label>
      <input type="text" name="displayName-${index}" value="${ticker.value}" />
      <label>HTML ID:</label>
      <input type="text" name="id-${index}" value="${ticker.data.id}"/>
      </div>
    `;
    form.appendChild(inputGroup);
  });
}

function showModalLive() {
  document.getElementById("modal-overlay-live").style.display = "block";
  populateFormLive(); // Populate form when showing the modal
}

// Function to add a new ticker input group
function addNewTickerlive() {
  var form = document.getElementById("ticker-form-live");
  var index = form.children.length;
  var inputGroup = document.createElement("div");
  inputGroup.setAttribute("class", "input-group");
  inputGroup.innerHTML = `
    <div style="background-color: #9ad0bc; padding: 5px 5px 5px 5px; border-radius:10px; margin-bottom:10px">
    <label>Ticker name:</label>
    <input type="text" name="tickerName-${index}" value="" />
    <label>Display Name:</label>
    <input type="text" name="displayName-${index}" value="" />
    <label>HTML ID:</label>
    <input type="text" name="id-${index}" value=""/>
    </div>
  `;
  form.appendChild(inputGroup);
}

function closeModalLive() {
  document.getElementById("modal-overlay-live").style.display = "none";
}

function saveChangesLive() {
  var form = document.getElementById("ticker-form-live");
  var newStockTickers = [];
  for (var i = 0; i < form.children.length; i++) {
    var tickerName = form.querySelector(`[name="tickerName-${i}"]`);
    var idInput = form.querySelector(`[name="id-${i}"]`);
    var displayNameInput = form.querySelector(`[name="displayName-${i}"]`);

    if (idInput.value && displayNameInput.value && tickerName.value) {
      newStockTickers.push({
        name: tickerName.value,
        value: idInput.value,
        data: { id: displayNameInput.value },
      });
    }
  }

  if (tickerDetailsNameList === newStockTickers) {
    closeModalLive();
    return;
  }
  tickerDetailsNameList.length = 0;

  newStockTickers.forEach((item) => {
    tickerDetailsNameList.push(item);
  });
  createTickerList();
  closeModalLive();
}

document
  .getElementById("save-tickers-live")
  .addEventListener("click", function (event) {
    event.preventDefault();
    saveChangesLive();
  });

document
  .getElementById("edit-tickers-live")
  .addEventListener("click", showModalLive);

document
  .getElementById("close-modal-live")
  .addEventListener("click", closeModalLive);

document
  .getElementById("add-ticker-live")
  .addEventListener("click", addNewTickerlive);