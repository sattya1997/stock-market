const toTimestamp = Math.floor(Date.now() / 1000);
const fromTimestamp = new Date();
fromTimestamp.setDate(fromTimestamp.getDate() - 1);
fromTimestamp.setHours(5, 0, 0, 0); // Set time to 5:00 AM

const fromTimestampInSeconds = Math.floor(fromTimestamp / 1000);

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var stockSymbol = urlParams.get("stockSymbol");
const apiUrl = `https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol=${stockSymbol}&resolution=1&from=${fromTimestampInSeconds}&to=${toTimestamp}&countback=3000&currencyCode=INR`;

var candlestickData = [];
var volumeData = [];

var slider = document.getElementById("candle-range");
var output = document.getElementById("candle-number");
slider.value = sessionStorage.getItem("sliderValue");
output.innerHTML = slider.value;
sessionStorage.setItem("sliderValue", slider.value);

var tooltipValue = sessionStorage.getItem("tooltipValue");
tooltipValue = tooltipValue === "true";
var checkbox = document.getElementById("tooltip-toggle");
checkbox.checked = tooltipValue;

var gapValue = sessionStorage.getItem("gapValue");
gapValue = gapValue === "true";
var gapbox = document.getElementById("gap-toggle");
gapbox.checked = gapValue;

const date = new Date();
date.setDate(date.getDate() - 6);
date.setHours(9, 15, 0, 0);

const zoomOptions = {
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    mode: "xy",
  },
  limits: {
    x: {
      min: date,
      max: new Date(),
    },
  },
  pan: {
    enabled: true,
    mode: "xy",
  },
};

var ctx = document.getElementById("candlestickChart").getContext("2d");
var chart = new Chart(ctx, {
  type: "candlestick", // Use 'candlestick' type for the main dataset
  data: {
    datasets: [
      {
        label: stockSymbol,
        data: candlestickData,
        yAxisID: "price-axis",
      },
      {
        type: "bar",
        label: "Volume",
        data: volumeData,
        backgroundColor: "rgba(0, 0, 255, 0.13)",
      },
    ],
  },
  options: {
    animation: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          tooltipFormat: "HH:mm",
        },
      },
      y: {
        display: false, // Keep this as false to hide the volume axis
        scaleLabel: {
          display: false,
        },
        ticks: {
          display: false,
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      zoom: zoomOptions,
      tooltip: {
        enabled: tooltipValue,
      },
    },
  },
});

try {
  setInterval(async () => {
    chart.options = {
      responsive: true,
      plugins: {
        zoom: zoomOptions,
        tooltip: {
          enabled: tooltipValue,
        },
      },
    };
    getCandlestickChartData();
  }, 2000);
} catch (error) {
  console.error("Error fetching chart data:", error);
}

async function getCandlestickChartData() {
  const res = await axios.get(apiUrl);
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

    var newCandlestickData = candlestickData;
    if (toTimestamp > currentDayStartTimestamp) {
      // Filter out previous day's data
      newCandlestickData = candlestickData;
      // .filter(
      //   (item) => item.t >= currentDayStartTimestamp
      // );

      //is no dada is there after filter then find the previous days data.only when market is closed or not yet open
      if (newCandlestickData.length < 1) {
        currentDayStart.setDate(currentDayStart.getDate() - 1);

        const previousDayStartTimestamp = Math.floor(
          currentDayStart.getTime() / 1000
        );
        newCandlestickData = candlestickData;
        // .filter(
        //   (item) => item.t >= previousDayStartTimestamp
        // );
      }
    }

    candlestickData = newCandlestickData.map((item) => ({
      x: item.t * 1000, // Convert Unix timestamp to JavaScript timestamp
      o: item.o,
      h: item.h,
      l: item.l,
      c: item.c,
    }));

    volumeData = newCandlestickData.map((item) => ({
      x: item.t * 1000,
      y: item.v,
    }));

    const sliderValue = sessionStorage.getItem("sliderValue");

    chart.data.datasets[0].data = candlestickData.slice(-this.value);;
    chart.data.datasets[1].data = volumeData.slice(-this.value);;
    chart.options = {
      responsive: true,
      plugins: {
        zoom: zoomOptions,
        tooltip: {
          enabled: tooltipValue,
        },
      },
    };
    chart.update();
  }
}

chart.config.data.datasets[0].backgroundColors = {
  up: "#ff5d5d",
  down: "#83c67e",
  unchanged: "#999",
};
chart.config.data.datasets[0].borderColors = "rgba(55, 55, 55, .3)";
chart.options = {
  responsive: true,
  plugins: {
    zoom: zoomOptions,
    tooltip: {
      enabled: tooltipValue,
    },
  },
};
chart.update();

function onTimeframeChange(selectedValue) {
  console.log("Selected timeframe:", selectedValue);
  // You can call any function here that needs the selected value
  // For example:
  // updateChart(selectedValue);
}

function zoomIn() {
  // const graph = document.getElementById("candle-stick");
  // let currentWidth = parseFloat(graph.style.width);
  // // Calculate 10% of the current width
  // let increase = currentWidth * 0.1;
  // graph.style.width = `${currentWidth + increase}vw`;
  chart.canvas.width = chart.canvas.width - 150;
  chart.canvas.height = chart.canvas.height - 100;
}

function zoomOut() {
  // const graph = document.getElementById("candle-stick");
  // let currentWidth = parseFloat(graph.style.width);
  // let decrease = currentWidth * 0.1;
  // graph.style.width = `${currentWidth - decrease}vw`;
  chart.canvas.width = chart.canvas.width + 150;
  chart.canvas.height = chart.canvas.height + 100;
}

function back() {
  sessionStorage.setItem("tabValue", 3);
  window.history.back();
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  sessionStorage.setItem("sliderValue", this.value);
  var newCandlestickData = [];
  var newVolumeData = [];
  output.innerHTML = this.value;

  if (candlestickData.length > this.value) {
    newCandlestickData = candlestickData.slice(-this.value);
    newVolumeData = volumeData.slice(-this.value);
  }

  chart.data.datasets[0].data = newCandlestickData;
  chart.data.datasets[1].data = newVolumeData;
  chart.options = {
    responsive: this.checked,
    plugins: {
      zoom: zoomOptions,
      tooltip: {
        enabled: tooltipValue,
      },
    },
  };
  chart.update();
};

document
  .getElementById("tooltip-toggle")
  .addEventListener("change", function () {
    chart.options.plugins.tooltip.enabled = this.checked;
    chart.update();
    tooltipValue = this.checked;
    sessionStorage.setItem("tooltipValue", this.checked.toString());
  });

document.getElementById("gap-toggle").addEventListener("change", function () {
  chart.options = {
    responsive: this.checked,
    plugins: {
      zoom: zoomOptions,
      tooltip: {
        enabled: tooltipValue,
      },
    },
  };
  chart.update();
  gapValue = this.checked;
  sessionStorage.setItem("gapValue", this.checked.toString());
});
