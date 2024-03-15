const express = require("express");
const axios = require("axios");
var url = "https://query1.finance.yahoo.com/v7/finance/options/?symbol=";

const suffix = "/?symbol=";

const app = express();
const port = 1234;
var cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/get", async (req, res) => {
  var tickers = [];
  var data = [];
  try {
    tickers.push(req.query.ticker1);
    tickers.push(req.query.ticker2);
    tickers.push(req.query.ticker3.toString());
    tickers.push(req.query.ticker4.toString());

    for (let index = 0; index < tickers.length; index++) {
      const result = await axios.get(url + tickers[index]);
      data.push({ticker:tickers[index],price: result.data.optionChain.result[0].quote.regularMarketPrice, ask: result.data.optionChain.result[0].quote.ask, bid: result.data.optionChain.result[0].quote.bid});
    }
    
    res.send(data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
});

app.get("/getAll", async (req, res) => {
  var tickers = [];
  var data = [];
  url='https://query1.finance.yahoo.com/v6/finance/quote/?symbols='
  var tick= '';
  try {
    tickers.push(req.query.ticker1);
    tickers.push(req.query.ticker2);
    tickers.push(req.query.ticker3);
    tickers.push(req.query.ticker4);
    tickers.push(req.query.ticker5);

    for (let i = 0;i<tickers.length;i++) {
      if (i === 0) {
        tick = tick + tickers[i];
      } else {
        tick = tick+ ","+ tickers[i];
      }
    }
    console.log(tick);

    const response = await axios.get(url + tick);
    const result = response.data.quoteResponse.result;

    for (let index = 0; index < result.length; index++) {
      data.push({ticker:tickers[index],price: result[index].regularMarketPrice, ask: result[index].ask, bid: result[index].bid, c:result[index].regularMarketChange});
    }
    res.send(data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
});

app.post("/getAll", async (req, res) => {
  var data = [];
  url='https://query1.finance.yahoo.com/v6/finance/quote/?symbols='
  var tick= '';

  try {
    var tickers = req.body;
    for (let i = 0;i<tickers.length;i++) {
      if (i === 0) {
        tick = tick + tickers[i];
      } else {
        tick = tick+ ","+ tickers[i];
      }
    }

    const response = await axios.get(url + tick);
    const result = response.data.quoteResponse.result;

    for (let index = 0; index < result.length; index++) {
      data.push({ticker:tickers[index],price: result[index].regularMarketPrice, ask: result[index].ask, bid: result[index].bid, c:result[index].regularMarketChange});
    }

    res.send(data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
