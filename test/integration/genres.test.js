/* jshint esversion:8 */
const request = require("supertest");
let server;
const { Genre } = require("../../models/genre");

describe("api/genres", () => {
  beforeEach(() => {
    server = require("../../index/app");
  });
  afterEach(async () => {
    await server.close();
    await Genre.remove({}); //{} means remove all
  });
  describe("get /", () => {
    it("should return genres", async () => {
      await Genre.collection.insertMany([
        { name: "drama" },
        { name: "artistic" }
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === "drama")).toBeTruthy();
    });
  });
  describe("get/:id", () => {
    it("Should return a genre if valid id is provided", async () => {
      const genre = new Genre({ name: "drama" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
    it("should return 404 error if invaild is provided", async () => {
      const res = await request(server).get("/api/genres/21");
      expect(res.status).toBe(404);
    });
  });
});
