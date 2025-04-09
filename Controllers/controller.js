const { SpotifyHandler } = require("../Spotify/spotify");

const spotifyHandler = new SpotifyHandler();

exports.searchAlbum = (req, res) => {
  const searchText = req.params.searchText;
  spotifyHandler.searchAlbums(searchText)
    .then((albums) => {
      console.log(albums)
      res.status(200).send(albums);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
