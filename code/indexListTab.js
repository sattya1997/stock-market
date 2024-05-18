const marketSelect = document.getElementById("marketSelect");
const dataList = document.getElementById("dataList");
const indexListTab = document.getElementById("indexList");

const cccc = {
  item: [
    {
      id: "AE01",
      shortname: "Adani Enterpris",
      mktcap: "327,710.42",
      lastvalue: "2,874.65",
      change: "-118.60",
      percentchange: "-3.96",
      direction: "-1",
      stk_details: [],
      sc_did: "AE13",
      volume: "2.38m",
      url: "https://www.moneycontrol.com/india/stockpricequote/trading/adanienterprises/AE13",
    },
    {
      id: "MPS",
      shortname: "Adani Ports",
      mktcap: "278,647.12",
      lastvalue: "1,289.95",
      change: "-30.35",
      percentchange: "-2.30",
      direction: "-1",
      stk_details: [],
      sc_did: "MPS",
      volume: "4.00m",
      url: "https://www.moneycontrol.com/india/stockpricequote/infrastructure-general/adaniportsspecialeconomiczone/MPS",
    },
    {
      id: "AHE",
      shortname: "Apollo Hospital",
      mktcap: "87,086.05",
      lastvalue: "6,056.70",
      change: "47.10",
      percentchange: "0.78",
      direction: "1",
      stk_details: [],
      sc_did: "AHE",
      volume: "419.14k",
      url: "https://www.moneycontrol.com/india/stockpricequote/hospitals-medical-services/apollohospitalsenterprises/AHE",
    },
    {
      id: "API",
      shortname: "Asian Paints",
      mktcap: "281,251.18",
      lastvalue: "2,932.15",
      change: "2.40",
      percentchange: "0.08",
      direction: "1",
      stk_details: [],
      sc_did: "AP31",
      volume: "768.81k",
      url: "https://www.moneycontrol.com/india/stockpricequote/paints-varnishes/asianpaints/AP31",
    },
    {
      id: "UTI10",
      shortname: "Axis Bank",
      mktcap: "353,095.30",
      lastvalue: "1,143.65",
      change: "2.15",
      percentchange: "0.19",
      direction: "1",
      stk_details: [],
      sc_did: "AB16",
      volume: "7.49m",
      url: "https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/axisbank/AB16",
    },
    {
      id: "BA06",
      shortname: "Bajaj Auto",
      mktcap: "252,728.87",
      lastvalue: "9,052.55",
      change: "-53.05",
      percentchange: "-0.58",
      direction: "-1",
      stk_details: [],
      sc_did: "BA10",
      volume: "458.43k",
      url: "https://www.moneycontrol.com/india/stockpricequote/auto-2-3-wheelers/bajajauto/BA10",
    },
    {
      id: "BAF",
      shortname: "Bajaj Finance",
      mktcap: "424,622.19",
      lastvalue: "6,859.85",
      change: "-71.65",
      percentchange: "-1.03",
      direction: "-1",
      stk_details: [],
      sc_did: "BAF",
      volume: "1.23m",
      url: "https://www.moneycontrol.com/india/stockpricequote/bajaj-finance/bajajfinance/BAF",
    },
    {
      id: "BF04",
      shortname: "Bajaj Finserv",
      mktcap: "256,658.32",
      lastvalue: "1,611.35",
      change: "-15.95",
      percentchange: "-0.98",
      direction: "-1",
      stk_details: [],
      sc_did: "BF04",
      volume: "725.36k",
      url: "https://www.moneycontrol.com/india/stockpricequote/finance-investments/bajajfinserv/BF04",
    },
    {
      id: "BTV",
      shortname: "Bharti Airtel",
      mktcap: "740,738.79",
      lastvalue: "1,283.40",
      change: "6.00",
      percentchange: "0.47",
      direction: "1",
      stk_details: [],
      sc_did: "BA08",
      volume: "5.56m",
      url: "https://www.moneycontrol.com/india/stockpricequote/telecommunications-service/bhartiairtel/BA08",
    },
    {
      id: "BPC",
      shortname: "BPCL",
      mktcap: "132,378.65",
      lastvalue: "610.25",
      change: "-19.60",
      percentchange: "-3.11",
      direction: "-1",
      stk_details: [],
      sc_did: "BPC",
      volume: "4.74m",
      url: "https://www.moneycontrol.com/india/stockpricequote/refineries/bharatpetroleumcorporation/BPC",
    },
    {
      id: "BI",
      shortname: "Britannia",
      mktcap: "121,917.90",
      lastvalue: "5,061.60",
      change: "317.00",
      percentchange: "6.68",
      direction: "1",
      stk_details: [],
      sc_did: "BI",
      volume: "2.84m",
      url: "https://www.moneycontrol.com/india/stockpricequote/food-processing/britanniaindustries/BI",
    },
    {
      id: "C",
      shortname: "Cipla",
      mktcap: "114,924.60",
      lastvalue: "1,423.40",
      change: "-1.35",
      percentchange: "-0.09",
      direction: "-1",
      stk_details: [],
      sc_did: "C",
      volume: "929.30k",
      url: "https://www.moneycontrol.com/india/stockpricequote/pharmaceuticals/cipla/C",
    },
    {
      id: "CI29",
      shortname: "Coal India",
      mktcap: "283,855.27",
      lastvalue: "460.60",
      change: "-14.00",
      percentchange: "-2.95",
      direction: "-1",
      stk_details: [],
      sc_did: "CI11",
      volume: "36.41m",
      url: "https://www.moneycontrol.com/india/stockpricequote/mining-minerals/coalindia/CI11",
    },
    {
      id: "DL03",
      shortname: "Divis Labs",
      mktcap: "105,205.20",
      lastvalue: "3,963.00",
      change: "12.05",
      percentchange: "0.30",
      direction: "1",
      stk_details: [],
      sc_did: "DL03",
      volume: "271.25k",
      url: "https://www.moneycontrol.com/india/stockpricequote/pharmaceuticals/divislaboratories/DL03",
    },
    {
      id: "DRL",
      shortname: "Dr Reddys Labs",
      mktcap: "104,983.02",
      lastvalue: "6,293.45",
      change: "-56.10",
      percentchange: "-0.88",
      direction: "-1",
      stk_details: [],
      sc_did: "DRL",
      volume: "452.75k",
      url: "https://www.moneycontrol.com/india/stockpricequote/pharmaceuticals/drreddyslaboratories/DRL",
    },
    {
      id: "EM",
      shortname: "Eicher Motors",
      mktcap: "125,920.98",
      lastvalue: "4,599.00",
      change: "-0.25",
      percentchange: "-0.01",
      direction: "-1",
      stk_details: [],
      sc_did: "EM",
      volume: "716.54k",
      url: "https://www.moneycontrol.com/india/stockpricequote/auto-lcvs-hcvs/eichermotors/EM",
    },
    {
      id: "GI01",
      shortname: "Grasim",
      mktcap: "162,898.37",
      lastvalue: "2,453.30",
      change: "-28.05",
      percentchange: "-1.13",
      direction: "-1",
      stk_details: [],
      sc_did: "GI01",
      volume: "606.83k",
      url: "https://www.moneycontrol.com/india/stockpricequote/diversified/grasimindustries/GI01",
    },
    {
      id: "HCL02",
      shortname: "HCL Tech",
      mktcap: "368,732.81",
      lastvalue: "1,358.80",
      change: "10.75",
      percentchange: "0.80",
      direction: "1",
      stk_details: [],
      sc_did: "HCL02",
      volume: "2.50m",
      url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/hcltechnologies/HCL02",
    },
    {
      id: "HDF01",
      shortname: "HDFC Bank",
      mktcap: "1,157,458.35",
      lastvalue: "1,522.65",
      change: "3.05",
      percentchange: "0.20",
      direction: "1",
      stk_details: [],
      sc_did: "HDF01",
      volume: "14.40m",
      url: "https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/hdfcbank/HDF01",
    },
    {
      id: "HSL01",
      shortname: "HDFC Life",
      mktcap: "119,388.15",
      lastvalue: "555.05",
      change: "-10.85",
      percentchange: "-1.92",
      direction: "-1",
      stk_details: [],
      sc_did: "HSL01",
      volume: "8.76m",
      url: "https://www.moneycontrol.com/india/stockpricequote/life-health-insurance/hdfclifeinsurancecompany/HSL01",
    },
    {
      id: "HHM",
      shortname: "Hero Motocorp",
      mktcap: "90,163.93",
      lastvalue: "4,509.75",
      change: "-43.00",
      percentchange: "-0.94",
      direction: "-1",
      stk_details: [],
      sc_did: "HHM",
      volume: "241.05k",
      url: "https://www.moneycontrol.com/india/stockpricequote/auto-2-3-wheelers/heromotocorp/HHM",
    },
    {
      id: "H",
      shortname: "Hindalco",
      mktcap: "143,552.19",
      lastvalue: "638.80",
      change: "-8.30",
      percentchange: "-1.28",
      direction: "-1",
      stk_details: [],
      sc_did: "HI",
      volume: "10.09m",
      url: "https://www.moneycontrol.com/india/stockpricequote/hindalco-industries/hindalcoindustries/HI",
    },
    {
      id: "HL",
      shortname: "HUL",
      mktcap: "530,114.78",
      lastvalue: "2,256.20",
      change: "39.15",
      percentchange: "1.77",
      direction: "1",
      stk_details: [],
      sc_did: "HU",
      volume: "1.62m",
      url: "https://www.moneycontrol.com/india/stockpricequote/personal-care/hindustanunilever/HU",
    },
    {
      id: "ICI02",
      shortname: "ICICI Bank",
      mktcap: "805,423.08",
      lastvalue: "1,146.30",
      change: "4.25",
      percentchange: "0.37",
      direction: "1",
      stk_details: [],
      sc_did: "ICI02",
      volume: "14.97m",
      url: "https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/icicibank/ICI02",
    },
    {
      id: "IIB",
      shortname: "IndusInd Bank",
      mktcap: "116,559.06",
      lastvalue: "1,497.50",
      change: "13.80",
      percentchange: "0.93",
      direction: "1",
      stk_details: [],
      sc_did: "IIB",
      volume: "2.60m",
      url: "https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/indusindbank/IIB",
    },
    {
      id: "IT",
      shortname: "Infosys",
      mktcap: "591,872.19",
      lastvalue: "1,425.90",
      change: "9.60",
      percentchange: "0.68",
      direction: "1",
      stk_details: [],
      sc_did: "IT",
      volume: "6.45m",
      url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/infosys/IT",
    },
    {
      id: "ITC",
      shortname: "ITC",
      mktcap: "542,773.27",
      lastvalue: "434.75",
      change: "-1.70",
      percentchange: "-0.39",
      direction: "-1",
      stk_details: [],
      sc_did: "ITC",
      volume: "10.36m",
      url: "https://www.moneycontrol.com/india/stockpricequote/itc/itc/ITC",
    },
    {
      id: "JVS",
      shortname: "JSW Steel",
      mktcap: "215,358.90",
      lastvalue: "880.65",
      change: "6.45",
      percentchange: "0.74",
      direction: "1",
      stk_details: [],
      sc_did: "JSW01",
      volume: "2.56m",
      url: "https://www.moneycontrol.com/india/stockpricequote/steel-large/jswsteel/JSW01",
    },
    {
      id: "KMF",
      shortname: "Kotak Mahindra",
      mktcap: "322,899.66",
      lastvalue: "1,624.30",
      change: "77.60",
      percentchange: "5.02",
      direction: "1",
      stk_details: [],
      sc_did: "KMB",
      volume: "21.61m",
      url: "https://www.moneycontrol.com/india/stockpricequote/banks-private-sector/kotakmahindrabank/KMB",
    },
    {
      id: "LT",
      shortname: "Larsen",
      mktcap: "486,871.99",
      lastvalue: "3,463.30",
      change: "-36.50",
      percentchange: "-1.04",
      direction: "-1",
      stk_details: [],
      sc_did: "LT",
      volume: "2.61m",
      url: "https://www.moneycontrol.com/india/stockpricequote/infrastructure-general/larsentoubro/LT",
    },
    {
      id: "LI09",
      shortname: "LTIMindtree",
      mktcap: "139,313.77",
      lastvalue: "4,703.95",
      change: "52.00",
      percentchange: "1.12",
      direction: "1",
      stk_details: [],
      sc_did: "LI12",
      volume: "232.69k",
      url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/ltimindtree/LI12",
    },
    {
      id: "MM",
      shortname: "M&M",
      mktcap: "276,678.95",
      lastvalue: "2,224.95",
      change: "31.95",
      percentchange: "1.46",
      direction: "1",
      stk_details: [],
      sc_did: "MM",
      volume: "2.11m",
      url: "https://www.moneycontrol.com/india/stockpricequote/auto-cars-jeeps/mahindramahindra/MM",
    },
    {
      id: "MU01",
      shortname: "Maruti Suzuki",
      mktcap: "391,094.79",
      lastvalue: "12,439.30",
      change: "-52.85",
      percentchange: "-0.42",
      direction: "-1",
      stk_details: [],
      sc_did: "MS24",
      volume: "342.23k",
      url: "https://www.moneycontrol.com/india/stockpricequote/auto-cars-jeeps/marutisuzukiindia/MS24",
    },
    {
      id: "NI",
      shortname: "Nestle",
      mktcap: "236,931.98",
      lastvalue: "2,457.40",
      change: "1.30",
      percentchange: "0.05",
      direction: "1",
      stk_details: [],
      sc_did: "NI",
      volume: "716.00k",
      url: "https://www.moneycontrol.com/india/stockpricequote/food-processing/nestleindia/NI",
    },
    {
      id: "NTP",
      shortname: "NTPC",
      mktcap: "345,977.05",
      lastvalue: "356.80",
      change: "-8.15",
      percentchange: "-2.23",
      direction: "-1",
      stk_details: [],
      sc_did: "NTP",
      volume: "15.32m",
      url: "https://www.moneycontrol.com/india/stockpricequote/power-generation-distribution/ntpc/NTP",
    },
    {
      id: "ONG",
      shortname: "ONGC",
      mktcap: "354,952.58",
      lastvalue: "282.15",
      change: "-3.95",
      percentchange: "-1.38",
      direction: "-1",
      stk_details: [],
      sc_did: "ONG",
      volume: "15.49m",
      url: "https://www.moneycontrol.com/india/stockpricequote/oil-drilling-and-exploration/oilnaturalgascorporation/ONG",
    },
    {
      id: "PGC",
      shortname: "Power Grid Corp",
      mktcap: "285,389.03",
      lastvalue: "306.85",
      change: "-4.00",
      percentchange: "-1.29",
      direction: "-1",
      stk_details: [],
      sc_did: "PGC",
      volume: "16.86m",
      url: "https://www.moneycontrol.com/india/stockpricequote/power-generation-distribution/powergridcorporationindia/PGC",
    },
    {
      id: "RI",
      shortname: "Reliance",
      mktcap: "1,920,871.57",
      lastvalue: "2,839.05",
      change: "-28.95",
      percentchange: "-1.01",
      direction: "-1",
      stk_details: [],
      sc_did: "RI",
      volume: "3.70m",
      url: "https://www.moneycontrol.com/india/stockpricequote/refineries/relianceindustries/RI",
    },
    {
      id: "SBI",
      shortname: "SBI",
      mktcap: "720,930.15",
      lastvalue: "807.80",
      change: "-23.65",
      percentchange: "-2.84",
      direction: "-1",
      stk_details: [],
      sc_did: "SBI",
      volume: "35.28m",
      url: "https://www.moneycontrol.com/india/stockpricequote/banks-public-sector/statebankindia/SBI",
    },
    {
      id: "SLI03",
      shortname: "SBI Life Insura",
      mktcap: "144,271.11",
      lastvalue: "1,440.60",
      change: "-2.65",
      percentchange: "-0.18",
      direction: "-1",
      stk_details: [],
      sc_did: "SLI03",
      volume: "920.88k",
      url: "https://www.moneycontrol.com/india/stockpricequote/sbi-life-insurance-company/sbilifeinsurancecompany/SLI03",
    },
    {
      id: "STF",
      shortname: "Shriram Finance",
      mktcap: "95,735.10",
      lastvalue: "2,547.55",
      change: "-41.00",
      percentchange: "-1.58",
      direction: "-1",
      stk_details: [],
      sc_did: "STF",
      volume: "865.36k",
      url: "https://www.moneycontrol.com/india/stockpricequote/finance-leasing-hire-purchase/shriramfinance/STF",
    },
    {
      id: "SPI",
      shortname: "Sun Pharma",
      mktcap: "366,894.31",
      lastvalue: "1,529.15",
      change: "18.00",
      percentchange: "1.19",
      direction: "1",
      stk_details: [],
      sc_did: "SPI",
      volume: "1.24m",
      url: "https://www.moneycontrol.com/india/stockpricequote/pharmaceuticals/sunpharmaceuticalindustries/SPI",
    },
    {
      id: "TT",
      shortname: "TATA Cons. Prod",
      mktcap: "104,635.56",
      lastvalue: "1,098.15",
      change: "3.85",
      percentchange: "0.35",
      direction: "1",
      stk_details: [],
      sc_did: "TT",
      volume: "1.08m",
      url: "https://www.moneycontrol.com/india/stockpricequote/plantations-tea-coffee/tataconsumerproducts/TT",
    },
    {
      id: "TEL",
      shortname: "Tata Motors",
      mktcap: "337,758.36",
      lastvalue: "1,016.20",
      change: "2.80",
      percentchange: "0.28",
      direction: "1",
      stk_details: [],
      sc_did: "TM03",
      volume: "5.72m",
      url: "https://www.moneycontrol.com/india/stockpricequote/auto-lcvs-hcvs/tatamotors/TM03",
    },
    {
      id: "TIS",
      shortname: "Tata Steel",
      mktcap: "209,223.99",
      lastvalue: "167.60",
      change: "1.10",
      percentchange: "0.66",
      direction: "1",
      stk_details: [],
      sc_did: "TIS",
      volume: "37.62m",
      url: "https://www.moneycontrol.com/india/stockpricequote/tata-steel/tatasteel/TIS",
    },
    {
      id: "TCS",
      shortname: "TCS",
      mktcap: "1,418,670.21",
      lastvalue: "3,921.05",
      change: "77.65",
      percentchange: "2.02",
      direction: "1",
      stk_details: [],
      sc_did: "TCS",
      volume: "2.05m",
      url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/tataconsultancyservices/TCS",
    },
    {
      id: "TM4",
      shortname: "Tech Mahindra",
      mktcap: "123,296.81",
      lastvalue: "1,262.25",
      change: "11.80",
      percentchange: "0.94",
      direction: "1",
      stk_details: [],
      sc_did: "TM4",
      volume: "1.36m",
      url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/techmahindra/TM4",
    },
    {
      id: "TI01",
      shortname: "Titan Company",
      mktcap: "291,207.18",
      lastvalue: "3,280.15",
      change: "-253.75",
      percentchange: "-7.18",
      direction: "-1",
      stk_details: [],
      sc_did: "TI01",
      volume: "6.89m",
      url: "https://www.moneycontrol.com/india/stockpricequote/miscellaneous/titancompany/TI01",
    },
    {
      id: "UTC",
      shortname: "UltraTechCement",
      mktcap: "282,256.48",
      lastvalue: "9,776.90",
      change: "-39.40",
      percentchange: "-0.40",
      direction: "-1",
      stk_details: [],
      sc_did: "UTC01",
      volume: "238.52k",
      url: "https://www.moneycontrol.com/india/stockpricequote/cement-major/ultratechcement/UTC01",
    },
    {
      id: "W",
      shortname: "Wipro",
      mktcap: "239,740.39",
      lastvalue: "458.65",
      change: "1.30",
      percentchange: "0.28",
      direction: "1",
      stk_details: [],
      sc_did: "W",
      volume: "3.46m",
      url: "https://www.moneycontrol.com/india/stockpricequote/computers-software/wipro/W",
    },
  ],
};

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

  // Add rows to the table
  //dataArray.forEach((item) => {
  //const row = document.createElement("tr");
  //var rowValue = `
  //<td>${item.shortname}</td>
  //<td>${item.volume}</td>
  //<td>${item.lastvalue}</td>
  //<td>${parseInt(item.mktcap.replace(/,/g, ''))}</td>
  //`;
  //rowValue += (item.change > 0) ?  `<td style="color:green;">${item.change}</td><td style="color:green;">${item.percentchange}</td>` : `<td style="color:red;">${item.change}</td><td style="color:red;">${item.percentchange}</td>`
  //row.innerHTML = rowValue;
  //tbody.appendChild(row);
  //});

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
