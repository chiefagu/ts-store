import { postGenre } from ".";
import { getGenres } from ".";
import { getGenre } from ".";
import { putGenre } from ".";
import { deleteGenre } from ".";

describe("genre controllers: DI", () => {
  describe("make post genre", () => {
    it("post genre is defined", () => {
      expect(postGenre).toBeDefined();
    });
  });
  describe("make get genres", () => {
    it("getGenres is defined", () => {
      expect(getGenres).toBeDefined();
    });
  });
  describe("make get single genre", () => {
    it("getGenre is defined", () => {
      expect(getGenre).toBeDefined();
    });
  });
  describe("make put genre", () => {
    it("putGenre is defined", () => {
      expect(putGenre).toBeDefined();
    });
  });
  describe("make delete genre", () => {
    it("deleteGenre is defined", () => {
      expect(deleteGenre).toBeDefined();
    });
  });
});
