'use strict'; // eslint-disable-line
const path = require('path');
const http = require('http');
const express = require('express'); // eslint-disable-line
const headers = require('./headers');

const app = express();

app.use((req, res, next) => {
  res.set(headers);
  next();
});

app.use(express.static(path.join(__dirname, '../build')));

http.createServer(app).listen(3000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on http://localhost:3000');
  }
});
