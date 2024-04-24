async function createCandlestickChart() {
  const toTimestamp = Math.floor(Date.now() / 1000);
  const fromTimestamp = new Date();
  fromTimestamp.setHours(5, 0, 0, 0); // Set time to 5:00 AM
  const fromTimestampInSeconds = Math.floor(fromTimestamp / 1000);

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var stockSymbol = urlParams.get("stockSymbol");
  // Sample stock data with volume
  const apiUrl = `https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol=${stockSymbol}&resolution=1&from=${fromTimestampInSeconds}&to=${toTimestamp}&countback=600&currencyCode=INR`;
  const res = await axios.get(apiUrl);

  var candlestickData;
  if (res && res.data && res.data.t) {
    const stockData = res.data;
    candlestickData = stockData.t.map((time, index) => ({
      t: time,
      o: stockData.o[index],
      h: stockData.h[index],
      l: stockData.l[index],
      c: stockData.c[index],
      v: stockData.v[index], // Include volume data for each entry
    }));

    const marketOpenHour = 9;
    const marketOpenMinutes = 15;
    const currentDayStart = new Date();
    currentDayStart.setHours(marketOpenHour, marketOpenMinutes, 0, 0);
    const currentDayStartTimestamp = Math.floor(currentDayStart / 1000);

    if (toTimestamp > currentDayStartTimestamp) {
      // Filter out previous day's data
      candlestickData = candlestickData.filter(
        (item) => item.t >= currentDayStartTimestamp
      );
    }
  }

  const ctx = document.getElementById("candlestickChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "candlestick", // Use 'candlestick' type for the main dataset
    data: {
      datasets: [
        {
          label: "Candlestick Data",
          data: candlestickData.map((item) => ({
            x: item.t * 1000, // Convert Unix timestamp to JavaScript timestamp
            o: item.o,
            h: item.h,
            l: item.l,
            c: item.c,
            color: item.c > item.o ? "green" : "red", // Custom color for candlesticks
          })),
          yAxisID: "price-axis",
        },
        {
          label: "Volume",
          data: candlestickData.map((item) => ({
            x: item.t * 1000, // Convert Unix timestamp to JavaScript timestamp
            y: item.v,
          })),
          type: "bar", // Use 'bar' type for volume bars
          yAxisID: "volume-axis",
          backgroundColor: "rgba(0, 0, 255, 0.13)", // Custom color for volume bars
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "minute",
            tooltipFormat: "ll HH:mm",
          },
        },
        y: [
          {
            id: "price-axis",
            scaleLabel: {
              display: true,
              labelString: "Price",
            },
          },
          {
            id: "volume-axis",
            position: "right", // Position the volume axis to the right
            scaleLabel: {
              display: true,
              labelString: "Volume",
            },
            grid: {
              drawOnChartArea: false, // Ensure volume bars don't cover candlesticks
            },
          },
        ],
      },
    },
  });
}

function onTimeframeChange(selectedValue) {
  console.log("Selected timeframe:", selectedValue);
  // You can call any function here that needs the selected value
  // For example:
  // updateChart(selectedValue);
}

function zoomIn() {
  const graph = document.getElementById("candle-stick");
  // Get the current width as a number (without 'px')
  let currentWidth = parseFloat(graph.style.width);

  // Calculate 10% of the current width
  let increase = currentWidth * 0.1;

  // Set the new width by adding 10% to the current width
  graph.style.width = `${currentWidth + increase}vw`;
}

function zoomOut() {
  const graph = document.getElementById("candle-stick");
  // Get the current width as a number (without 'px')
  let currentWidth = parseFloat(graph.style.width);
console.log(currentWidth);
  // Calculate 10% of the current width
  let decrease = currentWidth * 0.1;

  // Set the new width by adding 10% to the current width
  graph.style.width = `${currentWidth - decrease}vw`;
}

// Create the candlestick chart with volume bars
createCandlestickChart();
