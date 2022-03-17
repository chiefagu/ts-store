import { genreSchema } from ".";
import { genreModel } from ".";
import { genreDb } from ".";

describe("DI: data-access", () => {
  it("creates a genre schema", () => {
    expect(genreSchema).toBeDefined();
  });

  it("creates a genreModel", () => {
    expect(genreModel).toBeDefined();
  });

  it("makes a genreDb", () => {
    expect(genreDb).toBeDefined();
  });
});
