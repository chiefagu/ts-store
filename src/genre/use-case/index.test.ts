import { addGenre, listGenres, findGenre, editGenre, removeGenre } from ".";

describe("use-case: genre", () => {
  describe("make addGenre ", () => {
    it("should be defined", () => {
      expect(addGenre).toBeDefined();
    });
  });

  describe("make listGenres", () => {
    it("should be defined", () => {
      expect(listGenres).toBeDefined();
    });
  });
  describe("make findGenre", () => {
    it("should be defined", () => {
      expect(findGenre).toBeDefined();
    });
  });
  describe("make editGenre", () => {
    it("should be defined", () => {
      expect(editGenre).toBeDefined();
    });
  });
  describe("make removeGenre", () => {
    it("should be defined", () => {
      expect(removeGenre).toBeDefined();
    });
  });
});
