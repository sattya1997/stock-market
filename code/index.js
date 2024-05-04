generateHeader();

function generateHeader() {
  const tbl = document.getElementById("myTable");
  tbl.deleteTHead();

  const tblBody = document.getElementById("myTableBody");
  tblBody.innerHTML = "";
  const tblHead = document.createElement("thead");
  tblHead;
  var tblRow = document.createElement("tr");
  var tblh = document.createElement("th");
  tblh.style.width = "60px";

  const text = document.createTextNode("Time");
  tblh.appendChild(text);
  tblRow.appendChild(tblh);

  for (let j = 0; j < tickers.length; j++) {
    tblh = document.createElement("th");
    tblh.appendChild(document.createTextNode("Ticker " + (j + 1)));

    //generate secondary Table header
    const secondaryTable = document.createElement("table");
    const secondaryRow = secondaryTable.insertRow();

    for (let i = 0; i < availableCell.length; i++) {
      const secondaryCell = secondaryRow.insertCell();
      secondaryCell.textContent = availableCell[i].name;
    }
    tblh.appendChild(secondaryRow);
    tblRow.appendChild(tblh);
  }
  tblRow.appendChild(tblh);
  tblHead.appendChild(tblRow);

  tblRow = document.createElement("tr");
  tblh = document.createElement("th");
  tblh.appendChild(document.createTextNode(" "));

  tblHead.appendChild(tblRow);

  tbl.appendChild(tblHead);
}

async function start() {
  var tickerObject = [];
  tickers.forEach((ticker, index) => {
    tickerObject.push(ticker.name);
  });

  continueReq = true;
  count++;
  while (continueReq) {
    const data = await getStockData(tickerObject);
    try {
      addTableRow(5, data);
      await new Promise((r) => setTimeout(r, 15000));
    } catch (error) {
      console.log(error);
    }
  }
}

async function stop() {
  continueReq = false;
}

async function getStockData(postData) {
  const response = await axios.post(url, postData , {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}
function addTableRow(tickerNumber, data) {
  const tblBody = document.getElementById("myTableBody");
  const row = document.createElement("tr");
  var cell = document.createElement("td");
  cell.style.width = "60px";
  const date = new Date();
  var cellText = document.createTextNode(
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  );
  cell.appendChild(cellText);
  row.appendChild(cell);

  for (let j = 0; j < data.length; j++) {
    cell = document.createElement("td");

    //generate secondary Table
    const secondaryTable = document.createElement("table");
    const secondaryRow = secondaryTable.insertRow();

    for (let i = 0; i < availableCell.length; i++) {
      const secondaryCell = secondaryRow.insertCell();

      if (availableCell[i].name === "name") {
        secondaryCell.textContent = tickers.find(
          (ticker) => ticker.name === data[j].ticker
        ).value;
      } else if (availableCell[i].name === "price") {
        secondaryCell.textContent = data[j].price;
      } else if (availableCell[i].name === "bid" && data[j].ticker != "^NSEI") {
        secondaryCell.textContent = data[j].bid;
      } else if (availableCell[i].name === "ask" && data[j].ticker != "^NSEI") {
        secondaryCell.textContent = data[j].ask;
      } else if (availableCell[i].name === "change") {
        secondaryCell.textContent = data[j].c.toFixed(2);
      }
    }

    cell.appendChild(secondaryTable);
    row.appendChild(cell);
  }

  const closeBtnCell = document.createElement("td");
  closeBtnCell.style.maxWidth = "20px";
  //closeBtnCell.style.padding = '0px 5px 0px 5px'
  closeBtnCell.innerHTML =
    '<button onclick="deleteCell(this)" class="delete-btn"></button>';

  row.appendChild(closeBtnCell);

  tblBody.appendChild(row);
}

function deleteCell(btn) {
  var row = btn.parentNode.parentNode;
  // Remove the row from the table
  row.parentNode.removeChild(row);
}

function editCells() {
  const container = document.getElementById("checkboxContainer");
  container.innerHTML = "";
  const checkbox = document.getElementById("checkbox");
  var newCells = totalCell;

  newCells.forEach(function (option, index) {
    // Create the checkbox input element
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = option.name;
    checkbox.name = option.name;
    checkbox.value = option.value;

    // Create the label element
    var label = document.createElement("label");
    label.htmlFor = option.name;
    label.appendChild(document.createTextNode(option.name));

    // Append the checkbox and label to the container
    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });

  if (checkbox.style.display === "none") {
    checkbox.style.display = "block";
  } else {
    checkbox.style.display = "none";
  }
}

function editTickers() {
  var container = document.getElementById("editFormTickers");
  if (container.style.display === "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
}

document
  .getElementById("cellSubmitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var checkedBoxes = document.querySelectorAll(
      '#checkboxContainer input[type="checkbox"]:checked'
    );
    const newCell = [];
    Array.from(checkedBoxes).map(function (checkbox) {
      newCell.push({ name: checkbox.name, value: checkbox.value });
    });
    availableCell = newCell;

    generateHeader();
    var container = document.getElementById("checkbox");
    container.style.display = "none";
  });

document
  .getElementById("editTickersSubmitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const msgBox = document.getElementById("msg-box-ticker");
    const container = document.getElementById("editFormTickers");

    var checkedRadioBox = document.querySelector(
      '#edit-tickers-form input[type="radio"]:checked'
    );

    if (checkedRadioBox && checkedRadioBox.value) {
      if (checkedRadioBox.value === "add") {
        var textInputs = document.querySelectorAll(
          '#edit-tickers-form input[type="text"]'
        );
        if (textInputs.length < 2) {
          msgBox.style.color = "red";
          msgBox.innerHTML = "Enter both name and value";
        } else {
          tickers.push({
            name: textInputs[0].value,
            value: textInputs[1].value,
          });
          msgBox.style.color = "green";
          msgBox.innerHTML = "Succesfully added";
          generateHeader();
          setTimeout(function () {
            container.style.display = "none";
            msgBox.innerHTML = "";
          }, 2000);
        }
      } else if (checkedRadioBox.value === "remove") {
        var textInputs = document.querySelectorAll(
          '#edit-tickers-form input[type="text"]'
        );
        const previousTickerNumber = tickers.length;
        if (textInputs && textInputs[0] && textInputs[0].value) {
          const newTickers = tickers.filter(
            (ticker) => ticker.name !== textInputs[0].value
          );
          tickers = newTickers;
          const newTickerNumber = tickers.length;

          if (newTickerNumber < previousTickerNumber) {
            generateHeader();
            msgBox.style.color = "green";
            msgBox.innerHTML = "Succesfully removed";
            setTimeout(function () {
              container.style.display = "none";
              msgBox.innerHTML = "";
            }, 2000);
          } else {
            msgBox.style.color = "red";
            msgBox.innerHTML = "Ticker name not found";
          }
        } else {
          msgBox.style.color = "red";
          msgBox.innerHTML = "Type input correctly";
        }
      }
    } else {
      msgBox.style.color = "red";
      msgBox.innerHTML = "Click any(Add or Remove)";
    }
    //container.style.display = 'none';
  });

function showTab(tabNumber) {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button, index) => {
    button.classList.toggle("active", index + 1 === tabNumber);
  });

  tabPanels.forEach((panel, index) => {
    panel.classList.toggle("active", index + 1 === tabNumber);
  });
}
