const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/now', 
  function(req, res, next) {
    req.time = new Date().toString();
    next();
  }, 
  function(req, res) {
    res.json({ time: req.time });
  }
);

app.get('/json', (req, res) => {
  const message = process.env.MESSAGE_STYLE === 'uppercase'
    ? "HELLO JSON"
    : "Hello json";
  res.json({ message });
});

app.get('/name', (req, res) => {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});

app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});

app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
