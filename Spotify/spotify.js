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

        const response = await fetch("https://accounts.spotify.com/api/token",{
            method: "POST",
            headers: {
                "Conntent-Type": "application/x-www-form-urlencoded",
            },
            body: params
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
                "Authorization": `Bearer ${this.access_token}`,
            }
        });
        return response.json();
    }
}


module.exports = {
    SpotifyHandler
};