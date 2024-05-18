document.getElementById("meterConsole").innerHTML = `
<div class="wrapper">
  <div class="gauge">
    <div class="slice-colors"></div>
    <div class="needle"></div>
    <div class="gauge-center">
      <div class="number speedometerNumber"></div>
      <div class="label speedometerLabel"></div>
    </div>
  </div>
  <div class="speedometer-hint">
    <span style="color: red; border-radius: 2px">&#8598;&nbsp;Fear</span
    ><span style="color: black; padding-right: 10px; padding-left: 10px"
      >MMI Speedometer</span
    ><span style="color: #36b736; border-radius: 2px">Greed&nbsp;&#8599;</span>
  </div>
</div>
<div style="display:flex;justify-content:space-around; font-size: 14px; color: rgba(8, 99, 90, 0.986); font-weight: 500; margin-bottom:7px"><span id="vix"></span><span id="fma"></span><span id="sma"></span></div>
<div id="comparisonDropdown">
  <label for="comparisonSelect">Compare</label>
  <select id="comparisonSelect">
    <option value="1" selected>FII</option>
    <option value="2">Nifty</option>
    <option value="3">Gold</option>
  </select>
</div>
<div class="chartCard">
  <div class="chartBox">
    <canvas id="comparisonChart"></canvas>
  </div>
</div>`;

var comparisonData;

const comparisonSelect = document.getElementById("comparisonSelect");

var comparisonLabeltext = "Comaprison data";

comparisonSelect.addEventListener("change", async () => {
  updateComparisonGraph();
});

function updateComparisonGraph() {
  const comparisonvalue = comparisonSelect.value;
  var filteredData;
  if (parseInt(comparisonvalue) === 1) {
    filteredData = fetchFiiData();
  }

  if (parseInt(comparisonvalue) === 2) {
    filteredData = fetchNiftyData();
  }

  if (parseInt(comparisonvalue) === 3) {
    filteredData = fetchGoldData();
  }

  if (filteredData) {
    updateComparisonChart(filteredData);
  }
}

const data = {
  labels: ["Today", "Yesterday", "Week", "Month", "Year"],
  datasets: [
    {
      label: "Comparison data",
      data: [],
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const loadOneTimedata = false;

const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const comparisonChart = new Chart(
  document.getElementById("comparisonChart"),
  config
);

initialize();

function fetchFiiData() {
  comparisonLabeltext = "FII comparison data";
  if (comparisonData) {
    return [
      comparisonData.fii ? comparisonData.fii : 0,
      comparisonData.lastDay ? comparisonData.lastDay.fii : 0,
      comparisonData.lastWeek ? comparisonData.lastWeek.fii : 0,
      comparisonData.lastMonth ? comparisonData.lastMonth.fii : 0,
      comparisonData.lastYear ? comparisonData.lastYear.fii : 0,
    ];
  }
  return [];
}

function fetchNiftyData() {
  comparisonLabeltext = "Nifty comparison data";
  if (comparisonData) {
    return [
      comparisonData.nifty ? comparisonData.nifty : 0,
      comparisonData.lastDay ? comparisonData.lastDay.nifty : 0,
      comparisonData.lastWeek ? comparisonData.lastWeek.nifty : 0,
      comparisonData.lastMonth ? comparisonData.lastMonth.nifty : 0,
      comparisonData.lastYear ? comparisonData.lastYear.nifty : 0,
    ];
  }
  return [];
}

function fetchGoldData() {
  comparisonLabeltext = "Gold comparison data";
  if (comparisonData) {
    return [
      comparisonData.gold ? comparisonData.gold : 0,
      comparisonData.lastDay ? comparisonData.lastDay.gold : 0,
      comparisonData.lastWeek ? comparisonData.lastWeek.gold : 0,
      comparisonData.lastMonth ? comparisonData.lastMonth.gold : 0,
      comparisonData.lastYear ? comparisonData.lastYear.gold : 0,
    ];
  }
  return [];
}

async function initialize() {
  while (true) {
    try {
      const response = await axios.get(
        "https://stock-server-qag4.onrender.com/mmi"
      );
      const mmiCurrentValue = response.data.data.currentValue;
      updateNeedle(mmiCurrentValue);
      comparisonData = response.data.data;
      updateComparisonGraph();

      if (!loadOneTimedata) {
        document.getElementById("vix").innerHTML =
          "VIX: " + parseFloat(comparisonData.vix).toFixed(2) + "&nbsp;";
        document.getElementById("sma").innerHTML =
          "SMA: " + parseFloat(comparisonData.sma).toFixed(2) + "&nbsp;";
        document.getElementById("fma").innerHTML =
          "FMA: " + parseFloat(comparisonData.fma).toFixed(2);
      }
      await new Promise((r) => setTimeout(r, 30000));
    } catch (error) {
      console.log(error);
    }
  }
}

function updateComparisonChart(data) {
  const updatedData = data.map((value) => {
    return Math.abs(value);
  });

  const backgroundColors = data.map((value) => {
    return value < 0 ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 255, 0, 0.2)"; // Red for negative, green for positive
  });

  const borderColors = data.map((value) => {
    return value < 0 ? "rgba(255, 0, 0, 1)" : "rgba(0, 255, 0, 1)"; // Darker shade for border
  });

  if (data) {
    comparisonChart.data.datasets[0].data = updatedData;
    comparisonChart.data.datasets[0].backgroundColor = backgroundColors;
    comparisonChart.data.datasets[0].borderColor = borderColors;
    comparisonChart.data.datasets[0].label = comparisonLabeltext;
    comparisonChart.update();
  }
}

function updateNeedle(value) {
  const rotation = (value / 100) * 180;
  document.querySelector(".speedometerNumber").innerHTML =
    parseFloat(value).toFixed(2);
  let label;

  if (value < 25) {
    label = "Extreme fear";
    document.querySelector(".gauge-center").style.background = "#d10000;";
  } else if (value < 50) {
    label = "Fear";
    document.querySelector(".gauge-center").style.background = "#eb6d36";
  } else if (value < 75) {
    label = "Greed";
    document.querySelector(".gauge-center").style.background = "#aef4af;";
  } else if (value < 100) {
    label = "Extreme greed";
    document.querySelector(".gauge-center").style.background = "#00a502";
  } else {
    label = "Speedometer";
  }

  document.querySelector(".speedometerLabel").innerHTML = label;
  document.querySelector(".needle").style.transform =
    "rotate(" + rotation + "deg)";
}
