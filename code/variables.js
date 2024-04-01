const url = "https://torrent4you.onrender.com/getAll";
const moneycontrolUrl = 'https://priceapi.moneycontrol.com/pricefeed/bse/equitycash/';
const urlNifty = 'https://priceapi.moneycontrol.com/pricefeed/';
var continueReq = false;
var count = 0;
var tickers = [
  { name: "^NSEI", value: "Nifty" },
  { name: "TATAMOTORS.NS", value: "TM" },
  { name: "INFY.NS", value: "INFY" },
  { name: "NCC.NS", value: "NCC" },
  { name: "ICICIB22.NS", value: "B22" },
  { name: "ONGC.NS", value: "ONGC" },
];

var stockTickersForTickerListTab = [{ "id": "notapplicable/inidicesindia/in%3BNSX", "displayName": "Nifty 50" }, { "id": "TEL", "displayName": "Tata Motors" }, { "id": "IT", "displayName": "Infosys" }, { "id": "NCC01", "displayName": "NCC Ltd" }, { "id": "HAL", "displayName": "HAL" }, { "id": "ICI15", "displayName": "ICICIB22" }, { "id": "ONG", "displayName": "ONGC" }, { "id": "CES", "displayName": "CESC" },]

const totalCell = [
  { name: "name", value: "N" },
  { name: "price", value: "P" },
  { name: "bid", value: "B" },
  { name: "ask", value: "A" },
  { name: "change", value: "C" },
];
var availableCell = [
  { name: "name", value: "N" },
  { name: "price", value: "P" },
  { name: "change", value: "C" },
];


//array of ticker names for tickers tab For now
var tickerNameList = [
  { name: "^NSEI", value: "Nifty 50" },
  { name: "TATAMOTORS.NS", value: "Tata Motors" },
  { name: "INFY.NS", value: "Infosys" },
  { name: "NCC.NS", value: "NCC Limited" },
  { name: "HAL.NS", value: "Hisdustan Aeronotics Ltd(HAL)" },
  { name: "ONGC.NS", value: "ONGC" },
];

//array of ticker names for details tab For now
const tickerDetailsNameList = [
  { name: "^NSEI", value: "Nifty 50", data: { id: "NSEI" } },
  { name: "TATAMOTORS.NS", value: "TATA Motors", data: { id: "TATAMOTORS" } },
  { name: "INFY.NS", value: "Infosys", data: { id: "INFY" } },
  { name: "NCC.NS", value: "NCC LTD", data: { id: "NCC" } },
  { name: "HAL.NS", value: "HAL", data: { id: "HAL" } },
  { name: "ICICIB22.NS", value: "ICICIB22", data: { id: "ICICIB22" } },
  { name: "ONGC.NS", value: "ONGC", data: { id: "ONGC" } },
  { name: "CESC.NS", value: "CESC", data: { id: "CESC" } },
  { name: "OIL.NS", value: "OIL", data: { id: "OIL" } },
  { name: "GOLDBEES.NS", value: "Goldbees", data: { id: "GOLDBEES" } },
  { name: "AAPL", value: "APPLE INC", data: { id: "AAPL" } },
  { name: "GOOG", value: "Alphabet", data: { id: "GOOG" } },
];

const PricingData = new protobuf.Type("PricingData")
  .add(new protobuf.Field("id", 1, "string"))
  .add(new protobuf.Field("price", 2, "float"))
  .add(new protobuf.Field("time", 3, "int64"))
  .add(new protobuf.Field("currency", 4, "string"))
  .add(new protobuf.Field("exchange", 5, "string"))
  .add(new protobuf.Field("quote_type", 6, "int32"))
  .add(new protobuf.Field("market_hours", 7, "int32"))
  .add(new protobuf.Field("change_percent", 8, "float"))
  .add(new protobuf.Field("day_volume", 9, "int64"))
  .add(new protobuf.Field("day_high", 10, "float"))
  .add(new protobuf.Field("day_low", 11, "float"))
  .add(new protobuf.Field("change", 12, "float"))
  .add(new protobuf.Field("short_name", 13, "string"))
  .add(new protobuf.Field("expire_date", 14, "int64"))
  .add(new protobuf.Field("open_price", 15, "float"))
  .add(new protobuf.Field("previous_close", 16, "float"))
  .add(new protobuf.Field("strike_price", 17, "float"))
  .add(new protobuf.Field("underlying_symbol", 18, "string"))
  .add(new protobuf.Field("open_interest", 19, "int64"))
  .add(new protobuf.Field("options_type", 20, "int32"))
  .add(new protobuf.Field("mini_option", 21, "int32"))
  .add(new protobuf.Field("last_size", 22, "int64"))
  .add(new protobuf.Field("bid", 23, "float"))
  .add(new protobuf.Field("bid_size", 24, "int64"))
  .add(new protobuf.Field("ask", 25, "float"))
  .add(new protobuf.Field("ask_size", 26, "int64"))
  .add(new protobuf.Field("price_hint", 27, "int32"))
  .add(new protobuf.Field("vol_24hr", 28, "int64"))
  .add(new protobuf.Field("vol_all_currencies", 29, "int64"))
  .add(new protobuf.Field("from_currency", 30, "string"))
  .add(new protobuf.Field("last_market", 31, "string"))
  .add(new protobuf.Field("circulating_supply", 32, "int64"))
  .add(new protobuf.Field("market_cap", 33, "int64"));
