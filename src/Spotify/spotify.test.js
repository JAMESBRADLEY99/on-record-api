const { response } = require("express");
const { SpotifyHandler } = require("./spotify.js");

describe("getAccessToken", () => {
  test("should return an access token", async () => {
    const handler = new SpotifyHandler();
    await handler.getAccessToken();
    expect(handler.access_token).toBeDefined();
  });
});

describe("searchAlbums", () => {
  test("should search for albums", async () => {
    const handler = new SpotifyHandler();
    const response = await handler.searchAlbums("Holy Fire");
    expect(response[0].name).toBe("Holy Fire");
  });
});
