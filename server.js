const bodyParser = require('body-parser');
const storeData = require('./connection');
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', function(req, res) {
  console.log('hi');
  console.log(process.env);
  res.send({
    "Output" : "Hello World!"
  });
});

app.get('/hi', function(req, res) {
  res.send({
    "Greeting" : "Bonjour Bitch!"
  });
});

app.post('/', function(req, res) {
  res.send({
    "Output" : "Hello World!"
  });
});

app.post('/store', async function(req, res) {
  try {
    const response = await storeData(req);
    res.send(response);
  } catch(e) {
    res.send({
      "error": `${e}` 
    })
  } 
})

app.listen(port);
module.exports = app;
