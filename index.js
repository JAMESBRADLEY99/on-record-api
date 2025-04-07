const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("I'm here :)");
  });

app.get('/album:query')


module.exports = app;