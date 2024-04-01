const express = require("express");
const axios = require("axios");
var cors = require("cors");
const app = express();
var fs = require('fs');
const getTorrent = require('./torrents/1337x')
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Search = require('./models/searchModel');
const dburl = 'mongodb+srv://sattyajitt1997:ss5675os@cluster0.neippnn.mongodb.net/?retryWrites=true&w=majority';
var url = "https://query1.finance.yahoo.com/v7/finance/options/?symbol=";
const params = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(dburl, params)
  .then(() => {
    console.log("mongo db connected");
  })
  .catch(() => {
    console.log("Error occured during connect to mongo db");
  });

app.use(express.json());
app.use(cors());

// async function main() {
//   const res = await Search.create({
//     ip: "10.128.1.2",
//     searchText: "demo"
//   });

//   console.log(res);
// }

// main();

async function get(searchText, pageNumber) {
  return await axios.get(
    `https://bitsearch.to/api/v1/torrents/search?q=${searchText}&page=${pageNumber}`,
  );
}

function getJSONObject() {
  var result = require('./src/assets/movie-hindi.json');
  return result;
}

app.get("/search-first-page", async (req, res) => {
  try {
    const searchText = req.query.searchText;

    const firstResponse = await getTorrent(searchText, 1);

    res.send(firstResponse);
  } catch (error) {
    console.error("Error fetching Bitsearch API data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/search-by-page", async (req, res) => {
  try {
    const searchText = req.query.searchText;
    const pageNumber = req.query.pageNumber;

    const firstResponse = await getTorrent(searchText, pageNumber);
    res.send(firstResponse.results);
  } catch (error) {
    console.error("Error fetching Bitsearch API data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/search", async (req, res) => {
  try {
    const searchText = req.query.searchText;
    pageNumber = 1;
    totalPage = -1;
    results = [];

    const firstResponse = await get(searchText, 1);
    const firstResults = firstResponse.data.results;

    if (firstResults) {
      firstResults.forEach(element => {
        results.push(element);
      });
    }

    totalPage = Math.ceil(firstResponse.data.hits.value / 20);
    console.log("totalpage: " + totalPage);
    if (totalPage > 1) {
      for (let index = 2; index <= totalPage; index++) {
        const response = await get(searchText, index);
        const otherResults = response.data.results;
        otherResults.forEach(element => {
          results.push(element);
        });
        console.log("done for page: " + index);
      }
    }

    var file = fs.createWriteStream('Results.json');
    file.on('error', function (err) {
      console.log("Error occured during creating file")
      res.send('Error occured during creating file');
    });
    file.write(JSON.stringify(results));
    file.end();

    res.send("File created");
  } catch (error) {
    console.error("Error fetching Bitsearch API data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/suggest", async (req, res) => {
  try {
    const searchText = req.query.searchText;
    const response = await axios.get(
      `https://bitsearch.to/api/v1/torrents/suggest?q=${searchText}`,
    );
    const data = response.data;
    res.send(data);
  } catch (error) {
    console.error("Error fetching Bitsearch API data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/join", async (req, res) => {
  const movie2 = require('./src/assets/bangla.json');
  const movie1 = require('./src/assets/movie-bangla.json');
  console.log("first count: " + movie1.length + "," + movie2.length);

  movie2.forEach(entry2 => {
    const id = entry2._id;
    var found = false;

    for (let index = 0; index < movie1.length; index++) {
      if (movie1[index].id === id) {
        console.log("Found: " + entry2.title + "," + movie1[index].title);
        found = true;
        break;
      }
    }

    if (!found) {
      movie1.push(entry2);
    }
  })

  try {
    var file = fs.createWriteStream('ResultHindi.json');
    file.on('error', function (err) {
      console.log("Error occured during creating file")
      res.send('Error occured during creating file');
    });
    file.write(JSON.stringify(movie1));
    file.end();

    console.log("last count: " + movie1.length);

    res.send("File created");
  } catch (error) {
    console.error("Error fetching Bitsearch API data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/save-user-info", async (req, res) => {
  const data = req.body;
  const response = await User.create({
    ip: data.ip,
    time: data.time,
    loc: data.loc,
    org: data.org,
    city: data.city
  });

  res.send(response);
});

app.get('/test', async (req, res) => {
  res.send('ok');
});

app.get('/get-user-info', async (req, res) => {
  const response = await User.find();
  res.send(response);
});

app.post('/save-search-info', async (req, res) => {
  const data = req.body;
  const response = await Search.create({
    ip: data.ip,
    searchText: data.searchText
  });
  res.send(response);
});

app.get('/get-search-info', async (req, res) => {
  const response = await Search.find();
  res.send(response);
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
    console.log(data);
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

app.listen(1234, '0.0.0.0');