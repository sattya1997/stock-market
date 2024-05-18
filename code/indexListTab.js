const marketSelect = document.getElementById("marketSelect");
const dataList = document.getElementById("dataList");
const indexListTab = document.getElementById("indexList");

var dataArray = [];

function createList() {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");

  // Define the headers
  const headers = ["Stock", "Volume", "Price", "Capital", "Chg", "Chg %"];
  headers.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  dataArray.forEach((item) => {
    const row = document.createElement("tr");
    var rowValue = `<td>${item.shortname}</td><td>${item.volume}</td>`;
    rowValue +=
      item.change > 0
        ? `<td style="color: #009630"><span>${item.lastvalue}</span><span>&nbsp;&#x2191;</span></td>`
        : `<td style="color: #e40000; font-weight: 500;"><span>${item.lastvalue}</span><span>&nbsp;&#x2193;</span></td>`;
    rowValue += `<td>${parseInt(item.mktcap.replace(/,/g, ""))}</td>`;
    rowValue +=
      item.change > 0
        ? `<td style="color: #009630;">${item.change}</td><td style="color: #009630;">${item.percentchange}</td>`
        : `<td style="color: #e40000;">${item.change}</td><td style="color: #e40000;">${item.percentchange}</td>`;
    row.innerHTML = rowValue;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  const tableList = document.getElementById("table-list");
  tableList.innerHTML = "";
  return tableList.appendChild(table);
}

// Make Axios GET request when user selects a value from the dropdown
marketSelect.addEventListener("change", async () => {
  loadAndCreate();
});

loadAndCreate();

async function loadAndCreate() {
  const selectedValue = marketSelect.value;
  const url = `https://stock-server-qag4.onrender.com/mc?id=${selectedValue}`;
  try {
    const data = await axios.get(url);
    dataArray = data.data;
    sortDataArray();
    createList();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const sortSelect = document.getElementById("sortSelect");
sortSelect.addEventListener("change", () => {
  sortDataArray();
  createList();
});

function sortDataArray() {
  const selectedValue = sortSelect.value;

  switch (selectedValue) {
    case "9":
      // Sort by change % up
      dataArray.sort(
        (a, b) => parseFloat(a.percentchange) - parseFloat(b.percentchange)
      );
      break;
    case "10":
      // Sort by change % down
      dataArray.sort(
        (a, b) => parseFloat(b.percentchange) - parseFloat(a.percentchange)
      );
      break;
    case "11":
      // Sort by stock name
      dataArray.sort((a, b) => a.shortname.localeCompare(b.shortname));
      break;
    case "12":
      // Sort by market cap
      dataArray.sort(
        (a, b) =>
          parseFloat(a.mktcap.replace(/,/g, "")) -
          parseFloat(b.mktcap.replace(/,/g, ""))
      );
      break;
    case "13":
      // Sort by volume * price
      dataArray.sort((a, b) => {
        const volumeA = convertToNumber(a.volume);
        const priceA = parseFloat(a.lastvalue.replace(/,/g, ""));
        const volumeB = convertToNumber(b.volume);
        const priceB = parseFloat(b.lastvalue.replace(/,/g, ""));
        return volumeA * priceA - volumeB * priceB;
      });
      break;
    default:
      break;
  }
}

function convertToNumber(str) {
  let number = parseFloat(str.slice(0, -1));
  let unit = str.slice(-1).toLowerCase();

  switch (unit) {
    case "k":
      return number * 1000;
    case "m":
      return number * 1000000;
    default:
      return number; // No unit means it's just a number
  }
}

async function loadIndexGraph(selectedValues) {
  document.querySelector(".graphList").innerHTML = "";
  for (let index = 0; index < selectedValues.length; index++) {
    const id = selectedValues[index];
    try {
      const response = await axios.get(
        `https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=&ind_id=${id}&range=1d&type=area`
      );

      if (response.data.graph.values) {
        // Create a canvas element for each graph
        const canvasId = `graphCanvas${index}`;
        const canvasElement = document.createElement("canvas");
        canvasElement.id = canvasId;

        document.querySelector(".graphList").appendChild(canvasElement);
        await initGraph(response.data, canvasId);
      }
      
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  }
}


async function initGraph(data, elementId) {
  const ctx = document.getElementById(elementId).getContext("2d");
  const randomNumber = getRandomNumber();
  const backgroundColor = getBorderColor(randomNumber);
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.graph.values.map((item) => item._time),
      datasets: [
        {
          label: `${data.graph.name} price(${data.graph.current_close})`,
          data: data.graph.values.map((item) => item._value),
          backgroundColor: backgroundColor,
          borderColor: "rgba(50, 42, 69, 1)", // Bluis bkack border
          borderWidth: 0.7,
          fill: true,
          pointRadius: 0,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Function to generate a random number between 1 and 5
function getRandomNumber() {
  return Math.floor(Math.random() * 5) + 1;
}

// Function to get a color based on the random number
function getBorderColor(randomNumber) {
  const colors = {
    1: 'rgba(255, 99, 132, .3)', // Red
    2: 'rgba(54, 162, 235, .3)', // Blue
    3: 'rgba(255, 206, 86, .3)', // Yellow
    4: 'rgba(75, 192, 192, .3)', // Green
    5: 'rgba(153, 102, 255, .3)' // Purple
  };
  return colors[randomNumber];
}

// Function to update the text of the custom select trigger
function updateTriggerText() {
  const allSelected = document.querySelectorAll(".custom-option.selected");
  const triggerSpan = document.querySelector(".custom-select__trigger span");
  if (allSelected.length) {
    triggerSpan.textContent = Array.from(allSelected)
      .map((e) => e.textContent)
      .join(", ");
  } else {
    triggerSpan.textContent = "Select Indexes"; // Default text when nothing is selected
  }
}

// Event listener for the dropdown wrapper
document
  .querySelector(".custom-select-wrapper")
  .addEventListener("click", function (event) {
    // Prevent the event from closing the dropdown if it's inside the dropdown
    if (event.target.classList.contains("custom-option")) {
      event.stopPropagation();
    } else {
      this.querySelector(".custom-select").classList.toggle("open");
    }
  });

// Event listeners for each dropdown option
for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent click event from closing the dropdown
    this.classList.toggle("selected");
    updateTriggerText();
  });
}

// Event listener to close the dropdown when clicking outside
window.addEventListener("click", function (e) {
  const select = document.querySelector(".custom-select");
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});

// Event listener for the button to get selected values
document
  .querySelector(".custom-select__button")
  .addEventListener("click", function () {
    const selectedValues = Array.from(
      document.querySelectorAll(".custom-option.selected")
    ).map((el) => el.dataset.value);
    loadIndexGraph(selectedValues);
  });
