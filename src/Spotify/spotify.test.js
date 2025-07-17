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
    const first_response = response[0]
    expect(first_response.name).toBe("Holy Fire");
    expect(first_response.artist).toBe("Foals");
    expect(first_response.album_id).toBeDefined();
  });
  test("response should be less than 6", async () => {
    const handler = new SpotifyHandler();
    const response = await handler.searchAlbums("Radiohead");
    expect(response.length).toBeLessThan(6);
  })
});

describe("getAlbum", () => {
  test("should get album", async () => {
    const handler = new SpotifyHandler();
    const response = await handler.getAlbum("6SBkXTPlJ3oEaFwRm5o2lD")
    expect(response.name).toBe("Holy Fire")
    expect(response.artist).toBe("Foals");
    expect(response.album_art).toBeDefined();
    expect(response.track_length).toEqual(response.track_listing.length);
  })
})