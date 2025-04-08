const { SpotifyHandler } = require("../Spotify/spotify");

const spotiifyHandler = new SpotifyHandler();

exports.searchAlbum = (req, res) => {
  const searchText = req.query.searchText;
  spotiifyHandler
    .getAccessToken()
    .then(() => {
      return spotiifyHandler.searchAlbums(searchText);
    })
    .then((albums) => {
      res.json(albums);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
