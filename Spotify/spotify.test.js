const getAccessToken = require("./spotify.js").getAccessToken;

describe("getAccessToken", () => {
    test("should return an access token", () => {
        return getAccessToken()
        .then((token) => {
            expect(token).toBeDefined();
        })
    });
});