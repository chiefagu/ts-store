/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildFakeGenre } from "../../../__tests__/fixtures/genre";
import { makeAddGenre } from "./add-genre";

describe("use-case: addGenre", () => {
  const genreDb = { insert: jest.fn(), findByName: jest.fn() };
  const addGenre = makeAddGenre({ genreDb } as any);

  describe("finds existing genre", () => {
    it("return genre", async () => {
      const genreInfo = buildFakeGenre();

      genreDb.findByName.mockResolvedValueOnce(genreInfo);

      const actual = await addGenre(genreInfo);

      expect(genreDb.findByName).toHaveBeenCalledWith(genreInfo.name);
      expect(genreDb.findByName).toHaveBeenCalledTimes(1);

      expect(genreDb.insert).not.toHaveBeenCalled();

      expect(actual).toEqual(genreInfo);
    });
  });

  describe("genre is unique", () => {
    it("adds a genre to db", async () => {
      const genre = buildFakeGenre();

      genreDb.insert.mockResolvedValueOnce(genre);

      const actual = await addGenre(genre);

      expect(actual).toMatchObject(genre);
    });
  });
});
