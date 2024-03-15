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
    tickerNames = tickerNames.filter(item => item !== element.name);
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
  var recomendedTickerNames = '';
  tickerNames.forEach((ticker,index) => {
    if(index===0){
      recomendedTickerNames = `"${ticker}"`
    } else {
      recomendedTickerNames = `${recomendedTickerNames},"${ticker}"`
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
    var id = '';

    tickerDetailsNameList.forEach(tickerName => {
      if(tickerName.name === tickerValue) {
        id = tickerName.data.id;
        tickerValue = tickerName.value;
        return;
      }
    })

    spans.forEach((span) => {
      if (span.textContent === tickerValue) {
        requiredList = span.parentNode;
      }
    });

    if (requiredList) {
      const oldSpan = requiredList.querySelector(`#${id}`);

      if (oldSpan) {
        const oldPrice = oldSpan.textContent;
        oldSpan.innerHTML = msg.price.toFixed(3);

        if(oldPrice < msg.price.toFixed(3)) {
          oldSpan.style.backgroundColor = "#b6ffb0";
        } else if (oldPrice > msg.price.toFixed(3)) {
          oldSpan.style.backgroundColor  = "#ff5757";
        }
        else {
          oldSpan.style.backgroundColor  = "#fff0f0";
        }
        
      } else {
        var newSpan = document.createElement("span"); // Create a new span element
        newSpan.id = id;
        newSpan.textContent = msg.price.toFixed(3);
        newSpan.style.marginLeft = "10px";
        newSpan.style.color = "black";
        newSpan.style.backgroundColor  = "white";
        requiredList.appendChild(newSpan);
      }
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = (event) => {
  };
}

function convertMessage(encodedData) {
  const data = buffer.Buffer.from(encodedData, "base64");
  const message = PricingData.decode(data);
  return message;
}

// Loop through the array and create LI elements
tickerDetailsNameList.forEach((ticker) => {
  const listItem = document.createElement("li");
  //listItem.textContent = `${ticker.value}`;
  listItem.innerHTML = `<label class="checkbox"><input type="checkbox" name="${ticker.name}" value="${ticker.value}" onclick="addDetails(this)"></input></label><span class="checkmark">${ticker.value}</span>`;

  listItem.addEventListener("click", () => {
    //implement analize tab details
  });
  tickerListElement.appendChild(listItem);
});
