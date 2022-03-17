import { makeGenre } from ".";

describe("genre: DI", () => {
  describe("makes a valid genre", () => {
    it("should be defined", () => {
      expect(makeGenre).toBeDefined();
    });
  });
});
