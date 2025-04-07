const tokens = require("./tokens.json");

function getAccessToken() {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", tokens.client_id);
    params.append("client_secret", tokens.client_secret);

    return fetch("https://accounts.spotify.com/api/token",{
        method: "POST",
        headers: {
            "Conntent-Type": "application/x-www-form-urlencoded",
        },
        body: params
    })
    .then((response) => response.json())
    .then(data => {
        return data.access_token;
    })
}

module.exports = {
    getAccessToken,
};