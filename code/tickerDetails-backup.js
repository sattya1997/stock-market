//array of ticker names For now
const tickerDetailsNameList = [
    { name: "^NSEI", value: "Nifty 50", data: {id: "NSEI"} },
    { name: "TATAMOTORS.NS", value: "TATA Motors", data: {id: "TATAMOTORS"} },
    { name: "INFY.NS", value: "Infosys", data: {id: "INFY"} },
    { name: "NCC.NS", value: "NCC Limited", data: {id: "NCC"} },
    { name: "HAL.NS", value: "Hindustan Aeronotics Ltd(HAL)", data: {id: "HAL"} },
    { name: "ICICIB22.NS", value: "ICICIB22", data: {id: "ICICIB22"} },
    { name: "ONGC.NS", value: "Oil and Natural Gas Corporation(ONGC)", data: {id: "ONGC"} },
    { name: "CESC.NS", value: "CESC", data: {id: "CESC"} },
    { name: "AAPL", value: "APPLE INC", data: {id: "AAPL"} },
    { name: "GOOG", value: "Alphabet", data: {id: "GOOG"} },
  ];
  
  // Get the UL element where we'll populate the list
  const tickerListElement = document.getElementById("ticker-list");
  
  var socket;
  const root = new protobuf.Root().add(PricingData);
  
  // Function to fetch details
  function fetchDetails(element) {
    if (element.checked) {
      startConnection(element.name, element.value);
      element.parentNode.parentNode.style.color = "black";
      element.parentNode.parentNode.style.fontWeight = "500";
    } else {
      stopConnection(element.name);
      element.parentNode.parentNode.style.color = "#333";
      element.parentNode.parentNode.style.fontWeight = "400";
    }
  }
  
  //need to change
  function stopConnection(tickerName) {
    socket.send(`{"unsubscribe": ["${tickerName}"]}`);
  }
  
  //need to change
  async function startConnection(tickerName, tickerValue) {
    socket = new WebSocket("wss://streamer.finance.yahoo.com");
  
    socket.onopen = () => {
      socket.send(`{"subscribe": ["${tickerName}"]}`);
    };
  
    socket.onmessage = (event) => {
      var msg = event.data;
      msg = convertMessage(msg);
      var spans = document.querySelectorAll("#ticker-list li span.checkmark");
  
      var requiredList;
  
      spans.forEach((span) => {
        if (span.textContent === tickerValue) {
          requiredList = span.parentNode;
        }
      });
  
      var id;
  
      if (requiredList) {
        tickerDetailsNameList.forEach( tick => {
          if(tick.name === tickerName) {
            id = tick.data.id;
            return;
          }
        });
  
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
    listItem.innerHTML = `<label class="checkbox"><input type="checkbox" name="${ticker.name}" value="${ticker.value}" onclick="fetchDetails(this)"></input></label><span class="checkmark">${ticker.value}</span>`;
  
    listItem.addEventListener("click", () => {
      //implement analize tab details
    });
    tickerListElement.appendChild(listItem);
  });
  