require("dotenv").config()

class SpotifyHandler {
  constructor() {
    this.access_token = "";
  }

  async getAccessToken() {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);
    
    console.log("fetching token");
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Conntent-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();
    this.access_token = data.access_token;
  }

  async searchAlbums(searchText) {
    const baseUrl = "https://api.spotify.com/v1/search";
    const params = new URLSearchParams({ q: searchText, type: "album" });
    const url = `${baseUrl}?${params}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    });

    const data = await response.json();

    if ("albums" in data) {
      const items = data.albums.items;
      var albums = items.filter((item) => item.album_type === "album");
      albums = albums.slice(0,5)
      return albums.map((album) => ({
        name: album.name,
        artist: album.artists[0].name,
        album_id: album.id,
      }));
    }

    if ("error" in data && data.error.status === 400) {
      await this.getAccessToken();
      return this.searchAlbums(searchText);
    }
  }

  async getAlbum(albumID, error_count=0) {
    const url = `https://api.spotify.com/v1/albums/${albumID}`
    console.log(url)
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    });

    const data = await response.json();
    console.log(data)
    if ("id" in data) {
      const track_listing = data.tracks.items.map((track) => {
        return {
          name: track.name,
        }
      })

      const payload = {
        name: data.name,
        artist: data.artists[0].name,
        album_art: data.images[0].url,
        track_length: data.tracks.total,
        track_listing: track_listing,
      }

      return payload;
    };

    if ("error" in data && data.error.status === 400 && error_count === 0) {
      await this.getAccessToken();
      return this.getAlbum(albumID, error_count + 1);
    };
  }
}

module.exports = {
  SpotifyHandler,
};
