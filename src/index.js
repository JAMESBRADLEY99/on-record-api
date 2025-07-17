const express = require("express");
const cors = require('cors');
const { searchAlbum, fetchAlbumDetails } = require("./Controllers/controller");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("I'm here :)");
});

app.get("/searchAlbums/:searchText", searchAlbum);

app.get("/album/:albumID", fetchAlbumDetails)

module.exports = app;
