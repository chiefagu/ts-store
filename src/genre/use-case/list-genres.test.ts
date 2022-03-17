/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildFakeGenre } from "../../../__tests__/fixtures";
import { makeListGenres } from "./list-genres";

describe("", () => {
  const genreDb = { findAll: jest.fn() };
  const listGenres = makeListGenres({ genreDb } as any);
  it("returns all genres", async () => {
    const genres = [
      buildFakeGenre(),
      buildFakeGenre({ name: "Action" }),
      buildFakeGenre({ name: "Horror" }),
    ];

    genreDb.findAll.mockResolvedValueOnce(genres);

    const actual = await listGenres();

    expect(genreDb.findAll).toHaveBeenCalledWith(/** nothing */);
    expect(genreDb.findAll).toHaveBeenCalledTimes(1);

    expect(actual).toEqual(expect.arrayContaining(genres));
  });
});
