const tokens = require("./tokens.json");

class SpotifyHandler {
  constructor() {
    this.access_token = "";
  }

  async getAccessToken() {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", tokens.client_id);
    params.append("client_secret", tokens.client_secret);
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
    const params = new URLSearchParams({
      q: searchText,
      type: "album",
    });
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
      const albums = items.filter((item) => item.album_type === "album");
      return albums.map((album) => ({
        name: album.name,
        artist: album.artists[0].name,
      }));
    }
    if ("error" in data && data.error.status === 400) {
      await this.getAccessToken();
      return this.searchAlbums(searchText);
    }
  }
}

module.exports = {
  SpotifyHandler,
};
