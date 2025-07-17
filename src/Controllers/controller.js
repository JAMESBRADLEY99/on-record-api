const { SpotifyHandler } = require("../Spotify/spotify");

const spotifyHandler = new SpotifyHandler();

exports.searchAlbum = (req, res) => {
  const searchText = req.params.searchText;
  spotifyHandler
    .searchAlbums(searchText)
    .then((albums) => {
      console.log(albums);
      res.status(200).send(albums);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.fetchAlbumDetails = (req, res) => {
  const albumID = req.params.albumID
  spotifyHandler
    .getAlbum(albumID)
    .then((album) => {
      console.log(album);
      res.status(200).send(album);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json( {error: "Internal Server Error"});
    });
};
