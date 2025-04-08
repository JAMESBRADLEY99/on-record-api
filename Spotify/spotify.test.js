const {getAccessToken, SpotifyToken} = require("./spotify.js");

describe("getAccessToken", () => {
    test("should return an access token", () => {
        return getAccessToken()
        .then((token) => {
            expect(token).toBeDefined();
        })
    });

    
})