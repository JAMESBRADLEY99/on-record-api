const express = require("express");
const { searchAlbum } = require("./Controllers/controller");

const app = express();

app.get("/", (req, res) => {
  res.send("I'm here :)");
});

app.get("/searchAlbums/:searchText", searchAlbum);

module.exports = app;
