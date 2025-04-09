const {searchAlbum} = require("./controller");

describe("searchAlbum", () => {
    test("should return albums", async () => {
        const req = {
            params: {
                searchText: "brat"
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        }
        response = await searchAlbum(req, res);
        expect(response)
    }) 
})